import { supabase } from "@src/utils/supabase";

export const updateGrade = async (
  updates: Partial<any>,
  gradeId?: string,
): Promise<any> => {
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
    return { grade: data, error: null };
  } catch (error) {
    console.error("Error updating grade:", error);
    return { grade: null, error: error as Error };
  }
};

export const getGradesByUserId = async (userId: string): Promise<any> => {
  try {
    const { data, error } = await supabase
      .from("grades")
      .select("*")
      .eq("user_id", userId);

    if (error) throw error;
    return { grades: data, error: null };
  } catch (error) {
    console.error("Error fetching grades:", error);
    return { grades: null, error: error as Error };
  }
};

export const getGradeByUserId = async (
  userId: string,
  dictationId: string,
): Promise<any> => {
  try {
    const { data, error } = await supabase
      .from("grades")
      .select("*")
      .eq("user_id", userId)
      .eq("dictation_id", dictationId);

    if (error) throw error;
    return { grade: data, error: null };
  } catch (error) {
    console.error("Error fetching grade:", error);
    return { grade: null, error: error as Error };
  }
};
