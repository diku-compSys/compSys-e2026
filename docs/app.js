"use strict";

const CONFIG = Object.freeze({
  owner: "diku-compSys",
  repo: "compSys-e2026",
  branch: "main",
  courseTitle: "Computer Systems",
  term: "E2026",
  institution: "DIKU",
  startYear: 2026,
  timeZone: "Europe/Copenhagen",
  snapshotDate: "2026-09-01"
});

const REPO_BASE = `https://github.com/${CONFIG.owner}/${CONFIG.repo}`;
const API_BASE = `https://api.github.com/repos/${CONFIG.owner}/${CONFIG.repo}`;
const RAW_BASE = `https://raw.githubusercontent.com/${CONFIG.owner}/${CONFIG.repo}/${CONFIG.branch}`;

const FALLBACK_LECTURE_PLAN = String.raw`| Week | Date   | Topic | Lecture  | Topic                                                                         | Material |
| ---- | ----   | ----- | -------  | ------                                                                        | -------- |
| 36   | 31 Aug | Intro | David    | Course introduction                                                           | COD 1.1-1.4,1.6-1.8 |
|      |        | Basic | David    | Computers and C programming                                                   | JG 1-3 |
|      | 02 Sep | Basic | David    | Assembly code and machine model                                               | COD 2.1-2.4,2.6-2.7, JG 4 |
| 37   | 07 Sep | Basic | David    | Computer arithmetic                                                           | COD 3.1-3.3, 3.5 |
|      | 09 Sep | Basic | David    | Functions and text                                                            | COD 2.8-2.9, JG 5-7 |
| 38   | 14 Sep | Basic | David    | C Programming - pointers and memory                                           | JG 8-9, 11 |
|      | 16 Sep | Basic | David    | C Programming - dynamic memory and cache                                      | JG 12-13, COD 5.1-5.4 |
| 39   | 21 Sep | Basic | David    | Intro to Operating systems - kernel, processes, system calls                  | OSTEP 2,4,5 |
|      | 23 Sep | OS    | David    | Process Scheduling                                                            | OSTEP 7,8,9,10 |
|      |        |       |          | Hand-in A0                                                                    |          |
| 40   | 28 Sep | OS    | David    | Virtual memory - hardware perspective                                         | COD 5.7-5.8 |
|      | 30 Sep | OS    | David    | Virtual memory - OS perspective                                               | OSTEP 13,17 |
| 41   | 05 Oct | OS    | David    | Concurrency I                                                                 | COD 6.1-6.2, 6.4-6.5 and OSTEP 27 |
|      | 07 Oct | OS    | David    | Concurrency II                                                                | OSTEP 29,30 |
| 42   |        |       |          | Fall Vacation - No lectures                                                   |          |
| 43   | 19 Oct | CN    | David    | Introduction to Computer Networks                                             | KR 1.1 - 1.6 (Optional read - [Internet history](https://www.internetsociety.org/internet/history-internet/brief-history-internet/)) |
|      | 21 Oct | CN    | David    | Network Programming                                                           | BOH 11.4 (Optional read - [Beej's Guide to Network Programming](http://beej.us/guide/bgnet/) and BOH 11.1-11.3, 11.6) |
|      |        |       |          | Hand-in A1 (OS)                                                               |          |
| 44   | 26 Oct | CN    | David    | Non-Blocking Servers and Introduction to Security                             | BOH 12.1-12.3, KR 8.1, 8.2  |
|      | 28 Oct | CN    | David    | Network Applications: Application Design, Socket API, HTTP & Content Delivery | KR 2.1, 2.2, 2.3.1, 2.3.2, 2.6.1 - 2.6.3 |
| 45   | 02 Nov | CN    | David    | Application Layer: DNS + P2P File Distribution, Transport layer: UDP          | KR 2.4, 2.5, 3.1 - 3.3 |
|      | 04 Nov | CN    | David    | Transport layer: Principles of Reliable Data Transfer + TCP                   | KR 3.1 - 3.7 |
| 46   |        |       |          | Re-exam week - No lectures                                                    |          |
| 47   | 16 Nov | CN    | David    | Avoiding Deadlock                                                             | BOH 12.5-12.7 (Optional read - BOH 8.5-8.7) |
|      | 18 Nov | Arc   | Finn     | C to Assembler - A minimal RISC-V setup                                       | review material for lectures 4/9 + 9/9, slides will be available after lecture |
|      |        |       |          | Hand-in A3 (Network)                                                          |          |
| 48   | 23 Nov | Arc   | Finn     | RISC-V machine language                                                       | as above. Also get some familiarity/overview of ch 1,2 and 13 of [RISCV](https://github.com/riscv/riscv-isa-manual/releases/download/20240411/unpriv-isa-asciidoc.pdf) |
|      | 25 Nov | Arc   | Finn     | Digital logic                                                                 | COD A.1 - A.3, A.5, A7 - A.9, [NandGame](https://nandgame.com/) |
| 49   | 30 Nov | Arc   | Finn     | The simple machine                                                            | COD 4.1 - 4.4 |
|      | 02 Dec | Arc   | Finn     | Into to Mikroarchitektur: Pipelining and ydeevne                              | COD 4.6 - 4.9 + [note](https://github.com/diku-compSys/compSys-e2025/blob/main/resources/Afviklingsplot/plot.md), afsnit: intro,lange pipelines,superskalare |
| 50   | 07 Dec | Arc   | Finn     | Avanceret Mikroarchitektur I                                                  | COD 4.11 + [note](https://github.com/diku-compSys/compSys-e2025/blob/main/resources/Afviklingsplot/plot.md), afsnit om out-of-order |
|      | 09 Dec | Arc   | Finn     | Avanceret Mikroarchitektur II                                                 | [note](https://github.com/diku-compSys/compSys-e2025/blob/main/resources/Afviklingsplot/plot.md), afsnit om out-of-order |
| 51   | 14 Dec | Arc   | Finn     | Vector processing. Opsamling. Maskinnær optimering.                           | TBD |
|      | 16 Dec |       |          | Christmas lecture.                                                            |         |
|      |        |       |          | Hand-in A4 (Architecture)                                                     |         |
| 52   |        |       |          | Christmas vacation - No lectures                                              |         |
| 53   |        |       |          | Christmas vacation - No lectures                                              |         |
| 1    | 04 Jan | CN    | Michael  | Security Across the Network, DIKU St.UP1                                      | KR 8.1 - 8.7 |
|      | 06 Jan | CN    | Michael  | layer, data plane                                                             | KR 4.1 - 4.2.4, 4.3 (Optional read - [Design Philosophy of DARPA Internet Protocols](http://www.cs.princeton.edu/courses/archive/spr14/cos461/papers/clark88.pdf)) |
| 2    | 11 Jan | CN    | Michael  | Network layer, control plane                                                  | KR 5.1 - 5.3, KR 6.1 - 6.4.3, KR 8.5 - 8.6 |
|      | 13 Jan |       |          |                                                                               |         |
|      |        | Recap | TAs      | Architecture recap, DIKU, Li.UP1                                              |         |
|      |        | Recap | TAs      | Operation System recap                                                        |         |
|      |        | Recap | TAs      | Computer Networks                                                             |         |
| 4    | 18 Jan |       | Lectures | FAQ, Exam question session and evaluation                                     |         |
|      | 27 Jan |       | Everyone | CompSys Exam                                                                  |         |`;

const FALLBACK_ASSIGNMENT_TABLE = String.raw`| Title                                         | Expected deadline         | Topic | Report points | Discussion points | Total points |
| --------------------------------------------- | ------------------------- | ----- | ------------- | ----------------- | ------------ |
| A0: Dynamic memory and caching                | Wednesday Week 40 @ 22:00 | None  |      4 points |          2 points |     6 points |
| A1: Concurrency                               | Wednesday Week 44 @ 22:00 | OS    |      4 points |          2 points |     6 points |
| A2: Client network distribution and security  | Wednesday Week 48 @ 22:00 | CN    |      4 points |          2 points |     6 points |
| A3: Architecture.                             | Sunday Week 51 @ 16:00    | Arc   |      4 points |          2 points |     6 points |
| A4: Theoretical catch up                      | Sunday Week 01 @ 16:00    | None  |      2 points |                 - |     2 points |`;

const FALLBACK_DOCS = Object.freeze({
  "README.md": `# Computer Systems e2026 @ DIKU\n\nFor details about the course see:\n\n- [Course Description](courseinformation.md)\n- [Lecture Plan](lectureplan.md)\n\nMake sure your tool-chain is working:\n\n- [Tools](tools/README.md)`,
  "assignments/README.md": `# Assignments\n\nHere you will be able to find the CompSys assignments.\n\n## Report\nAll members and their KU-id must be included on the first page of the report.\n\n## Source code\nSubmit a zip-file called \`src.zip\` containing source code, tests and Makefile. Run \`make clean\` before compressing.\n\n## Submission instructions\nAssignments are intended for groups of 2-3 people.\n\n## Submission updates\nWhen updating a submission, submit everything again. Only the final submission is considered.\n\n## AI Declaration\nAll submissions must include a Declaration of Academic Use of AI.`,
  "tools/README.md": `# Tools\n\nThe course uses C, GCC and later GDB. Choose the setup guide for your operating system.\n\n- [Linux tools](linux.md)\n- [macOS tools](macos.md)\n- [Windows tools](windows.md)\n- [RARS](rars.md)\n\nUse an editor or IDE with easy access to a terminal, Make and test scripts.`,
  "courseinformation.md": `# Course Information for Computer Systems\n\nCompSys introduces machine architecture, operating systems, computer networks, basic IT security and C programming.\n\nThis offline snapshot only contains the key facts shown in the portal. Open the original GitHub document for the complete and latest course information.\n\n## Weekly teaching\n\n- Lectures: Mondays 15:15-17:00 and Wednesdays 13:15-15:00\n- Exercises: Mondays 13:15-15:00 and Wednesdays 15:15-17:00\n- Cafes: Wednesdays 10:15-12:00\n\n## Exam\n\nWritten 4-hour open-book bring-your-own-device exam. LLM/GAI is not allowed.\n\n## Qualification\n\nAt least 13 of 26 assignment points, plus the stated minimum within OS, computer networks and machine architecture.`
});

function blobUrl(path) {
  return `${REPO_BASE}/blob/${CONFIG.branch}/${encodePath(path)}`;
}

function treeUrl(path) {
  return path ? `${REPO_BASE}/tree/${CONFIG.branch}/${encodePath(path)}` : REPO_BASE;
}

function rawUrl(path) {
  return `${RAW_BASE}/${encodePath(path)}`;
}

function apiContentsUrl(path = "") {
  const suffix = path ? `/${encodePath(path)}` : "";
  return `${API_BASE}/contents${suffix}?ref=${encodeURIComponent(CONFIG.branch)}`;
}

function makeItem(name, path, type = "file", size = 0) {
  return {
    name,
    path,
    type,
    size,
    html_url: type === "dir" ? treeUrl(path) : blobUrl(path)
  };
}

const FALLBACK_MATERIALS = [
  makeItem("26_08_31__Intro_and_C", "material/26_08_31__Intro_and_C", "dir"),
  makeItem("26_09_02__Assembly_and_Machine_Code", "material/26_09_02__Assembly_and_Machine_Code", "dir"),
  makeItem("26_09_07__Computer_Arithmetic", "material/26_09_07__Computer_Arithmetic", "dir"),
  makeItem("26_09_09__Functions_and_Text", "material/26_09_09__Functions_and_Text", "dir")
];

