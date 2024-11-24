CREATE DATABASE coach_company;
USE coach_company;

CREATE TABLE company(
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name TEXT(200) NOT NULL,
    email VARCHAR(100) NOT NULL,
    address TEXT(200) NOT NULL,
    map VARCHAR(500) NOT NULL,
    phone VARCHAR(100) NOT NULL,
    x VARCHAR(100) NOT NULL,
    facebook VARCHAR(100) NOT NULL,
    linkedin VARCHAR(100) NOT NULL,
    youtube VARCHAR(100) NOT NULL,
    open_date DATE NOT NULL,
    date_begin DATETIME NOT NULL DEFAULT NOW(),
    enable BIT NOT NULL DEFAULT 1
);

CREATE TABLE user(
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name TEXT(200) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    phone VARCHAR(100) NOT NULL UNIQUE,
    birthday DATETIME NOT NULL,
    role SMALLINT NOT NULL,
    date_begin DATETIME NOT NULL DEFAULT NOW(),
    gender BIT NOT NULL,
    img LONGBLOB DEFAULT NULL,
    enable BIT NOT NULL DEFAULT 1
);

CREATE TABLE route(
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    start_point TEXT(200) NOT NULL,
    rest_point TEXT(200) NOT NULL,
    end_point TEXT(400) NOT NULL,
    duration INT NOT NULL,
    distance INT NOT NULL,
    img LONGBLOB DEFAULT NULL,
    enable BIT NOT NULL DEFAULT 1,
    price INT NOT NULL,
    date_begin DATETIME NOT NULL DEFAULT NOW()
);

CREATE TABLE bus(
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    number_bus TEXT(200) NOT NULL,
    enable BIT NOT NULL DEFAULT 1,
    date_begin DATETIME NOT NULL DEFAULT NOW(),
    route_id BIGINT NOT NULL,
    CONSTRAINT fk_route_bus FOREIGN KEY (route_id) REFERENCES route(id)
);

CREATE TABLE seat(
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name TEXT(200) NOT NULL,
    date_begin DATETIME NOT NULL DEFAULT NOW(),
    bus_id BIGINT NOT NULL,
    CONSTRAINT fk_bus_seat FOREIGN KEY (bus_id) REFERENCES bus(id)
);

CREATE TABLE trip(
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    time_start DATETIME NOT NULL,
    time_end DATETIME NOT NULL,
    date_begin DATETIME NOT NULL DEFAULT NOW(),
    enable BIT NOT NULL DEFAULT 1,
    bus_id BIGINT NOT NULL,
    driver_id BIGINT NOT NULL,
    codriver_id BIGINT NOT NULL,
    CONSTRAINT fk_bus_trip FOREIGN KEY (bus_id) REFERENCES bus(id),
    CONSTRAINT fk_driver_trip FOREIGN KEY (driver_id) REFERENCES user(id),
    CONSTRAINT fk_codriver_trip FOREIGN KEY (codriver_id) REFERENCES user(id)
);

CREATE TABLE ticket(
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    phone_customer VARCHAR(100) NOT NULL,
    email_customer VARCHAR(200) NOT NULL,
    name_customer TEXT(200) NOT NULL,
    payment_status BIT NOT NULL DEFAULT 0,
    payment_time DATETIME,
    date_begin DATETIME NOT NULL DEFAULT NOW(),
    trip_id BIGINT NOT NULL,
    CONSTRAINT fk_ticket_trip FOREIGN KEY (trip_id) REFERENCES trip(id)
);

CREATE TABLE ticket_seat(
    ticket_id BIGINT NOT NULL,
    seat_id BIGINT NOT NULL,
    PRIMARY KEY (ticket_id,seat_id),
    CONSTRAINT fk_ticket_id_ticket_seat FOREIGN KEY (ticket_id) REFERENCES ticket(id),
    CONSTRAINT fk_seat_id_ticket_seat FOREIGN KEY (seat_id) REFERENCES seat(id)
);

CREATE TABLE news(
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    title TEXT(220) NOT NULL,
    description LONGTEXT NOT NULL,
    content LONGTEXT NOT NULL,
    enable BIT NOT NULL DEFAULT 1,
    date_begin DATETIME NOT NULL DEFAULT NOW(),
    img LONGBLOB DEFAULT NULL,
    user_id BIGINT,
    CONSTRAINT fk_user_news FOREIGN KEY (user_id) REFERENCES user(id)
);

