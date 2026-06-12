import React, { useState } from 'react';
import { IonIcon } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import {
  chevronDownOutline,
  callOutline,
  personOutline,
  logOutOutline,
  personCircleOutline
} from 'ionicons/icons';
import { ASSETS } from '../../../../config/constants';
import SearchBar from '../../molecules/SearchBar/SearchBar';
import HeaderTop from '../../molecules/HeaderTop/HeaderTop';
import { useAuth } from '../../../../../features/auth/presentation/hooks/useAuth';

interface headerProps {
  simple?: boolean; // Si es true, muestra solo el header principal sin el submenú
}

const Header: React.FC<headerProps> = ({ simple = false }) => {
  const [menuAbierto, setMenuAbierto] = useState<string | null>(null);
  const history = useHistory();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    history.replace('/login');
  };

  const navigate = (path: string) => {
    history.push(path);
  };

  // Función para abrir/cerrar los menús
  const toggleMenu = (menu: string) => {
    setMenuAbierto(menuAbierto === menu ? null : menu);
  };

  // Estilos reutilizables para las opciones de los menús desplegables
  const dropdownItemStyle = {
    padding: '10px 20px',
    cursor: 'pointer',
    borderBottom: '1px solid #f1f5f9',
    color: '#475569',
    display: 'block'
  };

  if (simple) {
    return (
      <div style={{ 
        backgroundColor: '#1c3659',
        padding: '15px 40px', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        color: 'white', 
        position: 'relative', 
        zIndex: 10 
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <img 
            src={ASSETS.LOGO_MUNI} 
            alt="Logo Municipalidad" 
            style={{ width: '50px', height: '60px', objectFit: 'contain' }} 
          />
          <div>
            <h2 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold' }}>Santo Domingo</h2>
            <span style={{ fontSize: '11px', color: '#e2e8f0' }}>Municipalidad</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ position: 'relative' }}>
      
      {/* Overlay invisible para cerrar el menú al hacer clic afuera */}
      {menuAbierto && (
        <div 
          style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 9 }}
          onClick={() => setMenuAbierto(null)}
        />
      )}

      {/* 1. BARRA SUPERIOR OSCURA */}
      <HeaderTop /> 

      {/* 2. HEADER PRINCIPAL */}
      <div style={{ 
        backgroundColor: '#1c3659', 
        padding: '15px 40px', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        color: 'white', 
        position: 'relative', 
        zIndex: 20 
      }}>
        
        {/* Lado izquierdo: Logo y Títulos */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <img 
            src={ASSETS.LOGO_MUNI} 
            alt="Logo Municipalidad" 
            style={{ width: '50px', height: '60px', objectFit: 'contain' }} 
          />
          <div>
            <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 'bold', letterSpacing: '0.5px' }}>Santo Domingo</h2>
            <span style={{ fontSize: '12px', color: '#e2e8f0' }}>Municipalidad</span>
          </div>
        </div>

        {/* Centro: Barra de búsqueda */}
        <SearchBar width="45%" />

        {/* Lado derecho: usuario o contacto */}
        {user ? (
          // 1. A este div general le quitamos el "position: relative"
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            
            {/* 2. NUEVO CONTENEDOR: Envolvemos solo el perfil y su menú con relative */}
            <div style={{ position: 'relative' }}>
              
              {/* === BOTÓN DEL USUARIO (Abre el submenú) === */}
              <div 
                onClick={() => toggleMenu('perfil')}
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '8px', 
                  cursor: 'pointer', 
                  padding: '5px 10px', 
                  borderRadius: '6px',
                  backgroundColor: menuAbierto === 'perfil' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)'
                }}
                title="Opciones de cuenta"
              >
                <IonIcon icon={personOutline} style={{ fontSize: '22px', flexShrink: 0 }} />
                <div style={{ textAlign: 'left', fontSize: '12px', minWidth: 0 }}>
                  <div style={{ fontWeight: 'bold', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '140px' }}>{user.nombre}</div>
                  <div style={{ color: '#94a3b8', textTransform: 'capitalize', whiteSpace: 'nowrap' }}>
                    {user.rol === 'jefe_sucursal' ? 'Jefe de Sucursal' : user.rol}
                  </div>
                </div>
                <IonIcon icon={chevronDownOutline} style={{ fontSize: '16px', marginLeft: '4px' }} />
              </div>

              {/* === SUBMENÚ DESPLEGABLE DEL PERFIL === */}
              {menuAbierto === 'perfil' && (
                <div style={{ 
                  position: 'absolute', 
                  top: 'calc(100% + 10px)', // Mejorado: Se ajusta exacto debajo del botón
                  right: '0', 
                  backgroundColor: 'white', 
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)', 
                  borderRadius: '6px', 
                  minWidth: '180px', 
                  padding: '5px 0', 
                  zIndex: 20 
                }}>
                  <span 
                    style={{ ...dropdownItemStyle, display: 'flex', alignItems: 'center', gap: '8px' }} 
                    onClick={() => { toggleMenu('perfil'); navigate('/perfil'); }}
                  >
                    <IonIcon icon={personCircleOutline} style={{ fontSize: '18px' }} /> Editar Perfil
                  </span>
                  <span 
                    style={{ ...dropdownItemStyle, display: 'flex', alignItems: 'center', gap: '8px', color: '#ef4444', borderBottom: 'none' }} 
                    onClick={() => { toggleMenu('perfil'); handleLogout(); }}
                  >
                    <IonIcon icon={logOutOutline} style={{ fontSize: '18px' }} /> Cerrar sesión
                  </span>
                </div>
              )}
            </div>
            {/* FIN DEL NUEVO CONTENEDOR */}

            {/* Botón de Panel de Gestión (Si aplica) */}
            {(user.rol === 'funcionario' || user.rol === 'jefe_sucursal') && (
              <span
                onClick={() => navigate('/panel-funcionario')}
                style={{
                  fontSize: '12px',
                  fontWeight: 'bold',
                  backgroundColor: '#2563eb',
                  color: 'white',
                  padding: '5px 10px',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  marginLeft: '10px'
                }}
              >
                Panel de Gestión
              </span>
            )}
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ textAlign: 'right', fontSize: '12px' }}>
              <div style={{ fontWeight: 'bold' }}>Contacto telefónico</div>
              <div style={{ letterSpacing: '2px', color: '#94a3b8' }}>..........</div>
            </div>
            <IonIcon icon={callOutline} style={{ fontSize: '30px' }} />
          </div>
        )}
      </div>

      {/* 3. SUB-MENÚ BLANCO INTERACTIVO */}
      <div style={{ backgroundColor: 'white', padding: '15px 40px', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', fontSize: '14px', color: '#64748b', fontWeight: 'bold', position: 'relative', zIndex: 10 }}>
        <div style={{ display: 'flex', gap: '30px' }}>

          {/* Dropdown 1: Trámites y servicios */}
          <div style={{ position: 'relative', cursor: 'pointer' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }} onClick={() => toggleMenu('tramites')}>
              <span>Trámites y servicios</span>
              <IonIcon icon={chevronDownOutline} />
            </div>
            {menuAbierto === 'tramites' && (
              <div style={{ position: 'absolute', top: '30px', left: 0, backgroundColor: 'white', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', borderRadius: '6px', minWidth: '220px', padding: '5px 0' }}>
                <span style={dropdownItemStyle}>Pago de Permisos</span>
                <span style={dropdownItemStyle}>Certificados en línea</span>
              </div>
            )}
          </div>

          {/* Dropdown 2: Municipio */}
          <div style={{ position: 'relative', cursor: 'pointer' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }} onClick={() => toggleMenu('municipio')}>
              <span>Municipio</span>
              <IonIcon icon={chevronDownOutline} />
            </div>
            {menuAbierto === 'municipio' && (
              <div style={{ position: 'absolute', top: '30px', left: 0, backgroundColor: 'white', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', borderRadius: '6px', minWidth: '200px', padding: '5px 0' }}>
                <span style={dropdownItemStyle}>Alcalde</span>
                <span style={dropdownItemStyle}>Concejales</span>
                <span style={dropdownItemStyle}>Departamentos</span>
              </div>
            )}
          </div>

          {/* Dropdown 3: Turismo */}
          <div style={{ position: 'relative', cursor: 'pointer' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }} onClick={() => toggleMenu('turismo')}>
              <span>Turismo</span>
              <IonIcon icon={chevronDownOutline} />
            </div>
            {menuAbierto === 'turismo' && (
              <div style={{ position: 'absolute', top: '30px', left: 0, backgroundColor: 'white', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', borderRadius: '6px', minWidth: '200px', padding: '5px 0' }}>
                <span style={dropdownItemStyle}>Atracciones</span>
                <span style={dropdownItemStyle}>Dónde comer</span>
              </div>
            )}
          </div>

          {/* Enlace Simple: Noticias */}
          <div style={{ cursor: 'pointer' }}>
            <span>Noticias</span>
          </div>

          {/* Dropdown 4: Plan regulador */}
          <div style={{ position: 'relative', cursor: 'pointer' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }} onClick={() => toggleMenu('plan')}>
              <span>Plan regulador comunal</span>
              <IonIcon icon={chevronDownOutline} />
            </div>
            {menuAbierto === 'plan' && (
              <div style={{ position: 'absolute', top: '30px', left: 0, backgroundColor: 'white', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', borderRadius: '6px', minWidth: '200px', padding: '5px 0' }}>
                <span style={dropdownItemStyle}>Documentos oficiales</span>
                <span style={dropdownItemStyle}>Mapas</span>
              </div>
            )}
          </div>

        </div>

        {/* Menú derecho estático */}
        <div style={{ display: 'flex', gap: '20px' }}>
          <span style={{ cursor: 'pointer' }}>SIG</span>
          <span style={{ cursor: 'pointer' }}>Contacto</span>
          <span style={{ cursor: 'pointer' }}>OIRS</span>
        </div>
      </div>
    </div>
  );
};

export default Header;