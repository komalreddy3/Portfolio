// Centralized Data Layer for Komal Reddy's Portfolio
// Preserves ALL existing data, projects, commit logs, and fun facts.
// NOTE: Zero fake percentage bars! All skills are backed by real production context.

export const portfolioData = {
  character: {
    name: "Komal Reddy Koukuntla",
    handle: "komalreddy3",
    role: "Full-Stack Engineer",
    class: "Full-Stack Engineer",
    baseLevel: 24,
    location: "Hyderabad, India",
    currentGuild: "AppZoy",
    currentGuildUrl: "https://appzoy.com",
    status: "Active Deployment // Building Event-Driven Healthcare Tech",
    tagline: "I engineer full-stack systems where data flows and pixels glow. Debug my journey, inspect my projects, and test my skills. Go ahead, everything's in beta, including me.",
    avatar: "/profile.png",
    email: "workwithkomalreddy@gmail.com",
    discord: "!KomalReddyK",
    discordUrl: "https://discord.com/users/880422564332208168",
    github: "https://github.com/komalreddy3",
    linkedin: "https://www.linkedin.com/in/komalreddyk/",
    resumeUrl: "#", // Direct link to resume

    // Real engineering focus areas (NO fake percentages!)
    coreFocus: [
      {
        title: "Distributed Systems & Event Streams",
        desc: "Event-driven DICOM pipelines with Orthanc & NATS Pub-Sub messaging also GCP Pub/Sub"
      },
      {
        title: "Cloud & Container Orchestration",
        desc: "Docker Swarm, Kubernetes event watchers, Helm charts, Linux systems"
      },
      {
        title: "Healthcare Informatics",
        desc: "DICOM imaging protocols, Orthanc servers, OHIF viewers, HL7 V2 parsers"
      },
      {
        title: "Full-Stack Web & Go Engineering",
        desc: "Modern React.js frontends paired with Node.js APIs, and separate robust Go backend services"
      }
    ],

    // Backstory
    bio: [
      "Hey! I'm Komal Reddy Koukuntla from Hyderabad, India.",
      "I graduated in Computer Science from NIT Manipur (yep, the northeast one!) wrapping up my B.Tech with a shiny 9+ CGPA. Now I'm deep into the full-stack dev world, mostly living in JavaScript & Go land and loving it.",
      "When I'm not battling bugs, you'll probably find me nose-deep in a book, binge-watching K-dramas like it's my job, or… cleaning. Yeah, I clean for fun. Weirdly therapeutic, right? It's like debugging real life: instant results, no deployment needed!"
    ],

    // Fun facts formatted as Character Traits / Perks
    traits: [
      {
        id: "trait-choco",
        emoji: "🍫",
        name: "Chocolate Logic Gate",
        code: "if (sweet == true && chocolate == false) return false;\nif (cake.includes('chocolate')) -> deploy happiness!",
        note: "Non-negotiable sweet tooth condition"
      },
      {
        id: "trait-panic",
        emoji: "🔥",
        name: "Sprint Panic Handler",
        code: "lastMinuteSurprise() => {\n  throw new Error('Why wasn\\'t this in sprint planning?!');\n}",
        note: "Standard production defense mechanism"
      },
      {
        id: "trait-temp",
        emoji: "❄️",
        name: "Thermal Optimization",
        code: "prefers(winter > summer);\n// Sweating is definitely not part of my UX",
        note: "Prefers cold weather and quiet compiler runs"
      },
      {
        id: "trait-sherlock",
        emoji: "🕵️‍♀️",
        name: "Sherlock Debug Protocol",
        code: "canDebug(yourCode && yourAlibi);\n// Elementary, my dear console.log()",
        note: "Investigative debugging specialist"
      },
      {
        id: "trait-clean",
        emoji: "🧹",
        name: "Clean Desk Daemon",
        code: "clean() => rm -rf /mess;\n// Applies recursively to code, Git history & desk",
        note: "Instant results, zero deployment pipeline required"
      },
      {
        id: "trait-skin",
        emoji: "💧",
        name: "Hydration Framework v2",
        code: "runningOn([hydrate(), moisturize(), 'SPF.js']);\n// Skincare is my second tech stack",
        note: "High-priority background thread"
      }
    ]
  },

  // Career progression: Education -> Intern -> SDE -> Current Role
  careerPath: [
    {
      id: "nit-manipur",
      level: 1,
      role: "B.Tech in Computer Science & Engineering",
      company: "National Institute of Technology Manipur",
      period: "2020 - 2024",
      duration: "// 4-Year Campaign Completed",
      logo: null,
      location: "Manipur, India",
      summary: "Graduated with a shiny 9+ CGPA. Built foundational knowledge in algorithms, operating systems, networking, distributed systems, and modern software engineering.",
      commitLog: [
        "init: Enrolled in B.Tech CSE at NIT Manipur (Northeast campus edition).",
        "feat: Mastered Data Structures, Algorithms, OS, Computer Networks & DBMS.",
        "feat: Graduated with honors, bagging a shiny 9+ CGPA milestone.",
        "chore: Survived freezing Northeast winters while writing C++.",
        "deploy: Successfully launched career into high-growth software engineering."
      ],
      techStack: ["C++", "C", "Data Structures", "Algorithms", "DBMS", "Operating Systems", "Computer Networks"],
      badge: "The Foundation"
    },
    {
      id: "devtron-intern",
      level: 2,
      role: "SDE Intern",
      company: "Devtron Inc.",
      period: "Jan 2024 - May 2024",
      duration: "// Jan 2024 - May 2024",
      logo: "/devtron.png",
      location: "Gurugram / Remote",
      summary: "Enhanced Devtron's open-source Kubernetes management platform CLI.",
      commitLog: [
        "Initial commit: 'hello world' -> calm before the storm.",
        "chore: Worked on CLI integrations without breaking whole cluster (Phew!)",
        "feat: Upgraded Devtron's CLI with shiny new commands for update, deletion and notification settings — because who doesn't love more commands?",
        "chore: Learned Linux the hard way — permissions, processes, and why sudo is both friend and enemy.",
        "feat: Finally understood Git beyond `git pull` and `git push` — rebases were scary, but worth it."
      ],
      techStack: ["Go", "Linux", "Cobra CLI", "Kubernetes", "Git"],
      badge: "Cluster Apprentice"
    },
    {
      id: "devtron-sde",
      level: 3,
      role: "Software Development Engineer",
      company: "Devtron Inc.",
      period: "Jun 2024",
      duration: "// Jun 2024",
      logo: "/devtron.png",
      location: "Gurugram / Remote",
      summary: "Designed auto-remediation mechanisms in Go and engineered event-driven communication using NATS pub-sub for Kubernetes orchestration.",
      commitLog: [
        "feat: Added a NATS Pub-Sub model orchestrator and notifier now talk to each other more than the dev team does.",
        "feat: Contributed to development of an auto remediation system in Go, incorporating a watcher mechanism to monitor kubernetes events and reduce manual intervention",
        "docs: Learned that good documentation is also a feature (wrote docs that future-me won't hate).",
        "chore: Fell into the Kubernetes rabbit hole —> pods, services, and why nothing works the first time.",
        "feat: Finally understood Kubernetes networking instead of just copy-pasting YAML (growth moment)."
      ],
      techStack: ["Kubernetes", "Go", "Linux", "Helm", "NATS Pub-Sub"],
      badge: "Orchestration Operative"
    },
    {
      id: "appzoy",
      level: 4,
      role: "Software Engineer",
      company: "AppZoy",
      period: "Jul 2024 - Present",
      duration: "// Jul 2024 - Present (Active Boss Stage)",
      logo: "/appzoy.png",
      location: "Hyderabad, India",
      summary: "Engineering event-driven medical imaging (DICOM/Orthanc) pipelines with NATS and GCP Pub/Sub, HL7 V2 healthcare messaging, dedicated AI microservices, and containerized components deployed with Docker Swarm.",
      commitLog: [
        "feat: Hooked up event-driven DICOM processing with Orthanc, because radiology images apparently enjoy triggering events too.",
        "feat: Integrated HL7 V2 parser for smooth HMS & LIS gossip sessions",
        "feat: Developed AI integrations in a dedicated service using OpenAI APIs",
        "fix: Resolved data-persistence mysteries. Turns out data does like to stay… if you treat it nicely",
        "refactor: Containerized core system components using Docker Swarm with secure secret management",
        "doc: Documented features/bugs so thoroughly even ChatGPT would say: 'Bro, that's enough.'"
      ],
      techStack: ["React", "Node.js", "Docker Swarm", "Python", "DICOM", "Orthanc", "HL7 V2", "OpenAI APIs"],
      badge: "Healthcare Architect",
      isCurrent: true
    }
  ],

  // Quests (Projects) - Preserves all 7 projects with enriched quest metadata
  quests: [
    {
      id: "attendance-go",
      title: "School Attendance Management",
      shortTitle: "Attendance Sentinel",
      category: "Main Quests (Core Systems)",
      difficulty: "Legendary",
      status: "Battle-Tested",
      tier: "Backend & Orchestration",
      tech: "Docker, Kubernetes, Golang, PostgreSQL, JWT, Wire, Mux-Router, Go-PG",
      techList: ["Go", "Kubernetes", "Docker", "PostgreSQL", "JWT", "Wire", "Mux Router"],
      desc: "Robust attendance management microservice backend built in Go with PostgreSQL persistence, JWT-authenticated role management, and Kubernetes deployment manifests.",
      challenges: "Configured dependency injection using Wire, structured clean REST routes with Gorilla Mux, and created containerized K8s deployment manifests for smooth zero-downtime rollouts.",
      img: "",
      rolllink: "",
      codeLink: "https://github.com/komalreddy3/Attendance-go",
      xpReward: 120
    },
    {
      id: "mrs",
      title: "Movie Recommendation System",
      shortTitle: "Movie Matchmaker",
      category: "Main Quests (Core Systems)",
      difficulty: "Epic",
      status: "Live in Production",
      tier: "Machine Learning & UI",
      tech: "Machine Learning, Collaborative Filtering, KNN Classifier, TF-IDF, Streamlit, Python",
      techList: ["Python", "Machine Learning", "KNN", "TF-IDF", "Streamlit", "Pandas"],
      desc: "Smart movie recommendation engine combining content-based TF-IDF vectorization and collaborative filtering KNN algorithms to end late-night movie decision paralysis.",
      challenges: "Handled high-dimensional sparse matrix computations for movie metadata and deployed a responsive, interactive UI on Streamlit Cloud.",
      img: "/mrimage.png",
      rolllink: "https://komalreddy3-mrs1-pd-about-dcybs2.streamlit.app/",
      codeLink: "https://github.com/komalreddy3/MRS1_PD",
      xpReward: 100
    },
    {
      id: "keeper-app",
      title: "Keeper App",
      shortTitle: "Keeper Data Cache",
      category: "Main Quests (Core Systems)",
      difficulty: "Normal",
      status: "Functional",
      tier: "Productivity & State",
      tech: "React.js, HTML5, CSS3, React Hooks",
      techList: ["React.js", "JavaScript", "Hooks", "Component Architecture"],
      desc: "Clean note-keeping web app allowing users to capture thoughts, manage active cards, and dynamically organize ideas with instant client-side updates.",
      challenges: "Built modular React component hierarchy with predictable unidirectional state updates.",
      img: "/noteimage.png",
      rolllink: "https://komalreddy3.github.io/KeeperApp/",
      codeLink: "https://github.com/komalreddy3/KeeperApp",
      xpReward: 75
    },
    {
      id: "simon-game",
      title: "Simon Game",
      shortTitle: "Simon Memory Matrix",
      category: "Side Quests (Arcade & Tools)",
      difficulty: "Normal",
      status: "Playable",
      tier: "Frontend & Audio",
      tech: "React.js, HTML5, CSS3, React Hooks, Audio Synthesis",
      techList: ["React.js", "JavaScript", "Audio Synthesis", "CSS3", "Hooks"],
      desc: "Electronic game of short-term memory lights and audio cues. Players repeat increasingly complex randomized sequence patterns, testing focus and speed.",
      challenges: "Synchronized state machine intervals with procedural audio playback and ensured zero input lag during rapid button clicks.",
      img: "/simonimage.png",
      rolllink: "https://komalreddy3.github.io/SimonGame/",
      codeLink: "https://github.com/komalreddy3/SimonGame",
      xpReward: 80
    },
    {
      id: "drum-kit",
      title: "Drum Kit",
      shortTitle: "Rhythm Protocol Drum Kit",
      category: "Side Quests (Arcade & Tools)",
      difficulty: "Casual",
      status: "Playable",
      tier: "Audio & DOM",
      tech: "JavaScript, HTML5, CSS3, Keyboard Event Listeners",
      techList: ["JavaScript", "HTML5", "CSS3", "DOM Events", "Audio"],
      desc: "Interactive synthesizer kit triggering real acoustic drum kit samples via keyboard listeners (W, A, S, D, J, K, L) or responsive on-screen taps with kinetic animations.",
      challenges: "Handled concurrent audio polyphony and instant keyboard debounce for zero-latency rhythmic play.",
      img: "/drumimage.png",
      rolllink: "https://komalreddy3.github.io/DrumKit/",
      codeLink: "https://github.com/komalreddy3/DrumKit",
      xpReward: 70
    },
    {
      id: "dice-game",
      title: "Dice Game",
      shortTitle: "Dice Fate Simulator",
      category: "Side Quests (Arcade & Tools)",
      difficulty: "Casual",
      status: "Playable",
      tier: "DOM & Animation",
      tech: "JavaScript, HTML5, CSS3",
      techList: ["JavaScript", "HTML5", "CSS3", "DOM Manipulation"],
      desc: "Dynamic two-player randomized dice battle game. Real-time dice face rendering with instant winner declaration algorithms.",
      challenges: "Created clean CSS transforms and random distribution logic for fair, fast rolls.",
      img: "/dcimage.png",
      rolllink: "https://komalreddy3.github.io/dice/",
      codeLink: "https://github.com/komalreddy3/dice",
      xpReward: 60
    },
    {
      id: "counter-app",
      title: "Counter App",
      shortTitle: "Quantum Counter",
      category: "Side Quests (Arcade & Tools)",
      difficulty: "Casual",
      status: "Functional",
      tier: "React Fundamentals",
      tech: "React.js, HTML5, CSS3, React Hooks",
      techList: ["React.js", "Hooks", "CSS3"],
      desc: "Minimalist counter app allowing users to increment, decrement, and reset numerical values through an intuitive, glitch-free UI.",
      challenges: "Implemented clean atomic state transitions with zero unnecessary re-renders.",
      img: "/counterimage.png",
      rolllink: "https://komalreddy3.github.io/CounterApp/",
      codeLink: "https://github.com/komalreddy3/CounterApp",
      xpReward: 50
    }
  ],

  // Tech Stack & Abilities (NO fake percentages! Grouped strictly by category with production context)
  skillCategories: [
    {
      id: "languages",
      title: "Programming Languages",
      icon: "Code",
      skills: [
        { name: "Go", role: "CLI tools, microservices, K8s watchers at Devtron & personal projects" },
        { name: "JavaScript (ES6+)", role: "Daily full-stack development across frontend and Node.js backends" },
        { name: "Python", role: "DICOM integration scripting, ML recommender models, automation" },
        { name: "C++", role: "Core algorithmic foundations & academic coursework at NIT Manipur" },
        { name: "C", role: "Low-level system programming concepts, memory management, and OS labs" }
      ]
    },
    {
      id: "web-tech",
      title: "Web & Frameworks",
      icon: "Globe",
      skills: [
        { name: "React.js", role: "Component architecture, custom hooks, SPA routing, state management" },
        { name: "Node.js", role: "REST APIs, asynchronous event processing, server runtimes" },
        { name: "HTML5", role: "Semantic structure, responsive accessibility, modern DOM APIs" },
        { name: "CSS3 / Modern CSS", role: "Flexbox, CSS Grid, Glassmorphism, animations, responsive design" }
      ]
    },
    {
      id: "databases",
      title: "Databases & Storage",
      icon: "Database",
      skills: [
        { name: "PostgreSQL", role: "Relational modeling, indexing, foreign keys, Go-PG integration" },
        { name: "MySQL", role: "Relational database schema design and transactional queries" },
        { name: "MongoDB", role: "NoSQL document persistence, flexible schema collections" }
      ]
    },
    {
      id: "devops-cloud",
      title: "DevOps & Cloud Orchestration",
      icon: "Cloud",
      skills: [
        { name: "Kubernetes", role: "Pods, services, event watching, controller patterns at Devtron" },
        { name: "Docker & Docker Swarm", role: "Containerization, service secrets, resilient multi-service deployment" },
        { name: "Helm", role: "Package management for Kubernetes cluster configurations" },
        { name: "Linux Systems", role: "Process control, bash scripting, permission architectures, system monitoring" },
        { name: "Git & GitHub", role: "Branching strategies, atomic commits, PR workflows, GitHub Pages" }
      ]
    },
    {
      id: "medical-imaging",
      title: "Healthcare Informatics",
      icon: "Activity",
      skills: [
        { name: "DICOM", role: "Radiology imaging protocol standard, metadata tags, image handling" },
        { name: "Orthanc", role: "Open-source DICOM server configuration & event-driven processing" },
        { name: "OHIF Viewer", role: "Web-based zero-footprint medical imaging viewer integration" },
        { name: "HL7 V2", role: "Healthcare messaging parser bridging Hospital Management Systems (HMS)" }
      ]
    }
  ],

  // Developer Loadout (Inventory metaphor)
  loadout: [
    {
      slot: "Primary Weapon",
      name: "Go & Node.js Engine",
      tier: "Legendary",
      desc: "Fast, concurrent backend runtimes capable of handling real-time streams and microservice APIs."
    },
    {
      slot: "Offhand Sidearm",
      name: "React.js Interface",
      tier: "Epic",
      desc: "Modular UI library for engineering clean, reactive interfaces with predictable state."
    },
    {
      slot: "Defensive Armor",
      name: "Docker Swarm & Kubernetes",
      tier: "Legendary",
      desc: "Isolates environments, manages secrets, and shields production from the 'works on my machine' curse."
    },
    {
      slot: "Specialized Hardware",
      name: "Orthanc & DICOM Router",
      tier: "Epic",
      desc: "Specialized radiology event-processing apparatus designed for hospital-grade image pipelines."
    },
    {
      slot: "Utility Toolbelt",
      name: "Linux Shell & Git",
      tier: "Rare",
      desc: "Essential everyday diagnostic tools for debugging processes and managing clean version control."
    }
  ],

  // Trophy Room / Achievements
  achievements: [
    {
      id: "first-contact",
      title: "First Contact",
      desc: "Landed on Komal's cybernetic portfolio HUD.",
      icon: "🛰️",
      unlockedByDefault: true,
      xp: 50
    },
    {
      id: "recruiter-speedrun",
      title: "Recruiter Fast-Pass",
      desc: "Switched to Recruiter Mode to get straight to the facts.",
      icon: "⚡",
      xp: 100
    },
    {
      id: "quest-inspector",
      title: "Quest Inspector",
      desc: "Opened and inspected project details in the Quest Log.",
      icon: "🔍",
      xp: 75
    },
    {
      id: "tree-climber",
      title: "Skill Tree Master",
      desc: "Explored technical abilities across multiple categories.",
      icon: "🌳",
      xp: 75
    },
    {
      id: "career-traveler",
      title: "Time Traveler",
      desc: "Walked through all 4 stages of Komal's career progression map.",
      icon: "🗺️",
      xp: 100
    },
    {
      id: "terminal-hacker",
      title: "Terminal Hacker",
      desc: "Accessed the developer terminal and executed a command.",
      icon: "💻",
      xp: 150
    },
    {
      id: "audio-enthusiast",
      title: "Sound Engaged",
      desc: "Toggled procedural Web Audio SFX on.",
      icon: "🔊",
      xp: 50
    },
    {
      id: "easter-egg-hire",
      title: "VIP Candidate Pass",
      desc: "Triggered the secret 'sudo hire komal' terminal command.",
      icon: "🌟",
      xp: 250
    },
    {
      id: "bug-law",
      title: "Lubarsky's Disciple",
      desc: "Acknowledged the universal truth: 'There is always one more bug.'",
      icon: "🐛",
      xp: 60
    }
  ],

  // Developer Terminal Commands & Responses
  terminalCommands: {
    help: "Available commands:\n  • bio          - Print Komal's background and story\n  • exp          - List career missions and roles\n  • quests       - List all built projects\n  • skills       - Display technical inventory\n  • contact      - View communication channels\n  • clear        - Clear terminal screen\n  • sudo hire komal - Trigger VIP contract protocol\n  • exit         - Close developer terminal",
    bio: "Komal Reddy Koukuntla // Full-Stack Engineer based in Hyderabad, India.\nNIT Manipur B.Tech CSE (9+ CGPA).\nSpecializes in Full-Stack Web, Event-Driven Systems, and Healthcare Tech.",
    exp: "[01] NIT Manipur (B.Tech CSE - 9+ CGPA)\n[02] Devtron Inc. (SDE Intern - Kubernetes CLI & Integrations)\n[03] Devtron Inc. (SDE - Kubernetes Event Watcher & NATS)\n[04] AppZoy (Software Engineer - DICOM, HL7, Docker Swarm, Dedicated AI Services, React)",
    quests: "Completed Quests:\n  1. Attendance Sentinel (Go, Docker, K8s, PostgreSQL)\n  2. Movie Matchmaker (Python, KNN, Streamlit)\n  3. Simon Memory Matrix (React.js, Audio)\n  4. Rhythm Drum Kit (JavaScript, DOM)\n  5. Dice Fate Simulator (JavaScript)\n  6. Keeper Data Cache (React.js)\n  7. Quantum Counter (React.js)",
    skills: "Categories:\n  • Languages: Go, JavaScript, Python, C++, C\n  • Web: React.js, Node.js, HTML5, CSS3\n  • Databases: PostgreSQL, MySQL, MongoDB\n  • DevOps: Kubernetes, Docker, Helm, Linux, Git\n  • Healthcare: DICOM, Orthanc, OHIF, HL7 V2",
    contact: "Transmission Channels:\n  • Email:    workwithkomalreddy@gmail.com\n  • Discord:  !KomalReddyK\n  • GitHub:   https://github.com/komalreddy3\n  • LinkedIn: https://www.linkedin.com/in/komalreddyk/\n  • Location: Hyderabad, India",
    clear: "CLEAR_SCREEN",
    sudo: "[ROOT ACCESS GRANTED]\nWelcome, root admin / recruiter!\nTry running: 'sudo hire komal' to initialize direct hiring coms and claim the VIP achievement!",
    "sudo hire komal": `🎉 [OFFER PROTOCOL INITIALIZED]
Meaning: You just initiated the VIP Hiring Protocol!
Komal is actively exploring software engineering roles in distributed systems, full-stack web, and healthcare tech.

📬 Direct Contact Channels:
  • Email:    workwithkomalreddy@gmail.com
  • LinkedIn: https://www.linkedin.com/in/komalreddyk/
  • Discord:  !KomalReddyK
  • GitHub:   https://github.com/komalreddy3
  • Location: Hyderabad, India

👉 Next Step: Drop an email to workwithkomalreddy@gmail.com with "Let's Talk".
🏆 Secret achievement unlocked: 'VIP Candidate Pass' (+250 XP)!`
  },

  quote: {
    text: "There is always one more bug.",
    author: "Lubarsky's Law of Cybernetic Entomology"
  }
};
