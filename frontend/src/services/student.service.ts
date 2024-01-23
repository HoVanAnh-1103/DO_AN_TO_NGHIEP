import instance from "./instance";

const prefix = '/user/student'
const studentService = {

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
    getOne: async (classId: any) => {
        const res = await instance.get(prefix + '/' + classId);
        return res.data;
    },
   
}

export default studentService;