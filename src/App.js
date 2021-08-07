import { useState } from "react";
import List from "./Components/List/List";
import store from "./utils/store"
import { v4 as uuid } from "uuid";
import StoreApi from "./utils/storeApi";
import { makeStyles } from "@material-ui/core"
import InputContainer from "./Components/Input/InputContainer";


const useStyle = makeStyles((theme) => ({
  root: {
    display: 'flex',
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

  return (
    <StoreApi.Provider value={{ addNewCard, addNewList, updateListTitle }}>
      <div className={classes.root}>
        {data.listIds.map(listId => {
          const list = data.lists[listId];
          return (<List list={list} key={listId} />)
        })}
        <InputContainer type="list"/>
      </div>
    </StoreApi.Provider>
  );
}

export default App;
