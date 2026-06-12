import { JSX, useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonCard, IonCardHeader, IonCardTitle, IonCardContent,
  useIonViewWillEnter,
} from "@ionic/react";
import type { TramiteModel } from "../../../tramites/domain/entities/TramiteModel";
import type { TimeSlotModel } from "../../domain/entities/TimeSlotModel";
import { useTramites } from "../../../tramites/composition/TramitesModule";
import { useCitasData } from "../../composition/CitasModule";
import { useCitas } from "../hooks/useCitas";
import { CalendarPicker } from "../components/CalendarPicker/CalendarPicker";
import { TimeSlotGrid } from "../components/TimeSlotGrid/TimeSlotGrid";
import { NavButtons } from "../../../../core/presentation/components/molecules/NavButtons/NavButtons";
import "./AgendarHoraScreen.css";
import Header from '../../../../core/presentation/components/organisms/Header/Header';


const formatFechaLarga = (fecha: string) => {
  if (!fecha) return "";
  const [y, m, d] = fecha.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  return date.toLocaleDateString("es-CL", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
};

export const AgendarHoraScreen = (): JSX.Element => {
  const { tramiteId } = useParams<{ tramiteId: string }>();
  const history = useHistory();
  const { agregarCita, isSlotBloqueado } = useCitas();
  const { getDisponibilidadUseCase } = useCitasData();
  const { getTramiteUseCase } = useTramites();

  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  const [selectedDate, setSelectedDate] = useState(todayStr);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [rawSlots, setRawSlots] = useState<TimeSlotModel[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [tramite, setTramite] = useState<TramiteModel | null>(null);

  // Filtrar en render para que el bloqueo sea siempre inmediato
  const slots = rawSlots.map((s) => ({
    ...s,
    disponible: s.disponible && !isSlotBloqueado(tramiteId, selectedDate, s.hora),
  }));

  useEffect(() => {
    getTramiteUseCase(tramiteId).then(setTramite).catch(() => {});
  }, [tramiteId]);

  const fetchSlots = () => {
    if (!tramiteId || !selectedDate) return;
    setLoadingSlots(true);
    setSelectedSlot("");
    getDisponibilidadUseCase(tramiteId, selectedDate)
      .then(setRawSlots)
      .catch(() => setRawSlots([]))
      .finally(() => setLoadingSlots(false));
  };

  useEffect(() => { fetchSlots(); }, [tramiteId, selectedDate]);

  useIonViewWillEnter(() => { fetchSlots(); });

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
  };

  const handleContinuar = () => {
    agregarCita({
      tramiteId,
      tramiteNombre: tramite?.nombre ?? `Trámite ${tramiteId}`,
      departamento: tramite?.departamento ?? "Municipalidad",
      fecha: selectedDate,
      hora: selectedSlot,
    });
    history.push({
      pathname: `/tramite/${tramiteId}/subir`,
      state: { fecha: selectedDate, hora: selectedSlot },
    });
  };

  return (
    <IonPage>
      <Header simple />

      <IonContent className="agendar-content">
        <div className="agendar-layout">
          <div className="agendar-calendar-col">
            <CalendarPicker selectedDate={selectedDate} onDateChange={handleDateChange} />
          </div>

          <div className="agendar-slots-col">
            <IonCard className="slots-card">
              <IonCardHeader>
                <IonCardTitle className="slots-title">
                  <span>Horarios Disponibles</span>
                  <span className="slots-clock">🕐</span>
                </IonCardTitle>
                {selectedDate && (
                  <p className="slots-fecha">{formatFechaLarga(selectedDate)}</p>
                )}
              </IonCardHeader>
              <IonCardContent>
                {loadingSlots ? (
                  <p className="slots-loading">Cargando horarios...</p>
                ) : slots.length > 0 ? (
                  <>
                    <TimeSlotGrid slots={slots} selectedSlot={selectedSlot} onSlotSelect={setSelectedSlot} />
                    <p className="slots-count">{slots.filter((s) => s.disponible).length} Horarios Disponibles</p>
                  </>
                ) : (
                  <p className="slots-empty">Selecciona una fecha para ver los horarios.</p>
                )}
              </IonCardContent>
            </IonCard>
          </div>
        </div>
      </IonContent>

      <NavButtons
        onAtras={() => history.goBack()}
        onContinuar={handleContinuar}
        continuarDisabled={!selectedDate || !selectedSlot}
      />
    </IonPage>
  );
};
