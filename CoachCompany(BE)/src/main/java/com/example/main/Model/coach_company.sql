CREATE TABLE user(
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name TEXT(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    phone VARCHAR(100) NOT NULL UNIQUE,
    birthday DATETIME NOT NULL,
    role SMALLINT NOT NULL,
    date_begin DATETIME NOT NULL DEFAULT NOW(),
    gender BIT NOT NULL,
    img LONGTEXT NOT NULL,
    enable BIT NOT NULL DEFAULT 1
);

CREATE TABLE route(
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    start_point TEXT(200) NOT NULL,
    rest_point TEXT(200) NOT NULL,
    end_point TEXT(400) NOT NULL,
    duration INT NOT NULL,
    distance INT NOT NULL,
    enable BIT NOT NULL DEFAULT 1,
    price INT NOT NULL,
    date_begin DATETIME NOT NULL DEFAULT NOW()
);

INSERT INTO `user` ( `name`, `email`, `password`, `phone`, `birthday`, `role`, `date_begin`, `gender`, `img`, `enable`) VALUES
('Tạ Triết', 'tatriet16@gmail.com', '123', '0908828181', '2004-10-06', '1', current_timestamp(), b'1', 'assets/admin/img/undraw_profile.svg', b'1'),
('Thân Quốc Thịnh', 'tqt@gmail.com', '234', '0908838281', '2004-07-28', '2', current_timestamp(), b'1', 'assets/admin/img/undraw_profile.svg', b'1'),
('Châu Nguyễn Khánh Trình', 'kahntrinh@gmail.com', '234', '0907736251', '2004-11-01', '2', current_timestamp(), b'1', 'assets/admin/img/undraw_profile.svg', b'1'),
('Đăng Văn Trọng', 'dvtrong@gmail.com', '234', '0908293821', '2004-10-04', '2', current_timestamp(), b'1', 'assets/admin/img/undraw_profile.svg', b'1');


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
