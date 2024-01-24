function getDaysOfWeekForDate(
  inputDate: Date,
  startingDay: number = 1
): Date[] {
  const currentDate = new Date(inputDate);
  let currentDay = currentDate.getDay();
  if (currentDay === 0) currentDay = 7;
  const daysOfWeek = [];

  currentDate.setDate(currentDate.getDate() - currentDay + startingDay);

  for (let i = 0; i < 7; i++) {
    daysOfWeek.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return daysOfWeek;
}

function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Thêm số 0 đằng trước nếu cần
  const day = date.getDate().toString().padStart(2, "0"); // Thêm số 0 đằng trước nếu cần

  return `${year}-${month}-${day}`;
}
function getWeekStartEnd(date: Date): [Date, Date] {
  // Lấy số ngày trong tuần
  const daysInWeek = 7;

  // Lấy ngày bắt đầu của tuần
  const dayOfWeek = date.getDay();
  const weekStart = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() - (dayOfWeek - 1)
  );

  // Lấy ngày kết thúc của tuần
  const weekEnd = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() + (daysInWeek - (dayOfWeek - 1))
  );

  return [weekStart, weekEnd];
}

function getSpecificDayOfWeek(start: Date, end: Date, dayOfWeek: number): Date {
  // Lấy số ngày trong tuần
  const daysInWeek = 7;

  // Lấy ngày bắt đầu của tuần
  const weekStart = new Date(
    start.getFullYear(),
    start.getMonth(),
    start.getDate() - (start.getDay() - 1)
  );

  // Lấy số ngày kể từ ngày bắt đầu tuần đến ngày cần tìm
  const daysToTargetDay = (dayOfWeek + 1 - weekStart.getDay()) % daysInWeek;

  // Trả về ngày cần tìm
  return new Date(
    weekStart.getFullYear(),
    weekStart.getMonth(),
    weekStart.getDate() + daysToTargetDay
  );
}
export {
  getDaysOfWeekForDate,
  formatDate,
  getWeekStartEnd,
  getSpecificDayOfWeek,
};
