/**
 * Created by easterCat on 2019/4/6.
 */

export function getLocal(name) {
  if (localStorage.getItem(name)) {
    return JSON.parse(localStorage.getItem(name));
  }
}
