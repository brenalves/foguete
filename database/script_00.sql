create role foguete_dev password 'foguete_dev';
alter role foguete_dev login;

create database foguete owner foguete_dev;

grant connect on database foguete to foguete_dev;
grant all privileges on database foguete to foguete_dev;