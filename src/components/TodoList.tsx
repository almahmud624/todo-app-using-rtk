import { toggleTodo } from "@/redux/features/todos/todoSlice";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import TodoItem from "./TodoItem";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const TodoList = ({ todos }: { todos: Todo[] }) => {
  const dispatch = useDispatch();
  const createdTodos = todos.filter((todo) => !todo.completed);
  const completedTodos = todos.filter((todo) => todo.completed);
  const handleDragEnd = (result: any) => {
    const { destination, source, draggableId } = result;
    if (destination?.droppableId !== source?.droppableId) {
      dispatch(toggleTodo(Number(draggableId)));
    }
  };
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="flex md:flex-row flex-col md:justify-between gap-y-5 md:gap-x-1  divide-white rounded">
        <div className="w-full md:w-1/2 space-y-2">
          <h2 className="bg-gray-200 py-2 rounded text-center font-medium">
            Created Todos
          </h2>
          <Droppable droppableId="board-1">
            {(provided) => (
              <ul
                className="space-y-1.5"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {createdTodos.map((todo) => (
                  <TodoItem key={todo.id} todo={todo} />
                ))}
              </ul>
            )}
          </Droppable>
        </div>
        <div className="w-full md:w-1/2 space-y-2">
          <h2 className="bg-gray-200 py-2 rounded text-center font-medium">
            Completed Todos
          </h2>
          <Droppable droppableId="board-2">
            {(provided) => (
              <ul
                className="space-y-1.5"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {completedTodos.map((todo) => (
                  <TodoItem key={todo.id} todo={todo} />
                ))}
              </ul>
            )}
          </Droppable>
        </div>
      </div>
    </DragDropContext>
  );
};

export default TodoList;
