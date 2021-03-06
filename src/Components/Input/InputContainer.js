import { useState } from "react";
import { alpha, Collapse, makeStyles, Paper, Typography } from "@material-ui/core";
import InputCard from "./InputCard";

const useStyle = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(1),
    },
    addCard: {
        padding: theme.spacing(1, 1, 1, 2),
        background: "#EBECF0",
        "&:hover": {
            background: alpha("#000", .25)
        }
    }
}))

export default function InputContainer({listId, type, boardId}) {

    const classes = useStyle();
    const [open, setOpen] = useState(false);
    return (
        <div className={classes.root}>
            <Collapse in={open}>
                <InputCard setOpen={setOpen} listId={listId} type={type} boardId={boardId}/>
            </Collapse>
            <Collapse in={!open}>
                <Paper className={classes.addCard} elevation={0} onClick={()=> setOpen(!open)}>
                    <Typography>{type === 'card' ? "+ Add a card" : "+ Add a list"} </Typography>
                </Paper>
            </Collapse>
        </div>
    )
}