"use client";
import { useState } from "react";

type Props = {
    todos: { id: number; todo: string; check: boolean }[];
    deleteTodo: (id: number) => void;
    updateTodo: (id: number, todo: string) => void;
    checkTodo: (id: number, checked: boolean) => void;
};

export default function VisualizeTodos({
                                           todos,
                                           deleteTodo,
                                           updateTodo,
                                           checkTodo
                                       }: Props) {

    const [editingId, setEditingId] = useState<number | null>(null);
    const [value, setValue] = useState("");

    return (
        <ul className="flex flex-col gap-2">
            {todos.map(t => (
                <li key={t.id} className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-4 py-3 shadow-sm">

                    {editingId === t.id ? (
                        <>
                            <input
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                onKeyDown={e => {
                                    if (e.key === "Enter") { updateTodo(t.id, value); setEditingId(null); }
                                    if (e.key === "Escape") setEditingId(null);
                                }}
                                autoFocus
                                className="flex-1 border border-blue-400 rounded px-2 py-1 text-sm outline-none focus:ring-2 focus:ring-blue-100"
                            />
                            <button
                                onClick={() => { updateTodo(t.id, value); setEditingId(null); }}
                                className="text-xs bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded transition cursor-pointer"
                            >
                                Sauver
                            </button>
                            <button
                                onClick={() => setEditingId(null)}
                                className="text-xs bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 rounded transition cursor-pointer"
                            >
                                Annuler
                            </button>
                        </>
                    ) : (
                        <>
                            <span className="flex-1 text-sm text-gray-700">{t.todo}</span>
                            <input
                                type="checkbox"
                                checked={t.check}
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                                onChange={(e) => checkTodo(t.id, e.target.checked)}
                            />
                            <button
                                onClick={() => {
                                    setEditingId(t.id);
                                    setValue(t.todo);
                                }}
                                className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 py-1 rounded transition cursor-pointer"
                            >
                                Éditer
                            </button>
                        </>
                    )}

                    <button
                        onClick={() => deleteTodo(t.id)}
                        className="text-xs bg-red-100 hover:bg-red-200 text-red-600 px-3 py-1 rounded transition cursor-pointer"
                    >
                        Supprimer
                    </button>

                </li>
            ))}
        </ul>
    );
}