import { ID_FIRST_TEST } from "@config/dictations";
import { useNavigation } from "@react-navigation/native";
import DictationTemplate from "@components/templates/DictationTemplate";
import useDatabaseDictation from "@hooks/dictation/useDatabaseDictation";

const FirstTest = () => {
  const navigation = useNavigation();
  const dictationID = ID_FIRST_TEST;
  const { dictation, mp3File } = useDatabaseDictation(dictationID);

  return (
    <DictationTemplate
      dictationID={ID_FIRST_TEST}
      title={dictation?.title}
      content={dictation?.content}
      mp3File={mp3File}
      onComplete={() => navigation.navigate("SignUp", { isSignIn: false })}
    />
  );
};

export default FirstTest;
