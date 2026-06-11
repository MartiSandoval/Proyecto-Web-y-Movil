import React, { useEffect, useState } from 'react';
import { useIonViewWillEnter } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import {
  IonPage,
  IonContent,
  IonCard,
  IonCardContent,
  IonIcon,
  IonSpinner,
  IonSelect,
  IonSelectOption,
  IonLabel,
  IonItem,
  IonInput,
  IonToggle,
  IonButton,
} from '@ionic/react';
import {
  chevronForwardOutline,
  lockClosedOutline,
  trashOutline,
  calendarOutline,
} from 'ionicons/icons';
import type { BloqueoModel } from '../../../bloqueos/domain/entities/BloqueoModel';
import type { TimeSlotModel } from '../../../citas/domain/entities/TimeSlotModel';
import type { TramiteModel } from '../../../tramites/domain/entities/TramiteModel';
import { useAuth } from '../../../auth/presentation/hooks/useAuth';
import { useBloqueosData } from '../../../bloqueos/composition/BloqueosModule';
import { useCitasData } from '../../../citas/composition/CitasModule';
import { useTramites } from '../../../tramites/composition/TramitesModule';
import Header from '../../../../core/presentation/components/organisms/Header/Header';
import Footer from '../../../../core/presentation/components/organisms/Footer/footer';

const hoy = () => new Date().toISOString().slice(0, 10);

