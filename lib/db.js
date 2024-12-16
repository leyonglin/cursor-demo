import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// 数据库连接单例
let db = null;

export async function getDb() {
  if (db) {
    return db;
  }

  db = await open({
    filename: './database.sqlite',
    driver: sqlite3.Database
  });

  // 创建学生表
  await db.exec(`
    CREATE TABLE IF NOT EXISTS students (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      age INTEGER NOT NULL,
      class TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // 检查是否需要插入示例数据
  const count = await db.get('SELECT COUNT(*) as count FROM students');
  if (count.count === 0) {
    // 插入10条示例数据
    const sampleData = Array.from({ length: 10 }, (_, i) => ({
      name: `学生${i + 1}`,
      age: Math.floor(Math.random() * 5) + 18,
      class: `${Math.floor(Math.random() * 3) + 1}班`
    }));

    for (const student of sampleData) {
      await db.run(
        'INSERT INTO students (name, age, class) VALUES (?, ?, ?)',
        [student.name, student.age, student.class]
      );
    }
  }

  return db;
} 