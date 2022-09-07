export function isDateWithinWeek(date){
  const today = new Date();
  const weekAgo = new Date(today - 7);

  return date >= weekAgo;
}