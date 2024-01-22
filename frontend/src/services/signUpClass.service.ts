import instance from "./instance";

const prefix = '/sign'
const signUpClassService = {
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
    findAllClassNotAsignet: async () => {
        const res = await instance.get(prefix + `/all-class-not-asignet`);
        return res.data;
    },

    findAllSingUpForPM: async ()=>{
        const res = await instance.get(prefix + `/all-class-for-pm`);
        return res.data;
    }
}

export default signUpClassService;