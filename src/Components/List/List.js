import { CssBaseline, Paper } from "@material-ui/core"
import { makeStyles } from "@material-ui/core"
import { Draggable, Droppable } from "react-beautiful-dnd";
import InputContainer from "../Input/InputContainer";

import Card from "./Card";
import Title from "./Title";

const useStyle = makeStyles((theme) => ({
	root: {
		backgroundColor: '#EBECF0',
		marginLeft: theme.spacing(1)
	},
	cardContainer: {
		marginTop: theme.spacing(4)
	}


}))


export default function List({ list, index, boardId }) {

	const classes = useStyle();
	return (
		<Draggable draggableId={list.id} index={index}>
			{(provided) => (
				<div ref={provided.innerRef} {...provided.draggableProps}>
					<Paper className={classes.root} {...provided.dragHandleProps}>
						<CssBaseline />
						<Title title={list.title} listId={list.id} boardId={boardId} />
						<Droppable droppableId={list.id} >
							{(provided) => (
								<div ref={provided.innerRef} {...provided.droppableProps} className={classes.cardContainer}>
									{list.cards.map((card, index) => (
										<Card key={card.id} card={card} index={index} boardId={boardId} listId={list.id} />
									))}
									{provided.placeholder}
								</div>
							)
							}
						</Droppable>
						<InputContainer listId={list.id} type="card" boardId={boardId} />
					</Paper>
				</div>
			)}
		</Draggable>
	)
}