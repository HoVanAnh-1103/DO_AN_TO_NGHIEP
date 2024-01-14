import instance from "./instance";

const prefix = '/subject'
const subjectService = {
    get: async () => {
        const res = await instance.get(prefix);
        return res.data;
    },
}

export default subjectService;