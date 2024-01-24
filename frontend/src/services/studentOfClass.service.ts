import instance from "./instance";

const prefix = "/student-of-class";
const studentOfClassService = {
  get: async () => {
    const res = await instance.get(prefix);
    return res.data;
  },
  post: async (data: any) => {
    const res = await instance.post(prefix, data);
    return res;
  },
  delete: async (id: number) => {
    return instance.delete(prefix + "/" + id);
  },
  getAllStudenClassForPM: async () => {
    const res = await instance.get(prefix + "/getAllStudenClassForPM");
    return res.data;
  },

  approveRequest: async (userId: number, classId: number) => {
    return instance.patch(prefix + "/approveRequest", { userId, classId });
  },
  getMySchedule: async (data: any) => {
    const res = await instance.get(
      prefix + `/mySchedule?start=${data.start}&end=${data.end}`
    );
    return res.data;
  },
};

export default studentOfClassService;
