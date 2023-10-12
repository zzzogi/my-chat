import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

const getUserByName = async (name: string) => {
  const currentUser = await getCurrentUser();

  if (!currentUser?.email || !name) {
    return [];
  }

  try {
    const user = await prisma.user.findMany({
      where: {
        name,
      },
    });

    return user;
  } catch (error: any) {
    return [];
  }
};

export default getUserByName;
