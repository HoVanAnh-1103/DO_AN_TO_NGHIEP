import instance from "./instance";

const prefix = '/room'
const roomService = {
    get: async () => {
        const res = await instance.get(prefix);
        return res.data;
    },
}

export default roomService;