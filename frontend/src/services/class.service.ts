import instance from "./instance";

const prefix = '/class'
const classService = {
    get: async () => {
        const res = await instance.get(prefix);
        return res.data;
    },
}

export default classService;