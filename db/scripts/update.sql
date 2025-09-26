CREATE ROLE project32_adm WITH LOGIN PASSWORD 'password';
CREATE ROLE project32_usr WITH LOGIN PASSWORD 'password';

CREATE DATABASE project32 OWNER project32_adm;

\c project32 project32_adm

GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO project32_usr;

CREATE TABLE IF NOT EXISTS clients (
    id VARCHAR(6) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    birthdate DATE NOT NULL,
    created_at TIMESTAMP NOT NULL
);

-- add trigger to insert creation_time
CREATE OR REPLACE FUNCTION func_set_created_at_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.created_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trgg_set_created_at
BEFORE INSERT ON clients
FOR EACH ROW
EXECUTE FUNCTION func_set_created_at_timestamp();