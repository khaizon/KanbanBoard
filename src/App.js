import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { useState } from 'react';
import store from './utils/store';
import { v4 as uuid } from 'uuid';
import Board from './Board';
import { Button } from '@material-ui/core';

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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [data, setData] = useState(store);

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

  return (
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
              <Tab label={data.boards[boardId].title} {...a11yProps(index)} />
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
  );
}
