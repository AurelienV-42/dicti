import { Grade, GradeResult, GradesResult } from "@appTypes/database";
import { supabase } from "@utils/supabase";

export const updateGrade = async (
  updates: Partial<Grade>,
  gradeId?: string,
): Promise<GradeResult> => {
  try {
    let payload = updates;

    if (gradeId) {
      payload = { ...updates, id: gradeId };
    }

    const { data, error } = await supabase
      .from("grades")
      .upsert(payload)
      .single();

    if (error) throw error;
    return { grade: data as Grade, error: null };
  } catch (error) {
    return { grade: null, error: error as Error };
  }
};

export const getGradesByUserId = async (
  userId: string,
): Promise<GradesResult> => {
  try {
    const { data, error } = await supabase
      .from("grades")
      .select("*")
      .eq("user_id", userId);

    if (error) throw error;
    return { grades: data as Grade[], error: null };
  } catch (error) {
    return { grades: null, error: error as Error };
  }
};

export const getGradeByUserId = async (
  userId: string,
  dictationId: string,
): Promise<GradeResult> => {
  try {
    const { data, error } = await supabase
      .from("grades")
      .select("*")
      .eq("user_id", userId)
      .eq("dictation_id", dictationId);

    if (error) throw error;
    const grade = Array.isArray(data) ? data[0] : data;
    return { grade: (grade as Grade) ?? null, error: null };
  } catch (error) {
    return { grade: null, error: error as Error };
  }
};
