export function checkseenstatus(statuses, userid) {
  for (let i = 0; i < statuses.length; i++) {
    let users = [];
    let seen;
    if (!(statuses[i].seen_by == null)) {
      seen = statuses[i].seen_by.split("+");
      for (let i = 0; i < seen.length; i++) {
        users.push(seen[i].split("user")[1]);
      }
    }
    console.log(statuses, users, "seen");
    let found = users.find((u) => u == userid);
    if (!found) {
      return false;
    }
  }
  return true;
}
