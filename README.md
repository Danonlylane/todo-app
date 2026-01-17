# Todo App

一个全栈 Todo 应用，使用 React + TypeScript 前端和 Spring Boot Java 后端。

## 技术栈

### 前端
- React 18 with TypeScript
- Create React App
- CSS3
- Fetch API

### 后端
- Java 17
- Spring Boot 3.2.1
- Spring Data JPA
- H2 Database (内存数据库)
- Maven

## 项目结构

```
todo-app/
├── frontend/          # React 前端项目
│   ├── src/
│   │   ├── components/     # React 组件
│   │   ├── services/       # API 服务
│   │   └── App.tsx         # 主应用组件
│   └── package.json
└── backend/           # Spring Boot 后端项目
    ├── src/
    │   └── main/
    │       ├── java/com/example/todo/
    │       │   ├── controller/    # REST 控制器
    │       │   ├── model/         # 数据模型
    │       │   ├── repository/    # 数据访问层
    │       │   ├── service/       # 业务逻辑层
    │       │   └── TodoApplication.java
    │       └── resources/
    │           └── application.properties
    └── pom.xml
```

## 功能特性

- ✅ 创建新的 Todo 任务
- ✅ 查看所有 Todo 任务
- ✅ 标记任务为完成/未完成
- ✅ 删除任务
- ✅ 按状态筛选任务（全部/活动/已完成）
- ✅ 响应式界面设计
- ✅ 实时数据持久化

## 安装和运行

### 前置要求

- Node.js 16+ 和 npm
- Java 17+
- Maven 3.6+

### 后端启动

1. 进入后端目录：
```bash
cd todo-app/backend
```

2. 使用 Maven 运行：
```bash
mvn spring-boot:run
```

或者先编译再运行：
```bash
mvn clean package
java -jar target/todo-backend-1.0.0.jar
```

后端将在 http://localhost:3011 启动

### 前端启动

1. 进入前端目录：
```bash
cd todo-app/frontend
```

2. 安装依赖（首次运行）：
```bash
npm install
```

3. 启动开发服务器：
```bash
npm start
```

前端将在 http://localhost:3010 启动，浏览器会自动打开。

## API 接口

### 基础 URL
```
http://localhost:3011/api/todos
```

### 端点

| 方法 | 路径 | 描述 |
|------|------|------|
| GET | `/api/todos` | 获取所有 Todo |
| GET | `/api/todos/{id}` | 获取单个 Todo |
| GET | `/api/todos/status/{completed}` | 按状态获取 Todo |
| POST | `/api/todos` | 创建新 Todo |
| PUT | `/api/todos/{id}` | 更新 Todo |
| DELETE | `/api/todos/{id}` | 删除 Todo |

### 数据模型

```json
{
  "id": 1,
  "title": "Todo 标题",
  "description": "Todo 描述",
  "completed": false,
  "createdAt": "2024-01-17T10:00:00",
  "updatedAt": "2024-01-17T10:00:00"
}
```

## 配置

### 前端配置

前端配置在 `frontend/.env` 文件中：

```env
PORT=3010
REACT_APP_API_URL=http://localhost:3011
```

### 后端配置

后端配置在 `backend/src/main/resources/application.properties` 文件中：

```properties
server.port=3011
spring.datasource.url=jdbc:h2:mem:tododb
```

## 开发

### 前端开发

- 运行测试：`npm test`
- 构建生产版本：`npm run build`

### 后端开发

- 运行测试：`mvn test`
- 打包应用：`mvn package`

## H2 数据库控制台

开发时可以访问 H2 数据库控制台：

```
http://localhost:3011/h2-console
```

连接信息：
- JDBC URL: `jdbc:h2:mem:tododb`
- Username: `sa`
- Password: (留空)

## 故障排除

1. **前端无法连接后端**
   - 确保后端已启动并运行在端口 3011
   - 检查 CORS 配置是否正确

2. **端口已被占用**
   - 修改 `.env` 文件（前端）或 `application.properties`（后端）中的端口号

3. **Maven 构建失败**
   - 确保 Java 版本为 17 或更高
   - 运行 `mvn clean install` 重新构建

## 许可证

MIT
