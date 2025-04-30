import { View, Text, useColorScheme, StyleSheet } from "react-native";
import React from "react";
import { extendedClient } from "@/myDbModule";
import { ThemedText } from "./ThemedText";
import { ScrollView } from "react-native-gesture-handler";
import ResentFileCard from "./ResentFileCard";

export default function ResentFile() {
  const files = extendedClient.notionFile.useFindMany({
    orderBy: { updateAt: "desc" },
    take: 6,
    where: { parentFileId: { equals: null } },
  });

  return (
    <View style={styles.container}>
      <ThemedText style={{ paddingHorizontal: 10 }} type="defaultSemiBold">
        Jump back in
      </ThemedText>
      {!files.length && (
        <ThemedText
          style={{ color: "gray", textAlign: "center", paddingTop: 12 }}
        >
          Nothing to show!
        </ThemedText>
      )}
      <ScrollView
        horizontal
        contentContainerStyle={{ gap: 12, padding: 10 }}
        showsHorizontalScrollIndicator={false}
      >
        {files.map((file) => (
          <ResentFileCard notionFile={file} key={file.id} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
});
