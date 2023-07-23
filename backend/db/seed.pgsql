CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS "User" (
  userId UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  userName VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  creationDateTime TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  lastLogin TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO "User" (userName, email, password) VALUES ('first', 'first@example.com', 'first');

CREATE TABLE IF NOT EXISTS "Record" (
  recordId UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  userId UUID REFERENCES "User"(userId),
  recordDateTime TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  recordTitle VARCHAR(255),
  audioFile BYTEA
);
