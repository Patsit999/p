import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";
import { firebaseConfig } from "./firebase-config.js";

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const configured = !firebaseConfig.apiKey.startsWith("YOUR_");
export const FLOWERS = {
  lotus: { name: "Pink lotus", petal: "#ffb3cf", core: "#ffe08a" },
  marigold: { name: "Marigold", petal: "#ffc247", core: "#e07b24" },
  jasmine: { name: "Jasmine", petal: "#fff8ec", core: "#f6d56b" }
};

// One krathong drawing, reused on the river, in the maker and in the admin timeline.
export function krathongSVG(flower, candles) {
  const f = FLOWERS[flower] || FLOWERS.lotus, n = Math.min(3, Math.max(1, +candles || 2)), P = Math.PI * 2;
  const ring = (k, rx, ry, cy, fn) => [...Array(k).keys()].map(i => i / k * P).sort((a, b) => Math.sin(a) - Math.sin(b))
    .forEach(a => fn(100 + rx * Math.cos(a), cy + ry * Math.sin(a), a, Math.round(a / P * k)));
  let s = '<svg viewBox="0 0 200 150" class="krathong" aria-hidden="true"><ellipse cx="100" cy="124" rx="66" ry="16" fill="#e2c37d"/><ellipse cx="100" cy="117" rx="66" ry="16" fill="#f6e6b6"/>';
  ring(16, 54, 13, 106, (x, y, a, i) => s += `<ellipse cx="${x}" cy="${y}" rx="${10 + 9 * Math.abs(Math.cos(a))}" ry="8" fill="${i % 2 ? "#2f8a4c" : "#44a862"}"/>`);
  ring(11, 36, 9, 98, (x, y, a, i) => s += `<ellipse cx="${x}" cy="${y}" rx="${8 + 7 * Math.abs(Math.cos(a))}" ry="6" fill="${i % 2 ? "#6cc47e" : "#8fdb9a"}"/>`);
  ring(7, 34, 8, 92, (x, y) => {
    for (let k = 0; k < 6; k++) s += `<circle cx="${x + 6 * Math.cos(k * P / 6)}" cy="${y + 4.5 * Math.sin(k * P / 6)}" r="5.2" fill="${f.petal}"/>`;
    s += `<circle cx="${x}" cy="${y}" r="3" fill="${f.core}"/>`;
  });
  [[100], [86, 114], [74, 100, 126]][n - 1].forEach((x, i) => s += `<rect x="${x - 4}" y="62" width="8" height="32" rx="2" fill="#fff4d8"/><g class="flame" style="animation-delay:${i * .17}s"><ellipse cx="${x}" cy="52" rx="7" ry="11" fill="#ffb347" opacity=".45"/><ellipse cx="${x}" cy="54" rx="3.6" ry="7.5" fill="#fff0a0"/></g>`);
  return s + '<text x="100" y="138" text-anchor="middle" font-size="12" fill="#ff9fc1">♥</text></svg>';
}

// Night atmosphere: twinkling stars, rising lanterns, drifting petals.
export function sky() {
  const r = Math.random, S = document.querySelector("#sky"), R = document.querySelector(".river");
  const add = (p, c, css) => { const e = document.createElement("i"); e.className = c; e.style.cssText = css; p.append(e); };
  for (let i = 0; i < 70; i++) add(S, "star", `left:${r() * 100}%;top:${r() * 65}%;--s:${1 + r() * 2}px;--d:${2 + r() * 4}s`);
  for (let i = 0; i < 7; i++) add(S, "lantern", `left:${8 + r() * 84}%;font-size:${9 + r() * 8}px;--t:${16 + r() * 12}s;--dl:${-r() * 20}s`);
  for (let i = 0; i < 12; i++) add(R, "petal", `bottom:${r() * 80}%;--t:${18 + r() * 20}s;--dl:${-r() * 30}s`);
}
