import { useNavigation } from "@react-navigation/native";
import checkErrors, { CorrectedText } from "@src/utils/dictationString";
import { ReactNode, createContext, useContext, useState } from "react";

const DictationContext = createContext<{
  state: "working" | "finished";
  dictationText: string;
  correctedText: CorrectedText[];
  setDictationText: (text: string) => void;
  verify: () => void;
  restartDictation: () => void;
}>({
  state: "working",
  dictationText: "",
  correctedText: [],
  setDictationText: () => {},
  verify: () => {},
  restartDictation: () => {},
});

const DictationProvider = ({ children }: { children: ReactNode }) => {
  const navigation = useNavigation();
  const [correction, setCorrection] = useState(
    "Bonjour, je m'appelle Aurélien. J'ai 25 ans, je développe plein d'applis !",
  );
  const [dictationText, setDictationText] = useState("");
  const [correctedText, setCorrectedText] = useState<CorrectedText[]>([]);
  const [state, setState] = useState<"working" | "finished">("working");
  const [nbError, setNbError] = useState(0);

  const verify = () => {
    if (state === "working") {
      const result = checkErrors(dictationText, correction);
      setNbError(result.filter((r) => r.errors).length);
      setCorrectedText(result);
      setState("finished");
    } else {
      navigation.navigate("Result", {
        nbError,
      });
    }
  };

  const value = {
    state,
    dictationText,
    correctedText,
    setDictationText,
    verify,
    restartDictation: () => {
      setState("working");
    },
  };

  return (
    <DictationContext.Provider value={value}>
      {children}
    </DictationContext.Provider>
  );
};

export const useDictation = () => {
  return useContext(DictationContext);
};

export default DictationProvider;
