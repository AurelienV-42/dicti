import assets from "@assets/index";
import ElevatedContainer from "@components/ElevatedContainer";
import EmailInput from "@components/inputs/EmailInput";
import PasswordInput from "@components/inputs/PasswordInput";
import MyButton from "@components/natives/MyButton";
import MyPressable from "@components/natives/MyPressable";
import MyText from "@components/natives/MyText";
import { MAX_LENGTH_PASSWORD } from "@config/inputs";
import useKeyboardAnimation from "@hooks/useKeyboardAnimation";
import { useAuth } from "@stores/auth.store";
import { useMutation } from "@tanstack/react-query";
import { getAuthErrorMessage } from "@utils/auth-errors";
import { emailChecker, passwordChecker } from "@utils/validation";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import { Image, Keyboard, Pressable, TextInput, View } from "react-native";
import Animated from "react-native-reanimated";
import { toast } from "sonner-native";

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
  const auth = useAuth();
  const animatedStyle = useKeyboardAnimation(10);

  const copy = MICROCOPY[mode];

  const authMutation = useMutation({
    mutationFn: async ({
      cleanedEmail,
      cleanedPassword,
    }: {
      cleanedEmail: string;
      cleanedPassword: string;
    }) => {
      const authMethod = mode === "sign-in" ? auth?.signIn : auth?.signUp;
      return authMethod?.(cleanedEmail, cleanedPassword);
    },
    onSuccess: () => {
      console.log("here");
      toast.success(
        mode === "sign-in"
          ? "Connexion réussie"
          : "Votre compte a bien été créé",
      );
      router.replace("/");
    },
    onError: (err: Error) => {
      toast.error(getAuthErrorMessage(err));
    },
  });

  const complete = (): void => {
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
    Keyboard.dismiss();
    authMutation.mutate({ cleanedEmail, cleanedPassword: password });
  };

  return (
    <Pressable className="flex-1 bg-blue-100" onPress={Keyboard.dismiss}>
      <View className="items-center w-96 h-96 self-center mt-auto">
        <Image source={assets.hello} className="w-full h-full" />
      </View>

      <Animated.View style={animatedStyle}>
        <ElevatedContainer>
          <MyText className="self-start mt-3 text-3xl font-black text-gray-500 text-center mb-2">
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
            isLoading={authMutation.isPending}
          />

          <MyPressable
            className="mt-6 items-center"
            onPress={() => router.push(copy.linkRoute)}
          >
            <MyText className="text-blue-300">{copy.linkText}</MyText>
          </MyPressable>
        </ElevatedContainer>
      </Animated.View>
    </Pressable>
  );
};

export default AuthForm;