CREATE TABLE contact(
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name_sender VARCHAR(100) NOT NULL,
    phone_sender VARCHAR(100) NOT NULL,
    email_sender VARCHAR(100) NOT NULL,
    address_sender TEXT(220) NOT NULL,
    message_sender LONGTEXT NOT NULL,
    job_sender TEXT(220) NOT NULL,
    date_begin DATETIME NOT NULL DEFAULT NOW(),

    message_processor LONGTEXT DEFAULT NULL,
    process_time DATETIME DEFAULT NULL,
    processor_id BIGINT DEFAULT NULL,
    CONSTRAINT fk_user_contact FOREIGN KEY (processor_id) REFERENCES user(id)
);

INSERT INTO company (name,email,address,map,phone,x,facebook,linkedin,youtube,open_date) VALUES
("Quốc Thịnh","tatriet16@gmail.com","19 Nguyễn Hữu Thọ, phường Tân Phong, quận 7, Thành phố Hồ Chí Minh",
"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.334834489201!2d106.71588591434093!3d10.73939699236326!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752e4b4f1d7d55%3A0x6a7b2ee8b69b2b5!2s19%20Nguy%E1%BB%87n%20H%E1%BB%AFu%20Th%E1%BB%8D%2C%20Ph%C6%B0%E1%BB%9Dng%20T%C3%A2n%20Phong%2C%20Qu%E1%BA%ADn%207%2C%20TP%20H%E1%BB%93%20Ch%C3%AD%20Minh%2C%20Vi%E1%BB%87t%20Nam!5e0!3m2!1sen!2sbd!4v1603794290143!5m2!1sen!2sbd",
"0832.446.546","https://x.com/","https://www.facebook.com/","https://www.linkedin.com/","https://www.youtube.com/",
"2021-09-01");

INSERT INTO `user` ( `name`, `email`, `password`, `phone`, `birthday`, `role`, `date_begin`, `gender`) VALUES
('Tạ Triết', 'tatriet16@gmail.com', '123', '0908828181', '2004-10-06', '1', current_timestamp(), b'1'),
('Thân Quốc Thịnh', 'tqt@gmail.com', '234', '0908838281', '2004-07-28', '2', current_timestamp(), b'1'),
('Châu Nguyễn Khánh Trình', 'kahntrinh@gmail.com', '234', '0907736251', '2004-11-01', '2', current_timestamp(), b'1'),
('Đăng Văn Trọng', 'dvtrong@gmail.com', '234', '0908293821', '2004-10-04', '2', current_timestamp(), b'1'),
('Huỳnh Trần Yến Thanh', 'ythanh@gmail.com', '234', '0908837281', '2003-11-14', '3', current_timestamp(), b'0'),
('Phạm Văn Hùng', 'vanhung@gmail.com', '234', '0987726351', '2004-09-04', '3', current_timestamp(), b'1'),
('Phan Văn Tí', 'vanTi@gmail.com', '234', '0978829312', '1999-12-23', '3', current_timestamp(), b'1'),
('Hồ Thành Nam', 'thanhnam@gmail.com', '234', '0907763521', '1999-11-15', '3', current_timestamp(), b'1'),
('Trần Văn Quý', 'vanquy@gmail.com', '234', '0896637251', '1999-09-25', '3', current_timestamp(), b'1'),
('Định Tiên Nhân', 'tiennhan@gmail.com', '234', '0897283942', '2002-03-14', '4', current_timestamp(), b'0'),
('Phạm Văn Dũng', 'vandung@gmail.com', '234', '0897463721', '1999-09-04', '4', current_timestamp(), b'1'),
('Phan Văn Tèo', 'vanTeo@gmail.com', '234', '0897746352', '1999-02-12', '4', current_timestamp(), b'1'),
('Hồ Thành Tùng', 'thanhtung@gmail.com', '234', '0890164281', '1999-01-15', '4', current_timestamp(), b'1'),
('Trần Văn Hai', 'vanhai@gmail.com', '234', '0907463829', '1999-02-25', '4', current_timestamp(), b'1');


