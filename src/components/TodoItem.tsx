import deleteIcon from "@/assets/delete_icon.svg";
import dragVerticalIcon from "@/assets/drag_vertical_icon.svg";
import editIcon from "@/assets/edit_icon.svg";
import Image from "next/image";
import { Draggable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import {
  deleteTodo,
  editableTodo,
  toggleTodo,
} from "../redux/features/todos/todoSlice";

interface Todo {
  todo: { id: number; text: string; completed: boolean };
}

const TodoItem = ({ todo }: Todo) => {
  const dispatch = useDispatch();

  // By toggling in the todo todo state field completed will be change
  const handleToggle = () => dispatch(toggleTodo(todo.id));

  // Remove todo from store
  const handleDelete = (todoId: number) => {
    dispatch(deleteTodo(todoId));
  };

  // Added editable todo in the state to set todo text in input for edit
  const handleEditableTodo = (todoId: number) => {
    dispatch(editableTodo(todoId));
  };
  return (
    <Draggable draggableId={todo.id.toString()} index={todo.id}>
      {(provided) => (
        <li
          data-testid={`todo-${todo.id}`}
          className="gap-x-1.5 border pl-0.5 pr-2 py-1 border-gray-200 bg-gray-100 rounded flex items-start justify-between"
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
        >
          <div className="flex items-center mt-1 gap-x-1">
            <Image
              src={dragVerticalIcon}
              alt="edit icon"
              width={16}
              height={16}
              className="cursor-pointer"
            />
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={handleToggle}
            />
          </div>

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
          {!todo?.completed && (
            <div className="flex items-center gap-x-2 mt-0.5">
              <Image
                src={editIcon}
                alt="edit icon"
                width={16}
                height={16}
                className="cursor-pointer"
                onClick={() => handleEditableTodo(todo.id)}
              />
              <Image
                src={deleteIcon}
                alt="delete icon"
                width={16}
                height={16}
                className="text-red-500 cursor-pointer"
                onClick={() => handleDelete(todo.id)}
              />
            </div>
          )}
        </li>
      )}
    </Draggable>
  );
};

export default TodoItem;
