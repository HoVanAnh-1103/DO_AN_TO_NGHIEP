import instance from "./instance";

const prefix = '/teacher'
const teacherService = {
    get: async () => {
        const res = await instance.get(prefix);
        return res.data;
    },
}

export default teacherService;