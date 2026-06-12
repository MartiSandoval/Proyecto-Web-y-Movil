import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

import { 
  IonPage, 
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
  IonText,
  IonTitle
} from '@ionic/react';
import { lockClosedOutline, eyeOutline, calendarOutline, eyeOffOutline } from 'ionicons/icons';
import './LoginScreen.css';
import Header from '../../../../core/presentation/components/organisms/Header/Header';

// Utilidades de validación
const validarRut = (rut: string) => {
  return /^\d{7,8}-[\dkK]$/i.test(rut);
};

const validarCorreo = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const validarTel = (telefono: string) => {
  // Acepta exactamente 9 dígitos numéricos
  return /^\d{9}$/.test(telefono);
};

const RegisterScreen: React.FC = () => {
  const { register } = useAuth();
  const history = useHistory();

  // Estados de datos
  const [nombre, setNombre] = useState('');
  const [rut, setRut] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [genero, setGenero] = useState('');
  const [direccion, setDireccion] = useState('');
  const [terminos, setTerminos] = useState(false);

  // Estados de error
  const [nombreError, setNombreError] = useState('');
  const [rutError, setRutError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmError, setConfirmError] = useState('');
  const [correoError, setCorreoError] = useState('');
  const [telefonoError, setTelefonoError] = useState('');
  const [direccionError, setDireccionError] = useState('');
  const [terminosError, setTerminosError] = useState('');
  const [registroError, setRegistroError] = useState('');
  
  // Estados de UI
  const [cargando, setCargando] = useState(false);
  const [mostrarContra, setMostrarContra] = useState(false);
  const [mostrarContraConfirm, setMostrarContraConfirm] = useState(false);

  const handleRegister = async () => {
    // 1. Limpiar errores previos
    setNombreError('');
    setRutError('');
    setPasswordError('');
    setConfirmError('');
    setCorreoError('');
    setTelefonoError('');
    setDireccionError('');
    setTerminosError('');
    setRegistroError('');

    let esValido = true;
    
    // 2. Sanitizar (quitar espacios en los extremos)
    const nombreLimpio = nombre.trim();
    const rutLimpio = rut.trim();
    const passLimpio = password.trim();
    const correoLimpio = correo.trim();
    const telLimpio = telefono.trim();
    const direccionLimpia = direccion.trim();

    // 3. Validaciones individuales
    if (!nombreLimpio) {
      setNombreError('El nombre completo es obligatorio.');
      esValido = false;
    }

    if (!rutLimpio) {
      setRutError('El RUT es obligatorio.');
      esValido = false;
    } else if (!validarRut(rutLimpio)) {
      setRutError('El RUT ingresado no es válido.');
      esValido = false;
    }

    if (!passLimpio) {
      setPasswordError('La contraseña es obligatoria.');
      esValido = false;
    } else if (passLimpio.length < 6) {
      setPasswordError('La contraseña debe tener al menos 6 caracteres.');
      esValido = false;
    }

    if (password !== confirmPassword) {
      setConfirmError('Las contraseñas no coinciden.');
      esValido = false;
    }

    if (!correoLimpio) {
      setCorreoError('El correo es obligatorio.');
      esValido = false;
    } else if (!validarCorreo(correoLimpio)) {
      setCorreoError('Ingrese un formato de correo válido (ej: usuario@mail.com).');
      esValido = false;
    }

    if (!telLimpio) {
      setTelefonoError('El teléfono es obligatorio.');
      esValido = false;
    } else if (!validarTel(telLimpio)) {
      setTelefonoError('El teléfono debe tener exactamente 9 dígitos numéricos.');
      esValido = false;
    }

    if (!direccionLimpia) {
      setDireccionError('La dirección es obligatoria.');
      esValido = false;
    } else if (direccionLimpia.length < 5) {
      setDireccionError('La dirección debe ser más específica.');
      esValido = false;
    }

    if (!terminos) {
      setTerminosError('Debe aceptar los términos y condiciones.');
      esValido = false;
    }

    // 4. Ejecutar registro
    if (esValido) {
      try {
        setCargando(true);
        await register({
          nombre: nombreLimpio,
          rut: rutLimpio,
          email: correoLimpio,
          password: passLimpio,
          direccion: direccionLimpia,
          telefono: telLimpio,
          fecha_nacimiento: fechaNacimiento || undefined,
          genero: genero || undefined,
        });
        // Usar history de React Router en vez de window.location para una navegación más rápida (SPA)
        history.replace('/tramites');
      } catch (err: any) {
        const msg: string = err.message || 'Error al crear la cuenta';
        if (msg.includes('RUT ya está registrado')) {
          setRutError('Este RUT ya tiene una cuenta asociada.');
        } else if (msg.includes('email ya está registrado')) {
          setCorreoError('Este correo electrónico ya está en uso.');
        } else {
          setRegistroError(msg);
        }
      } finally {
        setCargando(false);
      }
    }
  };

  return (
    <IonPage>
      <Header simple/>
      
      <IonContent fullscreen className="login-background">
        <div className="login-container">
          <IonCard className="login-card">
            <IonCardContent>
              <h1 className="login-title">Crea tu Cuenta</h1>

              {/* Nombre Completo */}
              <div className="input-group">
                <IonLabel className="input-label">Nombre Completo</IonLabel>
                <IonItem className="custom-input" lines="none">
                  <IonInput 
                    placeholder="Ingrese su nombre completo"
                    value={nombre}
                    onIonInput={(e: any) => setNombre(e.target.value)}
                  ></IonInput>
                </IonItem>
                {nombreError && <IonText color="danger"><p style={{ fontSize: '12px', marginTop: '5px' }}>{nombreError}</p></IonText>}
              </div>

              {/* RUT */}
              <div className="input-group">
                <IonLabel className="input-label">RUT</IonLabel>
                <IonText color="medium"><p className="input-helper">Sin puntos y con guión</p></IonText>
                {/* CORRECCIÓN: Se eliminó color={rutError ? "danger" : ""} */}
                <IonItem className="custom-input" lines="none">
                  <IonInput 
                    placeholder="Ej: 21714338-9"
                    value={rut}
                    onIonInput={(e: any) => setRut(e.target.value)}
                  ></IonInput>
                </IonItem>
                {rutError && <IonText color="danger"><p style={{ fontSize: '12px', marginTop: '5px' }}>{rutError}</p></IonText>}
              </div>

              {/* Correo Electrónico */}
              <div className="input-group">
                <IonLabel className="input-label">Correo Electrónico</IonLabel>
                <IonItem className="custom-input" lines="none">
                  <IonInput 
                    type="email"
                    placeholder="ejemplo@gmail.com"
                    value={correo}
                    onIonInput={(e: any) => setCorreo(e.target.value)}
                  ></IonInput>
                </IonItem>
                {correoError && <IonText color="danger"><p style={{ fontSize: '12px', marginTop: '5px' }}>{correoError}</p></IonText>}
              </div>

              {/* Contraseña */}
              <div className="input-group">
                <IonLabel className="input-label">Contraseña</IonLabel>
                {/* CORRECCIÓN: Se eliminó color={passwordError ? "danger" : ""} */}
                <IonItem className="custom-input" lines="none">
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

              {/* Confirmar Contraseña */}
              <div className="input-group">
                <IonLabel className="input-label">Confirmar Contraseña</IonLabel>
                {/* CORRECCIÓN: Se eliminó color={confirmError ? "danger" : ""} */}
                <IonItem className="custom-input" lines="none">
                  <IonIcon slot="start" icon={lockClosedOutline} color="medium" />
                  <IonInput 
                    type={mostrarContraConfirm ? "text" : "password"}
                    placeholder="Repita su contraseña" 
                    value={confirmPassword}
                    onIonInput={(e: any) => setConfirmPassword(e.target.value)}
                  ></IonInput>
                  <IonIcon 
                    slot="end" 
                    icon={mostrarContraConfirm ? eyeOffOutline : eyeOutline} 
                    color="medium" 
                    style={{ cursor: 'pointer' }} 
                    onClick={() => setMostrarContraConfirm(!mostrarContraConfirm)} 
                  />
                </IonItem>
                {confirmError && <IonText color="danger"><p style={{ fontSize: '12px', marginTop: '5px' }}>{confirmError}</p></IonText>}
              </div>

              {/* Dirección */}
              <div className="input-group">
                <IonLabel className="input-label">Dirección</IonLabel>
                <IonItem className="custom-input" lines="none">
                  <IonInput 
                    type="text"
                    placeholder="Ej: Av. Santo Domingo"
                    value={direccion}
                    onIonInput={(e: any) => setDireccion(e.target.value)}
                  ></IonInput>
                </IonItem>
                {direccionError && <IonText color="danger"><p style={{ fontSize: '12px', marginTop: '5px' }}>{direccionError}</p></IonText>}
              </div>

              {/* Número de Teléfono */}
              <div className="input-group">
                <IonLabel className="input-label">Número de teléfono</IonLabel>
                <IonItem className="custom-input" lines="none">
                  <IonInput 
                    type="tel"
                    placeholder="Ej: 998809831"
                    value={telefono}
                    onIonInput={(e: any) => setTelefono(e.target.value)}
                    maxlength={9}
                  ></IonInput>
                </IonItem>
                {telefonoError && <IonText color="danger"><p style={{ fontSize: '12px', marginTop: '5px' }}>{telefonoError}</p></IonText>}
              </div>

              {/* Fecha de Nacimiento */}
              <div className="input-group">
                <IonLabel className="input-label">Fecha de nacimiento (Opcional)</IonLabel>
                <IonItem className="custom-input" lines="none">
                  <IonInput 
                    type="date"
                    value={fechaNacimiento}
                    onIonInput={(e: any) => setFechaNacimiento(e.target.value)}
                  ></IonInput>
                  <IonIcon slot="end" icon={calendarOutline} color="medium" />
                </IonItem>
              </div>

              {/* Género */}
              <div className="input-group">
                <IonLabel className="input-label">Género (Opcional)</IonLabel>
                <IonItem className="custom-input" lines="none">
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

              {/* Términos y Condiciones */}
              {/* CORRECCIÓN: Se reestructuró para quitar el position="absolute" y evitar sobreposiciones */}
              <div className="input-group" style={{ marginTop: '20px', marginBottom: '30px' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <IonCheckbox 
                    checked={terminos} 
                    onIonChange={(e) => setTerminos(e.detail.checked)} 
                    style={{ marginRight: '10px' }}
                  />
                  <IonLabel style={{ fontSize: '14px', fontWeight: 'bold', color: '#373737', whiteSpace: 'normal' }}>
                    Acepto los Términos y Condiciones
                  </IonLabel>
                </div>
                {terminosError && (
                  <IonText color="danger">
                    <p style={{ fontSize: '12px', marginTop: '8px', marginBottom: '0' }}>{terminosError}</p>
                  </IonText>
                )}
              </div>

              {registroError && (
                <IonText color="danger">
                  <p style={{ fontSize: '13px', textAlign: 'center', marginBottom: '15px' }}>{registroError}</p>
                </IonText>
              )}

              {/* Botón Crear Cuenta */}
              <IonButton
                expand="block"
                className="btn-ingresar"
                onClick={handleRegister}
                disabled={cargando}
              >
                {cargando ? 'Creando cuenta...' : 'CREAR CUENTA'}
              </IonButton>

            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default RegisterScreen;