import LogoVectorized from "@assets/vectorized/LogoVectorized";
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
import { useState } from "react";
import { Keyboard, View } from "react-native";

type AuthFormProps = {
  mode: "sign-in" | "sign-up";
};

const MICROCOPY = {
  "sign-in": {
    title: "Bon retour !",
    emailLabel: "Ton email",
    passwordLabel: "Ton mot de passe",
    button: "C'est parti",
    linkText: "Pas encore de compte ?",
    linkRoute: "/(auth)/first-test" as const,
  },
  "sign-up": {
    title: "Crée ton compte",
    emailLabel: "Ton email",
    passwordLabel: "Ton mot de passe",
    button: "Je m'inscris",
    linkText: "Déjà un compte ?",
    linkRoute: "/(auth)/sign-in" as const,
  },
};

const AuthForm = ({ mode }: AuthFormProps): React.ReactElement => {
  const router = useRouter();
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
    <MyKeyboardAvoidingView className="flex-1 px-6 justify-center bg-blue-300">
      <View className="items-center mb-8">
        <LogoVectorized width={120} height={120} />
      </View>

      <View className="bg-white/90 rounded-3xl p-6">
        <MyText className="text-2xl font-bold text-dark text-center mb-6">
          {copy.title}
        </MyText>

        <MyText className="text-base text-dark mb-2">{copy.emailLabel}</MyText>
        <EmailInput
          value={email}
          onChangeText={(newEmail: string) => {
            setEmail(newEmail);
            setError("");
          }}
          autoFocus
        />

        <MyText className="text-base text-dark mb-2">
          {copy.passwordLabel}
        </MyText>
        <PasswordInput
          value={password}
          onChangeText={(newPassword: string) => {
            setPassword(newPassword);
            setError("");
          }}
          maxLength={MAX_LENGTH_PASSWORD}
          onSubmitEditing={complete}
        />

        <MyText className="text-red-300 text-sm mb-4">
          {error ? error : " "}
        </MyText>

        <MyButton
          className="w-full"
          txt={copy.button}
          onPress={complete}
          disabled={email.length < 2 || password.length < 2}
        />

        <MyPressable
          className="mt-4 items-center"
          onPress={() => router.push(copy.linkRoute)}
        >
          <MyText className="text-base text-dark underline">
            {copy.linkText}
          </MyText>
        </MyPressable>
      </View>
    </MyKeyboardAvoidingView>
  );
};

export default AuthForm;
