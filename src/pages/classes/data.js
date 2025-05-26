export const chapters = [
  {
    id: 0,
    title: 'Chapter 0: Lets getting started!',
    lessons: [{ id: 1, title: 'Lesson 0: Introduce' }],
  },
  {
    id: 1,
    title: 'Chapter 1: General Business',
    lessons: [
      { id: 1, title: 'Lesson 1: Contracts' },
      { id: 2, title: 'Lesson 2: Marketing' },
      {
        id: 3,
        title: 'Lesson 3: Warranty',
        hasResources: true,
      },
    ],
  },
  {
    id: 2,
    title: 'Chapter 2: Officer Issues',
    hasResources: true,
    lessons: [
      { id: 1, title: 'Lesson 1: Computers' },
      { id: 2, title: 'Lesson 2: Officer Technology' },
      {
        id: 3,
        title: 'Lesson 3: Office Procedures',
        hasResources: true,
      },
    ],
  },
];

export const people = [
  { id: 1, position: 'Teacher', name: 'Cristopher Nolan' },
  { id: 2, position: 'Teacher', name: 'Leonardo Dicarpio' },
  { id: 1, position: 'Student', name: 'Brad Pitt' },
  { id: 2, position: 'Student', name: 'Cristian Bale' },
];
export const students = [
  {
    name: 'Alan Weber',
    avatar: '🧑‍🦰',
    scores: [24, 95, 95, 25, 19],
  },
  {
    name: 'Alex Gonzalez',
    avatar: '🧕',
    scores: [25, null, 79, 'Missing', 22],
  },
  {
    name: 'Caesar Sabir',
    avatar: '👦',
    scores: [23, 92, 83, 24, 25],
  },
  {
    name: 'Clay Weaver-Bagnall',
    avatar: '🧑🏿‍🦱',
    scores: [25, 100, 84, 25, 18],
  },
  {
    name: 'Dayana Dougall',
    avatar: '👩‍🦱',
    scores: [22, 95, 92, 23, 24],
  },
  {
    name: 'Jamie Roncero',
    avatar: '🧑‍🦳',
    scores: [24, 90, 100, 22, 23],
  },
  {
    name: 'Alan Weber',
    avatar: '🧑‍🦰',
    scores: [24, 95, 95, 25, 19],
  },
  {
    name: 'Alex Gonzalez',
    avatar: '🧕',
    scores: [25, null, 79, 'Missing', 22],
  },
  {
    name: 'Caesar Sabir',
    avatar: '👦',
    scores: [23, 92, 83, 24, 25],
  },
  {
    name: 'Clay Weaver-Bagnall',
    avatar: '🧑🏿‍🦱',
    scores: [25, 100, 84, 25, 18],
  },
  {
    name: 'Dayana Dougall',
    avatar: '👩‍🦱',
    scores: [22, 95, 92, 23, 24],
  },
  {
    name: 'Jamie Roncero',
    avatar: '🧑‍🦳',
    scores: [24, 90, 100, 22, 23],
  },
  {
    name: 'Alan Weber',
    avatar: '🧑‍🦰',
    scores: [24, 95, 95, 25, 19],
  },
  {
    name: 'Alex Gonzalez',
    avatar: '🧕',
    scores: [25, null, 79, 'Missing', 22],
  },
  {
    name: 'Caesar Sabir',
    avatar: '👦',
    scores: [23, 92, 83, 24, 25],
  },
  {
    name: 'Clay Weaver-Bagnall',
    avatar: '🧑🏿‍🦱',
    scores: [25, 100, 84, 25, 18],
  },
  {
    name: 'Dayana Dougall',
    avatar: '👩‍🦱',
    scores: [22, 95, 92, 23, 24],
  },
  {
    name: 'Jamie Roncero',
    avatar: '🧑‍🦳',
    scores: [24, 90, 100, 22, 23],
  },
];

export const headers = [
  {
    date: 'Apr 13',
    title: 'Creative process',
    type: 'Homework out of 25',
  },
  {
    date: 'Apr 16',
    title: 'Screenplay',
    type: 'Writing Projects out of 100',
  },
  {
    date: 'Apr 15',
    title: 'Group project',
    type: 'Writing Projects out of 100',
  },
  {
    date: 'Apr 7',
    title: 'In-class writing',
    type: 'In-class work out of 25',
  },
  {
    date: 'Apr 16',
    title: 'Screenplay',
    type: 'Homework out of 25',
  },
];


export const fakeAssignmentsData = {
  assignments: [
    {
      title: "Math Assignment: Pythagorean Theorem",
      createdAt: "2025-05-20T00:00:00.000Z",
      updatedAt: "2025-05-22T00:00:00.000Z",
      description:
        "Prove and apply the Pythagorean theorem to right triangles.",
      submitted: 12,
      assigned: 20,
      resources: [
        {
          type: "link",
          link: "https://en.wikipedia.org/wiki/Pythagorean_theorem",
          name: "Wiki: Pythagorean Theorem",
        },
        {
          type: "youtube",
          link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
          name: "Pythagorean Theorem Tutorial",
        },
        {
          type: "file",
          link: "https://example.com/resources/pythagoras-exercises.pdf",
          name: "Exercise PDF",
        },
      ],
    },
    {
      title: "Literature Essay: Analysis of “Picked-up Wife”",
      createdAt: "2025-05-25T00:00:00.000Z",
      updatedAt: "2025-05-27T00:00:00.000Z",
      description:
        "Write a 3-page essay analyzing characters and social themes in Kim Lân’s short story “Picked-up Wife.”",
      submitted: 8,
      assigned: 25,
      resources: [
        {
          type: "link",
          link: "https://vanmau.com/vo-nhat-phan-tich.html",
          name: "Sample Analysis",
        },
        {
          type: "file",
          link: "https://example.com/resources/vo-nhat-text.txt",
          name: "Original Short Story Text",
        },
      ],
    },
    {
      title: "Chemistry Lab: Anion Identification",
      createdAt: "2025-05-28T00:00:00.000Z",
      updatedAt: "2025-05-29T00:00:00.000Z",
      description:
        "Perform tests to identify common anions (Cl⁻, SO₄²⁻, NO₃⁻) using characteristic reactions.",
      submitted: 15,
      assigned: 18,
      resources: [
        {
          type: "link",
          link: "https://chemguide.co.uk/inorganic/aniontests/aniontests.html",
          name: "Lab Guide: Anion Tests",
        },
        {
          type: "file",
          link: "https://example.com/resources/anion-test-lab-manual.docx",
          name: "Lab Manual",
        },
      ],
    },
  ],
};

