import * as apiModels from './models/api';
import moment from 'moment';
import * as querystring from '@billjs/query-string';

type Method = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE' | 'HEAD' | 'DELETE';

interface Payload {
    method: Method;
    body?: string;
}

const _fetch = async (method: Method, path: string, params = {}, data = null) => {
    const base = `/api`;
    let url = `${base}${path}`;
    if (!!params) {
        const qs = querystring.stringify(params);
        url = `${url}?${qs}`;
    }
    let payload: Payload = {
        method: method,
    };
    if (!!data) {
        payload.body = JSON.stringify(data);
    }
    return fetch(url, {
        method: method,
    });
};

export const fetchTodos = async (): Promise<apiModels.Todo[]> => {
    const resp = await _fetch('GET', '/todo');
    return resp.json();
};

export const addTodo = async (): Promise<apiModels.Todo> => {
    console.log('adding');
    return {
        id: 'aaaaaa',
        user: 'user3',
        title: 'title3',
        delivery: moment(),
        detail: 'description3',
    };
};

export const deleteTodo = async (id: string): Promise<void> => {
    const resp = await _fetch('DELETE', `/todo/${id}`);
    return resp.json();
};
