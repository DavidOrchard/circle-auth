import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  success: boolean;
};

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  switch (req.method) {
    case "POST":
      const user = await prisma.user.findFirst({
        where: {
          email: req.body.email,
        },
      });
      if (user) {
        const result = await bcrypt.compare(req.body.password, user.password);
        res.status(200).json({
          success: result,
        });
        return;
      }
      res.status(400).end(`User with email ${req.body.email} not found`);
      break;
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
