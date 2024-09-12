import sqlite3 from 'sqlite3'; 

let db: sqlite3.Database;

const dbPath: string = './database.db';

const connect = (): void => {
    db = new sqlite3.Database(dbPath, (err: Error) => {
        if (err) {
            console.error(err.message);
        } else {
            console.log('Connected to the SQLite database.');
        }
    });
};

const close = (): void => {
    db.close((err: Error) => {
        if (err) {
            console.error(err.message);
        } else {
            console.log('Closed the database connection.');
        }
    });
};

const run = (sql: string, params: any[] = []): Promise<any[]> => {
    return new Promise((resolve, reject) => {
        db.all(sql, params, (err: Error, rows: any[]) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};

const dbObject = {
    connect,
    close,
    run
};

export { dbObject as db };