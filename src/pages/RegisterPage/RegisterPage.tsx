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
import { lockClosedOutline, eyeOutline, calendarOutline, eyeOffOutline } from 'ionicons/icons';
import '../LoginPage/LoginPage.css';
import Header from '../../components/Header/Header';
const municipalidadLogo = "/assets/logoMuni.png";


const validarRut = (rut: string) => {
  const [num, dv] = rut.split("-");
  //let num = numero;
  if (num.length < 7 || num.length > 8 ) {
    return false;
  }
  if (dv.length > 1) {
    return false;
  }
  return /^[0-9]+-[0-9kK]$/.test(rut);
};

const validarCorreo = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

const validarTel = (telefono: string) => {
  if (telefono.length == 9) {
    return true;
  }
  if (!isNaN(Number(telefono))) {
    return false;
  }
}

const RegisterPage: React.FC = () => {
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
  const [rutError, setRutError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmError, setConfirmError] = useState('');
  const [terminosError, setTerminosError] = useState('');
  const [nombreError, setNombreError] = useState('');
  const [correoError, setCorreoError] = useState('');
  const [regionError, setRegionError] = useState('');
  const [comunaError, setComunaError] = useState('');
  const[telefonoError, setTelefonoError] = useState('');
  const [mostrarContra, setMostrarContra] = useState(false);
  const [mostrarContraConfirm, setMostrarContraConfirm] = useState(false);
  const history = useHistory();
  


  const handleRegister = () => {
    setRutError('');
    setPasswordError('');
    setConfirmError('');
    setTerminosError('');
    setNombreError('');
    setCorreoError('');
    setRegionError('');
    setComunaError('');
    setTelefonoError('');

    let esValido = true;
    
    // trim elimina los espacios en blanco
    const rutLimpio = rut.trim();
    const passLimpio = password.trim();
    const nombreLimpio = nombre.trim();
    const correoLimpio = correo.trim();
    const telLimpio = telefono.trim();

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
      setTelefonoError("ingresa bien plox")
      esValido = false;
    }

    if (!region) {
      setRegionError('Debe seleccionar una región.');
      esValido = false;
    }
    if (!comuna) {
      setComunaError('Debe seleccionar una comuna.');
      esValido = false;
    }

    

    if (!terminos) {
      setTerminosError('Debe aceptar los términos y condiciones.');
      esValido = false;
    }

    // 8. Envío final (Si todo es válido)
    if (esValido) {
      console.log("Formulario perfecto. Listo para enviar al backend.");
      // Aquí irá el POST a Axios para conectarse a tu Node.js
      localStorage.setItem('isLoggedIn', 'true');
      history.push('/tramites');
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
                <IonItem className="custom-input" color={rutError ? "danger": ""}lines="none">
                  <IonInput 
                    placeholder="Ej: 21714338-9"
                    value={rut}
                    onIonInput={(e: any) => setRut(e.target.value)}
                  ></IonInput>
                </IonItem>
                {rutError && <IonText color="danger"><p style={{ fontSize: '12px', marginTop: '5px' }}>{rutError}</p></IonText>}
              </div>

              {/* Contraseña */}
              <div className="input-group">
                <IonLabel className="input-label">Contraseña</IonLabel>
                <IonItem className="custom-input" color={passwordError ? "danger": ""}lines="none">
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
                <IonItem className="custom-input" color={confirmError ? "danger": ""}lines="none">
                  <IonIcon slot="start" icon={lockClosedOutline} color="medium" />
                  <IonInput 
                    type={mostrarContraConfirm ? "text" : "password"}
                    placeholder="Contraseña" 
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

              {/* Correo Electrónico */}
              <div className="input-group">
                <IonLabel className="input-label">Correo Electrónico</IonLabel>
                <IonItem className="custom-input" lines="none">
                  <IonInput 
                    type="email"
                    placeholder="example@gmail.com"
                    value={correo}
                    onIonInput={(e: any) => setCorreo(e.target.value)}
                  ></IonInput>
                </IonItem>
                {correoError && <IonText color="danger"><p style={{ fontSize: '12px', marginTop: '5px' }}>{correoError}</p></IonText>}
              </div>

              {/* Número de Teléfono */}
              <div className="input-group">
                <IonLabel className="input-label">Número de teléfono</IonLabel>
                <IonItem className="custom-input" lines="none">
                  <IonInput 
                    type="tel"
                    placeholder="998809831"
                    value={telefono}
                    onIonInput={(e: any) => setTelefono(e.target.value)}
                  ></IonInput>
                </IonItem>
                {telefonoError && <IonText color="danger"><p style={{ fontSize: '12px', marginTop: '5px' }}>{telefonoError}</p></IonText>}

              </div>

              {/* Fecha de Nacimiento */}
              <div className="input-group">
                <IonLabel className="input-label">Fecha de nacimiento</IonLabel>
                <IonItem className="custom-input" lines="none">
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

              {/* Región (Select) */}
              <div className="input-group">
                <IonLabel className="input-label">Región</IonLabel>
                <IonItem className="custom-input" lines="none">
                  <IonSelect 
                    placeholder="Selecciona una región" 
                    value={region} 
                    onIonChange={(e) => setRegion(e.detail.value)}
                    interface="popover"
                  >
                    <IonSelectOption value="arica">Arica y Parinacota</IonSelectOption>
                    <IonSelectOption value="tarapaca">Tarapacá</IonSelectOption>
                    <IonSelectOption value="antofagasta">Antofagasta</IonSelectOption>
                    <IonSelectOption value="atacama">Atacama</IonSelectOption>
                    <IonSelectOption value="coquimbo">Coquimbo</IonSelectOption>
                    <IonSelectOption value="valparaiso">Valparaíso</IonSelectOption>
                    <IonSelectOption value="capital">Metropolitana</IonSelectOption>
                    <IonSelectOption value="ohiggins">O'higgins</IonSelectOption>
                    <IonSelectOption value="maule">Maule</IonSelectOption>
                    <IonSelectOption value="nuble">Ñuble</IonSelectOption>
                    <IonSelectOption value="biobio">Biobío</IonSelectOption>
                    <IonSelectOption value="araucania">La Araucanía</IonSelectOption>
                    <IonSelectOption value="rios">Los Ríos</IonSelectOption>
                    <IonSelectOption value="lagos">Los Lagos</IonSelectOption>
                    <IonSelectOption value="aysen">Aysén</IonSelectOption>
                    <IonSelectOption value="magallanes">Magallanes</IonSelectOption>
                  </IonSelect>
                </IonItem>
                {regionError && <IonText color="danger"><p style={{ fontSize: '12px', marginTop: '5px' }}>{regionError}</p></IonText>}
              </div>

              {/* Comuna (Select) */}
              <div className="input-group">
                <IonLabel className="input-label">Comuna</IonLabel>
                <IonItem className="custom-input" lines="none">
                  <IonSelect 
                    placeholder="Selecciona una comuna" 
                    value={comuna} 
                    onIonChange={(e) => setComuna(e.detail.value)}
                    interface="popover"
                  >
                    <IonSelectOption value="santo_domingo">Santo Domingo</IonSelectOption>
                    <IonSelectOption value="buin">Buin</IonSelectOption>
                    <IonSelectOption value="vina">Viña del Mar</IonSelectOption>
                    {/* Agregar las demás comunas luego */}
                  </IonSelect>
                </IonItem>
                {comunaError && <IonText color="danger"><p style={{ fontSize: '12px', marginTop: '5px' }}>{comunaError}</p></IonText>}
              </div>

              {/* Términos y Condiciones */}
              <div className="input-group" style={{ display: 'flex', alignItems: 'center', marginTop: '20px', marginBottom: '30px' }}>
                <IonCheckbox 
                  color={terminosError ? "danger": ""}
                  checked={terminos} 
                  onIonChange={(e) => setTerminos(e.detail.checked)} 
                  style={{ marginRight: '10px' }}
                />
                <IonLabel style={{ fontSize: '14px', fontWeight: 'bold', color: '#373737' }}>
                  Términos y Condiciones
                </IonLabel>
                {terminosError && <IonText color="danger"><p style={{ fontSize: '12px', marginTop: '5px' }}> {terminosError} </p></IonText>}
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