import { Button, SafeAreaView, StyleSheet } from "react-native";

import { ThemedView } from "@/components/ThemedView";
import { extendedClient } from "@/myDbModule";
import { ThemedText } from "@/components/ThemedText";
import DraggableNotionList from "@/components/DraggableNotionList";
import ResentFile from "@/components/ResentFile";

export default function HomeScreen() {
  const user = extendedClient.user.useFindFirst({ where: { id: 1 } });

  const createUser = () => {
    const newUser = { name: "Genial", email: "Genial@expo.dev" };
    extendedClient.user.create({ data: newUser });
    console.log("success");
  };
  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.container}>
        <ResentFile />
        <DraggableNotionList />
        {/* <Button title="Create user" onPress={createUser} /> */}
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
