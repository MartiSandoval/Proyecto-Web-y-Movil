import React, { useState } from 'react';
import { IonIcon } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import {
  chevronDownOutline,
  callOutline,
  personOutline,
  logOutOutline
} from 'ionicons/icons';
import { ASSETS } from '../../config/constants';
import SearchBar from '../SearchBar/SearchBar';
import HeaderTop from '../HeaderTop/HeaderTop';
import { useAuth } from '../../contexts/AuthContextCore';

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

  if(simple) {
    return (
      <div style={{ 
        backgroundColor: '#1c3659', // <-- Color actualizado a azul marino oscuro
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

      {/* 2. HEADER PRINCIPAL (Ahora con el azul oscuro institucional) */}
      <div style={{ 
        backgroundColor: '#1c3659', // <-- Color actualizado a azul marino oscuro
        padding: '15px 40px', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        color: 'white', 
        position: 'relative', 
        zIndex: 10 
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

        {/* Centro: Barra de búsqueda (Un poco más ancha para igualar la imagen) */}
        <SearchBar width="55%" />

        {/* Lado derecho: usuario o contacto */}
        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <IonIcon icon={personOutline} style={{ fontSize: '22px' }} />
            <div style={{ textAlign: 'right', fontSize: '12px' }}>
              <div style={{ fontWeight: 'bold' }}>{user.nombre}</div>
              <div style={{ color: '#94a3b8', textTransform: 'capitalize' }}>
                {user.rol === 'jefe_sucursal' ? 'Jefe de Sucursal' : user.rol}
              </div>
            </div>
            <IonIcon
              icon={logOutOutline}
              style={{ fontSize: '24px', cursor: 'pointer' }}
              title="Cerrar sesión"
              onClick={handleLogout}
            />
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