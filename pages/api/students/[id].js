import { getDb } from '../../../lib/db';

export default async function handler(req, res) {
  const db = await getDb();
  const { id } = req.query;

  switch (req.method) {
    case 'PUT':
      try {
        const { name, age, class: className } = req.body;
        await db.run(
          'UPDATE students SET name = ?, age = ?, class = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
          [name, age, className, id]
        );
        res.json({ success: true });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
      break;

    case 'DELETE':
      try {
        await db.run('DELETE FROM students WHERE id = ?', [id]);
        res.json({ success: true });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
      break;

    default:
      res.status(405).json({ error: 'Method not allowed' });
  }
} 