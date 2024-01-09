<script setup lang="ts">
import { useRouter } from "vue-router";
import { ref } from "vue";
import { conUserData } from "./../stores/user";

const router = useRouter();

const dataForTabel = ref([{}]);
const isLoading = ref(true);
const loading = ref(true);
const instructorList = ref([[]]);
const selectedInstructor = ref("");
const meetingDate = ref(Date);
const userType = ref(true);

function checkType() {
  if (conUserData.value?.type == 1) {
    userType.value = false;
  }
}

checkType();

async function getTabelData() {
  if (conUserData.value?.type == 1) {
    try {
      const id = conUserData.value?.id;
      const response = await fetch(
        `http://localhost:3000/api/studentScheduale/${id}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      dataForTabel.value.pop();
      dataForTabel.value.push(data.result);
      console.log(data.result);
      isLoading.value = false;
    } catch (error) {
      console.error("Error fetching data from server:", error);
      throw new Error("Fetch error");
    }
  } else {
    try {
      const id = conUserData.value?.id;
      const response = await fetch(
        `http://localhost:3000/api/instructorScheduale/${id}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      dataForTabel.value.pop();
      dataForTabel.value.push(data.result);
      console.log(data.result);
      isLoading.value = false;
    } catch (error) {
      console.error("Error fetching data from server:", error);
      throw new Error("Fetch error");
    }
  }
}
getTabelData();

async function initInstructorList() {
  if (userType.value) {
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
  } else {
    await fetch("http://localhost:3000/api/student_details")
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
}
initInstructorList();
async function submitMeet() {
  let data;
  if (conUserData.value?.type == 0) {
    data = {
      studentid: selectedInstructor.value,
      instructorid: conUserData.value?.id,
      meetDate: meetingDate,
    };
  } else
    data = {
      studentid: conUserData.value?.id,
      instructorid: selectedInstructor.value,
      meetDate: meetingDate,
    };
  await fetch("http://localhost:3000/api/newAppointment", {
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
      router.push("/scheduale");
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}
</script>

<template>
  <div style="app">
    <div class="divflex">
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
      <input type="date" class="dateHalf" v-model="meetingDate" />
      <button @click="submitMeet" class="buttonHalf">New meeting</button>
    </div>
    <template v-if="isLoading"></template>
    <template v-else>
      <table border="1">
        <thead>
          <tr>
            <th>STUDENT NAME</th>
            <th>INSTRUCTOR NAME</th>
            <th>DATE</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="(item, index) in dataForTabel" :key="index">
            <tr v-for="(value, key) in item" :key="key">
              <td>{{ value.STUDENT_ID }}</td>
              <td>{{ value.INSTRUCTOR_ID }}</td>
              <td>{{ value.COURSE_HOUR.split("T")[0] }}</td>
            </tr>
          </template>
        </tbody>
      </table>
    </template>
  </div>
</template>

<style scoped>
select {
  display: block;
  margin-bottom: 1em;
}

.buttonHalf {
  display: block;
  margin-left: 10px;
  height: 50%;
  width: 40%;
}

.dateHalf {
  display: block;
  margin-left: 10px;
}
.divflex {
  display: flex;
}
</style>
