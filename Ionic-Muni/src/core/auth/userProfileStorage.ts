import type { AuthUserModel } from '../../features/auth/domain/entities/AuthUserModel';

const PROFILE_KEY = 'user_profile';

export const saveUserProfile = (user: AuthUserModel): void => {
  try {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(user));
  } catch {}
};

export const loadUserProfile = (): AuthUserModel | null => {
  try {
    const value = localStorage.getItem(PROFILE_KEY);
    return value ? (JSON.parse(value) as AuthUserModel) : null;
  } catch {
    return null;
  }
};

export const clearUserProfile = (): void => {
  localStorage.removeItem(PROFILE_KEY);
};
