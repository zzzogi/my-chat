import { NextResponse, NextRequest } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

export async function GET(req: NextRequest) {
  try {
    const currentUser = await getCurrentUser();
    const url = new URL(req.url || "", "http://localhost:3000");
    const query = url.searchParams.get("name");

    if (!currentUser?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!query) return new NextResponse("No query", { status: 400 });

    const user = await prisma.user.findMany({
      where: {
        name: {
          startsWith: query.toString(),
          mode: "insensitive",
        },
        NOT: {
          id: currentUser.id,
        },
      },
    });

    if (!user) {
      return new NextResponse("No users found", { status: 204 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.log(error, "ERROR_MESSAGES");
    return new NextResponse("Error", { status: 500 });
  }
}
