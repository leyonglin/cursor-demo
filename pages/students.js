import { useState, useEffect } from 'react';
import Layout from './components/Layout';
import styles from './students.module.css';

export default function Students() {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSidebar, setShowSidebar] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    class: ''
  });

  // 获取学生列表
  const fetchStudents = async () => {
    const res = await fetch('/api/students');
    const data = await res.json();
    setStudents(data.students);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // 处理搜索
  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.class.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 处理添加/编辑表单提交
  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = editingStudent 
      ? `/api/students/${editingStudent.id}`
      : '/api/students';
    
    const method = editingStudent ? 'PUT' : 'POST';
    
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    if (res.ok) {
      fetchStudents();
      setFormData({ name: '', age: '', class: '' });
      setEditingStudent(null);
      setShowSidebar(false);
    }
  };

  // 处理删除
  const handleDelete = async (id) => {
    if (confirm('确定要删除这条记录吗？')) {
      const res = await fetch(`/api/students/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        fetchStudents();
      }
    }
  };

  // 打开编辑侧边栏
  const handleEdit = (student) => {
    setEditingStudent(student);
    setFormData({
      name: student.name,
      age: student.age,
      class: student.class
    });
    setShowSidebar(true);
  };

  // 打开添加侧边栏
  const handleAdd = () => {
    setEditingStudent(null);
    setFormData({ name: '', age: '', class: '' });
    setShowSidebar(true);
  };

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <input
              type="text"
              placeholder="搜索学生姓名或班级..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
            <button onClick={handleAdd} className={styles.addButton}>
              添加学生
            </button>
          </div>
        </div>

        <div className={styles.content}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>姓名</th>
                <th>年龄</th>
                <th>班级</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map(student => (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>{student.name}</td>
                  <td>{student.age}</td>
                  <td>{student.class}</td>
                  <td>
                    <button onClick={() => handleEdit(student)}>
                      编辑
                    </button>
                    <button onClick={() => handleDelete(student.id)}>
                      删除
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 侧边栏表单 */}
        {showSidebar && (
          <div className={styles.formSidebar}>
            <div className={styles.formSidebarContent}>
              <h3>{editingStudent ? '编辑学生' : '添加学生'}</h3>
              <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                  <label>姓名：</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>年龄：</label>
                  <input
                    type="number"
                    value={formData.age}
                    onChange={(e) => setFormData({...formData, age: e.target.value})}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>班级：</label>
                  <input
                    type="text"
                    value={formData.class}
                    onChange={(e) => setFormData({...formData, class: e.target.value})}
                    required
                  />
                </div>
                <div className={styles.formButtons}>
                  <button type="submit">
                    {editingStudent ? '保存' : '添加'}
                  </button>
                  <button type="button" onClick={() => setShowSidebar(false)}>
                    取消
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
} 