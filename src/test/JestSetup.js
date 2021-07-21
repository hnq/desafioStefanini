import "regenerator-runtime/runtime";
import { db } from "../app/concerns/database";

beforeEach(async () => {
  await db.sync({ force: true });
});

process.env.SEQUELIZE_LOGGING = false;
