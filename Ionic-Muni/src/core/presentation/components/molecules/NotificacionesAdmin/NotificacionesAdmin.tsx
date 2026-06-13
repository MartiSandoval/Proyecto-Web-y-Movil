import React, { useState, useEffect } from 'react';
import { IonIcon, IonBadge, IonPopover, IonList, IonItem, IonLabel, IonButton } from '@ionic/react';
import { notificationsOutline } from 'ionicons/icons';
import httpClient from '../../../../../network/httpClient';
import './NotificacionesAdmin.css';

const NotificacionesAdmin: React.FC = () => {
  const [notificaciones, setNotificaciones] = useState<any[]>([]);
  const [popoverState, setPopoverState] = useState({ show: false, event: undefined });

  const fetchNotificaciones = async () => {
    try {
      const response: any = await httpClient.get('/notificaciones');
      const arregloNotificaciones = Array.isArray(response) ? response : (response.data || []);
      
      const soloNoLeidas = arregloNotificaciones.filter((n: any) => !n.leida);
      setNotificaciones(soloNoLeidas);
    } catch (error) {
      console.error("Error cargando notificaciones", error);
    }
  };

  useEffect(() => {
    fetchNotificaciones();
    const interval = setInterval(fetchNotificaciones, 30000);
    return () => clearInterval(interval);
  }, []);

  // Función para marcar todas como leídas y borrarlas de la vista
  const marcarTodasComoLeidas = async () => {
    try {
      await httpClient.put('/notificaciones/leer-todas');
      
      // Vaciamos el arreglo para que desaparezcan inmediatamente de la pantalla
      setNotificaciones([]);
    } catch (error) {
      console.error("Error al marcar como leídas", error);
    }
  };

  const noLeidas = notificaciones.length;

  return (
    <>
      <IonButton fill="clear" onClick={(e: any) => setPopoverState({ show: true, event: e })} className="notificaciones-btn">
        <IonIcon icon={notificationsOutline} style={{ color: '#ffffff', fontSize: '24px' }} />
        {noLeidas > 0 && (
          <IonBadge color="danger" className="notificaciones-badge">
            {noLeidas}
          </IonBadge>
        )}
      </IonButton>

      <IonPopover
        isOpen={popoverState.show}
        event={popoverState.event}
        onDidDismiss={() => setPopoverState({ show: false, event: undefined })}
      >
        <div className="notificaciones-header">
          <h3 className="notificaciones-title">Notificaciones</h3>
          {noLeidas > 0 && (
            <button className="notificaciones-leer-btn" onClick={marcarTodasComoLeidas}>
              Limpiar todas
            </button>
          )}
        </div>

        <IonList style={{ width: '400px', padding: 0 }}>
          {notificaciones.length === 0 ? (
            <IonItem lines="none"><IonLabel>No hay notificaciones nuevas</IonLabel></IonItem>
          ) : (
            notificaciones.map((notif) => (
              <IonItem 
                key={notif.id} 
                lines="full" 
                className="notificacion-item-unread"
              >
                <IonLabel className="ion-text-wrap">
                  <h2 style={{ fontWeight: 'bold', color: '#003057' }}>{notif.titulo}</h2>
                  <p>{notif.mensaje}</p>
                  <p style={{ fontSize: '11px', color: 'gray', marginTop: '4px' }}>
                    {new Date(notif.created_at).toLocaleDateString('es-CL')}
                  </p>
                </IonLabel>
              </IonItem>
            ))
          )}
        </IonList>
      </IonPopover>
    </>
  );
};

export default NotificacionesAdmin;