export function formatDate(date) {

  let arrDay = [];
  arrDay = date.split('T')[0].split('-');
  return arrDay;
}
