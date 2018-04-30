-- mysql -uroot -p -e "CREATE DATABASE taohe DEFAULT CHARSET utf8"

-- CREATE DATABASE taohe DEFAULT CHARSET utf8;

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- 管理员
DROP TABLE IF EXISTS `administrators`;
CREATE TABLE `administrators`(
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `nickname` varchar(255) CHARACTER SET utf8 COMMENT '昵称',
  `login` varchar(255) CHARACTER SET utf8 COMMENT '登录名(唯一)，看申请用了手机号还是邮箱',
  `password` varchar(255) CHARACTER SET utf8 COMMENT '密码',
  `secret_key` varchar(255) CHARACTER SET utf8 COMMENT '秘钥',
  `created_at` datetime NOT NULL COMMENT '创建时间',
  `updated_at` datetime COMMENT '更新时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `index_administrators_on_login` (`login`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
  `updated_at` datetime COMMENT '更新时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `index_users_on_login` (`login`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 板块表解耦为模板表与布局表

-- 模板
DROP TABLE IF EXISTS `templates`;
CREATE TABLE `templates` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `name` varchar(255) CHARACTER SET utf8 NOT NULL COMMENT '模板名称',
  `category` varchar(255) CHARACTER SET utf8 DEFAULT '默认' COMMENT '模板类别, 如商业，博客。',
  `active` tinyint(1) DEFAULT '1' COMMENT '是否可用',
  `thumbnail_url` varchar(255) CHARACTER SET utf8 COMMENT '缩略图地址',
  `data` mediumtext CHARACTER SET utf8 NOT NULL COMMENT 'dom tree 数据',
  `created_at` datetime NOT NULL COMMENT '创建时间',
  `updated_at` datetime COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- -- add category
-- ALTER TABLE templates
-- ADD COLUMN category varchar(255) CHARACTER SET utf8 DEFAULT '默认' COMMENT '模板类别, 如商业，博客。';

-- ALTER TABLE templates DROP COLUMN category;


-- 布局
DROP TABLE IF EXISTS `layouts`;
CREATE TABLE `layouts` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `name` varchar(255) CHARACTER SET utf8 NOT NULL COMMENT '布局名称',
  `category` varchar(255) CHARACTER SET utf8 DEFAULT '默认' COMMENT '模板类别, 如商业，博客。',
  `is_public` tinyint(1) DEFAULT '1' COMMENT '是否公开，公开后用户可见。Admin 能看到所有',
  `thumbnail_url` varchar(255) CHARACTER SET utf8 COMMENT '缩略图地址',
  `active` tinyint(1) DEFAULT '1' COMMENT '是否开启使用',
  `data` mediumtext CHARACTER SET utf8 NOT NULL COMMENT 'dom tree 数据',
  `created_at` datetime NOT NULL COMMENT '创建时间',
  `updated_at` datetime COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ALTER TABLE layouts
-- ADD COLUMN is_public tinyint(1) DEFAULT '1' COMMENT '是否公开，公开后用户可见。Admin 能看到所有。';
-- ALTER TABLE layouts
-- ADD COLUMN category varchar(255) CHARACTER SET utf8 DEFAULT '默认' COMMENT '样式类别, 如商业，博客。';



-- 部署表 通过遍历内部域名生成主机 nginx 配置
DROP TABLE IF EXISTS `deployments`;
CREATE TABLE `deployments` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `user_id` int(11) COMMENT '关联用户 id',
  `domain` varchar(255) CHARACTER SET utf8 COMMENT '域名',
  `port` varchar(255) CHARACTER SET utf8 DEFAULT '80' COMMENT '端口',  
  `domain_scope` varchar(255) DEFAULT 'internal' COMMENT '域名范围，分为内部域名(internal), 外部域名(external)',
  `available` tinyint(1) DEFAULT '1' COMMENT '是否可用,指该地址没有被部署',
  `url` varchar(255) CHARACTER SET utf8 COMMENT '(domain+port)是唯一的，domain 和 folder_location 都不是唯一的',
  `folder_location` varchar(255) CHARACTER SET utf8 COMMENT '打包后的文件位置,如果是内部域名可以携带二级域名前缀',
  `proxy` varchar(255) CHARACTER SET utf8 COMMENT '代理转向的地址(domain:port)',
  `created_at` datetime NOT NULL COMMENT '创建时间',
  `updated_at` datetime COMMENT '更新时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `index_deployments_on_url` (`url`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
CREATE INDEX user_id_index ON deployments (user_id) USING BTREE;

-- 网站表
-- TODO 增加 isDeployed boolean
DROP TABLE IF EXISTS `sites`;
CREATE TABLE `sites` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `user_id` int(11) NOT NULL COMMENT '关联用户 id',
  `name` varchar(255) CHARACTER SET utf8 NOT NULL COMMENT '网站名称',
  `template_id` int(11) COMMENT '关联模板 id, 可以用于统计模板使用次数',
  `deployment_id` int(11) COMMENT '关联部署表 id',
  `active` tinyint(1) DEFAULT '1' COMMENT '是否开启使用,可以用于禁用',
  `data` mediumtext CHARACTER SET utf8 NOT NULL COMMENT 'dom tree 数据',
  `created_at` datetime NOT NULL COMMENT '创建时间',
  `updated_at` datetime COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE INDEX user_id_index ON sites (user_id) USING BTREE;
CREATE INDEX deployment_id_index ON sites (deployment_id) USING BTREE;
CREATE INDEX template_id_index ON sites (template_id) USING BTREE;

