# ✨ Modern Todo App

一个功能强大、设计现代的全栈 Todo 应用，采用 React + TypeScript 前端和 Spring Boot Java 后端架构。

## 🎯 特性亮点

### 核心功能
- ✅ **完整的 CRUD 操作** - 创建、读取、更新、删除任务
- 🎨 **现代化 UI 设计** - 使用 Tailwind CSS 打造精美界面
- 🌓 **深色模式** - 支持浅色/深色主题切换
- 📱 **响应式设计** - 完美适配桌面和移动设备

### 高级功能
- ⭐ **优先级系统** - 高/中/低三级优先级管理
- 🏷️ **标签系统** - 支持多标签分类
- 📅 **截止日期** - 设置任务截止时间，自动标记逾期
- 🔍 **智能搜索** - 全文搜索任务标题和描述
- ⭐ **收藏功能** - 标记重要任务
- 📊 **统计面板** - 实时展示任务统计数据
- 🎯 **多维度筛选** - 按状态、优先级、标签、日期筛选
- ✨ **流畅动画** - 使用 Framer Motion 实现优雅交互

### 技术特性
- 🚀 **性能优化** - 按优先级自动排序
- 💾 **本地存储** - 深色模式偏好持久化
- 🎭 **图标系统** - 使用 Lucide React 图标库
- 📆 **日期处理** - 使用 date-fns 格式化日期

## 🛠 技术栈

### 前端
- **React 18** - 现代化 UI 库
- **TypeScript** - 类型安全
- **Tailwind CSS** - 实用优先的 CSS 框架
- **Framer Motion** - 动画库
- **Lucide React** - 图标库
- **date-fns** - 日期处理库

### 后端
- **Java 17** - 编程语言
- **Spring Boot 3.2.1** - 应用框架
- **Spring Data JPA** - 数据持久化
- **H2 Database** - 内存数据库
- **Maven** - 项目管理工具

## 📁 项目结构

```
todo-app/
├── frontend/                 # React 前端
│   ├── src/
│   │   ├── components/      # React 组件
│   │   │   ├── TodoForm.tsx        # 任务创建表单
│   │   │   ├── TodoItem.tsx        # 任务项组件
│   │   │   └── StatsPanel.tsx      # 统计面板
│   │   ├── services/        # API 服务层
│   │   │   └── todoAPI.ts          # API 接口定义
│   │   ├── App.tsx          # 主应用组件
│   │   ├── index.tsx        # 入口文件
│   │   └── index.css        # 全局样式
│   ├── tailwind.config.js   # Tailwind 配置
│   └── package.json
└── backend/                  # Spring Boot 后端
    ├── src/main/java/com/example/todo/
    │   ├── controller/      # REST 控制器
    │   │   └── TodoController.java
    │   ├── model/           # 数据模型
    │   │   └── Todo.java
    │   ├── repository/      # 数据访问层
    │   │   └── TodoRepository.java
    │   ├── service/         # 业务逻辑层
    │   │   └── TodoService.java
    │   └── TodoApplication.java
    ├── src/main/resources/
    │   └── application.properties
    └── pom.xml
```

## 🚀 快速开始

### 前置要求
- Node.js 16+
- Java 17+
- Maven 3.6+

### 1. 启动后端

```bash
cd todo-app/backend
mvn spring-boot:run
```

后端将在 **http://localhost:3011** 启动

### 2. 启动前端

```bash
cd todo-app/frontend
npm install  # 首次运行需要安装依赖
npm start
```

前端将在 **http://localhost:3010** 启动并自动打开浏览器

## 📡 API 端点

### 基础端点
| 方法 | 路径 | 描述 |
|------|------|------|
| GET | `/api/todos` | 获取所有任务 |
| GET | `/api/todos?sort=priority` | 按优先级排序获取任务 |
| GET | `/api/todos/{id}` | 获取单个任务 |
| POST | `/api/todos` | 创建新任务 |
| PUT | `/api/todos/{id}` | 更新任务 |
| PATCH | `/api/todos/{id}/star` | 切换收藏状态 |
| DELETE | `/api/todos/{id}` | 删除任务 |

