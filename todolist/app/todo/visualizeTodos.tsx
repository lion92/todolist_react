import {JSX} from "react";

type Props = {
    todos: {id:string, todo:string}[]
};

export default function (props: Props): JSX.Element {

    const isTodosEmptyorIsNotExist = props.todos.length === 0||!props.todos;
  return (
      <ul>
          {
              isTodosEmptyorIsNotExist  ? <p>no todos</p> :
              props.todos.map(element => <li key={element.id}>{element.todo}</li>)}
      </ul>

  );
}