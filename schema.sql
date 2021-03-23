DROP DATABASE IF EXISTS Q_A;
CREATE DATABASE Q_A;

USE Q_A;

CREATE TABLE results (
  question_id INT NOT NULL AUTO_INCREMENT,
  product_id INT NOT NULL,
  question_body varchar(255),
  question_date varchar(255),
  asker_name varchar(255),
  asker_email varchar(255),
  reported tinyint(0),
  question_helpfulness int,
  PRIMARY KEY (question_id)
);

CREATE INDEX product_id ON results (product_id);

CREATE TABLE answers (
  AnsId INT NOT NULL AUTO_INCREMENT,
  question_id INT NOT NULL,
  body varchar(255),
  date varchar(255),
  answerer_name varchar(255),
  answerer_email varchar(255),
  report tinyint(0),
  helpful INT,
  PRIMARY KEY (id),
  FOREIGN KEY (question_id) REFERENCES results(question_id)
);

CREATE INDEX question_id ON answers (question_id);

CREATE TABLE photos (
  id int NOT NULL AUTO_INCREMENT,
  answer_id INT,
  url varchar(255),
  PRIMARY KEY (id),
  FOREIGN KEY (answer_id) REFERENCES answers(id)
);

CREATE INDEX answer_id ON photos (answer_id);