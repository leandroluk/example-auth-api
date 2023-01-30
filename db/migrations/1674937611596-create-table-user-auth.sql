CREATE TABLE "user_auth" (
  "id"            UUID         NOT NULL DEFAULT GEN_RANDOM_UUID() PRIMARY KEY,
  "timestamp"     TIMESTAMP(3) NOT NULL,
  "created"       TIMESTAMP(3) NOT NULL,
  "removed"       TIMESTAMP(3) NULL,
  "user_id"       UUID         NULL REFERENCES "user" ("id") ON DELETE SET NULL,
  "access_token"  TEXT         NOT NULL,
  "refresh_token" TEXT         NOT NULL
);
