import { MAX_LENGTH_EMAIL, MAX_LENGTH_PASSWORD } from "@config/inputs";
import MyKeyboardAvoidingView from "@src/components/MyKeyboardAvoidingView";
import PasswordInput from "@src/components/inputs/PasswordInput";
import MyButton from "@src/components/natives/MyButton";
import MyText from "@src/components/natives/MyText";
import HeaderTemplate from "@src/components/templates/HeaderTemplate";
import ScreenTemplate from "@src/components/templates/ScreenTemplate";
import TextInputTemplate from "@src/components/templates/TextInputTemplate";
import { useIsLoading } from "@src/context/IsLoading";
import { emailChecker, passwordChecker } from "@src/utils/validation";
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
    <ScreenTemplate>
      <HeaderTemplate
        title={isSignIn ? "Connection" : "Inscription"}
        canGoBack
      />
      <MyKeyboardAvoidingView className="justify-between flex-1">
        <>
          <View />
          <View>
            <MyText style="text-xl mb-2">{"Email"}</MyText>
            <TextInputTemplate
              value={email}
              placeholder={"john@doe.com"}
              onChangeText={(email: string) => {
                setEmail(email);
                setError("");
              }}
              maxLength={MAX_LENGTH_EMAIL}
              autoFocus
            />

            <MyText style="text-xl mb-2">Mot de passe</MyText>
            <PasswordInput
              value={password}
              onChangeText={(email: string) => {
                setPassword(email);
                setError("");
              }}
              maxLength={MAX_LENGTH_PASSWORD}
              onSubmitEditing={complete}
            />
            {error && <MyText style="text-red text-sm mb-2">{error}</MyText>}
            {/* <MyPressable
              className="self-center px-3 py-[6] bg-light-100 shadow-md rounded-full"
              onPress={() => navigation.navigate("ForgotPassword")}
            >
              <MyText style="text-purple text-sm mt-1">
                Mot de passe oublié
              </MyText>
            </MyPressable> */}
          </View>
          <View>
            <MyButton
              type="secondary"
              className="w-full mb-3"
              txt={isSignIn ? "Pas de compte ?" : "J'ai un compte"}
              onPress={() =>
                navigation.navigate(isSignIn ? "SignUp" : "SignIn")
              }
            />
            <MyButton
              className="w-full"
              txt={isSignIn ? "S'inscrire" : "Se connecter"}
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
