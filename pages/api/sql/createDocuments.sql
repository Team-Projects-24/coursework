CREATE TABLE Documents (
    Document_ID INT NOT NULL AUTO_INCREMENT UNIQUE,
    Email VARCHAR(50),
    Body VARCHAR(5000),
    Doc_Name VARCHAR(30),
    PRIMARY KEY(Document_ID)
)