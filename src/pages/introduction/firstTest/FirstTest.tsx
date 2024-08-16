import { ID_FIRST_TEST } from "@config/dictations";
import DictationTemplate from "@src/components/templates/DictationTemplate";
import useDatabaseDictation from "@src/hooks/dictation/useDatabaseDictation";
import React from "react";

const FirstTest = ({ navigation }: { navigation: any }) => {
  const dictationID = ID_FIRST_TEST;
  const { dictation, mp3File } = useDatabaseDictation(dictationID);

  return (
    <DictationTemplate
      dictationID={ID_FIRST_TEST}
      title={dictation?.title}
      content={dictation?.content}
      mp3File={mp3File}
      onComplete={() => navigation.navigate("SignUp")}
    />
  );
};

export default FirstTest;
