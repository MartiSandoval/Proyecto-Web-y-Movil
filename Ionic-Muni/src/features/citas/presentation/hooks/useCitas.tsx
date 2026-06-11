import { createContext, createElement, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { CitaAgendadaModel } from "../../domain/entities/CitaAgendadaModel";

interface SlotBloqueado {
  tramiteId: string;
  fecha: string;
  hora: string;
}

export interface CitasContextType {
  citas: CitaAgendadaModel[];
  slotsBloqueados: SlotBloqueado[];
  agregarCita: (cita: Omit<CitaAgendadaModel, "id" | "estado">) => void;
  eliminarCita: (id: string) => void;
  isSlotBloqueado: (tramiteId: string, fecha: string, hora: string) => boolean;
}

const CitasContext = createContext<CitasContextType | null>(null);

type CitasProviderProps = {
  children: ReactNode;
};

export function CitasProvider({ children }: CitasProviderProps) {
  const [citas, setCitas] = useState<CitaAgendadaModel[]>([]);
  const [slotsBloqueados, setSlotsBloqueados] = useState<SlotBloqueado[]>([]);

  const agregarCita = (cita: Omit<CitaAgendadaModel, "id" | "estado">) => {
    const nueva: CitaAgendadaModel = { ...cita, id: Date.now().toString(), estado: "Agendado" };
    setCitas((prev) => [...prev, nueva]);
    setSlotsBloqueados((prev) => [...prev, { tramiteId: cita.tramiteId, fecha: cita.fecha, hora: cita.hora }]);
  };

  const eliminarCita = (id: string) => {
    const cita = citas.find((c) => c.id === id);
    if (cita) {
      setSlotsBloqueados((prev) =>
        prev.filter((s) => !(s.tramiteId === cita.tramiteId && s.fecha === cita.fecha && s.hora === cita.hora))
      );
    }
    setCitas((prev) => prev.filter((c) => c.id !== id));
  };

  const isSlotBloqueado = (tramiteId: string, fecha: string, hora: string) =>
    slotsBloqueados.some((s) => s.tramiteId === tramiteId && s.fecha === fecha && s.hora === hora);

  const value: CitasContextType = { citas, slotsBloqueados, agregarCita, eliminarCita, isSlotBloqueado };

  return createElement(CitasContext.Provider, { value }, children);
}

export const useCitas = (): CitasContextType => {
  const ctx = useContext(CitasContext);
  if (!ctx) throw new Error("useCitas debe usarse dentro de CitasProvider");
  return ctx;
};
