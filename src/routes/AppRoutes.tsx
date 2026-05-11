import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonRouterOutlet } from '@ionic/react';

import LoginPage from '../pages/LoginPage/LoginPage';
import RegisterPage from '../pages/RegisterPage/RegisterPage';
import { Tramites } from '../pages/Tramites/Tramites';
import { DetalleTramite } from '../pages/DetalleTramite/DetalleTramite';
import { AgendarHora } from '../pages/AgendarHora/AgendarHora';
import { SubirArchivos } from '../pages/SubirArchivos/SubirArchivos';
import HistorialTramites from '../pages/HistorialTramites/HistorialTramites';

const isLoggedIn = () => localStorage.getItem('isLoggedIn') === 'true';

const AppRoutes: React.FC = () => (
  <IonRouterOutlet>
    {/* Rutas públicas */}
    <Route exact path="/login">
      <LoginPage />
    </Route>
    <Route exact path="/registro">
      <RegisterPage />
    </Route>

    {/* Rutas protegidas — requieren sesión iniciada */}
    <Route exact path="/tramites" render={() => isLoggedIn() ? <Tramites /> : <Redirect to="/login" />} />
    <Route exact path="/tramite/:tramiteId/detalle" render={() => isLoggedIn() ? <DetalleTramite /> : <Redirect to="/login" />} />
    <Route exact path="/tramite/:tramiteId/agendar" render={() => isLoggedIn() ? <AgendarHora /> : <Redirect to="/login" />} />
    <Route exact path="/tramite/:tramiteId/subir" render={() => isLoggedIn() ? <SubirArchivos /> : <Redirect to="/login" />} />
    <Route exact path="/historial" render={() => isLoggedIn() ? <HistorialTramites /> : <Redirect to="/login" />} />

    <Route exact path="/" render={() => <Redirect to="/login" />} />
  </IonRouterOutlet>
);

export default AppRoutes;
