import { PrismaClient } from "@prisma/client/react-native";
import { reactiveHooksExtension } from "@prisma/react-native";

export const baseClient = new PrismaClient({
  log: [
    { emit: "stdout", level: "info" },
    { emit: "stdout", level: "warn" },
    { emit: "stdout", level: "error" },
  ],
});

export const extendedClient = baseClient.$extends(reactiveHooksExtension());

export async function initializeDb() {
  try {
    await baseClient.$applyPendingMigrations();
    console.log("Database initialized");
  } catch (e) {
    console.log(`failed to initialize database: ${e}`);
    throw new Error(
      "Apply migrations failed, your app will not work correctly"
    );
  }
}
