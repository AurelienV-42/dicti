export const getAuthErrorMessage = (error: Error): string => {
  const msg = error.message.toLowerCase();

  if (msg.includes("invalid login")) return "Email ou mot de passe incorrect";
  if (msg.includes("email already")) return "Cet email est déjà utilisé";
  if (msg.includes("weak password")) return "Mot de passe trop faible";
  if (msg.includes("user already registered"))
    return "Cet email est déjà utilisé";

  return "Une erreur est survenue";
};