const FALLBACK_MATERIAL_CONTENTS = new Map([
  ["material/26_08_31__Intro_and_C", [
    makeItem("C.pdf", "material/26_08_31__Intro_and_C/C.pdf", "file", 106370),
    makeItem("Intro.pdf", "material/26_08_31__Intro_and_C/Intro.pdf", "file", 486518),
    makeItem("exercises.md", "material/26_08_31__Intro_and_C/exercises.md", "file", 6291),
    makeItem("lecture_code", "material/26_08_31__Intro_and_C/lecture_code", "dir"),
    makeItem("material.md", "material/26_08_31__Intro_and_C/material.md", "file", 574)
  ]],
  ["material/26_09_02__Assembly_and_Machine_Code", [
    makeItem("Assembly_and_Machine_Code.pdf", "material/26_09_02__Assembly_and_Machine_Code/Assembly_and_Machine_Code.pdf", "file", 1233198),
    makeItem("exercises", "material/26_09_02__Assembly_and_Machine_Code/exercises", "dir"),
    makeItem("material.md", "material/26_09_02__Assembly_and_Machine_Code/material.md", "file", 1047)
  ]],
  ["material/26_09_07__Computer_Arithmetic", [
    makeItem("Computer_Arithmetic.pdf", "material/26_09_07__Computer_Arithmetic/Computer_Arithmetic.pdf", "file", 476916),
    makeItem("exercises", "material/26_09_07__Computer_Arithmetic/exercises", "dir"),
    makeItem("material.md", "material/26_09_07__Computer_Arithmetic/material.md", "file", 1093)
  ]],
  ["material/26_09_09__Functions_and_Text", [
    makeItem("exercises", "material/26_09_09__Functions_and_Text/exercises", "dir"),
    makeItem("for_students.pdf", "material/26_09_09__Functions_and_Text/for_students.pdf", "file", 221566),
    makeItem("lecture_code", "material/26_09_09__Functions_and_Text/lecture_code", "dir"),
    makeItem("material.md", "material/26_09_09__Functions_and_Text/material.md", "file", 911)
  ]]
]);

const FALLBACK_TOOLS = [
  makeItem("README.md", "tools/README.md", "file", 1510),
  makeItem("linux.md", "tools/linux.md", "file", 1055),
  makeItem("macos.md", "tools/macos.md", "file", 2380),
  makeItem("masterclass", "tools/masterclass", "dir"),
  makeItem("rars.md", "tools/rars.md", "file", 2462),
  makeItem("riscv-sim", "tools/riscv-sim", "dir"),
  makeItem("windows.md", "tools/windows.md", "file", 1168)
];

const FALLBACK_RESOURCES = [
  makeItem("Afviklingsplot", "resources/Afviklingsplot", "dir"),
  makeItem("Complexity", "resources/Complexity", "dir"),
  makeItem("Computer_Systems_A_Programmers_Perspective.pdf", "resources/Computer_Systems_A_Programmers_Perspective.pdf", "file", 19407503),
  makeItem("tiny_riscv", "resources/tiny_riscv", "dir")
];

const FALLBACK_ROOT = [
  makeItem("README.md", "README.md", "file", 364),
  makeItem("assignments", "assignments", "dir"),
  makeItem("courseinformation.md", "courseinformation.md", "file", 16262),
  makeItem("lectureplan.md", "lectureplan.md", "file", 8441),
  makeItem("material", "material", "dir"),
  makeItem("resources", "resources", "dir"),
  makeItem("tools", "tools", "dir")
];

const FALLBACK_COMMITS = [
  {
    sha: "a9338b4",
    message: "updated some assignment due dates. yay for an extra few days to submit",
    html_url: `${REPO_BASE}/commit/a9338b4592ca0671cee4a7dc4684cea4a8865f52`,
    date: "2026-09-01T11:56:13Z"
  },
  {
    sha: "7631efd",
    message: "minor typos fixed in todays lecture",
    html_url: `${REPO_BASE}/commit/7631efd6fc4525809f20040702ce0f14f2d96afb`,
    date: "2026-08-31T08:07:32Z"
  },
  {
    sha: "292aaa5",
    message: "added the first two weeks of material",
    html_url: `${REPO_BASE}/commit/292aaa5b3f56ca873401580f9f3a8acb4298e49a`,
    date: "2026-08-28T13:47:26Z"
  }
];

const MONTH_INDEX = Object.freeze({
  jan: 0,
  feb: 1,
  mar: 2,
  apr: 3,
  may: 4,
  jun: 5,
  jul: 6,
  aug: 7,
  sep: 8,
  oct: 9,
  nov: 10,
  dec: 11
});

const WEEKDAY_INDEX = Object.freeze({
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6,
  sunday: 7
});

function encodePath(path = "") {
  return path
    .split("/")
    .filter(Boolean)
    .map((part) => encodeURIComponent(part))
    .join("/");
}

function normalizeRepoPath(path = "") {
  const parts = [];
  for (const part of path.replace(/\\/g, "/").split("/")) {
    if (!part || part === ".") continue;
    if (part === "..") parts.pop();
    else parts.push(part);
  }
  return parts.join("/");
}

function dirname(path = "") {
  const parts = normalizeRepoPath(path).split("/").filter(Boolean);
  parts.pop();
  return parts.join("/");
}

function routeHref(route, path = "") {
  return path ? `#${route}/${encodePath(path)}` : `#${route}`;
}

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttribute(value = "") {
  return escapeHtml(value).replaceAll("`", "&#096;");
}

function parseTableRow(line) {
  const trimmed = line.trim().replace(/^\|/, "").replace(/\|$/, "");
  return trimmed.split("|").map((cell) => cell.trim());
}

function stripMarkdown(value = "") {
  return String(value)
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[*_`>#]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function slugify(value = "") {
  return stripMarkdown(value)
    .toLocaleLowerCase("da-DK")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "afsnit";
}

function resolveMarkdownLink(url, basePath = "") {
  const clean = String(url).trim().replace(/^<|>$/g, "");
  if (/^(https?:|mailto:|tel:)/i.test(clean)) {
    return { href: clean, external: /^https?:/i.test(clean) };
  }
  if (clean.startsWith("#")) {
    const anchor = clean.slice(1);
    return { href: basePath ? `${routeHref("doc", basePath)}#${encodeURIComponent(anchor)}` : clean, external: false };
  }

  const [pathPart, fragment = ""] = clean.split("#", 2);
  const resolved = normalizeRepoPath(`${dirname(basePath)}/${pathPart}`);
  const hash = fragment ? `#${encodeURIComponent(fragment)}` : "";
  if (/\.md$/i.test(pathPart)) {
    return { href: `${routeHref("doc", resolved)}${hash}`, external: false };
  }
  return { href: `${blobUrl(resolved)}${hash}`, external: true };
}

