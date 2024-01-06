CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DROP TABLE IF EXISTS "users";
CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  photo VARCHAR(255),
  invite_code_for_parent VARCHAR(255),
  invite_code_for_teacher VARCHAR(255)
);

DROP TABLE IF EXISTS "schools";
CREATE TABLE schools (
  school_id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  photo VARCHAR(255),
  creator_user_id INTEGER REFERENCES users(user_id)
);

DROP TABLE IF EXISTS "classes";
CREATE TABLE classes (
  class_id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  school_id INTEGER REFERENCES schools(school_id)
);

DROP TABLE IF EXISTS "students";
CREATE TABLE students (
  student_id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  photo VARCHAR(255)
);

DROP TABLE IF EXISTS "class_students";
CREATE TABLE class_students (
  class_id INT REFERENCES classes(class_id) ON DELETE CASCADE,
  student_id INT REFERENCES students(student_id) ON DELETE CASCADE,
  PRIMARY KEY (class_id, student_id)
);