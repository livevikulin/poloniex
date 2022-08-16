import httpServices from "./http.services";

const baseURL = 'https://poloniex.com/public?command=returnTicker';

const tickersService = {
    fetch: async () => {
        const { data } = await httpServices.get(baseURL)
        return data;
    }
}

export default tickersService;