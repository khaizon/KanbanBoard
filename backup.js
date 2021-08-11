const classes = useStyles();
const [value, setValue] = useState(0);

const [data, setData] = useState(store);

const handleChange = (event, newValue) => {
  setValue(newValue);
};

// card functions -------------------------------
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

const deleteCard = (boardId, listId, cardId) => {

  const cards = data.boards[boardId].lists[listId].cards;

  const newCards = [];

  cards.map((card) => {
    if (card.id === cardId) {
      console.log('hi');
    } else {
      newCards.push(card)
    }
  })
  console.log(newCards);

  const newState = {
    ...data,
    boards: {
      ...data.boards,
      [boardId]: {
        ...data.boards[boardId],
        lists: {
          ...data.boards[boardId].lists,
          [listId]: {
            ...data.boards[boardId].lists[listId],
            cards: newCards
          },
        }
      }
    },
  }
  setData(newState);
}
// end of card functions -------------------------------

// list functions -------------------------------
const updateListTitle = (title, boardId, listId) => {
  const list = data.boards[boardId].lists[listId];
  list.title = title;

  const newState = {
    ...data,
    boards: {
      ...data.boards,
      [boardId]: {
        ...data.boards[boardId],
        lists: {
          ...data.boards[boardId].lists,
          [listId]: list
        }
      }
    }
  };

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

const deleteList = (boardId, listId) => {
  const lists = data.boards[boardId].lists;
  const listIds = data.boards[boardId].listIds

  const newLists = {};

  Object.keys(lists).map((id) => {
    if (id === listId) {
      console.log('hi');
    } else {
      newLists[id] = lists[id];
    }
  })
  console.log(newLists);

  const newState = {
    ...data,
    boards: {
      ...data.boards,
      [boardId]: {
        ...data.boards[boardId],
        lists: newLists,
        listIds: listIds.filter(id => id !== listId)
      }
    },
  }
  setData(newState);
}
// end of list functions -------------------------------

// board functions -------------------------------
const addNewBoard = () => {
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

const updateBoardTitle = (boardId, title) => {
  console.log(boardId, title)
  const board = data.boards[boardId];
  console.log(boardId);
  console.log(board);
  board.title = title;

  const newState = {
    ...data,
    boards: {
      ...data.boards,
      [boardId]: board
    }
  };

  setData(newState);
}
// board functions -------------------------------


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
  },
  tabs: {
    marginRight: '40px'
  }
}));

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

    const newdata = {
      ...data,
      boards: {
        ...data.boards,
        [data.boardIds[value]]: {
          ...data.boards[data.boardIds[value]],
          listIds: newListIds,
        }
      }
    }
    setdata(newdata);
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
    const newdata = {
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
    setdata(newdata);
  } else {
    sourceList.cards.splice(source.index, 1);
    destinationList.cards.splice(destination.index, 0, draggingCard);
    const newdata = {
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
    setdata(newdata);
  }

}