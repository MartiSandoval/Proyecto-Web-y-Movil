import { JSX, useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonCard, IonCardHeader, IonCardTitle, IonCardContent,
  IonList, IonItem, IonLabel, IonSkeletonText, IonChip,
} from "@ionic/react";
import type { TramiteModel } from "../../domain/entities/TramiteModel";
import { useTramites } from "../../composition/TramitesModule";
import Header from '../../../../core/presentation/components/organisms/Header/Header';
import { NavButtons } from "../../../../core/presentation/components/molecules/NavButtons/NavButtons";
import "./DetalleTramiteScreen.css";

export const DetalleTramiteScreen = (): JSX.Element => {
  const { tramiteId } = useParams<{ tramiteId: string }>();
  const history = useHistory();
  const { getTramiteUseCase } = useTramites();
  const [tramite, setTramite] = useState<TramiteModel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!tramiteId) return;
    getTramiteUseCase(tramiteId)
      .then(setTramite)
      .catch(() => setError("No se pudo cargar el trámite."))
      .finally(() => setLoading(false));
  }, [tramiteId]);

  return (
    
    <IonPage>
      <Header simple />
      <IonContent className="detalle-content">
        {loading && (
          <IonCard>
            <IonCardContent>
              <IonSkeletonText animated style={{ height: "20px", marginBottom: "8px" }} />
              <IonSkeletonText animated style={{ height: "14px" }} />
              <IonSkeletonText animated style={{ height: "14px" }} />
            </IonCardContent>
          </IonCard>
        )}

        {error && <p className="detalle-error">{error}</p>}

        {tramite && (
          <div className="detalle-container">
            <IonCard className="detalle-card">
              <IonCardHeader>
                <IonCardTitle className="detalle-titulo">{tramite.nombre}</IonCardTitle>
                <IonChip color={tramite.esEnLinea ? "primary" : "medium"} style={{ marginTop: "8px" }}>
                  {tramite.esEnLinea ? "Trámite en Línea" : "Trámite Presencial"}
                </IonChip>
              </IonCardHeader>
              <IonCardContent>
                <p className="detalle-descripcion">{tramite.descripcion}</p>
                <div className="detalle-meta">
                  <div className="detalle-meta-item">
                    <span className="detalle-meta-label">Departamento</span>
                    <span className="detalle-meta-value">{tramite.departamento}</span>
                  </div>
                  <div className="detalle-meta-item">
                    <span className="detalle-meta-label">Costo</span>
                    <span className="detalle-meta-value">{tramite.costo}</span>
                  </div>
                </div>
              </IonCardContent>
            </IonCard>

            {tramite.documentosRequeridos.length > 0 && (
              <IonCard className="detalle-card">
                <IonCardHeader>
                  <IonCardTitle>Documentos Requeridos</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonList lines="inset">
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
        )}
      </IonContent>

      <NavButtons
        onAtras={() => history.push("/tramites")}
        onContinuar={() => history.push(`/tramite/${tramiteId}/agendar`)}
        continuarDisabled={!tramite}
      />
    </IonPage>
  );
};
