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
  IonSpinner,
  useIonToast,
  IonAlert,
  IonButton,
  IonSegment,
  IonSegmentButton,
  IonLabel
} from '@ionic/react';
import {
  wifi,
  timeOutline,
  checkmarkCircleOutline,
  chevronForwardOutline,
  businessOutline,
  clipboardOutline
} from 'ionicons/icons';
import type { CitaHistorialModel } from '../../domain/entities/CitaHistorialModel';
import { useCitasData } from '../../composition/CitasModule';

// Importación de tus componentes modulares
import Header from '../../../../core/presentation/components/organisms/Header/Header';
import Footer from '../../../../core/presentation/components/organisms/Footer/footer';
import './HistorialTramitesScreen.css';

const estadoLabel: Record<string, string> = {
  pendiente: 'Pendiente',
  confirmado: 'Confirmado',
  cancelado: 'Cancelado',
  completado: 'Completado',
};

const HistorialTramitesScreen: React.FC = () => {
  const history = useHistory();
  const [citas, setCitas] = useState<CitaHistorialModel[]>([]);
  const [cargando, setCargando] = useState(true);

  // Extraemos los casos de uso
  const { getMisCitasUseCase, cancelarMiCitaUseCase } = useCitasData();
  
  // Estados para la alerta y toast
  const [presentToast] = useIonToast();
  const [mostrarAlerta, setMostrarAlerta] = useState(false);
  const [citaSeleccionada, setCitaSeleccionada] = useState<string | null>(null);
  
  // Estado para saber qué pestaña está activa
  const [filtro, setFiltro] = useState<'vigentes' | 'canceladas'>('vigentes');

  // Separar las citas usando filter()
  const citasVigentes = citas.filter(cita => cita.estado.toLowerCase() !== 'cancelado');
  const citasCanceladas = citas.filter(cita => cita.estado.toLowerCase() === 'cancelado');
  
  // Decidir qué lista dibujar según la pestaña activa
  const citasAMostrar = filtro === 'vigentes' ? citasVigentes : citasCanceladas;
  
  const cargarCitas = () => {
    getMisCitasUseCase().then(setCitas);
  };
  
  useIonViewWillEnter(() => {
    setCargando(true);
    getMisCitasUseCase()
      .then(setCitas)
      .finally(() => setCargando(false));
  });

  // Función para abrir la alerta
  const intentarCancelar = (citaId: string) => {
    (document.activeElement as HTMLElement)?.blur(); 
    setCitaSeleccionada(citaId);
    setMostrarAlerta(true);
  };
  
  const confirmarCancelacion = async () => {
    if (!citaSeleccionada) return;
    try {
      await cancelarMiCitaUseCase(citaSeleccionada);
      presentToast({ message: 'Cita cancelada exitosamente', duration: 2500, color: 'success' });
      cargarCitas(); // Refresca la tabla automáticamente
    } catch (error) {
      presentToast({ message: 'Error al cancelar la cita', duration: 2500, color: 'danger' });
    } finally {
      setMostrarAlerta(false);
      setCitaSeleccionada(null);
    }
  };

  return (
    <IonPage>
      <IonContent color="light">

        <Header/>

        <div style={{ padding: '12px 24px' }}>
          <button
            onClick={() => history.push('/tramites')}
            style={{ background: 'none', border: 'none', color: '#1a3a6b', cursor: 'pointer', fontSize: '14px', fontWeight: 600 }}
          >
            ← Volver a Trámites
          </button>
        </div>

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
          <p style={{ color: '#94a3b8', fontSize: '16px', marginBottom: '30px', lineHeight: '1.5' }}>
            Aquí podrá encontrar todos los trámites que ha realizado a lo largo del tiempo.<br />
            Podrá modificar, cancelar o revisar el estado de sus trámites.
          </p>

          {/* NUEVO: Segmento (Pestañas) para filtrar */}
          <IonSegment 
            value={filtro} 
            onIonChange={(e) => setFiltro(e.detail.value as 'vigentes' | 'canceladas')}
            style={{ maxWidth: '400px', marginBottom: '30px', backgroundColor: 'white' }}
          >
            <IonSegmentButton value="vigentes">
              <IonLabel>Vigentes</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="canceladas">
              <IonLabel>Canceladas</IonLabel>
            </IonSegmentButton>
          </IonSegment>

          {/* 3. Listado de Trámites */}
          {cargando ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '60px' }}>
              <IonSpinner name="crescent" />
            </div>
          ) : citasAMostrar.length === 0 ? (
            <p style={{ color: '#94a3b8', textAlign: 'center', padding: '40px', backgroundColor: 'white', borderRadius: '8px', border: '1px dashed #cbd5e1' }}>
              {filtro === 'vigentes' 
                ? 'No tienes trámites vigentes en este momento.' 
                : 'No tienes trámites cancelados en tu historial.'}
            </p>
          ) : (
            <IonGrid>
              <IonRow>
                {/* AQUI SE CAMBIÓ 'citas.map' POR 'citasAMostrar.map' */}
                {citasAMostrar.map((cita) => {
                  const estadoNormalizado = cita.estado.toLowerCase();
                  const label = estadoLabel[estadoNormalizado] ?? cita.estado;
                  const terminado = estadoNormalizado === 'completado';
                  const cancelado = estadoNormalizado === 'cancelado';
                  
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
                              {cita.tramiteNombre}
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
                              backgroundColor: terminado ? '#10b981' : (cancelado ? '#ef4444' : '#fde047'),
                              color: terminado || cancelado ? 'white' : '#854d0e',
                              padding: '6px 10px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px'
                            }}>
                              <IonIcon icon={terminado ? checkmarkCircleOutline : timeOutline} />
                              {label}
                            </div>

                            {/* BOTÓN DE CANCELAR */}
                            {estadoNormalizado === 'pendiente' && (
                              <IonButton 
                                color="danger" 
                                fill="outline" 
                                size="small" 
                                style={{ marginTop: '5px', fontSize: '12px', height: '30px' }}
                                onClick={() => intentarCancelar(cita.id)}
                              >
                                Cancelar Cita
                              </IonButton>
                            )}

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

      <IonAlert
        isOpen={mostrarAlerta}
        onDidDismiss={() => setMostrarAlerta(false)}
        header="¿Cancelar cita?"
        message="Esta acción no se puede deshacer. Perderás tu hora reservada."
        buttons={[
          {
            text: 'No, mantener',
            role: 'cancel',
            handler: () => setCitaSeleccionada(null)
          },
          {
            text: 'Sí, cancelar',
            role: 'confirm',
            handler: confirmarCancelacion
          }
        ]}
      />

    </IonPage>
  );
};

export default HistorialTramitesScreen;