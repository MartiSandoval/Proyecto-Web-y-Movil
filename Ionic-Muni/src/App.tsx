import { IonApp, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { CitasProvider } from './features/citas/composition/CitasModule';
import { AuthProvider } from './features/auth/composition/AuthModule';
import AppRouter from './core/router/AppRouter';
import AccessibilityMenu from './core/presentation/components/organisms/AccessibilityMenu/AccessibilityMenu';

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
import './core/theme/variables.css';

setupIonicReact();

const App: React.FC = () => (
  <AuthProvider>
    <CitasProvider>
      <IonApp>
        <IonReactRouter>
          <AppRouter />
        </IonReactRouter>
        <AccessibilityMenu />
      </IonApp>
    </CitasProvider>
  </AuthProvider>
);

export default App;
