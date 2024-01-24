const daysInWeek = [
  "Chủ Nhật",
  "Thứ 2",
  "Thứ 3",
  "Thứ 4",
  "Thứ 5",
  "Thứ 6",
  "Thứ 7",
];
const cas = [
  { start: "07:00", end: "08:55", id: 1 },
  { start: "09:00", end: "10:55", id: 2 },
  { start: "13:00", end: "14:55", id: 3 },
  { start: "15:00", end: "16:55", id: 4 },
  { start: "17:00", end: "19:55", id: 5 },
  { start: "19:00", end: "20:55", id: 6 },
];
enum RoomTypeEnum {
  NORMAL = "NORMAL",
  "AIR_CON" = "NORMAL",
}

enum UserRoleEnum {
  TECHER = "GIAO_VIEN",
  PM = "QUAN_LY",
  STUDENT = "HOC_SINH",
}
enum SignUpStatus {
  APPROVED = "XAC_NHAN",
  REJECT = "HUY",
  PENDDING = "DANG_DOI",
}

export { daysInWeek, cas, RoomTypeEnum, UserRoleEnum, SignUpStatus };
