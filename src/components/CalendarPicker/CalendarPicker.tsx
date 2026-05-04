import { JSX } from "react";
import "./CalendarPicker.css";

const DIAS = ["L", "M", "M", "J", "V", "S", "D"];
const MESES = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];

interface CalendarPickerProps {
  selectedDate: string;
  onDateChange: (date: string) => void;
}

export const CalendarPicker = ({ selectedDate, onDateChange }: CalendarPickerProps): JSX.Element => {
  const today = new Date();
  const [year, setYear] = [
    selectedDate ? parseInt(selectedDate.split("-")[0]) : today.getFullYear(),
    (y: number) => {},
  ];
  const [month, setMonth] = [
    selectedDate ? parseInt(selectedDate.split("-")[1]) - 1 : today.getMonth(),
    (m: number) => {},
  ];

  const currentYear = selectedDate ? parseInt(selectedDate.split("-")[0]) : today.getFullYear();
  const currentMonth = selectedDate ? parseInt(selectedDate.split("-")[1]) - 1 : today.getMonth();

  const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay();
  const offset = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const handlePrevMonth = () => {
    const d = new Date(currentYear, currentMonth - 1, 1);
    onDateChange(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-01`);
  };

  const handleNextMonth = () => {
    const d = new Date(currentYear, currentMonth + 1, 1);
    onDateChange(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-01`);
  };

  const handleDayClick = (day: number) => {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const clicked = new Date(currentYear, currentMonth, day);
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    if (clicked < todayStart) return;
    onDateChange(dateStr);
  };

  const isPast = (day: number) => {
    const d = new Date(currentYear, currentMonth, day);
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return d < todayStart;
  };

  const isSelected = (day: number) => {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return dateStr === selectedDate;
  };

  const cells: (number | null)[] = [
    ...Array(offset).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  return (
    <div className="calendar-picker">
      <div className="calendar-header">
        <button className="calendar-nav" onClick={handlePrevMonth}>&#8249;</button>
        <span className="calendar-title">{MESES[currentMonth]} {currentYear}</span>
        <button className="calendar-nav" onClick={handleNextMonth}>&#8250;</button>
      </div>
      <div className="calendar-grid">
        {DIAS.map((d, i) => (
          <div key={i} className="calendar-day-label">{d}</div>
        ))}
        {cells.map((day, i) => (
          <div
            key={i}
            className={`calendar-cell ${day === null ? "empty" : ""} ${day && isPast(day) ? "past" : ""} ${day && isSelected(day) ? "selected" : ""}`}
            onClick={() => day && handleDayClick(day)}
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
};
