interface TaskBaseItem {
    id: string,
    name: string,
    iconEmoji?: string,
    bgColor?: string,
    reward: number
}

interface TaskResponse extends TaskBaseItem {
    // 追加プロパティ
    attachedChlidren: String[]
}

interface TaskListResponse {
    list: TaskBaseItem[]
}

interface TaskRequest extends TaskBaseItem {
    // 追加プロパティ
}

export { TaskResponse, TaskRequest, TaskListResponse }
