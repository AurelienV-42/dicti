import { Grade } from "@appTypes/database";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getGradeByUserId,
  getGradesByUserId,
  updateGrade,
} from "@api/grades.query";

export const useGrades = (userId: string) =>
  useQuery({
    queryKey: ["grades", userId],
    queryFn: () => getGradesByUserId(userId),
    enabled: !!userId,
  });

export const useGrade = (userId: string, dictationId: string) =>
  useQuery({
    queryKey: ["grade", userId, dictationId],
    queryFn: () => getGradeByUserId(userId, dictationId),
    enabled: !!userId && !!dictationId,
  });

interface UpdateGradeParams {
  updates: Partial<Grade>;
  gradeId?: string;
}

export const useUpdateGrade = () =>
  useMutation({
    mutationFn: ({ updates, gradeId }: UpdateGradeParams) =>
      updateGrade(updates, gradeId),
  });
