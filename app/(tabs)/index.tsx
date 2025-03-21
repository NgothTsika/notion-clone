import { SafeAreaView } from "react-native";

import { ThemedView } from "@/components/ThemedView";
import { extendedClient } from "@/myDbModule";

export default function HomeScreen() {
  const user = extendedClient.user.useFindFirst({ where: { id: 1 } });

  const createUser = () => {
    const newUser = { name: "Genial", email: "Genial@expo.dev" };
    extendedClient.user.create({ data: newUser });
  };
  return (
    <ThemedView>
      <SafeAreaView>
        {/* <Button title="user" onPress={createUser} /> */}
        hello word
      </SafeAreaView>
    </ThemedView>
  );
}
