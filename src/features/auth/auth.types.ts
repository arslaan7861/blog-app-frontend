import { LoginFormData, RegisterFormData } from "./auth.schema";

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface AuthResponse {
  access_token: string;
  user: User;
}

export interface LoginCredentials extends LoginFormData {}
export interface RegisterCredentials extends RegisterFormData {}

export interface ApiError {
  statusCode: number;
  message: string | Record<string, string[]>;
  error?: string;
  timestamp?: string;
  path?: string;
  method?: string;
}
