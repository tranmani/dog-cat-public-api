import AxiosClient from "./AxiosClient";

const baseUrl = "https://api.thecatapi.com/v1/";
const imageEnpoint = "images/search?breed_id=";
const breedsEnpoint = "breeds";

export default {
  getCatPicture(id: any) {
    return AxiosClient({
      method: "get",
      url: `${baseUrl}${imageEnpoint}${id}`,
    });
  },
  async getCatBreedByName(q: string) {
    const catName = q.split(" ")[0];
    return await AxiosClient({
      method: "get",
      url: `${baseUrl}${breedsEnpoint}/search/?q=${catName}`,
    });
  },
  async getCatBreeds() {
    return await AxiosClient({
      method: "get",
      url: `${baseUrl}${breedsEnpoint}`,
    });
  },
};
