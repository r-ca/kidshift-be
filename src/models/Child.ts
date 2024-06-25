interface ChildBaseItem {
    id: String,
    name: String,
}

interface ChildListResponse {
    list: ChildBaseItem[]
}

interface ChildResponse extends ChildBaseItem {
    // 追加プロパティ
}

interface ChildRequest extends ChildBaseItem {
    // 追加プロパティ
}

export { ChildListResponse, ChildResponse, ChildRequest }
