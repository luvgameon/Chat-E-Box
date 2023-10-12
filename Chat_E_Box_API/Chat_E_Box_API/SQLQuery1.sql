CREATE TABLE Conversations (
    ConversationID INT IDENTITY(1,1) PRIMARY KEY,
    Name VARCHAR(255), 
    isGroupChat BIT
    -- Add more conversation-related fields as needed
);

CREATE TABLE UserConversations (
    UserID INT,
    ConversationID INT,
    PRIMARY KEY (UserID, ConversationID),
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (ConversationID) REFERENCES Conversations(ConversationID)
);

CREATE TABLE Messages (
    MessageID INT IDENTITY(1,1) PRIMARY KEY,
    ConversationID INT,
    SenderID INT,
    Content TEXT,
    date Datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (ConversationID) REFERENCES Conversations(ConversationID),
    FOREIGN KEY (SenderID) REFERENCES Users(UserID)
);

INSERT INTO Messages (SenderID, ConversationID,Content)
VALUES (10, 1,'hi');

CREATE TABLE Persons (
    Personid int IDENTITY(1,1) PRIMARY KEY,
    LastName varchar(255) NOT NULL,
    FirstName varchar(255),
    Age int
);

INSERT INTO Persons (LastName, FirstName)
VALUES ('test chat', '0');

DROP TABLE Conversations;

SELECT ConversationID
FROM Conversations
WHERE Name = 'test chat' AND isGroupChat = '0';