function renderInline(value = "", basePath = "") {
  let text = String(value);
  const tokens = [];
  const token = (html) => {
    const id = `@@CSTOKEN${tokens.length}@@`;
    tokens.push(html);
    return id;
  };

  text = text.replace(/`([^`]+)`/g, (_, code) => token(`<code>${escapeHtml(code)}</code>`));
  text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, label, url) => {
    const link = resolveMarkdownLink(url, basePath);
    const target = link.external ? ' target="_blank" rel="noreferrer"' : "";
    return token(`<a href="${escapeAttribute(link.href)}"${target}>${escapeHtml(label)}</a>`);
  });

  let safe = escapeHtml(text);
  safe = safe.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  safe = safe.replace(/__([^_]+)__/g, "<strong>$1</strong>");
  safe = safe.replace(/(^|[\s(])\*([^*\n]+)\*/g, "$1<em>$2</em>");
  safe = safe.replace(/(^|[\s(])_([^_\n]+)_/g, "$1<em>$2</em>");

  tokens.forEach((html, index) => {
    safe = safe.replace(`@@CSTOKEN${index}@@`, html);
  });
  return safe;
}

function renderMarkdown(markdown = "", basePath = "") {
  const cleaned = String(markdown).replace(/<!--[\s\S]*?-->/g, "").replace(/\r/g, "");
  const lines = cleaned.split("\n");
  const html = [];
  const headings = [];
  const usedSlugs = new Map();
  let index = 0;

  const uniqueSlug = (text) => {
    const base = slugify(text);
    const count = usedSlugs.get(base) || 0;
    usedSlugs.set(base, count + 1);
    return count ? `${base}-${count + 1}` : base;
  };

  const isTableSeparator = (line) => {
    const cells = parseTableRow(line);
    return cells.length > 1 && cells.every((cell) => /^:?-{3,}:?$/.test(cell.replace(/\s/g, "")));
  };

  const isBlockStart = (line, nextLine = "") => {
    const trimmed = line.trim();
    return !trimmed || /^#{1,6}\s+/.test(trimmed) || /^```/.test(trimmed) || /^>\s?/.test(trimmed) || /^[-*+]\s+/.test(trimmed) || /^\d+\.\s+/.test(trimmed) || (trimmed.startsWith("|") && isTableSeparator(nextLine));
  };

  while (index < lines.length) {
    const line = lines[index];
    const trimmed = line.trim();

    if (!trimmed) {
      index += 1;
      continue;
    }

    if (/^```/.test(trimmed)) {
      const language = trimmed.slice(3).trim();
      const code = [];
      index += 1;
      while (index < lines.length && !/^```/.test(lines[index].trim())) {
        code.push(lines[index]);
        index += 1;
      }
      index += 1;
      const languageClass = language ? ` class="language-${escapeAttribute(language)}"` : "";
      html.push(`<pre><code${languageClass}>${escapeHtml(code.join("\n"))}</code></pre>`);
      continue;
    }

    const headingMatch = trimmed.match(/^(#{1,6})\s+(.+)$/);
    if (headingMatch) {
      const level = headingMatch[1].length;
      const title = headingMatch[2].replace(/\s+#+$/, "").trim();
      const id = uniqueSlug(title);
      headings.push({ level, title: stripMarkdown(title), id });
      html.push(`<h${level} id="${escapeAttribute(id)}">${renderInline(title, basePath)}</h${level}>`);
      index += 1;
      continue;
    }

    if (trimmed.startsWith("|") && index + 1 < lines.length && isTableSeparator(lines[index + 1])) {
      const headers = parseTableRow(line);
      index += 2;
      const rows = [];
      while (index < lines.length && lines[index].trim().startsWith("|")) {
        rows.push(parseTableRow(lines[index]));
        index += 1;
      }
      html.push(`<table><thead><tr>${headers.map((cell) => `<th>${renderInline(cell, basePath)}</th>`).join("")}</tr></thead><tbody>${rows.map((row) => `<tr>${headers.map((_, cellIndex) => `<td>${renderInline(row[cellIndex] || "", basePath)}</td>`).join("")}</tr>`).join("")}</tbody></table>`);
      continue;
    }

    if (/^[-*+]\s+/.test(trimmed)) {
      const items = [];
      while (index < lines.length && /^\s*[-*+]\s+/.test(lines[index])) {
        items.push(lines[index].replace(/^\s*[-*+]\s+/, ""));
        index += 1;
      }
      html.push(`<ul>${items.map((item) => `<li>${renderInline(item, basePath)}</li>`).join("")}</ul>`);
      continue;
    }

    if (/^\d+\.\s+/.test(trimmed)) {
      const items = [];
      while (index < lines.length && /^\s*\d+\.\s+/.test(lines[index])) {
        items.push(lines[index].replace(/^\s*\d+\.\s+/, ""));
        index += 1;
      }
      html.push(`<ol>${items.map((item) => `<li>${renderInline(item, basePath)}</li>`).join("")}</ol>`);
      continue;
    }

    if (/^>\s?/.test(trimmed)) {
      const quote = [];
      while (index < lines.length && /^\s*>\s?/.test(lines[index])) {
        quote.push(lines[index].replace(/^\s*>\s?/, ""));
        index += 1;
      }
      html.push(`<blockquote>${quote.map((item) => renderInline(item, basePath)).join("<br>")}</blockquote>`);
      continue;
    }

    const paragraph = [trimmed];
    index += 1;
    while (index < lines.length && !isBlockStart(lines[index], lines[index + 1] || "")) {
      paragraph.push(lines[index].trim());
      index += 1;
    }
    html.push(`<p>${renderInline(paragraph.join(" "), basePath)}</p>`);
  }

  return { html: html.join("\n"), headings };
}

function courseDateFromLabel(label = "") {
  const match = String(label).trim().match(/^(\d{1,2})\s+([A-Za-z]{3})/);
  if (!match) return null;
  const day = Number(match[1]);
  const month = MONTH_INDEX[match[2].toLowerCase()];
  if (!Number.isInteger(month)) return null;
  const year = month < 6 ? CONFIG.startYear + 1 : CONFIG.startYear;
  return new Date(Date.UTC(year, month, day, 12, 0, 0));
}

function materialDateFromName(name = "") {
  const match = String(name).match(/^(\d{2})_(\d{2})_(\d{2})__/);
  if (!match) return null;
  return new Date(Date.UTC(2000 + Number(match[1]), Number(match[2]) - 1, Number(match[3]), 12, 0, 0));
}

function materialTitleFromName(name = "") {
  const raw = String(name).replace(/^\d{2}_\d{2}_\d{2}__/, "");
  return raw.replaceAll("_", " ").replace(/\s+/g, " ").trim() || name;
}

function isoWeekDate(year, week, weekday) {
  const fourthJanuary = new Date(Date.UTC(year, 0, 4, 12));
  const fourthDay = fourthJanuary.getUTCDay() || 7;
  const mondayWeekOne = new Date(fourthJanuary);
  mondayWeekOne.setUTCDate(fourthJanuary.getUTCDate() - fourthDay + 1);
  const result = new Date(mondayWeekOne);
  result.setUTCDate(mondayWeekOne.getUTCDate() + (week - 1) * 7 + (weekday - 1));
  return result;
}

function parseAssignmentDeadline(value = "") {
  const match = String(value).match(/(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)\s+Week\s+(\d+)\s+@\s+(\d{1,2}):(\d{2})/i);
  if (!match) return { date: null, time: "", week: null };
  const week = Number(match[2]);
  const year = week <= 10 ? CONFIG.startYear + 1 : CONFIG.startYear;
  const weekday = WEEKDAY_INDEX[match[1].toLowerCase()];
  return {
    date: isoWeekDate(year, week, weekday),
    time: `${match[3].padStart(2, "0")}:${match[4]}`,
    week
  };
}

function parseLecturePlan(markdown = "") {
  const lines = String(markdown).replace(/\r/g, "").split("\n");
  const headerIndex = lines.findIndex((line) => /^\|\s*Week\s*\|\s*Date/i.test(line.trim()));
  if (headerIndex < 0) return [];

  const events = [];
  let currentWeek = "";
  let currentDateLabel = "";

  for (let index = headerIndex + 2; index < lines.length; index += 1) {
    const line = lines[index].trim();
    if (!line.startsWith("|")) break;
    const cells = parseTableRow(line);
    if (cells.length < 6) continue;
    const [weekCell, dateCell, topicCell, lecturerCell, titleCell, materialCell] = cells;
    if (weekCell) currentWeek = weekCell;
    if (dateCell) currentDateLabel = dateCell;

    const title = stripMarkdown(titleCell);
    const lecturer = stripMarkdown(lecturerCell);
    const topic = stripMarkdown(topicCell);
    const material = materialCell.trim();
    if (!title && !topic && !lecturer && !material) continue;

    const hasInheritedDate = !dateCell && Boolean(lecturer && title);
    const dateLabel = dateCell || (hasInheritedDate ? currentDateLabel : "");
    const kind = /hand-?in/i.test(title)
      ? "deadline"
      : /(vacation|no lectures|exam|faq|christmas lecture)/i.test(title)
        ? "special"
        : "lecture";

    events.push({
      id: `week-${currentWeek}-${events.length}`,
      order: events.length,
      week: currentWeek,
      dateLabel,
      date: courseDateFromLabel(dateLabel),
      topic: topic || (kind === "lecture" ? "General" : ""),
      lecturer,
      title: title || "Ikke navngivet aktivitet",
      material,
      kind
    });
  }
  return events;
}

function parseAssignments(markdown = "") {
  const lines = String(markdown).replace(/\r/g, "").split("\n");
  const headerIndex = lines.findIndex((line) => /^\|\s*Title\s*\|\s*Expected deadline/i.test(line.trim()));
  if (headerIndex < 0) return [];

  const assignments = [];
  for (let index = headerIndex + 2; index < lines.length; index += 1) {
    const line = lines[index].trim();
    if (!line.startsWith("|")) break;
    const cells = parseTableRow(line);
    if (cells.length < 6 || !/^A\d+\s*:/i.test(cells[0])) continue;
    const titleMatch = cells[0].match(/^(A\d+)\s*:\s*(.+)$/i);
    if (!titleMatch) continue;
    const deadline = parseAssignmentDeadline(cells[1]);
    const points = (value) => {
      const pointMatch = String(value).match(/\d+/);
      return pointMatch ? Number(pointMatch[0]) : 0;
    };
    assignments.push({
      id: titleMatch[1].toUpperCase(),
      title: titleMatch[2].replace(/\.$/, "").trim(),
      deadlineText: cells[1],
      deadline: deadline.date,
      deadlineTime: deadline.time,
      week: deadline.week,
      topic: cells[2] === "None" ? "Tværgående" : cells[2],
      reportPoints: points(cells[3]),
      discussionPoints: points(cells[4]),
      totalPoints: points(cells[5])
    });
  }
  return assignments;
}

function nowInCopenhagen() {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: CONFIG.timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).formatToParts(new Date());
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return new Date(Date.UTC(Number(values.year), Number(values.month) - 1, Number(values.day), 12, 0, 0));
}

function isoWeekNumber(date) {
  const temporary = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 12));
  const day = temporary.getUTCDay() || 7;
  temporary.setUTCDate(temporary.getUTCDate() + 4 - day);
  const yearStart = new Date(Date.UTC(temporary.getUTCFullYear(), 0, 1, 12));
  return Math.ceil((((temporary - yearStart) / 86400000) + 1) / 7);
}

function daysBetween(future, reference = nowInCopenhagen()) {
  if (!(future instanceof Date) || Number.isNaN(future.getTime())) return null;
  return Math.round((future.getTime() - reference.getTime()) / 86400000);
}

function formatDate(date, options = {}) {
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) return "Dato ikke angivet";
  return new Intl.DateTimeFormat("da-DK", {
    timeZone: "UTC",
    day: options.day || "numeric",
    month: options.month || "long",
    ...(options.year === false ? {} : { year: options.year || "numeric" }),
    ...(options.weekday ? { weekday: options.weekday } : {})
  }).format(date);
}

function formatShortDate(date) {
  return formatDate(date, { day: "numeric", month: "short", year: false });
}

function formatRelativeDay(date) {
  const days = daysBetween(date);
  if (days === null) return "";
  if (days === 0) return "i dag";
  if (days === 1) return "i morgen";
  if (days === -1) return "i går";
  if (days > 1) return `om ${days} dage`;
  return `${Math.abs(days)} dage siden`;
}

function formatBytes(bytes = 0) {
  if (!Number.isFinite(bytes) || bytes <= 0) return "";
  const units = ["B", "KB", "MB", "GB"];
  let value = bytes;
  let unit = 0;
  while (value >= 1024 && unit < units.length - 1) {
    value /= 1024;
    unit += 1;
  }
  return `${value >= 10 || unit === 0 ? value.toFixed(0) : value.toFixed(1)} ${units[unit]}`;
}

function friendlyTopic(topic = "") {
  const map = {
    Intro: "Introduktion",
    Basic: "Grundlag",
    OS: "Operativsystemer",
    CN: "Netværk",
    Arc: "Arkitektur",
    Recap: "Opsamling",
    General: "Generelt",
    "Tværgående": "Tværgående"
  };
  return map[topic] || topic || "Generelt";
}

function normalizeMaterial(item) {
  return {
    ...item,
    date: materialDateFromName(item.name),
    title: materialTitleFromName(item.name)
  };
}

function commitFromApi(commit) {
  return {
    sha: String(commit.sha || "").slice(0, 7),
    message: commit.commit?.message?.split("\n")[0] || commit.message || "Opdatering",
    html_url: commit.html_url || `${REPO_BASE}/commits/${CONFIG.branch}`,
    date: commit.commit?.committer?.date || commit.commit?.author?.date || commit.date || null
  };
}

function fileKind(item) {
  if (item.type === "dir") {
    if (/exercise/i.test(item.name)) return { icon: "EX", label: "Øvelser" };
    if (/code/i.test(item.name)) return { icon: "C", label: "Kode" };
    return { icon: "DIR", label: "Mappe" };
  }
  const extension = item.name.split(".").pop().toLowerCase();
  if (extension === "pdf") return { icon: "PDF", label: /slide|student|intro|assembly|arithmetic|^c\.pdf/i.test(item.name) ? "Slides / PDF" : "PDF" };
  if (extension === "md") {
    if (/exercise/i.test(item.name)) return { icon: "EX", label: "Øvelser" };
    if (/material/i.test(item.name)) return { icon: "PREP", label: "Forberedelse" };
    return { icon: "MD", label: "Dokument" };
  }
  if (["c", "h", "s", "asm"].includes(extension)) return { icon: extension.toUpperCase(), label: "Kildekode" };
  return { icon: extension.slice(0, 4).toUpperCase() || "FILE", label: "Fil" };
}

function friendlyFileName(item) {
  const names = {
    "material.md": "Forberedelse og links",
    "exercises.md": "Øvelser",
    "exercise_solutions.md": "Løsningsforslag",
    "lecture_code": "Kode fra undervisningen",
    "exercises": "Øvelser",
    "for_students.pdf": "Slides til studerende",
    "README.md": "Introduktion"
  };
  return names[item.name] || item.name.replaceAll("_", " ");
}

