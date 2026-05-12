import React, {
  createContext,
  useState,
} from "react";

export const NotesContext =
  createContext();

export default function NotesProvider({
  children,
}) {
  const [notes, setNotes] =
    useState([
      {
        id: "1",
        title: "Project Ideas",
        content:
          "Build a professional Notes App UI.",
        date: "10 May 2026",
      },

      {
        id: "2",
        title: "Meeting Notes",
        content:
          "Discuss responsive mobile layouts.",
        date: "11 May 2026",
      },
    ]);

  const addNote = (newNote) => {
    setNotes([newNote, ...notes]);
  };

  const deleteNote = (id) => {
    const filtered = notes.filter(
      (note) => note.id !== id
    );

    setNotes(filtered);
  };

  const updateNote = (updatedNote) => {
    const updatedNotes = notes.map(
      (note) =>
        note.id === updatedNote.id
          ? updatedNote
          : note
    );

    setNotes(updatedNotes);
  };

  return (
    <NotesContext.Provider
      value={{
        notes,
        addNote,
        deleteNote,
        updateNote,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
}