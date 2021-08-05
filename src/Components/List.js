
import { CssBaseline, Paper } from "@material-ui/core"
import { makeStyles } from "@material-ui/core"
import Title from "./Title";

const useStyle = makeStyles((theme)=>  ({
    root: {
        width: '300px',
        backgroundColor: '#EBECF0',
        marginLeft: theme.spacing(1)
    }
}))


export default function List() {

    const classes = useStyle();
    return (
        <div > 
            <Paper className= {classes.root}>
                <CssBaseline />
                <Title/>
            </Paper>
        </div>
    )
}