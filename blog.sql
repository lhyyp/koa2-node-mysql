/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50720
Source Host           : localhost:3306
Source Database       : blog

Target Server Type    : MYSQL
Target Server Version : 50720
File Encoding         : 65001

Date: 2018-09-30 17:57:05
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for article
-- ----------------------------
DROP TABLE IF EXISTS `article`;
CREATE TABLE `article` (
  `id` int(11) NOT NULL COMMENT '文章id',
  `author` varchar(255) NOT NULL COMMENT '作者',
  `title` varchar(255) NOT NULL COMMENT '文章标题',
  `content` text NOT NULL COMMENT '文章内容',
  `uid` int(11) NOT NULL COMMENT '用户id',
  `publicationTime` datetime NOT NULL COMMENT '发表时间',
  `pv` int(255) NOT NULL COMMENT '浏览量',
  `comments` int(255) NOT NULL COMMENT '文章评论数',
  `avator` varchar(255) NOT NULL COMMENT '用户头像',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of article
-- ----------------------------

-- ----------------------------
-- Table structure for banners
-- ----------------------------
DROP TABLE IF EXISTS `banners`;
CREATE TABLE `banners` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `src` varchar(255) NOT NULL COMMENT '图片路径',
  `url` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of banners
-- ----------------------------
INSERT INTO `banners` VALUES ('1', '1.jpeg', '/');
INSERT INTO `banners` VALUES ('2', '2.jpeg', '/');
INSERT INTO `banners` VALUES ('3', '3.jpeg', '/');
INSERT INTO `banners` VALUES ('4', '4.jpeg', '/');
INSERT INTO `banners` VALUES ('5', '5.jpeg', '/');

-- ----------------------------
-- Table structure for comment
-- ----------------------------
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment` (
  `id` int(11) NOT NULL,
  `uid` int(11) NOT NULL COMMENT '用户id',
  `articleId` int(11) NOT NULL COMMENT '文章id',
  `content` text NOT NULL COMMENT '评论内容',
  `commentTime` datetime NOT NULL COMMENT '评论时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of comment
-- ----------------------------

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL COMMENT '用户名',
  `pass` varchar(255) NOT NULL COMMENT '密码',
  `avator` varchar(255) NOT NULL COMMENT '头像',
  `registrationTime` datetime NOT NULL COMMENT '注册时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', 'lhy', '123456', 'img.jpg', '2018-09-30 11:43:39');
