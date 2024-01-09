--user 1 INSTRUCTOR
INSERT INTO USERS (
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
    1,
    'paco',
    'admin1',
    0,
    TO_DATE('2002-12-03', 'YYYY-MM-DD'),
    '0712345678',
    'Cosmin',
    'Panciuc',
    'cosminpanciuc1@gmail.com'
);

INSERT INTO INSTRUCTOR_DETAILS (
    INSTRUCTOR_ID,
    PLATE_NUMBER,
    CAR_BRAND,
    CAR_MODEL
) VALUES (
    1,
    'IS12CAD',
    'Toyota',
    'Camry'
);

-- User 2

INSERT INTO USERS (
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
    'usr',
    'pass1',
    0,
    TO_DATE('2000-12-03', 'YYYY-MM-DD'),
    '0712345678',
    'Andrei',
    'Bana',
    'fakemail1@gmail.com'
);

INSERT INTO INSTRUCTOR_DETAILS (
    INSTRUCTOR_ID,
    PLATE_NUMBER,
    CAR_BRAND,
    CAR_MODEL
) VALUES (
    USER_ID_SEQUENCE.CURRVAL,
    'B212NNN',
    'Honda',
    'Camry'
);

-- User 3 & instructor

INSERT INTO USERS (
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
    'usr1',
    'pass1',
    0,
    TO_DATE('1999-06-13', 'YYYY-MM-DD'),
    '0712345678',
    'Ion',
    'Ionut',
    'fakemail2@gmail.com'
);

INSERT INTO INSTRUCTOR_DETAILS (
    INSTRUCTOR_ID,
    PLATE_NUMBER,
    CAR_BRAND,
    CAR_MODEL
) VALUES (
    USER_ID_SEQUENCE.CURRVAL,
    'IS22OOO',
    'Honda',
    'Camry'
);


-- User 4 & instructor

INSERT INTO USERS (
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
    'usr3',
    'pass1',
    0,
    TO_DATE('1999-06-13', 'YYYY-MM-DD'),
    '0712345678',
    'Jhon',
    'Stone',
    'fakemail3@gmail.com'
);

INSERT INTO INSTRUCTOR_DETAILS (
    INSTRUCTOR_ID,
    PLATE_NUMBER,
    CAR_BRAND,
    CAR_MODEL
) VALUES (
    USER_ID_SEQUENCE.CURRVAL,
    'IS18JJJ',
    'Toyota',
    'Camry'
);

-- User 5 & instructor

INSERT INTO USERS (
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
    'usr4',
    'pass1',
    0,
    TO_DATE('1999-06-13', 'YYYY-MM-DD'),
    '0712345678',
    'Silviu',
    'Candare',
    'fakemail4@gmail.com'
);

INSERT INTO INSTRUCTOR_DETAILS (
    INSTRUCTOR_ID,
    PLATE_NUMBER,
    CAR_BRAND,
    CAR_MODEL
) VALUES (
    USER_ID_SEQUENCE.CURRVAL,
    'IS12AAA',
    'Toyota',
    'Camry'
);

--user 6 & student
INSERT INTO USERS (
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
    'student1',
    'pass1',
    1,
    TO_DATE('1999-06-13', 'YYYY-MM-DD'),
    '0712345678',
    'Marius',
    'Dan',
    'fakemail5@gmail.com'
);

INSERT INTO STUDENT_DETAILS (
    STUDENT_ID,
    INSTRUCTOR_ID,
    EXPIRATION_DATE,
    COURSES_LEFT
) VALUES (
    USER_ID_SEQUENCE.CURRVAL,
    1,
    TO_DATE('2025-06-13', 'YYYY-MM-DD'),
    14
);

--user 7 & student
INSERT INTO USERS (
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
    'student2',
    'pass1',
    1,
    TO_DATE('1999-06-13', 'YYYY-MM-DD'),
    '0712345678',
    'Ion',
    'Marian',
    'fakemail6@gmail.com'
);

INSERT INTO STUDENT_DETAILS (
    STUDENT_ID,
    INSTRUCTOR_ID,
    EXPIRATION_DATE,
    COURSES_LEFT
) VALUES (
    USER_ID_SEQUENCE.CURRVAL,
    1,
    TO_DATE('2025-06-13', 'YYYY-MM-DD'),
    14
);

