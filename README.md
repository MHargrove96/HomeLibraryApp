# Library Catalog APP 
 
## Tables 

PK = Primary Key 
FK = Foreign Key 

## Users Table

| user_id (PK) | user_name | first_name | last_name | email                | age | user_password     | permissions |
| ------------ | --------- | ---------- | --------- | -------------------- | --- | ----------------- | ----------- |
| 1            | apple12   | kirk       | davidson  | testemail1@email.com | 82  | userTestPassword1 | user        |

## Books Table 
| book_id |       title        |              summary              |     author     |
| ------- | ------------------ | --------------------------------- | -------------- |
| 1       | Pocket Garden Herbs|Features at-a-glance information...| Lesley Bremness|
| 2       |     Diablo III     |Hundreds of monsters and a host...| Doug Walsh & Rick Barba| 
| 3       |     Antiquity     |From the birth of Sumerian civilization...| Norman F. Cantor| 

## Owned_books Table
| user_id (FK)| book_id (FK)| ownedbook_id|
| ----------- | ----------- | ----------- |
| 1           | 1           | 1           |
| 1           | 3           | 2           |

## Book_wish_list Table
| user_id (FK)| book_id (FK)| wishlist_id |
| ----------- | ----------- | ----------- |
| 1           | 2           | 1           |

## Finished_books Table
| user_id (FK)| book_id (FK)| finishedbook_id |
| ----------- | ----------- | --------------- |
| 1           | 3           | 1               |

## mysql initialize file
Linked is the mysql workbench commands [sql_file](./resources/initialize.sql) to initialize your data base with the tables and feilds needed to start building the project.  