import { Hono } from 'hono';
import { questionRoutes } from './routes/questionRoutes';
import { answerRoutes } from './routes/answerRoutes';
import { renderer } from './middlewares/renderer';

const app = new Hono();

app.use(renderer);

app.get('/', (c) => {
  return c.render(<div></div>, { title: 'Example JSX Form with Hono for CloudFlare Page' });
});

// Use the routes
app.route('/api/v1', questionRoutes);
app.route('/api/v1', answerRoutes);

export default app;