import {
    IonContent,
    IonHeader,
    IonPage,
    IonToolbar,
    IonButton,
    IonLabel,
    IonItem,
    IonList,
    IonSegment,
    IonSegmentButton,
    IonFooter,
    IonInput,
  } from "@ionic/react";

  import React from "react";

  //import { addTodoList }  from "../hooks/addTodoList"

  const TodoList: React.FC = () => {

    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonSegment>
              <IonSegmentButton value="all">
                <IonLabel>Tout</IonLabel>
              </IonSegmentButton>
  
              <IonSegmentButton value="todo">
                <IonLabel>
                  À faire
                </IonLabel>
              </IonSegmentButton>
  
              <IonSegmentButton value="done">
                <IonLabel>Faits</IonLabel>
              </IonSegmentButton>

            </IonSegment>
          </IonToolbar>
        </IonHeader>
  
        <IonContent fullscreen>
    
        <IonList>
        
            <IonItem>
              <small>Votre liste est vide, bravo !</small>
            </IonItem>
          </IonList>
        </IonContent>
  
        <IonFooter>
          <form>
          
            <IonItem>
              <IonInput placeholder="Avez-vous quelque chose en tête ?" />
              <IonButton type="submit">
                Créer
              </IonButton>
            </IonItem>
            
          </form>
        </IonFooter>
      </IonPage>
    );
  }


export default TodoList;




