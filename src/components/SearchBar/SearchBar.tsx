import React from 'react';
import { IonIcon } from '@ionic/react';
import { searchOutline } from 'ionicons/icons';
import './SearchBar.css';

// Definimos las propiedades que puede recibir este componente
interface SearchBarProps {
  placeholder?: string;
  width?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  placeholder = "Desea buscar algo...?", // Texto por defecto
  width = "40%", // Ancho por defecto
  value,
  onChange 
}) => {
  return (
    <div className="searchbar-container" style={{ width: width }}>
      <IonIcon icon={searchOutline} className="searchbar-icon" />
      <input 
        type="text" 
        className="searchbar-input"
        placeholder={placeholder} 
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default SearchBar;