/* =========================================================
   SCRIPT: builds each page from data.js.
   The site is one HTML page. The part of the URL after "#"
   decides which page is shown:
     #home        → home (contents page)
     #era-2000s   → an era page
     #quiz        → "Which era are you?" quiz
     #sources     → sources & acknowledgements
   ========================================================= */

const app = document.getElementById("app");
const yt = (q) => "https://www.youtube.com/results?search_query=" + encodeURIComponent(q);

/* ---------- HOME: like a magazine's contents page ---------- */
function renderHome() {
  const rows = ERA_ORDER.map((key, i) => {
    const e = ERAS[key];
    return `
      <a class="contents-row" href="#era-${key}" data-era="${key}">
        <span class="swatch-dot" aria-hidden="true"></span>
        <span class="contents-year">${key}</span>
        <span class="contents-text">
          <strong>${e.title}</strong>
          <span>${e.coverLine}</span>
        </span>
        <span class="contents-page">No. ${i + 1} →</span>
      </a>`;
  }).join("");

  return `
  <section class="home">
    <div class="title-frame">
      <p class="frame-top"><span>Vol. 01</span><span>A pop culture archive</span><span>2000 → now</span></p>
      <h1 class="masthead">The Time <span class="nowrap">Capsule<svg class="title-star" viewBox="0 0 100 100" aria-hidden="true"><polygon points="50,4 62,37 97,38 69,59 79,94 50,73 21,94 31,59 3,38 38,37" fill="url(#g-silver)" stroke="#9da2ac" stroke-width="2.5"/></svg></span></h1>
      <svg class="spark-dot sd1" viewBox="-10 -10 20 20" aria-hidden="true"><use href="#g-spark" fill="url(#g-silver)"/></svg>
      <svg class="spark-dot sd2" viewBox="-10 -10 20 20" aria-hidden="true"><use href="#g-spark" fill="#e3a6bc"/></svg>
      <svg class="spark-dot sd3" viewBox="-10 -10 20 20" aria-hidden="true"><use href="#g-spark" fill="#b9a6d9"/></svg>
    </div>
    <p class="lede">Go back in time and see what it was really like: the music, the clothes, the screens and the internet of three decades.</p>
    <div class="era-strip">
      ${ERA_ORDER.map((k) => `<a href="#era-${k}" data-era="${k}"><span class="strip-year">${k}</span><span class="strip-title">${ERAS[k].title}</span>${sticker(k)}</a>`).join("")}
    </div>
    <h2 class="section-label">In this issue</h2>
    <div class="contents">${rows}</div>
    <a class="quiz-teaser" href="#quiz">
      <span>Not sure where you belong?</span>
      <strong>Take the quiz: which era are you? →</strong>
    </a>
  </section>`;
}

/* ---------- STICKERS: little drawings for each era ---------- */
function sparks(list, fill) {
  return list.map(([x, y, s], i) => `<use class="twinkle" style="animation-delay:${i * 0.35}s" href="#g-spark" transform="translate(${x} ${y}) scale(${s})" fill="${fill}"/>`).join("");
}

