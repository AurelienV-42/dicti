import { useAuth } from "@src/context/Auth";
import { getGradeByUserId, updateGrade } from "@src/queries/grades.query";
import checkErrors, { CorrectionItem } from "@src/utils/dictationString";
import { useState } from "react";

const useTextDictation = (
  dictationID: string,
  dictationText: string,
  setIsResultVisible: (value: boolean) => void,
) => {
  const [userText, setUserText] = useState("");
  const [correction, setCorrectionItem] = useState<CorrectionItem[]>([]);
  const [state, setState] = useState<"working" | "finished">("working");
  const [grade, setGrade] = useState<string>("");
  const { user } = useAuth();

  const verify = () => {
    if (!user) throw new Error("User not found");

    if (state === "working") {
      const result = checkErrors(userText, dictationText);
      setCorrectionItem(result);
      setState("finished");
    } else {
      const nbError = correction.filter((r) => r.errors).length;
      const gradeOn20 = (
        (20 * (correction.length - nbError)) /
        correction.length
      ).toFixed();
      getGradeByUserId(user.id, dictationID).then((result) => {
        updateGrade(
          {
            dictation_id: dictationID,
            gradeOn20,
          },
          result.grade.length > 0 && result.grade[0].id, // index 0 because there is only one grade per dictation
        );
      });

      setGrade(gradeOn20);
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
