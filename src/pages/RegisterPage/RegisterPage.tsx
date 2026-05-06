import React, { useState } from 'react';
import { 
  IonPage, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonInput, 
  IonButton, 
  IonCard,
  IonCardContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonCheckbox,
  IonText
} from '@ionic/react';
import { lockClosedOutline, eyeOutline, calendarOutline } from 'ionicons/icons';
// Importamos el mismo CSS del Login porque la estructura del contenedor es igual
import '../LoginPage/LoginPage.css';

const RegisterPage: React.FC = () => {
  // Estados para capturar todos los campos del formulario
  const [nombre, setNombre] = useState('');
  const [rut, setRut] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [genero, setGenero] = useState('');
  const [region, setRegion] = useState('');
  const [comuna, setComuna] = useState('');
  const [terminos, setTerminos] = useState(false);

  const handleRegister = () => {
    console.log('Intentando registrar usuario:', { nombre, rut, correo, region, comuna });
    // Aquí luego agregarán las validaciones (ej: que las contraseñas coincidan)
  };

  return (
    <IonPage>
      {/* Cabecera Municipal */}
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
              <h1 className="login-title">Crea tu Cuenta</h1>

              {/* Nombre Completo */}
              <div className="input-group">
                <IonLabel className="input-label">Nombre Completo</IonLabel>
                <IonItem className="custom-input">
                  <IonInput 
                    placeholder="Ingrese su nombre completo"
                    value={nombre}
                    onIonInput={(e: any) => setNombre(e.target.value)}
                  ></IonInput>
                </IonItem>
              </div>

              {/* RUT */}
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

              {/* Contraseña */}
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

              {/* Confirmar Contraseña */}
              <div className="input-group">
                <IonLabel className="input-label">Confirmar Contraseña</IonLabel>
                <IonItem className="custom-input">
                  <IonIcon slot="start" icon={lockClosedOutline} color="medium" />
                  <IonInput 
                    type="password"
                    placeholder="Confirmar Contraseña" 
                    value={confirmPassword}
                    onIonInput={(e: any) => setConfirmPassword(e.target.value)}
                  ></IonInput>
                  <IonIcon slot="end" icon={eyeOutline} color="medium" style={{ cursor: 'pointer' }} />
                </IonItem>
              </div>

              {/* Correo Electrónico */}
              <div className="input-group">
                <IonLabel className="input-label">Correo Electrónico</IonLabel>
                <IonItem className="custom-input">
                  <IonInput 
                    type="email"
                    placeholder="example@gmail.com"
                    value={correo}
                    onIonInput={(e: any) => setCorreo(e.target.value)}
                  ></IonInput>
                </IonItem>
              </div>

              {/* Número de Teléfono */}
              <div className="input-group">
                <IonLabel className="input-label">Número de teléfono</IonLabel>
                <IonItem className="custom-input">
                  <IonInput 
                    type="tel"
                    placeholder="998809831"
                    value={telefono}
                    onIonInput={(e: any) => setTelefono(e.target.value)}
                  ></IonInput>
                </IonItem>
              </div>

              {/* Fecha de Nacimiento */}
              <div className="input-group">
                <IonLabel className="input-label">Fecha de nacimiento</IonLabel>
                <IonItem className="custom-input">
                  <IonInput 
                    type="date"
                    value={fechaNacimiento}
                    onIonInput={(e: any) => setFechaNacimiento(e.target.value)}
                  ></IonInput>
                  <IonIcon slot="end" icon={calendarOutline} color="medium" />
                </IonItem>
              </div>

              {/* Género (Select) */}
              <div className="input-group">
                <IonLabel className="input-label">Género</IonLabel>
                <IonItem className="custom-input">
                  <IonSelect 
                    placeholder="Seleccione una opción" 
                    value={genero} 
                    onIonChange={(e) => setGenero(e.detail.value)}
                    interface="popover"
                  >
                    <IonSelectOption value="masculino">Masculino</IonSelectOption>
                    <IonSelectOption value="femenino">Femenino</IonSelectOption>
                    <IonSelectOption value="otro">Otro</IonSelectOption>
                    <IonSelectOption value="prefiero_no_decirlo">Prefiero no decirlo</IonSelectOption>
                  </IonSelect>
                </IonItem>
              </div>

              {/* Región (Select) */}
              <div className="input-group">
                <IonLabel className="input-label">Región</IonLabel>
                <IonItem className="custom-input">
                  <IonSelect 
                    placeholder="Selecciona una región" 
                    value={region} 
                    onIonChange={(e) => setRegion(e.detail.value)}
                    interface="popover"
                  >
                    <IonSelectOption value="valparaiso">Valparaíso</IonSelectOption>
                    <IonSelectOption value="metropolitana">Metropolitana</IonSelectOption>
                    {/* Agregar las demás regiones luego */}
                  </IonSelect>
                </IonItem>
              </div>

              {/* Comuna (Select) */}
              <div className="input-group">
                <IonLabel className="input-label">Comuna</IonLabel>
                <IonItem className="custom-input">
                  <IonSelect 
                    placeholder="Selecciona una comuna" 
                    value={comuna} 
                    onIonChange={(e) => setComuna(e.detail.value)}
                    interface="popover"
                  >
                    <IonSelectOption value="santo_domingo">Santo Domingo</IonSelectOption>
                    <IonSelectOption value="san_antonio">San Antonio</IonSelectOption>
                    {/* Agregar las demás comunas luego */}
                  </IonSelect>
                </IonItem>
              </div>

              {/* Términos y Condiciones */}
              <div className="input-group" style={{ display: 'flex', alignItems: 'center', marginTop: '20px', marginBottom: '30px' }}>
                <IonCheckbox 
                  checked={terminos} 
                  onIonChange={(e) => setTerminos(e.detail.checked)} 
                  style={{ marginRight: '10px' }}
                />
                <IonLabel style={{ fontSize: '14px', fontWeight: 'bold', color: '#373737' }}>
                  Términos y Condiciones
                </IonLabel>
              </div>

              {/* Botón Crear Cuenta */}
              <IonButton 
                expand="block" 
                className="btn-ingresar" 
                onClick={handleRegister}
              >
                Crear Cuenta
              </IonButton>

            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default RegisterPage;