import { ref } from "vue";

export type studentUserData = {
  id: number;
  username: string;
  password: string;
  type: number;
  birthDate: string;
  number: string;
  firstName: string;
  lastName: string;
  email: string;
  instructorID: number;
  expirationDate: string;
  coursesLeft: number;
};

export type instructorUserData = {
  id: number;
  username: string;
  password: string;
  type: number;
  birthDate: string;
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
