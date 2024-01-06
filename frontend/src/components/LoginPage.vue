<template>
  <div style="app">
    <span>Connect</span>

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
import { userID } from "./../stores/user";

const router = useRouter();

const userName = ref("");
const userPassword = ref("");
const isActive = ref(false);

function userLogin() {
  const postLoginData = {
    data: userName.value,
  };
  fetch("http://localhost:3000/api/login", {
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
      console.log(data.result);
      if (data.result.length < 1) {
        isActive.value = true;
        console.log("FAIL");
        console.log(data);
      } else {
        const [[dbUserID, dbusername, dbpassword]] = data.result;
        userID.value = dbUserID;
        if (dbusername == userName.value && dbpassword == userPassword.value) {
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
  width: 100%; /* Set the width to 50% of the parent container */
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
