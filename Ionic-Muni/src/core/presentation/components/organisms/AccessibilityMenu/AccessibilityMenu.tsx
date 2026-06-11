import React, { useEffect, useState } from 'react';
import { IonIcon } from '@ionic/react';
import { closeOutline } from 'ionicons/icons';

const AccessibilityMenu: React.FC = () => {
  const [showAccesibilidad, setShowAccesibilidad] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [invertColors, setInvertColors] = useState(false);
  const [underlineLinks, setUnderlineLinks] = useState(false);
  const [readableFont, setReadableFont] = useState(false);
  const [fontScale, setFontScale] = useState(1);

  useEffect(() => {
    const styleTag = document.createElement('style');
    styleTag.id = 'accessibility-menu-styles';
    document.head.appendChild(styleTag);

    return () => {
      document.head.removeChild(styleTag);
      document.body.classList.remove(
        'a11y-high-contrast',
        'a11y-inverted',
        'a11y-underlined-links',
        'a11y-readable-font'
      );
      document.documentElement.style.removeProperty('--a11y-font-scale');
      document.documentElement.style.removeProperty('font-size');
      document.body.style.filter = '';
    };
  }, []);

  useEffect(() => {
    const classes = [
      'a11y-high-contrast',
      'a11y-inverted',
      'a11y-underlined-links',
      'a11y-readable-font',
    ];

    document.body.classList.remove(...classes);

    if (highContrast) document.body.classList.add('a11y-high-contrast');
    if (invertColors) document.body.classList.add('a11y-inverted');
    if (underlineLinks) document.body.classList.add('a11y-underlined-links');
    if (readableFont) document.body.classList.add('a11y-readable-font');

    document.documentElement.style.setProperty('--a11y-font-scale', fontScale.toString());
    document.documentElement.style.fontSize = `${fontScale * 16}px`;
  }, [highContrast, invertColors, underlineLinks, readableFont, fontScale]);

  useEffect(() => {
    const styleTag = document.getElementById('accessibility-menu-styles') as HTMLStyleElement | null;

    if (!styleTag) return;

    styleTag.textContent = `
      body,
      body *:not(svg):not(img):not(ion-icon):not([data-a11y-ignore]):not([data-a11y-ignore] *) {
        font-size: calc(1em * var(--a11y-font-scale, 1)) !important;
      }

      body.a11y-high-contrast,
      body.a11y-high-contrast ion-app,
      body.a11y-high-contrast ion-page,
      body.a11y-high-contrast ion-content,
      body.a11y-high-contrast ion-toolbar,
      body.a11y-high-contrast ion-card,
      body.a11y-high-contrast ion-item,
      body.a11y-high-contrast ion-footer,
      body.a11y-high-contrast ion-grid,
      body.a11y-high-contrast ion-row,
      body.a11y-high-contrast ion-col,
      body.a11y-high-contrast div,
      body.a11y-high-contrast p,
      body.a11y-high-contrast span,
      body.a11y-high-contrast h1,
      body.a11y-high-contrast h2,
      body.a11y-high-contrast h3,
      body.a11y-high-contrast h4,
      body.a11y-high-contrast h5,
      body.a11y-high-contrast h6,
      body.a11y-high-contrast button,
      body.a11y-high-contrast input,
      body.a11y-high-contrast textarea,
      body.a11y-high-contrast select,
      body.a11y-high-contrast ion-input,
      body.a11y-high-contrast ion-searchbar {
        background-color: #000 !important;
        color: #fff !important;
        --background: #000 !important;
        --color: #fff !important;
        --placeholder-color: #fff !important;
        border-color: #fff !important;
      }

      body.a11y-high-contrast a,
      body.a11y-high-contrast ion-router-link,
      body.a11y-high-contrast button,
      body.a11y-high-contrast .tr-card-btn,
      body.a11y-high-contrast .link-blue {
        color: #ffff00 !important;
      }

      body.a11y-underlined-links a,
      body.a11y-underlined-links ion-router-link,
      body.a11y-underlined-links .link-blue {
        text-decoration: underline !important;
        text-underline-offset: 0.2em !important;
      }

      body.a11y-readable-font,
      body.a11y-readable-font * {
        font-family: Arial, sans-serif !important;
      }

      body.a11y-inverted {
        filter: invert(1) hue-rotate(180deg);
      }

      body.a11y-inverted img,
      body.a11y-inverted video,
      body.a11y-inverted svg,
      body.a11y-inverted ion-icon {
        filter: invert(1) hue-rotate(180deg);
      }
    `;
  }, [highContrast, invertColors, underlineLinks, readableFont]);

  const handleFontScale = (direction: 'up' | 'down') => {
    setFontScale((current) => {
      const nextValue = direction === 'up' ? current + 0.025 : current - 0.025;
      return Math.min(1.4, Math.max(0.9, Number(nextValue.toFixed(3))));
    });
  };

  const resetAccesibilidad = () => {
    setHighContrast(false);
    setInvertColors(false);
    setUnderlineLinks(false);
    setReadableFont(false);
    setFontScale(1);
  };

  const btnAccesibilidadStyle: React.CSSProperties = {
    backgroundColor: '#0056b3',
    color: 'white',
    border: 'none',
    padding: '12px',
    borderRadius: '8px',
    fontWeight: 'bold',
    fontSize: '14px',
    cursor: 'pointer',
    textAlign: 'left',
    width: '100%',
    transition: 'opacity 0.2s',
    marginBottom: '10px'
  };

  return (
    <>
      <div
        data-a11y-ignore
        onClick={() => setShowAccesibilidad(!showAccesibilidad)}
        style={{
          position: 'fixed',
          right: showAccesibilidad ? '260px' : '0',
          top: '30%',
          backgroundColor: '#0056b3',
          color: 'white',
          padding: '10px 15px',
          borderRadius: '8px 0 0 8px',
          fontSize: '35px',
          zIndex: 2000,
          cursor: 'pointer',
          transition: 'right 0.3s ease',
          boxShadow: '-2px 2px 10px rgba(0,0,0,0.2)'
        }}
      >
        {showAccesibilidad ? <IonIcon icon={closeOutline} /> : '♿'}
      </div>

      <div
        data-a11y-ignore
        style={{
          position: 'fixed',
          right: showAccesibilidad ? '0' : '-260px',
          top: '20%',
          width: '260px',
          backgroundColor: 'white',
          boxShadow: '-4px 0 15px rgba(0,0,0,0.1)',
          borderRadius: '15px 0 0 15px',
          zIndex: 1999,
          transition: 'right 0.3s ease',
          padding: '20px',
          border: '1px solid #e2e8f0'
        }}>
        <h3 style={{ color: '#0056b3', fontWeight: 'bold', borderBottom: '2px solid #0056b3', paddingBottom: '10px', marginBottom: '15px', marginTop: '0' }}>
          Accesibilidad
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <button
            onClick={() => setHighContrast((current) => !current)}
            style={{
              ...btnAccesibilidadStyle,
              backgroundColor: highContrast ? '#0f172a' : '#0056b3'
            }}
          >
            Contraste Alto
          </button>
          <button
            onClick={() => setInvertColors((current) => !current)}
            style={{
              ...btnAccesibilidadStyle,
              backgroundColor: invertColors ? '#0f172a' : '#0056b3'
            }}
          >
            Invertir Colores
          </button>
          <button
            onClick={() => handleFontScale('up')}
            style={btnAccesibilidadStyle}
          >
            Aumentar Texto
          </button>
          <button
            onClick={() => handleFontScale('down')}
            style={btnAccesibilidadStyle}
          >
            Disminuir Texto
          </button>
          <button
            onClick={() => setUnderlineLinks((current) => !current)}
            style={{
              ...btnAccesibilidadStyle,
              backgroundColor: underlineLinks ? '#0f172a' : '#0056b3'
            }}
          >
            Subrayar Enlaces
          </button>
          <button
            onClick={() => setReadableFont((current) => !current)}
            style={{
              ...btnAccesibilidadStyle,
              backgroundColor: readableFont ? '#0f172a' : '#0056b3'
            }}
          >
            Fuente Legible
          </button>
          <button
            onClick={resetAccesibilidad}
            style={{
              ...btnAccesibilidadStyle,
              backgroundColor: '#f1f5f9',
              color: '#64748b',
              marginTop: '10px'
            }}
          >
            Restablecer
          </button>
        </div>

        <p style={{ fontSize: '10px', color: '#94a3b8', marginTop: '15px', textAlign: 'center' }}>
          Ajustes visuales para una mejor experiencia
        </p>
      </div>
    </>
  );
};

export default AccessibilityMenu;
