import { IonApp, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { CitasProvider } from './contexts/CitasContext';
import AppRoutes from './routes/AppRoutes';
import AccessibilityMenu from './components/AccessibilityMenu/AccessibilityMenu';

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
  <CitasProvider>
    <IonApp>
      <IonReactRouter>
        <AppRoutes />
      </IonReactRouter>
      <AccessibilityMenu />
    </IonApp>
  </CitasProvider>
);

export default App;
