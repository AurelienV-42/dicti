import { getAuthErrorMessage } from "@utils/auth-errors";

describe("getAuthErrorMessage", () => {
  it("returns invalid credentials message for invalid login error", () => {
    const error = new Error("Invalid login credentials");
    expect(getAuthErrorMessage(error)).toBe("Email ou mot de passe incorrect");
  });

  it("returns email already used message for email already error", () => {
    const error = new Error("Email already registered");
    expect(getAuthErrorMessage(error)).toBe("Cet email est déjà utilisé");
  });

  it("returns email already used message for user already registered error", () => {
    const error = new Error("User already registered");
    expect(getAuthErrorMessage(error)).toBe("Cet email est déjà utilisé");
  });

  it("returns weak password message for weak password error", () => {
    const error = new Error("Password is too weak password");
    expect(getAuthErrorMessage(error)).toBe("Mot de passe trop faible");
  });

  it("returns generic message for unknown errors", () => {
    const error = new Error("Some unknown error");
    expect(getAuthErrorMessage(error)).toBe("Une erreur est survenue");
  });
});
