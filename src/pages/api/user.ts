import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  email: string;
  firstname: string;
  lastname: string;
};

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  switch (req.method) {
    case "GET":
      let user = await prisma.user.findFirst({
        where: {
          email: req.body.email,
        },
      });
      if (user) {
        res.status(200).json({
          email: user.email,
          firstname: user.firstname,
          lastname: user.lastname,
        });
      }
      res.status(400).end(`User with email ${req.body.email} not found`);
      break;
    case "POST":
      const pwd = await bcrypt.hash(req.body.password, 10);
      const newUser = await prisma.user.create({
        data: {
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          email: req.body.email,
          password: pwd,
        },
      });
      res.status(200).json({
        email: newUser.email,
        firstname: newUser.firstname,
        lastname: newUser.lastname,
      });
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
