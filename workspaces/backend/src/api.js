import KoaRouter from '@koa/router';
import { aql } from 'arangojs';

function sendResponse(ctx, response, status = 200) {
  ctx.status = status;
  ctx.body = JSON.stringify(response);
  ctx.type = 'application/json';
}

const ApiRouter = new KoaRouter();

ApiRouter.use('(.*)', async (ctx, next) => {
  try {
    await next();
  } catch (e) {
    console.error(e);
    sendResponse(
      ctx,
      {
        error: e.message,
      },
      500,
    );
  }
});

ApiRouter.all('/api/test', async (ctx) => {
  sendResponse(ctx, {
    text: 'Hello, world!',
  });
});

ApiRouter.get('/api/results', async (ctx) => {
  const cursor = await ctx.db.query(aql`
    FOR results IN arangobnb
    LIMIT 10
    RETURN results
    `);

  sendResponse(ctx, await cursor.all());
});

ApiRouter.post('/api/mapResults', async (ctx) => {
  try {
    const { body } = ctx.request;
    const [north, east, south, west] = body.mapArea;
    const poly = [
      [west, north],
      [east, north],
      [east, south],
      [west, south],
      [west, north],
    ];
    const additionalCriteria = [];

    if (body.roomType && body.roomType.length) {
      additionalCriteria.push(aql`
        AND
        ANALYZER(${body.roomType} ANY IN listing.room_type, "identity")
      `);
    }

    if (body.amenities && body.amenities.length) {
      additionalCriteria.push(aql`
        AND
        ANALYZER(${body.amenities} ALL IN listing.amenities, "identity")
    `);
    }

    if (body.priceRange && body.priceRange.length) {
      additionalCriteria.push(aql`
        AND
        IN_RANGE(listing.price, ${body.priceRange[0]}, ${body.priceRange[1]}, true, true)
      `);
    }

    const cursor = await ctx.db.query(aql`
    LET listings = (
      FOR listing IN arangobnb
      SEARCH ANALYZER(GEO_CONTAINS(GEO_POLYGON(${poly}), listing.location), "geo")
      ${aql.join(additionalCriteria)}
      SORT listing.number_of_reviews DESC, listing.review_scores_rating DESC
      LIMIT 100
      RETURN listing
      )
      Let amenities = (
        FOR doc in listings
        FOR amenity in doc.amenities
        COLLECT item = amenity with COUNT into c
        SORT c DESC
        LIMIT 100
        RETURN item
        )
        RETURN {listings, amenities}
        `);

    sendResponse(ctx, await cursor.all());
  } catch (e) {
    sendResponse(e.message);
  }
});

ApiRouter.get('/api/filters', async (ctx) => {
  const cursor = await ctx.db.query(aql`
    FOR doc in arangobnb
      FOR amenity in doc.amenities
        COLLECT item = amenity with COUNT into c
        SORT c DESC
        LIMIT 20
        RETURN item
    `);

  sendResponse(ctx, await cursor.all());
});

ApiRouter.all('(.*)', async (ctx) => {
  sendResponse(ctx, { text: 'Nothing to see here' }, 404);
});

export { ApiRouter };
