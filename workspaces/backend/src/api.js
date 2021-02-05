import KoaRouter from "koa-router";

function sendResponse(ctx, response, status = 200) {
  ctx.status = status;
  ctx.body = JSON.stringify(response);
  ctx.type = "application/json";
}

const ApiRouter = new KoaRouter();

ApiRouter.use("(.*)", async (ctx, next) => {
  console.log("Hit the backend API");

  try {
    await next();
  } catch (e) {
    sendResponse(ctx, {
      error: e.message,
    }, 500)
  }
})

ApiRouter.all("/api/test", async (ctx) => {
  sendResponse(ctx, {
    text: "Hello, world!",
  });
})

ApiRouter.all("(.*)", async (ctx) => {
  sendResponse(ctx, { text: "Nothing to see here" }, 404);
})

export { ApiRouter };
