import express from "express";
import oracledb from "oracledb";
import cors from "cors";

const app = express();
const port = 3000;

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

oracledb.fetchAsString = [oracledb.CLOB];

app.use(cors());

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

const dbConfig = {
  user: "bd157",
  password: "bd157",
  connectString: "bd-dc.cs.tuiasi.ro:1539/orcl",
};

app.get("/api/studentLogin", async (req, res) => {
  let connection;

  try {

    connection = await oracledb.getConnection(dbConfig);

    const sqlQuery = `SELECT * FROM student_details WHERE student_id = :data`;


    const result = await connection.execute(sqlQuery);

    res.json(result.rows);
  } catch (err) {
    console.error("Error executing query:", err);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    if (connection) {

      try {
        await connection.close();
      } catch (err) {
        console.error("Error closing connection:", err);
      }
    }
  }
});

app.get("/api/instructorLogin", async (req, res) => {
  let connection;

  try {
    // Establish a direct connection to the database
    connection = await oracledb.getConnection(dbConfig);

    const sqlQuery = `SELECT * FROM instructor_details`;

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

    res.json({ result: queryResult });
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

async function fetchDataForInstructr(userID) {
  let connection;

  try {
    // Establish a direct connection to the database
    connection = await oracledb.getConnection(dbConfig);

    // Customize the SQL query based on the received ID
    const sqlQuery = `
      SELECT * FROM INSTRUCTOR_DETAILS WHERE INSTRUCTOR_ID = :userId
    `;

    // Bind the ID to the query
    const result = await connection.execute(sqlQuery, { userID });

    // Return the query result
    return result.rows;
  } catch (err) {
    console.error('Error executing query:', err);
    throw new Error('Database error');
  } finally {
    if (connection) {
      // Close the connection
      try {
        await connection.close();
      } catch (err) {
        console.error('Error closing connection:', err);
      }
    }
  }
}

app.get('/api/getInstructorDetails/:userID', async (req, res) => {
  try {
    const userID = req.params.userID;

    // Call the function to fetch data from the database based on the received ID
    const queryResult = await fetchDataForInstructr(userID);

    // Send the query result as JSON
    res.json({ result: queryResult });
  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

async function fetchDataForStudent(userID) {
  let connection;

  try {
    // Establish a direct connection to the database
    connection = await oracledb.getConnection(dbConfig);

    // Customize the SQL query based on the received ID
    const sqlQuery = `
      SELECT * FROM STUDENT_DETAILS WHERE STUDENT_ID = :userId
    `;

    // Bind the ID to the query
    const result = await connection.execute(sqlQuery, { userID });

    // Return the query result
    return result.rows;
  } catch (err) {
    console.error('Error executing query:', err);
    throw new Error('Database error');
  } finally {
    if (connection) {
      // Close the connection
      try {
        await connection.close();
      } catch (err) {
        console.error('Error closing connection:', err);
      }
    }
  }
}

app.get('/api/getStudentDetails/:userID', async (req, res) => {
  try {
    const userID = req.params.userID;

    // Call the function to fetch data from the database based on the received ID
    const queryResult = await fetchDataForStudent(userID);

    // Send the query result as JSON
    res.json({ result: queryResult });
  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.post("/api/updateUserInstructor", async (req, res) => {
  try {
    const id = req.body.id;
    const username = req.body.username;
    const password = req.body.password;
    const birthDate = req.body.birthDate;
    const phoneNumber = req.body.number;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const plateNumber= req.body.plateNumber;
    const carBrand = req.body.carBrand;
    const carModel = req.body.carModel;

    const sqlQuery = `UPDATE USERS 
    SET USERNAME = :1,
    USER_PASSWORD = :2,
    BIRTH_DATE = TO_DATE(:3, 'YYYY-MM-DD'),
    PHONE_NUMBER = :4,
    FIRST_NAME = :5,
    LAST_NAME = :6,
        EMAIL = :7
    WHERE
        USER_ID = :8`;
    const sqlQuery2 = `UPDATE INSTRUCTOR_DETAILS
    SET PLATE_NUMBER = :9,
    CAR_BRAND = :10,
    CAR_MODEL = :11
  WHERE 
  INSTRUCTOR_ID = :12`;

    let connection;

    try {
      // Establish a direct connection to the database
      connection = await oracledb.getConnection(dbConfig);

      // Customize the SQL query based on the received data

      await connection.execute(sqlQuery, {
        1: username,
        2: password,
        3: birthDate,
        4: phoneNumber,
        5: firstName,
        6: lastName,
        7: email,
        8: id
      });
      await connection.execute(sqlQuery2, {
        9: plateNumber,
        10: carBrand,
        11: carModel,
        12: id
      });
      await connection.commit();

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

app.post("/api/updateUserStudent", async (req, res) => {
  try {
    const id = req.body.id;
    const username = req.body.username;
    const password = req.body.password;
    const birthDate = req.body.birthDate;
    const phoneNumber = req.body.number;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;

    const sqlQuery = `UPDATE USERS 
    SET USERNAME = :1,
        USER_PASSWORD = :2,
        BIRTH_DATE = TO_DATE(:3, 'YYYY-MM-DD'),
        PHONE_NUMBER = :4,
        FIRST_NAME = :5,
        LAST_NAME = :6,
        EMAIL = :7
    WHERE
        USER_ID = :8`;

    let connection;

    try {
      // Establish a direct connection to the database
      connection = await oracledb.getConnection(dbConfig);

      // Customize the SQL query based on the received data

      await connection.execute(sqlQuery, {
        1: username,
        2: password,
        3: birthDate,
        4: phoneNumber,
        5: firstName,
        6: lastName,
        7: email,
        8: id
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

app.post("/api/deleteInstructor", async (req, res) => {
  try {
    const userid = req.body.id;

    const sqlQuery = `DELETE FROM SCHEDULE WHERE INSTRUCTOR_ID = :1`;

    const sqlQuery2 = `DELETE FROM INSTRUCTOR_DETAILS WHERE INSTRUCTOR_ID = :1`;

    const sqlQuery3 = `DELETE FROM USERS WHERE USER_ID = :1`;

    let connection;

    try {
      // Establish a direct connection to the database
      connection = await oracledb.getConnection(dbConfig);

      // Customize the SQL query based on the received data

      await connection.execute(sqlQuery, { 1: userid
      });

      await connection.execute(sqlQuery2, { 1: userid
      });

      await connection.execute(sqlQuery3, { 1: userid
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

app.post("/api/deleteStudent", async (req, res) => {
  try {
    const userid = req.body.id;

    const sqlQuery = `DELETE FROM SCHEDULE WHERE STUDENT_ID = :1`;

    const sqlQuery2 = `DELETE FROM STUDENT_DETAILS WHERE STUDENT_ID = :1`;

    const sqlQuery3 = `DELETE FROM USERS WHERE USER_ID = :1`;

    let connection;

    try {
      // Establish a direct connection to the database
      connection = await oracledb.getConnection(dbConfig);

      // Customize the SQL query based on the received data

      await connection.execute(sqlQuery, { 1: userid
      });

      await connection.execute(sqlQuery2, { 1: userid
      });

      await connection.execute(sqlQuery3, { 1: userid
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

app.get('/api/studentScheduale/:userID', async (req, res) => {
  try {
    const userID = req.params.userID;

    // Call the function to fetch data from the database based on the received ID
    const queryResult = await fetchDataForStudentScheduale(userID);

    // Send the query result as JSON
    res.json({ result: queryResult });
  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

async function fetchDataForStudentScheduale(userID) {
  let connection;

  try {
    // Establish a direct connection to the database
    connection = await oracledb.getConnection(dbConfig);

    // Customize the SQL query based on the received ID
    const sqlQuery = `
      SELECT * FROM SCHEDULE WHERE STUDENT_ID = :userId
    `;

    // Bind the ID to the query
    const result = await connection.execute(sqlQuery, { userID });

    // Return the query result
    return result.rows;
  } catch (err) {
    console.error('Error executing query:', err);
    throw new Error('Database error');
  } finally {
    if (connection) {
      // Close the connection
      try {
        await connection.close();
      } catch (err) {
        console.error('Error closing connection:', err);
      }
    }
  }
}

app.get('/api/instructorScheduale/:userID', async (req, res) => {
  try {
    const userID = req.params.userID;

    // Call the function to fetch data from the database based on the received ID
    const queryResult = await fetchDataForInstructorScheduale(userID);

    // Send the query result as JSON
    res.json({ result: queryResult });
  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

async function fetchDataForInstructorScheduale(userID) {
  let connection;

  try {

    connection = await oracledb.getConnection(dbConfig);

    const sqlQuery = `
      SELECT * FROM SCHEDULE WHERE INSTRUCTOR_ID = :userId
    `;

    const result = await connection.execute(sqlQuery, { userID });

    // Return the query result
    return result.rows;
  } catch (err) {
    console.error('Error executing query:', err);
    throw new Error('Database error');
  } finally {
    if (connection) {
      // Close the connection
      try {
        await connection.close();
      } catch (err) {
        console.error('Error closing connection:', err);
      }
    }
  }
}

app.post("/api/newAppointment", async (req, res) => {
  try {
    const studentid = req.body.studentid;
    const instructorid = req.body.instructorid;
    const meetDate = req.body.meetDate;

    const sqlQuery = `INSERT INTO SCHEDULE (
      STUDENT_ID,
      INSTRUCTOR_ID,
      COURSE_HOUR
    ) VALUES (
      :1,
      :2,
      TO_DATE(:3, 'YYYY-MM-DD')
    )`;

    let connection;

    try {
      // Establish a direct connection to the database
      connection = await oracledb.getConnection(dbConfig);

      // Customize the SQL query based on the received data

      await connection.execute(sqlQuery, { 
        1: studentid,
        2: instructorid,
        3: meetDate
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

app.get("/api/student_details", async (req, res) => {
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
        STUDENT_ID
        FROM
        STUDENT_DETAILS
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