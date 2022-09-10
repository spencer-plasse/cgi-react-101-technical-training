// Determines whether the provided date falls within the past week (7 days)
export function isDateWithinWeek(date){
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);

  return date >= weekAgo;
}

// Calculates the number of months between two dates.
// Modified from Stack Overflow: https://stackoverflow.com/questions/2536379/difference-in-months-between-two-dates-in-javascript
export function monthDiff(earlier, later){
  let months = (later.getFullYear() - earlier.getFullYear()) * 12;
  months -= earlier.getMonth();
  months += later.getMonth();

  return months <= 0 ? 0 : months;
}