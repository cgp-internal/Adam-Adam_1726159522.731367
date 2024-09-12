import express, { Request, Response } from 'express';
import { createVacation, getVacations, getVacation, updateVacation, deleteVacation } from './services/vacationService';

const router = express.Router();

router.post('/api/vacations', async (req: Request, res: Response) => {
  try {
    const { title, description, location, startDate, endDate } = req.body;
    const vacation = await createVacation(title, description, location, startDate, endDate);
    res.status(201).json(vacation);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create vacation' });
  }
});

router.get('/api/vacations', async (req: Request, res: Response) => {
  try {
    const vacations = await getVacations();
    res.json(vacations);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve vacations' });
  }
});

router.get('/api/vacations/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const vacation = await getVacation(id);
    if (!vacation) {
      res.status(404).json({ error: 'Vacation not found' });
    } else {
      res.json(vacation);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve vacation' });
  }
});

router.put('/api/vacations/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { title, description, location, startDate, endDate } = req.body;
    const vacation = await updateVacation(id, title, description, location, startDate, endDate);
    res.json(vacation);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update vacation' });
  }
});

router.delete('/api/vacations/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    await deleteVacation(id);
    res.status(204).json({ message: 'Vacation deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete vacation' });
  }
});

export default router;