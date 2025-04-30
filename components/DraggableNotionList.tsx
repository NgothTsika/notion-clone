import React, { useEffect, useState } from "react";
import DraggableFlatList from "react-native-draggable-flatlist";
import { baseClient, extendedClient } from "@/myDbModule";
import { NotionFile } from "@prisma/client/react-native";
import DraggableNotionListItem from "./DraggableNotionListItem";
import { TouchableOpacity, View } from "react-native";
import { ThemedText } from "./ThemedText";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function DraggableNotionList() {
  const [sortedFiles, setSortedFiles] = useState<NotionFile[]>([]);

  const files = extendedClient.notionFile.useFindMany({
    where: { parentFile: { is: null } },
    orderBy: { order: "asc" },
  });

  useEffect(() => {
    setSortedFiles(files);
  }, [files]);

  const handleDragEnd = async (data: NotionFile[]) => {
    setSortedFiles(data);
    const updates = data.map((file, index) => {
      return baseClient.notionFile.update({
        where: { id: file.id },
        data: { order: index },
      });
    });
    await baseClient.$transaction(updates);
    await extendedClient.$refreshSubscriptions();
  };
  return (
    <DraggableFlatList
      data={sortedFiles}
      containerStyle={{ flex: 1 }}
      onDragEnd={({ data }) => handleDragEnd(data)}
      keyExtractor={(item) => item.id.toString()}
      renderItem={DraggableNotionListItem}
      ListHeaderComponent={() => (
        <>
          <View
            style={{
              paddingHorizontal: 12,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <ThemedText type="defaultSemiBold">Private File</ThemedText>
            <TouchableOpacity
              style={{ flexDirection: "row", alignItems: "center" }}
            >
              <Ionicons name="arrow-up" size={15} color={"gray"} />
              <Ionicons name="arrow-down" size={15} color={"gray"} />
            </TouchableOpacity>
          </View>
          {!sortedFiles.length && (
            <ThemedText
              style={{ color: "gray", textAlign: "center", paddingTop: 12 }}
            >
              Nothing to show!
            </ThemedText>
          )}
        </>
      )}
    />
  );
}
