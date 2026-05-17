import React from 'react';
import { IonIcon } from '@ionic/react';
import { 
  tvOutline, 
  hammerOutline, 
  documentTextOutline 
} from 'ionicons/icons';
import './HeaderTop.css';
import { ASSETS } from '../../config/constants';

const HeaderTop: React.FC = () => {
  return (
    <div className="header-top-container">
      
      <div className="header-top-link">
        <img 
          src={ASSETS.logo_martillito_header} 
          alt="Icono Lobby" 
          style={{ width: '15px', height: '15px', objectFit: 'contain' }} 
        />
        <span>Plataforma Ley Lobby</span>
      </div>

      <div className="header-top-link">
        <img 
          src={ASSETS.logo_martillito_header} 
          alt="Icono Lobby" 
          style={{ width: '15px', height: '15px', objectFit: 'contain' }} 
        />
        <span>Solicitud Ley de Transparencia</span>
      </div>

      <div className="header-top-link">
        <IonIcon icon={documentTextOutline} className="header-top-icon-normal" />
        <span>Transparencia Activa</span>
      </div>

      <div className="header-top-link">
        <IonIcon icon={documentTextOutline} className="header-top-icon-normal" />
        <span>Decretos</span>
      </div>

      <div className="header-top-link header-top-live">
        <IonIcon icon={tvOutline} className="header-top-icon-tv" />
        <span>Observe el Consejo Municipal en VIVO</span>
      </div>

    </div>
  );
};

export default HeaderTop;