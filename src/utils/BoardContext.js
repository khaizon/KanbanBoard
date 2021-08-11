import { createContext, useEffect, useReducer } from "react";
import { dataReducer } from "../reducers/dataReducer";
import store from "../utils/store"

export const BoardContext = createContext();

const BoardContextProvider = (props) => {
  const [data, dispatch] = useReducer(dataReducer, store, () => {
    const localData = localStorage.getItem('data');
    return localData ? JSON.parse(localData) : store
  });

  useEffect(() => {
    localStorage.setItem('data', JSON.stringify(data))
  }, [data])

  return (
    <BoardContext.Provider value={{data, dispatch}}>
      { props.children}
    </BoardContext.Provider>
  )
}

export default BoardContextProvider;