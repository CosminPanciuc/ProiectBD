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
    'paco',
    'admin1',
    0,
    TO_DATE('1990-01-01', 'YYYY-MM-DD'),
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
    USER_ID_SEQUENCE.CURRVAL,
    'IS27SEX',
    'Honda',
    'Accord'
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
    'cristiBomba',
    'password1',
    1,
    TO_DATE('1985-05-15', 'YYYY-MM-DD'),
    '0723456789',
    'Cristi',
    'Bomba',
    'fakeemail@gmail.com'
);

INSERT INTO INSTRUCTOR_DETAILS (
    INSTRUCTOR_ID,
    PLATE_NUMBER,
    CAR_BRAND,
    CAR_MODEL
) VALUES (
    USER_ID_SEQUENCE.CURRVAL,
    'B132SEX',
    'BMW',
    'M6'
);

-- User 3
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
    'vali',
    'password2',
    0,
    TO_DATE('1988-07-20', 'YYYY-MM-DD'),
    '0734567890',
    'Vali',
    'Vi',
    'fakeemail2@yahoo.com'
);

-- User 4
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
    'mara',
    'password3',
    1,
    TO_DATE('1995-03-10', 'YYYY-MM-DD'),
    '0745678901',
    'Mara',
    'Para',
    'fakeemai3@gmail.com'
);

-- User 5
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
    'ioio',
    'password4',
    0,
    TO_DATE('1982-11-28', 'YYYY-MM-DD'),
    '0756789012',
    'YOYO',
    'OUOU',
    'fakeemai4@yahoo.com'
);