import { Typography, InputBase } from "@material-ui/core";
import { useState } from "react";
import { makeStyles } from "@material-ui/core"
import { MoreHoriz } from "@material-ui/icons";
import storeApi from "../../utils/storeApi";
import { useContext } from "react";

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

export default function Title({ title, boardId, listId }) {
	const [open, setOpen] = useState();
	const [newTitle, setNewTitle] = useState(title);
	const classes = useStyle();
	const { updateListTitle } = useContext(storeApi);
	const handleOnChange = (e) => {
		setNewTitle(e.target.value);
	}

	const handleOnBlur = () => {
		updateListTitle(newTitle, boardId, listId);
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

					<MoreHoriz />
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