import AxiosClient from './AxiosClient';

const baseUrl = 'https://api.thedogapi.com/v1/';
const imageEnpoint = 'images/search?breed_id='
const breedsEnpoint = 'breeds'

export default {
    getDogPicture(id: number) {
        return AxiosClient({
            method: 'get',
            url: `${baseUrl}${imageEnpoint}${id}`
        });
    },
    getDogBreedByName(q: string) {
        const dogName = q.split(' ')[0]
        return AxiosClient({
            method: 'get',
            url: `${baseUrl}${breedsEnpoint}/search/?q=${dogName}`
        });
    },
    async getDogBreeds() {
        return await AxiosClient({
            method: 'get',
            url: `${baseUrl}${breedsEnpoint}`
        });
    }
};
