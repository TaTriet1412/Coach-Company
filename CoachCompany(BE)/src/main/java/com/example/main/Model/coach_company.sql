CREATE DATABASE coach_company;
USE coach_company;
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

INSERT INTO `user` ( `name`, `email`, `password`, `phone`, `birthday`, `role`, `date_begin`, `gender`, `img`, `enable`) VALUES ('Tạ Triết', 'tatriet16@gmail.com', '123', '0908828181', '2004-10-06', '1', current_timestamp(), b'1', 'assets/admin/img/undraw_profile.svg', b'1');
INSERT INTO `user` ( `name`, `email`, `password`, `phone`, `birthday`, `role`, `date_begin`, `gender`, `img`, `enable`) VALUES ('Thân Quốc Thịnh', 'tqt@gmail.com', '234', '0908838281', '2004-07-28', '2', current_timestamp(), b'1', 'assets/admin/img/undraw_profile.svg', b'1');
INSERT INTO `user` ( `name`, `email`, `password`, `phone`, `birthday`, `role`, `date_begin`, `gender`, `img`, `enable`) VALUES ('Châu Nguyễn Khánh Trình', 'kahntrinh@gmail.com', '234', '0907736251', '2004-11-01', '2', current_timestamp(), b'1', 'assets/admin/img/undraw_profile.svg', b'1');
INSERT INTO `user` ( `name`, `email`, `password`, `phone`, `birthday`, `role`, `date_begin`, `gender`, `img`, `enable`) VALUES ('Đăng Văn Trọng', 'dvtrong@gmail.com', '234', '0908293821', '2004-10-04', '2', current_timestamp(), b'1', 'assets/admin/img/undraw_profile.svg', b'1');
