CREATE TABLE users (
  userId INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  username varchar(250) NOT NULL UNIQUE,
  firstName varchar(250)  NOT NULL,
  lastName varchar(250) NOT NULL,
  userPassword varchar(250) NOT NULL,
  birthDate DATE NOT NULL
);

CREATE TABLE locks (
  lockId INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  macId varchar(250) NOT NULL UNIQUE,
  lockName varchar(250)  NOT NULL,
  UserID INT NOT NULL,
  FOREIGN KEY fk_Id(userId)
  REFERENCES users(userId)
  ON UPDATE CASCADE
  ON DELETE CASCADE
);