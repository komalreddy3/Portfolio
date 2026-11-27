// Command Registry - all terminal commands
import { getNode, listDirectory, resolvePath } from "../virtualFS";
import { portfolioData as pd } from "../data/portfolioData";

const BANNER = `
██████╗  ██████╗ ██████╗
██╔══██╗██╔════╝██╔═══██╗
██║  ██║██║     ██║   ██║
██║  ██║██║     ██║▄▄ ██║
██████╔╝╚██████╗╚██████╔╝
╚═════╝  ╚═════╝ ╚══▀▀═╝  v1.0
Developer Code Quest — by ${pd.character.name}
Type "help" to see available commands.
`.trim();

function pushLines(setState, lines) {
  setState((prev) => ({
    ...prev,
    terminalOutput: [...prev.terminalOutput, ...lines],
  }));
}

function push(setState, text, type = "") {
  setState((prev) => ({
    ...prev,
    terminalOutput: [
      ...prev.terminalOutput,
      { text: String(text), type },
    ],
  }));
}

export const commandRegistry = {
  help: {
    description: "Show available commands",
    execute({ setState }) {
      const lines = [
        { text: "Available commands:", type: "banner" },
        { text: "", type: "" },
        { text: "  whoami         Print developer identity", type: "muted" },
        { text: "  bio            Developer background and story", type: "muted" },
        { text: "  ls [path]      List files in directory", type: "muted" },
        { text: "  cd <path>      Change directory", type: "muted" },
        { text: "  cat <file>     Read file content (opens in editor)", type: "muted" },
        { text: "  pwd            Print working directory", type: "muted" },
        { text: "  skills         Show technical skill categories", type: "muted" },
        { text: "  projects       List all projects / quests", type: "muted" },
        { text: "  experience     Show career timeline", type: "muted" },
        { text: "  contact        Show contact information", type: "muted" },
        { text: "  quests         List discovery quests", type: "muted" },
        { text: "  hint <quest>   Get a hint for a quest (1-5)", type: "muted" },
        { text: "  history        Show command history", type: "muted" },
        { text: "  clear          Clear terminal", type: "muted" },
        { text: "  reset --all    Reset all progress (with confirmation)", type: "muted" },
        { text: "", type: "" },
        { text: "  Keyboard: ↑↓ history  Tab autocomplete  Ctrl+L clear", type: "muted" },
      ];
      pushLines(setState, lines);
    },
  },

  whoami: {
    description: "Print developer identity",
    execute({ setState }) {
      const c = pd.character;
      const lines = [
        { text: `${c.name}`, type: "banner" },
        { text: `Role    : ${c.role}`, type: "" },
        { text: `Location: ${c.location}`, type: "" },
        { text: `Guild   : ${c.currentGuild}`, type: "" },
        { text: `Status  : ${c.status}`, type: "muted" },
      ];
      pushLines(setState, lines);
    },
  },

  bio: {
    description: "Print developer bio",
    execute({ setState }) {
      const lines = [
        { text: "[ Bio ]", type: "banner" },
        ...pd.character.bio.map((p) => ({ text: p, type: "" })),
      ];
      pushLines(setState, lines);
    },
  },

  ls: {
    description: "List directory contents",
    execute({ state, setState }, args) {
      const target = args.trim() || state.cwd || "/";
      const resolved = target.startsWith("/") ? target : resolvePath(state.cwd || "/", target);
      const node = getNode(resolved);
      if (!node) {
        push(setState, `ls: cannot access '${target}': No such file or directory`, "error");
        return;
      }
      if (node !== "DIR") {
        push(setState, `ls: '${target}' is not a directory`, "error");
        return;
      }
      const entries = listDirectory(resolved);
      if (entries.length === 0) {
        push(setState, "(empty directory)", "muted");
        return;
      }
      const discovered = {};
      entries.forEach((e) => { discovered[e.path] = true; });
      const line = entries
        .map((e) => (e.isDir ? `${e.name}/` : e.name))
        .join("  ");
      setState((prev) => ({
        ...prev,
        discovered: { ...prev.discovered, ...discovered },
        terminalOutput: [...prev.terminalOutput, { text: line, type: "" }],
      }));
    },
  },

  cd: {
    description: "Change directory",
    execute({ state, setState }, args) {
      const target = args.trim() || "/";
      const resolved = resolvePath(state.cwd || "/", target);
      const node = getNode(resolved);
      if (node === "DIR") {
        setState((prev) => ({
          ...prev,
          cwd: resolved,
          terminalOutput: [...prev.terminalOutput, { text: `${resolved}`, type: "muted" }],
        }));
      } else {
        push(setState, `cd: no such directory: ${target}`, "error");
      }
    },
  },

  pwd: {
    description: "Print working directory",
    execute({ state, setState }) {
      push(setState, state.cwd || "/");
    },
  },

  cat: {
    description: "Display file and open in editor",
    execute({ state, setState }, args) {
      const target = args.trim();
      if (!target) {
        push(setState, "cat: missing file operand", "error");
        return;
      }
      const resolved = target.startsWith("/") ? target : resolvePath(state.cwd || "/", target);
      const node = getNode(resolved);
      if (!node) {
        push(setState, `cat: ${target}: No such file or directory`, "error");
        return;
      }
      if (node === "DIR") {
        push(setState, `cat: ${target}: Is a directory`, "error");
        return;
      }
      setState((prev) => ({
        ...prev,
        discovered: { ...prev.discovered, [resolved]: true },
        editorFile: resolved,
        editorContent: node,
        editorOpen: true,
        terminalOutput: [...prev.terminalOutput, { text: `Opening ${resolved} in editor...`, type: "muted" }],
      }));
    },
  },

  skills: {
    description: "Show tech skills",
    execute({ setState }) {
      const lines = [
        { text: "[ Technical Skills ]", type: "banner" },
        ...pd.skillCategories.flatMap((cat) => [
          { text: `\n${cat.title}`, type: "" },
          ...cat.skills.map((s) => ({ text: `  · ${s.name}`, type: "muted" })),
        ]),
        { text: "", type: "" },
        { text: "Run 'cat /skills.md' for detailed context.", type: "muted" },
      ];
      pushLines(setState, lines);
    },
  },

  projects: {
    description: "List all projects",
    execute({ setState }) {
      const lines = [
        { text: "[ Projects / Quests ]", type: "banner" },
        ...pd.quests.map((q, i) => ({
          text: `  [${String(i + 1).padStart(2, "0")}] ${q.shortTitle} — ${q.difficulty} · ${q.tier}`,
          type: "muted",
        })),
        { text: "", type: "" },
        { text: "Run 'ls /projects/' then 'cat /projects/<id>.md' for details.", type: "muted" },
      ];
      pushLines(setState, lines);
    },
  },

  experience: {
    description: "Show career timeline",
    execute({ setState }) {
      const lines = [
        { text: "[ Career Timeline ]", type: "banner" },
        ...pd.careerPath.map((c) => ({
          text: `  [${c.level}] ${c.role} @ ${c.company} (${c.period})`,
          type: c.isCurrent ? "success" : "muted",
        })),
        { text: "", type: "" },
        { text: "Run 'ls /experience/' then 'cat /experience/<id>.md' for full details.", type: "muted" },
      ];
      pushLines(setState, lines);
    },
  },

  contact: {
    description: "Show contact info",
    execute({ setState }) {
      const c = pd.character;
      const lines = [
        { text: "[ Contact ]", type: "banner" },
        { text: `  Email   : ${c.email}`, type: "" },
        { text: `  GitHub  : ${c.github}`, type: "" },
        { text: `  LinkedIn: ${c.linkedin}`, type: "" },
        { text: `  Discord : ${c.discord}`, type: "" },
        { text: `  Location: ${c.location}`, type: "" },
      ];
      pushLines(setState, lines);
    },
  },

  quests: {
    description: "List discovery quests",
    execute({ state, setState }) {
      const questFiles = [
        { num: 1, name: "Identity",    id: "01-identity",  path: "/quests/01-identity.md" },
        { num: 2, name: "Tech Stack",  id: "02-techstack", path: "/quests/02-techstack.md" },
        { num: 3, name: "Projects",    id: "03-projects",  path: "/quests/03-projects.md" },
        { num: 4, name: "Career",      id: "04-career",    path: "/quests/04-career.md" },
        { num: 5, name: "Hidden",      id: "05-hidden",    path: "/quests/05-hidden.md" },
      ];
      const lines = [
        { text: "[ Discovery Quests ]", type: "banner" },
        { text: "", type: "" },
        ...questFiles.map((q) => {
          const done = !!state.completedChallenges?.[q.id];
          return {
            text: `  [${done ? "✓" : " "}] Quest ${q.num}: ${q.name} — cat ${q.path}`,
            type: done ? "success" : "muted",
          };
        }),
        { text: "", type: "" },
        { text: "Run 'cat /quests/<file>' to open a quest.", type: "muted" },
        { text: "Run 'hint <1-5>' for a hint.", type: "muted" },
      ];
      pushLines(setState, lines);
    },
  },

  hint: {
    description: "Get a quest hint",
    execute({ setState }, args) {
      const hints = [
        "Quest 1 (Identity): Run `cat /about.md` and then explore `/hidden/`.",
        "Quest 2 (Tech Stack): Run `cat /skills.md` and `ls /experience/`.",
        "Quest 3 (Projects): Run `ls /projects/` and open at least 3 project files.",
        "Quest 4 (Career): Run `ls /experience/` and read all 4 milestone files.",
        "Quest 5 (Hidden): Run `ls /hidden/` — look for files starting with a dot.",
      ];
      const num = parseInt(args.trim(), 10);
      if (num >= 1 && num <= 5) {
        push(setState, `Hint [Quest ${num}]: ${hints[num - 1]}`, "warn");
      } else {
        push(setState, "hint: provide a quest number 1-5. E.g. 'hint 1'", "error");
      }
    },
  },

  history: {
    description: "Show command history",
    execute({ state, setState }) {
      const h = state.commandHistory || [];
      if (h.length === 0) {
        push(setState, "(no history)", "muted");
      } else {
        const lines = h
          .slice()
          .reverse()
          .map((cmd, i) => ({ text: `  ${String(i + 1).padStart(3)}: ${cmd}`, type: "muted" }));
        pushLines(setState, [{ text: "[ Command History ]", type: "banner" }, ...lines]);
      }
    },
  },

  clear: {
    description: "Clear terminal",
    execute({ setState }) {
      setState((prev) => ({ ...prev, terminalOutput: [] }));
    },
  },

  reset: {
    description: "Reset all progress (use: reset --all)",
    execute({ state, setState }, args) {
      if (args.trim() !== "--all") {
        push(setState, "Usage: reset --all", "error");
        return;
      }
      setState((prev) => ({ ...prev, resetModalOpen: true }));
    },
  },

  explore: {
    description: "Open the file explorer",
    execute({ setState }) {
      setState((prev) => ({ ...prev, explorerOpen: true }));
      push(setState, "Explorer opened. Use Ctrl+E to toggle.", "muted");
    },
  },

  sudo: {
    description: "Elevated commands",
    execute({ setState, unlockAchievement }, args) {
      if (args.trim() === "hire komal") {
        const lines = [
          { text: "🎉 [OFFER PROTOCOL INITIALIZED]", type: "banner" },
          { text: "", type: "" },
          { text: "Komal is actively exploring software engineering roles.", type: "" },
          { text: "Specializations: Distributed Systems, Full-Stack Web, Healthcare Tech", type: "muted" },
          { text: "", type: "" },
          { text: "📬 Contact:", type: "" },
          { text: `  Email:    ${pd.character.email}`, type: "" },
          { text: `  LinkedIn: ${pd.character.linkedin}`, type: "" },
          { text: `  GitHub:   ${pd.character.github}`, type: "" },
          { text: "", type: "" },
          { text: "🏆 Achievement unlocked: VIP Candidate Pass (+250 XP)!", type: "success" },
        ];
        pushLines(setState, lines);
        if (unlockAchievement) {
          unlockAchievement("vip-hire", "VIP Candidate Pass", "Triggered the secret hire protocol.", "🌟", 250);
        }
      } else {
        push(setState, `[ROOT] Unknown sudo command. Try: sudo hire komal`, "warn");
      }
    },
  },
};

export function runCommand(input, context) {
  const trimmed = input.trim();
  if (!trimmed) return;

  // Record in history (session-only)
  context.setState((prev) => ({
    ...prev,
    commandHistory: [trimmed, ...(prev.commandHistory || []).slice(0, 49)],
    terminalOutput: [
      ...prev.terminalOutput,
      { text: `$ ${trimmed}`, type: "cmd" },
    ],
  }));

  // Parse: first word = command, rest = args
  const parts = trimmed.split(/\s+/);
  const cmd = parts[0].toLowerCase();
  const args = parts.slice(1).join(" ");

  // Special case: "sudo hire komal"
  const fullCmd = `${cmd} ${args}`.trim().toLowerCase();
  if (fullCmd.startsWith("sudo ")) {
    const entry = commandRegistry["sudo"];
    if (entry) {
      entry.execute(context, args);
      return;
    }
  }

  const entry = commandRegistry[cmd];
  if (!entry) {
    context.setState((prev) => ({
      ...prev,
      terminalOutput: [
        ...prev.terminalOutput,
        { text: `Command not found: ${cmd}. Type 'help' for available commands.`, type: "error" },
      ],
    }));
    return;
  }

  entry.execute(context, args);
}
