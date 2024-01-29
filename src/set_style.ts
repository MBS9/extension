console.log("set_style.js");

const flatDom = [...document.querySelectorAll("*")] as HTMLElement[];

for (const node of flatDom) {
  node.style.backgroundColor = "";
}
