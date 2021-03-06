export interface registerUserType {
  userName: string;
  email: string;
  password: string;
}

export interface loginUserType {
  email: string;
  password: string;
}

export interface newPasswordType {
  userName: string;
  email: string;
  oldPassword: string;
  newPassword: string;
}

export interface resetPasswordType {
  email: string;
  newPassword: string;
  token: string;
}