function sticker(era) {
  if (era === "2000s") return `<svg class="sticker" viewBox="0 0 220 190" aria-hidden="true">
    ${sparks([[28, 40, 0.9], [192, 28, 1.1], [182, 150, 0.7], [36, 150, 1.2], [150, 96, 0.5], [16, 96, 0.5], [205, 92, 0.6]], "url(#g-silver)")}
    ${sparks([[60, 18, 0.45], [170, 178, 0.45]], "#ffffff")}
    <g transform="translate(82 14) rotate(-14)">
      <rect x="0" y="0" width="64" height="70" rx="12" fill="url(#g-pinkphone)" stroke="#7a3550" stroke-width="2.5"/>
      <rect x="9" y="9" width="46" height="40" rx="4" fill="#e6f0f2" stroke="#7a3550" stroke-width="1.5"/>
      <text x="32" y="34" text-anchor="middle" font-size="10" font-family="monospace" fill="#7a3550">xoxo ♥</text>
      <rect x="3" y="70" width="58" height="7" rx="3.5" fill="url(#g-silver)" stroke="#7a3550" stroke-width="1.5"/>
      <rect x="0" y="77" width="64" height="74" rx="12" fill="url(#g-pinkphone)" stroke="#7a3550" stroke-width="2.5"/>
      ${[0, 1, 2, 3].map((r) => [0, 1, 2].map((c) => `<rect x="${10 + c * 16}" y="${100 + r * 11}" width="12" height="7" rx="3" fill="url(#g-silver)"/>`).join("")).join("")}
      <rect x="22" y="85" width="20" height="9" rx="4.5" fill="url(#g-silver)"/>
    </g>
    <polygon transform="translate(150 118) scale(.36)" points="50,4 62,37 97,38 69,59 79,94 50,73 21,94 31,59 3,38 38,37" fill="url(#g-silver)" stroke="#9da2ac" stroke-width="3"/>
  </svg>`;
  if (era === "2010s") return `<svg class="sticker" viewBox="0 0 220 190" aria-hidden="true">
    ${sparks([[24, 30, 0.8], [200, 24, 0.9], [196, 168, 0.7], [18, 170, 0.6], [110, 178, 0.5]], "#ffffff")}
    <g transform="translate(46 12) rotate(9)">
      <rect x="0" y="6" width="62" height="48" rx="22" fill="url(#g-lens)" stroke="#2f2244" stroke-width="3"/>
      <rect x="76" y="6" width="62" height="48" rx="22" fill="url(#g-lens)" stroke="#2f2244" stroke-width="3"/>
      <path d="M62 22 Q69 12 76 22" fill="none" stroke="#2f2244" stroke-width="3.5"/>
      <path d="M0 18 L-14 12 M138 18 L152 12" stroke="#2f2244" stroke-width="3.5" stroke-linecap="round"/>
      <path d="M14 18 L30 40 M90 18 L106 40" stroke="#ffffff" stroke-opacity=".45" stroke-width="4" stroke-linecap="round"/>
    </g>
    <g transform="translate(28 92) rotate(-8)">
      <rect x="0" y="10" width="124" height="76" rx="12" fill="url(#g-cam)" stroke="#2f2244" stroke-width="2.5"/>
      <rect x="84" y="2" width="22" height="10" rx="3" fill="#2f2244"/>
      <rect x="12" y="20" width="22" height="12" rx="3" fill="#efe8f8" stroke="#2f2244" stroke-width="1.5"/>
      <circle cx="68" cy="50" r="27" fill="url(#g-silver)" stroke="#2f2244" stroke-width="2.5"/>
      <circle cx="68" cy="50" r="17" fill="#241a3a"/>
      <circle cx="61" cy="43" r="5" fill="#ffffff" fill-opacity=".7"/>
      <circle cx="108" cy="26" r="4" fill="#efe8f8"/>
    </g>
  </svg>`;
  return `<svg class="sticker" viewBox="0 0 220 190" aria-hidden="true">
    ${sparks([[196, 28, 0.7], [22, 172, 0.6], [200, 170, 0.5]], "#cfe3f5")}
    <g transform="translate(16 34)">
      <rect width="92" height="30" rx="15" fill="#cfe3f5" opacity=".95"/>
      <circle cx="16" cy="15" r="8" fill="#2f55c4"/>
      <rect x="30" y="9" width="48" height="5" rx="2.5" fill="#1b2d6b"/>
      <rect x="30" y="18" width="32" height="4" rx="2" fill="#6f87c4"/>
    </g>
    <g transform="translate(96 14) rotate(8)">
      <rect width="76" height="152" rx="16" fill="#0b1229" stroke="#cfe3f5" stroke-width="2"/>
      <rect x="6" y="6" width="64" height="140" rx="11" fill="url(#g-screen)"/>
      <rect x="26" y="12" width="24" height="7" rx="3.5" fill="#0b1229"/>
      <path d="M30 70 L50 82 L30 94 Z" fill="#ffffff" fill-opacity=".9"/>
      <rect x="14" y="122" width="48" height="4" rx="2" fill="#ffffff" fill-opacity=".6"/>
      <rect x="14" y="122" width="20" height="4" rx="2" fill="#ffffff"/>
    </g>
    <g transform="translate(176 104)">
      <circle r="18" fill="#2f55c4" stroke="#cfe3f5" stroke-width="2"/>
      <path d="M0 7 C-10 -1 -8 -10 -2 -8 C0 -7 0 -6 0 -5 C0 -6 0 -7 2 -8 C8 -10 10 -1 0 7Z" fill="#ffffff"/>
    </g>
    <g fill="#cfe3f5">
      <rect x="30" y="120" width="10" height="10"/><rect x="42" y="120" width="10" height="10" fill="#2f55c4"/>
      <rect x="42" y="132" width="10" height="10"/><rect x="54" y="132" width="10" height="10" opacity=".5"/>
      <rect x="30" y="144" width="10" height="10" fill="#2f55c4" opacity=".7"/>
    </g>
  </svg>`;
}

