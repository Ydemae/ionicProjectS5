DROP TABLE IF EXISTS dish;
CREATE TABLE dish(
    id INT PRIMARY KEY AUTO_INCREMENT,
    dish_name varchar(100),
    /* dish_kcal, dish_prot, dish_lip, dish_glu are all macros for the dish in a 100g portion */
    dish_kcal INT,
    dish_prot FLOAT,
    dish_lip FLOAT,
    dish_glu FLOAT,
    image_url varchar(300),
    active BOOLEAN DEFAULT 1
);

INSERT INTO dish (dish_name, dish_kcal, dish_prot, dish_lip, dish_glu, image_url)
VALUES ("Bolognaise", 137, 6, 5, 17, "https://cdn.pixabay.com/photo/2022/10/12/22/09/spaghetti-bolognese-7517639_1280.jpg"),
("Poulet curry", 123, 7.9, 1.9, 17.4, "https://cdn.pixabay.com/photo/2024/05/06/00/34/food-8742066_960_720.jpg"),
("Cordon bleu", 230, 14.7, 14, 10.9, "https://imgs.search.brave.com/0PFdg1oZXdHMEHjynqn1oTmsb1WKfqFMPzQEet7Z7nQ/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMuNzUwZy5jb20v/aW1hZ2VzLzY0MC00/NDAvYzZlMjA0ODdk/MTE1ZTI0MGRkYjZm/MDVkN2Y2YWNiYmIv/cGhvdG8taG9yaXpv/bnRhbGUtY29yZG9u/LWJsZXUuanBn"),
("Pizza", 282, 11.7, 11.9, 32, "https://picjumbo.com/free-photos/pizza/"),
("Cookie du crous", 7000000, 0, 0, 0, "https://cdn.pixabay.com/photo/2014/04/02/17/06/cookie-307960_1280.png"),
("Cookie maison", 0, 0, 0, 0, "https://imgs.search.brave.com/TD8SqzUUfCuD6kT8OVlxc6pk6HaaUJl9yEq2v_z2reU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMuNzUwZy5jb20v/aW1hZ2VzLzY0MC00/NDAvY2Y3MTU2MmEw/NGQ1ZTBmN2Y5ZmYx/ZGU5ZTgxZmEwZDkv/Y29va2llcy1tYWlz/b24uanBn"),
;

DROP TABLE IF EXISTS registered_day;
CREATE TABLE registered_day(
    id INT PRIMARY KEY AUTO_INCREMENT,
    day_date date UNIQUE
);

DROP TABLE IF EXISTS day_meals;
CREATE TABLE day_meals(
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    dish_id INT,
    day_id INT
);

ALTER TABLE day_meals
ADD CONSTRAINT dishIdDayMeals FOREIGN KEY (dish_id) REFERENCES dish(id),
ADD CONSTRAINT DayIdDayMeals FOREIGN KEY (day_id) REFERENCES registered_day(id);