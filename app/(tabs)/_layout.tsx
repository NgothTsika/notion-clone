import React from "react";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Tabs } from "expo-router";
import { Colors } from "@/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useFocusEffect } from "expo-router";
import { useState, useCallback } from "react";

export default function TabLayout() {
  const [mounted, setMounted] = useState(true);
  const colorScheme = useColorScheme();

  useFocusEffect(
    useCallback(() => {
      setMounted(true);
      return () => setMounted(false);
    }, [])
  );

  if (!mounted) return null;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? "home" : "home-outline"} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "search" : "search-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="new-notion "
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "pencil-sharp" : "pencil"}
              color={color}
            />
          ),
          headerShown: true,
          headerTitle: "",
          headerStyle: { shadowColor: "transparent" },
        }}
      />
    </Tabs>
  );
}