/* ---------- ERA PAGE: one template used for every era ---------- */
function renderEra(key) {
  const e = ERAS[key];
  const i = ERA_ORDER.indexOf(key);
  const prev = ERA_ORDER[i - 1];
  const next = ERA_ORDER[i + 1];

  const music = e.music.map((m, n) => `
    <li class="artist">
      <span class="num">${String(n + 1).padStart(2, "0")}</span>
      <div class="artist-main">
        <h3>${m.artist} <span class="from">${m.from}</span></h3>
        <p class="note">${m.note}</p>
      </div>
      <p class="hits">${m.hits.join('<span class="sep"> · </span>')}</p>
      <a class="listen" href="${yt(m.artist + " " + m.hits[0])}" target="_blank" rel="noopener">Listen ↗</a>
    </li>`).join("");

  // Each fashion trend is a button: clicking it opens the detail panel
  const fashion = e.fashion.map((f, n) => `
    <button class="look" data-kind="fashion" data-n="${n}" aria-haspopup="dialog">
      <span class="pic">${f.img ? `<img src="${f.img}" alt="${f.name}" loading="lazy">` : swatch(f.swatch)}</span>
      <span class="look-text"><strong>${f.name}</strong><span>${f.text}</span><em>See examples →</em></span>
    </button>`).join("");

  const screen = e.screen.map((s) => `
    <li class="row">
      <span class="row-year">${s.year}</span>
      <div><h3><a href="${s.link}" target="_blank" rel="noopener">${s.title} ↗</a></h3><p>${s.type}. ${s.text}</p></div>
    </li>`).join("");

  // Each internet moment is a button too, with a small picture of what it looked like
  const internet = e.internet.map((t, n) => `
    <button class="look tech" data-kind="internet" data-n="${n}" aria-haspopup="dialog">
      <span class="pic">${mock(t.mock)}</span>
      <span class="look-text"><span class="look-year">${t.year}</span><strong>${t.title}</strong><span>${t.text}</span><em>Open →</em></span>
    </button>`).join("");

  return `
  <section class="era-hero">
    <div class="era-hero-inner">
      <div>
        <p class="kicker">Capsule ${i + 1} of ${ERA_ORDER.length} · ${e.years}</p>
        <h1 class="era-year">${key}</h1>
        <p class="era-title">${e.title}: ${e.tagline}</p>
        <p class="lede">${e.intro}</p>
        <nav class="jump" aria-label="Sections">
          <button data-target="music">Music</button>
          <button data-target="fashion">Fashion</button>
          <button data-target="internet">Internet & tech</button>
          <button data-target="screen">Movies & TV</button>
        </nav>
      </div>
      <div class="hero-art">${sticker(key)}</div>
    </div>
  </section>

  <section class="block" id="music">
    <h2 class="section-label">Music · The artists and their hits</h2>
    <ol class="artists">${music}</ol>
  </section>

  <section class="block" id="fashion">
    <h2 class="section-label">Fashion · What everyone was wearing. Click a trend to see examples</h2>
    <div class="looks">${fashion}</div>
  </section>

  <section class="block" id="internet">
    <h2 class="section-label">Internet & tech · What everyone was doing online. Click to open</h2>
    <div class="looks techs">${internet}</div>
  </section>

  <section class="block" id="screen">
    <h2 class="section-label">Movies & TV</h2>
    <ul class="rows split">${screen}</ul>
  </section>

  <nav class="era-nav" aria-label="Other eras">
    ${prev ? `<a href="#era-${prev}">← The ${prev}</a>` : `<a href="#home">← Contents</a>`}
    ${next ? `<a href="#era-${next}">The ${next} →</a>` : `<a href="#quiz">Which era are you? →</a>`}
  </nav>`;
}

