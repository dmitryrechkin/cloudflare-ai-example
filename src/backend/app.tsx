import { Hono } from 'hono';
import { questionRoutes } from './routes/questionRoutes';
import { answerRoutes } from './routes/answerRoutes';
import { renderer } from './middlewares/renderer';
//import { Context } from 'hono';
//import { serveStatic } from "hono/cloudflare-pages";

type Bindings = {
	DB: D1Database;
	AI: Ai;
	VECTORIZE_INDEX: VectorizeIndex;
};

const app = new Hono<{ Bindings: Bindings }>();

app.use(renderer);

app.get('/', (c) => {
	return c.render(<div></div>, { title: 'Example JSX Form with Hono for CloudFlare Page' });
});

// @see https://github.com/cloudflare/cloudflare-docs/issues/14550
//app.use("/static/*", serveStatic());

// it is suggeted at https://developers.cloudflare.com/pages/framework-guides/deploy-a-hono-site/ but it works without it
//app.get("/static/*", async (ctx: Context) => {
//	return await ctx.env.ASSETS.fetch(ctx.req.raw);
//});

// Use the routes
app.route('/api/v1', questionRoutes);
app.route('/api/v1', answerRoutes);

export default app;