import "./styles.css";
import "@ionic/react/css/core.css";
import { IonApp, setupIonicReact } from "@ionic/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Tramites } from "./Tramites/Tramites";
import { DetalleTramite } from "./pages/DetalleTramite/DetalleTramite";
import { AgendarHora } from "./pages/AgendarHora/AgendarHora";
import { SubirArchivos } from "./pages/SubirArchivos/SubirArchivos";

setupIonicReact();

export default function App() {
  return (
    <IonApp>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Tramites />} />
          <Route path="/tramite/:tramiteId" element={<DetalleTramite />} />
          <Route path="/tramite/:tramiteId/agendar" element={<AgendarHora />} />
          <Route path="/tramite/:tramiteId/subir" element={<SubirArchivos />} />
        </Routes>
      </BrowserRouter>
    </IonApp>
  );
}
