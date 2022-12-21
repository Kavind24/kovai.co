
USE master  

GO  

CREATE DATABASE TestApp

Go

USE TestApp

--To Create Users table
CREATE TABLE [dbo].[Users](
	[Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[Name] [varchar](50) NOT NULL,
	[Email] [varchar](100) NOT NULL,
	[Password] [varchar](50) NOT NULL,
	[Role] [varchar](50) NULL)

-- To Insert values in Users table
INSERT INTO Users 
VALUES
('Admin', 'admin@test.com', 'admin', 'Admin'),
('Member', 'member@test.com', 'member', 'Member')

--To Create Products table
CREATE TABLE [dbo].[Products](
	[Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[Name] [varchar](50) NOT NULL,
	[ImageUrl] [varchar](250) NULL,
	[Price] [decimal](18, 2) NOT NULL)

-- To Insert values in Products table
INSERT INTO Products 
VALUES 
('Shirt','https://99designs-blog.imgix.net/blog/wp-content/uploads/2017/11/Tshirt-design.jpg?auto=format&q=60&fit=max&w=930',499),
('Shoe','https://assets.myntassets.com/dpr_1.5,q_60,w_400,c_limit,fl_progressive/assets/images/18509904/2022/5/31/766bda50-82e7-480b-a52c-9cd648a2d7941653975616884MactreeMenWhiteColourblockedPUSneakers1.jpg',699.87),
('Watch','https://assets.bwbx.io/images/users/iqjWHBFdfxIU/ibH8wi11kIE8/v1/1200x-1.jpg',1599.9),
('Heaphone','https://media.wired.com/photos/5f2b2e792f0075bf6e0a1de6/2:1/w_2399,h_1199,c_limit/Gear-Sony-WH-1000XM4-1-SOURCE-Sony.jpg',1999),
('Laptop','https://www.digitaltrends.com/wp-content/uploads/2021/08/dell-xps-15-oled-2021-laptop.jpg?fit=720%2C720&p=1',49999),
('Car','https://cdn.luxe.digital/media/20220127155206/fastest-cars-world-2022-luxe-digital-1.jpg',100000),
('Bike','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSM0NfVzehaQST7Xv6Dvcuxz2FWxIE8wFnCB3MYcJGRrMwrvhKKUj4TzYArm_XEJhFfbOc&usqp=CAU',75999)