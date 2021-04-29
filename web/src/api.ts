import * as apiModels from './models/api';
import moment from 'moment';

export const fetchTodos = async (): Promise<apiModels.Todo[]> => {
    return [
        {
            user: 'user',
            title: 'title',
            delivery: moment(),
            description: 'description',
        },
        {
            user: 'user2',
            title: 'title2',
            delivery: moment(),
            description: 'description2',
        },
    ];
};

export const addTodo = async (): Promise<apiModels.Todo> => {
    console.log('adding');
    return {
        user: 'user3',
        title: 'title3',
        delivery: moment(),
        description: 'description3',
    };
};

export const deleteTodo = async (id: number): Promise<void> => {
    console.log(`deleting ${id}`);
};
