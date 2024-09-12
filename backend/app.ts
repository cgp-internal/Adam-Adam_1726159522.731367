import express, { Request, Response, NextFunction } from 'express';
import router from './api/vacations';
import authMiddleware from './middlewares/authMiddleware';

const app = express();
app.use(express.json());

app.use('/api/vacations', authMiddleware, router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});