### 筛选端点
| 方法 | 路径 | 描述 |
|------|------|------|
| GET | `/api/todos/status/{completed}` | 按完成状态筛选 |
| GET | `/api/todos/priority/{priority}` | 按优先级筛选 (HIGH/MEDIUM/LOW) |
| GET | `/api/todos/starred` | 获取收藏的任务 |
| GET | `/api/todos/tag/{tag}` | 按标签筛选 |
| GET | `/api/todos/today` | 获取今天到期的任务 |
| GET | `/api/todos/overdue` | 获取逾期的任务 |

### 其他端点
| 方法 | 路径 | 描述 |
|------|------|------|
| GET | `/api/todos/search?q={keyword}` | 搜索任务 |
| GET | `/api/todos/tags` | 获取所有标签 |
| GET | `/api/todos/statistics` | 获取统计数据 |

## 📊 数据模型

```typescript
interface Todo {
  id?: number;
  title: string;               // 任务标题
  description: string;          // 任务描述
  completed: boolean;           // 完成状态
  priority: 'LOW' | 'MEDIUM' | 'HIGH';  // 优先级
  dueDate?: string;            // 截止日期
  tags: string[];              // 标签数组
  color?: string;              // 自定义颜色
  starred: boolean;            // 收藏状态
  createdAt?: string;          // 创建时间
  updatedAt?: string;          // 更新时间
}
```

## 🎨 UI 特性

### 优先级颜色方案
- 🔴 **高优先级** - 红色边框和背景
- 🟡 **中优先级** - 黄色边框和背景
- 🟢 **低优先级** - 绿色边框和背景

### 任务状态
- ✅ 已完成任务显示为半透明并带删除线
- ⚠️ 逾期任务显示红色警告标记
- ⭐ 收藏任务显示金色星标

### 统计卡片
- 📈 总任务数
- 🔵 活跃任务
- 🟢 已完成任务
- 🔴 高优先级任务
- ⭐ 收藏任务
- ⚠️ 逾期任务

## 🌙 深色模式

应用支持深色模式，用户偏好会自动保存到本地存储。点击右上角的太阳/月亮图标即可切换主题。

## 🔧 开发

### 前端开发
```bash
cd frontend
npm start      # 开发服务器
npm test       # 运行测试
npm run build  # 生产构建
```

### 后端开发
```bash
cd backend
mvn spring-boot:run  # 运行应用
mvn test             # 运行测试
mvn package          # 打包应用
```

## 🗄️ H2 数据库控制台

开发时可以访问 H2 数据库控制台查看数据：

**URL**: http://localhost:3011/h2-console

**连接信息**:
- JDBC URL: `jdbc:h2:mem:tododb`
- Username: `sa`
- Password: (留空)

## 📝 使用示例

### 创建任务
1. 在顶部输入框输入任务标题
2. 选择优先级（低/中/高）
3. 点击"More options"添加描述、截止日期和标签
4. 点击"Add Todo"创建任务

### 筛选任务
使用顶部的筛选按钮快速查看：
- **All** - 所有任务
- **Active** - 未完成任务
- **Completed** - 已完成任务
- **Starred** - 收藏的任务
- **High** - 高优先级任务
- **Today** - 今天到期的任务
- **Overdue** - 逾期任务

### 搜索任务
在搜索框输入关键词，实时搜索任务标题和描述。

## 🚀 部署建议

### 前端部署
- 运行 `npm run build` 生成生产版本
- 将 `build` 文件夹部署到静态托管服务（Vercel、Netlify 等）
- 确保配置正确的 API URL 环境变量

### 后端部署
- 运行 `mvn package` 打包应用
- 部署 JAR 文件到服务器或云平台
- 生产环境建议使用 MySQL/PostgreSQL 替换 H2 数据库

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT

## 🙏 致谢

本项目使用了以下优秀的开源库：
- React
- Spring Boot
- Tailwind CSS
- Framer Motion
- Lucide React
- date-fns

---

**Made with ❤️ by [Danonlylane](https://github.com/Danonlylane)**

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
