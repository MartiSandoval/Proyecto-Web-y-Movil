import React, { useState } from 'react';
import { useIonViewWillEnter } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import {
  IonPage,
  IonContent,
  IonCard,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
  IonSpinner
} from '@ionic/react';
import {
  wifi,
  timeOutline,
  checkmarkCircleOutline,
  chevronForwardOutline,
  businessOutline,
  clipboardOutline
} from 'ionicons/icons';
import { getMisCitas } from '../../services/api';

// Importación de tus componentes modulares
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/footer';
import './HistorialTramites.css';

const estadoLabel: Record<string, string> = {
  pendiente: 'Pendiente',
  confirmado: 'Confirmado',
  cancelado: 'Cancelado',
  completado: 'Completado',
};

const HistorialTramites: React.FC = () => {
  const history = useHistory();
  const [citas, setCitas] = useState<any[]>([]);
  const [cargando, setCargando] = useState(true);

  useIonViewWillEnter(() => {
    setCargando(true);
    getMisCitas()
      .then(setCitas)
      .finally(() => setCargando(false));
  });

  return (
    <IonPage>
      <IonContent color="light">

        {/* --- COMPONENTES GLOBALES IMPORTADOS --- */}
        <Header/>

        <div style={{ padding: '12px 24px' }}>
          <button
            onClick={() => history.push('/tramites')}
            style={{ background: 'none', border: 'none', color: '#1a3a6b', cursor: 'pointer', fontSize: '14px', fontWeight: 600 }}
          >
            ← Volver a Trámites
          </button>
        </div>

        {/* --- CONTENIDO ESPECÍFICO DE LA PÁGINA --- */}
        
        {/* 1. Miga de Pan (Breadcrumbs) */}
        <div style={{ padding: '15px 40px', fontSize: '13px', color: '#64748b', display: 'flex', alignItems: 'center' }}>
          <IonIcon icon={chevronForwardOutline} style={{ marginRight: '5px' }} />
          Usted está en: <strong style={{ marginLeft: '5px', color: '#334155', textDecoration: 'underline' }}>Historial de Trámites</strong>
        </div>

        {/* 2. Encabezado de la Sección */}
        <div style={{ padding: '20px 40px', maxWidth: '1200px', margin: '0 auto' }}>
          <h1 style={{ fontWeight: 'bold', color: '#334155', fontSize: '28px', marginBottom: '10px' }}>
            Historial de Trámites
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '16px', marginBottom: '40px', lineHeight: '1.5' }}>
            Aquí podrá encontrar todos los trámites que ha realizado a lo largo del tiempo.<br />
            Podrá modificar, cancelar o revisar el estado de sus trámites.
          </p>

          {/* 3. Listado de Trámites */}
          {cargando ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '60px' }}>
              <IonSpinner name="crescent" />
            </div>
          ) : citas.length === 0 ? (
            <p style={{ color: '#94a3b8', textAlign: 'center', padding: '40px' }}>
              No tienes trámites agendados aún.
            </p>
          ) : (
            <IonGrid>
              <IonRow>
                {citas.map((cita) => {
                  const label = estadoLabel[cita.estado] ?? cita.estado;
                  const terminado = cita.estado === 'completado';
                  return (
                    <IonCol size="12" sizeMd="6" key={cita.id} style={{ padding: '15px' }}>
                      <IonCard style={{ margin: 0, boxShadow: '0 2px 10px rgba(0,0,0,0.05)', borderRadius: '10px', border: '1px solid #f1f5f9', backgroundColor: 'white' }}>

                        <div style={{ display: 'flex', padding: '25px', gap: '20px' }}>
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px', minWidth: '50px' }}>
                            <IonIcon icon={clipboardOutline} style={{ fontSize: '45px', color: '#475569' }} />
                            <IonIcon icon={businessOutline} style={{ fontSize: '20px', color: '#cbd5e1' }} />
                          </div>

                          <div style={{ flex: 1 }}>
                            <h3 style={{ fontWeight: 'bold', color: '#475569', fontSize: '16px', marginTop: '5px', marginBottom: '8px', lineHeight: '1.4' }}>
                              {cita.tramites?.nombre ?? 'Trámite'}
                            </h3>
                            <p style={{ color: '#94a3b8', fontSize: '13px', margin: 0 }}>
                              {cita.fecha} — {cita.hora}
                            </p>
                          </div>

                          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', minWidth: '130px' }}>
                            <div style={{ backgroundColor: '#fcb864', color: '#7c2d12', padding: '6px 10px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px' }}>
                              <IonIcon icon={wifi} /> En línea
                            </div>
                            <div style={{
                              backgroundColor: terminado ? '#10b981' : '#fde047',
                              color: terminado ? 'white' : '#854d0e',
                              padding: '6px 10px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px'
                            }}>
                              <IonIcon icon={terminado ? checkmarkCircleOutline : timeOutline} />
                              {label}
                            </div>
                          </div>
                        </div>

                      </IonCard>
                    </IonCol>
                  );
                })}
              </IonRow>
            </IonGrid>
          )}

        </div>
        <Footer />
      </IonContent>
    </IonPage>
  );
};

export default HistorialTramites;