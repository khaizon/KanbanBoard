import { useState } from "react";
import List from "./Components/List/List";
import { v4 as uuid } from "uuid";
import StoreApi from "./utils/storeApi";
import { makeStyles, } from "@material-ui/core"
import InputContainer from "./Components/Input/InputContainer";
import { DragDropContext, Droppable } from "react-beautiful-dnd";


const useStyle = makeStyles((theme) => ({
  root: {
    display: 'flex',
  }
}))

function Board({board}) {

  const [boardData, setBoardData] = useState(board);
  const classes = useStyle();
  const addNewCard = (content, listId) => {
    const newCardId = uuid();
    console.log(newCardId);
    const newCard = {
      id: newCardId,
      content
    };

    const list = boardData.lists[listId];
    list.cards = [...list.cards, newCard]

    const newState = {
      ...boardData,
      lists: {
        ...boardData.lists,
        [listId]: list,
      }
    }
    setBoardData(newState);
  }

  const addNewList = (title) => {
    const newListId = uuid();
    const newList = {
      id: newListId,
      title,
      cards: []
    };

    const newState = {
      listIds: [...boardData.listIds, newListId],
      lists: {
        ...boardData.lists,
        [newListId]: newList
      }
    };

    setBoardData(newState);
  }

  const updateListTitle = (title, listId) => {
    const list = boardData.lists[listId];
    list.title = title;

    const newState = {
      ...boardData, lists: {
        ...boardData.lists, [listId]: list
      }
    };

    setBoardData(newState);
  }

  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;
    console.log("destination", destination, "source", source, "draggableId", draggableId);

    if (!destination) {
      return;
    }

    if (type === "list") {
      const newListIds = boardData.listIds;
      newListIds.splice(source.index, 1);
      newListIds.splice(destination.index, 0, draggableId);

      const newState = {
        ...boardData,
        listIds: newListIds,
      }
      setBoardData(newState);
      return;
    }
    const sourceList = boardData.lists[source.droppableId];
    const destinationList = boardData.lists[destination.droppableId];
    const draggingCard = sourceList.cards.filter(
      (card) => card.id === draggableId
    )[0];
    if (source.droppableId === destination.droppableId) {
      sourceList.cards.splice(source.index, 1);
      destinationList.cards.splice(destination.index, 0, draggingCard);
      const newState = {
        ...boardData, lists: {
          ...boardData.lists, [sourceList.id]: destinationList
        }
      };
      setBoardData(newState);
    } else {
      sourceList.cards.splice(source.index, 1);
      destinationList.cards.splice(destination.index, 0, draggingCard);
      const newState = {
        ...boardData, lists: {
          ...boardData.lists,
          [sourceList.id]: sourceList,
          [destinationList.id]: destinationList
        }
      };
      setBoardData(newState);
    }

  }

  return (
    <StoreApi.Provider value={{ addNewCard, addNewList, updateListTitle }}>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="app" type="list">
            {(provided) => (
              <div className={classes.root} ref={provided.innerRef}>
                {boardData.listIds.map((listId, index) => {
                  const list = boardData.lists[listId];
                  return (<List list={list} key={listId} index={index} />)
                })}
                <InputContainer type="list" />
              </div>
            )}
          </Droppable>
        </DragDropContext>
    </StoreApi.Provider>
  );
}

export default Board;
