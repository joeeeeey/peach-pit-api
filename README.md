## Introdution
This repo is backend For peach-pit.

## 路由说明
默认认 user/ 的路由就是公共路由

### 获取数据组通用写法
见 user/layoutController getLayouts 中

### 关于 CDN 存储位置
通用前缀 /taohe/{env}/

1. 编辑页面图片的存储位置: 
    `/editPage/${role}/${roleId}${source ? ('/' + source) : ''}${sourceId ? ('/' + sourceId) : ''}/${uniqFileName}`

2.  管理员上传 template layout 介绍 thumb 的位置: 
    /basic/layouts/
    /basic/templates/

3. 公共资源位置: 
    /public/{category}    

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

### Deploy

```bash
$ npm start
$ npm stop
```

### npm scripts

- Use `npm run lint` to check code style.
- Use `npm test` to run unit test.
- Use `npm run autod` to auto detect dependencies upgrade, see [autod](https://www.npmjs.com/package/autod) for more detail.


[egg]: https://eggjs.org


## 部署

```bash
# install nodejs
# install npm
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
sudo apt-get install -y nodejs


# install mysql
https://www.digitalocean.com/community/tutorials/how-to-install-mysql-on-ubuntu-16-04

# install nginx 
# https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-16-04

```