function friendlyTool(item) {
  const map = {
    "linux.md": { title: "Linux", icon: "LIN", description: "Installer GCC, GDB og de nødvendige kommandolinjeværktøjer på Linux." },
    "macos.md": { title: "macOS", icon: "MAC", description: "Sæt compiler, debugger og kursusværktøjer op på macOS." },
    "windows.md": { title: "Windows", icon: "WIN", description: "Få en fungerende C-toolchain og terminal på Windows." },
    "rars.md": { title: "RARS", icon: "RV", description: "Installer og brug simulatoren til RISC-V assembler." },
    masterclass: { title: "Tool masterclass", icon: "CLI", description: "Ekstra materiale om terminal, Git, Make og arbejdsgange." },
    "riscv-sim": { title: "RISC-V simulator", icon: "SIM", description: "Kursusfiler og hjælp til den anvendte RISC-V simulator." }
  };
  return map[item.name] || { title: friendlyFileName(item), icon: item.type === "dir" ? "DIR" : "DOC", description: "Åbn værktøjsmaterialet i kursets repository." };
}

function friendlyResource(item) {
  const map = {
    Afviklingsplot: { title: "Afviklingsplot", icon: "CPU", description: "Noter og visualiseringer om pipelines og out-of-order execution." },
    Complexity: { title: "Kompleksitet", icon: "O(n)", description: "Supplerende materiale om beregningsmæssig kompleksitet." },
    "Computer_Systems_A_Programmers_Perspective.pdf": { title: "Computer Systems: A Programmer's Perspective", icon: "PDF", description: "De udvalgte BOH-afsnit, som bruges på kurset." },
    tiny_riscv: { title: "Tiny RISC-V", icon: "RV", description: "Små RISC-V eksempler og ressourcer til arkitekturforløbet." }
  };
  return map[item.name] || { title: friendlyFileName(item), icon: item.type === "dir" ? "DIR" : "FILE", description: "Supplerende kursusressource." };
}

const state = {
  schedule: parseLecturePlan(FALLBACK_LECTURE_PLAN),
  assignments: parseAssignments(FALLBACK_ASSIGNMENT_TABLE),
  materials: FALLBACK_MATERIALS.map(normalizeMaterial),
  tools: [...FALLBACK_TOOLS],
  resources: [...FALLBACK_RESOURCES],
  commits: [...FALLBACK_COMMITS],
  materialContents: new Map(FALLBACK_MATERIAL_CONTENTS),
  expandedMaterials: new Set(),
  materialLoading: new Set(),
  materialErrors: new Map(),
  repoCache: new Map([
    ["", FALLBACK_ROOT],
    ["assignments", [makeItem("README.md", "assignments/README.md", "file", 883)]],
    ["material", FALLBACK_MATERIALS],
    ["resources", FALLBACK_RESOURCES],
    ["tools", FALLBACK_TOOLS],
    ...Array.from(FALLBACK_MATERIAL_CONTENTS.entries())
  ]),
  repoLoading: new Set(),
  repoErrors: new Map(),
  docCache: new Map([
    ...Object.entries(FALLBACK_DOCS),
    ["lectureplan.md", FALLBACK_LECTURE_PLAN]
  ]),
  docLive: new Set(),
  docLoading: new Set(),
  docErrors: new Map(),
  route: { name: "overblik", path: "", anchor: "" },
  scheduleFilter: "Alle",
  scheduleSearch: "",
  materialSearch: "",
  materialSort: "chronological",
  globalLoaded: false,
  liveSections: 0,
  globalErrors: [],
  lastRenderReason: "route"
};

const ROUTES = new Set([
  "overblik",
  "ugeplan",
  "materialer",
  "afleveringer",
  "vaerktoejer",
  "ressourcer",
  "kursusinfo",
  "repo",
  "doc"
]);

