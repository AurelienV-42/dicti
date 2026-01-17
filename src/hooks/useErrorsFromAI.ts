import { useAuth } from "@src/stores/auth.store";
import { CorrectionItem } from "@src/utils/dictationString";
import { supabase } from "@src/utils/supabase";
import { useEffect, useState } from "react";

interface ExplanationResponse {
  data: string | undefined;
  error: Error | null;
}

async function getCorrectedWordExplanation(
  incorrectWord: string,
  correctWord: string,
  correctText: string,
  userID: string,
): Promise<ExplanationResponse> {
  const response = await supabase.functions.invoke("explanation", {
    body: JSON.stringify({ incorrectWord, correctWord, correctText, userID }),
  });
  return { data: response.data?.explanation, error: response.error };
}

const useErrorsFromAI = (
  correction: CorrectionItem[],
  correctText: string,
  indexModalVisible: number,
) => {
  const [errorsFromAI, setErrorsFromAI] = useState<string[] | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const userID = useAuth().user?.id;

  useEffect(() => {
    const currentCorrection = correction[indexModalVisible];
    if (
      indexModalVisible === -1 ||
      (currentCorrection?.errors && currentCorrection.errors.length > 0)
    ) {
      setErrorsFromAI(undefined);
      setIsLoading(false);
      return;
    }
    const { correctWord, userWord } = currentCorrection;

    setIsLoading(true);
    getCorrectedWordExplanation(
      userWord,
      correctWord,
      correctText,
      userID ?? "anonymous",
    )
      .then((result) => {
        if (result.data) {
          setErrorsFromAI([result.data]);
        }
      })
      .catch((error) => console.warn("Fetch Correction with AI Failed", error))
      .finally(() => {
        setIsLoading(false);
      });
  }, [correctText, correction, indexModalVisible]);

  return { errorsFromAI, isLoading, maxReached: false };
};

export default useErrorsFromAI;
