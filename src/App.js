import { useState } from "react";
import List from "./Components/List/List";
import store from "./utils/store"
import { v4 as uuid } from "uuid";
import StoreApi from "./utils/storeApi";
import { makeStyles } from "@material-ui/core"
import InputContainer from "./Components/Input/InputContainer";
import { DragDropContext, Droppable } from "react-beautiful-dnd";


const useStyle = makeStyles((theme) => ({
  root: {
    display: 'flex',
    overflowY: 'auto'
  }
}))

function App() {

  const [data, setData] = useState(store);
  const classes = useStyle();
  const addNewCard = (content, listId) => {
    const newCardId = uuid();
    console.log(newCardId);
    const newCard = {
      id: newCardId,
      content
    };

    const list = data.lists[listId];
    list.cards = [...list.cards, newCard]

    const newState = {
      ...data,
      lists: {
        ...data.lists,
        [listId]: list,
      }
    }
    setData(newState);
  }

  const addNewList = (title) => {
    const newListId = uuid();
    const newList = {
      id: newListId,
      title,
      cards: []
    };

    const newState = {
      listIds: [...data.listIds, newListId],
      lists: {
        ...data.lists,
        [newListId]: newList
      }
    };

    setData(newState);
  }

  const updateListTitle = (title, listId) => {
    const list = data.lists[listId];
    list.title = title;

    const newState = {
      ...data, lists: {
        ...data.lists, [listId]: list
      }
    };

    setData(newState);
  }

  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;
    console.log("destination", destination, "source", source, "draggableId", draggableId);

    if (!destination) {
      return;
    }

    if(type==="list") {
      const newListIds = data.listIds;
      newListIds.splice(source.index,1);
      newListIds.splice(destination.index,0,draggableId);

      const newState = {
        ...data,
        listIds: newListIds,
      }
      setData(newState);
      return;
    }
    const sourceList = data.lists[source.droppableId];
    const destinationList = data.lists[destination.droppableId];
    const draggingCard = sourceList.cards.filter(
      (card) => card.id === draggableId
    )[0];
    if (source.droppableId === destination.droppableId) {
      sourceList.cards.splice(source.index, 1);
      destinationList.cards.splice(destination.index, 0, draggingCard);
      const newState = {
        ...data, lists: {
          ...data.lists, [sourceList.id]: destinationList
        }
      };
      setData(newState);
    } else {
      sourceList.cards.splice(source.index, 1);
      destinationList.cards.splice(destination.index, 0, draggingCard);
      const newState = {
        ...data, lists: {
          ...data.lists,
          [sourceList.id]: sourceList,
          [destinationList.id]: destinationList
        }
      };
      setData(newState);
    }

  }

  return (
    <StoreApi.Provider value={{ addNewCard, addNewList, updateListTitle }}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="app" type="list">
          {(provided) => (
            <div className={classes.root} ref={provided.innerRef}>
              {data.listIds.map((listId,index) => {
                const list = data.lists[listId];
                return (<List list={list} key={listId} index={index}/>)
              })}
              <InputContainer type="list" />
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </StoreApi.Provider>
  );
}

export default App;
