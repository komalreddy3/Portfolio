// src/data/challenges.js
// Portfolio‑specific interactive quests

export const challenges = [
  {
    id: 'identity',
    title: 'Identity Quest',
    description: 'Discover who the developer is by exploring hidden files and answering a question.',
    starterCode: '',
    clues: [
      'Check the /bio.txt file for background information.',
      'Look for a hidden file named .secret_identity that contains a hint.'
    ],
    hint: 'The answer is the name mentioned in the bio section.',
    unlockCondition: (state) => !!state.discovered['/bio.txt'] && !!state.discovered['/hidden/.secret_identity'],
    onUnlock: (state, setState) => {
      setState(prev => ({
        ...prev,
        bonuses: { ...prev.bonuses, identity: true },
        completedChallenges: { ...prev.completedChallenges, identity: true },
      }));
    }
  },
  {
    id: 'techstack',
    title: 'Technical Stack Quest',
    description: 'Identify the technologies used in a specific project by reading its README.',
    starterCode: '',
    clues: [
      'Navigate to /projects/awesome-app/README.md.',
      'The file lists the tech stack.'
    ],
    hint: 'Look for a line starting with "Technologies:".',
    unlockCondition: (state) => !!state.discovered['/projects/awesome-app/README.md'],
    onUnlock: (state, setState) => {
      setState(prev => ({
        ...prev,
        bonuses: { ...prev.bonuses, techstack: true },
        completedChallenges: { ...prev.completedChallenges, techstack: true },
      }));
    }
  },
  {
    id: 'project',
    title: 'Project Investigation Quest',
    description: 'Find a source file in a project and make a tiny change to unlock deeper info.',
    starterCode: '',
    clues: [
      'Open /projects/awesome-app/src/main.js.',
      'Change the constant MESSAGE to a new value.'
    ],
    hint: 'Edit the line: const MESSAGE = "..."; to something else.',
    unlockCondition: (state) => !!state.discovered['/projects/awesome-app/src/main.js'],
    onUnlock: (state, setState) => {
      setState(prev => ({
        ...prev,
        bonuses: { ...prev.bonuses, project: true },
        completedChallenges: { ...prev.completedChallenges, project: true },
      }));
    }
  },
  {
    id: 'career',
    title: 'Career Journey Quest',
    description: 'Navigate through career milestones and answer a question to proceed.',
    starterCode: '',
    clues: [
      'Explore the /career/ directory and read each milestone file.',
      'The final file contains a question about the most recent role.'
    ],
    hint: 'The answer is the job title in the last milestone file.',
    unlockCondition: (state) => !!state.discovered['/career/2022.txt'],
    onUnlock: (state, setState) => {
      setState(prev => ({
        ...prev,
        bonuses: { ...prev.bonuses, career: true },
        completedChallenges: { ...prev.completedChallenges, career: true },
      }));
    }
  },
  {
    id: 'hidden',
    title: 'Hidden Developer Insights',
    description: 'Discover an easter‑egg file containing a personal anecdote.',
    starterCode: '',
    clues: [
      'Search for hidden files (those starting with a dot) in the root.',
      'Open .fun_fact.txt to read the insight.'
    ],
    hint: 'Use the ls command with hidden files visibility; the file is .fun_fact.txt.',
    unlockCondition: (state) => !!state.discovered['/hidden/.fun_fact.txt'],
    onUnlock: (state, setState) => {
      setState(prev => ({
        ...prev,
        bonuses: { ...prev.bonuses, hidden: true },
        completedChallenges: { ...prev.completedChallenges, hidden: true },
      }));
    }
  }
];
