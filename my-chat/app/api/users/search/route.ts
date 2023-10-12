import { NextResponse } from "next/server";
import { NextApiRequest } from "next";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

export async function GET(req: NextApiRequest) {
  try {
    const currentUser = await getCurrentUser();
    const url = new URL(req.url || "", "http://localhost:3000");
    const query = url.searchParams.get("name");

    if (!currentUser?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!query) return [];

    const user = await prisma.user.findMany({
      where: {
        name: {
          startsWith: query.toString(),
          mode: "insensitive",
        },
      },
    });

    if (!user) {
      return [];
    }

    return NextResponse.json(user);
  } catch (error) {
    console.log(error, "ERROR_MESSAGES");
    return new NextResponse("Error", { status: 500 });
  }
}
