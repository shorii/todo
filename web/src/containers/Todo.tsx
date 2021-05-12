import * as React from 'react';
import { Todo } from '../components/organisms';
import { useTodo } from '../hooks/todo';

const Container: React.FC = (_) => {
    const todoService = useTodo();
    const handleDelete = async (id: string) => {
        await todoService.deleteTodo(id);
    };
    return (
        <React.Fragment>
            <Todo
                {...{
                    loading: todoService.loading,
                    todos: todoService.todos,
                    onDelete: handleDelete,
                }}
            />
        </React.Fragment>
    );
};

export default Container;
