import { JSX } from "react";
import type { TimeSlotModel } from "../../../domain/entities/TimeSlotModel";
import "./TimeSlotGrid.css";

interface TimeSlotGridProps {
  slots: TimeSlotModel[];
  selectedSlot: string;
  onSlotSelect: (hora: string) => void;
}

export const TimeSlotGrid = ({ slots, selectedSlot, onSlotSelect }: TimeSlotGridProps): JSX.Element => {
  return (
    <div className="timeslot-grid">
      {slots.map((slot) => (
        <button
          key={slot.hora}
          className={`timeslot-btn ${!slot.disponible ? "taken" : ""} ${selectedSlot === slot.hora ? "selected" : ""}`}
          onClick={() => slot.disponible && onSlotSelect(slot.hora)}
          disabled={!slot.disponible}
        >
          {slot.hora}
        </button>
      ))}
    </div>
  );
};
