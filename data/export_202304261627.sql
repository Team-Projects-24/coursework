INSERT INTO make_it_all.Chatroom (createdAt,updatedAt,name,chatImage,description,private,creatorId) VALUES
	 ('2023-04-25 11:29:24.343','2023-04-25 11:29:24.343','test-Ben',NULL,'A chat between users.',1,'test'),
	 ('2023-04-25 15:52:48.051','2023-04-25 15:52:48.051','Test-Chuck',NULL,'A chat between users.',1,'Test'),
	 ('2023-04-25 20:59:32.320','2023-04-25 20:59:32.320','test-Ade',NULL,'A chat between users.',1,'test'),
	 ('2023-04-25 20:59:33.875','2023-04-25 20:59:33.875','test-Ade',NULL,'A chat between users.',1,'test');
INSERT INTO make_it_all.Message (sentAt,updatedAt,senderId,chatroomId,content) VALUES
	 ('2023-04-25 11:29:40.226','2023-04-25 11:29:40.226','Test',2,'Hello chatters'),
	 ('2023-04-25 12:45:19.805','2023-04-25 12:45:19.805','Test',2,'asda'),
	 ('2023-04-25 15:52:16.362','2023-04-25 15:52:16.362','Test',2,'bg'),
	 ('2023-04-25 15:53:01.532','2023-04-25 15:53:01.532','Test',3,'go away'),
	 ('2023-04-25 21:00:23.665','2023-04-25 21:00:23.665','Test',5,'hello'),
	 ('2023-04-25 21:17:26.616','2023-04-25 21:17:26.616','Test',5,'hey'),
	 ('2023-04-25 21:49:06.133','2023-04-25 21:49:06.133','Test',5,'hello'),
	 ('2023-04-25 21:49:12.684','2023-04-25 21:49:12.684','Test',3,'whats the time now'),
	 ('2023-04-25 21:52:37.502','2023-04-25 21:52:37.502','Test',3,'does send work'),
	 ('2023-04-25 21:52:44.065','2023-04-25 21:52:44.065','Test',5,'sed');
INSERT INTO make_it_all.Message (sentAt,updatedAt,senderId,chatroomId,content) VALUES
	 ('2023-04-26 14:17:27.808','2023-04-26 14:17:27.808','test',3,'hello'),
	 ('2023-04-26 14:22:43.026','2023-04-26 14:22:43.026','Test',3,'another message'),
	 ('2023-04-26 14:29:42.056','2023-04-26 14:29:42.056','Test',3,'again'),
	 ('2023-04-26 14:29:50.250','2023-04-26 14:29:50.250','Test',3,',essage'),
	 ('2023-04-26 14:30:03.721','2023-04-26 14:30:03.721','Test',3,'another');
INSERT INTO make_it_all.PerformanceLog (userId,`date`,manHoursSet,manHoursCompleted,taskId) VALUES
	 ('Anna','2023-04-25 00:00:00',2.0,1.0,1),
	 ('Anna','2023-04-25 12:29:29.124',2.0,1.0,1),
	 ('Anna','2023-04-25 12:36:14.571',9.0,4.0,2),
	 ('Anna','2023-04-22 00:00:00',4.0,4.0,3),
	 ('Bob','2023-04-15 00:00:00',12.0,4.0,4),
	 ('Bob','2023-04-20 00:00:00',12.0,4.0,4),
	 ('Bob','2023-04-25 12:53:33.606',12.0,4.0,4),
	 ('Hilbert','2023-04-25 12:35:27',5.0,2.0,6);
INSERT INTO make_it_all.Task (teamId,userId,deadline,name,manHoursCompleted,manHoursSet) VALUES
	 ('1','Anna','2024-01-01 00:00:00','Buy roof tiles',2.0,2.0),
	 ('1','Anna','2024-01-01 00:00:00','Install insulation',4.0,9.0),
	 ('1','Anna','2024-01-01 00:00:00','Buy Velux',4.0,4.0),
	 ('1','Bob','2024-01-01 00:00:00','Building',12.0,12.0),
	 ('2','Hilbert','2023-09-12 00:00:00','Intsall Wiring',0.0,20.0),
	 ('2','Hilbert','2023-07-05 00:00:00','Buy Electrical Equipment',2.0,5.0),
	 ('2','Anna','2023-09-13 00:00:00','Verify electrical equipment',0.0,5.0);
INSERT INTO make_it_all.Team (id,createdAt,updatedAt,name,teamImage,leaderId) VALUES
	 ('1','2023-04-25 11:21:35.876','2023-04-25 11:48:57.605','Team 1',NULL,'Liv'),
	 ('2','2023-04-25 11:24:55.446','2023-04-25 11:48:57.605','Team 2',NULL,'Yahya'),
	 ('Alpha','2023-04-25 11:24:55.446','2023-04-25 11:48:57.605','Team Alpha',NULL,'Yahya'),
	 ('Beta','2023-04-25 11:24:55.446','2023-04-25 11:48:57.605','Team Beta',NULL,'Liv'),
	 ('Gamma','2023-04-25 11:24:55.446','2023-04-25 11:48:57.605','Team Gamma',NULL,'Liv');
