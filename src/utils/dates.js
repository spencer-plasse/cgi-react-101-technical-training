export function isDateWithinWeek(date){
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);

  return date >= weekAgo;
}