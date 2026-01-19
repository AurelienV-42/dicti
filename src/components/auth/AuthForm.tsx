import assets from "@assets/index";
import ElevatedContainer from "@components/ElevatedContainer";
import MyKeyboardAvoidingView from "@components/MyKeyboardAvoidingView";
import EmailInput from "@components/inputs/EmailInput";
import PasswordInput from "@components/inputs/PasswordInput";
import MyButton from "@components/natives/MyButton";
import MyPressable from "@components/natives/MyPressable";
import MyText from "@components/natives/MyText";
import { MAX_LENGTH_PASSWORD } from "@config/inputs";
import { useAuth } from "@stores/auth.store";
import { useIsLoading } from "@stores/loading.store";
import { emailChecker, passwordChecker } from "@utils/validation";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import { Image, Keyboard, TextInput, View } from "react-native";

type AuthFormProps = {
  mode: "sign-in" | "sign-up";
};

const MICROCOPY = {
  "sign-in": {
    title: "Bon retour parmi nous !",
    description: "Connecte-toi pour continuer ton apprentissage",
    emailLabel: "Ton email",
    passwordLabel: "Ton mot de passe",
    button: "C'est parti",
    linkText: "Pas encore de compte ?",
    linkRoute: "/(auth)/first-test" as const,
  },
  "sign-up": {
    title: "Crée ton compte",
    description: "Rejoins-nous et améliore ton orthographe",
    emailLabel: "Ton email",
    passwordLabel: "Ton mot de passe",
    button: "Je m'inscris",
    linkText: "Déjà un compte ?",
    linkRoute: "/(auth)/sign-in" as const,
  },
};

const AuthForm = ({ mode }: AuthFormProps): React.ReactElement => {
  const router = useRouter();
  const passwordRef = useRef<TextInput>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setIsLoading } = useIsLoading();
  const auth = useAuth();

  const copy = MICROCOPY[mode];

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

    const authMethod = mode === "sign-in" ? auth?.signIn : auth?.signUp;
    authMethod?.(cleanedEmail, password)
      .then(() => router.replace("/"))
      .catch((err: Error) => console.warn(mode, err))
      .finally(() => setIsLoading(false));
  };

  return (
    <MyKeyboardAvoidingView className="flex-1 bg-red-500">
      <View className="flex-1 justify-end bg-blue-100">
        <View className="items-center mb-10 w-96 h-96 self-center">
          <Image source={assets.hello} className="w-full h-full" />
        </View>

        <ElevatedContainer className="">
          <MyText className="self-start mt-3 text-3xl font-black text-gray-400 text-center mb-2">
            {copy.title}
          </MyText>
          <MyText className="text-base text-gray-300 mb-8">
            {copy.description}
          </MyText>

          <MyText className="text-sm font-semibold text-blue-300 tracking-wider mb-2">
            {copy.emailLabel}
          </MyText>
          <EmailInput
            value={email}
            onChangeText={(newEmail: string) => {
              setEmail(newEmail);
              setError("");
            }}
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current?.focus()}
            autoFocus
          />

          <MyText className="text-sm font-semibold text-blue-300 tracking-wider mb-2">
            {copy.passwordLabel}
          </MyText>
          <PasswordInput
            ref={passwordRef}
            value={password}
            onChangeText={(newPassword: string) => {
              setPassword(newPassword);
              setError("");
            }}
            maxLength={MAX_LENGTH_PASSWORD}
            returnKeyType="done"
            onSubmitEditing={complete}
          />

          <MyText className="text-red-100 text-sm mb-6">
            {error ? error : " "}
          </MyText>

          <MyButton
            className="w-full rounded-full"
            txt={copy.button}
            onPress={complete}
            disabled={email.length < 2 || password.length < 2}
          />

          <MyPressable
            className="mt-6 items-center"
            onPress={() => router.push(copy.linkRoute)}
          >
            <MyText className="text-blue-300">{copy.linkText}</MyText>
          </MyPressable>
        </ElevatedContainer>
      </View>
    </MyKeyboardAvoidingView>
  );
};

export default AuthForm;
