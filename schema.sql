DROP DATABASE IF EXISTS Q_A;
CREATE DATABASE Q_A;

USE Q_A;

CREATE TABLE questions (
  product_id INT NOT NULL AUTO_INCREMENT,
  page INT DEFAULT 1,
  count INT DEFAULT 5,
  results varchar(255),
  PRIMARY KEY (product_id)
);

CREATE TABLE results (
  question_id int NOT NULL AUTO_INCREMENT,
  question_body varchar(255),
  question_date varchar(255),
  asker_name varchar(255),
  question_helpfullness int ,
  reported tinyint(0),
  answers varchar(255),
  product_id INT NOT NULL,
  PRIMARY KEY (question_id),
  FOREIGN KEY (product_id) REFERENCES questions(product_id)
);

CREATE TABLE answers (
  id INT NOT NULL AUTO_INCREMENT,
  body varchar(255),
  date varchar(255),
  answerer_name varchar(255),
  helpfulness INT,
  photos varchar(255),
  question_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (question_id) REFERENCES results(question_id)
);

CREATE TABLE photos (
  id int NOT NULL AUTO_INCREMENT,
  url varchar(255),
  answer_id INT,
  PRIMARY KEY (id),
  FOREIGN KEY (answer_id) REFERENCES answers(id)
);