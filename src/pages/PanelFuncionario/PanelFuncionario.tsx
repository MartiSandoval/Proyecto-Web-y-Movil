import React, { useState } from 'react';
import { useIonViewWillEnter } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import {
  IonPage,
  IonContent,
  IonCard,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
  IonSpinner,
  IonBadge,
} from '@ionic/react';
import {
  chevronForwardOutline,
  documentTextOutline,
  wifiOutline,
  businessOutline,
  cashOutline,
  personCircleOutline,
} from 'ionicons/icons';
import { useAuth } from '../../contexts/AuthContextCore';
import { getTramites } from '../../services/api';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/footer';

const PanelFuncionario: React.FC = () => {
  const { user } = useAuth();
  const history = useHistory();
  const [tramites, setTramites] = useState<any[]>([]);
  const [cargando, setCargando] = useState(true);

  const rolLabel = user?.rol === 'jefe_sucursal' ? 'Jefe de Sucursal' : 'Funcionario';

  useIonViewWillEnter(() => {
    setCargando(true);
    getTramites(user?.sucursal_id ?? undefined)
      .then(setTramites)
      .catch(() => setTramites([]))
      .finally(() => setCargando(false));
  });

  return (
    <IonPage>
      <IonContent color="light">

        <Header />

        <div style={{ padding: '12px 24px' }}>
          <button
            onClick={() => history.push('/tramites')}
            style={{ background: 'none', border: 'none', color: '#1a3a6b', cursor: 'pointer', fontSize: '14px', fontWeight: 600 }}
          >
            ← Volver a Trámites
          </button>
        </div>

        {/* Miga de pan */}
        <div style={{ padding: '15px 40px', fontSize: '13px', color: '#64748b', display: 'flex', alignItems: 'center' }}>
          <IonIcon icon={chevronForwardOutline} style={{ marginRight: '5px' }} />
          Usted está en: <strong style={{ marginLeft: '5px', color: '#334155', textDecoration: 'underline' }}>Panel de Gestión</strong>
        </div>

        <div style={{ padding: '20px 40px', maxWidth: '1200px', margin: '0 auto' }}>

          {/* Tarjeta de bienvenida con rol */}
          <IonCard style={{ marginBottom: '30px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.07)', border: '1px solid #e2e8f0', backgroundColor: 'white' }}>
            <IonCardContent style={{ padding: '25px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <IonIcon icon={personCircleOutline} style={{ fontSize: '52px', color: '#1c3659' }} />
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                    <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 'bold', color: '#1e293b' }}>
                      Bienvenido/a, {user?.nombre}
                    </h2>
                    <IonBadge color="primary" style={{ fontSize: '12px', padding: '4px 8px' }}>
                      {rolLabel}
                    </IonBadge>
                  </div>
                  <p style={{ margin: 0, color: '#64748b', fontSize: '14px' }}>
                    Panel de gestión de trámites municipales.
                    {user?.sucursal_id
                      ? ' Mostrando trámites de tu sucursal asignada.'
                      : ' Mostrando todos los trámites disponibles.'}
                  </p>
                </div>
              </div>
            </IonCardContent>
          </IonCard>

          {/* Encabezado de la sección */}
          <h1 style={{ fontWeight: 'bold', color: '#334155', fontSize: '24px', marginBottom: '8px' }}>
            Trámites bajo tu gestión
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '15px', marginBottom: '30px' }}>
            Revisa los trámites asignados a tu sucursal y su información.
          </p>

          {/* Listado de trámites */}
          {cargando ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '60px' }}>
              <IonSpinner name="crescent" />
            </div>
          ) : tramites.length === 0 ? (
            <p style={{ color: '#94a3b8', textAlign: 'center', padding: '40px' }}>
              No hay trámites disponibles para tu sucursal.
            </p>
          ) : (
            <IonGrid>
              <IonRow>
                {tramites.map((tramite: any) => (
                  <IonCol size="12" sizeMd="6" key={tramite.id} style={{ padding: '10px' }}>
                    <IonCard style={{ margin: 0, boxShadow: '0 2px 10px rgba(0,0,0,0.05)', borderRadius: '10px', border: '1px solid #f1f5f9', backgroundColor: 'white' }}>
                      <div style={{ display: 'flex', padding: '22px', gap: '18px', alignItems: 'flex-start' }}>

                        {/* Icono */}
                        <IonIcon
                          icon={documentTextOutline}
                          style={{ fontSize: '40px', color: '#475569', flexShrink: 0, marginTop: '4px' }}
                        />

                        {/* Info del trámite */}
                        <div style={{ flex: 1 }}>
                          <h3 style={{ fontWeight: 'bold', color: '#334155', fontSize: '15px', marginTop: 0, marginBottom: '8px', lineHeight: '1.4' }}>
                            {tramite.nombre}
                          </h3>
                          {tramite.descripcion && (
                            <p style={{ color: '#94a3b8', fontSize: '13px', margin: '0 0 12px 0', lineHeight: '1.5' }}>
                              {tramite.descripcion}
                            </p>
                          )}

                          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                            {/* Badge tipo */}
                            <span style={{
                              backgroundColor: tramite.es_en_linea ? '#d1fae5' : '#fef3c7',
                              color: tramite.es_en_linea ? '#065f46' : '#92400e',
                              padding: '3px 9px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold',
                              display: 'flex', alignItems: 'center', gap: '4px'
                            }}>
                              <IonIcon icon={tramite.es_en_linea ? wifiOutline : businessOutline} />
                              {tramite.es_en_linea ? 'En línea' : 'Presencial'}
                            </span>

                            {/* Badge costo */}
                            <span style={{
                              backgroundColor: '#f1f5f9', color: '#475569',
                              padding: '3px 9px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold',
                              display: 'flex', alignItems: 'center', gap: '4px'
                            }}>
                              <IonIcon icon={cashOutline} />
                              {tramite.costo ?? 'Gratuito'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </IonCard>
                  </IonCol>
                ))}
              </IonRow>
            </IonGrid>
          )}
        </div>

        <Footer />
      </IonContent>
    </IonPage>
  );
};

export default PanelFuncionario;
