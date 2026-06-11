import React, { useMemo, useState } from 'react';
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
  IonSearchbar,
  IonLabel,
  IonItem,
} from '@ionic/react';
import {
  chevronForwardOutline,
  personCircleOutline,
  timeOutline,
  calendarOutline,
} from 'ionicons/icons';
import type { CitaGestionModel, EstadoCita } from '../../../citas/domain/entities/CitaGestionModel';
import type { TramiteModel } from '../../../tramites/domain/entities/TramiteModel';
import { useAuth } from '../../../auth/presentation/hooks/useAuth';
import { useCitasData } from '../../../citas/composition/CitasModule';
import { useTramites } from '../../../tramites/composition/TramitesModule';
import Header from '../../../../core/presentation/components/organisms/Header/Header';
import Footer from '../../../../core/presentation/components/organisms/Footer/footer';

const ESTADOS: EstadoCita[] = ['pendiente', 'confirmado', 'completado', 'cancelado'];

const estadoColor: Record<EstadoCita, { bg: string; color: string }> = {
  pendiente: { bg: '#fef3c7', color: '#92400e' },
  confirmado: { bg: '#dbeafe', color: '#1e40af' },
  completado: { bg: '#d1fae5', color: '#065f46' },
  cancelado: { bg: '#fee2e2', color: '#991b1b' },
};

const hoy = () => new Date().toISOString().slice(0, 10);

const GestionCitasScreen: React.FC = () => {
  const history = useHistory();
  const { user } = useAuth();
  const { getTramitesUseCase } = useTramites();
  const { getCitasPorTramiteUseCase, actualizarEstadoCitaUseCase } = useCitasData();

  const [tramites, setTramites] = useState<TramiteModel[]>([]);
  const [tramiteId, setTramiteId] = useState<string>('');
  const [fecha, setFecha] = useState<string>(hoy());
  const [citas, setCitas] = useState<CitaGestionModel[]>([]);
  const [busqueda, setBusqueda] = useState('');
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');

  useIonViewWillEnter(() => {
    // El funcionario solo gestiona citas de sus trámites asignados; el jefe ve todos los de la sucursal.
    const funcionarioId = user?.rol === 'funcionario' ? user?.id : undefined;
    getTramitesUseCase(user?.sucursal_id ?? undefined, funcionarioId)
      .then((data) => {
        setTramites(data);
        if (!tramiteId && data.length > 0) setTramiteId(data[0].id);
      })
      .catch(() => setTramites([]));
  });

  const cargarCitas = (tId: string, f: string) => {
    if (!tId) return;
    setCargando(true);
    setError('');
    getCitasPorTramiteUseCase(tId, f || undefined)
      .then(setCitas)
      .catch(() => {
        setCitas([]);
        setError('No se pudieron cargar las citas.');
      })
      .finally(() => setCargando(false));
  };

  // Recargar cuando cambie el trámite o la fecha seleccionados.
  React.useEffect(() => {
    if (tramiteId) cargarCitas(tramiteId, fecha);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tramiteId, fecha]);

  const citasFiltradas = useMemo(() => {
    const q = busqueda.trim().toLowerCase();
    if (!q) return citas;
    return citas.filter(
      (c) =>
        c.ciudadanoRut.toLowerCase().includes(q) ||
        c.ciudadanoNombre.toLowerCase().includes(q)
    );
  }, [citas, busqueda]);

  const cambiarEstado = async (cita: CitaGestionModel, estado: EstadoCita) => {
    if (estado === cita.estado) return;
    // Optimista: actualiza en memoria y revierte si falla.
    setCitas((prev) => prev.map((c) => (c.id === cita.id ? { ...c, estado } : c)));
    try {
      await actualizarEstadoCitaUseCase(cita.id, estado);
    } catch {
      setCitas((prev) => prev.map((c) => (c.id === cita.id ? { ...c, estado: cita.estado } : c)));
      setError('No se pudo actualizar el estado de la cita.');
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
          Usted está en: <strong style={{ marginLeft: '5px', color: '#334155', textDecoration: 'underline' }}>Panel · Gestión de Citas</strong>
        </div>

        <div style={{ padding: '20px 40px', maxWidth: '1200px', margin: '0 auto' }}>
          <h1 style={{ fontWeight: 'bold', color: '#334155', fontSize: '24px', marginBottom: '8px' }}>
            Gestión de Citas
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '15px', marginBottom: '24px' }}>
            Revisa las citas de tu sucursal, busca por RUT y actualiza su estado.
          </p>

          {/* Filtros */}
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

                <IonItem style={{ flex: '0 1 220px', '--background': 'transparent' } as React.CSSProperties} lines="none">
                  <IonLabel position="stacked">Fecha</IonLabel>
                  <input
                    type="date"
                    value={fecha}
                    onChange={(e) => setFecha(e.target.value)}
                    style={{ border: '1px solid #e2e8f0', borderRadius: '6px', padding: '8px', fontSize: '14px', width: '100%' }}
                  />
                </IonItem>
              </div>

              <IonSearchbar
                value={busqueda}
                onIonInput={(e) => setBusqueda(e.detail.value ?? '')}
                placeholder="Buscar por RUT o nombre"
                style={{ marginTop: '8px', padding: 0 }}
              />
            </IonCardContent>
          </IonCard>

          {/* Listado */}
          {cargando ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '60px' }}>
              <IonSpinner name="crescent" />
            </div>
          ) : error ? (
            <p style={{ color: '#b91c1c', textAlign: 'center', padding: '20px' }}>{error}</p>
          ) : citasFiltradas.length === 0 ? (
            <p style={{ color: '#94a3b8', textAlign: 'center', padding: '40px' }}>
              No hay citas para los filtros seleccionados.
            </p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {citasFiltradas.map((cita) => {
                const colores = estadoColor[cita.estado];
                return (
                  <IonCard key={cita.id} style={{ margin: 0, borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', border: '1px solid #f1f5f9', backgroundColor: 'white' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '18px 22px', flexWrap: 'wrap' }}>
                      <IonIcon icon={personCircleOutline} style={{ fontSize: '40px', color: '#475569', flexShrink: 0 }} />

                      <div style={{ flex: '1 1 200px' }}>
                        <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 'bold', color: '#334155' }}>
                          {cita.ciudadanoNombre}
                        </h3>
                        <p style={{ margin: '2px 0 0', fontSize: '13px', color: '#94a3b8' }}>
                          RUT: {cita.ciudadanoRut}
                        </p>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#64748b', fontSize: '14px', minWidth: '120px' }}>
                        <IonIcon icon={timeOutline} />
                        {cita.fecha} · {cita.hora?.slice(0, 5)}
                      </div>

                      <span style={{
                        backgroundColor: colores.bg, color: colores.color,
                        padding: '4px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold', textTransform: 'capitalize',
                      }}>
                        {cita.estado}
                      </span>

                      <IonSelect
                        value={cita.estado}
                        interface="popover"
                        style={{ minWidth: '150px', border: '1px solid #e2e8f0', borderRadius: '6px', '--padding-start': '10px' } as React.CSSProperties}
                        onIonChange={(e) => cambiarEstado(cita, e.detail.value as EstadoCita)}
                      >
                        {ESTADOS.map((est) => (
                          <IonSelectOption key={est} value={est} style={{ textTransform: 'capitalize' }}>
                            {est}
                          </IonSelectOption>
                        ))}
                      </IonSelect>
                    </div>
                  </IonCard>
                );
              })}
            </div>
          )}
        </div>

        <Footer />
      </IonContent>
    </IonPage>
  );
};

export default GestionCitasScreen;
