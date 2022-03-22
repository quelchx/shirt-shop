/**
 * @param id takes in class id to target
 * @param before takes in class name before it changes
 * @param after takes in class name after click (hides menu)
 * */
export default function toggleMenu(id, before, after) {
  let menu = document.getElementById(id)
  if (menu.className === before) {
    menu.className = after
  } else {
    menu.className = before
  }
}
