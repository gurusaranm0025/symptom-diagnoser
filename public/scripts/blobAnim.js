const blob = new KUTE.fromTo(
  "#blob1",
  { path: "#blob1" },
  { path: "#blob2" },
  { repeat: 999999, duration: 3700, yoyo: true }
).start();

const outlineBlob = new KUTE.fromTo(
  "#outline-blob1",
  { path: "#outline-blob1" },
  { path: "#outline-blob2" },
  { repeat: 999999, duration: 4000, yoyo: true }
).start();
