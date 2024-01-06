<script setup lang="ts">
import { useRouter } from "vue-router";
import { ref } from "vue";

const router = useRouter();

const userName = ref("");
const userPassword = ref("");
const userEmail = ref("");
const userBirthDate = ref(Date);
const userPhoneNumber = ref("");
const userFirstName = ref("");
const userLastName = ref("");
const plateNumber = ref("");
const carBrand = ref("");
const carModel = ref("");
const dueDate = ref(Date);
const selectedInstructor = ref("");
const instructorList = ref([[]]);

const studentLog = ref(true);
const instructorLog = ref(false);
const loading = ref(true);

async function initInstructorList() {
  await fetch("http://localhost:3000/api/instructor_details")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      // Log the data to the console
      instructorList.value.pop();
      for (let i = 0; i < data.length; i++) {
        //instructorListID.value.push(data[i][0]);
        instructorList.value.push([
          data[i].USER_ID,
          data[i].FIRST_NAME,
          data[i].LAST_NAME,
        ]);
      }
      loading.value = false;
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}
initInstructorList();

async function submitStudent() {
  let typeVal;
  if (studentLog.value == true) {
    typeVal = 1;
  } else {
    typeVal = 0;
  }

  const data = {
    username: userName.value,
    password: userPassword.value,
    type: typeVal,
    birthDate: userBirthDate.value,
    phoneNumber: userPhoneNumber.value,
    firstName: userFirstName.value,
    lastName: userLastName.value,
    email: userEmail.value,
    instructorID: selectedInstructor.value,
    expDate: dueDate.value,
    crsLeft: 14,
  };

  await fetch("http://localhost:3000/api/insertUserStudent", {
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
    .then((data) => {
      console.log(data);
      router.push("/home");
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

async function submitInstructor() {
  let typeVal;
  if (studentLog.value == true) {
    typeVal = 1;
  } else {
    typeVal = 0;
  }

  const data = {
    username: userName.value,
    password: userPassword.value,
    type: typeVal,
    birthDate: userBirthDate.value,
    phoneNumber: userPhoneNumber.value,
    firstName: userFirstName.value,
    lastName: userLastName.value,
    email: userEmail.value,
    plateNumber: plateNumber.value,
    carBrand: carBrand.value,
    carModel: carModel.value,
  };

  await fetch("http://localhost:3000/api/insertUserInstructor", {
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
    .then((data) => {
      console.log(data);
      router.push("/");
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

function changeStudent() {
  studentLog.value = true;
  instructorLog.value = false;
}
function changeInstructor() {
  studentLog.value = false;
  instructorLog.value = true;
}
</script>

<template>
  <div>
    <div class="divflex">
      <button @click="changeInstructor" class="buttonHalf">Instructor</button>
      <button @click="changeStudent" class="buttonHalf">Student</button>
    </div>
    <span class="spanFieldName">First Name</span>
    <input v-model="userFirstName" placeholder="First Name" type="text" />
    <span class="spanFieldName">Last Name</span>
    <input v-model="userLastName" placeholder="Last Name" type="text" />
    <span class="spanFieldName">Username</span>
    <input v-model="userName" placeholder="username" />
    <span class="spanFieldName">Password</span>
    <input v-model="userPassword" placeholder="password" type="password" />
    <span class="spanFieldName">Email</span>
    <input v-model="userEmail" placeholder="email" type="email" />
    <span class="spanFieldName">Birth Date</span>
    <input v-model="userBirthDate" placeholder="birth date" type="date" />
    <span class="spanFieldName">Phone Number</span>
    <input v-model="userPhoneNumber" placeholder="phone number" type="tel" />
    <template v-if="instructorLog">
      <span class="spanFieldName">Plate Number</span>
      <input v-model="plateNumber" placeholder="Plate Number" />
      <span class="spanFieldName">Car Brand</span>
      <input v-model="carBrand" placeholder="Car Brand" />
      <span class="spanFieldName">Car Model</span>
      <input v-model="carModel" placeholder="Car Model" />
      <button @click="submitInstructor">Submit</button>
    </template>
    <template v-if="studentLog">
      <span class="spanFieldName">Expiration Date</span>
      <input v-model="dueDate" type="date" />
      <span class="spanFieldName">Select instructor</span>
      <select v-model="selectedInstructor">
        <option disabled value="">Plese select one</option>
        <template v-if="loading"> </template>
        <template v-else>
          <option
            v-for="item in instructorList"
            :key="item[0]"
            :value="item[0]"
          >
            {{ item[1] + " " + item[2] }}
          </option>
        </template>
      </select>
      <button @click="submitStudent">Submit</button>
    </template>
  </div>
</template>

<style scoped>
button,
input,
select {
  display: block;
  margin-bottom: 1em;
}
.buttonHalf {
  display: block;
  margin-bottom: 1em;
  width: 50%;
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
