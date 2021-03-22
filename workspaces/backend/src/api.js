import KoaRouter from '@koa/router';
import { aql } from 'arangojs';

const ApiRouter = new KoaRouter();

ApiRouter.use('(.*)', async (ctx, next) => {
  ctx.sendResponse = (response, status = 200) => {
    ctx.status = status;
    ctx.body = JSON.stringify(response);
    ctx.type = 'application/json';
  };
  try {
    await next();
  } catch (e) {
    console.error(e);
    ctx.sendResponse({ error: e.message }, 500);
  }
});

ApiRouter.all('/api/test', async (ctx) => {
  ctx.sendResponse({
    text: 'Hello, world!',
  });
});

ApiRouter.all('/api/neighborhood/search', async (ctx) => {
  const { query } = ctx.query;
  const cursor = await ctx.db.query(aql`
    LET params = TOKENS(${query}, "text_en")
    FOR doc in arangobnb
      SEARCH ANALYZER(STARTS_WITH(doc.properties.neighborhood, params, LENGTH(params)), "text_en")
      SORT BM25(doc) desc
      limit 5
      let results = FIRST(
        FOR listing IN arangobnb
          SEARCH ANALYZER(GEO_CONTAINS(doc.geometry, listing.location), "geo")
          collect with count into total
        return total
      )
      return MERGE(doc, { results })
  `);

  ctx.sendResponse(await cursor.all());
});

ApiRouter.all('/api/neighborhood', async (ctx) => {
  const { lat, lng } = ctx.query;
  const cursor = await ctx.db.query(aql`
    FOR neighborhood in arangobnb
      SEARCH ANALYZER(GEO_CONTAINS(neighborhood.geometry, ${[parseFloat(lng), parseFloat(lat)]}), "geo")
      LIMIT 1
      let results = FIRST(
        FOR listing IN arangobnb
          SEARCH ANALYZER(GEO_CONTAINS(neighborhood.geometry, listing.location), "geo")
          collect with count into total
        return total
      )
    return MERGE(neighborhood, { results })
  `);

  const [result] = await cursor.all();

  ctx.sendResponse(result);
});

ApiRouter.get('/api/results', async (ctx) => {
  const cursor = await ctx.db.query(aql`
    FOR results IN arangobnb
    LIMIT 10
    RETURN results
    `);

  ctx.sendResponse(await cursor.all());
});

ApiRouter.post('/api/mapResults', async (ctx) => {
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

  ctx.sendResponse(await cursor.all());
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

  ctx.sendResponse(await cursor.all());
});

ApiRouter.all('(.*)', async (ctx) => {
  ctx.sendResponse({ text: 'Nothing to see here' }, 404);
});

export { ApiRouter };
