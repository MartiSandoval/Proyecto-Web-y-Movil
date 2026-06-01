import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContextCore';
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
  IonLabel,
  IonRouterLink
} from '@ionic/react';
import { lockClosedOutline, eyeOutline, eyeOffOutline } from 'ionicons/icons';
import './LoginPage.css'; // Importamos los estilos personalizados
import { IonRouterLink } from '@ionic/react';
import Header from '../../components/Header/Header';
const municipalidadLogo = "/assets/logoMuni.png";

// ahora funciona no necesariamente el rut tiene que ser válido
const validarRut = (rut: string) => {
  const [num, dv] = rut.split("-");
  if (num.length < 7 || num.length > 8 ) {
    return false;
  }
  if (dv.length > 1) {
    return false;
  }
  return /^[0-9]+-[0-9kK]$/.test(rut);
};

const LoginPage: React.FC = () => {
  const history = useHistory();
  const { login } = useAuth();
  const [rut, setRut] = useState('');
  const [password, setPassword] = useState('');

  const [rutError, setRutError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loginError, setLoginError] = useState('');
  const [cargando, setCargando] = useState(false);
  const [mostrarContra, setMostrarContra] = useState(false);

  const handleLogin = async () => {
    setRutError('');
    setPasswordError('');
    setLoginError('');
    let esValido = true;
    const rutLimpio = rut.trim();
    const passLimpio = password.trim();

    if (!rutLimpio) {
      setRutError('El RUT es obligatorio.');
      esValido = false;
    } else if (!validarRut(rutLimpio)) {
      setRutError('El RUT ingresado no es válido (Ej: 12345678-9).');
      esValido = false;
    }

    if (!passLimpio) {
      setPasswordError('La contraseña es obligatoria.');
      esValido = false;
    } else if (passLimpio.length < 6) {
      setPasswordError('La contraseña debe tener al menos 6 caracteres.');
      esValido = false;
    }

    if (esValido) {
      try {
        setCargando(true);
        await login(rutLimpio, passLimpio);
        window.location.replace('/tramites');
      } catch (err: any) {
        setLoginError(err.message || 'Error al iniciar sesión');
      } finally {
        setCargando(false);
      }
    }
  };


  return (
    <IonPage>
      <Header simple /> {/* Usamos el header simple sin submenú para la página de login */}
      
      <IonContent fullscreen className="login-background">
        <div className="login-container">
          <IonCard className="login-card">
            <IonCardContent>
              <h1 className="login-title">Inicio Sesión</h1>

              {/* Campo RUT */}
              <div className="input-group">
                <IonLabel className="input-label">RUT</IonLabel>
                <IonText color="medium"><p className="input-helper">Sin puntos y con guión</p></IonText>
                <IonItem className="custom-input" color={rutError ? "danger" : ""}lines="none">
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
                <IonItem className="custom-input" color={passwordError ? "danger" : ""}lines="none">
                  <IonIcon slot="start" icon={lockClosedOutline} color="medium" />
                  <IonInput 
                    type={mostrarContra ? "text" : "password"}
                    placeholder="Contraseña" 
                    value={password}
                    onIonInput={(e: any) => setPassword(e.target.value)}
                  ></IonInput>
                  <IonIcon 
                    slot="end" 
                    icon={mostrarContra ? eyeOffOutline : eyeOutline} 
                    color="medium" 
                    style={{ cursor: 'pointer' }} 
                    onClick={() => setMostrarContra(!mostrarContra)} 
                  />
                </IonItem>
                {passwordError && <IonText color="danger"><p style={{ fontSize: '12px', marginTop: '5px' }}>{passwordError}</p></IonText>}
              </div>

              <div className="login-links">
                <a href="/login" className="link-blue">Olvide mi contraseña</a> {/*aqui se pone la parte para recuperar contra plop */}
                <p className="register-text">
                  ¿No tienes cuenta? <IonRouterLink routerLink="/registro" className="link-blue">Crea tu cuenta</IonRouterLink>
                </p>
              </div>

              {loginError && (
                <IonText color="danger">
                  <p style={{ fontSize: '13px', textAlign: 'center', marginBottom: '10px' }}>{loginError}</p>
                </IonText>
              )}

              <IonButton expand="block" className="btn-ingresar" onClick={handleLogin} disabled={cargando}>
                {cargando ? 'Ingresando...' : 'Ingresar'}
              </IonButton>

            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
