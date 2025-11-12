create sequence s_client_id
  increment by 1
  start with 1;

create table client (
    id integer not null default nextval('s_client_id') primary key,
    name varchar(100) not null,
    email varchar(100) not null unique,
    password varchar(100) not null,
    created_at timestamp not null default current_timestamp
);