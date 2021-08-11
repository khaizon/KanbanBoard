import { useContext } from "react";
import List from "../List/List";
import { Grid, makeStyles, } from "@material-ui/core"
import InputContainer from "../Input/InputContainer";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { BoardContext } from "../../contexts/BoardContext";



const useStyle = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1)
  }
}))

function Board({ board }) {

  const classes = useStyle();

  const { dispatch } = useContext(BoardContext);

  const handleOnDragEnd = (result) => {
    dispatch({type: "ON_DRAG_END", boardId: board.id, result})
  }

  return (
    <DragDropContext onDragEnd={handleOnDragEnd} >


      <Droppable droppableId="app" type="list">
        {(provided) => (
          <div ref={provided.innerRef} className={classes.root}>
            <Grid container spacing={1}>
              {board.listIds.map((listId, index) => {
                const list = board.lists[listId];
                return (
                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <List list={list} key={listId} index={index} boardId={board.id} />
                  </Grid>
                )
              })}
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <InputContainer type="list" boardId={board.id} />
              </Grid>
            </Grid>

          </div>
        )}
      </Droppable>

    </DragDropContext>
  );
}

export default Board;