--user 7 & student
INSERT INTO USERS (
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
    'student3',
    'pass1',
    1,
    TO_DATE('1999-06-13', 'YYYY-MM-DD'),
    '0712345678',
    'Daniel',
    'Malina',
    'fakemail7@gmail.com'
);

INSERT INTO STUDENT_DETAILS (
    STUDENT_ID,
    INSTRUCTOR_ID,
    EXPIRATION_DATE,
    COURSES_LEFT
) VALUES (
    USER_ID_SEQUENCE.CURRVAL,
    1,
    TO_DATE('2025-06-13', 'YYYY-MM-DD'),
    14
);

--user 7 & student
INSERT INTO USERS (
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
    'student4',
    'pass1',
    1,
    TO_DATE('1999-06-13', 'YYYY-MM-DD'),
    '0712345678',
    'Jana',
    'Ana',
    'fakemail8@gmail.com'
);

INSERT INTO STUDENT_DETAILS (
    STUDENT_ID,
    INSTRUCTOR_ID,
    EXPIRATION_DATE,
    COURSES_LEFT
) VALUES (
    USER_ID_SEQUENCE.CURRVAL,
    1,
    TO_DATE('2025-06-13', 'YYYY-MM-DD'),
    14
);

--user 9 & student
INSERT INTO USERS (
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
    'student5',
    'pass1',
    1,
    TO_DATE('1999-06-13', 'YYYY-MM-DD'),
    '0712345678',
    'Marius',
    'Darius',
    'fakemail9@gmail.com'
);

INSERT INTO STUDENT_DETAILS (
    STUDENT_ID,
    INSTRUCTOR_ID,
    EXPIRATION_DATE,
    COURSES_LEFT
) VALUES (
    USER_ID_SEQUENCE.CURRVAL,
    1,
    TO_DATE('2025-06-13', 'YYYY-MM-DD'),
    14
);

--user 10 & student
INSERT INTO USERS (
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
    'student6',
    'pass1',
    1,
    TO_DATE('1999-06-13', 'YYYY-MM-DD'),
    '0712345678',
    'Costel',
    'Varvar',
    'fakemail7@gmail.com'
);

INSERT INTO STUDENT_DETAILS (
    STUDENT_ID,
    INSTRUCTOR_ID,
    EXPIRATION_DATE,
    COURSES_LEFT
) VALUES (
    USER_ID_SEQUENCE.CURRVAL,
    1,
    TO_DATE('2025-06-13', 'YYYY-MM-DD'),
    14
);
 --SCH1
INSERT INTO SCHEDULE (
    STUDENT_ID,
    INSTRUCTOR_ID,
    COURSE_HOUR
) VALUES (
    USER_ID_SEQUENCE.CURRVAL,
    1,
    TO_DATE('2025-01-13', 'YYYY-MM-DD')
);

 --SCH2
INSERT INTO SCHEDULE (
    STUDENT_ID,
    INSTRUCTOR_ID,
    COURSE_HOUR
) VALUES (
    USER_ID_SEQUENCE.CURRVAL,
    1,
    TO_DATE('2025-01-14', 'YYYY-MM-DD')
);

 --SCH3
INSERT INTO SCHEDULE (
    STUDENT_ID,
    INSTRUCTOR_ID,
    COURSE_HOUR
) VALUES (
    USER_ID_SEQUENCE.CURRVAL,
    1,
    TO_DATE('2025-01-15', 'YYYY-MM-DD')
);


 --SCH4
INSERT INTO SCHEDULE (
    STUDENT_ID,
    INSTRUCTOR_ID,
    COURSE_HOUR
) VALUES (
    USER_ID_SEQUENCE.CURRVAL,
    1,
    TO_DATE('2025-01-16', 'YYYY-MM-DD')
);

 --SCH5
INSERT INTO SCHEDULE (
    STUDENT_ID,
    INSTRUCTOR_ID,
    COURSE_HOUR
) VALUES (
    USER_ID_SEQUENCE.CURRVAL,
    1,
    TO_DATE('2025-01-17', 'YYYY-MM-DD')
);