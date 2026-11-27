// Coding challenges based on Komal's projects and work.

export const challenges = [
  {
    id: "01-system-genesis",
    level: 1,
    tier: "Getting Started",
    difficulty: "Level 1: Profile Basics",
    title: "Clean Up a Profile",
    badge: "LEVEL 1 · PROFILE BASICS",
    description: "Names and handles can have extra spaces, capital letters, or an @ at the start.",
    objective: "Write `normalizeIdentity(profile)` to clean the name, handle, and location without changing the original profile.",
    constraints: [
      "Remove extra spaces from the name and location.",
      "Make the handle lowercase and remove @ signs from the start.",
      "Return a new profile; leave the original unchanged."
    ],
    codeChallenge: {
      language: "JavaScript",
      functionName: "normalizeIdentity",
      parameterName: "profile",
      hint: "Use `trim()` to remove extra spaces and `toLowerCase()` to make the handle lowercase. Build a new object instead of editing the original.",
      solution: "return {\n  name: profile.name.trim(),\n  handle: profile.handle.replace(/^@+/, \"\").toLowerCase(),\n  location: profile.location.trim(),\n};",
      starterCode: "// Clean the name, handle, and location.\n// Return a new object and leave profile unchanged.\nreturn {\n  name: profile.name,\n  handle: profile.handle,\n  location: profile.location,\n};",
      tests: [
        { label: "Normalize all identity fields", input: { name: "  Komal Reddy Koukuntla ", handle: "@KomalReddy3", location: " Hyderabad, India " }, expected: { name: "Komal Reddy Koukuntla", handle: "komalreddy3", location: "Hyderabad, India" } },
        { label: "Handle casing and prefix", input: { name: "Komal", handle: "@@KOMAL", location: "India" }, expected: { name: "Komal", handle: "komal", location: "India" } },
        { label: "Keep the source record unchanged", input: { name: " Komal ", handle: "@K", location: " India " }, expected: { name: "Komal", handle: "k", location: "India" }, hidden: true, unchanged: true },
      ],
      reveal: "Komal grew up in Hyderabad and studied Computer Science at NIT Manipur, where she graduated with a 9+ CGPA. She brings that strong foundation into the software she builds today.",
    },
    criteria: [
      {
        id: "cat_about",
        label: "Read Komal's introduction: `cat /about.md`",
        check: (state) => !!state.discovered["/about.md"]
      },
      {
        id: "read_secret",
        label: "Find the hidden profile: `cat /hidden/.secret`",
        check: (state) => !!state.discovered["/hidden/.secret"]
      },
      {
        id: "run_whoami",
        label: "Run `whoami` in the terminal",
        check: (state) => (state.commandHistory || []).some(cmd => cmd.trim().toLowerCase() === "whoami")
      }
    ],
    hint: "Read `/about.md` and `/hidden/.secret`, then run `whoami` in the terminal.",
    questFilePath: "/quests/01-identity.md",
    xpReward: 100,
  },
  {
    id: "02-event-streams",
    level: 2,
    tier: "Working with Events",
    difficulty: "Level 2: Remove Duplicate Events",
    title: "Remove Duplicate Imaging Events",
    badge: "LEVEL 2 · EVENT CLEANUP",
    description: "An imaging service restarts and receives some study updates more than once. Keep only the newest update for each study and update type.",
    objective: "Write `dedupeStudyEvents(events)` to keep the newest update for each study and event type, while keeping the original order of each group.",
    constraints: [
      "The same update may arrive more than once.",
      "Different update types for one study must stay separate.",
      "Keep each group's place in the original order."
    ],
    codeChallenge: {
      language: "JavaScript",
      functionName: "dedupeStudyEvents",
      parameterName: "events",
      hint: "Use a Map with a key made from `studyId` and `type`. For each key, keep the event with the larger `revision` number.",
      solution: "const latestByKey = new Map();\nfor (const event of events) {\n  const key = event.studyId + \"::\" + event.type;\n  const current = latestByKey.get(key);\n  if (!current || event.revision > current.revision) {\n    latestByKey.set(key, event);\n  }\n}\nreturn [...latestByKey.values()];",
      starterCode: "// Keep one event for each studyId and type.\n// Keep the event with the largest revision number.\n// Keep groups in the order they first appeared.\nreturn events;",
      tests: [
        { label: "Collapse duplicate deliveries", input: [{ studyId: "S1", type: "stored", revision: 1 }, { studyId: "S1", type: "stored", revision: 2 }], expected: [{ studyId: "S1", type: "stored", revision: 2 }] },
        { label: "Keep independent event types", input: [{ studyId: "S1", type: "stored", revision: 1 }, { studyId: "S1", type: "reviewed", revision: 1 }], expected: [{ studyId: "S1", type: "stored", revision: 1 }, { studyId: "S1", type: "reviewed", revision: 1 }] },
        { label: "Handle out-of-order revisions and preserve key order", input: [{ studyId: "S1", type: "stored", revision: 3 }, { studyId: "S2", type: "stored", revision: 1 }, { studyId: "S1", type: "stored", revision: 2 }], expected: [{ studyId: "S1", type: "stored", revision: 3 }, { studyId: "S2", type: "stored", revision: 1 }], hidden: true },
      ],
      reveal: "At AppZoy, Komal works on medical imaging software. She connects DICOM images, Orthanc, hospital messages, and event tools such as NATS and Google Cloud Pub/Sub. This work helps keep imaging updates moving between services.",
    },
    criteria: [
      {
        id: "audit_dicom",
        label: "Read about Komal's current work: `cat /experience/appzoy.md`",
        check: (state) => !!state.discovered["/experience/appzoy.md"]
      },
      {
        id: "verify_streams",
        label: "Read the skills list: `cat /skills.md`",
        check: (state) => !!state.discovered["/skills.md"]
      },
      {
        id: "run_stream_query",
        label: "Run `skills` in the terminal",
        check: (state) => (state.commandHistory || []).some(cmd => cmd.trim().toLowerCase() === "skills")
      }
    ],
    hint: "Read `/experience/appzoy.md` and `/skills.md`, then run `skills` in the terminal.",
    questFilePath: "/quests/02-techstack.md",
    xpReward: 200,
  },
  {
    id: "03-concurrency-orchestration",
    level: 3,
    tier: "Working with Records",
    difficulty: "Level 3: Summarize Attendance",
    title: "Count Attendance Records",
    badge: "LEVEL 3 · RECORDS",
    description: "Some students have more than one attendance record. Keep each student's newest valid record and count the final results.",
    objective: "Write `summarizeAttendance(records)` to count students marked present, late, or absent, and count records that were skipped or replaced.",
    constraints: [
      "Use only `present`, `late`, and `absent` as valid statuses.",
      "Use the newest date for each student.",
      "Count invalid and replaced records as ignored."
    ],
    codeChallenge: {
      language: "JavaScript",
      functionName: "summarizeAttendance",
      parameterName: "records",
      hint: "Use a Map to keep one record per student. Compare dates when a student appears again. Count invalid records and replaced records as ignored.",
      solution: "const latestByStudent = new Map();\nlet ignored = 0;\nconst validStatuses = new Set([\"present\", \"late\", \"absent\"]);\nfor (const record of records) {\n  if (!record.studentId || !validStatuses.has(record.status) || !record.updatedAt) {\n    ignored += 1;\n    continue;\n  }\n  const current = latestByStudent.get(record.studentId);\n  if (!current) {\n    latestByStudent.set(record.studentId, record);\n  } else if (Date.parse(record.updatedAt) > Date.parse(current.updatedAt)) {\n    latestByStudent.set(record.studentId, record);\n    ignored += 1;\n  } else {\n    ignored += 1;\n  }\n}\nconst summary = { present: 0, late: 0, absent: 0, ignored };\nfor (const record of latestByStudent.values()) summary[record.status] += 1;\nreturn summary;",
      starterCode: "// Keep the newest valid record for each student.\n// Return counts for present, late, absent, and ignored records.\nreturn { present: 0, late: 0, absent: 0, ignored: records.length };",
      tests: [
        { label: "Aggregate distinct student statuses", input: [{ studentId: "A", status: "present", updatedAt: "2026-01-01" }, { studentId: "B", status: "late", updatedAt: "2026-01-01" }], expected: { present: 1, late: 1, absent: 0, ignored: 0 } },
        { label: "Use latest record and count superseded rows", input: [{ studentId: "A", status: "present", updatedAt: "2026-01-01" }, { studentId: "A", status: "absent", updatedAt: "2026-01-02" }], expected: { present: 0, late: 0, absent: 1, ignored: 1 } },
        { label: "Ignore invalid rows and retain newest valid status", input: [{ studentId: "A", status: "late", updatedAt: "2026-01-03" }, { studentId: "B", status: "unknown", updatedAt: "2026-01-04" }, { studentId: "A", status: "present", updatedAt: "2026-01-01" }, { status: "present", updatedAt: "2026-01-04" }], expected: { present: 0, late: 1, absent: 0, ignored: 3 }, hidden: true },
      ],
      reveal: "Komal built Attendance Sentinel, a school attendance service. It uses Go, PostgreSQL, and login tokens to manage different user roles. She also created the setup needed to run it with Kubernetes.",
    },
    criteria: [
      {
        id: "audit_attendance_go",
        label: "Read the attendance project: `cat /projects/attendance-go.md`",
        check: (state) => !!state.discovered["/projects/attendance-go.md"]
      },
      {
        id: "audit_service_evidence",
        label: "Read the movie app project: `cat /projects/mrs.md`",
        check: (state) => !!state.discovered["/projects/mrs.md"]
      },
      {
        id: "run_projects_audit",
        label: "Run `projects` in the terminal",
        check: (state) => (state.commandHistory || []).some(cmd => cmd.trim().toLowerCase() === "projects")
      }
    ],
    hint: "Read `/projects/attendance-go.md` and `/projects/mrs.md`, then run `projects` in the terminal.",
    questFilePath: "/quests/03-projects.md",
    xpReward: 300,
  },
  {
    id: "04-k8s-remediation",
    level: 4,
    tier: "Keeping Services Healthy",
    difficulty: "Level 4: Check Pod Status",
    title: "Check Which Pods Need Help",
    badge: "LEVEL 4 · POD STATUS",
    description: "A Kubernetes service reconnects and sees old and new pod updates mixed together. Use the newest update for each pod to find which pods need help.",
    constraints: [
      "A pod can have more than one update.",
      "Use the update with the largest revision number.",
      "Do not return pods whose ready count already matches the desired count."
    ],
    objective: "Write `reconcilePodEvents(events)` to return each pod that needs a change, with its name, action, desired count, and ready count.",
    codeChallenge: {
      language: "JavaScript",
      functionName: "reconcilePodEvents",
      parameterName: "events",
      hint: "Group updates by namespace and pod name. Keep the highest revision, then compare `ready` with `desired` to choose `scale-up` or `scale-down`.",
      solution: "const latestByPod = new Map();\nfor (const event of events) {\n  const key = event.namespace + \"/\" + event.name;\n  const current = latestByPod.get(key);\n  if (!current || event.revision > current.revision) {\n    latestByPod.set(key, event);\n  }\n}\nreturn [...latestByPod.entries()]\n  .filter(([, event]) => event.ready !== event.desired)\n  .map(([key, event]) => ({\n    key,\n    action: event.ready < event.desired ? \"scale-up\" : \"scale-down\",\n    desired: event.desired,\n    ready: event.ready,\n  }));",
      starterCode: "// Keep the newest update for each pod.\n// Return only pods where ready and desired are different.\n// Include key, action, desired, and ready in each result.\nreturn [];",
      tests: [
        { label: "Emit scale-up action for an under-ready pod", input: [{ namespace: "prod", name: "api", desired: 3, ready: 1, revision: 1 }], expected: [{ key: "prod/api", action: "scale-up", desired: 3, ready: 1 }] },
        { label: "Skip pods already at desired state", input: [{ namespace: "prod", name: "api", desired: 2, ready: 2, revision: 1 }], expected: [] },
        { label: "Reconcile latest state after repeated events", input: [{ namespace: "prod", name: "api", desired: 2, ready: 1, revision: 1 }, { namespace: "prod", name: "worker", desired: 1, ready: 3, revision: 1 }, { namespace: "prod", name: "api", desired: 2, ready: 2, revision: 2 }], expected: [{ key: "prod/worker", action: "scale-down", desired: 1, ready: 3 }], hidden: true },
      ],
      reveal: "At Devtron, Komal worked on Kubernetes tools and a Go service that watched for pod updates. It could help fix problems automatically and send updates through NATS. This work taught her to check the latest state before acting on an update.",
    },
    criteria: [
      {
        id: "audit_devtron_sde",
        label: "Read about Komal's Devtron engineering work: `cat /experience/devtron-sde.md`",
        check: (state) => !!state.discovered["/experience/devtron-sde.md"]
      },
      {
        id: "audit_devtron_intern",
        label: "Read about Komal's Devtron internship: `cat /experience/devtron-intern.md`",
        check: (state) => !!state.discovered["/experience/devtron-intern.md"]
      },
      {
        id: "audit_full_timeline",
        label: "Read all four school and work history files",
        check: (state) =>
          !!state.discovered["/experience/nit-manipur.md"] &&
          !!state.discovered["/experience/devtron-intern.md"] &&
          !!state.discovered["/experience/devtron-sde.md"] &&
          !!state.discovered["/experience/appzoy.md"]
      },
      {
        id: "run_experience_cmd",
        label: "Run `experience` in the terminal",
        check: (state) => (state.commandHistory || []).some(cmd => cmd.trim().toLowerCase() === "experience")
      }
    ],
    hint: "Read all four files in `/experience/`, then run `experience` in the terminal.",
    questFilePath: "/quests/04-career.md",
    xpReward: 400,
  },
  {
    id: "05-root-privilege",
    level: 5,
    tier: "Safe Recovery",
    difficulty: "Level 5: Plan a Safe Replay",
    title: "Prepare Events to Send Again",
    badge: "LEVEL 5 · SAFE RECOVERY",
    description: "The message service is down, but new imaging work is still arriving. Some events were already handled before the outage.",
    objective: "Write `planSafeReplay(request)` to skip handled and repeated events, return only up to the requested limit, and count what is left.",
    constraints: [
      "Do not send an event that was already handled.",
      "Include each event only once and keep the original order.",
      "Send no more than the requested limit and report how many remain."
    ],
    codeChallenge: {
      language: "JavaScript",
      functionName: "planSafeReplay",
      parameterName: "request",
      hint: "Use one Set for handled IDs and another for IDs seen in this list. Collect the remaining events, take the first `limit`, and count the rest.",
      solution: "const processed = new Set(request.processedIds);\nconst seen = new Set();\nconst eligible = [];\nfor (const event of request.events) {\n  if (processed.has(event.eventId) || seen.has(event.eventId)) continue;\n  seen.add(event.eventId);\n  eligible.push(event);\n}\nconst limit = Math.max(0, Math.floor(request.limit));\nconst batch = eligible.slice(0, limit);\nreturn { batch, remaining: eligible.length - batch.length };",
      starterCode: "// request has events, processedIds, and limit.\n// Skip handled and repeated events. Keep the original order.\n// Return { batch, remaining }.\nreturn { batch: [], remaining: request.events.length };",
      tests: [
        { label: "Skip events already committed", input: { events: [{ eventId: "e1" }, { eventId: "e2" }], processedIds: ["e1"], limit: 5 }, expected: { batch: [{ eventId: "e2" }], remaining: 0 } },
        { label: "Bound the batch and report backlog", input: { events: [{ eventId: "e1" }, { eventId: "e2" }, { eventId: "e3" }], processedIds: [], limit: 2 }, expected: { batch: [{ eventId: "e1" }, { eventId: "e2" }], remaining: 1 } },
        { label: "Deduplicate delivery and preserve safe replay order", input: { events: [{ eventId: "e1" }, { eventId: "e1" }, { eventId: "e2" }, { eventId: "e3" }], processedIds: ["e2"], limit: 1 }, expected: { batch: [{ eventId: "e1" }], remaining: 1 }, hidden: true },
      ],
      reveal: "Komal's current work brings together healthcare imaging, connected services, and web apps. She wants the software to work well for the people who depend on it. Away from work, she enjoys K-dramas and finds cleaning relaxing.",
    },
    criteria: [
      {
        id: "read_fun_facts",
        label: "Read some fun facts: `cat /hidden/.fun_facts.md`",
        check: (state) => !!state.discovered["/hidden/.fun_facts.md"]
      },
      {
        id: "sudo_hire_privilege",
        label: "Try `sudo hire komal` in the terminal",
        check: (state) => (state.achievements || []).includes("vip-hire")
      },
      {
        id: "audit_transmission_channels",
        label: "Read the contact details or run `contact`",
        check: (state) => !!state.discovered["/contact.md"] || (state.commandHistory || []).some(cmd => cmd.trim().toLowerCase() === "contact")
      }
    ],
    hint: "Read `/hidden/.fun_facts.md`, try `sudo hire komal`, and check the contact details.",
    questFilePath: "/quests/05-hidden.md",
    xpReward: 500,
  }
];
