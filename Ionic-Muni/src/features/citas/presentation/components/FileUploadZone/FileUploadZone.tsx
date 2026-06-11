import { JSX, useRef, DragEvent, ChangeEvent } from "react";
import type { UploadedFileModel } from "../../../domain/entities/UploadedFileModel";
import "./FileUploadZone.css";

interface FileUploadZoneProps {
  files: UploadedFileModel[];
  onFilesAdded: (newFiles: File[]) => void;
  onRetry: (nombre: string) => void;
}

export const FileUploadZone = ({ files, onFilesAdded, onRetry }: FileUploadZoneProps): JSX.Element => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const dropped = Array.from(e.dataTransfer.files);
    if (dropped.length > 0) onFilesAdded(dropped);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      onFilesAdded(Array.from(e.target.files));
    }
  };

  return (
    <div className="upload-zone-wrapper">
      <div
        className="upload-dropzone"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
      >
        <div className="upload-icon">&#9729;</div>
        <p className="upload-text">Arrastra archivo para subirlo</p>
        <p className="upload-subtext">o haz clic para buscarlo</p>
        <input
          ref={inputRef}
          type="file"
          multiple
          style={{ display: "none" }}
          onChange={handleChange}
        />
      </div>

      {files.length > 0 && (
        <div className="upload-file-list">
          {files.map((f) => (
            <div key={f.nombre} className={`upload-file-item ${f.estado}`}>
              <span className="upload-file-icon">&#128196;</span>
              <div className="upload-file-info">
                <span className="upload-file-name">{f.nombre}</span>
                {f.estado === "subiendo" && (
                  <div className="upload-progress-bar">
                    <div className="upload-progress-fill" style={{ width: `${f.progreso}%` }} />
                  </div>
                )}
                {f.estado === "error" && (
                  <button className="upload-retry" onClick={() => onRetry(f.nombre)}>
                    Reintentar
                  </button>
                )}
              </div>
              <span className="upload-status-label">
                {f.estado === "subiendo" && `Subiendo ${f.progreso}%`}
                {f.estado === "completado" && "Completado ✓"}
                {f.estado === "error" && "Error al subir el archivo"}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
