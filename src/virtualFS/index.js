// Virtual Filesystem - mirrors portfolioData as navigable file tree
import { portfolioData as pd } from "../data/portfolioData";

const { character, careerPath, quests, skillCategories } = pd;

// ---- Build the virtual filesystem ----------------------------------------
function buildFS() {
  const files = {};

  // /README.md - welcome file
  files["/README.md"] = `# ${character.name}'s Developer Code Quest

> ${character.tagline}

## Quick Start
Type \`help\` in the terminal to see all available commands.
Type \`cat /about.md\` to read about me.
Type \`ls\` to explore the file system.

## Available Quests
Run \`ls /quests/\` to see all available discovery quests.

---
*${character.status}*
`;

  // /about.md
  files["/about.md"] = `# About Me

**${character.name}**
${character.role} · ${character.location}

${character.bio.join("\n\n")}

## Education
Graduated from ${careerPath[0].company} (${careerPath[0].period})
${careerPath[0].summary}

## Currently Working At
${character.currentGuild} — ${careerPath[careerPath.length - 1].summary}

## Contact
- Email: ${character.email}
- GitHub: ${character.github}
- LinkedIn: ${character.linkedin}
`;

  // /skills.md
  files["/skills.md"] = skillCategories.map(cat =>
    `## ${cat.title}\n${cat.skills.map(s => `- **${s.name}**: ${s.role}`).join("\n")}`
  ).join("\n\n");

  // /contact.md
  files["/contact.md"] = `# Contact Information

- **Email**: ${character.email}
- **GitHub**: ${character.github}
- **LinkedIn**: ${character.linkedin}
- **Discord**: ${character.discord}
- **Location**: ${character.location}
`;

  // /experience/ - one file per career entry
  careerPath.forEach((c) => {
    files[`/experience/${c.id}.md`] = `# ${c.role}
**${c.company}** · ${c.period}
${c.location ? `📍 ${c.location}` : ""}

${c.summary}

## Commit Log
${c.commitLog.map(l => `- ${l}`).join("\n")}

## Tech Stack
${c.techStack.join(", ")}

## Badge
🏆 ${c.badge}
`;
  });

  // /projects/ - one file per project
  quests.forEach((q) => {
    files[`/projects/${q.id}.md`] = `# ${q.title}
**Category**: ${q.category}
**Difficulty**: ${q.difficulty}
**Status**: ${q.status}

${q.desc}

## Engineering Challenges
${q.challenges}

## Tech Stack
${q.techList.join(", ")}

## Links
${q.codeLink ? `- Code: ${q.codeLink}` : ""}
${q.rolllink ? `- Live: ${q.rolllink}` : ""}
`;
  });

  // /quests/ - discovery quest files
  files["/quests/01-identity.md"] = `# Quest 1: Identity
Discover who the developer behind this portfolio is.

## Clues
1. Read /about.md to learn the basics.
2. Find the hidden .secret in /hidden/ directory.
3. Run \`whoami\` in the terminal.

## Unlock Condition
Read /about.md and discover the hidden identity file.

## Hint
The developer is a full-stack engineer who graduated from NIT Manipur.
`;

  files["/quests/02-techstack.md"] = `# Quest 2: Technical Stack
Explore the technologies this developer works with.

## Clues
1. Run \`cat /skills.md\` to see all tech categories.
2. Explore /experience/ to see tech used in real work.
3. Read the most recent career file to find the current stack.

## Unlock Condition
Read both /skills.md and the latest experience file.

## Hint
Look for Kubernetes, Docker, Go, and healthcare-specific tools like DICOM.
`;

  files["/quests/03-projects.md"] = `# Quest 3: Project Investigation
Investigate the developer's built projects in depth.

## Clues
1. Run \`ls /projects/\` to list all projects.
2. Open at least 3 project files using \`cat\`.
3. Find the project involving Machine Learning.

## Unlock Condition
Discover 3 or more project files in /projects/.

## Hint
Look for mrs.md — a movie recommendation system using KNN and TF-IDF.
`;

  files["/quests/04-career.md"] = `# Quest 4: Career Journey
Walk through the full professional timeline.

## Clues
1. Run \`ls /experience/\` to list all career milestones.
2. Read each file from the earliest to the most recent.
3. Find the transition from intern to full engineer.

## Unlock Condition
Read all 4 career milestone files.

## Hint
The journey goes: NIT Manipur → Devtron Intern → Devtron SDE → AppZoy.
`;

  files["/quests/05-hidden.md"] = `# Quest 5: Hidden Developer Insights
Discover the easter eggs and personal insights.

## Clues
1. Run \`ls /hidden/\` to find secret files.
2. Read .fun_facts.md to learn personal tidbits.
3. Try \`sudo hire komal\` in the terminal.

## Unlock Condition
Read the hidden fun facts file.

## Hint
The developer is an avid K-drama watcher who also likes cleaning for fun.
`;

  // /hidden/ - easter eggs
  files["/hidden/.fun_facts.md"] = `# Hidden Developer Insights 🎉

## Fun Facts About Komal
- 🍫 Chocolate is non-negotiable. If cake doesn't have chocolate, it's just bread.
- ❄️ Strongly prefers winter over summer. Sweating is not in the UX spec.
- 🕵️ Claims to be able to debug your code AND your alibi.
- 🧹 Cleans for fun. "It's like debugging real life — instant results, no CI/CD needed."
- 💧 Skincare is a second tech stack. Running on [hydrate(), moisturize(), 'SPF.js'].
- 📺 K-dramas are a serious hobby, not a distraction.

## Personal Tagline
"${character.tagline}"

## Secret Command
Try this in the terminal: \`sudo hire komal\`
`;

  files["/hidden/.secret"] = `IDENTITY UNLOCKED
Name: ${character.name}
Handle: @${character.handle}
Class: ${character.class}
Location: ${character.location}
Current Mission: ${character.status}
`;

  // Build directory nodes from file paths
  const dirs = new Set(["/", "/experience", "/projects", "/quests", "/hidden"]);
  Object.keys(files).forEach((p) => {
    const parts = p.split("/").filter(Boolean);
    let cur = "";
    for (let i = 0; i < parts.length - 1; i++) {
      cur = cur + "/" + parts[i];
      dirs.add(cur);
    }
  });

  const fs = {};
  dirs.forEach((d) => {
    fs[d] = "DIR";
  });
  Object.assign(fs, files);
  return fs;
}