INSERT INTO route (start_point, rest_point, end_point, duration, distance, price ) VALUES
('TP. Hồ Chí Minh', 'Ghé qua Bến Tre', 'Trà Vinh', 3*60*60, 120, 150000),
('Trà Vinh', 'Ghé qua Bến Tre', 'TP. Hồ Chí Minh', 3*60*60, 120, 150000),
('TP. Hồ Chí Minh', '', 'Tây Ninh', 3*60*60, 95, 120000),
('Tây Ninh', '', 'TP. Hồ Chí Minh', 3*60*60, 95, 120000),
('TP. Hồ Chí Minh', 'Ghé qua Đồng Tháp, Long An', 'An Giang', 5*60*60, 190, 240000),
('An Giang', 'Ghé qua Đồng Tháp, Long An', 'TP. Hồ Chí Minh', 5*60*60, 190, 240000),
('TP. Hồ Chí Minh', 'Ghé qua Long An, Tiền Giang, Vĩnh Long, Sóc Trăng, Bạc Liêu', 'Cà Mau', 8*60*60, 260, 290000),
('Cà Mau', 'Ghé qua Long An, Tiền Giang, Vĩnh Long, Sóc Trăng, Bạc Liêu', 'TP. Hồ Chí Minh', 8*60*60, 260, 290000),
('TP. Hồ Chí Minh', 'Ghé qua Bình Dương', 'Bình Phước', 4*60*60, 130, 125000),
('Bình Phước', 'Ghé qua Bình Dương', 'TP. Hồ Chí Minh', 4*60*60, 130, 125000),
('TP. Hồ Chí Minh', 'Ghé qua Cần Thơ, Vĩnh Long', 'Sóc Trăng', 5*60*60, 200, 180000),
('Sóc Trăng', 'Ghé qua Cần Thơ, Vĩnh Long', 'TP. Hồ Chí Minh', 5*60*60, 200, 180000),
('TP. Hồ Chí Minh', '', 'Đồng Nai', 3*60*60, 100, 140000),
('Đồng Nai', '', 'TP. Hồ Chí Minh', 3*60*60, 100, 140000),
('TP. Hồ Chí Minh', 'Ghé qua Long An, Đồng Tháp, Cần Thơ', 'Kiên Giang', 7*60*60, 250, 220000),
('Kiên Giang', 'Ghé qua Long An, Đồng Tháp, Cần Thơ', 'TP. Hồ Chí Minh', 7*60*60, 250, 220000),
('TP. Hồ Chí Minh', 'Ghé qua Long An, Tiền Giang', 'Vĩnh Long', 3*60*60, 140, 145000),
('Vĩnh Long', 'Ghé qua Long An, Tiền Giang', 'TP. Hồ Chí Minh', 3*60*60, 140, 145000),
('TP. Hồ Chí Minh', 'Ghé qua Tiền Giang, Vĩnh Long', 'Hậu Giang', 5*60*60, 200, 230000),
('Hậu Giang', 'Ghé qua Tiền Giang, Vĩnh Long', 'TP. Hồ Chí Minh', 5*60*60, 200, 230000);


INSERT INTO bus (number_bus,route_id) VALUES
('Xe 01', 1),
('Xe 02', 1),
('Xe 03', 1),
('Xe 04', 1),
('Xe 05', 1),
('Xe 06', 1),
('Xe 07', 1),
('Xe 08', 1),
('Xe 09', 2),
('Xe 10', 2),
('Xe 11', 2),
('Xe 12', 2),
('Xe 13', 2),
('Xe 14', 2),
('Xe 15', 2),
('Xe 16', 2);

INSERT INTO seat (name,bus_id) VALUES
('A01', 1),
('A02', 1),
('A03', 1),
('A04', 1),
('A05', 1),
('A06', 1),
('A07', 1),
('A08', 1),
('A09', 1),
('A10', 1),
('A11', 1),
('A12', 1),
('A13', 1),
('A14', 1),
('A15', 1),
('B01', 1),
('B02', 1),
('B03', 1),
('B04', 1),
('B05', 1),
('B06', 1),
('B07', 1),
('B08', 1),
('B09', 1),
('B10', 1),
('B11', 1),
('B12', 1),
('B13', 1),
('B14', 1),
('B15', 1),
('A01', 2),
('A02', 2),
('A03', 2),
('A04', 2),
('A05', 2),
('A06', 2),
('A07', 2),
('A08', 2),
('A09', 2),
('A10', 2),
('A11', 2),
('A12', 2),
('A13', 2),
('A14', 2),
('A15', 2),
('B01', 2),
('B02', 2),
('B03', 2),
('B04', 2),
('B05', 2),
('B06', 2),
('B07', 2),
('B08', 2),
('B09', 2),
('B10', 2),
('B11', 2),
('B12', 2),
('B13', 2),
('B14', 2),
('B15', 2);

