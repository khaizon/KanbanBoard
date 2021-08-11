import { Typography, InputBase } from "@material-ui/core";
import { useState } from "react";
import { makeStyles } from "@material-ui/core"
import { Delete } from "@material-ui/icons";
import { BoardContext } from "../../contexts/BoardContext";
import { useContext } from "react";

const useStyle = makeStyles((theme) => ({
	editableTitleContainer: {
		margin: theme.spacing(1),
		padding: theme.spacing(1),
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
	deleteButton: {
		color: '#6b1f40',
		verticalAlign: 'middle',
	}
}));

export default function Title({ title, boardId, listId }) {
	const [open, setOpen] = useState();
	const [newTitle, setNewTitle] = useState(title);
	const classes = useStyle();
	const { dispatch } = useContext(BoardContext);
	const handleOnChange = (e) => {
		setNewTitle(e.target.value);
	}

	const handleOnBlur = () => {
		dispatch({ type: "UPDATE_LIST_TITLE", boardId, listId, title: newTitle });
		setOpen(false);
	}
	return (
		<div>

			{!open ?
				(<div className={classes.editableTitleContainer}>
					<Typography
						onClick={() => setOpen(!open)}
						className={classes.editableTitle}>{newTitle}
					</Typography>
					<Delete className={classes.deleteButton} onClick={
						() => dispatch(
							{ type: "DELETE_LIST", boardId, listId  }
						)} />
				</div>)
				:
				(<div>
					<InputBase
						autoFocus
						value={newTitle}
						inputProps={{
							className: classes.input,
						}}
						onBlur={handleOnBlur}
						onChange={handleOnChange}
					/>
				</div>)
			}
		</div>
	)
}