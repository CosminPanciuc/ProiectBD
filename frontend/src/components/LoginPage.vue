<template>
  <div style="app">
    <span>Connect</span>
    <span v-if="isActive" class="spanErr">Nume sau parola gresita</span>
    <input v-model="userName" autofocus placeholder="user" />
    <input
      v-model="userPassword"
      autofocus
      placeholder="password"
      type="password"
    />
    <button @click="userLogin">Log in</button>
    <span @click="router.push('/register')" class="aCreate"
      ><u>Create account!</u></span
    >
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import { ref } from "vue";
import { studentUserData } from "./../stores/user";
import { instructorUserData } from "./../stores/user";
import { conUserData } from "./../stores/user";

const router = useRouter();

const userName = ref("");
const userPassword = ref("");
const isActive = ref(false);

async function userLogin() {
  const postLoginData = {
    data: userName.value,
  };
  await fetch("http://localhost:3000/api/login", {
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
      const result = data.result[0];
      if (result == undefined) {
        isActive.value = true;
        console.log("FAIL");
      } else {
        if (result.USER_TYPE == 0) {
          const newUser: instructorUserData = {
            id: result.USER_ID,
            username: result.USERNAME,
            password: result.USER_PASSWORD,
            type: result.USER_TYPE,
            birthDate: new Date(result.BIRTH_DATE).toISOString().split("T")[0],
            number: result.PHONE_NUMBER,
            firstName: result.FIRST_NAME,
            lastName: result.LAST_NAME,
            email: result.EMAIL,
            plateNumber: "",
            carBrand: "",
            carModel: "",
          };
          conUserData.value = newUser;
        } else {
          const newUser: studentUserData = {
            id: result.USER_ID,
            username: result.USERNAME,
            password: result.USER_PASSWORD,
            type: result.USER_TYPE,
            birthDate: new Date(result.BIRTH_DATE).toISOString().split("T")[0],
            number: result.PHONE_NUMBER,
            firstName: result.FIRST_NAME,
            lastName: result.LAST_NAME,
            email: result.EMAIL,
            instructorID: 0,
            expirationDate: new Date().toISOString().split("T")[0],
            coursesLeft: 0,
          };
          conUserData.value = newUser;
        }

        if (
          result.USERNAME == userName.value &&
          result.USER_PASSWORD == userPassword.value
        ) {
          router.push("/home");
        } else isActive.value = true;
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}
</script>

<style>
#app {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
}

input {
  display: block;
  margin-bottom: 1em;
}
button {
  display: block;
  width: 100%;
}
span {
  display: block;
  text-align: center;
  margin: 10px;
}

.spanErr {
  text-align: center;
  margin: 10px;
  font-size: 10px;
  color: red;
}

.aCreate {
  text-align: center;
  font-size: 10px;
  margin: 15px;
}
</style>
