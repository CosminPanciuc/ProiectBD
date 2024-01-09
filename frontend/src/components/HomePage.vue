<script setup lang="ts">
import { useRouter } from "vue-router";
import { ref } from "vue";
import { studentUserData } from "./../stores/user";
import { instructorUserData } from "./../stores/user";
import { conUserData } from "./../stores/user";

const router = useRouter();
const displayStudent = ref(true);
const updateInfo = ref(false);
const isLoading = ref(true);
const updateMsg = ref("Update");

const existingData = ref<studentUserData | instructorUserData>();

const userName = ref(conUserData.value?.username);
const userPassword = ref(conUserData.value?.password);
const userEmail = ref(conUserData.value?.email);
const userBirthDate = ref(conUserData.value?.birthDate);
const userPhoneNumber = ref(conUserData.value?.number);
const userFirstName = ref(conUserData.value?.firstName);
const userLastName = ref(conUserData.value?.lastName);
const plateNumber = ref("");
const carBrand = ref("");
const carModel = ref("");

async function initUserDetails() {
  if (conUserData.value && "plateNumber" in conUserData.value) {
    try {
      const result = await fetchInstructorDetails(conUserData.value.id);

      conUserData.value.plateNumber = result[0].PLATE_NUMBER;
      conUserData.value.carBrand = result[0].CAR_BRAND;
      conUserData.value.carModel = result[0].CAR_MODEL;
      isLoading.value = false;
      checkUserType();
      plateNumber.value = conUserData.value.plateNumber;
      carBrand.value = conUserData.value?.carBrand;
      carModel.value = conUserData.value?.carModel;
    } catch (error) {
      console.error("Error getting data:", error);
      // Handle the error as needed
    }
  } else {
    try {
      if (conUserData.value && "instructorID" in conUserData.value) {
        const result = await fetchStudentDetails(conUserData.value.id);

        conUserData.value.expirationDate = result[0].EXPIRATION_DATE;
        conUserData.value.coursesLeft = result[0].COURSES_LEFT;
        conUserData.value.instructorID = result[0].INSTRUCTOR_ID;
        conUserData.value.expirationDate =
          conUserData.value.expirationDate.slice(0, 9);
        isLoading.value = false;
        checkUserType();
      }
    } catch (error) {
      console.error("Error getting data:", error);
      // Handle the error as needed
    }
  }
}

async function fetchInstructorDetails(id: number) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/getInstructorDetails/${id}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data.result;
  } catch (error) {
    console.error("Error fetching data from server:", error);
    throw new Error("Fetch error");
  }
}

async function fetchStudentDetails(id: number) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/getStudentDetails/${id}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data.result;
  } catch (error) {
    console.error("Error fetching data from server:", error);
    throw new Error("Fetch error");
  }
}

initUserDetails();

function checkUserType() {
  if (conUserData.value?.type == 0) displayStudent.value = false;
  if (conUserData.value && "expirationDate" in conUserData.value) {
    const aux: studentUserData = {
      username: conUserData.value?.username,
      password: conUserData.value?.password,
      birthDate: conUserData.value?.birthDate,
      number: conUserData.value?.number,
      firstName: conUserData.value?.firstName,
      lastName: conUserData.value?.lastName,
      email: conUserData.value?.email,
      expirationDate: conUserData.value?.expirationDate,
      coursesLeft: conUserData.value?.coursesLeft,
      id: conUserData.value.id,
      type: conUserData.value.type,
      instructorID: conUserData.value.instructorID,
    };
    existingData.value = aux;
  } else {
    if (conUserData.value && "plateNumber" in conUserData.value) {
      const aux: instructorUserData = {
        username: conUserData.value?.username,
        password: conUserData.value?.password,
        birthDate: conUserData.value?.birthDate,
        number: conUserData.value?.number,
        firstName: conUserData.value?.firstName,
        lastName: conUserData.value?.lastName,
        email: conUserData.value?.email,
        plateNumber: conUserData.value?.plateNumber,
        carBrand: conUserData.value?.carBrand,
        carModel: conUserData.value?.carModel,
        id: conUserData.value.id,
        type: conUserData.value.type,
      };
      existingData.value = aux;
    }
  }
}

function updateTrue() {
  updateInfo.value = !updateInfo.value;
  if (updateInfo.value) {
    updateMsg.value = "Abort";
  } else {
    updateMsg.value = "Update";
  }
}

