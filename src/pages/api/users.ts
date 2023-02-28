import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

type User = {
  firstname: string;
  lastname: string;
  email: string;
};

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User[]>
) {
  const users = await prisma.user.findMany();
  res.status(200).json(
    users.map((u) => ({
      firstname: u.firstname,
      lastname: u.lastname,
      email: u.email,
    }))
  );
}
