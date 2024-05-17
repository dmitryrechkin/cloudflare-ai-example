import { Hono } from 'hono';
import { questionRoutes } from './routes/questionRoutes';
import { answerRoutes } from './routes/answerRoutes';
import { renderer } from './middlewares/renderer';

const app = new Hono();

app.use(renderer);

app.get('/', (c) => {
	return c.render(<div></div>, { title: 'Example JSX Form with Hono for CloudFlare Page' });
});

// it is suggeted at https://developers.cloudflare.com/pages/framework-guides/deploy-a-hono-site/ but it works without it
//app.get("/static/*", async (ctx: Context) => {
//	return await ctx.env.ASSETS.fetch(ctx.req.raw);
//});

// Use the routes
app.route('/api/v1', questionRoutes);
app.route('/api/v1', answerRoutes);

export default app;