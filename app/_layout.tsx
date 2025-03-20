import { Stack } from "expo-router";
import "../global.css";
import { useEffect } from "react";
import { initializeDb } from "@/myDbModule";

export default function RootLayout() {
  useEffect(() => {
    const setup = async () => {
      try {
        await initializeDb();
      } catch (e) {
        console.log(`failed to initialize database: ${e}`);
      }
    };
    setup();
  }, []);

  return <Stack />;
}