const BloqueoHorariosScreen: React.FC = () => {
  const history = useHistory();
  const { user } = useAuth();
  const { getTramitesUseCase } = useTramites();
  const { getDisponibilidadUseCase } = useCitasData();
  const { getBloqueosUseCase, crearBloqueoUseCase, eliminarBloqueoUseCase } = useBloqueosData();

  const [tramites, setTramites] = useState<TramiteModel[]>([]);
  const [tramiteId, setTramiteId] = useState<string>('');
  const [fecha, setFecha] = useState<string>(hoy());
  const [diaCompleto, setDiaCompleto] = useState(true);
  const [hora, setHora] = useState<string>('');
  const [motivo, setMotivo] = useState<string>('');
  const [slots, setSlots] = useState<TimeSlotModel[]>([]);

  const [bloqueos, setBloqueos] = useState<BloqueoModel[]>([]);
  const [cargando, setCargando] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState('');

  useIonViewWillEnter(() => {
    // El funcionario solo bloquea horarios de sus trámites asignados; el jefe, todos los de la sucursal.
    const funcionarioId = user?.rol === 'funcionario' ? user?.id : undefined;
    getTramitesUseCase(user?.sucursal_id ?? undefined, funcionarioId)
      .then((data) => {
        setTramites(data);
        if (!tramiteId && data.length > 0) setTramiteId(data[0].id);
      })
      .catch(() => setTramites([]));
  });

  const cargarBloqueos = (tId: string, f: string) => {
    if (!tId) return;
    setCargando(true);
    getBloqueosUseCase(tId, f || undefined)
      .then(setBloqueos)
      .catch(() => setBloqueos([]))
      .finally(() => setCargando(false));
  };

  // Recargar bloqueos y horas disponibles al cambiar trámite/fecha.
  useEffect(() => {
    if (!tramiteId) return;
    cargarBloqueos(tramiteId, fecha);
    getDisponibilidadUseCase(tramiteId, fecha)
      .then(setSlots)
      .catch(() => setSlots([]));
    setHora('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tramiteId, fecha]);

  const horasDisponibles = slots.filter((s) => s.disponible).map((s) => s.hora);

  const guardar = async () => {
    setError('');
    if (!tramiteId) {
      setError('Selecciona un trámite.');
      return;
    }
    if (!diaCompleto && !hora) {
      setError('Selecciona una hora a bloquear o activa "Día completo".');
      return;
    }
    setGuardando(true);
    try {
      await crearBloqueoUseCase({
        tramiteId,
        fecha,
        hora: diaCompleto ? undefined : hora,
        motivo: motivo.trim() || undefined,
      });
      setMotivo('');
      setHora('');
      cargarBloqueos(tramiteId, fecha);
    } catch {
      setError('No se pudo crear el bloqueo.');
    } finally {
      setGuardando(false);
    }
  };

  const eliminar = async (id: string) => {
    const previos = bloqueos;
    setBloqueos((prev) => prev.filter((b) => b.id !== id));
    try {
      await eliminarBloqueoUseCase(id);
    } catch {
      setBloqueos(previos);
      setError('No se pudo eliminar el bloqueo.');
    }
  };

  return (
    <IonPage>
      <IonContent color="light">
        <Header />

        <div style={{ padding: '12px 24px' }}>
          <button
            onClick={() => history.push('/panel-funcionario')}
            style={{ background: 'none', border: 'none', color: '#1a3a6b', cursor: 'pointer', fontSize: '14px', fontWeight: 600 }}
          >
            ← Volver al Panel
          </button>
        </div>

        <div style={{ padding: '15px 40px', fontSize: '13px', color: '#64748b', display: 'flex', alignItems: 'center' }}>
          <IonIcon icon={chevronForwardOutline} style={{ marginRight: '5px' }} />
          Usted está en: <strong style={{ marginLeft: '5px', color: '#334155', textDecoration: 'underline' }}>Panel · Bloqueo de Horarios</strong>
        </div>

        <div style={{ padding: '20px 40px', maxWidth: '1000px', margin: '0 auto' }}>
          <h1 style={{ fontWeight: 'bold', color: '#334155', fontSize: '24px', marginBottom: '8px' }}>
            Bloqueo de Horarios
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '15px', marginBottom: '24px' }}>
            Bloquea un día completo o una hora puntual de un trámite. Los bloqueos se reflejan de inmediato
            en el calendario de agendamiento de los ciudadanos.
          </p>

          {/* Formulario */}
          <IonCard style={{ marginBottom: '24px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.06)', backgroundColor: 'white' }}>
            <IonCardContent>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <IonItem style={{ flex: '1 1 280px', '--background': 'transparent' } as React.CSSProperties} lines="none">
                  <IonIcon icon={calendarOutline} slot="start" style={{ color: '#64748b' }} />
                  <IonLabel position="stacked">Trámite</IonLabel>
                  <IonSelect
                    value={tramiteId}
                    placeholder="Selecciona un trámite"
                    onIonChange={(e) => setTramiteId(e.detail.value)}
                  >
                    {tramites.map((t) => (
                      <IonSelectOption key={t.id} value={t.id}>
                        {t.nombre}
                      </IonSelectOption>
                    ))}
                  </IonSelect>
                </IonItem>

                <IonItem style={{ flex: '0 1 200px', '--background': 'transparent' } as React.CSSProperties} lines="none">
                  <IonLabel position="stacked">Fecha</IonLabel>
                  <input
                    type="date"
                    value={fecha}
                    min={hoy()}
                    onChange={(e) => setFecha(e.target.value)}
                    style={{ border: '1px solid #e2e8f0', borderRadius: '6px', padding: '8px', fontSize: '14px', width: '100%' }}
                  />
                </IonItem>
              </div>

              <IonItem lines="none" style={{ '--background': 'transparent', marginTop: '8px' } as React.CSSProperties}>
                <IonLabel>Bloquear día completo</IonLabel>
                <IonToggle
                  checked={diaCompleto}
                  onIonChange={(e) => setDiaCompleto(e.detail.checked)}
                />
              </IonItem>

              {!diaCompleto && (
                <IonItem lines="none" style={{ '--background': 'transparent' } as React.CSSProperties}>
                  <IonLabel position="stacked">Hora a bloquear</IonLabel>
                  <IonSelect
                    value={hora}
                    placeholder="Selecciona una hora"
                    onIonChange={(e) => setHora(e.detail.value)}
                  >
                    {horasDisponibles.length === 0 ? (
                      <IonSelectOption disabled value="">
                        Sin horas disponibles para esta fecha
                      </IonSelectOption>
                    ) : (
                      horasDisponibles.map((h) => (
                        <IonSelectOption key={h} value={h}>
                          {h}
                        </IonSelectOption>
                      ))
                    )}
                  </IonSelect>
                </IonItem>
              )}

              <IonItem lines="none" style={{ '--background': 'transparent' } as React.CSSProperties}>
                <IonLabel position="stacked">Motivo (opcional)</IonLabel>
                <IonInput
                  value={motivo}
                  placeholder="Ej: Feriado, mantenimiento, ausencia de personal"
                  onIonInput={(e) => setMotivo(e.detail.value ?? '')}
                />
              </IonItem>

              {error && (
                <p style={{ color: '#b91c1c', fontSize: '14px', margin: '12px 0 0' }}>{error}</p>
              )}

              <IonButton
                expand="block"
                style={{ marginTop: '16px', '--background': '#1c3659' } as React.CSSProperties}
                disabled={guardando}
                onClick={guardar}
              >
                <IonIcon icon={lockClosedOutline} slot="start" />
                {guardando ? 'Guardando...' : 'Crear bloqueo'}
              </IonButton>
            </IonCardContent>
          </IonCard>

          {/* Listado de bloqueos vigentes */}
          <h2 style={{ fontWeight: 'bold', color: '#334155', fontSize: '18px', marginBottom: '12px' }}>
            Bloqueos para la fecha seleccionada
          </h2>

          {cargando ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '40px' }}>
              <IonSpinner name="crescent" />
            </div>
          ) : bloqueos.length === 0 ? (
            <p style={{ color: '#94a3b8', textAlign: 'center', padding: '30px' }}>
              No hay bloqueos para este trámite en la fecha seleccionada.
            </p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {bloqueos.map((b) => (
                <IonCard key={b.id} style={{ margin: 0, borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', border: '1px solid #f1f5f9', backgroundColor: 'white' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '16px 20px' }}>
                    <IonIcon icon={lockClosedOutline} style={{ fontSize: '26px', color: '#b45309', flexShrink: 0 }} />
                    <div style={{ flex: 1 }}>
                      <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 'bold', color: '#334155' }}>
                        {b.esDiaCompleto ? 'Día completo' : `Hora ${b.hora?.slice(0, 5)}`}
                      </h3>
                      <p style={{ margin: '2px 0 0', fontSize: '13px', color: '#94a3b8' }}>
                        {b.fecha}{b.motivo ? ` · ${b.motivo}` : ''}
                      </p>
                    </div>
                    <IonButton fill="clear" color="danger" onClick={() => eliminar(b.id)}>
                      <IonIcon icon={trashOutline} slot="icon-only" />
                    </IonButton>
                  </div>
                </IonCard>
              ))}
            </div>
          )}
        </div>

        <Footer />
      </IonContent>
    </IonPage>
  );
};

export default BloqueoHorariosScreen;
