import { alpha, Button, IconButton, InputBase, makeStyles, Paper } from "@material-ui/core";
import { Clear } from "@material-ui/icons";

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

export default function InputCard({setOpen}) {

	const classes = useStyle();

	return (
		<div>
			<div >
				<Paper className={classes.card}>
					<InputBase
						multiline
						fullWidth 
						inputProps={{
							className: classes.input
						}}
						placeholder={"Enter card description"}
						onBlur={()=> setOpen(false)}/>
				</Paper>
			</div>
			<div>
				<Button className={classes.btnConfirm} onClick={()=> setOpen(false)}>Add Card</Button>
				<IconButton onClick={()=> setOpen(false)}>
					<Clear />
				</IconButton>
			</div>
		</div>
	)
}