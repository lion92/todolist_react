"use client";
import { useEffect, useState } from "react";
import VisualizeTodos from "@/app/todo/visualizeTodos";

type Todo = {
    id: number;
    todo: string;
    check:boolean
};

export default function Page() {

    const [todo, setTodo] = useState("");
    const [todos, setTodos] = useState<Todo[]>([]);
    const [hello, setHello] = useState("");

    const loadTodos = async () => {
        const res = await fetch("/api/todos");
        const data = await res.json();
        setTodos(data);

    };

    const loadHello = async () => {
        const res = await fetch("/api/hello");
        const data = await res.json();
        setHello(data.message);
    };

    useEffect(() => {
        fetch("/api/todos")
            .then(res => res.json())
            .then(setTodos);

        fetch("/api/hello").then(res => res.json()).then(data => setHello(data.message));
    }, []);

    const addTodo = async () => {
        if (!todo.trim()) return;

        await fetch("/api/todos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ todo })
        });

        setTodo("");
        loadTodos();
    };

    const deleteTodo = async (id: string) => {
        await fetch("/api/todos", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id })
        });

        loadTodos();
    };

    const checkTodo = async (id: number, checked: boolean) => {
        await fetch("/api/todos", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, check: checked })
        });
        loadTodos();
    };

    const updateTodo = async (id: string, newTodo: string) => {
        await fetch("/api/todos", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id,
                todo: newTodo
            })
        });

        loadTodos();
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-start justify-center pt-20 px-4">
            <div className="w-full max-w-md">
                <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Todos</h1>

                <div className="flex gap-2 mb-6">
                    <input
                        value={todo}
                        onChange={e => setTodo(e.target.value)}
                        onKeyDown={e => e.key === "Enter" && addTodo()}
                        placeholder="Nouvelle tâche..."
                        className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                    />
                    <button
                        onClick={addTodo}
                        className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition cursor-pointer"
                    >
                        Ajouter
                    </button>
                </div>

                <VisualizeTodos
                    todos={todos}
                    deleteTodo={deleteTodo}
                    updateTodo={updateTodo}
                    checkTodo={checkTodo}
                />
            </div>
            <span>{hello}</span>
        </div>
    );
}