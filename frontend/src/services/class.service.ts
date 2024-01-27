import instance from "./instance";

const prefix = '/class'
const classService = {

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
    approvedClassByTeacher: async (data: any)=>{
        const res = await instance.post(prefix+'/approvedClassByTeacher', data)
        return res
    }
}

export default classService;