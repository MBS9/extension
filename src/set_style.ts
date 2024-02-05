console.log("set_style.js is loaded!");

const flatDom = [...document.querySelectorAll("*")] as HTMLElement[];

for (const node of flatDom) {
  // Remove all colors
  const style = getComputedStyle(node);
  node.style.backgroundColor = "white";
  node.style.color = "black";
  node.style.borderColor = "";
  node.style.borderTopColor = "";
  node.style.borderRightColor = "";
  node.style.borderBottomColor = "";
  node.style.borderLeftColor = "";
  node.style.outlineColor = "";
  node.style.fill = "white";
  node.style.stroke = "white";
  node.style.animation = "none";

  // If video disable autoplay
  if (node instanceof HTMLVideoElement) {
    node.autoplay = false;
  }

  // remove any applied css classes
  /*
  while (node.classList.length > 0) {
    node.classList.remove(node.classList.item(0));
  }
  */
}
