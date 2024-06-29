import MyText from "@src/components/natives/MyText";
import DictationTemplate from "@src/components/templates/DictationTemplate";
import useDatabaseDictation from "@src/hooks/dictation/useDatabaseDictation";
import React from "react";

const Dictation = ({ route }: { route: any }) => {
  const { dictationId } = route.params;
  const { dictation, mp3File } = useDatabaseDictation(dictationId);

  if (!dictation)
    return <MyText>Nous n'avons pas retrouvé cette dictée</MyText>;

  return (
    <DictationTemplate
      dictationId={dictationId}
      title={dictation.title}
      content={dictation.content}
      mp3File={mp3File}
    />
  );
};

export default Dictation;
