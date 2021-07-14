const Koa = require("koa");
const app = new Koa();

const Route = require("koa-router");
const route = new Route();

const redis = require("redis");
const client = redis.createClient(6999, "127.0.0.1"); // 客户端实例

app.use(async (ctx) => {
  const start = new Date().getTime();

  const questPromise = new Promise((resolve, reject) => {
    client.get("hello", function (err, data) {
      // 加 1 存进去
      client.set("hello", Number(data) + 1, function (err, obj) {
        resolve(Number(data) + 1);
      });
    });
  });

  const counts = await questPromise.then((args) => {
    return args;
  });

  const end = new Date().getTime();

  ctx.body =
    "当前访问次数:" +
    counts +
    ",本次访问用时" +
    (end - start) +
    "时间:" +
    new Date();
});

app.listen(3000);
