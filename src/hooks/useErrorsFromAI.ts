import { CorrectionItem } from "@src/utils/dictationString";
import sleep from "@src/utils/sleep";
import { useEffect, useState } from "react";

const useErrorsFromAI = (
  correction: CorrectionItem[],
  indexModalVisible: number,
) => {
  const [errorsFromAI, setErrorsFromAI] = useState<string[]>([]);

  useEffect(() => {
    console.log("correction", correction[indexModalVisible]);
    sleep(2000).then(() => setErrorsFromAI(["Correction from AI"]));
  }, [correction, indexModalVisible]);

  return errorsFromAI;
};

export default useErrorsFromAI;
