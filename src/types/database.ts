import { Tables, TablesInsert, Enums } from "@appTypes/supabase";

// User types from Supabase
export type User = Tables<"users">;
export type UserInsert = TablesInsert<"users">;
export type UserRole = Enums<"user_role">;

// Grade - will be generated after table creation
export interface Grade {
  id?: string;
  user_id: string;
  dictation_id: string;
  grade: number;
  grade_on_20?: number;
  created_at?: string;
  updated_at?: string;
}

// Result types
export interface UserResult {
  user: User | null;
  error: Error | null;
}

export interface GradeResult {
  grade: Grade | null;
  error: Error | null;
}

export interface GradesResult {
  grades: Grade[] | null;
  error: Error | null;
}
