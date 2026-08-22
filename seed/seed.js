import dotenv from "dotenv";

import connectDB from "../config/db.js";

import seedUsers from "./usersSeeder.js";
import seedTrucks from "./trucksSeeder.js";
import seedRoutes from "./routesSeeder.js";
import seedCollections from "./collectionsSeeder.js";
import seedProducts from "./productsSeeder.js";
import seedReports from "./reportsSeeder.js";

dotenv.config();

const seedDatabase = async () => {
  try {
    await connectDB();

    console.log("✅ Connected to MongoDB");

    // Seed Users
    const users = await seedUsers();

    // Seed Trucks
    const trucks = await seedTrucks(users);

    // Seed Routes
    const routes = await seedRoutes(users, trucks);

    // Seed Collections
    await seedCollections(users, routes);

    // Seed Products
    await seedProducts();

    // Seed Reports
    await seedReports(users);

    console.log("");
    console.log("=======================================");
    console.log("🎉 EcoCollect Database Seeded Successfully!");
    console.log("=======================================");
    console.log("👤 Users          : 16");
    console.log("🚛 Trucks         : 3");
    console.log("🗺️ Routes         : 5");
    console.log("📅 Collections    : 50");
    console.log("🛒 Products       : 15");
    console.log("🚨 Reports        : 10");
    console.log("=======================================");

    process.exit(0);

  } catch (error) {

    console.error("❌ Seeder Error:");
    console.error(error);

    process.exit(1);

  }
};

seedDatabase();