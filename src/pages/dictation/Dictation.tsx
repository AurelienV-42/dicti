import { RouteProp, useRoute } from "@react-navigation/native";
import DictationTemplate from "@src/components/templates/DictationTemplate";
import useDatabaseDictation from "@src/hooks/dictation/useDatabaseDictation";
import { RootStackParamList } from "@src/types/navigation";
import React from "react";

const Dictation = () => {
  const route = useRoute<RouteProp<RootStackParamList, "Dictation">>();
  const { dictationID } = route.params;
  const { dictation, mp3File } = useDatabaseDictation(dictationID);

  return (
    <DictationTemplate
      dictationID={dictationID}
      title={dictation?.title}
      content={dictation?.content}
      mp3File={mp3File}
    />
  );
};

export default Dictation;
