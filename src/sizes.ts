const flatDomSizes = [...document.querySelectorAll("*")] as HTMLElement[];

for (const node of flatDomSizes) {
  // Remove all colors
  const style = getComputedStyle(node);

  if (parseInt(style.fontSize === "" ? "0" : style.fontSize) <= 12) {
    node.style.fontSize = "15px";
  }
}
