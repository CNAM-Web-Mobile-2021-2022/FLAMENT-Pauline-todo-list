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
    IonBadge,
  } from "@ionic/react";

  import React, { useState } from "react";

  import { AddItem } from "./AddItem";
  import { UseAddTodoList }  from "../hooks/addTodoList"

  export const TodoList: React.FC = () => {

    const [text, setText] = useState("");
    const [filter, setFilter] = useState("all");
    const { list, addTodo, updateTodo, deleteTodo } = UseAddTodoList();
    const todoTasksLength = list.filter((item) => !item.done).length;
    const visibleTodoList = list.filter((item) => !item.done);

    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonSegment
              onIonChange={(e) => {
                setFilter(e.detail.value);
              }}
              value={filter}
            >
              <IonSegmentButton value="all">
                <IonLabel>Tout</IonLabel>
              </IonSegmentButton>
  
              <IonSegmentButton value="todo">
                <IonLabel>
                  À faire
                  {todoTasksLength ? (
                  <IonBadge>{todoTasksLength}</IonBadge>
                ) : null}
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
         {!todoTasksLength && (
            <IonItem>
              <small>Votre liste est vide, bravo !</small>
            </IonItem>
          )}

          {visibleTodoList.map((TodoItem) => {
            return (
              <AddItem
                key={TodoItem.id}
                text={TodoItem.text}
                done={TodoItem.done}
                onChange={(overrides) => updateTodo(TodoItem.id, overrides)}
                onDelete={() => deleteTodo(TodoItem.id)}
              />
            );
          })}
          </IonList>

        </IonContent>
  
        <IonFooter>
          <form
          onSubmit={(event) => {
            if (text?.trim()) {
              addTodo(text);
            }
            setText("");
            event.preventDefault();
          }}
          >
          
            <IonItem>
              <IonInput  
              value={text}
              placeholder="Avez-vous quelque chose en tête ?"
              onIonChange={(event) => setText(event.detail.value!)}
              clearInput
              />
              <IonButton type="submit" disabled={!text}>
                Créer
              </IonButton>
            </IonItem>
            
          </form>
        </IonFooter>
      </IonPage>
    );
  }


export default TodoList;




