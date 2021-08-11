import { makeStyles, Paper, Grid } from "@material-ui/core";
import { Clear } from "@material-ui/icons";
import { useContext } from "react";
import { Draggable } from "react-beautiful-dnd";
import {BoardContext} from "../../utils/BoardContext";

const useStyle = makeStyles((theme) => ({
    card: {
        padding: theme.spacing(1, 1, 1, 2),
        margin: theme.spacing(1)
    },
    clear: {
        float: 'right'
    }
}))




export default function Card({ card, index, boardId, listId }) {

    const classes = useStyle();

    const { dispatch } = useContext(BoardContext);

    const handleOnClick = () => {
        dispatch({type: "DELETE_CARD", boardId, listId, cardId: card.id});
    }

    return (
        <Draggable draggableId={card.id} index={index}>
            {(provided) => (
                <div  ref={provided.innerRef}  >
                    <Paper className={classes.card} {...provided.draggableProps}{...provided.dragHandleProps}>
                        <Grid container alignContent="space-between">
                            <Grid item xs={11} >
                                {card.content}
                            </Grid>
                            <Grid item xs={1} >
                                <Clear className={classes.clear} color="primary" onClick={handleOnClick} />
                            </Grid>
                        </Grid>
                    </Paper>
                </div>
            )}
        </Draggable>
    )
}