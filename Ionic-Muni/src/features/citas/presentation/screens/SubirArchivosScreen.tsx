import { JSX, useEffect, useState } from "react";
import { useParams, useHistory, useLocation } from "react-router-dom";
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonCard, IonCardHeader, IonCardTitle, IonCardContent,
  IonList, IonItem, IonLabel,
} from "@ionic/react";
import type { UploadedFileModel } from "../../domain/entities/UploadedFileModel";
import type { TramiteModel } from "../../../tramites/domain/entities/TramiteModel";
import { useTramites } from "../../../tramites/composition/TramitesModule";
import { useCitasData } from "../../composition/CitasModule";
import { supabase } from "../../../../network/supabaseClient";
import { FileUploadZone } from "../components/FileUploadZone/FileUploadZone";
import { NavButtons } from "../../../../core/presentation/components/molecules/NavButtons/NavButtons";
import "./SubirArchivosScreen.css";
import Header from '../../../../core/presentation/components/organisms/Header/Header';

interface LocationState {
  fecha: string;
  hora: string;
}

export const SubirArchivosScreen = (): JSX.Element => {
  const { tramiteId } = useParams<{ tramiteId: string }>();
  const history = useHistory();
  const location = useLocation();
  const { fecha, hora } = (location.state as LocationState) || {};
  const { getTramiteUseCase } = useTramites();
  const { postCitaUseCase, postArchivoUseCase } = useCitasData();

  const [tramite, setTramite] = useState<TramiteModel | null>(null);
  const [files, setFiles] = useState<UploadedFileModel[]>([]);
  const [saving, setSaving] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (tramiteId) getTramiteUseCase(tramiteId).then(setTramite).catch(() => {});
  }, [tramiteId]);

  const handleFilesAdded = (newFiles: File[]) => {
    const entries: UploadedFileModel[] = newFiles.map((f) => ({
      nombre: f.name,
      file: f,
      estado: "subiendo",
      progreso: 0,
    }));
    setFiles((prev) => [...prev, ...entries]);
    entries.forEach((entry) => simulateUpload(entry.nombre));
  };

  const simulateUpload = (nombre: string) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 20;
      setFiles((prev) =>
        prev.map((f) =>
          f.nombre === nombre ? { ...f, progreso: Math.min(progress, 100) } : f
        )
      );
      if (progress >= 100) {
        clearInterval(interval);
        setFiles((prev) =>
          prev.map((f) => (f.nombre === nombre ? { ...f, estado: "subiendo", progreso: 100 } : f))
        );
      }
    }, 300);
  };

  const handleRetry = (nombre: string) => {
    setFiles((prev) =>
      prev.map((f) => (f.nombre === nombre ? { ...f, estado: "subiendo", progreso: 0 } : f))
    );
    simulateUpload(nombre);
  };

  const handleGuardar = async () => {
    if (!tramiteId || !fecha || !hora) return;
    setSaving(true);
    try {
      const cita = await postCitaUseCase(tramiteId, fecha, hora);
      const citaId = cita.id!;

      for (const f of files) {
        if (!supabase) {
          setFiles((prev) =>
            prev.map((pf) => (pf.nombre === f.nombre ? { ...pf, estado: "completado", url: "#" } : pf))
          );
          continue;
        }

        const path = `${citaId}/${f.nombre}`;
        const { error } = await supabase.storage
          .from("citas-archivos")
          .upload(path, f.file, { upsert: true });

        if (error) {
          setFiles((prev) =>
            prev.map((pf) => (pf.nombre === f.nombre ? { ...pf, estado: "error" } : pf))
          );
          continue;
        }

        const { data: urlData } = supabase.storage
          .from("citas-archivos")
          .getPublicUrl(path);

        setFiles((prev) =>
          prev.map((pf) =>
            pf.nombre === f.nombre
              ? { ...pf, estado: "completado", url: urlData.publicUrl }
              : pf
          )
        );

        await postArchivoUseCase(citaId, f.nombre, urlData.publicUrl);
      }

      setDone(true);
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  if (done) {
    return (
      <IonPage>
        <Header simple />
        <IonContent className="subir-content">
          <div className="subir-success">
            <div className="subir-success-icon">✓</div>
            <h2>¡Hora agendada con éxito!</h2>
            <p>Tu cita fue registrada para el <strong>{fecha}</strong> a las <strong>{hora}</strong>.</p>
            <p>{tramite?.nombre}</p>
            <button className="subir-volver-btn" onClick={() => history.push("/tramites")}>
              Volver al inicio
            </button>
          </div>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <Header simple />
      <IonContent className="subir-content">
        <p className="subir-subtitle">
          En esta sección se le pedirá los archivos necesarios para agendar el trámite sin problema.
        </p>
        <div className="subir-layout">
          <div className="subir-upload-col">
            <FileUploadZone files={files} onFilesAdded={handleFilesAdded} onRetry={handleRetry} />
          </div>
          <div className="subir-docs-col">
            {tramite && tramite.documentosRequeridos.length > 0 && (
              <IonCard className="subir-docs-card">
                <IonCardHeader>
                  <IonCardTitle>Archivos Necesarios</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonList lines="none">
                    {tramite.documentosRequeridos.map((doc, i) => (
                      <IonItem key={i}>
                        <IonLabel>• {doc}</IonLabel>
                      </IonItem>
                    ))}
                  </IonList>
                </IonCardContent>
              </IonCard>
            )}
          </div>
        </div>
      </IonContent>

      <NavButtons
        onAtras={() => history.goBack()}
        onContinuar={handleGuardar}
        continuarDisabled={saving}
        continuarLabel={saving ? "Guardando..." : "Guardar Y Continuar"}
      />
    </IonPage>
  );
};
