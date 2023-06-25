/*
 Navicat Premium Data Transfer

 Source Server         : 毕设
 Source Server Type    : MySQL
 Source Server Version : 50729
 Source Host           : localhost:3306
 Source Schema         : login-register

 Target Server Type    : MySQL
 Target Server Version : 50729
 File Encoding         : 65001

 Date: 18/02/2022 18:56:45
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `createdAt` datetime(0) NOT NULL,
  `updatedAt` datetime(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `username`(`username`) USING BTREE,
  INDEX `password`(`password`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 92 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (1, 'admin', '123456', '2021-12-25 08:00:03', '2021-12-25 08:00:03');
INSERT INTO `users` VALUES (16, 'xxx', '990824', '2021-12-26 07:47:02', '2021-12-26 07:47:02');
INSERT INTO `users` VALUES (76, 'sad', '8465', '2022-01-15 12:51:35', '2022-01-15 12:51:35');
INSERT INTO `users` VALUES (78, '啊沙发上', 'safsaasfsfsa', '2022-01-15 13:01:32', '2022-01-15 13:01:32');
INSERT INTO `users` VALUES (79, '啊', '976541', '2022-01-15 13:01:55', '2022-01-15 13:01:55');
INSERT INTO `users` VALUES (80, 'asfs', '98as4d68sa4f65as4f', '2022-01-15 13:02:07', '2022-01-15 13:02:07');
INSERT INTO `users` VALUES (84, '111', 'aaa', '2022-01-15 13:05:53', '2022-01-15 13:05:53');
INSERT INTO `users` VALUES (91, 'sadas', '1111111', '2022-01-15 13:22:43', '2022-01-15 13:22:43');

SET FOREIGN_KEY_CHECKS = 1;
