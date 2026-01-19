import { ID_FIRST_TEST } from "@config/dictations";
import { useRouter } from "expo-router";
import DictationTemplate from "@components/templates/DictationTemplate";
import useDatabaseDictation from "@hooks/dictation/useDatabaseDictation";

const FirstTest = (): React.ReactElement => {
  const router = useRouter();
  const dictationID = ID_FIRST_TEST;
  const { dictation, mp3File } = useDatabaseDictation(dictationID);

  return (
    <DictationTemplate
      dictationID={ID_FIRST_TEST}
      title={dictation?.title}
      content={dictation?.content}
      mp3File={mp3File}
      onComplete={() => router.push("/(auth)/sign-up")}
    />
  );
};

export default FirstTest;
