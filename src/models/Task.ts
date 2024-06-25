interface TaskBaseItem {
    id: String,
    name: String,
    iconEmoji: String,
    bgColor: String,
    reward: number
    attached: String[]
}

interface TaskResponse extends TaskBaseItem {
    // 追加プロパティ
}

interface TaskRequest extends TaskBaseItem {
    // 追加プロパティ
}

export { TaskResponse, TaskRequest }
