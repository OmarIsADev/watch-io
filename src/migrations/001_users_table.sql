CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY NOT NULL,
    firstName TEXT NOT NULL,
    lastName TEXT NOT NULL,
    img TEXT,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
);