function parseRoute() {
  let raw = window.location.hash.replace(/^#/, "") || "overblik";
  let anchor = "";
  const secondHash = raw.indexOf("#");
  if (secondHash >= 0) {
    anchor = decodeURIComponent(raw.slice(secondHash + 1));
    raw = raw.slice(0, secondHash);
  }
  const segments = raw.split("/");
  let name = ROUTES.has(segments[0]) ? segments.shift() : "overblik";
  const path = normalizeRepoPath(segments.map((part) => {
    try {
      return decodeURIComponent(part);
    } catch {
      return part;
    }
  }).join("/"));
  if (name === "doc" && !path) name = "repo";
  return { name, path, anchor };
}

function activeNavigationRoute(route = state.route) {
  if (route.name !== "doc") return route.name;
  if (route.path.startsWith("tools/")) return "vaerktoejer";
  if (route.path.startsWith("material/")) return "materialer";
  if (route.path.startsWith("assignments/")) return "afleveringer";
  if (route.path === "courseinformation.md") return "kursusinfo";
  if (route.path === "lectureplan.md") return "ugeplan";
  return "repo";
}

function pageHeader({ kicker, title, description, actions = "" }) {
  return `<header class="page-header">
    <div class="page-heading">
      ${kicker ? `<p class="page-kicker">${escapeHtml(kicker)}</p>` : ""}
      <h1 class="page-title">${escapeHtml(title)}</h1>
      ${description ? `<p class="page-description">${escapeHtml(description)}</p>` : ""}
    </div>
    ${actions ? `<div class="page-actions">${actions}</div>` : ""}
  </header>`;
}

function sourceBanner() {
  if (!state.globalLoaded) {
    return `<div class="source-banner"><span aria-hidden="true">↻</span><span><strong>Live data indlæses.</strong> Siden viser det indbyggede snapshot imens.</span></div>`;
  }
  if (state.liveSections > 0) {
    return `<div class="source-banner"><span aria-hidden="true">✓</span><span><strong>Forbundet til GitHub.</strong> Oversigten opdateres fra repoets nuværende filer.</span></div>`;
  }
  return `<div class="source-banner"><span aria-hidden="true">!</span><span><strong>GitHub kunne ikke nås.</strong> Der vises et snapshot fra ${formatDate(new Date(`${CONFIG.snapshotDate}T12:00:00Z`))}; brug links til originalen for at kontrollere nye ændringer.</span></div>`;
}

function linkButton(label, href, kind = "secondary", external = false) {
  const target = external ? ' target="_blank" rel="noreferrer"' : "";
  const arrow = external ? "↗" : "→";
  return `<a class="button ${kind}" href="${escapeAttribute(href)}"${target}><span>${escapeHtml(label)}</span><span aria-hidden="true">${arrow}</span></a>`;
}

function eventStatus(date) {
  if (!(date instanceof Date)) return { text: "Ugeaktivitet", className: "" };
  const days = daysBetween(date);
  if (days === 0) return { text: "I dag", className: "is-now" };
  if (days === 1) return { text: "I morgen", className: "is-upcoming" };
  if (days !== null && days > 1) return { text: `Om ${days} dage`, className: "is-upcoming" };
  return { text: "Afholdt", className: "is-past" };
}

function assignmentStatus(assignment) {
  const days = daysBetween(assignment.deadline);
  if (days === null) return { text: "Dato mangler", className: "" };
  if (days < 0) return { text: "Afleveret", className: "is-past" };
  if (days === 0) return { text: "Deadline i dag", className: "is-now" };
  if (days === 1) return { text: "Deadline i morgen", className: "is-upcoming" };
  return { text: `${days} dage tilbage`, className: "is-upcoming" };
}

function materialStatus(material) {
  if (!(material.date instanceof Date)) return { text: "Materiale", className: "" };
  const today = nowInCopenhagen();
  const sameWeek = isoWeekNumber(material.date) === isoWeekNumber(today) && material.date.getUTCFullYear() === today.getUTCFullYear();
  if (sameWeek) return { text: "Denne uge", className: "is-now" };
  const days = daysBetween(material.date, today);
  if (days !== null && days > 0) return { text: "Kommende", className: "is-upcoming" };
  return { text: "Tilgængeligt", className: "is-past" };
}

function renderHomeEvent(event) {
  const status = eventStatus(event.date);
  const dateNumber = event.date ? new Intl.DateTimeFormat("da-DK", { timeZone: "UTC", day: "numeric" }).format(event.date) : `U${event.week}`;
  const dateMonth = event.date ? new Intl.DateTimeFormat("da-DK", { timeZone: "UTC", month: "short" }).format(event.date) : "uge";
  return `<article class="event-card">
    <div class="event-day"><span>${escapeHtml(dateNumber)}</span><small>${escapeHtml(dateMonth)}</small></div>
    <div class="event-copy">
      <h3>${escapeHtml(event.title)}</h3>
      <p>${escapeHtml(friendlyTopic(event.topic))}${event.lecturer ? ` · ${escapeHtml(event.lecturer)}` : ""}</p>
    </div>
    <span class="status-badge ${status.className}">${escapeHtml(status.text)}</span>
  </article>`;
}

function renderUpdate(commit) {
  const date = commit.date ? new Date(commit.date) : null;
  const exact = date && !Number.isNaN(date.getTime())
    ? new Intl.DateTimeFormat("da-DK", { timeZone: CONFIG.timeZone, day: "numeric", month: "short", year: "numeric" }).format(date)
    : "";
  return `<a class="update-item" href="${escapeAttribute(commit.html_url)}" target="_blank" rel="noreferrer">
    <span class="update-dot" aria-hidden="true"></span>
    <span class="update-copy"><strong>${escapeHtml(commit.message)}</strong><span>${escapeHtml(commit.sha)}</span></span>
    <span class="update-time">${escapeHtml(exact)}</span>
  </a>`;
}

function renderOverview() {
  const today = nowInCopenhagen();
  const currentWeek = isoWeekNumber(today);
  const datedLectures = state.schedule
    .filter((event) => event.kind === "lecture" && event.date)
    .sort((a, b) => a.date - b.date || a.order - b.order);
  const nextLecture = datedLectures.find((event) => daysBetween(event.date, today) >= 0) || datedLectures.at(-1);
  const nextAssignment = [...state.assignments]
    .filter((assignment) => assignment.deadline)
    .sort((a, b) => a.deadline - b.deadline)
    .find((assignment) => daysBetween(assignment.deadline, today) >= 0) || state.assignments.at(-1);
  const newestMaterial = [...state.materials]
    .filter((material) => material.date)
    .sort((a, b) => b.date - a.date)[0];

  let focusWeek = String(currentWeek);
  let focusEvents = state.schedule.filter((event) => event.week === focusWeek && event.kind === "lecture");
  if (!focusEvents.length && nextLecture) {
    focusWeek = nextLecture.week;
    focusEvents = state.schedule.filter((event) => event.week === focusWeek && event.kind === "lecture");
  }

  const nextLectureDate = nextLecture?.date ? `${formatDate(nextLecture.date, { weekday: "long", year: false })}` : "Dato ikke angivet";
  const nextAssignmentDate = nextAssignment?.deadline ? `${formatDate(nextAssignment.deadline, { weekday: "long" })} · kl. ${nextAssignment.deadlineTime}` : "Dato ikke angivet";
  const newestMaterialDate = newestMaterial?.date ? formatDate(newestMaterial.date, { year: false }) : "";

  return `<div class="page">
    <section class="hero">
      <div class="hero-copy">
        <p class="eyebrow">${escapeHtml(CONFIG.institution)} · ${escapeHtml(CONFIG.term)}</p>
        <h1 class="hero-title">Computer<br><span>Systems</span></h1>
        <p class="hero-intro">Forelæsninger, øvelser, afleveringer og værktøjer samlet i én navigation — uden at ændre den eksisterende repo-struktur.</p>
        <div class="hero-actions">
          ${linkButton("Se denne uges plan", "#ugeplan", "primary")}
          ${linkButton("Find materialer", "#materialer", "secondary")}
        </div>
      </div>
      <div class="hero-aside">
        <div class="today-card">
          <span class="today-label">I dag</span>
          <strong class="today-date">${escapeHtml(formatDate(today, { weekday: "long" }))}</strong>
          <span class="today-week">Uge ${currentWeek}</span>
        </div>
      </div>
    </section>

    <section class="stats-grid" aria-label="Næste skridt">
      <article class="summary-card">
        <div class="summary-card-top"><span class="summary-label">Næste undervisning</span><span class="summary-icon" aria-hidden="true">▦</span></div>
        <h2 class="summary-value">${escapeHtml(nextLecture?.title || "Ingen kommende undervisning")}</h2>
        <p class="summary-meta">${escapeHtml(nextLectureDate)}${nextLecture?.lecturer ? ` · ${escapeHtml(nextLecture.lecturer)}` : ""}</p>
        <a class="text-link" href="#ugeplan">Åbn ugeplan →</a>
      </article>
      <article class="summary-card">
        <div class="summary-card-top"><span class="summary-label">Næste aflevering</span><span class="summary-icon" aria-hidden="true">✓</span></div>
        <h2 class="summary-value">${escapeHtml(nextAssignment ? `${nextAssignment.id}: ${nextAssignment.title}` : "Ingen kommende deadline")}</h2>
        <p class="summary-meta">${escapeHtml(nextAssignmentDate)}</p>
        <a class="text-link" href="#afleveringer">Se alle afleveringer →</a>
      </article>
      <article class="summary-card">
        <div class="summary-card-top"><span class="summary-label">Nyt materiale</span><span class="summary-icon" aria-hidden="true">▤</span></div>
        <h2 class="summary-value">${escapeHtml(newestMaterial?.title || "Materialer kommer her")}</h2>
        <p class="summary-meta">${escapeHtml(newestMaterialDate)} · direkte fra materialemappen</p>
        <a class="text-link" href="#materialer">Gå til materialer →</a>
      </article>
    </section>

    <section class="section two-column">
      <div class="panel">
        <div class="section-header">
          <div class="section-heading"><h2 class="section-title">${focusWeek === String(currentWeek) ? "Denne uge" : `Næste undervisningsuge · uge ${focusWeek}`}</h2><p class="section-copy">Undervisningsaktiviteter samlet fra lectureplan.md.</p></div>
          <a class="text-link" href="#ugeplan">Hele planen</a>
        </div>
        <div class="event-list">
          ${focusEvents.length ? focusEvents.map(renderHomeEvent).join("") : `<div class="empty-state"><div><strong>Ingen aktiviteter fundet</strong><span>Se den fulde ugeplan for flere detaljer.</span></div></div>`}
        </div>
      </div>
      <div class="panel">
        <div class="section-header"><div class="section-heading"><h2 class="section-title">Seneste ændringer</h2><p class="section-copy">Repoets seneste commits.</p></div></div>
        <div class="update-list">${state.commits.slice(0, 4).map(renderUpdate).join("")}</div>
      </div>
    </section>

    <section class="section">
      <div class="section-header"><div class="section-heading"><h2 class="section-title">Gå direkte til</h2><p class="section-copy">De mest brugte områder uden at kende mappestrukturen.</p></div></div>
      <div class="quick-grid">
        <a class="quick-card" href="#materialer"><span class="quick-icon" aria-hidden="true">PDF</span><span class="quick-copy"><strong>Slides og øvelser</strong><span>Sorteret efter undervisningsdato</span></span><span class="quick-arrow">→</span></a>
        <a class="quick-card" href="#afleveringer"><span class="quick-icon" aria-hidden="true">A0</span><span class="quick-copy"><strong>Afleveringer</strong><span>Deadlines, point og regler</span></span><span class="quick-arrow">→</span></a>
        <a class="quick-card" href="#vaerktoejer"><span class="quick-icon" aria-hidden="true">GCC</span><span class="quick-copy"><strong>Opsæt din maskine</strong><span>Linux, macOS, Windows og RARS</span></span><span class="quick-arrow">→</span></a>
        <a class="quick-card" href="#repo"><span class="quick-icon" aria-hidden="true">GIT</span><span class="quick-copy"><strong>Udforsk hele repoet</strong><span>Intuitiv browser til alle filer og mapper</span></span><span class="quick-arrow">→</span></a>
      </div>
    </section>

    <section class="section">${sourceBanner()}</section>
  </div>`;
}

function weekRangeLabel(events) {
  const dates = events.map((event) => event.date).filter(Boolean).sort((a, b) => a - b);
  if (!dates.length) return "Ugeaktivitet";
  if (dates.length === 1 || dates[0].getTime() === dates.at(-1).getTime()) return formatDate(dates[0], { year: false });
  return `${formatShortDate(dates[0])} – ${formatShortDate(dates.at(-1))}`;
}

function renderScheduleRow(event) {
  const dateDay = event.date ? new Intl.DateTimeFormat("da-DK", { timeZone: "UTC", weekday: "short" }).format(event.date) : "";
  const dateValue = event.date ? formatShortDate(event.date) : `Uge ${event.week}`;
  const specialClass = event.kind !== "lecture" ? " is-special" : "";
  return `<article class="schedule-row${specialClass}" data-search="${escapeAttribute(`${event.title} ${event.topic} ${event.lecturer} ${stripMarkdown(event.material)}`.toLowerCase())}">
    <div class="schedule-date">${dateDay ? `<span>${escapeHtml(dateDay)}</span>` : ""}<strong>${escapeHtml(dateValue)}</strong></div>
    <div class="schedule-main">
      <h3>${escapeHtml(event.title)}</h3>
      <div class="schedule-meta">
        ${event.topic ? `<span class="topic-badge" data-topic="${escapeAttribute(event.topic)}">${escapeHtml(friendlyTopic(event.topic))}</span>` : ""}
        ${event.lecturer ? `<span class="status-badge">${escapeHtml(event.lecturer)}</span>` : ""}
        ${event.kind === "deadline" ? `<span class="deadline-badge">Milepæl</span>` : ""}
      </div>
    </div>
    <div class="schedule-reading">${event.material ? renderInline(event.material, "lectureplan.md") : event.kind === "deadline" ? `<a href="#afleveringer">Kontrollér deadline i afleveringsoversigten →</a>` : `<span>Intet læsestof angivet</span>`}</div>
  </article>`;
}

function renderSchedule() {
  const query = state.scheduleSearch.trim().toLocaleLowerCase("da-DK");
  const filtered = state.schedule.filter((event) => {
    const matchesFilter = state.scheduleFilter === "Alle"
      || event.topic === state.scheduleFilter
      || (state.scheduleFilter === "Milepæle" && event.kind !== "lecture");
    const haystack = `${event.title} ${event.topic} ${event.lecturer} ${stripMarkdown(event.material)}`.toLocaleLowerCase("da-DK");
    return matchesFilter && (!query || haystack.includes(query));
  });

  const grouped = new Map();
  filtered.forEach((event) => {
    if (!grouped.has(event.week)) grouped.set(event.week, []);
    grouped.get(event.week).push(event);
  });
  const currentWeek = String(isoWeekNumber(nowInCopenhagen()));
  const filters = ["Alle", "Intro", "Basic", "OS", "CN", "Arc", "Recap", "Milepæle"];

  return `<div class="page">
    ${pageHeader({
      kicker: "Semesterplan",
      title: "Ugeplan",
      description: "Forelæsninger, emner og læsestof grupperet efter uge — genereret fra lectureplan.md.",
      actions: `${linkButton("Læs original fil", blobUrl("lectureplan.md"), "secondary", true)}`
    })}
    <div class="toolbar">
      <label class="search-field" for="schedule-search"><span aria-hidden="true">⌕</span><input id="schedule-search" type="search" value="${escapeAttribute(state.scheduleSearch)}" placeholder="Søg i emner, undervisere eller læsestof"></label>
      <div class="filter-pills" aria-label="Filtrer ugeplan">
        ${filters.map((filter) => `<button class="filter-pill${state.scheduleFilter === filter ? " is-active" : ""}" type="button" data-action="schedule-filter" data-filter="${escapeAttribute(filter)}">${escapeHtml(filter === "Basic" ? "Grundlag" : filter)}</button>`).join("")}
      </div>
    </div>
    ${grouped.size ? `<div class="week-list">${Array.from(grouped.entries()).map(([week, events]) => `<section class="week-group${week === currentWeek ? " is-current" : ""}">
      <header class="week-heading"><h2>Uge ${escapeHtml(week)}${week === currentWeek ? " · denne uge" : ""}</h2><span>${escapeHtml(weekRangeLabel(events))}</span></header>
      <div class="week-events">${events.map(renderScheduleRow).join("")}</div>
    </section>`).join("")}</div>` : `<div class="empty-state"><div><strong>Ingen aktiviteter matcher</strong><span>Prøv at rydde søgningen eller vælge “Alle”.</span></div></div>`}
    <section class="section">${sourceBanner()}</section>
  </div>`;
}

function materialFileHref(item) {
  if (item.type === "dir") return routeHref("repo", item.path);
  if (/\.md$/i.test(item.name)) return routeHref("doc", item.path);
  return item.html_url || blobUrl(item.path);
}

function renderFileRow(item) {
  const kind = fileKind(item);
  const href = materialFileHref(item);
  const external = !href.startsWith("#");
  const target = external ? ' target="_blank" rel="noreferrer"' : "";
  const meta = [kind.label, formatBytes(item.size)].filter(Boolean).join(" · ");
  return `<a class="file-row" href="${escapeAttribute(href)}"${target}>
    <span class="file-icon" aria-hidden="true">${escapeHtml(kind.icon)}</span>
    <span class="file-copy"><strong>${escapeHtml(friendlyFileName(item))}</strong><span>${escapeHtml(meta)}</span></span>
    <span class="file-arrow" aria-hidden="true">${external ? "↗" : "→"}</span>
  </a>`;
}

function materialDescription(contents) {
  if (!contents?.length) return "Åbn undervisningsgangen for at se slides, øvelser, kode og forberedelse.";
  const labels = [...new Set(contents.map((item) => fileKind(item).label.toLocaleLowerCase("da-DK")))];
  return `Indeholder ${labels.slice(0, 3).join(", ")}${labels.length > 3 ? " og mere" : ""}.`;
}

function renderMaterialCard(material) {
  const expanded = state.expandedMaterials.has(material.path);
  const loading = state.materialLoading.has(material.path);
  const error = state.materialErrors.get(material.path);
  const contents = state.materialContents.get(material.path);
  const status = materialStatus(material);
  const month = material.date ? new Intl.DateTimeFormat("da-DK", { timeZone: "UTC", month: "short" }).format(material.date) : "dato";
  const day = material.date ? new Intl.DateTimeFormat("da-DK", { timeZone: "UTC", day: "numeric" }).format(material.date) : "–";
  const currentClass = status.className === "is-now" ? " is-current" : "";

  let details = "";
  if (expanded) {
    if (loading && !contents) {
      details = `<div class="material-details"><div class="loading-state"><div><strong>Henter mappens indhold…</strong><span>Der bruges GitHubs contents API.</span></div></div></div>`;
    } else if (error && !contents) {
      details = `<div class="material-details"><div class="error-state"><div><strong>Indholdet kunne ikke hentes</strong><span>${escapeHtml(error)}</span></div></div></div>`;
    } else {
      details = `<div class="material-details"><div class="file-list">${(contents || []).map(renderFileRow).join("") || `<div class="empty-state"><div><strong>Mappen er tom</strong></div></div>`}</div></div>`;
    }
  }

  return `<article class="material-card${currentClass}">
    <div class="material-card-header">
      <div class="material-date"><span>${escapeHtml(month)}</span><span>${escapeHtml(day)}</span></div>
      <div class="material-title"><h2>${escapeHtml(material.title)}</h2><p>${material.date ? escapeHtml(formatDate(material.date, { weekday: "long" })) : "Dato ikke fundet"}</p></div>
      <span class="status-badge ${status.className}">${escapeHtml(status.text)}</span>
    </div>
    <div class="material-card-body">
      <p class="material-description">${escapeHtml(materialDescription(contents))}</p>
      <div class="material-actions">
        <button class="button small primary" type="button" data-action="toggle-material" data-path="${escapeAttribute(material.path)}" aria-expanded="${expanded}">${expanded ? "Skjul indhold" : "Se indhold"}</button>
        <a class="button small secondary" href="${escapeAttribute(material.html_url || treeUrl(material.path))}" target="_blank" rel="noreferrer">GitHub ↗</a>
      </div>
    </div>
    ${details}
  </article>`;
}

function renderMaterials() {
  const query = state.materialSearch.trim().toLocaleLowerCase("da-DK");
  let materials = state.materials.filter((material) => `${material.title} ${material.name}`.toLocaleLowerCase("da-DK").includes(query));
  materials = [...materials].sort((a, b) => {
    const aTime = a.date?.getTime() || 0;
    const bTime = b.date?.getTime() || 0;
    return state.materialSort === "newest" ? bTime - aTime : aTime - bTime;
  });

  return `<div class="page">
    ${pageHeader({
      kicker: "Undervisningsgange",
      title: "Materialer",
      description: "Repoets datomapper omsat til kort med direkte adgang til slides, øvelser, kode og forberedelse.",
      actions: linkButton("Åbn materialemappen", treeUrl("material"), "secondary", true)
    })}
    <div class="toolbar">
      <label class="search-field" for="material-search"><span aria-hidden="true">⌕</span><input id="material-search" type="search" value="${escapeAttribute(state.materialSearch)}" placeholder="Søg efter en undervisningsgang"></label>
      <div class="filter-pills" aria-label="Sortér materialer">
        <button class="filter-pill${state.materialSort === "chronological" ? " is-active" : ""}" type="button" data-action="material-sort" data-sort="chronological">Kronologisk</button>
        <button class="filter-pill${state.materialSort === "newest" ? " is-active" : ""}" type="button" data-action="material-sort" data-sort="newest">Nyeste først</button>
      </div>
    </div>
    ${materials.length ? `<div class="material-grid">${materials.map(renderMaterialCard).join("")}</div>` : `<div class="empty-state"><div><strong>Ingen materialer matcher</strong><span>Prøv et andet søgeord.</span></div></div>`}
    <section class="section">${sourceBanner()}</section>
  </div>`;
}

function renderAssignmentCard(assignment) {
  const status = assignmentStatus(assignment);
  const dateText = assignment.deadline
    ? `${formatDate(assignment.deadline, { weekday: "long" })} · kl. ${assignment.deadlineTime}`
    : assignment.deadlineText;
  return `<article class="assignment-card">
    <div class="assignment-top"><span class="assignment-id">${escapeHtml(assignment.id)}</span><span class="status-badge ${status.className}">${escapeHtml(status.text)}</span></div>
    <h2>${escapeHtml(assignment.title)}</h2>
    <p>${escapeHtml(friendlyTopic(assignment.topic))}</p>
    <div class="assignment-deadline"><strong>${escapeHtml(dateText)}</strong><span>Uge ${escapeHtml(String(assignment.week || "–"))}</span></div>
    <div class="assignment-points">
      <div class="point-cell"><strong>${assignment.reportPoints}</strong><span>rapport</span></div>
      <div class="point-cell"><strong>${assignment.discussionPoints || "–"}</strong><span>samtale</span></div>
      <div class="point-cell"><strong>${assignment.totalPoints}</strong><span>i alt</span></div>
    </div>
  </article>`;
}

function renderAssignments() {
  const assignments = [...state.assignments].sort((a, b) => (a.deadline || 0) - (b.deadline || 0));
  return `<div class="page">
    ${pageHeader({
      kicker: "Hand-ins",
      title: "Afleveringer",
      description: "Deadlines, pointfordeling og de vigtigste afleveringsregler samlet fra kursusinformationen.",
      actions: `${linkButton("Afleveringsregler", routeHref("doc", "assignments/README.md"), "secondary")}${linkButton("Kursusbeskrivelse", routeHref("doc", "courseinformation.md"), "secondary")}`
    })}
    <section class="qualification-banner">
      <div class="qualification-number">13/26</div>
      <div class="qualification-copy"><h2>Krav for eksamenskvalifikation</h2><p>Mindst 50 % af de samlede point samt minimumskravet i operativsystemer, netværk og maskinarkitektur. Kontroller altid den fulde kursusbeskrivelse for gældende regler.</p></div>
    </section>
    <div class="assignment-grid">${assignments.map(renderAssignmentCard).join("")}</div>
    <section class="section two-column">
      <div class="panel">
        <div class="section-header"><div class="section-heading"><h2 class="section-title">Inden aflevering</h2><p class="section-copy">En kort tjekliste fra assignments/README.md.</p></div></div>
        <div class="event-list">
          <article class="event-card"><div class="event-day"><span>1</span><small>navne</small></div><div class="event-copy"><h3>Alle gruppemedlemmer på forsiden</h3><p>Navn og KU-id skal fremgå af rapportens første side.</p></div><span class="status-badge">Påkrævet</span></article>
          <article class="event-card"><div class="event-day"><span>2</span><small>kode</small></div><div class="event-copy"><h3>Aflever kun src.zip</h3><p>Kør make clean og undgå byggede programmer eller meget store testfiler.</p></div><span class="status-badge">Påkrævet</span></article>
          <article class="event-card"><div class="event-day"><span>3</span><small>AI</small></div><div class="event-copy"><h3>Vedlæg AI-erklæring</h3><p>Alle afleveringer skal indeholde den krævede declaration.</p></div><span class="status-badge">Påkrævet</span></article>
        </div>
      </div>
      <div class="panel">
        <div class="section-header"><div class="section-heading"><h2 class="section-title">Grupper og opdateringer</h2><p class="section-copy">Praktiske regler.</p></div></div>
        <p>Opgaverne er beregnet til grupper på helst tre studerende, men to aktive studerende er også muligt. Ved en ny upload skal hele afleveringen indsendes igen; kun den seneste version vurderes.</p>
        <div class="hero-actions">${linkButton("Læs alle regler", routeHref("doc", "assignments/README.md"), "primary")}</div>
      </div>
    </section>
    <section class="section">${sourceBanner()}</section>
  </div>`;
}

function toolHref(item) {
  if (item.type === "dir") return routeHref("repo", item.path);
  if (/\.md$/i.test(item.name)) return routeHref("doc", item.path);
  return item.html_url || blobUrl(item.path);
}

function renderToolCard(item) {
  const meta = friendlyTool(item);
  const href = toolHref(item);
  const external = !href.startsWith("#");
  return `<a class="tool-card" href="${escapeAttribute(href)}"${external ? ' target="_blank" rel="noreferrer"' : ""}>
    <span class="card-icon" aria-hidden="true">${escapeHtml(meta.icon)}</span>
    <h2>${escapeHtml(meta.title)}</h2>
    <p>${escapeHtml(meta.description)}</p>
    <span class="card-footer"><span>${item.type === "dir" ? "Se mappe" : "Læs guide"}</span><span aria-hidden="true">${external ? "↗" : "→"}</span></span>
  </a>`;
}

function renderTools() {
  const tools = state.tools.filter((item) => item.name !== "README.md");
  return `<div class="page">
    ${pageHeader({
      kicker: "Toolchain",
      title: "Værktøjer",
      description: "Start med dit operativsystem, og gå derefter videre til debugger, Make og RISC-V-værktøjerne.",
      actions: linkButton("Læs værktøjsoversigten", routeHref("doc", "tools/README.md"), "secondary")
    })}
    <section class="panel">
      <div class="section-header"><div class="section-heading"><h2 class="section-title">Anbefalet rækkefølge</h2><p class="section-copy">En fungerende terminal og GCC først; GDB og RARS følger senere i kurset.</p></div></div>
      <div class="quick-grid">
        <div class="quick-card"><span class="quick-icon" aria-hidden="true">1</span><span class="quick-copy"><strong>Vælg operativsystem</strong><span>Linux, macOS eller Windows</span></span><span class="quick-arrow">→</span></div>
        <div class="quick-card"><span class="quick-icon" aria-hidden="true">2</span><span class="quick-copy"><strong>Test GCC og Make</strong><span>Byg et lille C-program i terminalen</span></span><span class="quick-arrow">→</span></div>
        <div class="quick-card"><span class="quick-icon" aria-hidden="true">3</span><span class="quick-copy"><strong>Tilføj GDB</strong><span>Debuggeren introduceres tidligt</span></span><span class="quick-arrow">→</span></div>
        <div class="quick-card"><span class="quick-icon" aria-hidden="true">4</span><span class="quick-copy"><strong>Installer RARS</strong><span>Bruges i arkitekturforløbet</span></span><span class="quick-arrow">→</span></div>
      </div>
    </section>
    <section class="section"><div class="tool-grid">${tools.map(renderToolCard).join("")}</div></section>
    <section class="section">${sourceBanner()}</section>
  </div>`;
}

function renderResourceCard(item) {
  const meta = friendlyResource(item);
  const href = item.type === "dir" ? routeHref("repo", item.path) : (item.html_url || blobUrl(item.path));
  const external = !href.startsWith("#");
  return `<a class="resource-card" href="${escapeAttribute(href)}"${external ? ' target="_blank" rel="noreferrer"' : ""}>
    <span class="card-icon" aria-hidden="true">${escapeHtml(meta.icon)}</span>
    <h2>${escapeHtml(meta.title)}</h2>
    <p>${escapeHtml(meta.description)}</p>
    <span class="card-footer"><span>${item.type === "dir" ? "Udforsk ressource" : `Åbn ${formatBytes(item.size) || "fil"}`}</span><span aria-hidden="true">${external ? "↗" : "→"}</span></span>
  </a>`;
}

function renderResources() {
  return `<div class="page">
    ${pageHeader({
      kicker: "Supplerende materiale",
      title: "Ressourcer",
      description: "Bøger, noter, simulatorfiler og ekstra forklaringer fra resources-mappen.",
      actions: linkButton("Åbn resources", treeUrl("resources"), "secondary", true)
    })}
    <div class="resource-grid">${state.resources.map(renderResourceCard).join("")}</div>
    <section class="section">${sourceBanner()}</section>
  </div>`;
}

function renderCourseInfo() {
  const topics = [
    { icon: "C", title: "C og maskinmodellen", text: "Programforståelse, datarepræsentation, memory og cache." },
    { icon: "OS", title: "Operativsystemer", text: "Processer, scheduling, virtual memory og concurrency." },
    { icon: "NET", title: "Computernetværk", text: "Sockets, HTTP, DNS, transport, routing og sikkerhed." },
    { icon: "CPU", title: "Maskinarkitektur", text: "RISC-V, digital logik, pipelines og mikroarkitektur." }
  ];
  return `<div class="page">
    ${pageHeader({
      kicker: "Praktisk information",
      title: "Kursusinfo",
      description: "De oplysninger man oftest leder efter, med direkte adgang til den fulde kursusbeskrivelse.",
      actions: `${linkButton("Læs hele dokumentet", routeHref("doc", "courseinformation.md"), "primary")}${linkButton("Original på GitHub", blobUrl("courseinformation.md"), "secondary", true)}`
    })}
    <div class="info-grid">
      <article class="info-card"><span class="card-icon" aria-hidden="true">L</span><h2>Forelæsninger</h2><p class="info-value">Mandag 15:15–17:00</p><p class="info-subvalue">Onsdag 13:15–15:00</p></article>
      <article class="info-card"><span class="card-icon" aria-hidden="true">Ø</span><h2>Øvelser</h2><p class="info-value">Mandag 13:15–15:00</p><p class="info-subvalue">Onsdag 15:15–17:00</p></article>
      <article class="info-card"><span class="card-icon" aria-hidden="true">?</span><h2>Café</h2><p class="info-value">Onsdag 10:15–12:00</p><p class="info-subvalue">Primært hjælp til afleveringer og øvelser.</p></article>
      <article class="info-card"><span class="card-icon" aria-hidden="true">EX</span><h2>Eksamen</h2><p class="info-value">4 timer · skriftlig · open book</p><p class="info-subvalue">Egen computer; LLM/GAI er ikke tilladt.</p></article>
      <a class="info-card is-link" href="mailto:m.kirkedal@di.ku.dk"><span class="card-icon" aria-hidden="true">@</span><h2>Administrativ kontakt</h2><p class="info-value">Michael Kirkedal Thomsen</p><p class="info-subvalue">m.kirkedal@di.ku.dk</p><span class="card-footer"><span>Skriv e-mail</span><span>→</span></span></a>
      <article class="info-card"><span class="card-icon" aria-hidden="true">26</span><h2>Eksamenskvalifikation</h2><p class="info-value">Minimum 13 af 26 point</p><p class="info-subvalue">Desuden minimumskrav inden for OS, netværk og arkitektur.</p></article>
    </div>
    <section class="section">
      <div class="section-header"><div class="section-heading"><h2 class="section-title">Kursets fire spor</h2><p class="section-copy">Den faglige struktur bag semesterplanen.</p></div></div>
      <div class="tool-grid">${topics.map((topic) => `<article class="tool-card"><span class="card-icon" aria-hidden="true">${escapeHtml(topic.icon)}</span><h2>${escapeHtml(topic.title)}</h2><p>${escapeHtml(topic.text)}</p></article>`).join("")}</div>
    </section>
    <section class="section two-column">
      <div class="panel"><div class="section-header"><div class="section-heading"><h2 class="section-title">Lokaler</h2><p class="section-copy">Lokaler varierer mellem blok 1 og blok 2.</p></div></div><p>Forelæsninger ligger i HCØ-auditorier, mens øvelserne fordeles mellem NBB og DIKU-pavillonen. Brug den fulde kursusinformation frem for den generelle skemaplan for den konkrete klasse.</p>${linkButton("Se lokalefordelingen", routeHref("doc", "courseinformation.md"), "secondary")}</div>
      <div class="panel"><div class="section-header"><div class="section-heading"><h2 class="section-title">Hvor stiller man spørgsmål?</h2><p class="section-copy">Vælg kanal efter typen af spørgsmål.</p></div></div><p>Administrative og praktiske spørgsmål går til kursusansvarlig. Faglige spørgsmål kan stilles i Absalons diskussionsforum, på den valgfrie Discord eller direkte til øvelser og café.</p></div>
    </section>
    <section class="section">${sourceBanner()}</section>
  </div>`;
}

function repoItemHref(item) {
  if (item.type === "dir") return routeHref("repo", item.path);
  if (/\.md$/i.test(item.name)) return routeHref("doc", item.path);
  return item.html_url || blobUrl(item.path);
}

function renderBreadcrumbs(path) {
  const segments = path.split("/").filter(Boolean);
  const crumbs = [`<a href="#repo">repo</a>`];
  let current = "";
  segments.forEach((segment) => {
    current = normalizeRepoPath(`${current}/${segment}`);
    crumbs.push(`<span aria-hidden="true">/</span><a href="${routeHref("repo", current)}">${escapeHtml(segment)}</a>`);
  });
  return `<nav class="breadcrumbs" aria-label="Sti">${crumbs.join("")}</nav>`;
}

function renderRepoItem(item) {
  const kind = fileKind(item);
  const href = repoItemHref(item);
  const external = !href.startsWith("#");
  const meta = item.type === "dir" ? "Mappe" : [kind.label, formatBytes(item.size)].filter(Boolean).join(" · ");
  return `<a class="repo-item" href="${escapeAttribute(href)}"${external ? ' target="_blank" rel="noreferrer"' : ""}>
    <span class="repo-item-icon" aria-hidden="true">${escapeHtml(kind.icon)}</span>
    <span class="repo-item-copy"><strong>${escapeHtml(item.name)}</strong><span>${escapeHtml(meta)}</span></span>
    <span class="repo-item-arrow" aria-hidden="true">${external ? "↗" : "→"}</span>
  </a>`;
}

function renderRepoBrowser() {
  const path = state.route.path;
  const cached = state.repoCache.get(path);
  const loading = state.repoLoading.has(path);
  const error = state.repoErrors.get(path);
  if ((!cached || !state.repoLive.has(path)) && !loading && !error) queueMicrotask(() => hydrateRepo(path));

  let body;
  if (cached) {
    const items = [...cached].sort((a, b) => {
      if (a.type !== b.type) return a.type === "dir" ? -1 : 1;
      return a.name.localeCompare(b.name, "en", { sensitivity: "base" });
    });
    body = items.length
      ? `<div class="repo-list">${items.map(renderRepoItem).join("")}</div>`
      : `<div class="empty-state"><div><strong>Mappen er tom</strong><span>Der er ingen filer at vise.</span></div></div>`;
  } else if (error) {
    body = `<div class="error-state"><div><strong>Mappen kunne ikke hentes</strong><span>${escapeHtml(error)}</span><div class="hero-actions"><button class="button primary" type="button" data-action="retry-repo" data-path="${escapeAttribute(path)}">Prøv igen</button><a class="button secondary" href="${escapeAttribute(treeUrl(path))}" target="_blank" rel="noreferrer">Åbn på GitHub ↗</a></div></div></div>`;
  } else {
    body = `<div class="loading-state"><div><strong>Henter ${escapeHtml(path || "repoets rod")}…</strong><span>Indholdet læses fra GitHub.</span></div></div>`;
  }

  return `<div class="page">
    ${pageHeader({
      kicker: "Alle filer",
      title: path ? path.split("/").at(-1) : "Repo-browser",
      description: path ? `Indholdet af ${path}.` : "Navigér gennem hele repositoryet uden at miste kursuskonteksten.",
      actions: linkButton("Åbn denne placering", treeUrl(path), "secondary", true)
    })}
    ${renderBreadcrumbs(path)}
    <section class="repo-browser">${body}</section>
    <section class="section">${sourceBanner()}</section>
  </div>`;
}

function documentTitle(path) {
  const name = path.split("/").at(-1) || path;
  const friendly = {
    "courseinformation.md": "Kursusinformation",
    "lectureplan.md": "Ugeplan · original",
    "README.md": path.startsWith("assignments/") ? "Afleveringsregler" : path.startsWith("tools/") ? "Værktøjsoversigt" : "README",
    "linux.md": "Linux-værktøjer",
    "macos.md": "macOS-værktøjer",
    "windows.md": "Windows-værktøjer",
    "rars.md": "RARS"
  };
  return friendly[name] || friendlyFileName({ name });
}

function renderDocument() {
  const path = state.route.path;
  const content = state.docCache.get(path);
  const isLive = state.docLive.has(path);
  const loading = state.docLoading.has(path);
  const error = state.docErrors.get(path);
  if ((!content || !isLive) && !loading && !error) queueMicrotask(() => hydrateDocument(path));

  let body;
  if (content) {
    const rendered = renderMarkdown(content, path);
    const toc = rendered.headings.filter((heading) => heading.level <= 3).slice(0, 16);
    body = `${!isLive ? `<div class="source-banner"><span aria-hidden="true">!</span><span><strong>Snapshot vises.</strong> Den live fil indlæses i baggrunden; brug GitHub-linket ved tvivl.</span></div>` : ""}
      <div class="markdown-shell">
        <article class="markdown-body">${rendered.html}</article>
        ${toc.length ? `<nav class="document-nav" aria-label="Indholdsfortegnelse"><strong>På denne side</strong>${toc.map((heading) => `<a href="${routeHref("doc", path)}#${encodeURIComponent(heading.id)}">${escapeHtml(heading.title)}</a>`).join("")}</nav>` : ""}
      </div>`;
  } else if (error) {
    body = `<div class="error-state"><div><strong>Dokumentet kunne ikke hentes</strong><span>${escapeHtml(error)}</span><div class="hero-actions"><button class="button primary" type="button" data-action="retry-doc" data-path="${escapeAttribute(path)}">Prøv igen</button><a class="button secondary" href="${escapeAttribute(blobUrl(path))}" target="_blank" rel="noreferrer">Åbn på GitHub ↗</a></div></div></div>`;
  } else {
    body = `<div class="loading-state"><div><strong>Henter dokumentet…</strong><span>${escapeHtml(path)}</span></div></div>`;
  }

  const parent = dirname(path);
  return `<div class="page">
    ${pageHeader({
      kicker: "Dokument",
      title: documentTitle(path),
      description: path,
      actions: `${linkButton(parent ? "Til mappen" : "Til repoet", routeHref("repo", parent), "secondary")}${linkButton("Original på GitHub", blobUrl(path), "secondary", true)}`
    })}
    ${body}
  </div>`;
}

function renderCurrentRoute() {
  switch (state.route.name) {
    case "ugeplan": return renderSchedule();
    case "materialer": return renderMaterials();
    case "afleveringer": return renderAssignments();
    case "vaerktoejer": return renderTools();
    case "ressourcer": return renderResources();
    case "kursusinfo": return renderCourseInfo();
    case "repo": return renderRepoBrowser();
    case "doc": return renderDocument();
    case "overblik":
    default: return renderOverview();
  }
}

state.materialLive = new Set();
state.repoLive = new Set();

async function fetchWithTimeout(url, options = {}, timeout = 4500) {
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), timeout);
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      credentials: "omit",
      headers: {
        Accept: "application/vnd.github+json, text/plain;q=0.9, */*;q=0.8",
        ...(options.headers || {})
      }
    });
    if (!response.ok) {
      const rateLimit = response.headers.get("x-ratelimit-remaining") === "0" ? " (API-rate limit nået)" : "";
      throw new Error(`GitHub svarede med ${response.status}${rateLimit}`);
    }
    return response;
  } catch (error) {
    if (error?.name === "AbortError") throw new Error("Forbindelsen til GitHub tog for lang tid");
    throw error;
  } finally {
    window.clearTimeout(timer);
  }
}

