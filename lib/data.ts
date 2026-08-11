export type Source = {
  id: string;
  title: string;
  author: string;
  category: "Shamail" | "Timeline" | "Seerah";
  icon: string;
  description: string;
  details: string;
  active?: boolean;
};

export const sources: Source[] = [
  {
    id: "shamail",
    title: "Ash-Shama'il Al-Muhammadiyah",
    author: "Imam Abu Isa At-Tirmidhi",
    category: "Shamail",
    icon: "menu_book",
    description:
      "Imam Tirmidhi's collection detailing the moral and physical character of the Prophet ﷺ.",
    details:
      "397 ahadith across 56 chapters covering the Prophet's physical appearance, daily habits, conduct, and spiritual character. The foundational corpus for the 'Shamail' category of answers.",
    active: true,
  },
  {
    id: "timeline",
    title: "Seerah Ibn Hisham",
    author: "Ibn Hisham",
    category: "Timeline",
    icon: "history",
    description:
      "The primary narrative timeline of events in the Prophet's life ﷺ.",
    details:
      "The classic biographical work, abridged from Ibn Ishaq's Seerah. Provides the chronological backbone of the Early Meccan, Late Meccan, and Madinan periods.",
    active: true,
  },
  {
    id: "raheeq",
    title: "Ar-Raheeq Al-Makhtum (The Sealed Nectar)",
    author: "Safiur Rahman Mubarakpuri",
    category: "Seerah",
    icon: "book",
    description:
      "Award-winning modern biography, widely used for the detailed timeline of events.",
    details:
      "Winner of the First Prize at the Muslim World League competition. Includes detailed chapters such as 'Three Years of Secret Call' and the Dar al-Arqam narrative.",
  },
  {
    id: "muhammadi",
    title: "Muhammad: His Life Based on the Earliest Sources",
    author: "Martin Lings",
    category: "Seerah",
    icon: "auto_stories",
    description:
      "A scholarly, widely praised account grounded in the earliest sources.",
    details:
      "Written with meticulous attention to the classical Arabic sources, presenting the Seerah narrative in a flowing and reverent style.",
  },
  {
    id: "bukhari",
    title: "Sahih al-Bukhari (Selected Seerah Entries)",
    author: "Imam Muhammad al-Bukhari",
    category: "Timeline",
    icon: "library_books",
    description:
      "Chapters of the Sahih dedicated to military expeditions and the Prophet's life ﷺ.",
    details:
      "The Maghazi and Manaqib chapters supply authenticated, cross-referenced details of key events and interactions during the Prophet's life ﷺ.",
  },
];
