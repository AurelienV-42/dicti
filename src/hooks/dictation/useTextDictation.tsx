import { setAsyncStorage } from "@src/utils/asyncStorage";
import checkErrors, { CorrectionItem } from "@src/utils/dictationString";
import { useState } from "react";

const useTextDictation = (dictationID: string, dictationText: string) => {
  const [userText, setUserText] = useState("");
  const [correction, setCorrectionItem] = useState<CorrectionItem[]>([]);
  const [state, setState] = useState<"working" | "finished">("working");
  const [note, setNote] = useState<string>("");

  const verify = () => {
    if (state === "working") {
      const result = checkErrors(userText, dictationText);
      setCorrectionItem(result);
      setState("finished");
    } else {
      const nbError = correction.filter((r) => r.errors).length;
      const resultOn20 = (
        (20 * (correction.length - nbError)) /
        correction.length
      ).toFixed();
      setAsyncStorage(dictationID, resultOn20);
      setNote(resultOn20);
    }
  };

  const value = {
    state,
    userText,
    correction,
    note,
    setUserText,
    verify,
    restartDictation: () => {
      setState("working");
    },
  };

  return value;
};

export default useTextDictation;
