CREATE DATABASE myiit_service;
CREATE USER postgres WITH ENCRYPTED PASSWORD 'postgres';
GRANT ALL PRIVILEGES ON DATABASE myiit_service TO postgres;