/* ---------- FASHION SWATCHES: fabric-style pictures drawn with code ---------- */
function swatch(type) {
  if (type === "zebra") {
    // wavy black stripes on off-white, drawn as SVG
    let stripes = "";
    for (let n = 0; n < 14; n++) {
      const y = n * 26 - 40, w = 7 + (n % 3) * 4;
      const top = [], bottom = [];
      for (let x = -40; x <= 300; x += 10) {
        top.push(`${x},${(y + 10 * Math.sin(x / 38 + n)).toFixed(1)}`);
        bottom.unshift(`${x},${(y + w + 6 * Math.sin(x / 30 + n * 1.7)).toFixed(1)}`);
      }
      stripes += `<polygon points="${top.join(" ")} ${bottom.join(" ")}" fill="#231c18"/>`;
    }
    return `<svg viewBox="0 0 240 240" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Zebra print">
      <rect width="240" height="240" fill="#efe9df"/><g transform="rotate(-18 120 120)">${stripes}</g></svg>`;
  }
  return `<div class="swatch sw-${type}" role="img" aria-label="${type} fabric"></div>`;
}


/* ---------- INTERNET PICTURES: little drawings of phones, apps and screens ---------- */
const TONES = { brown: "#8a6a52", cream: "#d8c6aa", green: "#8fa07a", warm: "#d39a6f", pink: "#e3a6bc",
  blue: "#8eaac4", lilac: "#b5a6d6", grey: "#9b948d", dark: "#3a332e", yellow: "#f2e27a" };

function mock(m) {
  if (m.type === "flip") return `<span class="mock"><svg class="m-svg" viewBox="0 0 120 230" aria-hidden="true">
      <rect x="18" y="4" width="84" height="104" rx="12" fill="#c9c2cf" stroke="#3a2c22" stroke-width="2"/>
      <rect x="28" y="16" width="64" height="72" rx="4" fill="#cfe0d6" stroke="#3a2c22" stroke-width="1.5"/>
      <text x="60" y="44" text-anchor="middle" font-size="8" font-family="monospace" fill="#2b2b2b">${m.screen[0]}</text>
      <text x="60" y="58" text-anchor="middle" font-size="7" font-family="monospace" fill="#2b2b2b">${m.screen[1]}</text>
      <rect x="22" y="112" width="76" height="6" rx="3" fill="#8b8390"/>
      <rect x="18" y="122" width="84" height="104" rx="12" fill="#d6cfdb" stroke="#3a2c22" stroke-width="2"/>
      ${[0,1,2,3].map(r=>[0,1,2].map(c=>`<rect x="${30+c*22}" y="${150+r*17}" width="16" height="11" rx="4" fill="#efeaf2" stroke="#3a2c22" stroke-width="1"/>`).join("")).join("")}
      <rect x="44" y="130" width="32" height="12" rx="6" fill="#efeaf2" stroke="#3a2c22" stroke-width="1"/>
    </svg></span>`;
  if (m.type === "ipod") return `<span class="mock"><svg class="m-svg" viewBox="0 0 120 200" aria-hidden="true">
      <rect x="10" y="4" width="100" height="192" rx="14" fill="#f7f5f2" stroke="#3a2c22" stroke-width="2"/>
      <rect x="22" y="16" width="76" height="62" rx="3" fill="#dfe6ee" stroke="#3a2c22" stroke-width="1.5"/>
      <rect x="22" y="16" width="76" height="12" fill="#b9c6d6"/>
      ${m.screen.map((t,i)=>`<text x="28" y="${25+i*16}" font-size="7.5" font-family="sans-serif" fill="#22304a">${t}</text>`).join("")}
      <circle cx="60" cy="136" r="38" fill="#ece8e3" stroke="#3a2c22" stroke-width="1.5"/>
      <circle cx="60" cy="136" r="14" fill="#f7f5f2" stroke="#3a2c22" stroke-width="1.5"/>
      <text x="60" y="110" text-anchor="middle" font-size="7" fill="#8a7766" font-family="sans-serif">MENU</text>
    </svg></span>`;
  if (m.type === "chat") return `<span class="mock"><span class="m-window m-${m.style}">
      <span class="m-bar">${m.title}</span>
      ${m.lines.map((l) => l.sys ? `<span class="m-line m-sys">${l.sys}</span>`
        : `<span class="m-line"><b>${l.who}</b> ${l.text}</span>`).join("")}
    </span></span>`;
  if (m.type === "grid") return `<span class="mock"><span class="m-gridwrap">
      <span class="m-gridtitle">${m.title}</span>
      <span class="m-grid ${m.filter ? "m-filter" : ""}" style="--cols:${m.cols}">
        ${m.tiles.map(([label, tone]) => `<span class="m-tile" style="background:${TONES[tone]}">${label}</span>`).join("")}
      </span></span></span>`;
  if (m.type === "feed") return `<span class="mock"><span class="m-feed m-${m.style}">
      <span class="m-bar">${m.title}</span>
      ${m.posts.map((p) => `<span class="m-post"><b>${p.name}</b> ${p.text}</span>`).join("")}
    </span></span>`;
  if (m.type === "phone") return `<span class="mock"><span class="m-phone" style="--tone:${TONES[m.tone]}">
      <span class="m-top">${m.top}</span>
      <span class="m-main">${m.main}</span>
      <span class="m-lines">${m.lines.map((l) => `<span>${l}</span>`).join("")}</span>
    </span></span>`;
  if (m.type === "video") return `<span class="mock"><span class="m-video ${m.square ? "m-square" : ""}">
      <span class="m-play"></span>
      <span class="m-vbar"><span>${m.title}</span><span>${m.time}</span></span>
    </span></span>`;
  if (m.type === "wordle") return `<span class="mock"><span class="m-wordle">
      ${m.rows.map((r) => [...r].map((c) => `<span class="w-${c}"></span>`).join("")).join("")}
    </span></span>`;
  if (m.type === "split") return `<span class="mock"><span class="m-split">
      ${[m.left, m.right].map(([label, c1, c2]) => `<span style="background:linear-gradient(180deg, ${c1} 0 22%, ${c2} 22% 30%, ${c1} 30% 52%, ${c2} 52% 60%, ${c1} 60%)"><em>${label}</em></span>`).join("")}
    </span></span>`;
  if (m.type === "bereal") return `<span class="mock"><span class="m-phone m-bereal" style="--tone:${TONES.warm}">
      <span class="m-inset"></span>
      <span class="m-top">BeReal.</span>
      <span class="m-main">Time to BeReal.</span>
      <span class="m-lines"><span>2:00 left to post</span></span>
    </span></span>`;
  return "";
}

