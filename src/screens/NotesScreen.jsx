import React, {
  useContext,
  useState,
} from "react";

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  Pressable,
  Switch,
  useWindowDimensions,
  Alert,
} from "react-native";

import { router } from "expo-router";

import NoteCard from "../components/NoteCard";

import {
  ThemeContext,
} from "../components/ThemeContext";

import {
  NotesContext,
} from "../components/NotesContext";

export default function NotesScreen() {
  const { darkMode, setDarkMode } =
    useContext(ThemeContext);

  const {
    notes,
    deleteNote,
  } = useContext(NotesContext);

  const [search, setSearch] =
    useState("");

  const { width } =
    useWindowDimensions();

  const isTablet = width > 768;

  const theme = darkMode
    ? {
        background: "#0F1117",
        card: "#1A1D26",
        text: "#FFFFFF",
        subtext: "#B0B3BD",
        border: "#2B2F3A",
        primary: "#7C72FF",
      }
    : {
        background: "#F6F7FB",
        card: "#FFFFFF",
        text: "#1A1A1A",
        subtext: "#777777",
        border: "#ECECEC",
        primary: "#6C63FF",
      };

  const filteredNotes =
    notes.filter((note) =>
      note.title
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  const handleDelete = (id) => {
    Alert.alert(
      "Delete Note",
      "Are you sure you want to delete this note?",
      [
        {
          text: "Cancel",
        },

        {
          text: "Delete",
          style: "destructive",

          onPress: () =>
            deleteNote(id),
        },
      ]
    );
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor:
            theme.background,
          paddingHorizontal:
            isTablet ? 40 : 20,
        },
      ]}
    >
      <View style={styles.header}>
        <View>
          <Text
            style={[
              styles.smallText,
              {
                color: theme.subtext,
              },
            ]}
          >
            Welcome Back
          </Text>

          <Text
            style={[
              styles.heading,
              {
                color: theme.text,
              },
            ]}
          >
            My Notes
          </Text>
        </View>

        <Switch
          value={darkMode}
          onValueChange={(value) =>
            setDarkMode(value)
          }
        />
      </View>

      <TextInput
        placeholder="Search notes..."
        placeholderTextColor={
          theme.subtext
        }
        value={search}
        onChangeText={setSearch}
        style={[
          styles.searchInput,
          {
            backgroundColor:
              theme.card,
            color: theme.text,
            borderColor:
              theme.border,
          },
        ]}
      />

      <FlatList
        data={filteredNotes}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={
          false
        }
        renderItem={({ item }) => (
          <NoteCard
            item={item}
            theme={theme}
            onPress={() =>
              router.push({
                pathname: "/editor",
                params: {
                  id: item.id,
                  title: item.title,
                  content:
                    item.content,
                },
              })
            }
            onDelete={() =>
              handleDelete(item.id)
            }
          />
        )}
      />

      <Pressable
        style={[
          styles.fab,
          {
            backgroundColor:
              theme.primary,
          },
        ]}
        onPress={() =>
          router.push("/editor")
        }
      >
        <Text style={styles.fabText}>
          +
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 65,
  },

  header: {
    flexDirection: "row",
    justifyContent:
      "space-between",
    alignItems: "center",
    marginBottom: 28,
  },

  smallText: {
    fontSize: 15,
    marginBottom: 5,
  },

  heading: {
    fontSize: 34,
    fontWeight: "700",
  },

  searchInput: {
    height: 58,
    borderRadius: 18,
    paddingHorizontal: 20,
    fontSize: 16,
    borderWidth: 1,
    marginBottom: 25,
  },

  fab: {
    position: "absolute",
    bottom: 40,
    right: 25,
    width: 65,
    height: 65,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
  },

  fabText: {
    color: "white",
    fontSize: 34,
    fontWeight: "700",
  },
});