import * as api from '../api';
import * as viewModels from 'models/view';
import * as React from 'react';

export const useTodo = () => {
    const [loading, setLoading] = React.useState(false);
    const [todos, setTodos] = React.useState([] as viewModels.Todo[]);

    const fetchTodos = async () => {
        try {
            const _todos = await api.fetchTodos();
            setTodos(_todos.map((x) => new viewModels.Todo(x)));
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        (async () => {
            await fetchTodos();
        })();
    }, []);

    const addTodo = async (form: viewModels.TodoForm): Promise<void> => {
        const _todo = await api.addTodo({
            title: form.title,
            delivery: form.delivery,
            detail: form.detail,
        });
        const todo =  new viewModels.Todo(_todo);
        setTodos(x => [...x, todo]);
    };

    const deleteTodo = async (id: string): Promise<void> => {
        await api.deleteTodo(id);
        const _todos = todos.filter((todo) => todo.id !== id);
        setTodos([..._todos]);
    };

    return {
        loading,
        todos,
        addTodo,
        deleteTodo,
    };
};
