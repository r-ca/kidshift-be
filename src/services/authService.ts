import prisma from "@src/prisma";

function registUser(email: string, password: string) {
    return prisma.user.create({ // TODO: バリデーション, ハッシュ化, その他
        data: {
            email,
            password,
            name: email,
        }
    });
}
