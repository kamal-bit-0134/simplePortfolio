const menu = document.querySelector("#menu"),
  links = document.querySelector("#links");
menu.addEventListener("click", () => {
  const open = links.classList.toggle("open");
  menu.setAttribute("aria-expanded", String(open));
});
links.addEventListener("click", (e) => {
  if (e.target.closest("a")) {
    links.classList.remove("open");
    menu.setAttribute("aria-expanded", "false");
  }
});
function progress() {
  const max = document.documentElement.scrollHeight - innerHeight;
  document.querySelector("#progress").style.width =
    (max > 0 ? (scrollY / max) * 100 : 0) + "%";
}
addEventListener("scroll", progress, { passive: true });
addEventListener("resize", progress);
progress();
if (
  "IntersectionObserver" in window &&
  !matchMedia("(prefers-reduced-motion: reduce)").matches
) {
  const observer = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("reveal");
          observer.unobserve(e.target);
        }
      }),
    { threshold: 0.12 },
  );
  document
    .querySelectorAll(".case,.grid article,.timeline article")
    .forEach((el) => observer.observe(el));
}
const pace = document.querySelector("#pace"),
  delay = document.querySelector("#delay"),
  run = document.querySelector("#run"),
  packets = document.querySelector("#packets"),
  status = document.querySelector("#status");
pace.addEventListener("input", () => (delay.value = pace.value));
function reset() {
  packets.replaceChildren(
    ...Array.from({ length: 5 }, (_, i) => {
      const el = document.createElement("span");
      el.className = "packet";
      el.textContent = i + 1;
      return el;
    }),
  );
}
reset();
run.addEventListener("click", async () => {
  run.disabled = true;
  pace.disabled = true;
  reset();
  const ms = Number(pace.value);
  for (let i = 0; i < 5; i++) {
    if (i) await new Promise((resolve) => setTimeout(resolve, ms));
    packets.children[i].classList.add("sent");
    window.setSimulationStatus("sent", i + 1);
  }
  window.setSimulationStatus("done");
  run.disabled = false;
  pace.disabled = false;
});
