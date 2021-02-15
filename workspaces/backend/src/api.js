import KoaRouter from "@koa/router";
import { aql } from "arangojs";

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

ApiRouter.get("/api/results", async (ctx) => {
  const result = [];
  const cursor = await ctx.db.query(aql`
    FOR results IN listings
    LIMIT 10
    RETURN results
    `);
  for await (const c of cursor){
    console.log(c)
    result.push(c);
  }
  sendResponse(ctx, result);
})

ApiRouter.all("(.*)", async (ctx) => {
  sendResponse(ctx, { text: "Nothing to see here" }, 404);
})

export { ApiRouter };
