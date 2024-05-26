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
    }
};

export default dataProvider;
