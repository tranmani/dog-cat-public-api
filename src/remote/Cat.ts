import AxiosClient from './AxiosClient';

const endpoint = 'https://api.thecatapi.com/v1/images/search?breed_id=';

export default {
    async getCat(id: number) {
        return await AxiosClient({
            method: 'get',
            url: `${endpoint}${id}`
        });
    }
};
