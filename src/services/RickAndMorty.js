import useHttp from '../hooks/http.hook';

const useRickAndMorty = () => {

    const { loading, request, error, clearError } = useHttp();

    // const {loading, error, request, clearError} = useHttp();

    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    // getResource = async (url) => {

    //     // _offset = 9;

    //     let res = await fetch(url);

    //     if (!res.ok) {
    //         throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    //     }

    //     return await res.json();
    // }

    const getCharacter = async (id) => {
        const res = await request(`https://rickandmortyapi.com/api/character/${id}`);
        return res;
    }

    // getAllCharacter = async () => {
    //     const res = await this.getResource(`https://rickandmortyapi.com/api/character/${this.arr}`);
    //     this.arr = this.arr.map(item => item + 9);
    //     return res;
    // }

    const getAllCharacter = async (offset = 1) => {
        const ids = Array.from({ length: 9 }, (_, i) => i + offset);
        const res = await request(`https://rickandmortyapi.com/api/character/${ids}`);
        return res;
    };

    const getAllCharacterComics = async (offset = 1) => {
        const ids = Array.from({ length: 8 }, (_, i) => i + offset);
        const res = await request(`https://rickandmortyapi.com/api/character/${ids}`);
        return res;
    };

    const getEpisodes = async (url) => {
        const res = await request(url);
        return res;
    }

    const getSearchCharacter = async (name) => {
        const res = await request(`https://rickandmortyapi.com/api/character/?name=${name}`);
        return res;
    }

    return {
        loading: loading,
        error: error,
        getAllCharacter: getAllCharacter,
        getAllCharacterComics: getAllCharacterComics,
        getCharacter: getCharacter,
        getSearchCharacter: getSearchCharacter,
        getEpisodes: getEpisodes,
        clearError: clearError
    }

    // getEpisodesInfo = as
}

export default useRickAndMorty;