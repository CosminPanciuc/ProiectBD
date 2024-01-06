import { ref } from "vue";

export type studentUserData = {
  id: number;
  username: string;
  password: string;
  type: number;
  birthDate: Date;
  number: string;
  firstName: string;
  lastName: string;
  email: string;
  instructorID: number;
  expirationDate: Date;
  coursesLeft: number;
};

export type instructorUserData = {
  id: number;
  username: string;
  password: string;
  type: number;
  birthDate: Date;
  number: string;
  firstName: string;
  lastName: string;
  email: string;
  plateNumber: string;
  carBrand: string;
  carModel: string;
};

export const conUserData = ref<
  studentUserData | instructorUserData | undefined
>();
