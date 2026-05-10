import { JSX, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  IonPage, IonContent, IonSearchbar, IonSkeletonText, IonChip, IonIcon,
} from "@ionic/react";
import { wifiOutline, businessOutline } from "ionicons/icons";
import { ITramite } from "../types/tramite";
import { getTramites } from "../lib/api";
import "./Tramites.css";

type FiltroTipo = "todos" | "online" | "presencial";

export const Tramites = (): JSX.Element => {
  const history = useHistory();
  const [tramites, setTramites] = useState<ITramite[]>([]);
  const [filtrados, setFiltrados] = useState<ITramite[]>([]);
  const [busqueda, setBusqueda] = useState("");
  const [filtroTipo, setFiltroTipo] = useState<FiltroTipo>("todos");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getTramites()
      .then((data) => { setTramites(data); setFiltrados(data); })
      .catch(() => setError("No se pudieron cargar los trámites."))
      .finally(() => setLoading(false));
  }, []);

  const aplicarFiltros = (texto: string, tipo: FiltroTipo, lista: ITramite[]) => {
    const lower = texto.toLowerCase();
    return lista.filter((t) => {
      const coincideTexto =
        t.nombre.toLowerCase().includes(lower) ||
        t.departamento.toLowerCase().includes(lower) ||
        t.descripcion.toLowerCase().includes(lower);
      const coincideTipo =
        tipo === "todos" ||
        (tipo === "online" && t.esEnLinea) ||
        (tipo === "presencial" && !t.esEnLinea);
      return coincideTexto && coincideTipo;
    });
  };

  const handleBusqueda = (valor: string) => {
    setBusqueda(valor);
    setFiltrados(aplicarFiltros(valor, filtroTipo, tramites));
  };

  const handleFiltroTipo = (tipo: FiltroTipo) => {
    setFiltroTipo(tipo);
    setFiltrados(aplicarFiltros(busqueda, tipo, tramites));
  };

  return (
    <IonPage>
      {/* Barra superior */}
      <div className="tr-topbar">
        <span>Plataforma Ley Lobby</span>
        <span>Solicitud Ley de Transparencia</span>
        <span>Transparencia Activa</span>
        <span>Decretos</span>
        <span className="tr-topbar-live">📺 Observe el Consejo Municipal en VIVO</span>
      </div>

      {/* Header */}
      <div className="tr-header">
        <div className="tr-header-logo">
          <div className="tr-logo-placeholder">SD</div>
          <div>
            <strong>Santo Domingo</strong>
            <span>Municipalidad</span>
          </div>
        </div>
        <div className="tr-header-search">
          <IonSearchbar
            placeholder="Desea buscar algo...?"
            className="tr-header-searchbar"
          />
        </div>
        <div className="tr-header-contact">
          <span>Contacto telefónico</span>
          <span className="tr-header-dots">· · · · · · · · · ·</span>
        </div>
      </div>

      {/* Navegación */}
      <nav className="tr-nav">
        <span className="tr-nav-item tr-nav-active">Trámites y servicios ▾</span>
        <span className="tr-nav-item">Municipio ▾</span>
        <span className="tr-nav-item">Turismo ▾</span>
        <span className="tr-nav-item">Noticias</span>
        <span className="tr-nav-item">Plan regulador comunal ▾</span>
        <span className="tr-nav-right">SIG</span>
        <span className="tr-nav-right">Contacto</span>
        <span className="tr-nav-right">OIRS</span>
      </nav>

      {/* Breadcrumb */}
      <div className="tr-breadcrumb">
        &rsaquo; Usted está en: <strong>Trámites y Servicios</strong>
      </div>

      <IonContent className="tr-content">
        {/* Título */}
        <div className="tr-title-row">
          <div>
            <h1 className="tr-title">Trámites y Servicios</h1>
            <p className="tr-subtitle">
              Aquí podrá encontrar todos los trámites con los que contamos en la municipalidad<br />
              Gestiona tus trámites de manera fácil y eficiente.
            </p>
          </div>
          {!loading && (
            <div className="tr-count-badge">{filtrados.length} trámites disponibles</div>
          )}
        </div>

        {/* Barra de filtros */}
        <div className="tr-filters">
          <IonSearchbar
            value={busqueda}
            onIonInput={(e) => handleBusqueda(e.detail.value ?? "")}
            placeholder="Buscar trámite o servicio..."
            className="tr-filter-searchbar"
          />
          <div className="tr-filter-type">
            <select
              className="tr-select"
              value={filtroTipo}
              onChange={(e) => handleFiltroTipo(e.target.value as FiltroTipo)}
            >
              <option value="todos">Todos los tipos</option>
              <option value="online">En línea</option>
              <option value="presencial">Presencial</option>
            </select>
          </div>
          <div className="tr-filter-chips">
            <IonChip
              color={filtroTipo === "online" ? "primary" : "medium"}
              onClick={() => handleFiltroTipo(filtroTipo === "online" ? "todos" : "online")}
            >
              <IonIcon icon={wifiOutline} />
              &nbsp;a en línea
            </IonChip>
            <IonChip
              color={filtroTipo === "presencial" ? "primary" : "medium"}
              onClick={() => handleFiltroTipo(filtroTipo === "presencial" ? "todos" : "presencial")}
            >
              <IonIcon icon={businessOutline} />
              &nbsp;b presencial
            </IonChip>
          </div>
          {!loading && (
            <p className="tr-showing">
              Mostrando {filtrados.length} de {tramites.length} trámites disponibles
            </p>
          )}
        </div>

        {/* Error */}
        {error && <p className="tr-error">{error}</p>}

        {/* Grid de cards */}
        <div className="tr-grid">
          {loading
            ? [1, 2, 3, 4].map((i) => (
                <div key={i} className="tr-card">
                  <IonSkeletonText animated style={{ height: "44px", width: "44px", borderRadius: "8px" }} />
                  <IonSkeletonText animated style={{ height: "16px", width: "80%", marginTop: "12px" }} />
                  <IonSkeletonText animated style={{ height: "14px", width: "60%", marginTop: "8px" }} />
                  <IonSkeletonText animated style={{ height: "48px", marginTop: "8px" }} />
                </div>
              ))
            : filtrados.map((tramite) => (
                <div key={tramite.id} className="tr-card">
                  <div className="tr-card-top">
                    <div className="tr-card-icon">
                      {tramite.esEnLinea ? "🌐" : "🏛️"}
                    </div>
                    <span className={`tr-badge ${tramite.esEnLinea ? "tr-badge-online" : "tr-badge-presencial"}`}>
                      <IonIcon icon={tramite.esEnLinea ? wifiOutline : businessOutline} />
                      &nbsp;{tramite.esEnLinea ? "Trámite en línea" : "Trámite presencial"}
                    </span>
                  </div>
                  <h3 className="tr-card-title">{tramite.nombre}</h3>
                  <p className="tr-card-desc">{tramite.descripcion}</p>
                  <div className="tr-card-meta">
                    <span>💲 {tramite.costo}</span>
                    <span>🏢 {tramite.departamento}</span>
                  </div>
                  <button
                    className="tr-card-btn"
                    onClick={() => history.push(`/tramite/${tramite.id}/detalle`)}
                  >
                    Ver detalles &rsaquo;
                  </button>
                </div>
              ))}
        </div>

        {!loading && filtrados.length === 0 && !error && (
          <p className="tr-empty">No se encontraron trámites.</p>
        )}
      </IonContent>
    </IonPage>
  );
};
