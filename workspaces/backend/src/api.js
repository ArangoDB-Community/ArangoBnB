import KoaRouter from "koa-router";
import { aql } from "arangojs";

function sendResponse(ctx, response, status = 200) {
  ctx.status = status;
  ctx.body = JSON.stringify(response);
  ctx.type = "application/json";
}

const ApiRouter = new KoaRouter();

ApiRouter.get('/', home);

async function home(ctx) {
  ctx.response.body = await getResults(ctx);
}

// ApiRouter.use("(.*)", async (ctx, next) => {
//   console.log("Hit the backend API");

//   try {
//     await next();
//   } catch (e) {
//     sendResponse(ctx, {
//       error: e.message,
//     }, 500)
//   }
// })

// ApiRouter.all("/api/test", async (ctx) => {
//   sendResponse(ctx, {
//     text: "Hello, world!",
//   });
// })

// ApiRouter.all("/api/search", async (ctx) => {
//   const results = await getResults();
//   sendResponse(ctx, {
//     text: "Search the world!"
//   })
// })

// ApiRouter.all("(.*)", async (ctx) => {
//   sendResponse(ctx, { text: "Nothing to see here" }, 404);
// })

async function getResults(ctx) {
  let result = [];
  let cursor;
  try {
    cursor = await ctx.db.query(aql`
    FOR results IN listings
    LIMIT 10
    RETURN results
    `);
    for await (const c of cursor){
      console.log(c)
      result.push(c);
    }
  } catch (err) {
    console.error(err.message);
  }
  return result
}

export { ApiRouter };
