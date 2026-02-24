import {JSX} from "react";

type Props = {
    todos: {id:string, todo:string}[],
    updateTodo: (id:string, newTodo:string) => void
    deleteTodo: (id:string) => void
};

export default function (props: Props): JSX.Element {

    const isTodosEmptyorIsNotExist = props.todos.length === 0||!props.todos;
  return (
      <ul>
          {
              isTodosEmptyorIsNotExist  ? <p>no todos</p> :
              props.todos.map(element =>
                  <li key={element.id}><span>{element.todo}
                      <button onClick={() => {
                          let changeTodo = "";
                          const newTodo = prompt("Nouveau todo", changeTodo);
                          if (newTodo) {
                              props.updateTodo(element.id, newTodo);
                          }
                      }}>update</button>
                      <button onClick={() => props.deleteTodo(element.id)}>delete</button></span>


                  </li>)}
      </ul>

  );
}