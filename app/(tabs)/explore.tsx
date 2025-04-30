import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { extendedClient } from "@/myDbModule";
import { Link } from "expo-router";

const ExploreScreen = () => {
  const today = new Date();
  const startOfToday = new Date(today.setHours(0, 0, 0, 0));
  const endOfToday = new Date(today.setHours(23, 59, 59, 999));
  const startOfLastWeek = new Date(startOfToday);
  startOfLastWeek.setDate(startOfToday.getDate() - startOfToday.getDate() - 6);
  const endOfLastWeek = new Date(startOfToday);
  endOfLastWeek.setDate(startOfToday.getDate() - startOfToday.getDate());

  const todayFiles = extendedClient.notionFile.useFindMany({
    where: {
      updateAt: {
        gte: startOfToday,
        lte: endOfToday,
      },
    },
    orderBy: {
      updateAt: "desc",
    },
  });
  const lastWeekFiles = extendedClient.notionFile.useFindMany({
    where: {
      updateAt: {
        gte: startOfLastWeek,
        lte: endOfLastWeek,
      },
    },
    orderBy: {
      updateAt: "desc",
    },
  });
  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={{ padding: 15 }}
        >
          <View style={styles.section}>
            <ThemedText type="defaultSemiBold">Today</ThemedText>
            {todayFiles.map((file) => (
              <Link
                key={file.id}
                href={{
                  pathname: "/(tabs)/new-notion",
                  params: { viewwingFile: JSON.stringify(file) },
                }}
                asChild
              >
                <TouchableOpacity style={styles.item}>
                  <ThemedText style={{ color: "#007AFF" }}>
                    - {file.icon} {file.title}
                  </ThemedText>
                </TouchableOpacity>
              </Link>
            ))}
          </View>
          <View style={styles.section}>
            <ThemedText type="defaultSemiBold">Last week</ThemedText>
            {lastWeekFiles.map((file) => (
              <Link
                key={file.id}
                href={{
                  pathname: "/(tabs)/new-notion",
                  params: { viewwingFile: JSON.stringify(file) },
                }}
                asChild
              >
                <TouchableOpacity style={styles.item}>
                  <ThemedText style={{ color: "#007AFF" }}>
                    - {file.icon} {file.title}
                  </ThemedText>
                </TouchableOpacity>
              </Link>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
};

export default ExploreScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    marginBottom: 15,
  },
  item: {
    marginBottom: 8,
  },
});