async function submitUpdate() {
  if (conUserData.value?.type == 0) {
    const newUser: instructorUserData = {
      id: conUserData.value.id,
      username: userName.value,
      password: userPassword.value,
      type: conUserData.value.type,
      birthDate: userBirthDate.value.toString().split("T")[0],
      number: userPhoneNumber.value,
      firstName: userFirstName.value,
      lastName: userLastName.value,
      email: userEmail.value,
      plateNumber: plateNumber.value,
      carBrand: carBrand.value,
      carModel: carModel.value,
    };
    conUserData.value = newUser;
    existingData.value = newUser;

    await fetch("http://localhost:3000/api/updateUserInstructor", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(conUserData.value),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  } else {
    if (conUserData.value && "expirationDate" in conUserData.value) {
      const newUser: studentUserData = {
        id: conUserData.value.id,
        username: userName.value,
        password: userPassword.value,
        type: conUserData.value.type,
        birthDate: userBirthDate.value.toString().split("T")[0],
        number: userPhoneNumber.value,
        firstName: userFirstName.value,
        lastName: userLastName.value,
        email: userEmail.value,
        instructorID: conUserData.value.instructorID,
        expirationDate: conUserData.value.expirationDate,
        coursesLeft: conUserData.value.coursesLeft,
      };
      conUserData.value = newUser;
      existingData.value = newUser;
      await fetch("http://localhost:3000/api/updateUserStudent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(conUserData.value),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }
  updateTrue();
}

async function deleteUser() {
  const data = { id: conUserData.value?.id };
  if (conUserData.value?.type == 0) {
    await fetch("http://localhost:3000/api/deleteInstructor", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(() => {
        router.push("/");
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  } else {
    await fetch("http://localhost:3000/api/deleteStudent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(() => {
        router.push("/");
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }
}
</script>

<template>
  <div style="app">
    <template v-if="updateInfo">
      <span class="spanFieldName">First Name</span>
      <input v-model="userFirstName" type="text" />
      <span class="spanFieldName">Last Name</span>
      <input v-model="userLastName" type="text" />
      <span class="spanFieldName">Username</span>
      <input v-model="userName" />
      <span class="spanFieldName">Password</span>
      <input
        v-model="userPassword"
        :placeholder="userPassword"
        type="password"
      />
      <span class="spanFieldName">Email</span>
      <input v-model="userEmail" type="email" />
      <span class="spanFieldName">Birth Date</span>
      <input v-model="userBirthDate" type="date" />
      <span class="spanFieldName">Phone Number</span>
      <input v-model="userPhoneNumber" type="tel" />
      <template v-if="displayStudent"> </template>
      <template v-else>
        <span class="spanFieldName">Plate Number</span>
        <input v-model="plateNumber" />
        <span class="spanFieldName">Car Brand</span>
        <input v-model="carBrand" />
        <span class="spanFieldName">Car Model</span>
        <input v-model="carModel" />
      </template>
    </template>
    <template v-else>
      <template v-if="isLoading"></template>
      <template v-else>
        <div>
          <ul>
            <li v-for="(value, key) in existingData" :key="key">
              <template
                v-if="key !== 'id' && key !== 'type' && key !== 'instructorID'"
              >
                {{ key.charAt(0).toUpperCase() + key.slice(1) }}: {{ value }}
              </template>
            </li>
          </ul>
        </div>
      </template>
    </template>
    <div class="divflex">
      <button @click="updateTrue" class="buttonHalf">{{ updateMsg }}</button>
      <button v-if="updateInfo" @click="submitUpdate" class="buttonHalf">
        Submit
      </button>
    </div>
    <div v-if="!updateInfo" class="divflex">
      <button @click="deleteUser" class="buttonHalf">Delete</button>
      <button @click="router.push('/scheduale')" class="buttonHalf">
        Scheduale
      </button>
    </div>
  </div>
</template>

<style scoped>
#app {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
}
ul,
li {
  display: block;
  margin-bottom: 1em;
}
button {
  display: block;
  text-align: center;
  width: 40%; /* Set the width to 50% of the parent container */
}
.buttonHalf {
  display: block;
  margin-bottom: 1em;
  width: 45%;
  margin: 5px;
}
.divflex {
  display: flex;
}
.spanFieldName {
  text-align: left;
  font-size: 10px;
  margin: 0px;
}
</style>
