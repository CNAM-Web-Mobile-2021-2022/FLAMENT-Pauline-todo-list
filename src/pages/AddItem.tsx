import {
  IonButton,
  IonLabel,
  IonItem,
  IonCheckbox,
  IonIcon,
  IonAlert,
  } from "@ionic/react";

  import React, { useState } from "react";

  import { createOutline, trashBinOutline } from "ionicons/icons";

  export function AddItem(props: { text: any; done: any; onChange: any; onDelete: any; }) {
        const { text, done, onChange, onDelete } = props;

    return (
        <IonItem className={`todo-item ${done ? "-checked" : ""}`}>

        <IonCheckbox
          slot="start"
          checked={done}
          onIonChange={() => onChange({ done: !done })}
        />
  
        <IonLabel onClick={() => onChange({ done: !done })}>{text}</IonLabel>
  
        <EditButton
          onUpdate={(newValue: any) => onChange({ text: newValue })}
          value={text}
        />
        <DeleteButton onDelete={onDelete} />
      </IonItem>
    );
  }
  
  function EditButton(props: { onUpdate: any; value: any; }) {
    const { onUpdate, value } = props;
    const [isEditing, setEditing] = useState(false);
  
    return (
      <>
        <IonButton fill="clear" onClick={() => setEditing(true)}>
          <IonIcon slot="icon-only" icon={createOutline} />
        </IonButton>
  
        <IonAlert
          isOpen={isEditing}
          onWillDismiss={() => setEditing(false)}
          header={"Modifier"}
          inputs={[
            {
              type: "text",
              name: "text",
              value: value,
            },
          ]}
          buttons={[
            "Cancel",
            {
              text: "Valider",
              handler: (values) => onUpdate(values.text),
            },
          ]}
        />
      </>
    );
  }
  
  function DeleteButton(props: { onDelete: any; }) {
    const { onDelete } = props;
    const [isConfirming, setConfirming] = useState(false);
  
    return (
      <>
        <IonButton
          fill="clear"
          onClick={() => setConfirming(true)}
          color="danger"
        >
          <IonIcon slot="icon-only" icon={trashBinOutline} />
        </IonButton>
  
        <IonAlert
          isOpen={isConfirming}
          onWillDismiss={() => setConfirming(false)}
          header={"Suppression"}
          message={"La tâche sera supprimée définitivement"}
          buttons={[
            "Cancel",
            {
              text: "Supprimer",
              handler: () => onDelete(),
            },
          ]}
        />
      </>
    );
  }


export default AddItem;