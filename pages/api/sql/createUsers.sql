CREATE TABLE Users (
    Email VARCHAR(50) NOT NULL UNIQUE,
    Name VARCHAR(40),
    Password VARCHAR(40),
    Is_Manager BOOLEAN,
    Is_Admin BOOLEAN,
    PRIMARY KEY(Email)
)