import { Stack } from "expo-router";

import ThemeProvider from "../components/ThemeContext";

import NotesProvider from "../components/NotesContext";

export default function Layout() {
  return (
    <ThemeProvider>
      <NotesProvider>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />
      </NotesProvider>
    </ThemeProvider>
  );
}