import { useLocalSearchParams } from "expo-router";
import DictationTemplate from "@components/templates/DictationTemplate";
import useDatabaseDictation from "@hooks/dictation/useDatabaseDictation";

const Dictation = (): React.ReactElement => {
  const { dictationID } = useLocalSearchParams<{ dictationID: string }>();
  const { dictation, mp3File } = useDatabaseDictation(dictationID ?? "");

  return (
    <DictationTemplate
      dictationID={dictationID ?? ""}
      title={dictation?.title}
      content={dictation?.content}
      mp3File={mp3File}
    />
  );
};

export default Dictation;
