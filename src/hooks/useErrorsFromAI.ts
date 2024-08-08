import { useAuth } from "@src/context/Auth";
import { CorrectionItem } from "@src/utils/dictationString";
import { supabase } from "@src/utils/supabase";
import { useEffect, useState } from "react";

async function getCorrectedWordExplanation(
  incorrectWord: string,
  correctWord: string,
  correctText: string,
  userID: string,
): Promise<
  | {
    data: string;
    error: any;
  }
  | {
    data: undefined;
    error: any;
  }
> {
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
    if (
      indexModalVisible === -1 ||
      (correction[indexModalVisible].errors &&
        correction[indexModalVisible].errors.length > 0)
    ) {
      setErrorsFromAI(undefined);
      setIsLoading(false);
      return;
    }
    const { correctWord, userWord } = correction[indexModalVisible];

    setIsLoading(true);
    getCorrectedWordExplanation(
      userWord,
      correctWord,
      correctText,
      userID ?? "anonymous",
    ).then(
      (result) => {
        if (result.data) {
          setErrorsFromAI([result.data]);
        }
      },
    )
      .catch((error) => console.warn("Fetch Correction with AI Failed", error))
      .finally(() => {
        setIsLoading(false);
      });
  }, [correctText, correction, indexModalVisible]);

  return { errorsFromAI, isLoading, maxReached: false };
};

export default useErrorsFromAI;
