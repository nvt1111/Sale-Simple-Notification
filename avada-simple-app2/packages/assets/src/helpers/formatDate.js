export function formatDate(createdAt) {
  const date = new Date(createdAt._seconds * 1000 + createdAt._nanoseconds / 1000000).toString();

  let arrDay = [];
  arrDay = date.split(' ');
  return arrDay;
}
