export function getCurrentYear() {
  return new Date().getFullYear();
}

export function getCurrentMonth() {
  return new Date().getMonth() + 1;
}


export function getDaysInYear(year) {
  const isLeap = new Date(year, 2, 0).getDate() === 29;

  if(isLeap){
    return 366;
  } else {
    return 365;
  }
}