# 学生信息后台管理系统

## 项目作用
学生信息后台管理系统

## 项目功能
- 登录
- 学生信息的增删查改

## 后端数据库
- SQLite

## 技术栈
- Next.js

## 前端设计
- **技术栈**: 使用 Next.js
- **页面结构**:
  - **登录页面**: 用户输入用户名和密码进行登录。
  - **学生信息管理页面**:
    - 列表展示所有学生信息（姓名、年龄、班级等）。
    - 增加学生信息的表单。
    - 编辑学生信息的表单。
    - 删除学生信息的功能。
  - **404 页面**: 处理未找到的页面。

## 后端设计
- **框架**: 使用 Node.js 和 Express.js
- **路由设计**:
  - `/api/login`: 处理用户登录请求。
  - `/api/students`: 
    - `GET`: 获取所有学生信息。
    - `POST`: 添加新学生信息。
    - `PUT`: 更新学生信息。
    - `DELETE`: 删除学生信息。

## 数据库设计
- **数据库**: SQLite
- **数据表**:
  - **students** 表:
    - `id`: 主键，自增
    - `name`: 学生姓名
    - `age`: 学生年龄
    - `class`: 学生班级
    - `created_at`: 创建时间
    - `updated_at`: 更新时间

## API 设计
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