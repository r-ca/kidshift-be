import jsonwebtoken from "jsonwebtoken";
import { Role } from "@src/enums";
import { findUserById, findChildById } from "./userUtils";
import { Child, User } from "@prisma/client";

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

async function issueTokenByChildId(childId: string) {
    const child: Child = await findChildById(childId);
    if (!child) {
        throw new Error("見つかりません");
    }
    const payload = {
        sub: childId,
        role: Role.CHILD,
        home_group_id: child.home_group_id
    };

    const options = {
        expiresIn: "9999h"
    };

    return jsonwebtoken.sign(payload, "secret", options);
}

export { issueTokenByUserId, issueTokenByChildId }

