import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

// 1. Importaciones de Autenticación (Export default sin llaves)
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';

// 2. Importaciones de Trámites (Export nombrados con llaves)
import { Tramites } from './Tramites/Tramites';
import { DetalleTramite } from './pages/DetalleTramite/DetalleTramite';
import { AgendarHora } from './pages/AgendarHora/AgendarHora';
import { SubirArchivos } from './pages/SubirArchivos/SubirArchivos';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';
/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>

        {/* --- RUTAS DE AUTENTICACIÓN --- */}
        <Route exact path="/login">
          <LoginPage />
        </Route>
        
        <Route exact path="/registro">
          <RegisterPage />
        </Route>

        {/* --- RUTA LISTA DE TRÁMITES --- */}
        <Route exact path="/tramites">
          <Tramites />
        </Route>

        {/* --- RUTAS DEL FLUJO DE TRÁMITES --- */}
        {/* El parámetro :tramiteId permite saber qué trámite seleccionó el usuario */}
        <Route exact path="/tramite/:tramiteId/detalle">
          <DetalleTramite />
        </Route>

        <Route exact path="/tramite/:tramiteId/agendar">
          <AgendarHora />
        </Route>

        <Route exact path="/tramite/:tramiteId/subir">
          <SubirArchivos />
        </Route>

        {/* --- REDIRECCIÓN POR DEFECTO --- */}
        <Route exact path="/" render={() => <Redirect to="/tramites" />} />

      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;