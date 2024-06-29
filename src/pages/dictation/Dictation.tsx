import MyText from "@src/components/natives/MyText";
import DictationTemplate from "@src/components/templates/DictationTemplate";
import useDatabaseDictation from "@src/hooks/dictation/useDatabaseDictation";
import React from "react";

const Dictation = ({ route }: { route: any }) => {
  const { dictationID } = route.params;
  const { dictation, mp3File } = useDatabaseDictation(dictationID);

  if (!dictation)
    return <MyText>Nous n'avons pas retrouvé cette dictée</MyText>;

  return (
    <DictationTemplate
      dictationID={dictationID}
      title={dictation.title}
      content={dictation.content}
      mp3File={mp3File}
    />
  );
};

export default Dictation;
