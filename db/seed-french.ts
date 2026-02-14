import "dotenv/config";
import db from "./drizzle";
import * as schema from "./schema";

/**
 * Bigger French seeding script
 *
 * - Creates one "French" course with 3 units (Fundamentals, Food & Dining, Travel & Directions)
 * - Each unit has 5 lessons, each lesson defines 4 vocabulary items
 * - For each lesson: inserts SELECT challenges for each vocab item and two ASSIST challenges
 * - Options are generated from the lesson vocab (correct + distractors)
 *
 * Usage:
 *  - ts-node seed-french.ts
 *  - or node dist/seed-french.js (after building)
 */

const unitsData = [
  {
    title: "Fundamentals",
    description: "Greetings, numbers, colors and basic verbs",
    order: 1,
    lessons: [
      {
        title: "Greetings",
        vocab: [
          { english: "the man", french: "l'homme", imageSrc: "/man.svg", audioSrc: "/fr_man.mp3" },
          { english: "the woman", french: "la femme", imageSrc: "/woman.svg", audioSrc: "/fr_woman.mp3" },
          { english: "the boy", french: "le garçon", imageSrc: "/boy.svg", audioSrc: "/fr_boy.mp3" },
          { english: "the girl", french: "la fille", imageSrc: "/girl.svg", audioSrc: "/fr_girl.mp3" },
        ],
      },
      {
        title: "Numbers 1-4",
        vocab: [
          { english: "one", french: "un", imageSrc: "/one.svg", audioSrc: "/fr_one.mp3" },
          { english: "two", french: "deux", imageSrc: "/two.svg", audioSrc: "/fr_two.mp3" },
          { english: "three", french: "trois", imageSrc: "/three.svg", audioSrc: "/fr_three.mp3" },
          { english: "four", french: "quatre", imageSrc: "/four.svg", audioSrc: "/fr_four.mp3" },
        ],
      },
      {
        title: "Colors",
        vocab: [
          { english: "red", french: "rouge", imageSrc: "/red.svg", audioSrc: "/fr_red.mp3" },
          { english: "blue", french: "bleu", imageSrc: "/blue.svg", audioSrc: "/fr_blue.mp3" },
          { english: "green", french: "vert", imageSrc: "/green.svg", audioSrc: "/fr_green.mp3" },
          { english: "yellow", french: "jaune", imageSrc: "/yellow.svg", audioSrc: "/fr_yellow.mp3" },
        ],
      },
      {
        title: "Common Phrases",
        vocab: [
          { english: "hello", french: "bonjour", imageSrc: "/hello.svg", audioSrc: "/fr_bonjour.mp3" },
          { english: "goodbye", french: "au revoir", imageSrc: "/goodbye.svg", audioSrc: "/fr_aurevoir.mp3" },
          { english: "please", french: "s'il vous plaît", imageSrc: "/please.svg", audioSrc: "/fr_svp.mp3" },
          { english: "thank you", french: "merci", imageSrc: "/thankyou.svg", audioSrc: "/fr_merci.mp3" },
        ],
      },
      {
        title: "Basic Verbs",
        vocab: [
          { english: "to eat", french: "manger", imageSrc: "/eat.svg", audioSrc: "/fr_manger.mp3" },
          { english: "to drink", french: "boire", imageSrc: "/drink.svg", audioSrc: "/fr_boire.mp3" },
          { english: "to go", french: "aller", imageSrc: "/go.svg", audioSrc: "/fr_aller.mp3" },
          { english: "to be", french: "être", imageSrc: "/be.svg", audioSrc: "/fr_etre.mp3" },
        ],
      },
    ],
  },
  {
    title: "Food & Dining",
    description: "Food, drinks, ordering and taste",
    order: 2,
    lessons: [
      {
        title: "Food Items",
        vocab: [
          { english: "bread", french: "le pain", imageSrc: "/bread.svg", audioSrc: "/fr_bread.mp3" },
          { english: "cheese", french: "le fromage", imageSrc: "/cheese.svg", audioSrc: "/fr_cheese.mp3" },
          { english: "apple", french: "la pomme", imageSrc: "/apple.svg", audioSrc: "/fr_apple.mp3" },
          { english: "water", french: "l'eau", imageSrc: "/water.svg", audioSrc: "/fr_water.mp3" },
        ],
      },
      {
        title: "Ordering",
        vocab: [
          { english: "I would like", french: "Je voudrais", imageSrc: "/wouldlike.svg", audioSrc: "/fr_jevoudrais.mp3" },
          { english: "the menu", french: "le menu", imageSrc: "/menu.svg", audioSrc: "/fr_menu.mp3" },
          { english: "the bill", french: "l'addition", imageSrc: "/bill.svg", audioSrc: "/fr_bill.mp3" },
          { english: "a table for two", french: "une table pour deux", imageSrc: "/table.svg", audioSrc: "/fr_table2.mp3" },
        ],
      },
      {
        title: "Drinks",
        vocab: [
          { english: "coffee", french: "le café", imageSrc: "/coffee.svg", audioSrc: "/fr_coffee.mp3" },
          { english: "tea", french: "le thé", imageSrc: "/tea.svg", audioSrc: "/fr_tea.mp3" },
          { english: "wine", french: "le vin", imageSrc: "/wine.svg", audioSrc: "/fr_wine.mp3" },
          { english: "beer", french: "la bière", imageSrc: "/beer.svg", audioSrc: "/fr_beer.mp3" },
        ],
      },
      {
        title: "At the Café",
        vocab: [
          { english: "I am hungry", french: "J'ai faim", imageSrc: "/hungry.svg", audioSrc: "/fr_hungry.mp3" },
          { english: "I am thirsty", french: "J'ai soif", imageSrc: "/thirsty.svg", audioSrc: "/fr_thirsty.mp3" },
          { english: "the special", french: "le plat du jour", imageSrc: "/special.svg", audioSrc: "/fr_special.mp3" },
          { english: "to pay", french: "payer", imageSrc: "/pay.svg", audioSrc: "/fr_pay.mp3" },
        ],
      },
      {
        title: "Taste Adjectives",
        vocab: [
          { english: "tasty", french: "délicieux", imageSrc: "/tasty.svg", audioSrc: "/fr_tasty.mp3" },
          { english: "sweet", french: "sucré", imageSrc: "/sweet.svg", audioSrc: "/fr_sweet.mp3" },
          { english: "sour", french: "acide", imageSrc: "/sour.svg", audioSrc: "/fr_sour.mp3" },
          { english: "spicy", french: "épicé", imageSrc: "/spicy.svg", audioSrc: "/fr_spicy.mp3" },
        ],
      },
    ],
  },
  {
    title: "Travel & Directions",
    description: "Places, transport, directions and emergencies",
    order: 3,
    lessons: [
      {
        title: "Places",
        vocab: [
          { english: "station", french: "la gare", imageSrc: "/station.svg", audioSrc: "/fr_station.mp3" },
          { english: "airport", french: "l'aéroport", imageSrc: "/airport.svg", audioSrc: "/fr_airport.mp3" },
          { english: "hotel", french: "l'hôtel", imageSrc: "/hotel.svg", audioSrc: "/fr_hotel.mp3" },
          { english: "museum", french: "le musée", imageSrc: "/museum.svg", audioSrc: "/fr_museum.mp3" },
        ],
      },
      {
        title: "Directions",
        vocab: [
          { english: "left", french: "à gauche", imageSrc: "/left.svg", audioSrc: "/fr_left.mp3" },
          { english: "right", french: "à droite", imageSrc: "/right.svg", audioSrc: "/fr_right.mp3" },
          { english: "straight", french: "tout droit", imageSrc: "/straight.svg", audioSrc: "/fr_straight.mp3" },
          { english: "near", french: "près", imageSrc: "/near.svg", audioSrc: "/fr_near.mp3" },
        ],
      },
      {
        title: "Transport",
        vocab: [
          { english: "bus", french: "le bus", imageSrc: "/bus.svg", audioSrc: "/fr_bus.mp3" },
          { english: "train", french: "le train", imageSrc: "/train.svg", audioSrc: "/fr_train.mp3" },
          { english: "taxi", french: "un taxi", imageSrc: "/taxi.svg", audioSrc: "/fr_taxi.mp3" },
          { english: "subway", french: "le métro", imageSrc: "/metro.svg", audioSrc: "/fr_metro.mp3" },
        ],
      },
      {
        title: "At the Hotel",
        vocab: [
          { english: "reservation", french: "une réservation", imageSrc: "/reservation.svg", audioSrc: "/fr_reservation.mp3" },
          { english: "key", french: "la clé", imageSrc: "/key.svg", audioSrc: "/fr_key.mp3" },
          { english: "room", french: "la chambre", imageSrc: "/room.svg", audioSrc: "/fr_room.mp3" },
          { english: "check-in", french: "l'enregistrement", imageSrc: "/checkin.svg", audioSrc: "/fr_checkin.mp3" },
        ],
      },
      {
        title: "Emergencies & Help",
        vocab: [
          { english: "help", french: "à l'aide", imageSrc: "/help.svg", audioSrc: "/fr_help.mp3" },
          { english: "doctor", french: "le médecin", imageSrc: "/doctor.svg", audioSrc: "/fr_doctor.mp3" },
          { english: "police", french: "la police", imageSrc: "/police.svg", audioSrc: "/fr_police.mp3" },
          { english: "pharmacy", french: "la pharmacie", imageSrc: "/pharmacy.svg", audioSrc: "/fr_pharmacy.mp3" },
        ],
      },
    ],
  },
];

