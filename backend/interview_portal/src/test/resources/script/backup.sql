DROP TABLE IF EXISTS candidates;

CREATE TABLE candidates (
    id bigint NOT NULL,
    name character varying(50),
    phone_number character varying(50),
    surname character varying(50),
    email character varying(50)
);

DROP SEQUENCE IF EXISTS hibernate_sequence;

CREATE SEQUENCE hibernate_sequence
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

DROP TABLE IF EXISTS disciplines;

CREATE TABLE disciplines (
    id bigint NOT NULL,
    name character varying(50) NOT NULL,
    parent_id bigint,
    subscription character varying(200)
);

DROP TABLE IF EXISTS candidate_discipline;

CREATE TABLE candidate_discipline (
    candidate_id bigint NOT NULL,
    discipline_id bigint NOT NULL
);

DROP TABLE IF EXISTS work_candidate;

CREATE TABLE work_candidate (
    id bigint NOT NULL,
    date_end timestamp,
    date_start timestamp,
    name_company character varying(255),
    position character varying(255),
    candidate_id bigint
);

DROP TABLE IF EXISTS education_candidate;

CREATE TABLE education_candidate (
    id bigint NOT NULL,
    date_end timestamp,
    date_start timestamp,
    name_institution character varying(255),
    profession character varying(255),
    candidate_id bigint
);

DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id bigint NOT NULL,
    login character varying(50) NOT NULL,
    email character varying(50) NOT NULL,
    name character varying(50) NOT NULL,
    password character varying(100) NOT NULL,
    phone_number character varying(50) NOT NULL,
    surname character varying(50) NOT NULL
);

DROP TABLE IF EXISTS users_roles_disciplines;

CREATE TABLE users_roles_disciplines (
    id bigint NOT NULL,
    role_id integer NOT NULL,
    discipline_id integer,
    user_id bigint NOT NULL
);

INSERT INTO candidates (id, name, email, phone_number, surname) VALUES (5, 'Viktar', 'mail@mail.ru', '+12312312312', 'Hrynko');
INSERT INTO candidates (id, name, email, phone_number, surname) VALUES (6, 'Ilya', 'mail@mail.ru', '1123123123', 'Nikalaeu');
INSERT INTO candidates (id, name, email, phone_number, surname) VALUES (8, '45654654', 'mail@mail.ru', '456546546546', '546546');
INSERT INTO candidates (id, name, email, phone_number, surname) VALUES (9, 'Viktar', 'mail@mail.ru', '123123123123', 'Hrynko');
INSERT INTO candidates (id, name, email, phone_number, surname) VALUES (10, '4456546546', 'mail@mail.ru', '54654654645', '54546546');

INSERT INTO candidate_discipline (candidate_id, discipline_id) VALUES (5, 1);
INSERT INTO education_candidate (id, date_end, date_start, name_institution, profession, candidate_id) VALUES (2, '2018-03-08 03:00:00', '2018-03-08 03:00:00', 'qqqqqqq1', 'qqqqqqq1', NULL);
INSERT INTO education_candidate (id, date_end, date_start, name_institution, profession, candidate_id) VALUES (11, '2018-03-31 03:00:00', '2018-03-23 03:00:00', '435', '345', NULL);
INSERT INTO education_candidate (id, date_end, date_start, name_institution, profession, candidate_id) VALUES (12, NULL, NULL, 'PSU', 'Radio-Technical', 8);
INSERT INTO education_candidate (id, date_end, date_start, name_institution, profession, candidate_id) VALUES (13, NULL, NULL, 'PSU', 'IT', 10);

INSERT INTO work_candidate (id, date_end, date_start, name_company, position, candidate_id) VALUES (2, NULL, NULL, 'Integral', 'accountant', 9);
INSERT INTO work_candidate (id, date_end, date_start, name_company, position, candidate_id) VALUES (5, '2018-03-21 03:00:00', '2018-03-14 03:00:00', 'sdsd', 'sdasda',  NULL);
INSERT INTO work_candidate (id, date_end, date_start, name_company, position, candidate_id) VALUES (7, NULL, NULL, 'MTZ', 'manager', 9);

INSERT INTO disciplines (id, name, parent_id, subscription) VALUES (11, 'Visual basic', NULL, NULL);
INSERT INTO disciplines (id, name, parent_id, subscription) VALUES (10, 'C', NULL, '	General-purpose, imperative computer programming language, supporting structured programming, lexical variable scope and recursion, while a static type system prevents many unintended operations.');
INSERT INTO disciplines (id, name, parent_id, subscription) VALUES (1, 'Java', NULL, 'Best of the best language!!!');
INSERT INTO disciplines (id, name, parent_id, subscription) VALUES (13, 'Java core', 1, 'sdfsdffsdfs');

INSERT INTO users (id, login, email, name, password, phone_number, surname) VALUES (19, 'lsanders5@cornell.edu', 'mail@mail.ru', 'Larry', '$2a$10$JNOt6MitwnaS6NO.t8ancesyDhHrC82QPRc01GysrQTYbo1mB7vyO', '2015-01-11', 'Sanders');
INSERT INTO users (id, login, email, name, password, phone_number, surname) VALUES (22, 'gortiz0@mapy.cz', 'mail@mail.ru', 'Gary', '$2a$10$z6YihsM92D9v4Og.RhDP9OHNRlX1GkzXJLDvi6R/B8PPi7uDTeZnS', '2015-05-16', 'Ortiz');

INSERT INTO users_roles_disciplines (id, role_id, discipline_id, user_id) VALUES (20, 0, NULL, 19);
INSERT INTO users_roles_disciplines (id, role_id, discipline_id, user_id) VALUES (21, 3, NULL, 19);
INSERT INTO users_roles_disciplines (id, role_id, discipline_id, user_id) VALUES (23, 1, 1, 22);
