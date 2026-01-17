export const translations = {
  en: {
    // Header
    appTitle: "My Tasks",
    appSubtitle: "Organize your life, one task at a time",

    // Stats Panel
    totalTasks: "Total Tasks",
    active: "Active",
    completed: "Completed",
    highPriority: "High Priority",
    starred: "Starred",
    overdue: "Overdue",

    // Filters
    all: "All",
    today: "Today",
    high: "High",

    // Todo Form
    todoPlaceholder: "What needs to be done?",
    descriptionPlaceholder: "Description (optional)",
    dueDate: "Due Date",
    tags: "Tags",
    addTag: "Add a tag",
    addTagButton: "Add",
    moreOptions: "More options",
    lessOptions: "Less options",
    addTodo: "Add Todo",

    // Priority
    low: "Low",
    medium: "Medium",

    // Search
    searchPlaceholder: "Search todos...",

    // Empty States
    noTodos: "No todos yet. Create one to get started!",
    noMatching: "No matching todos found",

    // Loading
    loading: "Loading...",

    // Errors
    errorLoad: "Failed to load todos. Make sure the backend is running on port 3011.",
    errorAdd: "Failed to add todo",
    errorUpdate: "Failed to update todo",
    errorDelete: "Failed to delete todo",
    errorStar: "Failed to star todo",

    // Date
    overdueWarning: "Overdue",
  },
  zh: {
    // Header
    appTitle: "我的任务",
    appSubtitle: "管理你的生活，一次一个任务",

    // Stats Panel
    totalTasks: "总任务数",
    active: "活跃",
    completed: "已完成",
    highPriority: "高优先级",
    starred: "收藏",
    overdue: "逾期",

    // Filters
    all: "全部",
    today: "今天",
    high: "高优先级",

    // Todo Form
    todoPlaceholder: "需要做什么？",
    descriptionPlaceholder: "描述（可选）",
    dueDate: "截止日期",
    tags: "标签",
    addTag: "添加标签",
    addTagButton: "添加",
    moreOptions: "更多选项",
    lessOptions: "收起选项",
    addTodo: "添加任务",

    // Priority
    low: "低",
    medium: "中",

    // Search
    searchPlaceholder: "搜索任务...",

    // Empty States
    noTodos: "还没有任务。创建一个开始吧！",
    noMatching: "没有找到匹配的任务",

    // Loading
    loading: "加载中...",

    // Errors
    errorLoad: "加载任务失败。请确保后端运行在 3011 端口。",
    errorAdd: "添加任务失败",
    errorUpdate: "更新任务失败",
    errorDelete: "删除任务失败",
    errorStar: "收藏任务失败",

    // Date
    overdueWarning: "逾期",
  }
};

export type Language = 'en' | 'zh';
export type TranslationKey = keyof typeof translations.en;