// Helper: shuffle array (Fisher–Yates)
function shuffle<T>(array: T[]) {
  const copy = array.slice();
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

const main = async () => {
  try {
    console.log("🌱 Seeding local database with a larger French course...");

    // Delete all existing data (order matters because of FK)
    await db.delete(schema.challengeProgress);
    await db.delete(schema.challengeOptions);
    await db.delete(schema.challenges);
    await db.delete(schema.lessons);
    await db.delete(schema.units);
    await db.delete(schema.userProgress);
    await db.delete(schema.userSubscription);
    await db.delete(schema.courses);

    // Insert French course
    const courses = await db
      .insert(schema.courses)
      .values([{ title: "French", imageSrc: "/fr.svg", description: "Comprehensive French beginner course" }])
      .returning();

    for (const course of courses) {
      // Insert units
      const unitsToInsert = unitsData.map((u) => ({
        courseId: course.id,
        title: u.title,
        description: u.description,
        order: u.order,
      }));

      const units = await db.insert(schema.units).values(unitsToInsert).returning();

      // For each unit, insert lessons and challenges/options
      for (let ui = 0; ui < units.length; ui++) {
        const unit = units[ui];
        const unitDef = unitsData.find((d) => d.title === unit.title);
        if (!unitDef) continue;

        // Insert lessons for this unit
        const lessonsToInsert = (unitDef.lessons || []).map((l, idx) => ({
          unitId: unit.id,
          title: l.title,
          order: idx + 1,
        }));

        const lessons = await db.insert(schema.lessons).values(lessonsToInsert).returning();

        // For each lesson, insert challenges and options
        for (let li = 0; li < lessons.length; li++) {
          const lesson = lessons[li];
          const lessonDef = unitDef.lessons[li];
          if (!lessonDef) continue;

          const vocab = lessonDef.vocab; // array of 4 items typically

          // Build challenges for this lesson:
          // - One SELECT per vocab item
          // - Two ASSIST challenges (audio/text) for reinforcement
          const challengesToInsert: Array<any> = [];

          // SELECT challenges
          for (let v = 0; v < vocab.length; v++) {
            challengesToInsert.push({
              lessonId: lesson.id,
              type: "SELECT",
              question: `Which one of these is "${vocab[v].english}"?`,
              order: v + 1,
            });
          }

          // Add two ASSIST challenges at the end: audio recognition and text completion
          const assistBaseOrder = vocab.length + 1;
          challengesToInsert.push({
            lessonId: lesson.id,
            type: "ASSIST",
            question: `"${vocab[0].french}" (listen and pick)`,
            order: assistBaseOrder,
          });
          challengesToInsert.push({
            lessonId: lesson.id,
            type: "ASSIST",
            question: `"${vocab[vocab.length - 1].french}" (listen and pick)`,
            order: assistBaseOrder + 1,
          });

          // Insert challenges and get created rows
          const createdChallenges = await db.insert(schema.challenges).values(challengesToInsert).returning();

          // For each created challenge, create options using lesson vocab as pool
          for (const challenge of createdChallenges) {
            // Prepare 3 option candidates: correct + two distractors
            // Identify which vocab is correct:
            let correctVocab = null;

            if (challenge.type === "SELECT") {
              // Extract English word from question to find vocab; question format: Which one of these is "X"?
              const match = challenge.question.match(/"(.+?)"/);
              const english = match ? match[1] : "";
              correctVocab = vocab.find((v) => v.english === english);
            } else if (challenge.type === "ASSIST") {
              // For ASSIST, we used the French in the question; extract it
              const match = challenge.question.match(/"(.+?)"/);
              const french = match ? match[1].split(" ")[0] : ""; // slightly tolerant
              correctVocab = vocab.find((v) => v.french.startsWith(french) || v.french === french);
              // Fallback: if not found, pick first
              if (!correctVocab) correctVocab = vocab[0];
            }

            // If still null, default to first vocab
            if (!correctVocab) correctVocab = vocab[0];

            // Build pool of distractors (other vocabulary items)
            const distractors = vocab.filter((v) => v.french !== correctVocab!.french);
            const shuffled = shuffle(distractors).slice(0, 2);

            // Build options array (correct + two distractors), then shuffle them to change order
            const rawOptions = [
              {
                challengeId: challenge.id,
                correct: true,
                text: correctVocab.french,
                imageSrc: correctVocab.imageSrc || null,
                audioSrc: correctVocab.audioSrc || null,
              },
              ...shuffled.map((d) => ({
                challengeId: challenge.id,
                correct: false,
                text: d.french,
                imageSrc: d.imageSrc || null,
                audioSrc: d.audioSrc || null,
              })),
            ];

            // Shuffle options so correct isn't always first
            const finalOptions = shuffle(rawOptions);

            // For ASSIST challenges, prefer to include audio only (no image)
            if (challenge.type === "ASSIST") {
              // remove imageSrc from options for ASSIST to focus on audio/text
              finalOptions.forEach((opt) => {
                delete opt.imageSrc;
              });
            }

            // Insert options
            await db.insert(schema.challengeOptions).values(finalOptions);
          }
        }
      }
    }

    console.log("✅ Local French course seeded successfully");
    process.exit(0);
  } catch (error) {
    console.error("❌ Failed to seed French database", error);
    process.exit(1);
  }
};

main();