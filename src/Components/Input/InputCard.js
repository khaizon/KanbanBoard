import { alpha, Button, IconButton, InputBase, makeStyles, Paper } from "@material-ui/core";
import { Clear } from "@material-ui/icons";
import { useContext, useState } from "react";
import storeApi from "../../utils/storeApi";

const useStyle = makeStyles((theme) => ({
	card: {
		margin: theme.spacing(0, 1, 1, 1),
		paddingBottom: theme.spacing(4)
	},
	input: {
		margin: theme.spacing(1)
	},
	btnConfirm: {
		margin: theme.spacing(1),
		background: "#5AAC44",
		color: "#fff",
		"&:hover": {
			background: alpha("#5AAC44", 0.25)
		}
	}
}))

export default function InputCard({ setOpen, listId, type, boardId }) {

	const classes = useStyle();
	const [Title, setTitle] = useState('');
	const { addNewCard, addNewList } = useContext(storeApi);
	const handleOnChange = (e) => {
		setTitle(e.target.value)
	};

	const handleBtnConfirm = () => {
		if (type === "card") {
			addNewCard(Title, boardId, listId);
			setTitle('');
			setOpen(false);
		} else {
			addNewList(Title, boardId);
			setTitle('');
			setOpen(false);
		}
	}



	return (
		<div>
			<div >
				<Paper className={classes.card}>
					<InputBase
						onChange={handleOnChange}
						multiline
						fullWidth
						inputProps={{
							className: classes.input
						}}
						value={Title}
						placeholder={type === "list" ? "Enter list title" : "Enter card description"}
						onBlur={() => setOpen(false)} />
				</Paper>
			</div>
			<div>
				<Button className={classes.btnConfirm} onMouseDown={handleBtnConfirm}>Add {type}</Button>
				<IconButton onClick={() => setOpen(false)}>
					<Clear />
				</IconButton>
			</div>
		</div>
	)
}