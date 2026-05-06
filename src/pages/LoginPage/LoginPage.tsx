import React, { useState } from 'react';
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

const LoginPage: React.FC = () => {
  const [rut, setRut] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('Intentando ingresar con RUT:', rut);
  };

  return (
    <IonPage>
      {/* Cabecera Municipal que tenías en el diseño */}
      <IonHeader>
        <IonToolbar className="municipal-toolbar">
          <IonTitle>
            <div className="municipal-header-title">
              <strong>Santo Domingo</strong>
              <span>Municipalidad</span>
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
                <IonItem className="custom-input">
                  <IonInput 
                    placeholder="Ej: 21714338-9"
                    value={rut}
                    onIonInput={(e: any) => setRut(e.target.value)}
                  ></IonInput>
                </IonItem>
              </div>

              {/* Campo Contraseña */}
              <div className="input-group">
                <IonLabel className="input-label">Contraseña</IonLabel>
                <IonItem className="custom-input">
                  <IonIcon slot="start" icon={lockClosedOutline} color="medium" />
                  <IonInput 
                    type="password"
                    placeholder="Contraseña" 
                    value={password}
                    onIonInput={(e: any) => setPassword(e.target.value)}
                  ></IonInput>
                  <IonIcon slot="end" icon={eyeOutline} color="medium" style={{ cursor: 'pointer' }} />
                </IonItem>
              </div>

              {/* Enlaces de ayuda */}
              <div className="login-links">
                <a href="/recuperar" className="link-blue">Olvide mi contraseña</a>
                <p className="register-text">
                  ¿No tienes cuenta? <IonRouterLink routerLink="/registro" className="link-blue">Crea tu cuenta</IonRouterLink>
                </p>
              </div>

              {/* Botón Ingresar */}
              <IonButton 
                expand="block" 
                className="btn-ingresar" 
                onClick={handleLogin}
              >
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