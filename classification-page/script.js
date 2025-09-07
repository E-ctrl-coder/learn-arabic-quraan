document.addEventListener("DOMContentLoaded", () => {
  const tooltip = document.getElementById("tooltip");

  document.querySelectorAll(".node").forEach(node => {
    node.addEventListener("mouseenter", e => {
      tooltip.textContent = node.dataset.key;
      tooltip.style.left = e.pageX + 10 + "px";
      tooltip.style.top = e.pageY + 10 + "px";
      tooltip.style.display = "block";
    });
    node.addEventListener("mouseleave", () => {
      tooltip.style.display = "none";
    });
  });

  // Draw connectors based on data-from / data-to
  document.querySelectorAll(".line").forEach(line => {
    const fromNode = document.querySelector(`.node[data-key="${line.dataset.from}"]`);
    const toNode = document.querySelector(`.node[data-key="${line.dataset.to}"]`);
    if (fromNode && toNode) {
      const fromRect = fromNode.getBoundingClientRect();
      const toRect = toNode.getBoundingClientRect();
      const parent = document.querySelector(".diagram").getBoundingClientRect();

      const x1 = fromRect.left + fromRect.width / 2 - parent.left;
      const y1 = fromRect.top + fromRect.height / 2 - parent.top;
      const x2 = toRect.left + toRect.width / 2 - parent.left;
      const y2 = toRect.top + toRect.height / 2 - parent.top;

      line.style.left = Math.min(x1, x2) + "px";
      line.style.top = Math.min(y1, y2) + "px";
      line.style.width = Math.abs(x1 - x2) + "px";
      line.style.height = "2px";
    }
  });
});
