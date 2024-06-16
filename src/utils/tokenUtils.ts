import jsonwebtoken from "jsonwebtoken";

function issueToken(payload: object) {
    return jsonwebtoken.sign(payload, "secret");
}

function issueTokenByUserId(userId: string) {
    return issueToken({ userId });
}

export { issueTokenByUserId };