INSERT INTO trip (time_start,time_end,bus_id,driver_id,codriver_id) VALUES
('2022-10-13 00:00', '2022-10-13 03:00',1,5,10),
('2023-11-13 06:00', '2023-11-13 09:00',2,5,10),
('2024-11-13 00:00', '2024-11-13 03:00',1,5,10),
('2024-11-13 06:00', '2024-11-13 09:00',1,5,10),
('2024-11-13 00:00', '2024-11-13 03:00',2,6,11),
('2024-11-13 06:00', '2024-11-13 09:00',2,6,11),
('2024-11-23 09:00', '2024-11-23 13:00',1,5,10),
('2024-11-23 13:00', '2024-11-23 16:00',2,6,11),
('2024-11-23 16:00', '2024-11-23 19:00',1,5,10),
('2024-11-23 21:00', '2024-11-24 00:00',2,6,11),
('2024-11-24 06:00', '2024-11-24 09:00',1,5,10),
('2024-11-24 09:00', '2024-11-24 12:00',2,6,11),
('2022-09-13 00:00', '2022-09-13 03:00',1,5,10);


INSERT INTO ticket(trip_id,name_customer,phone_customer,email_customer,payment_status,payment_time) VALUES
(1,'Thân Quốc Thinh 1','0987364852','dvt1@gmail.com', b'1','2022-09-13 01:00'),
(1,'Thân Quốc Thinh 2','0987364851','dvt2@gmail.com', b'1','2022-09-13 01:00'),
(1,'Thân Quốc Thinh 3','0987364850','dvt3@gmail.com', b'1','2022-09-13 01:00'),
(1,'Thân Quốc Thinh 4','0987364853','dvt4@gmail.com', b'1','2022-09-13 01:00'),
(2,'Thân Quốc Thinh 5','0987364854','dvt5@gmail.com', b'1','2023-10-13 07:00'),
(2,'Thân Quốc Thinh 6','0987364855','dvt6@gmail.com', b'1','2023-10-13 07:00'),
(2,'Thân Quốc Thinh 7','0987364856','dvt7@gmail.com', b'1','2023-10-13 07:00'),
(2,'Thân Quốc Thinh 8','0987364857','dvt8@gmail.com', b'1','2023-10-13 07:00'),
(2,'Thân Quốc Thinh 9','0987364858','dvt9@gmail.com', b'1','2023-10-13 07:00'),
(2,'Thân Quốc Thinh 10','0987364859','dvt10@gmail.com', b'1','2023-10-13 07:00'),
(3,'Thân Quốc Thinh 11','0987364860','dvt11@gmail.com', b'1','2024-10-13 01:00'),
(3,'Thân Quốc Thinh 12','0987364861','dvt12@gmail.com', b'1','2024-10-13 01:00'),
(3,'Thân Quốc Thinh 13','0987364862','dvt13@gmail.com', b'1','2024-10-13 01:00'),
(3,'Thân Quốc Thinh 14','0987364863','dvt14@gmail.com', b'1','2024-10-13 01:00'),
(3,'Thân Quốc Thinh 15','0987364864','dvt15@gmail.com', b'1','2024-10-13 01:00'),
(3,'Thân Quốc Thinh 16','0987364865','dvt16@gmail.com', b'1','2024-10-13 01:00'),
(4,'Thân Quốc Thinh 17','0987364866','dvt17@gmail.com', b'1','2024-10-13 01:00'),
(4,'Thân Quốc Thinh 18','0987364867','dv18t@gmail.com', b'1','2024-10-13 01:00'),
(4,'Thân Quốc Thinh 19','0987364868','dvt19@gmail.com', b'1','2024-10-13 01:00'),
(4,'Thân Quốc Thinh 20','0987364869','dvt20@gmail.com', b'1','2024-10-13 01:00'),
(4,'Thân Quốc Thinh 21','0987364870','dvt21@gmail.com', b'1','2024-10-13 01:00'),
(4,'Thân Quốc Thinh 22','0987364871','dvt22@gmail.com', b'1','2024-10-13 01:00'),
(4,'Thân Quốc Thinh 23','0987364872','dvt23@gmail.com', b'1','2024-10-13 01:00'),
(4,'Thân Quốc Thinh 24','0987364873','dvt24@gmail.com', b'1','2024-10-13 01:00'),
(4,'Thân Quốc Thinh 25','0987364874','dvt25@gmail.com', b'1','2024-10-13 01:00'),
(4,'Thân Quốc Thinh 26','0987364875','dvt26@gmail.com', b'0',NULL),
(4,'Thân Quốc Thinh 27','0987364876','dvt27@gmail.com', b'0',NULL),
(7,'Thân Quốc Thinh 28','0987364877','dvt28@gmail.com', b'1','2022-08-13 01:00'),
(7,'Thân Quốc Thinh 29','0987364878','dvt29@gmail.com', b'1','2022-08-13 01:00'),
(7,'Thân Quốc Thinh 30','0987364879','dvt30@gmail.com', b'1','2022-08-13 01:00'),
(7,'Thân Quốc Thinh 31','0987364880','dvt31@gmail.com', b'1','2022-08-13 01:00'),
(7,'Thân Quốc Thinh 32','0987364881','dvt32@gmail.com', b'1','2022-08-13 01:00');

