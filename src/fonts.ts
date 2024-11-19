const flatDomFont = [...document.querySelectorAll("*")] as HTMLElement[];

for (const node of flatDomFont) {
  const style = getComputedStyle(node);
  node.style.fontFamily = "Times New Roman";
  node.style.textDecoration = "none";

  node.style.wordSpacing = "2px";

  if (parseInt(style.fontSize === "" ? "0" : style.fontSize) <= 12) {
    node.style.fontSize = "15px";
  }

  // For bullet points use arrow
  if (node instanceof HTMLUListElement || node instanceof HTMLOListElement) {
    node.style.listStyleImage = `url(${chrome.runtime.getURL("arrow.svg")})`;
  }
}
