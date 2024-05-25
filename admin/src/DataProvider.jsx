import { fetchUtils } from 'react-admin';
import axios from 'axios';

const apiUrl = 'http://localhost:8000/admin';

const DataProvider = {
    getList: async (resource, params) => {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;

        // Fetch all data from the backend
        const response = await axios.get(`${apiUrl}/${resource}`);
        const data = response.data.map(item => ({ ...item, id: item.user_id }));

        // Apply sorting
        const sortedData = data.sort((a, b) => {
            if (a[field] < b[field]) {
                return order === 'ASC' ? -1 : 1;
            }
            if (a[field] > b[field]) {
                return order === 'ASC' ? 1 : -1;
            }
            return 0;
        });

        // Apply pagination
        const paginatedData = sortedData.slice((page - 1) * perPage, page * perPage);

        return {
            data: paginatedData,
            total: data.length,
        };
    },
    getOne: async (resource, params) => {
        const response = await axios.get(`${apiUrl}/${resource}/${params.id}`);
        return {
            data: { ...response.data, id: response.data.user_id },
        };
    },
    getMany: async (resource, params) => {
        const response = await axios.get(`${apiUrl}/${resource}`);
        const data = response.data.map(item => ({ ...item, id: item.user_id }));
        const filteredData = data.filter(item => params.ids.includes(item.id));
        return {
            data: filteredData,
        };
    },
    getManyReference: async (resource, params) => {
        const response = await axios.get(`${apiUrl}/${resource}`);
        const data = response.data.map(item => ({ ...item, id: item.user_id }));
        const filteredData = data.filter(item => item[params.target] === params.id);
        const sortedData = filteredData.sort((a, b) => {
            if (a[params.sort.field] < b[params.sort.field]) {
                return params.sort.order === 'ASC' ? -1 : 1;
            }
            if (a[params.sort.field] > b[params.sort.field]) {
                return params.sort.order === 'ASC' ? 1 : -1;
            }
            return 0;
        });
        const paginatedData = sortedData.slice(
            (params.pagination.page - 1) * params.pagination.perPage,
            params.pagination.page * params.pagination.perPage
        );
        return {
            data: paginatedData,
            total: filteredData.length,
        };
    },
    update: async (resource, params) => {
        const response = await axios.put(`${apiUrl}/${resource}/${params.id}`, params.data);
        return {
            data: { ...response.data, id: response.data.user_id },
        };
    },
    updateMany: async (resource, params) => {
        const response = await axios.put(`${apiUrl}/${resource}`, { ids: params.ids, data: params.data });
        const data = response.data.map(item => ({ ...item, id: item.user_id }));
        return {
            data: data,
        };
    },
    create: async (resource, params) => {
        const response = await axios.post(`${apiUrl}/${resource}`, params.data);
        return {
            data: { ...params.data, id: response.data.user_id },
        };
    },
    delete: async (resource, params) => {
        const response = await axios.delete(`${apiUrl}/${resource}/${params.id}`);
        return {
            data: { ...response.data, id: response.data.user_id },
        };
    },
    deleteMany: async (resource, params) => {
        const response = await axios.delete(`${apiUrl}/${resource}`, { data: { ids: params.ids } });
        const data = response.data.map(item => ({ ...item, id: item.user_id }));
        return {
            data: data,
        };
    },
};

export default DataProvider;
