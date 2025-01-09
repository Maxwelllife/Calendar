export const generateCalendarDays = (currentDate: Date) => {
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    const daysInCurrentMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay();
    const lastDayOfPreviousMonth = new Date(currentYear, currentMonth, 0).getDate();

    const previousMonthDays = [];
    const currentMonthDays = [];
    const nextMonthDays = [];

    // Дні попереднього місяця
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
        const dayNumber = lastDayOfPreviousMonth - i;
        // Використовуємо саме Date.UTC - дозволяє уникнути зсуву через часову зону, створюючи дату без урахування місцевого часу.
        const date = new Date(Date.UTC(currentYear, currentMonth - 1, dayNumber));
        previousMonthDays.push({
            date: date.toISOString().split('T')[0],
            dayNumber,
            isFirstDay: false,
            isLastDay: dayNumber === lastDayOfPreviousMonth,
            isCurrentMonth: false,
            monthName: dayNumber === lastDayOfPreviousMonth
                ? date.toLocaleString('en-US', { month: 'short' })
                : undefined,
        });
    }

    // Дні поточного місяця
    for (let i = 1; i <= daysInCurrentMonth; i++) {
        const date = new Date(Date.UTC(currentYear, currentMonth, i));

        currentMonthDays.push({
            date: date.toISOString().split('T')[0],
            dayNumber: i,
            isFirstDay: i === 1,
            isLastDay: i === daysInCurrentMonth,
            isCurrentMonth: true,
            monthName:
                i === 1 || i === daysInCurrentMonth
                    ? date.toLocaleString('en-US', { month: 'short' })
                    : undefined,
        });
    }

    // Дні наступного місяця
    const totalDays = previousMonthDays.length + currentMonthDays.length;
    const remainingDays = totalDays % 7 === 0 ? 0 : 7 - (totalDays % 7);
    for (let i = 1; i <= remainingDays; i++) {
        const date = new Date(Date.UTC(currentYear, currentMonth + 1, i));

        nextMonthDays.push({
            date: date.toISOString().split('T')[0],
            dayNumber: i,
            isFirstDay: i === 1,
            isLastDay: false,
            isCurrentMonth: false,
            monthName: i === 1
                ? date.toLocaleString('en-US', { month: 'short' })
                : undefined,
        });
    }



    return  [...previousMonthDays, ...currentMonthDays, ...nextMonthDays];
};
