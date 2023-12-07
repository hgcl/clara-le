// Select DOM elements
const menuButton = document.querySelector("#menu-button");
const menu = document.querySelector("#menu");

export function setupNav() {
  // If JS is enabled:
  // 1) unhide #menu-button
  // 2) on mobile, make #menu-button visible and #menu hidden
  // 3) on desktop, make #menu-button hidden and #menu visible
  menuButton.classList.remove("hide");
  menuButton.classList.add("js-enabled");
  menu.classList.add("js-enabled");

  menuButton.addEventListener("click", () => {
    menu.classList.toggle("expanded"); // make visible when hidden, and vice-versa
  });
}
