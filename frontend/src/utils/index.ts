function getDaysOfWeekForDate(inputDate: Date, startingDay: number = 1): Date[] {
    const currentDate = new Date(inputDate);
    let currentDay = currentDate.getDay();
    if (currentDay === 0) currentDay = 7
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
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Thêm số 0 đằng trước nếu cần
    const day = date.getDate().toString().padStart(2, '0'); // Thêm số 0 đằng trước nếu cần
  
    return `${year}-${month}-${day}`;
  }

export { getDaysOfWeekForDate, formatDate }