INSERT INTO make_it_all.`User` (createdAt,updatedAt,userId,name,password,`role`,profileImage) VALUES
	 ('2023-04-25 11:03:42.446','2023-04-25 11:26:12.179','Ade','Ade','$2a$10$l1WjP3BEbp8D54IFtGNjzecg42VSsgSKSakQ5fUKh154cm5Z5XM5a','MANAGER',NULL),
	 ('2023-04-25 11:03:42.446','2023-04-25 11:26:12.179','Anna','Anna','$2a$10$Ia1199WpOhxzQ1tWH0ROEumjX9xPkszqOY2z2xZ/gL65B/dJw6HOa','EMPLOYEE',NULL),
	 ('2023-04-25 11:03:42.446','2023-04-25 11:26:12.179','Ben','Ben','$2a$10$/F2cJeowPvk0cwVz6WcoVu7JesDGZs7v2i/LjLF/GQDBBY.Skxpfy','MANAGER',NULL),
	 ('2023-04-25 11:06:37.959','2023-04-25 11:26:12.179','Bob','Bob','$2a$10$qz706n.80DKsdnfrdhzy2.Cs3q1oAFTPJ0IuBAE7kO4RGitR/O9pS','EMPLOYEE',NULL),
	 ('2023-04-25 11:06:37.959','2023-04-25 11:26:12.179','Chuck','Chuck','$2a$10$OVADiIR3A.B.NTRvPoH6OO5LGj67RK1pJDPkdOwzoiCoToPanNSSu','EMPLOYEE',NULL),
	 ('2023-04-25 11:06:37.959','2023-04-25 11:26:12.179','David','David','$2a$10$x8z8F0cYFqNGugdCLWv2/ObvQQjDCtOL..GTuVMakXIZYDAHoQZEW','EMPLOYEE',NULL),
	 ('2023-04-25 11:15:30.511','2023-04-25 11:26:12.179','Edith','Edith','$2a$10$zt3mBH9b41ktBwxv.r.oLeVG3zezAmZVyT0BPo.7cs3UsSqHsgiuG','EMPLOYEE',NULL),
	 ('2023-04-25 11:15:30.511','2023-04-25 11:26:12.179','Frankie','Frankie','$2a$10$WKJcGsyNUjfrWxmIAU0n.O2LZOvPmuqefmBnWN3xGxSFD2Rmx3WOq','EMPLOYEE',NULL),
	 ('2023-04-25 11:15:30.511','2023-04-25 11:26:12.179','Gloria','Gloria','$2a$10$p60pGbtZ5kJ1e49Mqifndu78MX3d2t7xdjnHSWHnOqfZ8/IOyPu7m','EMPLOYEE',NULL),
	 ('2023-04-25 11:15:30.511','2023-04-25 11:26:12.179','Hilbert','Hilbert','$2a$10$KyPKGEQ040p2OuRc6cg5ouPrmzmp6Lw/ZO0SI.NU9JrMr8uhiiprO','EMPLOYEE',NULL);
INSERT INTO make_it_all.`User` (createdAt,updatedAt,userId,name,password,`role`,profileImage) VALUES
	 ('2023-04-25 11:15:30.511','2023-04-25 11:26:12.179','Iona','Iona','$2a$10$Jvf52zsMYfdHciAbXdUY2uoGvhp3LXvUgSu8kJWFYKyUhZI24JHam','EMPLOYEE',NULL),
	 ('2023-04-25 11:15:30.511','2023-04-25 11:26:12.179','Jack','Jack','$2a$10$g9sjgEAkS/0A6sIqw/iy4OXQ0nQO7SCjcy5RlFaIoRTFh.PdCNkQG','EMPLOYEE',NULL),
	 ('2023-04-25 11:15:30.511','2023-04-25 11:26:12.179','Leon','Leon','$2a$10$1QwCck.H.0LEztDqD4Hpx.1E6ctXG50mg4.j7VwvQHB/vQm0vitWW','EMPLOYEE',NULL),
	 ('2023-04-25 11:03:42.446','2023-04-25 11:26:12.179','Liv','Liv','$2a$10$BUed86eFlGrz6i.AUHm9xOCqqC/5ZBhEW2IB8uwWk4Bn7szeJMpZm','TEAMLEADER',NULL),
	 ('2023-04-25 11:15:30.511','2023-04-25 11:26:12.179','Micky','Micky','$2a$10$sxSkGR2xY2on0afqgEnBye44urwHvPQYD0CnQ/cJ088TCDnS81g.S','EMPLOYEE',NULL),
	 ('2023-04-25 11:03:42.446','2023-04-25 11:26:12.179','Olivia','Olivia','$2a$10$jHxucFUr/Z1PKFMTIjzcWuYVi7Gla7mpwsyvIL4GvvINtfZV2EPRq','MANAGER',NULL),
	 ('2023-04-25 11:03:42.446','2023-04-25 11:26:12.179','Test','test','$2a$10$OAAW9bM/PIXnO.xqvKWA3.w401wPj5aQWF4ImhQXI6dw/sf4/Jwz.','MANAGER',NULL),
	 ('2023-04-25 11:22:16.834','2023-04-25 11:26:12.179','Yahya','Yahya','$2a$10$N2zpjU4h0W65FZfwxqSxcuKyC1pvWvMIBkm0dLKY4AJ2IAR9kxIFC','TEAMLEADER',NULL);
INSERT INTO make_it_all.UserOnTeam (userId,teamId) VALUES
	 ('Anna','1'),
	 ('Bob','1'),
	 ('Chuck','1'),
	 ('Anna','2'),
	 ('Hilbert','2'),
	 ('Chuck','Alpha'),
	 ('David','Alpha'),
	 ('Edith','Alpha'),
	 ('Frankie','Alpha'),
	 ('Gloria','Alpha');
INSERT INTO make_it_all.UserOnTeam (userId,teamId) VALUES
	 ('Iona','Beta'),
	 ('Jack','Beta'),
	 ('Leon','Beta'),
	 ('Anna','Gamma'),
	 ('Bob','Gamma'),
	 ('Frankie','Gamma'),
	 ('Micky','Gamma');
