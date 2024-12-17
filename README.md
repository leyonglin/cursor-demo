# 如何使用
1. 修改config/index.js中的apiKey
2. 执行命令：npm install
3. 执行命令：npm run dev


# 后端数据库
- SQLite

# 技术栈
- Next.js

# 前端设计
- **技术栈**: 使用 Next.js
- **页面结构**:
  - **登录页面**
  - **学生信息管理页面**
  - **kimi聊天页面**:

# 后端设计
- **路由设计**:
  - `/api/login`: 处理用户登录请求。
  - `/api/students`: 学生信息crud。
  - `/api/kimi`: kimi聊天接口


# 数据库设计
- **数据库**: SQLite
- **数据表**:
  - **students** 表:
    - `id`: 主键，自增
    - `name`: 学生姓名
    - `age`: 学生年龄
    - `class`: 学生班级
    - `created_at`: 创建时间
    - `updated_at`: 更新时间

# API 设计
- **登录 API**:
  - 请求方法: POST
  - 请求体: `{ username: string, password: string }`
  - 响应: `{ success: boolean, token?: string, message?: string }`

- **学生信息 API**:
  - 获取所有学生信息:
    - 请求方法: GET
    - 响应: `{ students: Array<{ id: number, name: string, age: number, class: string }> }`
  
  - 添加学生信息:
    - 请求方法: POST
    - 请求体: `{ name: string, age: number, class: string }`
    - 响应: `{ success: boolean, message?: string }`
  
  - 更新学生信息:
    - 请求方法: PUT
    - 请求体: `{ id: number, name: string, age: number, class: string }`
    - 响应: `{ success: boolean, message?: string }`
  
  - 删除学生信息:
    - 请求方法: DELETE
    - 请求体: `{ id: number }`
    - 响应: `{ success: boolean, message?: string }`