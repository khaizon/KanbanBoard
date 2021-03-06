const cards = [
  {
    id: 'card-1',
    content: 'Learning how to cook',
  },
  {
    id: 'card-2',
    content: 'Making sandwich',
  },
  {
    id: 'card-3',
    content: 'Taking the trash out',
  },
];

const data = {
  boards:{
    'board-1': {
      id: "board-1",
      title: "Project 1",
      lists: {
        'list-1': {
          id: 'list-1',
          title: 'Todo',
          cards,
        },
        'list-2': {
          id: 'list-2',
          title: 'Doing',
          cards: [],
        },
      },
      listIds: ['list-1', 'list-2'],
    }
  },
  boardIds: ['board-1']
  
};

export default data;
