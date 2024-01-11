import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function getUsers() {
  const users = await prisma.user.create({
    data: {
      email: "d@gmail.com",
      name: "john",
    },
  });

  await prisma.post.findFirst({ where: { title: "get me" } });

  return users;
}
