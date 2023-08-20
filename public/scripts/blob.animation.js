const tween = new KUTE.fromTo(
  "#blob1",
  { path: "#blob1" },
  { path: "#blob3" },
  { repeat: 999, duration: 3000, yoyo: true }
).start();