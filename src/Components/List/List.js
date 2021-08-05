import { CssBaseline, Paper } from "@material-ui/core"
import { makeStyles } from "@material-ui/core"
import InputContainer from "../Input/InputContainer";

import Card from "./Card";
import Title from "./Title";

const useStyle = makeStyles((theme) => ({
    root: {
        width: '300px',
        backgroundColor: '#EBECF0',
        marginLeft: theme.spacing(1)
    }
}))


export default function List({list}) {

    const classes = useStyle();
    return (
        <div >
            <Paper className={classes.root}>
                <CssBaseline />
                <Title title={list.title}/>
                {list.cards.map((card)=>(
                    <Card key={card.id} card={card}/>
                ))}
                <InputContainer listId={list.id}/>
            </Paper>
        </div>
    )
}