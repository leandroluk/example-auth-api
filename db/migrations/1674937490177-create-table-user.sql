CREATE TABLE "user" (
  "id"           UUID         NOT NULL DEFAULT GEN_RANDOM_UUID() PRIMARY KEY,
  "timestamp"    TIMESTAMP(3) NOT NULL,
  "created"      TIMESTAMP(3) NOT NULL,
  "removed"      TIMESTAMP(3) NULL,
  "display_name" VARCHAR(100) NOT NULL,
  "email"        VARCHAR(100) NOT NULL UNIQUE,
  "password"     TEXT         NOT NULL
);
