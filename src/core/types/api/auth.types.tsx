export interface registerUserType {
  userName: string;
  email: string;
  password: string;
}

export interface loginUserType {
  email: string;
  password: string;
}

export interface newEmailType {
  userName: string;
  email: string;
  newEmail: string;
}

export interface newPasswordType {
  userName: string;
  email: string;
  oldPassword: string;
  newPassword: string;
}
