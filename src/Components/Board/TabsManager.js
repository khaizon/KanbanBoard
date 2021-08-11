import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import CustomTab from './CustomTab';
import Typography from '@material-ui/core/Typography';

import Box from '@material-ui/core/Box';
import { useContext, useState } from 'react';
import Board from './Board';
import { Button } from '@material-ui/core';
import { BoardContext } from '../../contexts/BoardContext';

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
  },
  button: {
    marginTop: '4px',
    marginRight: '4px',
    marginBottom: '4px',
    fontSize: '1rem',
		fontWeight: 'bold',
  }
}));

export default function TabsManger() {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const {data, dispatch} = useContext(BoardContext);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  return (
      <div>
        <div className={classes.root}>

          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="simple tabs example"
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable">
            {
              data.boardIds.map((boardId, index) => (
                <div className={classes.tabs}>
                  <CustomTab label={data.boards[boardId].title} {...a11yProps(index)} setTab={setValue} index={index} boardId={boardId} />
                </div>
              ))
            }
          </Tabs>
          <Button className={classes.button} variant="contained" color="primary" onClick={()=> dispatch({type: "ADD_BOARD"})}>
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
