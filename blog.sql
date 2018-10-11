/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50720
Source Host           : localhost:3306
Source Database       : blog

Target Server Type    : MYSQL
Target Server Version : 50720
File Encoding         : 65001

Date: 2018-10-11 17:42:36
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for article
-- ----------------------------
DROP TABLE IF EXISTS `article`;
CREATE TABLE `article` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '文章id',
  `author` varchar(255) NOT NULL COMMENT '作者',
  `title` varchar(255) NOT NULL COMMENT '文章标题',
  `content` text NOT NULL COMMENT '文章内容',
  `uid` int(11) NOT NULL COMMENT '作者id',
  `publicationTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '发表时间',
  `pv` int(255) unsigned NOT NULL DEFAULT '0' COMMENT '浏览量',
  `comments` int(255) NOT NULL DEFAULT '0' COMMENT '文章评论数',
  `classification` int(255) NOT NULL COMMENT '文章分类',
  `picturesArticle` varchar(255) NOT NULL COMMENT '文章图片',
  `abstract` varchar(255) NOT NULL COMMENT '摘要',
  `Headportrait` varchar(255) NOT NULL COMMENT '作者头像',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of article
-- ----------------------------
INSERT INTO `article` VALUES ('7', 'admin', '一个前端的自我修养', '<p>这句话我在我职业生涯的起点听说，一直指导我的职业发展，甚至在我带团队，培养团队的时候，也是中心的指导思想，之前我带的团队的同学，他们有不少人也在带团队，其实他们也在实践这句话，所以我这里，也把这句话、把这个道理分享给给大家。&nbsp;&nbsp;<br></p>', '33', '2018-10-11 15:58:56', '0', '0', '1', '20181011/15392447367578479.jpg', '这句话我在我职业生涯的起点听说，一直指导我的职业发展，甚至在我带团队，培养团队的时候，也是中心的指导思想，之前我带的团队的同学，他们有不少人也在带团队，其实他们也在实践这句话，所以我这里，也把这句话、把这个道理分享给给大家。', '2018109/15390693300478186.png');
INSERT INTO `article` VALUES ('8', 'lhy', '如何建立个人博客？', '<p>想必很多人都想建立一个，属于自己的个人博客，把自己的一些学习的经验和经历，通过互联网的形式来分享给别人。通过分享与网友进行互动，让更多的人了解和认识你，并且树立自己在互联网上的个人品牌，其实这就是一种“自媒体”。那么我们怎么去建立自己独立..&nbsp;&nbsp;<br></p>', '42', '2018-10-11 16:00:40', '0', '0', '2', '20181011/15392448403599216.png', '想必很多人都想建立一个，属于自己的个人博客，把自己的一些学习的经验和经历，通过互联网的形式来分享给别人。通过分享与网友进行互动，让更多的人了解和认识你，并且树立自己在互联网上的个人品牌，其实这就是一种“自媒体”。那么我们怎么去建立自己独立..', '20181011/15392448127606874.png');

-- ----------------------------
-- Table structure for articlepictures
-- ----------------------------
DROP TABLE IF EXISTS `articlepictures`;
CREATE TABLE `articlepictures` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL COMMENT '分类名',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of articlepictures
-- ----------------------------
INSERT INTO `articlepictures` VALUES ('1', '前端文章');
INSERT INTO `articlepictures` VALUES ('2', 'node.js文章');

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
  `id` int(11) NOT NULL AUTO_INCREMENT,
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
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL COMMENT '用户名',
  `pass` varchar(255) NOT NULL COMMENT '密码',
  `avator` varchar(255) NOT NULL COMMENT '头像',
  `registrationTime` datetime NOT NULL COMMENT '注册时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('33', 'admin', '123456', '2018109/15390693300478186.png', '2018-10-09 15:15:30');
INSERT INTO `user` VALUES ('42', 'lhy', '123456', '20181011/15392448127606874.png', '2018-10-11 16:00:12');