async function fetchJson(url, timeout) {
  const response = await fetchWithTimeout(url, {}, timeout);
  return response.json();
}

async function fetchText(url, timeout) {
  const response = await fetchWithTimeout(url, {}, timeout);
  return response.text();
}

function normalizeApiItems(value) {
  if (!Array.isArray(value)) throw new Error("GitHub returnerede et uventet format");
  return value.map((item) => ({
    name: item.name,
    path: item.path,
    type: item.type,
    size: Number(item.size || 0),
    html_url: item.html_url || (item.type === "dir" ? treeUrl(item.path) : blobUrl(item.path)),
    download_url: item.download_url || null
  }));
}

async function loadGlobalData() {
  const tasks = [
    async () => {
      const markdown = await fetchText(rawUrl("lectureplan.md"));
      const parsed = parseLecturePlan(markdown);
      if (parsed.length < 5) throw new Error("Ugeplanen kunne ikke fortolkes");
      state.schedule = parsed;
      state.docCache.set("lectureplan.md", markdown);
      state.docLive.add("lectureplan.md");
    },
    async () => {
      const markdown = await fetchText(rawUrl("courseinformation.md"));
      const parsed = parseAssignments(markdown);
      if (parsed.length) state.assignments = parsed;
      state.docCache.set("courseinformation.md", markdown);
      state.docLive.add("courseinformation.md");
    },
    async () => {
      const items = normalizeApiItems(await fetchJson(apiContentsUrl("material")));
      state.materials = items.filter((item) => item.type === "dir").map(normalizeMaterial);
      state.repoCache.set("material", items);
      state.repoLive.add("material");
    },
    async () => {
      const items = normalizeApiItems(await fetchJson(apiContentsUrl("tools")));
      state.tools = items;
      state.repoCache.set("tools", items);
      state.repoLive.add("tools");
    },
    async () => {
      const items = normalizeApiItems(await fetchJson(apiContentsUrl("resources")));
      state.resources = items;
      state.repoCache.set("resources", items);
      state.repoLive.add("resources");
    },
    async () => {
      const commits = await fetchJson(`${API_BASE}/commits?sha=${encodeURIComponent(CONFIG.branch)}&per_page=5`);
      if (!Array.isArray(commits)) throw new Error("Commitlisten kunne ikke fortolkes");
      state.commits = commits.map(commitFromApi);
    },
    async () => {
      const items = normalizeApiItems(await fetchJson(apiContentsUrl("")));
      state.repoCache.set("", items);
      state.repoLive.add("");
    }
  ];

  const results = await Promise.allSettled(tasks.map((task) => task()));
  state.liveSections = results.filter((result) => result.status === "fulfilled").length;
  state.globalErrors = results
    .filter((result) => result.status === "rejected")
    .map((result) => result.reason?.message || "Ukendt fejl");
  state.globalLoaded = true;
  renderApp({ preserveFocus: true });
}

