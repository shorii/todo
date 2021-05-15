import * as apiModels from './models/api';
import moment from 'moment';
import * as querystring from '@billjs/query-string';

type Method = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE' | 'HEAD' | 'DELETE';

interface Payload {
    method: Method;
    body?: string;
    headers?: { [field: string]: string };
}

const _fetch = async (method: Method, path: string, params: any = null, data: any = null) => {
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
        payload.headers = {
            'Content-Type': 'application/json',
        };
    }
    return fetch(url, payload);
};

export const fetchTodos = async (): Promise<apiModels.Todo[]> => {
    const resp = await _fetch('GET', '/todo');
    return resp.json();
};

export const addTodo = async (form: {
    title: string;
    delivery: moment.Moment;
    detail: string;
}): Promise<apiModels.Todo> => {
    const resp = await _fetch('POST', `/todo`, null, form);
    return resp.json();
};

export const deleteTodo = async (id: string): Promise<void> => {
    const resp = await _fetch('DELETE', `/todo/${id}`);
    return resp.json();
};
