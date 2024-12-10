DROP TABLE IF EXISTS dish;
CREATE TABLE dish(
    id INT PRIMARY KEY AUTO_INCREMENT,
    dish_name varchar(100),
    /* dish_kcal, dish_prot, dish_lip, dish_glu are all macros for the dish in a 100g portion */
    dish_kcal int,
    dish_prot int,
    dish_lip int,
    dish_glu int
);

INSERT INTO dish (dish_name, dish_kcal, dish_prot, dish_lip, dish_glu)
VALUES ("Bolognaise", 137, 6, 5, 17)

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