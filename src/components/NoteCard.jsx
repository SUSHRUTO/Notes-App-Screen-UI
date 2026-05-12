import React from "react";

import {
  View,
  Text,
  StyleSheet,
  Pressable,
} from "react-native";

export default function NoteCard({
  item,
  theme,
  onPress,
  onDelete,
}) {
  return (
    <Pressable
      style={[
        styles.card,
        {
          backgroundColor: theme.card,
          borderColor: theme.border,
        },
      ]}
      onPress={onPress}
    >
      <View style={styles.topRow}>
        <Text
          style={[
            styles.title,
            {
              color: theme.text,
            },
          ]}
        >
          {item.title}
        </Text>

        <Pressable
          style={styles.deleteButton}
          onPress={onDelete}
        >
          <Text style={styles.deleteText}>
            ✕
          </Text>
        </Pressable>
      </View>

      <Text
        style={[
          styles.content,
          {
            color: theme.subtext,
          },
        ]}
      >
        {item.content}
      </Text>

      <Text
        style={[
          styles.date,
          {
            color: theme.subtext,
          },
        ]}
      >
        {item.date}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 24,
    padding: 20,
    marginBottom: 18,
    borderWidth: 1,
    elevation: 3,
  },

  topRow: {
    flexDirection: "row",
    justifyContent:
      "space-between",
    alignItems: "center",
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 10,
    flex: 1,
  },

  deleteButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF4D4D",
  },

  deleteText: {
    color: "white",
    fontWeight: "700",
  },

  content: {
    fontSize: 15,
    lineHeight: 24,
    marginBottom: 14,
  },

  date: {
    fontSize: 12,
    opacity: 0.7,
  },
});