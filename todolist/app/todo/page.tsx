"use client";
import {JSX, useState} from "react";
import VisualizeTodos from "@/app/todo/visualizeTodos";

type Props = {};

export default function (props: Props): JSX.Element {
    const [todo, setTodo] = useState({id: crypto.randomUUID(), todo: ""});
    const [todos, setTodos] = useState<{ id: string, todo: string }[]>([]);
    const addTodo = () => {
        setTodos([...todos, todo]);
        setTodo({id: crypto.randomUUID(), todo: ""});
    }

    const updateTodos = (id: string, newTodo: string) => {
        setTodos(todos.map(todo => {
            if (todo.id === id) {
                return {...todo, todo: newTodo};
            }
            return todo;
        }));
    }
    const deleteTodo = (id: string) => {
        setTodos(todos.filter(todo => todo.id !== id));
    }
    return (
        <div>
            <h1>home</h1>
            <input value={todo.todo} type="text" placeholder="todo"
                   onChange={(event) =>
                       setTodo({...todo, todo: event.target.value})
                   }/>
            <button onClick={() => addTodo()}>add</button>
            <VisualizeTodos todos={todos} updateTodo={updateTodos} deleteTodo={deleteTodo}/>
        </div>
    );
}