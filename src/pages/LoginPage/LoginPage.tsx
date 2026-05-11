import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { 
  IonPage, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonInput, 
  IonButton, 
  IonText,
  IonCard,
  IonCardContent,
  IonIcon,
  IonItem,
  IonLabel
} from '@ionic/react';
import { lockClosedOutline, eyeOutline } from 'ionicons/icons';
import './LoginPage.css'; // Importamos los estilos personalizados
import { IonRouterLink } from '@ionic/react';
const municipalidadLogo = "/assets/logoMuni.png";


const validarRut = (rut: string) => {
  // verificar el rut
  if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test(rut)) return false;
  
  const [numero, dv] = rut.split('-');
  let num = parseInt(numero);
  let m = 0, s = 1;
  for (; num; num = Math.floor(num / 10)) {
    s = (s + num % 10 * (9 - m++ % 6)) % 11;
  }
  const dvEsperado = s ? String(s - 1) : 'k';
  return dvEsperado.toLowerCase() === dv.toLowerCase();
};

const LoginPage: React.FC = () => {
  const history = useHistory();
  const [rut, setRut] = useState('');
  const [password, setPassword] = useState('');
  
  const [rutError, setRutError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleLogin = () => {
    setRutError('');
    setPasswordError('');
    let esValido = true;

    if (!rut) {
      setRutError('El RUT es obligatorio.');
      esValido = false;
    } else if (!validarRut(rut)) {
      setRutError('El RUT ingresado no es válido (Ej: 12345678-9).');
      esValido = false;
    }

    if (!password) {
      setPasswordError('La contraseña es obligatoria.');
      esValido = false;
    }

    if (esValido) {
      localStorage.setItem('isLoggedIn', 'true');
      history.push('/tramites');
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="municipal-toolbar">
          <IonTitle>
            <div className="municipal-header-logo-row">
              <img src={municipalidadLogo} alt="Logo Municipalidad" className="tr-logo-img" />
              <div className="municipal-header-title">
                <strong>Santo Domingo</strong>
                <span>Municipalidad</span>
              </div>
            </div>
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      
      <IonContent fullscreen className="login-background">
        <div className="login-container">
          <IonCard className="login-card">
            <IonCardContent>
              <h1 className="login-title">Inicio Sesión</h1>

              {/* Campo RUT */}
              <div className="input-group">
                <IonLabel className="input-label">RUT</IonLabel>
                <IonText color="medium"><p className="input-helper">Sin puntos y con guión</p></IonText>
                <IonItem className="custom-input" color={rutError ? "danger" : ""}>
                  <IonInput 
                    placeholder="Ej: 21714338-9"
                    value={rut}
                    onIonInput={(e: any) => setRut(e.target.value)}
                  ></IonInput>
                </IonItem>
                {rutError && <IonText color="danger"><p style={{ fontSize: '12px', marginTop: '5px' }}>{rutError}</p></IonText>}
              </div>

              {/* Campo Contraseña */}
              <div className="input-group">
                <IonLabel className="input-label">Contraseña</IonLabel>
                <IonItem className="custom-input" color={passwordError ? "danger" : ""}>
                  <IonIcon slot="start" icon={lockClosedOutline} color="medium" />
                  <IonInput 
                    type="password"
                    placeholder="Contraseña" 
                    value={password}
                    onIonInput={(e: any) => setPassword(e.target.value)}
                  ></IonInput>
                  <IonIcon slot="end" icon={eyeOutline} color="medium" style={{ cursor: 'pointer' }} />
                </IonItem>
                {passwordError && <IonText color="danger"><p style={{ fontSize: '12px', marginTop: '5px' }}>{passwordError}</p></IonText>}
              </div>

              <div className="login-links">
                <a href="/login" className="link-blue">Olvide mi contraseña</a> {/*aqui se pone la parte para recuperar contra plop */}
                <p className="register-text">
                  ¿No tienes cuenta? <IonRouterLink routerLink="/registro" className="link-blue">Crea tu cuenta</IonRouterLink>
                </p>
              </div>

              <IonButton expand="block" className="btn-ingresar" onClick={handleLogin}>
                Ingresar
              </IonButton>

            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;