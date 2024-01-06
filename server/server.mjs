import express from "express";
import oracledb from "oracledb";
import cors from "cors";

const app = express();
const port = 3000;

app.use(cors());

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

const dbConfig = {
  user: "bd157",
  password: "bd157",
  connectString: "bd-dc.cs.tuiasi.ro:1539/orcl",
};

app.get("/api/instructor_details", async (req, res) => {
  let connection;

  try {
    // Establish a direct connection to the database
    connection = await oracledb.getConnection(dbConfig);

    const sqlQuery = `SELECT
    USER_ID,
    LAST_NAME,
    FIRST_NAME
FROM
    USERS
WHERE
    USER_ID IN (
        SELECT
            INSTRUCTOR_ID
        FROM
            INSTRUCTOR_DETAILS
    )`;

    // Execute the SQL query
    const result = await connection.execute(sqlQuery);

    // Send the results as JSON
    res.json(result.rows);
  } catch (err) {
    console.error("Error executing query:", err);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    if (connection) {
      // Close the connection
      try {
        await connection.close();
      } catch (err) {
        console.error("Error closing connection:", err);
      }
    }
  }
});

async function fetchDataFromDatabase(data) {
  let connection;

  try {
    // Establish a direct connection to the database
    connection = await oracledb.getConnection(dbConfig);

    // Customize the SQL query based on the received data
    const sqlQuery = `SELECT * FROM users WHERE user_id= :data`;

    // Bind the data to the query
    const result = await connection.execute(sqlQuery, { data });

    // Return the query result
    return result.rows;
  } catch (err) {
    console.error("Error executing query:", err);
    throw new Error("Database error");
  } finally {
    if (connection) {
      // Close the connection
      try {
        await connection.close();
      } catch (err) {
        console.error("Error closing connection:", err);
      }
    }
  }
}

// Define an API endpoint to receive data and return query result
app.post("/api/query", express.json(), async (req, res) => {
  try {
    const receivedData = req.body.data; // Assuming the data is sent in the request body

    // Validate or process the received data if needed

    // Call the function to fetch data from the database
    const queryResult = await fetchDataFromDatabase(receivedData);

    // Send the query result as JSON
    res.json({ result: queryResult });
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

async function fetchDataForLogin(data) {
  let connection;

  try {
    // Establish a direct connection to the database
    connection = await oracledb.getConnection(dbConfig);

    // Customize the SQL query based on the received data
    const sqlQuery = `SELECT * FROM users WHERE USERNAME = :data`;

    // Bind the data to the query
    const result = await connection.execute(sqlQuery, { data });

    // Return the query result
    return result.rows;
  } catch (err) {
    console.error("Error executing query:", err);
    throw new Error("Database error");
  } finally {
    if (connection) {
      // Close the connection
      try {
        await connection.close();
      } catch (err) {
        console.error("Error closing connection:", err);
      }
    }
  }
}

app.post("/api/insertUserInstructor", async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    const type = req.body.type;
    const birthDate = req.body.birthDate;
    const phoneNumber = req.body.phoneNumber;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const plateNumber= req.body.plateNumber;
    const carBrand = req.body.carBrand;
    const carModel = req.body.carModel;

    const sqlQuery = `INSERT INTO USERS(
      USER_ID,
      USERNAME,
      USER_PASSWORD,
      USER_TYPE,
      BIRTH_DATE,
      PHONE_NUMBER,
      FIRST_NAME,
      LAST_NAME,
      EMAIL
      ) VALUES (
        USER_ID_SEQUENCE.NEXTVAL,
        :1,
        :2,
        :3,
        TO_DATE(:4, 'YYYY-MM-DD'),
        :5,
        :6,
        :7,
        :8
    )`;
    const sqlQuery2 = `INSERT INTO INSTRUCTOR_DETAILS (
      INSTRUCTOR_ID,
      PLATE_NUMBER,
      CAR_BRAND,
      CAR_MODEL
  ) VALUES (
      USER_ID_SEQUENCE.CURRVAL,
      :9,
      :10,
      :11
  )`;

    let connection;

    try {
      // Establish a direct connection to the database
      connection = await oracledb.getConnection(dbConfig);

      // Customize the SQL query based on the received data

      await connection.execute(sqlQuery, {
        1: username,
        2: password,
        3: type,
        4: birthDate,
        5: phoneNumber,
        6: firstName,
        7: lastName,
        8: email
      });
      await connection.execute(sqlQuery2, {
        9: plateNumber,
        10: carBrand,
        11: carModel
      });
      await connection.commit();
      // Return the query result
    } catch (err) {
      console.error("Error executing query:", err);
      throw new Error("Database error");
    } finally {
      if (connection) {
        // Close the connection
        try {
          await connection.close();
        } catch (err) {
          console.error("Error closing connection:", err);
        }
      }
    }

    res.json({ success: true, message: "User inserted successfully" });
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

app.post("/api/insertUserStudent", async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    const type = req.body.type;
    const birthDate = req.body.birthDate;
    const phoneNumber = req.body.phoneNumber;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const instructorID = req.body.instructorID;
    const expDate = req.body.expDate;
    const crsLeft = req.body.crsLeft;

    const sqlQuery = `INSERT INTO USERS(
      USER_ID,
      USERNAME,
      USER_PASSWORD,
      USER_TYPE,
      BIRTH_DATE,
      PHONE_NUMBER,
      FIRST_NAME,
      LAST_NAME,
      EMAIL
      ) VALUES (
        USER_ID_SEQUENCE.NEXTVAL,
        :1,
        :2,
        :3,
        TO_DATE(:4, 'YYYY-MM-DD'),
        :5,
        :6,
        :7,
        :8
    )`;
    const sqlQuery2 = `INSERT INTO STUDENT_DETAILS (
      STUDENT_ID,
      INSTRUCTOR_ID,
      EXPIRATION_DATE,
      COURSES_LEFT 
  ) VALUES (
      USER_ID_SEQUENCE.CURRVAL,
      :9,
      TO_DATE(:10, 'YYYY-MM-DD'),
      :11
  )`;

    let connection;

    try {
      // Establish a direct connection to the database
      connection = await oracledb.getConnection(dbConfig);

      // Customize the SQL query based on the received data

      await connection.execute(sqlQuery, {
        1: username,
        2: password,
        3: type,
        4: birthDate,
        5: phoneNumber,
        6: firstName,
        7: lastName,
        8: email
      });
      await connection.execute(sqlQuery2, {
        9: instructorID,
        10: expDate,
        11: crsLeft
      });
      await connection.commit();
      // Return the query result
    } catch (err) {
      console.error("Error executing query:", err);
      throw new Error("Database error");
    } finally {
      if (connection) {
        // Close the connection
        try {
          await connection.close();
        } catch (err) {
          console.error("Error closing connection:", err);
        }
      }
    }

    res.json({ success: true, message: "User inserted successfully" });
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

app.post("/api/login", express.json(), async (req, res) => {
  try {
    const receivedData = req.body.data;

    const queryResult = await fetchDataForLogin(receivedData);

    // Send the query result as JSON
    res.json({ result: queryResult });
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
