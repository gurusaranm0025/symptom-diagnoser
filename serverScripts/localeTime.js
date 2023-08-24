export default  function getCurrentLocalTime() {
  const currentDate = new Date();
  const localTimeString = currentDate.toLocaleString();
  return localTimeString;
}

// console.log(getCurrentLocalTime());
