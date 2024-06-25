interface TaskBaseItem {
    id: String,
    name: String,
    iconEmoji: String,
    bgColor: String,
    reward: number
}

interface TaskResponse extends TaskBaseItem {
    // 追加プロパティ
    attachedChlidren: String[]
}

interface TaskRequest extends TaskBaseItem {
    // 追加プロパティ
}

export { TaskResponse, TaskRequest }
