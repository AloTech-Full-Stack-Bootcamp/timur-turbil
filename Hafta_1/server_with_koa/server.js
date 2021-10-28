const Koa = require('koa');
var bodyParser = require('koa-bodyparser');
var Router = require('koa-router');
const app = new Koa();
var router = new Router();
app.use(bodyParser());


app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.body = `${ctx.body}. Method olarak ${ctx.method} kullanıldı. İstek atılan Url = ${ctx.url}. Ve ${ms} milisaniye'de sayfa yüklendi.`
});

router.get("/", (ctx, next) => {
    ctx.body = "Girilebilecek Adresler; /users, /books"
}).get("/users", (ctx, next) => {
    ctx.body = "Girilebilecek Adresler; /users, /books"
}).get("/books", (ctx, next) => {
    ctx.body = "Girilebilecek Adresler; /users, /books"
})

app
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(3000);
