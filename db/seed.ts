import "dotenv/config";

import * as schema from "@/db/schema";
import db from "./drizzle";

const main = async () => {
  try {
    console.log("Seeding database");

    await Promise.all([
      db.delete(schema.userProgress),
      db.delete(schema.challenges),
      db.delete(schema.units),
      db.delete(schema.lessons),
      db.delete(schema.courses),
      db.delete(schema.challengeOptions),
      db.delete(schema.userSubscription),
    ]);

    const languages = [
      {
        title: "Spanish",
        imageSrc: "/es.svg",
        words: {
          man: "el hombre",
          woman: "la mujer",
          boy: "el chico",
          girl: "la niña",
          zombie: "el zombie",
          robot: "el robot",
        },
      },
      {
        title: "French",
        imageSrc: "/fr.svg",
        words: {
          man: "l'homme",
          woman: "la femme",
          boy: "le garçon",
          girl: "la fille",
          zombie: "le zombie",
          robot: "le robot",
        },
      },
      {
        title: "Croatian",
        imageSrc: "/hr.svg",
        words: {
          man: "čovjek",
          woman: "žena",
          boy: "dječak",
          girl: "djevojčica",
          zombie: "zombi",
          robot: "robot",
        },
      },
      {
        title: "Italian",
        imageSrc: "/it.svg",
        words: {
          man: "l'uomo",
          woman: "la donna",
          boy: "il ragazzo",
          girl: "la ragazza",
          zombie: "lo zombie",
          robot: "il robot",
        },
      },
      {
        title: "Japanese",
        imageSrc: "/jp.svg",
        words: {
          man: "男の人",
          woman: "女の人",
          boy: "男の子",
          girl: "女の子",
          zombie: "ゾンビ",
          robot: "ロボット",
        },
      },
    ];

    for (const language of languages) {
      const courses = await db
        .insert(schema.courses)
        .values([{ title: language.title, imageSrc: language.imageSrc }])
        .returning();

      for (const course of courses) {
        const units = await db
          .insert(schema.units)
          .values([
            {
              courseId: course.id,
              title: "Unit 1",
              description: `Learn the basics of ${course.title}`,
              order: 1,
            },
            {
              courseId: course.id,
              title: "Unit 2",
              description: `Learn intermediate ${course.title}`,
              order: 2,
            },
          ])
          .returning();

        for (const unit of units) {
          const lessons = await db
            .insert(schema.lessons)
            .values([
              { unitId: unit.id, title: "Nouns", order: 1 },
              { unitId: unit.id, title: "Verbs", order: 2 },
              { unitId: unit.id, title: "Adjectives", order: 3 },
              { unitId: unit.id, title: "Phrases", order: 4 },
              { unitId: unit.id, title: "Sentences", order: 5 },
            ])
            .returning();

          for (const lesson of lessons) {
            const challenges = await db
              .insert(schema.challenges)
              .values([
                {
                  lessonId: lesson.id,
                  type: "SELECT",
                  question: 'Which one of these is "the man"?',
                  order: 1,
                },
                {
                  lessonId: lesson.id,
                  type: "SELECT",
                  question: 'Which one of these is "the woman"?',
                  order: 2,
                },
                {
                  lessonId: lesson.id,
                  type: "SELECT",
                  question: 'Which one of these is "the boy"?',
                  order: 3,
                },
                {
                  lessonId: lesson.id,
                  type: "ASSIST",
                  question: '"the man"',
                  order: 4,
                },
                {
                  lessonId: lesson.id,
                  type: "SELECT",
                  question: 'Which one of these is "the zombie"?',
                  order: 5,
                },
                {
                  lessonId: lesson.id,
                  type: "SELECT",
                  question: 'Which one of these is "the robot"?',
                  order: 6,
                },
                {
                  lessonId: lesson.id,
                  type: "SELECT",
                  question: 'Which one of these is "the girl"?',
                  order: 7,
                },
                {
                  lessonId: lesson.id,
                  type: "ASSIST",
                  question: '"the zombie"',
                  order: 8,
                },
              ])
              .returning();

            for (const challenge of challenges) {
              const w = language.words;

              const optionSets: Record<number, any[]> = {
                1: [
                  { text: w.man, correct: true, imageSrc: "/man.svg" },
                  { text: w.woman, correct: false, imageSrc: "/woman.svg" },
                  { text: w.boy, correct: false, imageSrc: "/boy.svg" },
                ],
                2: [
                  { text: w.woman, correct: true, imageSrc: "/woman.svg" },
                  { text: w.boy, correct: false, imageSrc: "/boy.svg" },
                  { text: w.man, correct: false, imageSrc: "/man.svg" },
                ],
                3: [
                  { text: w.woman, correct: false, imageSrc: "/woman.svg" },
                  { text: w.man, correct: false, imageSrc: "/man.svg" },
                  { text: w.boy, correct: true, imageSrc: "/boy.svg" },
                ],
                4: [
                  { text: w.woman, correct: false },
                  { text: w.man, correct: true },
                  { text: w.boy, correct: false },
                ],
                5: [
                  { text: w.man, correct: false, imageSrc: "/man.svg" },
                  { text: w.woman, correct: false, imageSrc: "/woman.svg" },
                  { text: w.zombie, correct: true, imageSrc: "/zombie.svg" },
                ],
                6: [
                  { text: w.robot, correct: true, imageSrc: "/robot.svg" },
                  { text: w.zombie, correct: false, imageSrc: "/zombie.svg" },
                  { text: w.boy, correct: false, imageSrc: "/boy.svg" },
                ],
                7: [
                  { text: w.girl, correct: true, imageSrc: "/girl.svg" },
                  { text: w.zombie, correct: false, imageSrc: "/zombie.svg" },
                  { text: w.man, correct: false, imageSrc: "/man.svg" },
                ],
                8: [
                  { text: w.woman, correct: false },
                  { text: w.zombie, correct: true },
                  { text: w.boy, correct: false },
                ],
              };

              const options = optionSets[challenge.order].map((opt) => ({
                challengeId: challenge.id,
                ...opt,
              }));

              await db.insert(schema.challengeOptions).values(options);
            }
          }
        }
      }
    }

    console.log("Database seeded successfully");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed database");
  }
};

void main();
