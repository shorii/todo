import * as React from 'react';
import { Todo } from '../components/organisms';
import { useTodo } from '../hooks/todo';

const Container: React.FC = (_) => {
    const todoService = useTodo();
    return (
        <React.Fragment>
            <Todo
                {...{
                    loading: todoService.loading,
                    todos: todoService.todos,
                }}
            />
        </React.Fragment>
    );
};

export default Container;