async function hydrateMaterial(path, force = false) {
  if (state.materialLoading.has(path)) return;
  if (state.materialLive.has(path) && !force) return;
  state.materialLoading.add(path);
  state.materialErrors.delete(path);
  renderApp({ preserveFocus: true });
  try {
    const items = normalizeApiItems(await fetchJson(apiContentsUrl(path)));
    state.materialContents.set(path, items);
    state.repoCache.set(path, items);
    state.materialLive.add(path);
    state.repoLive.add(path);
  } catch (error) {
    state.materialErrors.set(path, error?.message || "Ukendt fejl");
  } finally {
    state.materialLoading.delete(path);
    if (state.route.name === "materialer") renderApp({ preserveFocus: true });
  }
}

async function hydrateRepo(path, force = false) {
  if (state.repoLoading.has(path)) return;
  if (state.repoLive.has(path) && !force) return;
  state.repoLoading.add(path);
  state.repoErrors.delete(path);
  if (state.route.name === "repo" && state.route.path === path) renderApp({ preserveFocus: true });
  try {
    const items = normalizeApiItems(await fetchJson(apiContentsUrl(path)));
    state.repoCache.set(path, items);
    state.repoLive.add(path);
    if (path.startsWith("material/") && path.split("/").length === 2) {
      state.materialContents.set(path, items);
      state.materialLive.add(path);
    }
  } catch (error) {
    state.repoErrors.set(path, error?.message || "Ukendt fejl");
  } finally {
    state.repoLoading.delete(path);
    if (state.route.name === "repo" && state.route.path === path) renderApp({ preserveFocus: true });
  }
}

