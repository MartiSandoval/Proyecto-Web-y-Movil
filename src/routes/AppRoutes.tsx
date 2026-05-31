import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonRouterOutlet, IonLoading } from '@ionic/react';

import LoginPage from '../pages/LoginPage/LoginPage';
import RegisterPage from '../pages/RegisterPage/RegisterPage';
import { Tramites } from '../pages/Tramites/Tramites';
import { DetalleTramite } from '../pages/DetalleTramite/DetalleTramite';
import { AgendarHora } from '../pages/AgendarHora/AgendarHora';
import { SubirArchivos } from '../pages/SubirArchivos/SubirArchivos';
import HistorialTramites from '../pages/HistorialTramites/HistorialTramites';
import { useAuth } from '../contexts/AuthContext';

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

const AppRoutes: React.FC = () => (
  <IonRouterOutlet>
    {/* Rutas públicas */}
    <Route exact path="/login">
      <LoginPage />
    </Route>
    <Route exact path="/registro">
      <RegisterPage />
    </Route>

    {/* Rutas protegidas — cualquier usuario autenticado */}
    <PrivateRoute exact path="/tramites" component={Tramites} />
    <PrivateRoute exact path="/tramite/:tramiteId/detalle" component={DetalleTramite} />
    <PrivateRoute exact path="/tramite/:tramiteId/agendar" component={AgendarHora} />
    <PrivateRoute exact path="/tramite/:tramiteId/subir" component={SubirArchivos} />
    <PrivateRoute exact path="/historial" component={HistorialTramites} />

    <Route exact path="/" render={() => <Redirect to="/login" />} />
  </IonRouterOutlet>
);

export default AppRoutes;
