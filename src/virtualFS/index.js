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
  files["/quests/01-identity.md"] = `# Quest 1: Clean Up a Profile
Write a JavaScript function that cleans up a name, handle, and location.

## Your Task
Run \`challenge 1\` and finish the \`normalizeIdentity(profile)\` function.

## Extra Things to Find
Read \`/about.md\`, find \`/hidden/.secret\`, and run \`whoami\`.

## Hint
Use the string tools \`trim()\` and \`toLowerCase()\`. Return a new object.
`;

  files["/quests/02-techstack.md"] = `# Quest 2: Remove Duplicate Imaging Events
Write a JavaScript function that removes older copies of imaging updates.

## Your Task
Run \`challenge 2\` and finish the \`dedupeStudyEvents(events)\` function.

## Extra Things to Find
Read \`/experience/appzoy.md\` and \`/skills.md\`, then run \`skills\`.

## Hint
Use the study ID and update type to group events. Keep the event with the largest revision number.
`;

  files["/quests/03-projects.md"] = `# Quest 3: Count Attendance Records
Write a JavaScript function that counts each student's latest valid attendance record.

## Your Task
Run \`challenge 3\` and finish the \`summarizeAttendance(records)\` function.

## Extra Things to Find
Read \`/projects/attendance-go.md\` and \`/projects/mrs.md\`, then run \`projects\`.

## Hint
Keep one record per student. Count records that are invalid or replaced as ignored.
`;

  files["/quests/04-career.md"] = `# Quest 4: Check Which Pods Need Help
Write a JavaScript function that finds pods whose ready count does not match the desired count.

## Your Task
Run \`challenge 4\` and finish the \`reconcilePodEvents(events)\` function.

## Extra Things to Find
Read the files in \`/experience/\`, then run \`experience\`.

## Hint
For each pod, keep the update with the largest revision number. Skip pods that already match.
`;

  files["/quests/05-hidden.md"] = `# Quest 5: Prepare Events to Send Again
Write a JavaScript function that safely prepares events to send after an outage.

## Your Task
Run \`challenge 5\` and finish the \`planSafeReplay(request)\` function.

## Extra Things to Find
Read \`/hidden/.fun_facts.md\`, try \`sudo hire komal\`, and check the contact details.

## Hint
Skip handled and repeated events. Keep their order, send only up to the limit, and count what remains.
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
