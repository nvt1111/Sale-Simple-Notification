const formatDate = time => {
  const milliseconds = time._seconds * 1000 + Math.round(time._nanoseconds / 1e6);
  const date = new Date(milliseconds);
  return date;
};

export default formatDate;
