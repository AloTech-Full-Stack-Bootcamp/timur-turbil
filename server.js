/* const fs = require('fs')
var data = { "name": "Employee 1 Name", "salary": 2000 };

fs.writeFile('/Users/timur/Desktop/basic/nodejs/createServerWithHttp/odev/employees.json', JSON.stringify(data), err => {
    if (err) {
        console.log(err)
        return
    }
    console.log("yazdı")
})

fs.readFile('/Users/timur/Desktop/basic/nodejs/createServerWithHttp/odev/employees.json', 'utf8', (err, data) => {
    if (err) {
        console.error(err)
        return
    }
    console.log(data)
})
fs.unlink('/Users/timur/Desktop/basic/nodejs/createServerWithHttp/odev/employees.json', function (err) {
    if (err) throw err;
    console.log('File deleted!');
});
 */


const Koa = require('koa');
var bodyParser = require('koa-bodyparser');
var Router = require('koa-router');
const app = new Koa();
var router = new Router();
app.use(bodyParser());

/* app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.set('X-Response-Time', `${ms}ms`)
}); */

app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.body = `Method olarak ${ctx.method} kullanıldı. İstek atılan Url = ${ctx.url}. Ve ${ms} milisaniye'de sayfa yüklendi.`
});

router.get("/", (ctx, next) => {
    /* ctx.body = 'Hello World!'; */
}).get("/users", (ctx, next) => {
    /*  ctx.body = 'Users'; */
})

app
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(3000);



