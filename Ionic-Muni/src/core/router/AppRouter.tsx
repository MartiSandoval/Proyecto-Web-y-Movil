import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonRouterOutlet, IonLoading } from '@ionic/react';

import LoginScreen from '../../features/auth/presentation/screens/LoginScreen';
import RegisterScreen from '../../features/auth/presentation/screens/RegisterScreen';
import { TramitesScreen } from '../../features/tramites/presentation/screens/TramitesScreen';
import { DetalleTramiteScreen } from '../../features/tramites/presentation/screens/DetalleTramiteScreen';
import { AgendarHoraScreen } from '../../features/citas/presentation/screens/AgendarHoraScreen';
import { SubirArchivosScreen } from '../../features/citas/presentation/screens/SubirArchivosScreen';
import HistorialTramitesScreen from '../../features/citas/presentation/screens/HistorialTramitesScreen';
import PanelFuncionarioScreen from '../../features/panel/presentation/screens/PanelFuncionarioScreen';
import GestionCitasScreen from '../../features/panel/presentation/screens/GestionCitasScreen';
import BloqueoHorariosScreen from '../../features/panel/presentation/screens/BloqueoHorariosScreen';
import GestionTramitesScreen from '../../features/panel/presentation/screens/GestionTramitesScreen';
import { useAuth } from '../../features/auth/presentation/hooks/useAuth';

interface PrivateRouteProps {
  path: string;
  exact?: boolean;
  component: React.FC;
  roles?: Array<'usuario' | 'funcionario' | 'jefe_sucursal'>;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component, roles, ...rest }) => {
  const { user, loading } = useAuth();

  return (
    <Route
      {...rest}
      render={() => {
        if (loading) return <IonLoading isOpen={true} message="Cargando..." />;
        if (!user) return <Redirect to="/login" />;
        if (roles && !roles.includes(user.rol)) return <Redirect to="/tramites" />;
        return <Component />;
      }}
    />
  );
};

const AppRouter: React.FC = () => (
  <IonRouterOutlet>
    {/* Rutas públicas */}
    <Route exact path="/login">
      <LoginScreen />
    </Route>
    <Route exact path="/registro">
      <RegisterScreen />
    </Route>

    {/* Rutas protegidas — cualquier usuario autenticado */}
    <PrivateRoute exact path="/tramites" component={TramitesScreen} />
    <PrivateRoute exact path="/tramite/:tramiteId/detalle" component={DetalleTramiteScreen} />
    <PrivateRoute exact path="/tramite/:tramiteId/agendar" component={AgendarHoraScreen} />
    <PrivateRoute exact path="/tramite/:tramiteId/subir" component={SubirArchivosScreen} />
    <PrivateRoute exact path="/historial" component={HistorialTramitesScreen} />

    {/* Rutas protegidas — solo funcionario y jefe_sucursal */}
    <PrivateRoute
      exact
      path="/panel-funcionario"
      component={PanelFuncionarioScreen}
      roles={['funcionario', 'jefe_sucursal']}
    />
    <PrivateRoute
      exact
      path="/panel-funcionario/citas"
      component={GestionCitasScreen}
      roles={['funcionario', 'jefe_sucursal']}
    />
    <PrivateRoute
      exact
      path="/panel-funcionario/bloqueos"
      component={BloqueoHorariosScreen}
      roles={['funcionario', 'jefe_sucursal']}
    />
    {/* Gestión de trámites — exclusivo del jefe de sucursal */}
    <PrivateRoute
      exact
      path="/panel-funcionario/tramites"
      component={GestionTramitesScreen}
      roles={['jefe_sucursal']}
    />

    <Route exact path="/" render={() => <Redirect to="/login" />} />
  </IonRouterOutlet>
);

export default AppRouter;
