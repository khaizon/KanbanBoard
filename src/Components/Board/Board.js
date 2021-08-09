import { useContext } from "react";
import List from "../List/List";
import { makeStyles, } from "@material-ui/core"
import InputContainer from "../Input/InputContainer";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import storeApi from "../../utils/storeApi";



const useStyle = makeStyles((theme) => ({
  root: {
    display: 'flex',
  }
}))

function Board({board}) {

  const classes = useStyle();

  const {onDragEnd} = useContext(storeApi);

  return (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="app" type="list">
            {(provided) => (
              <div className={classes.root} ref={provided.innerRef}>
                {board.listIds.map((listId, index) => {
                  const list = board.lists[listId];
                  return (<List list={list} key={listId} index={index} boardId={board.id}/>)
                })}
                <InputContainer type="list" boardId={board.id}/>
              </div>
            )}
          </Droppable>
        </DragDropContext>
  );
}

export default Board;
