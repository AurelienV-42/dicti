import { RouteProp, useRoute } from "@react-navigation/native";
import DictationTemplate from "@components/templates/DictationTemplate";
import useDatabaseDictation from "@hooks/dictation/useDatabaseDictation";
import { RootStackParamList } from "@appTypes/navigation";

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
