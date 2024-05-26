import axios from 'axios';
import { fetchUtils } from 'react-admin';
import { stringify } from 'query-string';

const apiUrl = 'http://localhost:8000/admin';

const dataProvider = {

    getList: async (resource, params) => {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const filter = params.filter || {};
        const query = {
            sort: JSON.stringify([field, order]),
            range: JSON.stringify([(page - 1) * perPage, page * perPage]),
            filter: JSON.stringify(filter),
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;
        const response = await axios.get(url);
        const data = response.data.map(item => ({
            ...item,
            id: item.user_id || item.user_pref_id,
        }));
        return {
            data: data,
            total: parseInt(data.length, 10),
        };
    },
    getOne: async (resource, params) => {
        const response = await axios.get(`${apiUrl}/${resource}/${params.id}`);
        return {
            data: { ...response.data, id: response.data.user_pref_id || response.data.user_id },
        };
    },
    create: async (resource, params) => {
        const response = await axios.post(`${apiUrl}/${resource}`, params.data);
        return {
            data: { ...params.data, id: response.data.user_pref_id || response.data.user_id },
        };
    },
    update: async (resource, params) => {
        const response = await axios.put(`${apiUrl}/${resource}/${params.id}`, params.data);
        return {
            data: { ...response.data, id: response.data.user_pref_id || response.data.user_id },
        };
    },
    delete: async (resource, params) => {
        const response = await axios.delete(`${apiUrl}/${resource}/${params.id}`);
        return {
            data: { ...response.data, id: response.data.user_pref_id || response.data.user_id },
        };
    },
    deleteMany: async (resource, params) => {
        console.log(params.ids, resource);
        const response = await axios.delete(`${apiUrl}/${resource}Many`, { data: { ids: params.ids } });
        return response.data;
    },
};

export default dataProvider;
