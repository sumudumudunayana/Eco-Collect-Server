import Route from "../models/Route.js";

const seedRoutes = async (users, trucks) => {
  try {
    await Route.deleteMany();

    const collectors = users.filter(
      (user) => user.role === "collector"
    );

    const routes = [
      {
        routeName: "Route A",
        area: "Kelaniya",

        truck: trucks[0]._id,
        collector: collectors[0]._id,

        totalStops: 18,
        completedStops: 7,
        estimatedTime: "2 hrs 30 mins",

        status: "In Progress",

        stops: [
          {
            address: "45 Main Street, Kelaniya",
            latitude: 6.9553,
            longitude: 79.9220,
          },
          {
            address: "Temple Road, Kelaniya",
            latitude: 6.9530,
            longitude: 79.9184,
          },
          {
            address: "Station Road, Kelaniya",
            latitude: 6.9572,
            longitude: 79.9258,
          },
        ],
      },

      {
        routeName: "Route B",
        area: "Kadawatha",

        truck: trucks[1]._id,
        collector: collectors[1]._id,

        totalStops: 22,
        completedStops: 0,
        estimatedTime: "3 hrs",

        status: "Pending",

        stops: [
          {
            address: "Main Road, Kadawatha",
            latitude: 7.0036,
            longitude: 79.9497,
          },
          {
            address: "Ganemulla Road",
            latitude: 7.0068,
            longitude: 79.9521,
          },
        ],
      },

      {
        routeName: "Route C",
        area: "Kiribathgoda",

        truck: trucks[2]._id,
        collector: collectors[2]._id,

        totalStops: 20,
        completedStops: 20,
        estimatedTime: "2 hrs 45 mins",

        status: "Completed",

        stops: [
          {
            address: "Makola Road",
            latitude: 6.9784,
            longitude: 79.9286,
          },
        ],
      },

      {
        routeName: "Route D",
        area: "Wattala",

        truck: trucks[0]._id,
        collector: collectors[3]._id,

        totalStops: 16,
        completedStops: 5,
        estimatedTime: "2 hrs",

        status: "In Progress",

        stops: [
          {
            address: "Old Negombo Road",
            latitude: 6.9902,
            longitude: 79.8898,
          },
        ],
      },

      {
        routeName: "Route E",
        area: "Ja-Ela",

        truck: trucks[1]._id,
        collector: collectors[4]._id,

        totalStops: 24,
        completedStops: 0,
        estimatedTime: "3 hrs 15 mins",

        status: "Pending",

        stops: [
          {
            address: "Ja-Ela Town",
            latitude: 7.0734,
            longitude: 79.8928,
          },
        ],
      },
    ];

    const createdRoutes = await Route.insertMany(routes);

    console.log(`✅ ${createdRoutes.length} routes created`);

    return createdRoutes;

  } catch (error) {

    console.error("❌ Route Seeder Error:", error.message);

    throw error;

  }
};

export default seedRoutes;