/* ---------- DETAIL PANEL: opens when you click a trend ---------- */
const panel = document.createElement("div");
panel.className = "panel";
panel.hidden = true;
panel.innerHTML = `<div class="panel-box" role="dialog" aria-modal="true" aria-labelledby="panel-title"></div>`;
document.body.appendChild(panel);
let panelEra = null, panelKind = "fashion", panelIndex = 0, lastFocus = null;

function openPanel(eraKey, kind, n) {
  panelEra = eraKey; panelKind = kind; panelIndex = n;
  const list = ERAS[eraKey][kind];
  const it = list[n];
  let picture, body, link;
  if (kind === "fashion") {
    const photos = it.photos && it.photos.length ? it.photos : it.img ? [it.img] : [];
    picture = photos.length ? `<img src="${photos[0]}" alt="${it.name}">` : swatch(it.swatch);
    const gallery = photos.length > 1
      ? `<div class="gallery">${photos.map((p, i) => `<img src="${p}" alt="${it.name}, example ${i + 1}" loading="lazy">`).join("")}</div>` : "";
    body = `<h3>Key pieces</h3><ul class="pieces">${it.pieces.map((p) => `<li>${p}</li>`).join("")}</ul>${gallery}`;
    link = `<a class="examples" href="https://www.pinterest.com/search/pins/?q=${encodeURIComponent(it.search)}" target="_blank" rel="noopener">See real examples on Pinterest ↗</a>`;
  } else {
    picture = mock(it.mock);
    body = `<h3>What was popular</h3><ul class="pieces">${it.popular.map((p) => `<li>${p}</li>`).join("")}</ul>`;
    const url = it.see.site === "pinterest"
      ? "https://www.pinterest.com/search/pins/?q=" + encodeURIComponent(it.see.q)
      : yt(it.see.q);
    link = `<a class="examples" href="${url}" target="_blank" rel="noopener">See it on ${it.see.site === "pinterest" ? "Pinterest" : "YouTube"} ↗</a>`;
  }
  const name = it.name || it.title;
  panel.querySelector(".panel-box").innerHTML = `
    <button class="panel-close" aria-label="Close">×</button>
    <div class="panel-pic">${picture}</div>
    <div class="panel-info">
      <p class="kicker">${eraKey} · ${kind === "fashion" ? "Fashion" : "Internet & tech" + (it.year !== eraKey ? " · " + it.year : "")} · ${n + 1} of ${list.length}</p>
      <h2 id="panel-title">${name}</h2>
      <p>${it.details}</p>
      ${body}
      ${link}
      <div class="panel-nav">
        <button data-step="-1">← Previous</button>
        <button data-step="1">Next →</button>
      </div>
    </div>`;
  if (panel.hidden) lastFocus = document.activeElement;
  panel.hidden = false;
  document.body.classList.add("no-scroll");
  panel.querySelector(".panel-close").focus();
}

