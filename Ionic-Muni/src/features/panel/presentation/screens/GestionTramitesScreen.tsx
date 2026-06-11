import React, { useState } from 'react';
import { useIonViewWillEnter } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import {
  IonPage,
  IonContent,
  IonCard,
  IonCardContent,
  IonIcon,
  IonSpinner,
  IonModal,
  IonButton,
  IonToggle,
  IonCheckbox,
} from '@ionic/react';
import {
  chevronForwardOutline,
  documentTextOutline,
  addOutline,
  createOutline,
  trashOutline,
  closeOutline,
  wifiOutline,
  businessOutline,
  cashOutline,
} from 'ionicons/icons';
import type { TramiteModel } from '../../../tramites/domain/entities/TramiteModel';
import type { FuncionarioModel } from '../../../tramites/domain/entities/FuncionarioModel';
import type { HorarioModel } from '../../../tramites/domain/entities/HorarioModel';
import { useAuth } from '../../../auth/presentation/hooks/useAuth';
import { useTramites } from '../../../tramites/composition/TramitesModule';
import Header from '../../../../core/presentation/components/organisms/Header/Header';
import Footer from '../../../../core/presentation/components/organisms/Footer/footer';

const DIAS = [
  { n: 1, label: 'Lunes' },
  { n: 2, label: 'Martes' },
  { n: 3, label: 'Miércoles' },
  { n: 4, label: 'Jueves' },
  { n: 5, label: 'Viernes' },
  { n: 6, label: 'Sábado' },
  { n: 7, label: 'Domingo' },
];

interface DiaForm {
  activo: boolean;
  horaInicio: string;
  horaFin: string;
  intervalo: number;
}

const diaPorDefecto = (): DiaForm => ({
  activo: false,
  horaInicio: '09:00',
  horaFin: '14:00',
  intervalo: 30,
});

const diasIniciales = (): DiaForm[] => DIAS.map(() => diaPorDefecto());

