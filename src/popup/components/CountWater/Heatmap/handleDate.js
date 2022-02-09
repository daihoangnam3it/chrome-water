const Weeks = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const Monts = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const isLeapYear = (year) => {
  return (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) || (year % 100 === 0 && year % 400 === 0);
};
const getFebDay = (year) => {
  return isLeapYear(year) ? 29 : 28;
};
const currentDate = new Date();
const datesInMonth = [31, getFebDay(currentDate.getFullYear()), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const getDate = () => {
  const currentDate = new Date();
  return currentDate.getDate().toString() + Monts[currentDate.getMonth()] + currentDate.getFullYear();
};
const theDate = {
  Weeks,
  Monts,
  datesInMonth,
  getDate,
};

export default theDate;
