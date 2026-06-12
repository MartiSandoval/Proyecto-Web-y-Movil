import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'; // 1. IMPORTAR USEHISTORY
import {
  IonPage,
  IonContent,
  IonCard,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonIcon,
  useIonToast,
  IonSpinner
} from '@ionic/react';
import { checkmarkCircle, chevronForwardOutline, closeCircle, personCircleOutline } from 'ionicons/icons';
import { useAuth } from '../hooks/useAuth'; 
import Header from '../../../../core/presentation/components/organisms/Header/Header';
import Footer from '../../../../core/presentation/components/organisms/Footer/footer';
import './PerfilScreen.css';

const PerfilScreen: React.FC = () => {
  const history = useHistory(); // 2. INICIALIZAR USEHISTORY
  const { user, actualizarPerfil } = useAuth(); 
  
  const [presentToast] = useIonToast();
  const [guardando, setGuardando] = useState(false);

  const [nombre] = useState(user?.nombre || '');
  const [rut] = useState(user?.rut || '');
  const [correo, setCorreo] = useState(user?.correo || '');
  const [telefono, setTelefono] = useState(user?.telefono || '');
  const [direccion, setDireccion] = useState(user?.direccion || '');

  const isTelefonoValid = telefono.length >= 8 && /^[0-9+ ]+$/.test(telefono);
  const isDireccionValid = direccion.length > 5;
  const isCorreoValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);

  const manejarGuardar = async () => {
    if (!isTelefonoValid || !isDireccionValid || !isCorreoValid) {
      presentToast({ message: 'Por favor, completa los campos correctamente.', duration: 2000, color: 'warning' });
      return;
    }

    setGuardando(true);
    try {
      await actualizarPerfil({ telefono, direccion, correo } as any);
      
      presentToast({ 
        message: 'Perfil actualizado exitosamente', 
        duration: 3000, 
        color: 'success',
        icon: checkmarkCircle,
        position: 'bottom'
      });
    } catch (error) {
      presentToast({ message: 'Hubo un error al guardar tu perfil.', duration: 3000, color: 'danger' });
    } finally {
      setGuardando(false);
    }
  };

  return (
    <IonPage>
      <Header />
      <IonContent color="light">
        {/* 1. Miga de Pan (Breadcrumbs) */}
        <div className="perfil-breadcrumb">
        &rsaquo; Usted está en: <strong>Editar Perfil</strong>
        </div>
        <div style={{ padding: '12px 24px' }}>
          <button
            onClick={() => history.push('/tramites')}
            style={{ background: 'none', border: 'none', color: '#1a3a6b', cursor: 'pointer', fontSize: '14px', fontWeight: 600 }}>
            ← Volver al Inicio
          </button>
        </div>
        {/* 3. AÑADIMOS PADDING BOTTOM PARA SEPARAR EL CONTENIDO DEL FOOTER */}
        <div className="perfil-container" style={{ paddingBottom: '80px' }}>
          <div className="perfil-header">
            <IonIcon icon={personCircleOutline} className="perfil-header-icon" />
            <h1 className="perfil-header-title">Mi Perfil</h1>
          </div>

          <IonCard className="perfil-card">
            
            <IonItem lines="full" className="perfil-item-readonly">
              <IonLabel position="stacked">Nombre Completo</IonLabel>
              <IonInput value={nombre} readonly={true} className="perfil-input-readonly" />
            </IonItem>

            <IonItem lines="full" className="perfil-item-readonly">
              <IonLabel position="stacked">RUT</IonLabel>
              <IonInput value={rut} readonly={true} className="perfil-input-readonly" />
            </IonItem>
            
            <IonItem lines="full" className="perfil-item-editable">
              <IonLabel position="stacked">Correo Electrónico</IonLabel>
              <IonInput 
                value={correo} 
                onIonInput={(e) => setCorreo(e.detail.value!)} 
                placeholder="ejemplo@correo.com"
                type="email"
              />
              {correo.length > 0 && (
                <IonIcon 
                  icon={isCorreoValid ? checkmarkCircle : closeCircle} 
                  color={isCorreoValid ? 'success' : 'danger'} 
                  slot="end" 
                  className="perfil-validation-icon"
                />
              )}
            </IonItem>

            <IonItem lines="full" className="perfil-item-editable">
              <IonLabel position="stacked">Teléfono de Contacto</IonLabel>
              <IonInput 
                value={telefono} 
                onIonInput={(e) => setTelefono(e.detail.value!)} 
                type="tel"
                placeholder="9 1234 5678"
              />
              {telefono.length > 0 && (
                <IonIcon 
                  icon={isTelefonoValid ? checkmarkCircle : closeCircle} 
                  color={isTelefonoValid ? 'success' : 'danger'} 
                  slot="end" 
                  className="perfil-validation-icon"
                />
              )}
            </IonItem>

            <IonItem lines="full" className="perfil-item-editable-last">
              <IonLabel position="stacked">Dirección</IonLabel>
              <IonInput 
                value={direccion} 
                onIonInput={(e) => setDireccion(e.detail.value!)} 
                placeholder="Ej: Av. Santo Domingo"
              />
              {direccion.length > 0 && (
                <IonIcon 
                  icon={isDireccionValid ? checkmarkCircle : closeCircle} 
                  color={isDireccionValid ? 'success' : 'danger'} 
                  slot="end" 
                  className="perfil-validation-icon"
                />
              )}
            </IonItem>

            <IonButton 
              expand="block" 
              onClick={manejarGuardar} 
              disabled={guardando || !isTelefonoValid || !isDireccionValid}
              className="perfil-save-button"
            >
              {guardando ? <IonSpinner name="dots" /> : 'Guardar Cambios'}
            </IonButton>

          </IonCard>
        </div>
        
        {/* EL FOOTER QUEDA SEPARADO GRACIAS AL PADDING DEL CONTENEDOR SUPERIOR */}
        <Footer />
      </IonContent>
    </IonPage>
  );
};

export default PerfilScreen;