function closePanel() {
  panel.hidden = true;
  document.body.classList.remove("no-scroll");
  if (lastFocus) lastFocus.focus();
}

function stepPanel(d) {
  const len = ERAS[panelEra][panelKind].length;
  openPanel(panelEra, panelKind, (panelIndex + d + len) % len);
}

panel.addEventListener("click", (ev) => {
  if (ev.target === panel || ev.target.closest(".panel-close")) closePanel();
  const step = ev.target.closest("[data-step]");
  if (step) stepPanel(Number(step.dataset.step));
});
document.addEventListener("keydown", (ev) => {
  if (panel.hidden) return;
  if (ev.key === "Escape") closePanel();
  if (ev.key === "ArrowRight") stepPanel(1);
  if (ev.key === "ArrowLeft") stepPanel(-1);
});

/* ---------- QUIZ ---------- */
function renderQuiz() {
  return `
  <section class="narrow quiz">
    <p class="kicker">Quiz · ${QUIZ.length} questions</p>
    <h1 class="page-title">Which era are you?</h1>
    <div id="quiz-box"></div>
  </section>`;
}

/* Outfit drawings for the outfit question (flat-lay style, drawn with SVG) */
function outfit(era) {
  if (era === "2000s") return `<svg viewBox="0 0 160 200" aria-hidden="true">
    <path d="M44 22 L62 12 Q80 22 98 12 L116 22 L130 40 L116 47 L112 40 L112 70 L48 70 L48 40 L44 47 L30 40 Z" fill="#f5b3cc" stroke="#7a3550" stroke-width="2"/>
    ${[[66, 38], [72, 44], [80, 48], [88, 44], [94, 38], [80, 34]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2" fill="#fff"/>`).join("")}
    <rect x="46" y="78" width="68" height="8" rx="2" fill="url(#g-silver)" stroke="#8b8f99"/>
    ${[56, 66, 76, 86, 96, 106].map((x) => `<circle cx="${x}" cy="82" r="1.6" fill="#fff"/>`).join("")}
    <path d="M48 88 L112 88 L110 112 L104 150 L124 194 L86 194 L88 150 L80 116 L72 150 L74 194 L36 194 L56 150 L50 112 Z" fill="#5b7fae" stroke="#2f4466" stroke-width="2"/>
    <path d="M80 92 L80 116" stroke="#2f4466" stroke-width="1.5"/>
    <g transform="translate(138 24) rotate(20)"><ellipse cx="-6" cy="-3" rx="7" ry="5" fill="#cdb8e8"/><ellipse cx="6" cy="-3" rx="7" ry="5" fill="#cdb8e8"/><ellipse cx="-4" cy="5" rx="4" ry="3" fill="#f5b3cc"/><ellipse cx="4" cy="5" rx="4" ry="3" fill="#f5b3cc"/><rect x="-1" y="-8" width="2" height="16" fill="#7a3550"/></g>
  </svg>`;
  if (era === "2010s") return `<svg viewBox="0 0 160 200" aria-hidden="true">
    <defs><pattern id="p-plaid" width="16" height="16" patternUnits="userSpaceOnUse">
      <rect width="16" height="16" fill="#8b3a3a"/><rect width="16" height="6" fill="#2b1f1f" opacity=".45"/>
      <rect width="6" height="16" fill="#2b1f1f" opacity=".45"/><rect y="10" width="16" height="1.5" fill="#f0e2c8" opacity=".4"/>
    </pattern></defs>
    <path d="M42 18 L64 10 L80 22 L96 10 L118 18 L134 52 L118 58 L114 48 L114 84 L46 84 L46 48 L42 58 L26 52 Z" fill="url(#p-plaid)" stroke="#2b1f1f" stroke-width="2"/>
    <path d="M64 10 L80 30 L96 10" fill="none" stroke="#2b1f1f" stroke-width="2"/>
    <path d="M80 30 L80 84" stroke="#2b1f1f" stroke-width="1.5"/>
    <path d="M56 90 L104 90 L102 120 L96 176 L84 176 L82 124 L78 124 L76 176 L64 176 L58 120 Z" fill="#2b2827" stroke="#111" stroke-width="2"/>
    <g fill="#f4efe6" stroke="#2b2827" stroke-width="1.5">
      <path d="M52 178 L72 178 L74 196 L48 196 Q46 186 52 178Z"/><path d="M88 178 L108 178 Q114 186 112 196 L86 196 Z"/>
    </g>
    <path d="M48 196 L74 196 M86 196 L112 196" stroke="#2b2827" stroke-width="3"/>
    <path d="M128 18 Q140 30 152 18" fill="none" stroke="#1e1b1a" stroke-width="3" stroke-dasharray="2 1.5"/>
  </svg>`;
  return `<svg viewBox="0 0 160 200" aria-hidden="true">
    <defs><pattern id="p-zebra" width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(-20)">
      <rect width="14" height="14" fill="#f1ece3"/><path d="M0 3 Q7 0 14 4 L14 7 Q7 3 0 6Z" fill="#1f1a17"/><path d="M0 10 Q7 8 14 11 L14 13 Q7 10 0 12Z" fill="#1f1a17"/>
    </pattern></defs>
    <path d="M48 20 L66 12 Q80 20 94 12 L112 20 L124 36 L112 42 L110 36 L110 68 L50 68 L50 36 L48 42 L36 36 Z" fill="#f4efe6" stroke="#6a5e52" stroke-width="2"/>
    <path d="M44 76 L116 76 L120 110 L126 182 L86 182 L82 118 L78 118 L74 182 L34 182 L40 110 Z" fill="#a9bfd6" stroke="#4f6886" stroke-width="2"/>
    <path d="M80 80 L80 118" stroke="#4f6886" stroke-width="1.5"/>
    <g fill="#fafafa" stroke="#6a5e52" stroke-width="1.5">
      <path d="M30 182 L76 182 L78 192 Q78 198 70 198 L30 198 Q24 198 26 190 Z"/><path d="M84 182 L130 182 L134 190 Q136 198 130 198 L90 198 Q82 198 82 192 Z"/>
    </g>
    <path d="M26 194 L78 194 M82 194 L134 194" stroke="#b9b2a8" stroke-width="3"/>
    <path d="M118 10 Q132 30 140 56" fill="none" stroke="#1f1a17" stroke-width="2"/>
    <rect x="124" y="54" width="32" height="26" rx="5" fill="url(#p-zebra)" stroke="#1f1a17" stroke-width="2"/>
  </svg>`;
}

function shuffle(list) {
  const out = list.slice();
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

function setupQuiz() {
  const box = document.getElementById("quiz-box");
  const answers = []; // the era chosen for each question
  let step = 0;

  function showQuestion() {
    const q = QUIZ[step];
    const options = shuffle(q.a);
    const visual = q.type === "outfit" || q.type === "accessory";
    const buttons = options.map((a) => visual
      ? `<button class="answer pic-answer" data-era="${a.era}">
           <span class="answer-pic">${q.type === "outfit" ? outfit(a.era) : sticker(a.era)}</span>
           <span>${a.t}</span>
         </button>`
      : `<button class="answer" data-era="${a.era}">${a.t}</button>`).join("");
    box.innerHTML = `
      <p class="progress">Question ${step + 1} of ${QUIZ.length}</p>
      <div class="bar"><span style="width:${(step / QUIZ.length) * 100}%"></span></div>
      <h2 class="question">${q.q}</h2>
      <div class="answers ${visual ? "answers-pics" : ""}">${buttons}</div>
      ${step > 0 ? `<button class="back" id="back">← Previous question</button>` : ""}`;
    box.querySelectorAll(".answer").forEach((btn) =>
      btn.addEventListener("click", () => {
        answers[step] = btn.dataset.era;
        step++;
        step < QUIZ.length ? showQuestion() : showResult();
      })
    );
    const back = document.getElementById("back");
    if (back) back.addEventListener("click", () => { step--; showQuestion(); });
  }

  function showResult() {
    const scores = { "2000s": 0, "2010s": 0, "2020s": 0 };
    answers.forEach((era) => scores[era]++);
    // The era with the most points wins (if there's a tie, the earliest era wins)
    const winner = ERA_ORDER.reduce((best, k) => (scores[k] > scores[best] ? k : best));
    const e = ERAS[winner];
    const tied = ERA_ORDER.filter((k) => scores[k] === scores[winner]);
    const tie = tied.length > 1 ? `<p class="tie">It's a tie between ${tied.join(" and ")}. You belong to more than one era!</p>` : "";
    const bars = ERA_ORDER.map((k) => {
      const pct = Math.round((scores[k] / QUIZ.length) * 100);
      return `<div class="mix-row" data-era="${k}"><span>${k}</span><span class="mix-bar"><span style="width:${pct}%"></span></span><span>${pct}%</span></div>`;
    }).join("");
    box.innerHTML = `
      <div class="result" data-era="${winner}">
        <p class="progress">Your era is</p>
        <p class="result-year">${winner}</p>
        <p class="era-title">${e.title}</p>
        ${tie}
        <p class="result-text">${QUIZ_RESULTS[winner]}</p>
        <div class="mix"><p class="progress">Your era mix</p>${bars}</div>
        <div class="result-actions">
          <a class="btn" href="#era-${winner}">Open the ${winner} capsule →</a>
          <button class="btn ghost" id="again">Take it again</button>
        </div>
      </div>`;
    document.getElementById("again").addEventListener("click", setupQuiz);
  }

  showQuestion();
}

