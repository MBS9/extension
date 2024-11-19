const flatDom = [...document.querySelectorAll("*")] as HTMLElement[];

for (const node of flatDom) {
  // Remove all colors
  const style = getComputedStyle(node);

  if (style.marginTop === "") {
    node.style.marginTop = "6px";
  }

  node.style.wordSpacing = "2px";
}
