import { JSX, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonCard, IonCardHeader, IonCardTitle, IonCardContent,
} from "@ionic/react";
import { ITimeSlot } from "../../types/tramite";
import { getDisponibilidad } from "../../lib/api";
import { CalendarPicker } from "../../components/CalendarPicker/CalendarPicker";
import { TimeSlotGrid } from "../../components/TimeSlotGrid/TimeSlotGrid";
import { NavButtons } from "../../components/NavButtons/NavButtons";
import "./AgendarHora.css";

const formatFechaLarga = (fecha: string) => {
  if (!fecha) return "";
  const [y, m, d] = fecha.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  return date.toLocaleDateString("es-CL", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
};

export const AgendarHora = (): JSX.Element => {
  const { tramiteId } = useParams<{ tramiteId: string }>();
  const navigate = useNavigate();

  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  const [selectedDate, setSelectedDate] = useState(todayStr);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [slots, setSlots] = useState<ITimeSlot[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);

  useEffect(() => {
    if (!tramiteId || !selectedDate || selectedDate.endsWith("-01") && selectedDate !== todayStr) {
      setSlots([]);
      setSelectedSlot("");
      return;
    }
    setLoadingSlots(true);
    setSelectedSlot("");
    getDisponibilidad(tramiteId, selectedDate)
      .then(setSlots)
      .catch(() => setSlots([]))
      .finally(() => setLoadingSlots(false));
  }, [tramiteId, selectedDate]);

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
  };

  const handleContinuar = () => {
    navigate(`/tramite/${tramiteId}/subir`, {
      state: { fecha: selectedDate, hora: selectedSlot },
    });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary" style={{ "--background": "#1a3a6b" }}>
          <IonTitle>Agendar Hora</IonTitle>
        </IonToolbar>
      </IonHeader>

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
        onAtras={() => navigate(-1)}
        onContinuar={handleContinuar}
        continuarDisabled={!selectedDate || !selectedSlot}
      />
    </IonPage>
  );
};