/* ---------- SOURCES ---------- */
function renderSources() {
  return `
  <section class="narrow sources">
    <p class="kicker">The small print</p>
    <h1 class="page-title">Sources & acknowledgements</h1>

    <h2>About this project</h2>
    <p>The Time Capsule is my final project for Webs and Apps Design: an archive of pop culture from the 2000s, 2010s and 2020s, designed like a minimal magazine.</p>

    <h2>Images</h2>
    <ul>
      <li>The fashion pictures are fabric swatches drawn with CSS and SVG code.</li>
      <!-- When you add photos, list each one here, for example:
      <li>Zebra-print coat photo, by [photographer], from [website + link]</li> -->
    </ul>

    <h2>Music and video links</h2>
    <ul><li>Links open a search on <a href="https://www.youtube.com" target="_blank" rel="noopener">YouTube</a>. The site does not host any music or video.</li></ul>

    <h2>Fonts</h2>
    <ul><li>Instrument Serif and DM Sans, from <a href="https://fonts.google.com" target="_blank" rel="noopener">Google Fonts</a>.</li></ul>

    <h2>Tools and AI</h2>
    <ul>
      <li>Built with HTML, CSS and JavaScript.</li>
      <li>I used Claude (an AI assistant by Anthropic) to help write the code and draft the era content. I chose the concept and design direction, and I checked and edited the content myself.</li>
    </ul>

    <p class="disclaimer">All songs, films, shows and brands mentioned belong to their owners. This is a student project made for educational purposes.</p>
  </section>`;
}

