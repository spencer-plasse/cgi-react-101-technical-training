// Determines whether the provided date falls within the past week (7 days)
export function isDateWithinWeek(date){
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);

  return date >= weekAgo;
}