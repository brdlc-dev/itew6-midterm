// src/context/AppDataContext.jsx
import { createContext, useContext } from "react";
import {
  useStudents,
  useFaculty,
  usePrograms,
  useDashboardStats,
} from "../hooks/useDatabase";

const AppDataContext = createContext(null);

export function AppDataProvider({ children }) {
  const {
    students,
    loading: studentsLoading,
    error: studentsError,
    addStudent,
    updateStudent,
    deleteStudent,
  } = useStudents();

  const {
    faculty,
    loading: facultyLoading,
    error: facultyError,
  } = useFaculty();
  const {
    programs,
    loading: programsLoading,
    error: programsError,
  } = usePrograms();
  const {
    stats,
    loading: statsLoading,
    error: statsError,
  } = useDashboardStats();

  return (
    <AppDataContext.Provider
      value={{
        students,
        studentsLoading,
        studentsError,
        addStudent,
        updateStudent,
        deleteStudent,
        faculty,
        facultyLoading,
        facultyError,
        programs,
        programsLoading,
        programsError,
        stats,
        statsLoading,
        statsError,
      }}
    >
      {children}
    </AppDataContext.Provider>
  );
}

export function useAppData() {
  const context = useContext(AppDataContext);
  if (!context)
    throw new Error("useAppData must be used inside AppDataProvider");
  return context;
}