/* ---------- ROUTER: shows the right page ---------- */
function route() {
  const parts = (location.hash || "#home").slice(1).split("-");
  let html;
  if (parts[0] === "era" && ERAS[parts[1]]) html = renderEra(parts[1]);
  else if (parts[0] === "quiz") html = renderQuiz();
  else if (parts[0] === "sources") html = renderSources();
  else html = renderHome();

  // The accent colour changes with the era (see style.css)
  document.body.dataset.era = parts[0] === "era" && ERAS[parts[1]] ? parts[1] : "home";
  app.innerHTML = html;
  if (parts[0] === "quiz") setupQuiz();

  // Section buttons scroll down to their section
  app.querySelectorAll(".jump button").forEach((b) =>
    b.addEventListener("click", () =>
      document.getElementById(b.dataset.target).scrollIntoView({ behavior: "smooth" })
    )
  );

  // Fashion trends and internet moments open the detail panel
  app.querySelectorAll(".look").forEach((b) =>
    b.addEventListener("click", () => openPanel(parts[1], b.dataset.kind, Number(b.dataset.n)))
  );
  if (!panel.hidden) closePanel();

  // Highlight the current page in the menu
  document.querySelectorAll(".topbar nav a").forEach((a) =>
    a.classList.toggle("active", a.getAttribute("href") === (location.hash || "#home"))
  );

  window.scrollTo(0, 0);
}

window.addEventListener("hashchange", route);
route();
