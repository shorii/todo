-- Your SQL goes here
CREATE TABLE `todos` (
    id VARCHAR NOT NULL PRIMARY KEY,
    title VARCHAR NOT NULL,
    thumnail VARCHAR,
    delivery TEXT NOT NULL,
    detail VARCHAR NOT NULL
);