import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import CustomTab from './Components/Board/CustomTab';
import Typography from '@material-ui/core/Typography';
import StoreApi from './utils/storeApi';
import Box from '@material-ui/core/Box';
import { useState } from 'react';
import store from './utils/store';
import { v4 as uuid } from 'uuid';
import Board from './Components/Board/Board';
import { Button, InputBase } from '@material-ui/core';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={1}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexGrow: '1',
    backgroundColor: theme.palette.background.paper,
  }
}));

export default function App() {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [data, setData] = useState(store);


  const updateListTitle = (title, boardId, listId) => {
    const list = data.boards[boardId].lists[listId];
    list.title = title;

    const newState = {
      ...data.boards[boardId], lists: {
        ...data.boards[boardId].lists, [listId]: list
      }
    };

    setData(newState);
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const addNewCard = (content, boardId, listId) => {
    const newCardId = uuid();
    console.log(newCardId);
    const newCard = {
      id: newCardId,
      content
    };

    const list = data.boards[boardId].lists[listId];
    list.cards = [...list.cards, newCard]

    const newState = {
      ...data,
      boards: {
        ...data.boards,
        [boardId]: {
          ...data.boards[boardId],
          lists: {
            ...data.boards[boardId].lists,
            [listId]: list,
          }
        }
      },
    }
    setData(newState);
  }

  const addNewList = (title, boardId) => {
    const newListId = uuid();
    const newList = {
      id: newListId,
      title,
      cards: []
    };

    const newState = {
      boards: {
        ...data.boards,
        [boardId]: {
          ...data.boards[boardId],
          listIds: [...data.boards[boardId].listIds, newListId],
          lists: {
            ...data.boards[boardId].lists,
            [newListId]: newList
          }

        }
      },
      boardIds: [...data.boardIds]

    };

    setData(newState);
  }

  const handleOnClick = () => {
    const newBoardId = uuid();
    const newState = {
      boards: {
        ...data.boards,
        [newBoardId]: {
          id: newBoardId,
          title: "title",
          lists: {},
          listIds: [],
        },
      },
      boardIds: [
        ...data.boardIds,
        newBoardId
      ]
    };
    console.log(newState);
    setData(newState);
  }

  const updateBoardTitle = () => {

  }

  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;
    console.log("destination", destination, "source", source, "draggableId", draggableId);

    if (!destination) {
      return;
    }

    if (type === "list") {
      const newListIds = data.boards[data.boardIds[value]].listIds;
      newListIds.splice(source.index, 1);
      newListIds.splice(destination.index, 0, draggableId);

      const newState = {
        ...data,
        boards: {
          ...data.boards,
          [data.boardIds[value]]: {
            ...data.boards[data.boardIds[value]],
            listIds: newListIds,
          }
        }
      }
      setData(newState);
      return;
    }
    const sourceList = data.boards[data.boardIds[value]].lists[source.droppableId];
    const destinationList = data.boards[data.boardIds[value]].lists[destination.droppableId];
    const draggingCard = sourceList.cards.filter(
      (card) => card.id === draggableId
    )[0];
    if (source.droppableId === destination.droppableId) {
      sourceList.cards.splice(source.index, 1);
      destinationList.cards.splice(destination.index, 0, draggingCard);
      const newState = {
        ...data,
        boards: {
          ...data.boards,
          //board
          [data.boardIds[value]]: {
            ...data.boards[data.boardIds[value]],
            lists: {
              ...data.boards[data.boardIds[value]].lists,
              [sourceList.id]: destinationList
            }
          }
        }
      };
      setData(newState);
    } else {
      sourceList.cards.splice(source.index, 1);
      destinationList.cards.splice(destination.index, 0, draggingCard);
      const newState = {
        ...data,
        boards: {
          ...data.boards,
          //board
          [data.boardIds[value]]: {
            ...data.boards[data.boardIds[value]],
            lists: {
              ...data.boards[data.boardIds[value]].lists,
              [sourceList.id]: sourceList,
              [destinationList.id]: destinationList
            }
          }
        }
      };
      setData(newState);
    }

  }

  return (
    <StoreApi.Provider value={{ addNewCard, addNewList, updateListTitle, onDragEnd, updateBoardTitle }}>
      <div>
        <div className={classes.root}>

          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="simple tabs example" i
            ndicatorColor="primary"
            textColor="primary">
            {
              data.boardIds.map((boardId, index) => (
                <div>
                  <CustomTab label={data.boards[boardId].title} {...a11yProps(index)} setTab={setValue} index={index} />
                </div>
              ))
            }
          </Tabs>
          <Button variant="contained" color="primary" onClick={handleOnClick}>
            New Board
          </Button>
        </div>
        <div>

          {
            data.boardIds.map((boardId, index) => (
              <TabPanel value={value} index={index} >
                <Board board={data.boards[boardId]} />
              </TabPanel>
            ))
          }
        </div>
      </div>
    </StoreApi.Provider>
  );
}
