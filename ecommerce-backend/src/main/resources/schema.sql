-- src/main/resources/schema.sql
DROP TABLE IF EXISTS product;

CREATE TABLE product (
                         id BIGINT PRIMARY KEY AUTO_INCREMENT,
                         name VARCHAR(255),
                         description VARCHAR(255),
                         price DOUBLE,
                         image_url VARCHAR(500)
);