const VFS = buildFS();

export function getNode(path) {
  let p = (path || "/").trim().replace(/\/+$/, "") || "/";
  return VFS[p] ?? null;
}

export function listDirectory(path) {
  let p = (path || "/").trim().replace(/\/+$/, "") || "/";
  const prefix = p === "/" ? "/" : p + "/";
  const results = [];
  const seen = new Set();

  Object.keys(VFS).forEach((key) => {
    if (key === p) return;
    if (!key.startsWith(prefix)) return;
    const rest = key.slice(prefix.length);
    if (!rest) return;
    const segment = rest.split("/")[0];
    if (seen.has(segment)) return;
    seen.add(segment);
    const childPath = p === "/" ? "/" + segment : p + "/" + segment;
    results.push({
      name: segment,
      path: childPath,
      isDir: VFS[childPath] === "DIR",
      isHidden: segment.startsWith("."),
    });
  });

  return results.sort((a, b) => {
    if (a.isDir !== b.isDir) return a.isDir ? -1 : 1;
    return a.name.localeCompare(b.name);
  });
}

export function resolvePath(cwd, target) {
  if (!target || target === "~") return "/";
  if (target.startsWith("/")) return target.replace(/\/+$/, "") || "/";
  if (target === "..") {
    const parts = cwd.split("/").filter(Boolean);
    parts.pop();
    return "/" + parts.join("/");
  }
  if (target === ".") return cwd;
  const base = cwd === "/" ? "" : cwd;
  return base + "/" + target;
}
