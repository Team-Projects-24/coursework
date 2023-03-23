CREATE TABLE Tasks (
    Task_ID INT NOT NULL AUTO_INCREMENT UNIQUE,
    Email VARCHAR(50),
    Task_Name VARCHAR(40),
    Task_Desc VARCHAR(500),
    Man_Hours INT,
    Deadline DATETIME,
    Status Int,
    Archived BOOLEAN,
    PRIMARY KEY(Task_ID)
)