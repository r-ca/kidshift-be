interface ChildBaseItem {
    id: string,
    name: string,
}

interface ChildDetailsResponse extends ChildBaseItem {
    // 追加プロパティ
    createdAt: Date,
    homeGroupId: string,
}

interface ChildListResponse {
    list: ChildResponse[]
}

interface ChildResponse extends ChildBaseItem {
    // 追加プロパティ
}

interface ChildRequest extends ChildBaseItem {
    // 追加プロパティ
}

interface ChildAddRequest {
    name: string
}

export { ChildListResponse, ChildResponse, ChildRequest, ChildAddRequest, ChildDetailsResponse }
