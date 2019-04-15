/**
 * Created by easterCat on 2019/4/13.
 */

export function removeSession(name) {
  if (name) {
    return sessionStorage.removeItem(name);
  }
}
