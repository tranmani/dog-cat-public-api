import AxiosClient from './AxiosClient';

const baseUrl = 'https://api.thedogapi.com/v1/';
const imageEnpoint = 'images/search?breed_id='
const breedsEnpoint = 'breeds'

export default {
    getDog(id: number) {
        return AxiosClient({
            method: 'get',
            url: `${baseUrl}${imageEnpoint}${id}`
        });
    },
    async getDogBreeds() {
        return await AxiosClient({
            method: 'get',
            url: `${baseUrl}${breedsEnpoint}`
        });
    }
};
