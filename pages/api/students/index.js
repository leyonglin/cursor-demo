import { getDb } from '../../../lib/db';

export default async function handler(req, res) {
  const db = await getDb();

  switch (req.method) {
    case 'GET':
      try {
        const students = await db.all('SELECT * FROM students ORDER BY id DESC');
        res.json({ students });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
      break;

    case 'POST':
      try {
        const { name, age, class: className } = req.body;
        const result = await db.run(
          'INSERT INTO students (name, age, class) VALUES (?, ?, ?)',
          [name, age, className]
        );
        res.json({ id: result.lastID });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
      break;

    default:
      res.status(405).json({ error: 'Method not allowed' });
  }
} 