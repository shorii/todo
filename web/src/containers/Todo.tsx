import * as React from 'react';
import { Todo } from '../components/organisms';
import { TodoAddDialog, TodoAddDialogRefProps } from '../components/organisms';
import { useTodo } from '../hooks/todo';
import * as viewModels from 'models/view';

const Container: React.FC = (_) => {
    const todoService = useTodo();
    const handleDelete = async (id: string) => {
        await todoService.deleteTodo(id);
    };

    const ref = React.useRef<TodoAddDialogRefProps>({ dialog: () => {} });
    const handleAdd = () => {
        if (!!ref.current) {
            ref.current.dialog(async (form: viewModels.TodoForm) => {
                await todoService.addTodo(form);
            });
        }
    };
    return (
        <React.Fragment>
            <Todo
                {...{
                    loading: todoService.loading,
                    todos: todoService.todos,
                    onDelete: handleDelete,
                    onAdd: handleAdd,
                }}
            />
            <TodoAddDialog ref={ref} />
        </React.Fragment>
    );
};

export default Container;
