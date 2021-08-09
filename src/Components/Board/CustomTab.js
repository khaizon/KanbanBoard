import { Tab, InputBase } from "@material-ui/core";
import { useState } from "react";
import { makeStyles } from "@material-ui/core"
import { Edit } from "@material-ui/icons";
import storeApi from "../../utils/storeApi";
import { useContext } from "react";

const useStyle = makeStyles((theme) => ({
	editableTitleContainer: {
		margin: theme.spacing(1),
		display: 'flex',
    borderRadius: '2px',
    backgroundColor: 'grey'
	},
	editableTitle: {
		flexGrow: 1,
		fontSize: '1.2rem',
		fontWeight: 'bold',
    float: 'center',
	},
	input: {

		fontSize: '1.2rem',
		fontWeight: 'bold',
		'&:focus': {
			background: '#ddd',
		},
	},
}));

export default function CustomTab({label, index, boardId, setTab}) {
  const [open, setOpen] = useState();
	const [newTitle, setNewTitle] = useState(label);
	const classes = useStyle();

	const { updateBoardTitle } = useContext(storeApi);
	const handleOnChange = (e) => {
		setNewTitle(e.target.value);
	}

	const handleOnBlur = () => {
		updateBoardTitle(boardId, newTitle);
    setTab(index);
		setOpen(false);
	}

  const handleOnClick = () => {
    setTab(index);
		setOpen(true);
  }
	return (
		<div>

			{!open ?
				(<div className={classes.editableTitleContainer}>
					<Tab label={label} onClick={()=> setTab(index)}						
						className={classes.editableTitle}>{newTitle}
					</Tab>
          <Edit onClick={handleOnClick}/>
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