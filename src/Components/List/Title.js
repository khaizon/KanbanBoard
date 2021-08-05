import { Typography, InputBase } from "@material-ui/core";
import { useState } from "react";
import { makeStyles } from "@material-ui/core"
import { MoreHoriz } from "@material-ui/icons";

const useStyle = makeStyles((theme) => ({
    editableTitleContainer: {
        margin: theme.spacing(1),
        display: 'flex',
    },
    editableTitle: {
        flexGrow: 1,
        fontSize: '1.2rem',
        fontWeight: 'bold',
    },
    input: {
        fontSize: '1.2rem',
        fontWeight: 'bold',
        margin: theme.spacing(1),
        '&:focus': {
            background: '#ddd',
        },
    },
}));

export default function Title() {
    const [open, setOpen] = useState();
    const classes = useStyle();
    return (
        <div>

            {!open ?
                (<div className={classes.editableTitleContainer}>
                    <Typography
                        onClick={() => setOpen(!open)}
                        className={classes.editableTitle}>Todo
                    </Typography>

                    <MoreHoriz />
                </div>)
                :
                (<div>
                    <InputBase
                        autoFocus
                        value={"Todo"}
                        inputProps={{
                            className: classes.input,
                        }}
                        onBlur={() => setOpen(!open)}
                    />
                </div>)
            }
        </div>
    )
}