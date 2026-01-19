import { useAuth } from "@stores/auth.store";
import { getGradeByUserId, updateGrade } from "@queries/grades.query";
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
      if (user)
        getGradeByUserId(user.id, dictationID).then((result) => {
          updateGrade(
            {
              user_id: user.id,
              dictation_id: dictationID,
              grade: gradeOn20,
              gradeOn20,
            },
            result.grade?.id,
          );
        });

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
