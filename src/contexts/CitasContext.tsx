import React, { createContext, useContext, useState } from "react";

export interface ICitaAgendada {
  id: string;
  tramiteId: string;
  tramiteNombre: string;
  departamento: string;
  fecha: string;
  hora: string;
  estado: "Agendado";
}

interface SlotBloqueado {
  tramiteId: string;
  fecha: string;
  hora: string;
}

interface CitasContextType {
  citas: ICitaAgendada[];
  slotsBloqueados: SlotBloqueado[];
  agregarCita: (cita: Omit<ICitaAgendada, "id" | "estado">) => void;
  eliminarCita: (id: string) => void;
  isSlotBloqueado: (tramiteId: string, fecha: string, hora: string) => boolean;
}

const CitasContext = createContext<CitasContextType | null>(null);

export const CitasProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [citas, setCitas] = useState<ICitaAgendada[]>([]);
  const [slotsBloqueados, setSlotsBloqueados] = useState<SlotBloqueado[]>([]);

  const agregarCita = (cita: Omit<ICitaAgendada, "id" | "estado">) => {
    const nueva: ICitaAgendada = { ...cita, id: Date.now().toString(), estado: "Agendado" };
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

  return (
    <CitasContext.Provider value={{ citas, slotsBloqueados, agregarCita, eliminarCita, isSlotBloqueado }}>
      {children}
    </CitasContext.Provider>
  );
};

export const useCitas = (): CitasContextType => {
  const ctx = useContext(CitasContext);
  if (!ctx) throw new Error("useCitas debe usarse dentro de CitasProvider");
  return ctx;
};
