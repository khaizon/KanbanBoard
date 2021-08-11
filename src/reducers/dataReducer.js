import { v4 as uuid } from "uuid";



export const dataReducer = (state, action) => {

  switch (action.type) {
    case 'ADD_CARD':
      const newCardId = uuid();
      console.log(newCardId);
      const newCard = {
        id: newCardId,
        content: action.content
      };

      var list = state.boards[action.boardId].lists[action.listId];
      list.cards = [...list.cards, newCard]

      return {
        ...state,
        boards: {
          ...state.boards,
          [action.boardId]: {
            ...state.boards[action.boardId],
            lists: {
              ...state.boards[action.boardId].lists,
              [action.listId]: list,
            }
          }
        },
      };

    case 'DELETE_CARD':
      const cards = state.boards[action.boardId].lists[action.listId].cards;

      const newCards = [];

      cards.map((card) => {
        if (card.id === action.cardId) {
          console.log('hi');
        } else {
          newCards.push(card)
        }
      })
      console.log(newCards);

      return {
        ...state,
        boards: {
          ...state.boards,
          [action.boardId]: {
            ...state.boards[action.boardId],
            lists: {
              ...state.boards[action.boardId].lists,
              [action.listId]: {
                ...state.boards[action.boardId].lists[action.listId],
                cards: newCards
              },
            }
          }
        },
      };

    case 'ADD_LIST':

      const newListId = uuid();
      const newList = {
        id: newListId,
        title: action.title,
        cards: []
      };

      return {
        boards: {
          ...state.boards,
          [action.boardId]: {
            ...state.boards[action.boardId],
            listIds: [...state.boards[action.boardId].listIds, newListId],
            lists: {
              ...state.boards[action.boardId].lists,
              [newListId]: newList
            }

          }
        },
        boardIds: [...state.boardIds]

      };


    case 'UPDATE_LIST_TITLE':
      console.log(action.boardId)
      console.log(state.boards[action.boardId])
      var list = state.boards[action.boardId].lists[action.listId];
      list.title = action.title;

      return {
        ...state,
        boards: {
          ...state.boards,
          [action.boardId]: {
            ...state.boards[action.boardId],
            lists: {
              ...state.boards[action.boardId].lists,
              [action.listId]: list
            }
          }
        }
      };


    case 'DELETE_LIST':
      var lists = state.boards[action.boardId].lists;
      var listIds = state.boards[action.boardId].listIds

      const newLists = {};

      Object.keys(lists).map((id) => {
        if (id === action.listId) {
          console.log('hi');
        } else {
          newLists[id] = lists[id];
        }
      })
      console.log(newLists);

      return {
        ...state,
        boards: {
          ...state.boards,
          [action.boardId]: {
            ...state.boards[action.boardId],
            lists: newLists,
            listIds: listIds.filter(id => id !== action.listId)
          }
        },
      }

    case 'ADD_BOARD':
      const newBoardId = uuid();
      return {
        boards: {
          ...state.boards,
          [newBoardId]: {
            id: newBoardId,
            title: "title",
            lists: {},
            listIds: [],
          },
        },
        boardIds: [
          ...state.boardIds,
          newBoardId
        ]
      };

    case 'UPDATE_BOARD_TITLE':
      console.log(action.boardId);
      const board = state.boards[action.boardId];
      console.log(action.boardId);
      console.log(board);
      board.title = action.title;

      return {
        ...state,
        boards: {
          ...state.boards,
          [action.boardId]: board
        }
      };

    case 'ON_DRAG_END':

      const { destination, source, draggableId, type } = action.result;
      console.log("destination", destination, "source", source, "draggableId", draggableId);

      if (!destination) {
        return state;
      }

      if (type === "list") {
        const newListIds = state.boards[action.boardId].listIds;
        newListIds.splice(source.index, 1);
        newListIds.splice(destination.index, 0, draggableId);

        return {
          ...state,
          boards: {
            ...state.boards,
            [action.boardId]: {
              ...state.boards[action.boardId],
              listIds: newListIds,
            }
          }
        }

      }
      const sourceList = state.boards[action.boardId].lists[source.droppableId];
      const destinationList = state.boards[action.boardId].lists[destination.droppableId];
      const draggingCard = sourceList.cards.filter(
        (card) => card.id === draggableId
      )[0];
      if (source.droppableId === destination.droppableId) {
        sourceList.cards.splice(source.index, 1);
        destinationList.cards.splice(destination.index, 0, draggingCard);
        return {
          ...state,
          boards: {
            ...state.boards,
            //board
            [action.boardId]: {
              ...state.boards[action.boardId],
              lists: {
                ...state.boards[action.boardId].lists,
                [sourceList.id]: destinationList
              }
            }
          }
        };
      } else {
        sourceList.cards.splice(source.index, 1);
        destinationList.cards.splice(destination.index, 0, draggingCard);
        return  {
          ...state,
          boards: {
            ...state.boards,
            //board
            [action.boardId]: {
              ...state.boards[action.boardId],
              lists: {
                ...state.boards[action.boardId].lists,
                [sourceList.id]: sourceList,
                [destinationList.id]: destinationList
              }
            }
          }
        };
      }

    default:
      return state;


  }
}


