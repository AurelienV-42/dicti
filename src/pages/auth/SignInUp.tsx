import { ID_FIRST_TEST } from "@config/dictations";
import { MAX_LENGTH_PASSWORD } from "@config/inputs";
import MyKeyboardAvoidingView from "@src/components/MyKeyboardAvoidingView";
import EmailInput from "@src/components/inputs/EmailInput";
import PasswordInput from "@src/components/inputs/PasswordInput";
import MyButton from "@src/components/natives/MyButton";
import MyPressable from "@src/components/natives/MyPressable";
import MyText from "@src/components/natives/MyText";
import HeaderTemplate from "@src/components/templates/HeaderTemplate";
import ScreenTemplate from "@src/components/templates/ScreenTemplate";
import { useIsLoading } from "@src/context/IsLoading";
import { emailChecker, passwordChecker } from "@src/utils/validation";
import { ArrowRight } from "phosphor-react-native";
import React, { useState } from "react";
import { Keyboard, View } from "react-native";

const SignInUp = ({ navigation, route }: { navigation: any; route: any }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setIsLoading } = useIsLoading();
  const { isSignIn } = route.params;

  const complete = async () => {
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
    // auth?.signIn
    //   .mutateAsync({ email: cleanedEmail, password })
    //   .then(() => resetTo(navigation, "Loader"))
    //   .catch((error: any) => console.warn("Sign In", error))
    //   .finally(() => setIsLoading(false));
  };

  return (
    <ScreenTemplate edges={["top", "bottom"]} padding>
      <HeaderTemplate
        rightComponent={
          <MyPressable
            className="flex-row items-center"
            onPress={() => {
              isSignIn
                ? navigation.navigate("FirstTest", {
                    dictationID: ID_FIRST_TEST,
                  })
                : navigation.navigate("SignIn");
            }}
          >
            <MyText className="text-base text-dark mr-2">
              {isSignIn ? "Pas de compte" : "J'ai un compte"}
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
              onChangeText={(email: string) => {
                setEmail(email);
                setError("");
              }}
              autoFocus
            />

            <MyText className="text-l mb-2">Mot de passe</MyText>
            <PasswordInput
              value={password}
              onChangeText={(email: string) => {
                setPassword(email);
                setError("");
              }}
              maxLength={MAX_LENGTH_PASSWORD}
              onSubmitEditing={complete}
            />
            {error && (
              <MyText className="text-red text-sm mb-2">{error}</MyText>
            )}
          </View>
          <View>
            <MyButton
              className="w-full"
              txt={isSignIn ? "Se connecter" : "S'inscrire"}
              onPress={complete}
              disabled={email.length < 2 || password.length < 2}
            />
          </View>
        </>
      </MyKeyboardAvoidingView>
    </ScreenTemplate>
  );
};

export default SignInUp;
