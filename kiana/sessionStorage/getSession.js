/**
 * Created by easterCat on 2019/4/6.
 */

export function getSession(name) {
  if (sessionStorage.getItem(name)) {
    return JSON.parse(sessionStorage.getItem(name));
  }
}
