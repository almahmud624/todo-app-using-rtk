import { Draggable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { toggleTodo } from "../redux/features/todos/todoSlice";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const TodoItem = ({ todo }: { todo: Todo }) => {
  const dispatch = useDispatch();
  const handleToggle = () => dispatch(toggleTodo(todo.id));

  return (
    <Draggable draggableId={todo.id.toString()} index={todo.id}>
      {(provided) => (
        <li
          data-testid={`todo-${todo.id}`}
          className="gap-x-1.5 border px-2 py-1 border-gray-200 bg-gray-100 rounded flex items-start justify-between"
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
        >
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={handleToggle}
            className="mt-1.5"
          />

          <p className="flex flex-col overflow-hidden flex-1">
            <span
              className="flex-grow"
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
                overflowWrap: "break-word",
              }}
            >
              {todo.text}
            </span>
          </p>
        </li>
      )}
    </Draggable>
  );
};

export default TodoItem;
