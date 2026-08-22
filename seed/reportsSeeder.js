import Report from "../models/Report.js";

const reportsSeeder = async (users) => {
  try {
    await Report.deleteMany();

    const citizens = users.filter(
      (user) => user.role === "citizen"
    );

    const collectors = users.filter(
      (user) => user.role === "collector"
    );

    const reports = [
      {
        citizen: citizens[0]._id,
        assignedCollector: collectors[0]._id,

        title: "Garbage dumped near canal",

        description:
          "Large amount of household waste dumped beside the canal.",

        category: "Household",

        image: "",

        location: {
          address: "Kelaniya Canal Road",
          latitude: 6.9552,
          longitude: 79.9221,
        },

        status: "Pending",
      },

      {
        citizen: citizens[1]._id,
        assignedCollector: collectors[1]._id,

        title: "Plastic waste beside road",

        description:
          "Several bags of plastic waste left on the roadside.",

        category: "Plastic",

        image: "",

        location: {
          address: "Kadawatha Main Road",
          latitude: 7.0025,
          longitude: 79.9498,
        },

        status: "Assigned",
      },

      {
        citizen: citizens[2]._id,
        assignedCollector: collectors[2]._id,

        title: "Construction debris",

        description:
          "Construction materials dumped on an empty land.",

        category: "Construction",

        image: "",

        location: {
          address: "Kiribathgoda",
          latitude: 6.9778,
          longitude: 79.9285,
        },

        status: "Resolved",
      },

      {
        citizen: citizens[3]._id,
        assignedCollector: collectors[3]._id,

        title: "Electronic waste",

        description:
          "Old televisions and computers dumped illegally.",

        category: "Electronic",

        image: "",

        location: {
          address: "Wattala",
          latitude: 6.9895,
          longitude: 79.8897,
        },

        status: "Pending",
      },

      {
        citizen: citizens[4]._id,
        assignedCollector: collectors[4]._id,

        title: "Mixed waste",

        description:
          "Mixed garbage dumped near bus stop.",

        category: "Other",

        image: "",

        location: {
          address: "Ja-Ela",
          latitude: 7.0732,
          longitude: 79.8924,
        },

        status: "In Progress",
      },

      {
        citizen: citizens[5]._id,
        assignedCollector: collectors[0]._id,

        title: "Overflowing garbage bags",

        description:
          "Garbage bags left beside public park.",

        category: "Household",

        image: "",

        location: {
          address: "Colombo 07",
          latitude: 6.9145,
          longitude: 79.8698,
        },

        status: "Pending",
      },

      {
        citizen: citizens[6]._id,
        assignedCollector: collectors[1]._id,

        title: "Plastic bottles dumped",

        description:
          "Plastic bottles scattered around playground.",

        category: "Plastic",

        image: "",

        location: {
          address: "Ragama",
          latitude: 7.0325,
          longitude: 79.9178,
        },

        status: "Assigned",
      },

      {
        citizen: citizens[7]._id,
        assignedCollector: collectors[2]._id,

        title: "Illegal burning site",

        description:
          "People burning garbage near residential area.",

        category: "Other",

        image: "",

        location: {
          address: "Negombo",
          latitude: 7.2083,
          longitude: 79.8358,
        },

        status: "Pending",
      },

      {
        citizen: citizens[8]._id,
        assignedCollector: collectors[3]._id,

        title: "Broken furniture dumped",

        description:
          "Old furniture dumped near playground.",

        category: "Construction",

        image: "",

        location: {
          address: "Malabe",
          latitude: 6.9038,
          longitude: 79.9574,
        },

        status: "Resolved",
      },

      {
        citizen: citizens[9]._id,
        assignedCollector: collectors[4]._id,

        title: "Waste near river",

        description:
          "Garbage dumped beside the river bank.",

        category: "Household",

        image: "",

        location: {
          address: "Kaduwela",
          latitude: 6.9358,
          longitude: 79.9842,
        },

        status: "Pending",
      },
    ];

    const createdReports = await Report.insertMany(reports);

    console.log(`✅ ${createdReports.length} reports created`);

    return createdReports;

  } catch (error) {

    console.error("❌ Report Seeder Error:", error.message);

    throw error;

  }
};

export default reportsSeeder;