INSERT INTO ticket_seat(ticket_id,seat_id) VALUES
(1,1),
(2,2),
(3,3),
(4,4),
(5,5),
(6,6),
(7,7),
(8,8),
(9,9),
(10,10),
(11,11),
(12,12),
(13,13),
(14,14),
(15,15),
(16,16),
(17,17),
(18,18),
(19,19),
(20,20),
(21,21),
(22,22),
(23,23),
(24,24),
(25,25),
(26,26),
(27,27),
(28,1),
(29,2),
(30,3),
(31,4),
(32,5);

INSERT INTO news (title,description,content) VALUES
('Xe khách Quốc Thịnh mở chi nhánh tại thành phố HCM','chi nhánh mới ở Quận 11','Chi tiết tin tức mở chi nhánh TP.HCM'),
('Xe khách Quốc Thịnh mở chi nhánh tại thành phố HCM','chi nhánh mới ở Quận 11','Chi tiết tin tức mở chi nhánh TP.HCM'),
('Xe khách Quốc Thịnh mở chi nhánh tại thành phố HCM','chi nhánh mới ở Quận 11','Chi tiết tin tức mở chi nhánh TP.HCM'),
('Xe khách Quốc Thịnh mở chi nhánh tại thành phố HCM','chi nhánh mới ở Quận 11','Chi tiết tin tức mở chi nhánh TP.HCM'),
('Xe khách Quốc Thịnh mở chi nhánh tại thành phố HCM','chi nhánh mới ở Quận 11','Chi tiết tin tức mở chi nhánh TP.HCM'),
('Xe khách Quốc Thịnh mở chi nhánh tại thành phố HCM','chi nhánh mới ở Quận 11','Chi tiết tin tức mở chi nhánh TP.HCM'),
('Xe khách Quốc Thịnh mở chi nhánh tại thành phố HCM','chi nhánh mới ở Quận 11','Chi tiết tin tức mở chi nhánh TP.HCM'),
('Xe khách Quốc Thịnh mở chi nhánh tại thành phố HCM','chi nhánh mới ở Quận 11','Chi tiết tin tức mở chi nhánh TP.HCM');

INSERT INTO contact (name_sender,phone_sender,email_sender,address_sender,message_sender,job_sender) VALUES
('Tạ Triết','0908871318','tatriet16@gmail.com','Quận 7','Dịch vụ rất okeela','code dạo'),
('Châu Nguyễn Khánh Trình','0908871317','tatriet17@gmail.com','Quận 8','Ngủ êm, nhân viên mến khách','hacker lỏ'),
('Thân Quốc Thịnh','0908871311','tatriet19@gmail.com','Quận 9','Xe rất êm','siêu nhân gao');

