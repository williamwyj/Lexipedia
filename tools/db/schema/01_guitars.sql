DROP TABLE IF EXISTS guitars;
CREATE TABLE IF NOT EXISTS guitars (
  id INT NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id varchar(50) NOT NULL,
  branch varchar(50) NOT NULL,
  model varchar(50) NOT NULL,
  year smallint NULL,
  color varchar(50) NULL
);