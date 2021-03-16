CREATE DATABASE Q_A;

CREATE TABLE questions (
  product_id int NOT NULL AUTO_INCREMENT,
  page int DEFAULT 1,
  count int DEFAULT 5,
  results varchar(255),
  PRIMARY KEY (product_id),
);

CREATE TABLE results (
  question_id int NOT NULL AUTO_INCREMENT,
  question_body varchar(255),
  question_date varchar(255),
  asker_name varchar(255),
  question_helpfullness int ,
  reported BOOLEAN,
  answers varchar(255),
  FOREIGN KEY (product_id) REFERENCES questions(product_id),
)

CREATE TABLE answers (
  id int NOT NULL AUTO_INCREMENT,
  body varchar(255),
  date varchar(255),
  answerer_name varchar(255),
  helpfulness int,
  photos varchar(255),
  FOREIGN KEY (question_id) REFERENCES results(question_id),
)

CREATE TABLE photos (
  id int NOT NULL AUTO_INCREMENT,
  url varchar(255),
  FOREIGN KEY (id) REFERENCES answers(id),
)