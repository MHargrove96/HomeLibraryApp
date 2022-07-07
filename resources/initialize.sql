USE /*DATABASE*/

CREATE TABLE users ( 
user_id int auto_increment NOT NULL UNIQUE,
user_name varchar(15) NOT NULL UNIQUE,
first_name varchar (255) NOT NULL, 
last_name varchar(255) NOT NULL, 
email varchar(50) NOT NULL UNIQUE,
age int,
user_password varchar(50) NOT NULL,
permissions varchar(10) DEFAULT 'user', 
PRIMARY KEY (user_id)
); 
CREATE TABLE books (
book_id int auto_increment NOT NULL UNIQUE, 
title varchar(255) NOT NULL, 
summary varchar(255),
author varchar(255),
PRIMARY KEY (book_id) 
);
CREATE TABLE owned_books (
ownedbook_id int NOT NULL UNIQUE,
user_id int not null,
book_id int NOT NULL UNIQUE, 
PRIMARY KEY (ownedbook_id),
FOREIGN KEY (user_id) REFERENCES users(user_id),
FOREIGN KEY (book_id) REFERENCES books(book_id)
);
CREATE TABLE book_wish_list (
wishlist_id int NOT NULL UNIQUE,
user_id int NOT NULL,
book_id int NOT NULL UNIQUE, 
PRIMARY KEY (wishlist_id),
FOREIGN KEY (user_id) REFERENCES users(user_id),
FOREIGN KEY (book_id) REFERENCES books(book_id)
);
CREATE TABLE finished_books (
finishedbook_id int NOT NULL UNIQUE,
user_id int not null,
book_id int NOT NULL UNIQUE,
PRIMARY KEY(finishedbook_id), 
FOREIGN KEY (user_id) REFERENCES users(user_id),
FOREIGN KEY (book_id) REFERENCES books(book_id)
);