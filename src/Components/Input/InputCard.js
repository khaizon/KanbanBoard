import { alpha, Button, IconButton, InputBase, makeStyles, Paper } from "@material-ui/core";
import { Clear } from "@material-ui/icons";
import { useContext, useState } from "react";
import storeApi from "../../utils/storeApi";

const useStyle = makeStyles((theme) => ({
	card: {
		margin: theme.spacing(0,1,1,1),
		paddingBottom: theme.spacing(4)
	},
	input: {
		margin: theme.spacing(1)
	},
	btnConfirm: {
		margin: theme.spacing(1),
		background: "#5AAC44",
		color: "#fff",
		"&:hover":{
			background: alpha("#5AAC44",0.25)
		}
	}
}))

export default function InputCard({setOpen, listId}) {
	
	const classes = useStyle();
	const [cardContent, setCardContent] = useState('');
	const {addNewCard} = useContext(storeApi);
	const handleOnChange = (e) => {
		setCardContent(e.target.value)
	};

	const handleBtnConfirm = () => {
		addNewCard(cardContent, listId);
		setCardContent('');
		setOpen(false);
	}

	const handleBlur = () => {
		setOpen(false);
		setCardContent('');
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
						value={cardContent}
						placeholder={"Enter card description"}
						onBlur={handleBlur}/>
				</Paper>
			</div>
			<div>
				<Button className={classes.btnConfirm} onClick={handleBtnConfirm}>Add Card</Button>
				<IconButton onClick={()=> setOpen(false)}>
					<Clear />
				</IconButton>
			</div>
		</div>
	)
}