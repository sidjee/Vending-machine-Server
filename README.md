# Vending-machine-Server
nodejs server using mysql backend

1. Add a mypass.js file in the parent directory of this directory which will contain:-
```
module.exports = '<Your mysql root password>';
```
2. Create the following tables:-
```
create table users(id int not null auto_increment,username varchar not null, password varchar not null, primary key(id));
```
```
create table products(id int not null auto_increment, A int, B int, C int, D int, primary key(id));
```
3. Put a secret key in config.json.
4.
```
npm start
```
