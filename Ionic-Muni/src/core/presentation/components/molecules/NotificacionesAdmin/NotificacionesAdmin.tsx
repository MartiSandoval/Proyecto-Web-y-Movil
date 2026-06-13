import React, { useState, useEffect, useRef } from 'react';
import { IonIcon, IonPopover } from '@ionic/react';
import { notificationsOutline, calendarOutline, closeOutline } from 'ionicons/icons';
import httpClient from '../../../../../network/httpClient';
import './NotificacionesAdmin.css';

interface Notificacion {
  id: string;
  titulo: string;
  mensaje: string;
  leida: boolean;
  created_at: string;
}

const NotificacionesAdmin: React.FC = () => {
  const [notificaciones, setNotificaciones] = useState<Notificacion[]>([]);
  const [popoverState, setPopoverState] = useState({ show: false, event: undefined as any });
  const shownIds = useRef<Set<string>>(new Set());
  const isFirstFetch = useRef(true);

  const dispararNotificacionNavegador = (notif: Notificacion) => {
    if (Notification.permission === 'granted') {
      new Notification(notif.titulo, {
        body: notif.mensaje,
        icon: '/favicon.png',
      });
    }
  };

  const fetchNotificaciones = async () => {
    try {
      const response: any = await httpClient.get('/notificaciones');
      const arr: Notificacion[] = Array.isArray(response) ? response : (response.data || []);
      const noLeidas = arr.filter(n => !n.leida);

      if (!isFirstFetch.current) {
        noLeidas.forEach(n => {
          if (!shownIds.current.has(n.id)) {
            dispararNotificacionNavegador(n);
          }
        });
      }

      noLeidas.forEach(n => shownIds.current.add(n.id));
      isFirstFetch.current = false;
      setNotificaciones(noLeidas);
    } catch {
      // silencioso
    }
  };

  useEffect(() => {
    fetchNotificaciones();
    const interval = setInterval(fetchNotificaciones, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleAbrirCampanita = async (e: any) => {
    if ('Notification' in window && Notification.permission === 'default') {
      await Notification.requestPermission();
    }
    setPopoverState({ show: true, event: e });
  };

  const descartarUna = (id: string) => {
    setNotificaciones(prev => prev.filter(n => n.id !== id));
    httpClient.put(`/notificaciones/${id}/leer`).catch(() => {});
  };

  const descartarTodas = () => {
    setNotificaciones([]);
    httpClient.put('/notificaciones/leer-todas').catch(() => {});
  };

  const formatearFecha = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString('es-CL', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  return (
    <>
      <button
        className="notif-trigger-btn"
        onClick={handleAbrirCampanita}
      >
        <IonIcon icon={notificationsOutline} className="notif-trigger-icon" />
        {notificaciones.length > 0 && (
          <span className="notif-badge">{notificaciones.length}</span>
        )}
      </button>

      <IonPopover
        isOpen={popoverState.show}
        event={popoverState.event}
        onDidDismiss={() => setPopoverState({ show: false, event: undefined })}
        className="notif-popover"
      >
        <div className="notif-panel">
          <div className="notif-panel-header">
            <span className="notif-panel-title">Notificaciones</span>
            {notificaciones.length > 0 && (
              <button className="notif-limpiar-btn" onClick={descartarTodas}>
                Limpiar todas
              </button>
            )}
          </div>

          <div className="notif-list">
            {notificaciones.length === 0 ? (
              <div className="notif-empty">
                <IonIcon icon={notificationsOutline} className="notif-empty-icon" />
                <p>Sin notificaciones nuevas</p>
              </div>
            ) : (
              notificaciones.map(notif => (
                <div key={notif.id} className="notif-item">
                  <div className="notif-item-icon">
                    <IonIcon icon={calendarOutline} />
                  </div>
                  <div className="notif-item-body">
                    <p className="notif-item-title">{notif.titulo}</p>
                    <p className="notif-item-msg">{notif.mensaje}</p>
                    <p className="notif-item-date">{formatearFecha(notif.created_at)}</p>
                  </div>
                  <button
                    className="notif-item-dismiss"
                    onClick={() => descartarUna(notif.id)}
                    title="Descartar"
                  >
                    <IonIcon icon={closeOutline} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </IonPopover>
    </>
  );
};

export default NotificacionesAdmin;
