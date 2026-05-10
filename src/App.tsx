import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import { Tramites } from './Tramites/Tramites';
import { DetalleTramite } from './pages/DetalleTramite/DetalleTramite';
import { AgendarHora } from './pages/AgendarHora/AgendarHora';
import { SubirArchivos } from './pages/SubirArchivos/SubirArchivos';
import HistorialTramites from './pages/HistorialTramites';

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

        <Route exact path="/login">
          <LoginPage />
        </Route>
        <Route exact path="/registro">
          <RegisterPage />
        </Route>

        <Route exact path="/tramites">
          <Tramites />
        </Route>
        <Route exact path="/tramite/:tramiteId/detalle">
          <DetalleTramite />
        </Route>
        <Route exact path="/tramite/:tramiteId/agendar">
          <AgendarHora />
        </Route>
        <Route exact path="/tramite/:tramiteId/subir">
          <SubirArchivos />
        </Route>

        <Route exact path="/historial">
          <HistorialTramites />
        </Route>

        <Route exact path="/" render={() => <Redirect to="/tramites" />} />

      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
