import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';

// no lo estoy usando, porque me daba problemas :p
// solo he probado los login
import { Tramites } from './pages/Tramites/Tramites';
import { DetalleTramite } from './pages/DetalleTramite/DetalleTramite';
import { AgendarHora } from './pages/AgendarHora/AgendarHora';
import { SubirArchivos } from './pages/SubirArchivos/SubirArchivos';

import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
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
        {/*<Route exact path="/tramites">
          <Tramites />
        </Route>

        {/* --- RUTAS DEL FLUJO DE TRÁMITES --- */}
        {/* El parámetro :tramiteId permite saber qué trámite seleccionó el usuario */}
        {/*<Route exact path="/tramite/:tramiteId/detalle">
          <DetalleTramite />
        </Route>

        <Route exact path="/tramite/:tramiteId/agendar">
          <AgendarHora />
        </Route>

        <Route exact path="/tramite/:tramiteId/subir">
          <SubirArchivos />
        </Route>
        */}

        {/* --- REDIRECCIÓN POR DEFECTO --- */}
        <Route exact path="/" render={() => <Redirect to="/login" />} />

      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;