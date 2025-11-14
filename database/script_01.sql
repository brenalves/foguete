create sequence if not exists s_client_id
  increment by 1
  start with 1;

grant all privileges on sequence s_client_id to foguete_dev;

create table if not exists client (
    id integer not null default nextval('s_client_id') primary key,
    name varchar(100) not null,
    email varchar(100) not null unique,
    password varchar(100) not null,
    created_at timestamp not null default current_timestamp
);

grant all privileges on table client to foguete_dev;

alter table client add column if not exists admin boolean not null default false;

insert into client (name, email, password, admin) values ('Administrador', 'admin@admin.com', '$2a$10$bFJnQD5Tm0s1/Pwtc3AhSOGBt3C3UMQydcahfg5lmErKTw9kRZ6Yq', true) on conflict do nothing;