async function hydrateDocument(path, force = false) {
  if (!path || state.docLoading.has(path)) return;
  if (state.docLive.has(path) && !force) return;
  state.docLoading.add(path);
  state.docErrors.delete(path);
  if (state.route.name === "doc" && state.route.path === path) renderApp({ preserveFocus: true });
  try {
    const markdown = await fetchText(rawUrl(path));
    state.docCache.set(path, markdown);
    state.docLive.add(path);
    if (path === "lectureplan.md") {
      const parsed = parseLecturePlan(markdown);
      if (parsed.length) state.schedule = parsed;
    }
    if (path === "courseinformation.md") {
      const parsed = parseAssignments(markdown);
      if (parsed.length) state.assignments = parsed;
    }
  } catch (error) {
    state.docErrors.set(path, error?.message || "Ukendt fejl");
  } finally {
    state.docLoading.delete(path);
    if (state.route.name === "doc" && state.route.path === path) renderApp({ preserveFocus: true });
  }
}

function updateNavigation() {
  const active = activeNavigationRoute();
  document.querySelectorAll("#primary-nav a[data-route]").forEach((link) => {
    if (link.dataset.route === active) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
}

function updateSourceStatus() {
  const status = document.getElementById("source-status");
  if (!status) return;
  status.classList.remove("is-live", "is-fallback");
  if (!state.globalLoaded) {
    status.innerHTML = `<span class="status-dot" aria-hidden="true"></span><span>Indlæser fra GitHub…</span>`;
  } else if (state.liveSections > 0) {
    status.classList.add("is-live");
    status.innerHTML = `<span class="status-dot" aria-hidden="true"></span><span>Live fra GitHub</span>`;
  } else {
    status.classList.add("is-fallback");
    status.innerHTML = `<span class="status-dot" aria-hidden="true"></span><span>Viser lokalt snapshot</span>`;
  }
}

function captureFocus() {
  const active = document.activeElement;
  if (!(active instanceof HTMLInputElement) && !(active instanceof HTMLTextAreaElement)) return null;
  return {
    id: active.id,
    start: active.selectionStart,
    end: active.selectionEnd
  };
}

function restoreFocus(snapshot) {
  if (!snapshot?.id) return;
  requestAnimationFrame(() => {
    const element = document.getElementById(snapshot.id);
    if (!(element instanceof HTMLInputElement) && !(element instanceof HTMLTextAreaElement)) return;
    element.focus({ preventScroll: true });
    try {
      element.setSelectionRange(snapshot.start, snapshot.end);
    } catch {
      // Some input types do not support selection ranges.
    }
  });
}

function renderApp({ focusMain = false, preserveFocus = false } = {}) {
  const focusSnapshot = preserveFocus ? captureFocus() : null;
  const main = document.getElementById("main-content");
  if (!main) return;
  main.innerHTML = renderCurrentRoute();
  updateNavigation();
  updateSourceStatus();

  if (focusMain) main.focus({ preventScroll: true });
  if (focusSnapshot) restoreFocus(focusSnapshot);

  if (state.route.anchor) {
    requestAnimationFrame(() => {
      const target = document.getElementById(state.route.anchor);
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  } else if (focusMain) {
    window.scrollTo({ top: 0, behavior: "auto" });
  }
}

function setSidebarOpen(open) {
  document.body.classList.toggle("sidebar-open", open);
  const button = document.getElementById("menu-button");
  if (button) button.setAttribute("aria-expanded", String(open));
}

function preferredTheme() {
  try {
    const stored = localStorage.getItem("compsys-theme");
    if (stored === "light" || stored === "dark") return stored;
  } catch {
    // localStorage may be disabled.
  }
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", theme === "dark" ? "#0f111b" : "#171a2b");
  try {
    localStorage.setItem("compsys-theme", theme);
  } catch {
    // localStorage may be disabled.
  }
}

function toggleTheme() {
  applyTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark");
}

function showToast(message) {
  const region = document.getElementById("toast-region");
  if (!region) return;
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  region.append(toast);
  window.setTimeout(() => toast.remove(), 3600);
}

function handleMainClick(event) {
  const trigger = event.target.closest("[data-action]");
  if (!trigger) return;
  const action = trigger.dataset.action;

  if (action === "schedule-filter") {
    state.scheduleFilter = trigger.dataset.filter || "Alle";
    renderApp({ preserveFocus: true });
    return;
  }

  if (action === "material-sort") {
    state.materialSort = trigger.dataset.sort === "newest" ? "newest" : "chronological";
    renderApp({ preserveFocus: true });
    return;
  }

  if (action === "toggle-material") {
    const path = normalizeRepoPath(trigger.dataset.path || "");
    if (!path) return;
    if (state.expandedMaterials.has(path)) {
      state.expandedMaterials.delete(path);
      renderApp({ preserveFocus: true });
    } else {
      state.expandedMaterials.add(path);
      renderApp({ preserveFocus: true });
      hydrateMaterial(path);
    }
    return;
  }

  if (action === "retry-repo") {
    const path = normalizeRepoPath(trigger.dataset.path || "");
    state.repoErrors.delete(path);
    hydrateRepo(path, true);
    return;
  }

  if (action === "retry-doc") {
    const path = normalizeRepoPath(trigger.dataset.path || "");
    state.docErrors.delete(path);
    hydrateDocument(path, true);
  }
}

function handleMainInput(event) {
  const target = event.target;
  if (!(target instanceof HTMLInputElement)) return;
  if (target.id === "schedule-search") {
    state.scheduleSearch = target.value;
    renderApp({ preserveFocus: true });
  }
  if (target.id === "material-search") {
    state.materialSearch = target.value;
    renderApp({ preserveFocus: true });
  }
}

function handleRouteChange() {
  state.route = parseRoute();
  setSidebarOpen(false);
  renderApp({ focusMain: true });
}

function bindShellEvents() {
  document.getElementById("menu-button")?.addEventListener("click", () => setSidebarOpen(!document.body.classList.contains("sidebar-open")));
  document.getElementById("sidebar-scrim")?.addEventListener("click", () => setSidebarOpen(false));
  document.getElementById("theme-button")?.addEventListener("click", toggleTheme);
  document.getElementById("mobile-theme-button")?.addEventListener("click", toggleTheme);
  document.getElementById("main-content")?.addEventListener("click", handleMainClick);
  document.getElementById("main-content")?.addEventListener("input", handleMainInput);
  document.getElementById("primary-nav")?.addEventListener("click", () => setSidebarOpen(false));
  window.addEventListener("hashchange", handleRouteChange);
  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setSidebarOpen(false);
  });
}

function init() {
  applyTheme(preferredTheme());
  bindShellEvents();
  if (!window.location.hash) history.replaceState(null, "", "#overblik");
  state.route = parseRoute();
  renderApp();
  loadGlobalData().catch((error) => {
    state.globalLoaded = true;
    state.globalErrors = [error?.message || "Ukendt fejl"];
    updateSourceStatus();
    showToast("GitHub-data kunne ikke hentes; snapshot vises i stedet.");
  });
}

init();
