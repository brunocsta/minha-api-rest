require("dotenv").config();
export default {
  port: process.env.PORT || 3001,
  jsonlimit: "2mb",
  urlLimit: { extended: true, limit: "2mb" },
  appUrl: process.env.APP_URL || "http://localhost:3001",
  photoUrl: process.env.PHOTO_URL || "http://localhost:3001/images",
};
