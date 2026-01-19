import { useGrade, useUpdateGrade } from "@api/grades.hook";
import { useAuth } from "@stores/auth.store";
import checkErrors, { CorrectionItem } from "@utils/dictationString";
import { useState } from "react";

const useTextDictation = (
  dictationID: string,
  setIsResultVisible: (value: boolean) => void,
  dictationText?: string,
) => {
  const [userText, setUserText] = useState("");
  const [correction, setCorrectionItem] = useState<CorrectionItem[]>([]);
  const [state, setState] = useState<"working" | "finished">("working");
  const [grade, setGrade] = useState<string>("");
  const { user } = useAuth();

  const { data: gradeData } = useGrade(user?.id ?? "", dictationID);
  const updateGradeMutation = useUpdateGrade();

  const verify = () => {
    if (!dictationText) return;
    if (state === "working") {
      const result = checkErrors(userText, dictationText);
      setCorrectionItem(result);
      setState("finished");
    } else {
      const nbError = correction.filter((r) => r.errors).length;
      const gradeOn20 = Math.round(
        (20 * (correction.length - nbError)) / correction.length,
      );
      if (user) {
        updateGradeMutation.mutate(
          {
            updates: {
              user_id: user.id,
              dictation_id: dictationID,
              grade: gradeOn20,
              grade_on_20: gradeOn20,
            },
            gradeId: gradeData?.grade?.id,
          },
          {
            onError: (error) => {
              console.warn("Failed to save grade:", error);
            },
          },
        );
      }

      setGrade(gradeOn20.toString());
      setIsResultVisible(true);
    }
  };

  const value = {
    state,
    userText,
    correction,
    grade,
    setUserText,
    verify,
    restartDictation: () => {
      setState("working");
    },
  };

  return value;
};

export default useTextDictation;
