export function formateDate(date) {
  const reg = /^[0-9,/:-\s]+$/;
  if(reg.test(date)) {
    const val = new Date(date);
    const y = val.getFullYear();
    const m = val.getMonth() + 1;
    const d = val.getDate();
    
    return `${y}-${m.toString().padStart(2, '0')}-${d}`
  } else {
    return date
  }
}