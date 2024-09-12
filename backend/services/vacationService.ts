import { db } from "../db/database";

interface IVacation {
  id: number;
  title: string;
  description: string;
  location: string;
  startDate: Date;
  endDate: Date;
}

class VacationService {
  private db: typeof db;

  constructor() {
    this.db = db;
  }

  async createVacation(title: string, description: string, location: string, startDate: Date, endDate: Date): Promise<IVacation> {
    const sql = `INSERT INTO vacations (title, description, location, startDate, endDate) VALUES (?, ?, ?, ?, ?)`;
    const params = [title, description, location, startDate, endDate];
    const result = await this.db.run(sql, params);
    return { id: result.lastID, title, description, location, startDate, endDate };
  }

  async getVacations(): Promise<IVacation[]> {
    const sql = `SELECT * FROM vacations`;
    const result = await this.db.run(sql);
    return result.map((row: any) => ({
      id: row.id,
      title: row.title,
      description: row.description,
      location: row.location,
      startDate: row.startDate,
      endDate: row.endDate,
    }));
  }

  async getVacation(id: number): Promise<IVacation | null> {
    const sql = `SELECT * FROM vacations WHERE id = ?`;
    const params = [id];
    const result = await this.db.run(sql, params);
    if (!result.length) return null;
    return {
      id: result[0].id,
      title: result[0].title,
      description: result[0].description,
      location: result[0].location,
      startDate: result[0].startDate,
      endDate: result[0].endDate,
    };
  }

  async updateVacation(id: number, title: string, description: string, location: string, startDate: Date, endDate: Date): Promise<IVacation> {
    const sql = `UPDATE vacations SET title = ?, description = ?, location = ?, startDate = ?, endDate = ? WHERE id = ?`;
    const params = [title, description, location, startDate, endDate, id];
    await this.db.run(sql, params);
    return { id, title, description, location, startDate, endDate };
  }

  async deleteVacation(id: number): Promise<void> {
    const sql = `DELETE FROM vacations WHERE id = ?`;
    const params = [id];
    await this.db.run(sql, params);
  }
}

const vacationService = new VacationService();

export const createVacation = vacationService.createVacation.bind(vacationService);
export const getVacations = vacationService.getVacations.bind(vacationService);
export const getVacation = vacationService.getVacation.bind(vacationService);
export const updateVacation = vacationService.updateVacation.bind(vacationService);
export const deleteVacation = vacationService.deleteVacation.bind(vacationService);