import Collection from "../models/Collection.js";

const wasteTypes = [
  "Organic Waste",
  "Recyclable Waste",
  "General Waste",
  "Electronic Waste",
];

const zones = [
  "Zone A",
  "Zone B",
  "Zone C",
  "Zone D",
  "Zone E",
];

const statuses = [
  "Pending",
  "Completed",
  "Missed",
];

const notes = [
  "Keep the waste bin outside before collection.",
  "Separate recyclable materials.",
  "Maximum two bags allowed.",
  "Use the green bin for organic waste.",
  "Collector may arrive within 30 minutes of scheduled time.",
];

/*
  Colombo area coordinates
  Every generated collection will be placed
  near Colombo with a slight random offset.
*/
const baseLatitude = 6.9271;
const baseLongitude = 79.8612;

const randomCoordinate = (base) => {
  return Number((base + (Math.random() - 0.5) * 0.04).toFixed(6));
};

const collectionsSeeder = async (users, routes) => {
  try {
    await Collection.deleteMany();

    const citizens = users.filter(
      (user) => user.role === "citizen"
    );

    const collections = [];

    let routeIndex = 0;

    citizens.forEach((citizen) => {
      for (let i = 0; i < 5; i++) {
        const route = routes[routeIndex % routes.length];

        collections.push({
          citizen: citizen._id,

          collector: route.collector,

          wasteType: wasteTypes[i % wasteTypes.length],

          collectionDate: new Date(
            2026,
            7,
            18 + i
          ),

          collectionTime:
            i % 2 === 0
              ? "8:00 AM"
              : "9:00 AM",

          zone: zones[routeIndex % zones.length],

          address: citizen.address,

          location: {
            latitude: randomCoordinate(baseLatitude),
            longitude: randomCoordinate(baseLongitude),
          },

          status: statuses[i % statuses.length],

          notes: notes[i % notes.length],
        });

        routeIndex++;
      }
    });

    const createdCollections =
      await Collection.insertMany(collections);

    console.log(
      `✅ ${createdCollections.length} collections created`
    );

    return createdCollections;
  } catch (error) {
    console.error(
      "❌ Collection Seeder Error:",
      error.message
    );

    throw error;
  }
};

export default collectionsSeeder;