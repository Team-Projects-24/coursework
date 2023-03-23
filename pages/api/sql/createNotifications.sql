CREATE TABLE Notifications(
    Notification_ID INT NOT NULL AUTO_INCREMENT,
    Email VARCHAR(50),
    Title VARCHAR(30),
    Description VARCHAR(250),
    Date DATETIME,
    Seen BOOLEAN,
    PRIMARY KEY (Notification_ID)
)