import { useNavigation } from "@react-navigation/native";
import { setAsyncStorage } from "@src/utils/asyncStorage";
import checkErrors, { CorrectionItem } from "@src/utils/dictationString";
import { useState } from "react";

const useTextDictation = (dictationID: string, dictationText: string) => {
  const navigation = useNavigation();
  const [userText, setUserText] = useState("");
  const [correction, setCorrectionItem] = useState<CorrectionItem[]>([]);
  const [state, setState] = useState<"working" | "finished">("working");

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

      navigation.navigate("Result", {
        note: resultOn20,
      });
    }
  };

  const value = {
    state,
    userText,
    correction,
    setUserText,
    verify,
    restartDictation: () => {
      setState("working");
    },
  };

  return value;
};

export default useTextDictation;
