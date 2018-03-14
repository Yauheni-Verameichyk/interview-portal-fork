DROP TABLE IF EXISTS candidates;

CREATE TABLE candidates (
    id bigint NOT NULL,
    name character varying(50),
    phone_number character varying(50),
    surname character varying(50)
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

INSERT INTO candidates (id, name, phone_number, surname) VALUES (5, 'Viktar', '+12312312312', 'Hrynko');
INSERT INTO candidates (id, name, phone_number, surname) VALUES (6, 'Ilya', '1123123123', 'Nikalaeu');
INSERT INTO candidates (id, name, phone_number, surname) VALUES (8, '45654654', '456546546546', '546546');
INSERT INTO candidates (id, name, phone_number, surname) VALUES (9, 'Viktar', '123123123123', 'Hrynko');
INSERT INTO candidates (id, name, phone_number, surname) VALUES (10, '4456546546', '54654654645', '54546546');

INSERT INTO candidate_discipline (candidate_id, discipline_id) VALUES (5, 1);

INSERT INTO disciplines (id, name, parent_id, subscription) VALUES (11, 'Visual basic', NULL, NULL);
INSERT INTO disciplines (id, name, parent_id, subscription) VALUES (10, 'C', NULL, '	General-purpose, imperative computer programming language, supporting structured programming, lexical variable scope and recursion, while a static type system prevents many unintended operations.');
INSERT INTO disciplines (id, name, parent_id, subscription) VALUES (1, 'Java', NULL, 'Best of the best language!!!');
