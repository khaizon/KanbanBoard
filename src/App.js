import { useState } from "react";
import List from "./Components/List/List";
import store from "./utils/store"
import { v4 as uuid } from "uuid";
import StoreApi from "./utils/storeApi";

function App() {

  const [data, setData] = useState(store);

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
return (
  <StoreApi.Provider value={{ addNewCard }}>
    <div className="App">
      {data.listIds.map(listId => {
        const list = data.lists[listId];
        return (<List list={list} key={listId} />)
      })}
    </div>
  </StoreApi.Provider>
);
}

export default App;
