import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
} from "react-native";
import React, { useMemo } from "react";
import { NotionFile } from "@prisma/client/react-native";
import { ThemedText } from "./ThemedText";
import { LinearGradient } from "expo-linear-gradient";
import { getRandomGradient } from "@/constants/Gradients";
import { Colors } from "@/constants/Colors";
import Animated, {
  LinearTransition,
  SlideInLeft,
  SlideOutLeft,
} from "react-native-reanimated";
import { useNavigation } from "expo-router";

interface ResentFileCardProps {
  notionFile: NotionFile;
}

export default function ResentFileCard({ notionFile }: ResentFileCardProps) {
  const color = useMemo(() => getRandomGradient(), []);
  const theme = useColorScheme();
  const navigation = useNavigation();
  return (
    <Animated.View
      layout={LinearTransition}
      entering={SlideInLeft}
      exiting={SlideOutLeft}
      style={{
        borderRadius: 16,
        backgroundColor: Colors[theme!].background,
        shadowColor: theme === "dark" ? "#ffffff20" : "black",
        shadowRadius: 4,
        shadowOffset: { height: 2, width: 0 },
        shadowOpacity: 0.09,
      }}
    >
      <TouchableOpacity
        onPress={() => {
          //@ts-ignore
          navigation.navigate("new-notion", {
            viewingFile: JSON.stringify(notionFile),
          });
        }}
        style={[
          styles.constainer,
          {
            backgroundColor: Colors[theme!].backgroundSecondary,
            borderColor: Colors[theme!].text + "20",
          },
        ]}
      >
        {notionFile.couverPhoto ? (
          <></>
        ) : (
          <LinearGradient
            style={{
              height: 16,
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
            }}
            colors={color}
          />
        )}
        <ThemedText style={styles.icon}>{notionFile.icon}</ThemedText>
        <ThemedText style={styles.title}>{notionFile.title}</ThemedText>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  constainer: {
    width: 120,
    height: 120,
    borderRadius: 16,
    borderWidth: 0.5,
  },
  icon: {
    fontSize: 32,
    lineHeight: 36,
    position: "absolute",
    top: 40,
    left: 6,
  },
  title: {
    fontWeight: "600",
    padding: 6,
    paddingTop: 16,
    lineHeight: 18,
  },
});
