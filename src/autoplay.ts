const flatDomAutoPlay = [...document.querySelectorAll("*")] as HTMLElement[];

for (const node of flatDomAutoPlay) {
  node.style.animationDuration = "0s"; // Anything that needs to happen, should happen right now
  node.style.transitionDuration = "0s"; // Anything that needs to happen, should happen right now
  node.style.transitionDelay = "0s"; // Anything that needs to happen, should happen right now
  node.style.animation = "none";
  node.style.transition = "none";

  // If video disable autoplay
  if (node instanceof HTMLVideoElement) {
    node.autoplay = false;
  }
}