const GestionTramitesScreen: React.FC = () => {
  const history = useHistory();
  const { user } = useAuth();
  const {
    getTramitesUseCase,
    getTramiteUseCase,
    crearTramiteUseCase,
    actualizarTramiteUseCase,
    eliminarTramiteUseCase,
    asignarFuncionariosUseCase,
    getFuncionariosUseCase,
  } = useTramites();

  const [tramites, setTramites] = useState<TramiteModel[]>([]);
  const [funcionarios, setFuncionarios] = useState<FuncionarioModel[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  // Formulario (modal)
  const [modalAbierto, setModalAbierto] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [guardando, setGuardando] = useState(false);
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [costo, setCosto] = useState('Gratuito');
  const [esEnLinea, setEsEnLinea] = useState(true);
  const [documentos, setDocumentos] = useState<string[]>([]);
  const [nuevoDoc, setNuevoDoc] = useState('');
  const [dias, setDias] = useState<DiaForm[]>(diasIniciales());
  const [funcionariosSel, setFuncionariosSel] = useState<string[]>([]);

  const cargar = () => {
    setCargando(true);
    setError('');
    Promise.all([
      getTramitesUseCase(user?.sucursal_id ?? undefined),
      getFuncionariosUseCase(),
    ])
      .then(([ts, fs]) => {
        setTramites(ts);
        setFuncionarios(fs);
      })
      .catch(() => setError('No se pudieron cargar los datos.'))
      .finally(() => setCargando(false));
  };

  useIonViewWillEnter(cargar);

  const resetForm = () => {
    setEditId(null);
    setNombre('');
    setDescripcion('');
    setCosto('Gratuito');
    setEsEnLinea(true);
    setDocumentos([]);
    setNuevoDoc('');
    setDias(diasIniciales());
    setFuncionariosSel([]);
  };

  const abrirNuevo = () => {
    resetForm();
    setModalAbierto(true);
  };

  const abrirEditar = async (id: string) => {
    resetForm();
    setEditId(id);
    setModalAbierto(true);
    try {
      const detalle = await getTramiteUseCase(id);
      setNombre(detalle.nombre);
      setDescripcion(detalle.descripcion ?? '');
      setCosto(detalle.costo ?? 'Gratuito');
      setEsEnLinea(detalle.esEnLinea);
      setDocumentos(detalle.documentosRequeridos ?? []);
      setFuncionariosSel(detalle.funcionarioIds ?? []);
      // Mapear horarios del detalle a la grilla de días.
      const grilla = diasIniciales();
      (detalle.horarios ?? []).forEach((h) => {
        const idx = h.diaSemana - 1;
        if (idx >= 0 && idx < 7) {
          grilla[idx] = {
            activo: true,
            horaInicio: h.horaInicio,
            horaFin: h.horaFin,
            intervalo: h.intervaloMinutos,
          };
        }
      });
      setDias(grilla);
    } catch {
      setError('No se pudo cargar el trámite.');
      setModalAbierto(false);
    }
  };

  const agregarDoc = () => {
    const d = nuevoDoc.trim();
    if (!d) return;
    setDocumentos((prev) => [...prev, d]);
    setNuevoDoc('');
  };

  const quitarDoc = (i: number) => {
    setDocumentos((prev) => prev.filter((_, idx) => idx !== i));
  };

  const setDia = (idx: number, patch: Partial<DiaForm>) => {
    setDias((prev) => prev.map((d, i) => (i === idx ? { ...d, ...patch } : d)));
  };

  const toggleFuncionario = (id: string) => {
    setFuncionariosSel((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const construirHorarios = (): HorarioModel[] => {
    return dias
      .map((d, idx) =>
        d.activo
          ? {
              diaSemana: DIAS[idx].n,
              horaInicio: d.horaInicio,
              horaFin: d.horaFin,
              intervaloMinutos: d.intervalo,
            }
          : null
      )
      .filter((h): h is HorarioModel => h !== null);
  };

  const guardar = async () => {
    if (!nombre.trim()) {
      setError('El nombre del trámite es obligatorio.');
      return;
    }
    setGuardando(true);
    setError('');
    const input = {
      nombre: nombre.trim(),
      descripcion: descripcion.trim(),
      costo: costo.trim() || 'Gratuito',
      esEnLinea,
      documentosRequeridos: documentos,
      horarios: construirHorarios(),
    };
    try {
      let tramiteId = editId;
      if (editId) {
        await actualizarTramiteUseCase(editId, input);
      } else {
        const creado = await crearTramiteUseCase(input);
        tramiteId = creado.id;
      }
      if (tramiteId) {
        await asignarFuncionariosUseCase(tramiteId, funcionariosSel);
      }
      setModalAbierto(false);
      cargar();
    } catch {
      setError('No se pudo guardar el trámite.');
    } finally {
      setGuardando(false);
    }
  };

  const eliminar = async (t: TramiteModel) => {
    if (!window.confirm(`¿Eliminar el trámite "${t.nombre}"?`)) return;
    try {
      await eliminarTramiteUseCase(t.id);
      setTramites((prev) => prev.filter((x) => x.id !== t.id));
    } catch {
      setError('No se pudo eliminar el trámite.');
    }
  };

  const labelInput: React.CSSProperties = {
    display: 'block',
    fontSize: '13px',
    fontWeight: 600,
    color: '#475569',
    marginBottom: '6px',
  };
  const input: React.CSSProperties = {
    width: '100%',
    border: '1px solid #e2e8f0',
    borderRadius: '6px',
    padding: '9px 10px',
    fontSize: '14px',
    boxSizing: 'border-box',
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
          Usted está en: <strong style={{ marginLeft: '5px', color: '#334155', textDecoration: 'underline' }}>Panel · Gestión de Trámites</strong>
        </div>

        <div style={{ padding: '20px 40px', maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '12px', marginBottom: '20px' }}>
            <div>
              <h1 style={{ fontWeight: 'bold', color: '#334155', fontSize: '24px', margin: '0 0 8px' }}>
                Gestión de Trámites
              </h1>
              <p style={{ color: '#94a3b8', fontSize: '15px', margin: 0 }}>
                Crea y edita los trámites de tu sucursal, define sus horarios y asigna funcionarios.
              </p>
            </div>
            <IonButton onClick={abrirNuevo} style={{ '--background': '#1c3659' } as React.CSSProperties}>
              <IonIcon icon={addOutline} slot="start" />
              Nuevo trámite
            </IonButton>
          </div>

          {error && !modalAbierto && (
            <p style={{ color: '#b91c1c', padding: '10px 0' }}>{error}</p>
          )}

          {cargando ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '60px' }}>
              <IonSpinner name="crescent" />
            </div>
          ) : tramites.length === 0 ? (
            <p style={{ color: '#94a3b8', textAlign: 'center', padding: '40px' }}>
              Aún no hay trámites en tu sucursal. Crea el primero con “Nuevo trámite”.
            </p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {tramites.map((t) => (
                <IonCard key={t.id} style={{ margin: 0, borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', border: '1px solid #f1f5f9', backgroundColor: 'white' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '18px 22px', flexWrap: 'wrap' }}>
                    <IonIcon icon={documentTextOutline} style={{ fontSize: '36px', color: '#475569', flexShrink: 0 }} />
                    <div style={{ flex: '1 1 260px' }}>
                      <h3 style={{ margin: '0 0 4px', fontSize: '15px', fontWeight: 'bold', color: '#334155' }}>{t.nombre}</h3>
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        <span style={{ backgroundColor: t.esEnLinea ? '#d1fae5' : '#fef3c7', color: t.esEnLinea ? '#065f46' : '#92400e', padding: '3px 9px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <IonIcon icon={t.esEnLinea ? wifiOutline : businessOutline} />
                          {t.esEnLinea ? 'En línea' : 'Presencial'}
                        </span>
                        <span style={{ backgroundColor: '#f1f5f9', color: '#475569', padding: '3px 9px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <IonIcon icon={cashOutline} />
                          {t.costo ?? 'Gratuito'}
                        </span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <IonButton fill="outline" size="small" onClick={() => abrirEditar(t.id)}>
                        <IonIcon icon={createOutline} slot="start" />
                        Editar
                      </IonButton>
                      <IonButton fill="outline" color="danger" size="small" onClick={() => eliminar(t)}>
                        <IonIcon icon={trashOutline} slot="start" />
                        Eliminar
                      </IonButton>
                    </div>
                  </div>
                </IonCard>
              ))}
            </div>
          )}
        </div>

        {/* Modal de creación / edición */}
        <IonModal isOpen={modalAbierto} onDidDismiss={() => setModalAbierto(false)}>
          <IonContent color="light">
            <div style={{ padding: '20px 24px', maxWidth: '720px', margin: '0 auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 'bold', color: '#1e293b' }}>
                  {editId ? 'Editar trámite' : 'Nuevo trámite'}
                </h2>
                <IonButton fill="clear" onClick={() => setModalAbierto(false)}>
                  <IonIcon icon={closeOutline} slot="icon-only" />
                </IonButton>
              </div>

              {/* Sección: Datos */}
              <IonCard style={{ margin: '0 0 16px', borderRadius: '10px', backgroundColor: 'white' }}>
                <IonCardContent>
                  <h3 style={{ margin: '0 0 14px', fontSize: '15px', fontWeight: 'bold', color: '#334155' }}>Datos del trámite</h3>

                  <div style={{ marginBottom: '12px' }}>
                    <label style={labelInput}>Nombre *</label>
                    <input style={input} value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Ej: Subsidio de Agua Potable" />
                  </div>

                  <div style={{ marginBottom: '12px' }}>
                    <label style={labelInput}>Descripción</label>
                    <textarea style={{ ...input, minHeight: '70px', resize: 'vertical' }} value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
                  </div>

                  <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
                    <div style={{ flex: '1 1 200px' }}>
                      <label style={labelInput}>Costo</label>
                      <input style={input} value={costo} onChange={(e) => setCosto(e.target.value)} placeholder="Gratuito o $X.XXX" />
                    </div>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: '#475569', marginTop: '20px' }}>
                      <IonToggle checked={esEnLinea} onIonChange={(e) => setEsEnLinea(e.detail.checked)} />
                      Trámite en línea
                    </label>
                  </div>

                  {/* Documentos requeridos */}
                  <div style={{ marginTop: '14px' }}>
                    <label style={labelInput}>Documentos requeridos</label>
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                      <input
                        style={input}
                        value={nuevoDoc}
                        onChange={(e) => setNuevoDoc(e.target.value)}
                        onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); agregarDoc(); } }}
                        placeholder="Ej: Cédula de identidad"
                      />
                      <IonButton onClick={agregarDoc}>Agregar</IonButton>
                    </div>
                    {documentos.length > 0 && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        {documentos.map((d, i) => (
                          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc', borderRadius: '6px', padding: '6px 10px', fontSize: '13px', color: '#475569' }}>
                            {d}
                            <IonIcon icon={closeOutline} style={{ cursor: 'pointer', color: '#94a3b8' }} onClick={() => quitarDoc(i)} />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </IonCardContent>
              </IonCard>

              {/* Sección: Horarios */}
              <IonCard style={{ margin: '0 0 16px', borderRadius: '10px', backgroundColor: 'white' }}>
                <IonCardContent>
                  <h3 style={{ margin: '0 0 4px', fontSize: '15px', fontWeight: 'bold', color: '#334155' }}>Horarios de atención</h3>
                  <p style={{ margin: '0 0 14px', fontSize: '13px', color: '#94a3b8' }}>
                    Activa los días disponibles y define el rango horario. El intervalo (minutos) determina la duración y los cupos por franja.
                  </p>
                  {DIAS.map((dia, idx) => {
                    const d = dias[idx];
                    return (
                      <div key={dia.n} style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap', padding: '8px 0', borderBottom: '1px solid #f1f5f9' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '130px', fontSize: '14px', color: '#334155' }}>
                          <IonCheckbox checked={d.activo} onIonChange={(e) => setDia(idx, { activo: e.detail.checked })} />
                          {dia.label}
                        </label>
                        {d.activo && (
                          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                            <input type="time" style={{ ...input, width: '120px' }} value={d.horaInicio} onChange={(e) => setDia(idx, { horaInicio: e.target.value })} />
                            <span style={{ color: '#94a3b8' }}>a</span>
                            <input type="time" style={{ ...input, width: '120px' }} value={d.horaFin} onChange={(e) => setDia(idx, { horaFin: e.target.value })} />
                            <input
                              type="number"
                              min={5}
                              step={5}
                              style={{ ...input, width: '90px' }}
                              value={d.intervalo}
                              onChange={(e) => setDia(idx, { intervalo: Number(e.target.value) || 30 })}
                            />
                            <span style={{ color: '#94a3b8', fontSize: '13px' }}>min</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </IonCardContent>
              </IonCard>

              {/* Sección: Funcionarios */}
              <IonCard style={{ margin: '0 0 16px', borderRadius: '10px', backgroundColor: 'white' }}>
                <IonCardContent>
                  <h3 style={{ margin: '0 0 4px', fontSize: '15px', fontWeight: 'bold', color: '#334155' }}>Funcionarios asignados</h3>
                  <p style={{ margin: '0 0 14px', fontSize: '13px', color: '#94a3b8' }}>
                    Marca qué funcionarios de tu sucursal atienden este trámite.
                  </p>
                  {funcionarios.length === 0 ? (
                    <p style={{ fontSize: '13px', color: '#94a3b8', margin: 0 }}>No hay funcionarios en tu sucursal.</p>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {funcionarios.map((f) => (
                        <label key={f.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: '#334155' }}>
                          <IonCheckbox
                            checked={funcionariosSel.includes(f.id)}
                            onIonChange={() => toggleFuncionario(f.id)}
                          />
                          {f.nombre} <span style={{ color: '#94a3b8', fontSize: '12px' }}>({f.rut})</span>
                        </label>
                      ))}
                    </div>
                  )}
                </IonCardContent>
              </IonCard>

              {error && modalAbierto && (
                <p style={{ color: '#b91c1c', margin: '0 0 12px' }}>{error}</p>
              )}

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', paddingBottom: '30px' }}>
                <IonButton fill="outline" onClick={() => setModalAbierto(false)} disabled={guardando}>
                  Cancelar
                </IonButton>
                <IonButton onClick={guardar} disabled={guardando} style={{ '--background': '#1c3659' } as React.CSSProperties}>
                  {guardando ? 'Guardando…' : editId ? 'Guardar cambios' : 'Crear trámite'}
                </IonButton>
              </div>
            </div>
          </IonContent>
        </IonModal>

        <Footer />
      </IonContent>
    </IonPage>
  );
};

export default GestionTramitesScreen;
