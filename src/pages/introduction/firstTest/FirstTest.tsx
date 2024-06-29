import { ID_FIRST_TEST } from "@config/dictations";
import MyText from "@src/components/natives/MyText";
import DictationTemplate from "@src/components/templates/DictationTemplate";
import useDatabaseDictation from "@src/hooks/dictation/useDatabaseDictation";
import React from "react";

const FirstTest = ({ route }: { route: any }) => {
  const { dictationID } = route.params;
  const { dictation, mp3File } = useDatabaseDictation(dictationID);

  if (!dictation)
    return <MyText>Nous n'avons pas retrouvé cette dictée</MyText>;

  return (
    <DictationTemplate
      dictationID={ID_FIRST_TEST}
      title={dictation.title}
      content={dictation.content}
      mp3File={mp3File}
    />
  );
};

export default FirstTest;
