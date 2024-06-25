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

interface TaskAddRequest extends TaskBaseItem {
    // 追加プロパティ
    attachedChlidren?: String[] // タスク追加時にattachするかは任意
}

export { TaskResponse, TaskAddRequest, TaskListResponse }
