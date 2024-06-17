import jsonwebtoken from "jsonwebtoken";
import { Role } from "@src/enums";

function issueToken(payload: object) {
    return jsonwebtoken.sign(payload, "secret");
}

function issueTokenByUserId(userId: string) {
    const payload = {
        sub: userId,
        role: Role.PARENT
    };

    const options = {
        expiresIn: "9999h" // TODO: あまりにも長過ぎる
    };

    return jsonwebtoken.sign(payload, "secret", options);
}

export { issueTokenByUserId };

