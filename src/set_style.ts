const flatDom = [...document.querySelectorAll("*")] as HTMLElement[];

for (const node of flatDom) {
  // Remove all colors
  const style = getComputedStyle(node);
  node.style.backgroundColor = "#fcfcfc";
  node.style.color = "#404040";
  node.style.borderColor = "black";
  node.style.outlineColor = "";
  node.style.fill = "white";
  node.style.stroke = "white";
  node.style.animation = "none";
  node.style.textDecoration = "none";
  node.style.opacity = "1";
  node.style.animationDuration = "0s"; // Anything that needs to happen, should happen right now
  node.style.transitionDuration = "0s"; // Anything that needs to happen, should happen right now
  node.style.transitionDelay = "0s"; // Anything that needs to happen, should happen right now
  node.style.accentColor = "black";
  node.style.backgroundImage = "none";
  node.style.floodColor = "black";
  node.style.lightingColor = "white";
  node.style.marker = "none";
  node.style.mask = "none";
  node.style.maskImage = "none";
  node.style.maskClip = "none";
  node.style.maskOrigin = "none";
  node.style.maskComposite = "none";
  node.style.maskType = "none";
  node.style.maskSize = "auto";
  node.style.maskRepeat = "no-repeat";
  node.style.maskPosition = "0% 0%";
  node.style.borderColor = "black";
  node.style.columnRuleColor = "black";
  node.style.borderTopColor = "black";
  node.style.borderRightColor = "black";
  node.style.borderBottomColor = "black";
  node.style.borderLeftColor = "black";
  node.style.fontFamily = "Times New Roman";

  if (style.marginTop === "") {
    node.style.marginTop = "6px";
  }

  node.style.wordSpacing = "2px";

  if (parseInt(style.fontSize === "" ? "0" : style.fontSize) <= 12) {
    node.style.fontSize = "15px";
  }

  // For bullet points use arrow
  if (node instanceof HTMLUListElement || node instanceof HTMLOListElement) {
    node.style.listStyleImage = `url(${chrome.runtime.getURL("arrow.svg")})`;
  }

  if (node instanceof HTMLLinkElement) {
    node.style.color = "blue";
  }
  if (node instanceof HTMLButtonElement) {
    node.style.color = "blue";
  }

  // If video disable autoplay
  if (node instanceof HTMLVideoElement) {
    node.autoplay = false;
  }
}
