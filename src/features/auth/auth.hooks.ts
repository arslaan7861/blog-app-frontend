import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";
import { AxiosError } from "axios";
import { LoginCredentials, RegisterCredentials } from "./auth.types";
import { authService } from "./auth.service";

export const useLogin = () => {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: (credentials: LoginCredentials) =>
      authService.login(credentials),
    onSuccess: (data) => {
      setAuth(data.user, data.access_token);
      router.push("/");
    },
  });
};

export const useRegister = () => {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: (credentials: RegisterCredentials) =>
      authService.register(credentials),
    onSuccess: (data) => {
      setAuth(data.user, data.access_token);
      router.push("/");
    },
  });
};

export const useLogout = () => {
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);

  return () => {
    logout();
    router.push("/login");
  };
};

export const getAuthErrorMessage = (error: unknown): string => {
  const axiosError = error as AxiosError<{
    message: string | Record<string, string[]>;
  }>;

  if (!axiosError.response?.data) {
    return "An unexpected error occurred";
  }

  const { message } = axiosError.response.data;

  if (typeof message === "string") {
    return message;
  }

  if (typeof message === "object") {
    const errors = Object.values(message).flat();
    return errors[0] || "Validation failed";
  }

  return "Authentication failed";
};
