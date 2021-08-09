import { makeStyles, Paper } from "@material-ui/core";
import { Clear } from "@material-ui/icons";
import { useContext } from "react";
import { Draggable } from "react-beautiful-dnd";
import storeApi from "../../utils/storeApi";

const useStyle = makeStyles((theme) => ({
    card: {
        padding: theme.spacing(1, 1, 1, 2),
        margin: theme.spacing(1),
        width: '280px'
    },
    clear: {
        float: 'right'
    }
}))




export default function Card({ card, index, boardId, listId }) {

    const classes = useStyle();

    const { deleteCard } = useContext(storeApi);

    const handleOnClick = () => {
        deleteCard(boardId, listId, card.id);
    }

    return (
        <Draggable draggableId={card.id} index={index}>
            {(provided) => (
                <div ref={provided.innerRef}   >
                    <Paper className={classes.card} {...provided.draggableProps}{...provided.dragHandleProps}>
                        {card.content}
                        <Clear className={classes.clear} color="primary" onClick={handleOnClick} />
                    </Paper>
                </div>
            )}
        </Draggable>
    )
}