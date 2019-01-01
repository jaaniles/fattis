export const daysOfWeek = date => [...Array(7).keys()].map((x, i) => date.startOf('week').plus({ days: i }));
