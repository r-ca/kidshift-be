interface HistoryBaseItem {
    id: string,
    childId: string,
    taskId: string,
    registeredAt: Date,
}

interface HistoryResponse extends HistoryBaseItem {
    // 追加プロパティ
}

interface HistoryListResponse {
    list: HistoryResponse[]
}

export { HistoryResponse, HistoryListResponse }
