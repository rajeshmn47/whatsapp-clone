const days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

import moment from "moment";
let value = "";
export function getDisplayDate(date, sc) {
  let today = new Date();
  let current = new Date(date);
  today.setHours(0);
  today.setMinutes(0);
  today.setSeconds(0);
  today.setMilliseconds(0);
  current.setHours(0);
  current.setMinutes(0);
  current.setSeconds(0);
  current.setMilliseconds(0); // month - 1 because January == 0
  let diff = today.getTime() - current.getTime(); // get the difference between today(at 00:00:00) and the date
  if (current.getTime() == today.getTime()) {
    if (sc) {
      return moment(date).format("HH:mm");
    } else {
      return "Today";
    }
  } else if (diff <= 24 * 60 * 60 * 1000) {
    return "Yesterday";
  } else if (
    today.getDate() - current.getDate() < 7 &&
    today.getMonth() == current.getMonth()
  ) {
    console.log(current.getDay() - 1, "day");
    return days[current.getDay() - 1]; // or format it what ever way you want
  } else {
    return moment(date).format("DD/MM/YYYY");
  }
}

export function sameDayorNot(a, b) {
  let first = new Date(a);
  let second = new Date(b);
  if (
    first.getDate() == second.getDate() &&
    first.getDay() == second.getDay()
  ) {
    return true;
  } else {
    console.log(first.getDate(), second.getDate(), "etdate");
    false;
  }
}

export function sortconversations(arr) {
  console.log(
    arr[0].newmessage[arr[0].newmessage.length - 1].created_at,
    "date"
  );
  arr.sort(
    (a, b) =>
      new Date(b.newmessage[b.newmessage.length - 1].created_at) -
      new Date(a.newmessage[a.newmessage.length - 1].created_at)
  );
  return arr;
}
