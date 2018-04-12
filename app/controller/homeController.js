'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    // console.log(this)
    // console.log(this.app.mysql.get('bairong_scores', {id: 3}))
    const {ctx} = this;

    const result = await ctx.service.userService.test();    
    this.ctx.body = 'hi, egg';
  }
}

module.exports = HomeController;
