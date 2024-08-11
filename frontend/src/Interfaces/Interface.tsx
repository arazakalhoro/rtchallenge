import { Dispatch, SetStateAction } from "react";

export interface AuthInterface {
  loginUser: {
    exp: number;
    iat: number;
    roles: string[];
    userEmail: string;
    userGroup: string;
    userId: number;
    userName: string;
  } | null;
  setLoginUser: Dispatch<SetStateAction<null>>;
  baseUrl: string;
  requestHeaders: {};
  getUserData: () => void;
  ChangePassword: {}

}

export interface ProjectInterface {
  creationDate: string;
  description: string;
  id: number;
  modificationDate: string;
  title: string;
  task: [];
}
export interface TaksInterface {
  creationDate: string;
  title: string;
  description: string;
  id: number;
  status: string;
  employee: Employee;
  project: ProjectInterface;
}

export interface Employee {
  userName: string;
  country: string;
  creationDate: string;
  email: string;
  id: number;
  imagePath: string | null;
  isActivated: boolean;
  isVerified: boolean;
  modificationDate: string;
  verificationCode: string;
}

export interface User {
  country: string;
  email: string;
  creationDate: string;
  id: number;
  imagePath: string | undefined;
  isActivated: boolean;
  task: TaksInterface;
  userName: string;
  status: string;
  phoneNumber: string;
}


export interface TaskData {
  toDo: number;
  inProgress: number;
  done: number;
}
export interface ChangePass {
    oldPassword: string;
    newPassword: string;
    confirmNewPassword: string;
  }



export interface ActiveUserData {
  activatedEmployeeCount: number;
  deactivatedEmployeeCount: number;
}