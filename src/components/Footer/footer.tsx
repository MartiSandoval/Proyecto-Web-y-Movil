import React from 'react';
import {
  IonFooter,
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon
} from '@ionic/react';

import {
  callOutline,
  mailOutline,
  locationOutline,
  logoFacebook,
  logoInstagram,
  logoTwitter
} from 'ionicons/icons';

const Footer: React.FC = () => {
  return (
    <IonFooter style={{ marginTop: '24px' }}>
      <IonToolbar
        style={{
          '--background': '#0f172a',
          '--color': 'white',
          padding: '20px 10px'
        }}
      >
        <IonGrid>
          <IonRow>

            {/* Información Municipalidad */}
            <IonCol size="12" sizeMd="4">
              <h2 style={{ marginBottom: '10px' }}>
                Municipalidad Santo Domingo
              </h2>

              <p style={{ opacity: 0.8 }}>
                Plataforma de trámites y servicios digitales
                para mejorar la atención ciudadana.
              </p>
            </IonCol>

            {/* Enlaces rápidos */}
            <IonCol size="12" sizeMd="4">
              <h3 style={{ marginBottom: '10px' }}>
                Enlaces rápidos
              </h3>

              <div style={linkStyle}>Inicio</div>
              <div style={linkStyle}>Trámites</div>
              <div style={linkStyle}>Turismo</div>
              <div style={linkStyle}>Noticias</div>
              <div style={linkStyle}>Plan Regulador</div>
            </IonCol>

            {/* Contacto */}
            <IonCol size="12" sizeMd="4">
              <h3 style={{ marginBottom: '10px' }}>
                Contacto
              </h3>

              <div style={contactStyle}>
                <IonIcon icon={locationOutline} />
                <span>Santo Domingo, Valparaíso, Chile</span>
              </div>

              <div style={contactStyle}>
                <IonIcon icon={callOutline} />
                <span>+56 9 1234 5678</span>
              </div>

              <div style={contactStyle}>
                <IonIcon icon={mailOutline} />
                <span>contacto@santodomingo.cl</span>
              </div>

              {/* Redes */}
              <div
                style={{
                  display: 'flex',
                  gap: '15px',
                  marginTop: '15px',
                  fontSize: '1.4rem'
                }}
              >
                <IonIcon
                  icon={logoFacebook}
                  style={socialStyle}
                />

                <IonIcon
                  icon={logoInstagram}
                  style={socialStyle}
                />

                <IonIcon
                  icon={logoTwitter}
                  style={socialStyle}
                />
              </div>
            </IonCol>
          </IonRow>

          {/* Línea inferior */}
          <IonRow>
            <IonCol size="12">
              <div
                style={{
                  marginTop: '20px',
                  borderTop: '1px solid rgba(255,255,255,0.2)',
                  paddingTop: '15px',
                  textAlign: 'center',
                  opacity: 0.7,
                  fontSize: '0.9rem'
                }}
              >
                © 2026 Municipalidad Santo Domingo — Todos los derechos reservados.
              </div>
            </IonCol>
          </IonRow>

        </IonGrid>
      </IonToolbar>
    </IonFooter>
  );
};

const linkStyle: React.CSSProperties = {
  marginBottom: '8px',
  cursor: 'pointer',
  opacity: 0.85,
  transition: '0.2s'
};

const contactStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  marginBottom: '10px',
  opacity: 0.9
};

const socialStyle: React.CSSProperties = {
  cursor: 'pointer',
  transition: '0.2s'
};

export default Footer;