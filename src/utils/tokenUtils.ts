import jsonwebtoken from "jsonwebtoken";
import { Role } from "@src/enums";
import { findUserById } from "./userUtils";
import { User } from "@prisma/client";

function issueToken(payload: object) {
    return jsonwebtoken.sign(payload, "secret");
}

async function issueTokenByUserId(userId: string) {
    const user: User = await findUserById(userId);
    if (!user) {
        throw new Error("ユーザが見つかりません");
    }
    const payload = {
        sub: userId,
        role: Role.PARENT,
        home_group_id: user.home_group_id
    };

    const options = {
        expiresIn: "9999h" // TODO: あまりにも長過ぎる
    };

    return jsonwebtoken.sign(payload, "secret", options);
}

export { issueTokenByUserId };

