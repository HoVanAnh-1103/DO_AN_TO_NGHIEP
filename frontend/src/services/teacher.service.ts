import instance from "./instance";

const prefix = '/teacher'
const teacherService = {
    get: async () => {
        const res = await instance.get(prefix);
        return res.data;
    },
    post: async (data: any) => {
        const res = await instance.post(prefix, data)
        return res
    },
    delete: async (id: number) => {
        return instance.delete(prefix + '/' + id)
    },
    patch: async (data: any) => {
        return instance.patch(prefix + '/' + data.id, data)
    }
}

export default teacherService;