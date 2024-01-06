<script setup lang="ts">
import { useRouter } from "vue-router";
import { ref } from "vue";
import { studentUserData } from "./../stores/user";
import { instructorUserData } from "./../stores/user";
import { conUserData } from "./../stores/user";

const router = useRouter();

async function initUserDetails() {
  if (conUserData.value && "plateNumber" in conUserData.value) {
    const postLoginData = {
      data: conUserData.value.id,
    };
    await fetch("http://localhost:3000/api/logInInstructor", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postLoginData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        if (
          conUserData.value &&
          "plateNumber" in conUserData.value &&
          "carBrand" in conUserData.value &&
          "carModel" in conUserData.value
        ) {
          conUserData.value.plateNumber = data.PLATE_NUMBER;
          conUserData.value.carBrand = data.CAR_BRAND;
          conUserData.value.carModel = data.CAR_MODEL;
        }
        console.log(conUserData.value);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  } else {
    const postLoginData = {
      data: conUserData.value?.id,
    };
    await fetch("http://localhost:3000/api/logInStudent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postLoginData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (
          conUserData.value &&
          "instructorID" in conUserData.value &&
          "expirationDate" in conUserData.value &&
          "coursesLeft" in conUserData.value
        ) {
          conUserData.value.instructorID = data.INSTRUCTOR_ID;
          conUserData.value.expirationDate = data.EXPIRATION_DATE;
          conUserData.value.coursesLeft = data.COURSES_LEFT;
        }
        console.log(conUserData.value);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }
}
initUserDetails();
</script>

<template>
  <div></div>
</template>

<style scoped></style>
