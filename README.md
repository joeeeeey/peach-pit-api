## Introdution
This repo provides backend api for peach-pit.

### Setup in Development
- Install `mysql`.
- Create table and import seeds data(By sequel pro or tableplus).

```sql
mysql -uroot -p root -e "CREATE DATABASE taohe_development DEFAULT CHARSET utf8"
```

- Set Config file.

```bash
cp config/config.default.js config/config.local.js
# change config.local.js with correct params.
```

- Install dependencies.
```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```


### 获取数据组通用写法
见 user/layoutController getLayouts 中

### CDN 存储图片的位置
prefix: `/taohe/{env}/`

1. 编辑页面图片的存储位置: 
    `/editPage/${role}/${roleId}${source ? ('/' + source) : ''}${sourceId ? ('/' + sourceId) : ''}/${uniqFileName}`

2.  管理员上传 template layout 介绍 thumb 的位置: 
    `/basic/layouts/`
    `/basic/templates/`

3. 公共资源位置: 
    `/public/{category}`


### Deploy in production

```bash
# install nodejs
# install npm
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
sudo apt-get install -y nodejs


# install mysql and create database and migrate(by migrate.sql)
https://www.digitalocean.com/community/tutorials/how-to-install-mysql-on-ubuntu-16-04

# install nginx 
# https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-16-04

# set config file
$ cp config/config.default.js config/config.local.js
$ vi config/config.local.js
# change config.local.js with correct params.

# Lanch
$ npm start
$ npm stop
```
