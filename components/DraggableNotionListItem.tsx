import {
  View,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  useColorScheme,
} from "react-native";
import React, { useState } from "react";
import { ThemedText } from "./ThemedText";
import { RenderItemParams } from "react-native-draggable-flatlist";
import { NotionFile } from "@prisma/client/react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { extendedClient } from "@/myDbModule";
import { Colors } from "@/constants/Colors";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { Link } from "expo-router";

export default function DraggableNotionListItem({
  drag,
  isActive,
  item,
}: RenderItemParams<NotionFile>) {
  return (
    <NotionFileItem
      drag={drag}
      isActive={isActive}
      iconColor="gray"
      notionFile={item}
    />
  );
}

interface InnerNotionListItemProps {
  parentId: number | undefined;
}
function InnerNotionListItem({ parentId }: InnerNotionListItemProps) {
  const theme = useColorScheme() ?? "light";
  const iconColor = theme === "light" ? Colors.light.icon : Colors.dark.icon;
  const childs = extendedClient.notionFile.useFindMany({
    where: { parentFileId: parentId },
  });

  if (childs.length === 0)
    return <ThemedText style={{ color: "gray" }}>No pages inside!</ThemedText>;
  return (
    <View>
      {childs.map((notionFile: NotionFile) => (
        <NotionFileItem
          key={notionFile.id}
          iconColor={iconColor}
          notionFile={notionFile}
        />
      ))}
    </View>
  );
}

interface NotionFileItemProps {
  drag?: () => void;
  isActive?: boolean;
  notionFile: NotionFile;
  iconColor: string;
}

function NotionFileItem({
  isActive,
  iconColor,
  notionFile,
  drag,
}: NotionFileItemProps) {
  const { showActionSheetWithOptions } = useActionSheet();
  const [isOpen, setIsOpen] = useState(false);

  const onPress = (id: number) => {
    const options = ["Delete", "Cancel"];
    const destructiveButtonIndex = 0;
    const cancelButtonIndex = 1;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
      },
      (selectedIndex: number | undefined) => {
        switch (selectedIndex) {
          case destructiveButtonIndex: {
            extendedClient.notionFile.delete({
              where: { id: id },
            });
            break;
          }
          case cancelButtonIndex: {
          }
        }
      }
    );
  };
  return (
    <View>
      <Link
        asChild
        push
        href={{
          pathname: "/(tabs)/new-notion",
          params: { viewingFile: JSON.stringify(notionFile) },
        }}
      >
        <TouchableOpacity
          style={styles.heading}
          activeOpacity={0.8}
          disabled={isActive}
          onLongPress={drag}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Pressable onPress={() => setIsOpen((value) => !value)}>
              <Ionicons
                size={18}
                style={{ marginRight: 12 }}
                color={iconColor}
                name={isOpen ? "chevron-down" : "chevron-forward-outline"}
              />
            </Pressable>
            <ThemedText type="defaultSemiBold">
              {notionFile.icon}
              {notionFile.title}
            </ThemedText>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
            <Pressable onPress={() => notionFile.id}>
              <Ionicons
                size={18}
                color={iconColor}
                name={"ellipsis-horizontal"}
              />
            </Pressable>
            <Link
              href={{
                pathname: "/(tabs)/new-notion",
                params: { parentId: notionFile.id },
              }}
            >
              <Ionicons size={22} color={iconColor} name={"add"} />
            </Link>
          </View>
        </TouchableOpacity>
      </Link>

      {isOpen ? (
        <View style={styles.content}>
          <InnerNotionListItem parentId={notionFile.id} />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    justifyContent: "space-between",
  },
  content: {
    marginLeft: 24,
  },
});
