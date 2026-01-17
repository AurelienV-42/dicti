export interface Account {
  id: string;
  email: string;
  role?: string;
  created_at?: string;
}

export interface Grade {
  id?: string;
  user_id: string;
  dictation_id: string;
  grade: number;
  gradeOn20?: number;
  created_at?: string;
  updated_at?: string;
}

export interface AccountResult {
  account: Account | null;
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

export interface CreateAccountData {
  id?: string;
  email: string;
}
