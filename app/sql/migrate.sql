-- mysql -uroot -p -e "CREATE DATABASE taohe DEFAULT CHARSET utf8"

CREATE DATABASE taohe DEFAULT CHARSET utf8;

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- 用户表
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`(
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `nickname` varchar(255) CHARACTER SET utf8 COMMENT '昵称',
  `phone` varchar(191) CHARACTER SET utf8 COMMENT '手机号',
  `email` varchar(255) CHARACTER SET utf8 COMMENT '邮箱',
  `login` varchar(255) CHARACTER SET utf8 COMMENT '登录名(唯一)，看申请用了手机号还是邮箱',
  `password` varchar(255) CHARACTER SET utf8 COMMENT '密码',
  `created_at` datetime NOT NULL COMMENT '创建时间',
  `updated_at` datetime NOT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `index_users_on_login` (`login`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 板块表
DROP TABLE IF EXISTS `blocks`;
CREATE TABLE `blocks` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `name` varchar(255) CHARACTER SET utf8 NOT NULL COMMENT '板块名称',
  `type` varchar(50) CHARACTER SET utf8 NOT NULL COMMENT '类型(layout, template)',
  `data` mediumtext CHARACTER SET utf8 NOT NULL COMMENT 'dom tree 数据',
  `created_at` datetime NOT NULL COMMENT '创建时间',
  `updated_at` datetime NOT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 网站表
DROP TABLE IF EXISTS `sites`;
CREATE TABLE `sites` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `user_id` int(11) NOT NULL COMMENT '关联用户 id',
  `block_id` int(11) NOT NULL COMMENT '关联板块 id',
  `data` mediumtext CHARACTER SET utf8 NOT NULL COMMENT 'dom tree 数据',
  `created_at` datetime NOT NULL COMMENT '创建时间',
  `updated_at` datetime NOT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- CREATE TABLE `daihoubang_report_base_infos` (
--   `id` int(11) NOT NULL AUTO_INCREMENT,
--   `user_id` int(11) DEFAULT NULL,
--   `json_data` mediumtext,
--   `created_at` datetime NOT NULL,
--   `updated_at` datetime NOT NULL,
--   PRIMARY KEY (`id`)
-- ) ENGINE=InnoDB AUTO_INCREMENT=2347 DEFAULT CHARSET=utf8mb4;