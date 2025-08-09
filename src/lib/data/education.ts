export type EducationBlock = {
  year: number
  title: string
  education: string[]
  experience: string[]
}

export const educationTimeline: EducationBlock[] = [
  {
    year: 2024,
    title: "Bachelor of Science in Information Technology ",
    education: [
      "Bachelor of Science in Information Technology (2024) - Dedan Kimathi University of Technology",
    ],
    experience: [
      "Advanced IT Courses: Data structures, algorithms, databases, and software engineering principles.",
      "Independent Projects: Worked on several independent projects to strengthen technical skills.",
    ],
  },
  {
    year: 2021,
    title: "K.C.S.E",
    education: ["K.C.S.E (2021) - Ndolo Boys Secondary School"],
    experience: ["Built a strong foundation in sciences, mathematics, and computer studies."],
  },
  {
    year: 2015,
    title: "K.C.P.E",
    education: ["K.C.P.E (2015) - Kitende Primary School"],
    experience: ["Gained foundational skills in basic subjects."],
  },
]
