import { MAX_LENGTH_PASSWORD } from "@config/inputs";
import { useRouter } from "expo-router";
import MyKeyboardAvoidingView from "@components/MyKeyboardAvoidingView";
import EmailInput from "@components/inputs/EmailInput";
import PasswordInput from "@components/inputs/PasswordInput";
import MyButton from "@components/natives/MyButton";
import MyPressable from "@components/natives/MyPressable";
import MyText from "@components/natives/MyText";
import HeaderTemplate from "@components/templates/HeaderTemplate";
import ScreenTemplate from "@components/templates/ScreenTemplate";
import { useAuth } from "@stores/auth.store";
import { useIsLoading } from "@stores/loading.store";
import { emailChecker, passwordChecker } from "@utils/validation";
import { ArrowRight } from "phosphor-react-native";
import { useState } from "react";
import { Keyboard, View } from "react-native";

const SignIn = (): React.ReactElement => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setIsLoading } = useIsLoading();
  const auth = useAuth();

  const complete = async (): Promise<void> => {
    const cleanedEmail = email.trim();
    const resultEmail = emailChecker(cleanedEmail);
    const resultPassword = passwordChecker(password);

    if (resultEmail !== undefined) {
      setError(resultEmail);
      return;
    } else if (resultPassword !== undefined) {
      setError(resultPassword);
      return;
    }
    setIsLoading(true);
    Keyboard.dismiss();

    auth
      ?.signIn(cleanedEmail, password)
      .then(() => router.replace("/"))
      .catch((err: Error) => console.warn("Sign In", err))
      .finally(() => setIsLoading(false));
  };

  return (
    <ScreenTemplate edges={["top", "bottom"]} padding className="pb-4">
      <HeaderTemplate
        rightComponent={
          <MyPressable
            className="flex-row items-center"
            onPress={() => router.push("/(auth)/first-test")}
          >
            <MyText className="text-base text-dark mr-2">
              {"Pas de compte"}
            </MyText>
            <ArrowRight />
          </MyPressable>
        }
      />
      <MyKeyboardAvoidingView className="justify-between flex-1">
        <>
          <View />
          <View>
            <MyText className="text-l mb-2">{"Email"}</MyText>
            <EmailInput
              value={email}
              onChangeText={(newEmail: string) => {
                setEmail(newEmail);
                setError("");
              }}
              autoFocus
            />

            <MyText className="text-l mb-2">Mot de passe</MyText>
            <PasswordInput
              value={password}
              onChangeText={(newPassword: string) => {
                setPassword(newPassword);
                setError("");
              }}
              maxLength={MAX_LENGTH_PASSWORD}
              onSubmitEditing={complete}
            />
            <MyText className="text-red-300 text-sm mb-2">
              {error ? error : " "}
            </MyText>
          </View>
          <View>
            <MyButton
              className="w-full"
              txt={"Se connecter"}
              onPress={complete}
              disabled={email.length < 2 || password.length < 2}
            />
          </View>
        </>
      </MyKeyboardAvoidingView>
    </ScreenTemplate>
  );
};

export default SignIn;
