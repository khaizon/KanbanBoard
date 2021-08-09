import { Tab, InputBase, Grid } from "@material-ui/core";
import { useState } from "react";
import { makeStyles } from "@material-ui/core"
import { Edit, Delete } from "@material-ui/icons";
import storeApi from "../../utils/storeApi";
import { useContext } from "react";

const useStyle = makeStyles((theme) => ({
  editableTitleContainer: {
    borderRadius: '5px'
  },
  editableTitle: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: 'primary',
    verticalAlign: 'middle',
    alignSelf: "center"
  },
  input: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    paddingLeft: theme.spacing(1),
    fontColor: 'primary',
    '&:focus': {
      background: '#e3e3e3',
    },
    color: 'primary',
  },
  inputContainer: {
    width: '100px',
    marginTop: '5px',
  },
  editButton: {
    color: '#1f43c1',
    verticalAlign: 'middle'
  },
  deleteButton: {
    color: '#6b1f40',
    verticalAlign: 'middle'
  },

}));

export default function CustomTab({ label, index, boardId, setTab }) {
  const [open, setOpen] = useState();
  const [newTitle, setNewTitle] = useState(label);
  const classes = useStyle();

  const { updateBoardTitle } = useContext(storeApi);
  const handleOnChange = (e) => {
    updateBoardTitle(boardId, newTitle);
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
    <div alignSelf="center">

      {!open ?
        (<div className={classes.editableTitleContainer}>
          <Tab label={label} onClick={() => setTab(index)}
            className={classes.editableTitle}
          >{newTitle}
          </Tab>
          <Edit onClick={handleOnClick} className={classes.editButton} />
          <Delete className={classes.deleteButton} />
        </div>)
        :
        (<div className={classes.inputContainer}>
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