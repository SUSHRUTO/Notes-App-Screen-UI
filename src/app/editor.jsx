import React, {
  useContext,
  useState,
} from "react";

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
  Alert,
  useWindowDimensions,
} from "react-native";

import {
  router,
  useLocalSearchParams,
} from "expo-router";

import {
  ThemeContext,
} from "../components/ThemeContext";

import {
  NotesContext,
} from "../components/NotesContext";

export default function Editor() {
  const { darkMode } =
    useContext(ThemeContext);

  const {
    addNote,
    updateNote,
  } = useContext(NotesContext);

  const params =
    useLocalSearchParams();

  const [title, setTitle] =
    useState(params.title || "");

  const [content, setContent] =
    useState(params.content || "");

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

  const handleSave = () => {
    if (!title || !content) {
      Alert.alert(
        "Missing Fields",
        "Please enter title and content."
      );

      return;
    }

    if (params.id) {
      updateNote({
        id: params.id,
        title,
        content,
        date:
          new Date().toLocaleDateString(),
      });
    } else {
      addNote({
        id: Date.now().toString(),
        title,
        content,
        date:
          new Date().toLocaleDateString(),
      });
    }

    Alert.alert(
      "Success",
      "Note saved successfully."
    );

    router.back();
  };

  return (
    <KeyboardAvoidingView
      behavior={
        Platform.OS === "ios"
          ? "padding"
          : undefined
      }
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
      <ImageBackground
        source={{
          uri: "https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=1200&auto=format&fit=crop",
        }}
        style={styles.header}
        imageStyle={{
          borderRadius: 28,
        }}
      >
        <View style={styles.overlay}>
          <Text style={styles.headerText}>
            {params.id
              ? "Edit Note"
              : "Create Note"}
          </Text>
        </View>
      </ImageBackground>

      <TextInput
        placeholder="Note Title"
        placeholderTextColor={
          theme.subtext
        }
        value={title}
        onChangeText={setTitle}
        style={[
          styles.titleInput,
          {
            backgroundColor:
              theme.card,
            color: theme.text,
            borderColor:
              theme.border,
          },
        ]}
      />

      <TextInput
        placeholder="Start writing..."
        placeholderTextColor={
          theme.subtext
        }
        value={content}
        onChangeText={setContent}
        multiline
        textAlignVertical="top"
        style={[
          styles.contentInput,
          {
            backgroundColor:
              theme.card,
            color: theme.text,
            borderColor:
              theme.border,
          },
        ]}
      />

      <View style={styles.buttonRow}>
        <Pressable
          style={[
            styles.button,
            {
              backgroundColor: "#999",
            },
          ]}
          onPress={() =>
            router.back()
          }
        >
          <Text style={styles.buttonText}>
            Back
          </Text>
        </Pressable>

        <Pressable
          style={[
            styles.button,
            {
              backgroundColor:
                theme.primary,
            },
          ]}
          onPress={handleSave}
        >
          <Text style={styles.buttonText}>
            Save
          </Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
  },

  header: {
    height: 220,
    justifyContent: "flex-end",
    marginBottom: 28,
  },

  overlay: {
    flex: 1,
    backgroundColor:
      "rgba(0,0,0,0.35)",
    borderRadius: 28,
    justifyContent: "flex-end",
    padding: 24,
  },

  headerText: {
    color: "white",
    fontSize: 32,
    fontWeight: "700",
  },

  titleInput: {
    height: 60,
    borderRadius: 20,
    paddingHorizontal: 20,
    fontSize: 18,
    borderWidth: 1,
    marginBottom: 20,
  },

  contentInput: {
    flex: 1,
    borderRadius: 24,
    padding: 20,
    fontSize: 16,
    borderWidth: 1,
    marginBottom: 25,
  },

  buttonRow: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 35,
  },

  button: {
    flex: 1,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 18,
  },

  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
  },
});