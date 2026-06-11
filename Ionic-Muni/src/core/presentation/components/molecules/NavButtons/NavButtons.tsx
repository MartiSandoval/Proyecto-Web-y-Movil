import { IonButton, IonFooter, IonToolbar } from "@ionic/react";

interface NavButtonsProps {
  onAtras?: () => void;
  onContinuar: () => void;
  continuarLabel?: string;
  continuarDisabled?: boolean;
}

export const NavButtons = ({
  onAtras,
  onContinuar,
  continuarLabel = "Guardar Y Continuar",
  continuarDisabled = false,
}: NavButtonsProps) => {
  return (
    <IonFooter>
      <IonToolbar style={{ padding: "8px 16px", display: "flex", justifyContent: "space-between" }}>
        <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
          {onAtras ? (
            <IonButton fill="outline" color="medium" onClick={onAtras}>
              Atras
            </IonButton>
          ) : (
            <div />
          )}
          <IonButton
            color="primary"
            onClick={onContinuar}
            disabled={continuarDisabled}
            style={{ "--background": "#1a3a6b" }}
          >
            {continuarLabel}
          </IonButton>
        </div>
      </IonToolbar>
    </IonFooter>
  );
};
