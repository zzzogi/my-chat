import Image from "next/image";
import { ThemeToggle } from "../../components/ThemeToggle";
import AuthForm from "./components/AuthForm";
import { useTranslation } from "../../i18n";

export default async function Home({
  params: { lng },
}: {
  params: { lng: string };
}) {
  const { t } = await useTranslation(lng, "login-page");
  return (
    <div
      className="
      flex 
      min-h-full 
      flex-col 
      justify-center 
      py-12 
      sm:px-6 
      lg:px-8 
      bg-gray-100
      dark:bg-zinc-600
    "
    >
      <ThemeToggle />
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Image
          src="/images/logo.png"
          alt="My Chat Logo"
          width={48}
          height={48}
          className="mx-auto w-auto"
        />
        <h2
          className="
          mt-6
          text-center
          text-3xl
          font-bold
          tracking-tight
          text-gray-900
          dark:text-gray-100
        "
        >
          {t("title")}
        </h2>
        <AuthForm lng={lng} />
      </div>
    </div>
  );
}
