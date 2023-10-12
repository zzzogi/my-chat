"use client";

import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { BsGithub, BsGoogle } from "react-icons/bs";

import Button from "@/app/components/Button";
import Input from "@/app/components/inputs/Input";
import clsx from "clsx";
import { toast } from "react-hot-toast";
import zxcvbn from "zxcvbn";
import AuthSocialButton from "./AuthSocialButton";

type Variant = "LOGIN" | "REGISTER";

const AuthForm = () => {
  const session = useSession();
  const router = useRouter();
  const [variant, setVariant] = useState<Variant>("LOGIN");
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [isTypingPassword, setIsTypingPassword] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/conversations");
    }
  }, [session?.status, router]);

  const toggleVariant = useCallback(() => {
    if (variant === "LOGIN") {
      setVariant("REGISTER");
    } else {
      setVariant("LOGIN");
    }
  }, [variant]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    if (variant === "REGISTER") {
      if (passwordStrength < 3) {
        toast.error("Password is too weak!");
        setIsLoading(false);
        return;
      }
      axios
        .post("/api/register", data)
        .then(() =>
          signIn("credentials", {
            ...data,
            redirect: false,
          })
        )
        .then((callback) => {
          if (callback?.error) {
            toast.error("Invalid credentials!");
          }

          if (callback?.ok) {
            toast.success("Account created successfully!");
            router.push("/conversations");
          }
        })
        .catch(() => toast.error("Something went wrong!"))
        .finally(() => setIsLoading(false));
    }

    if (variant === "LOGIN") {
      signIn("credentials", {
        ...data,
        redirect: false,
      })
        .then((callback) => {
          if (callback?.error) {
            toast.error("Invalid credentials!");
          }

          if (callback?.ok && !callback?.error) {
            toast.success("Logged in successfully!");
            router.push("/conversations");
          }
        })
        .finally(() => setIsLoading(false));
    }
  };

  const socialAction = (action: string) => {
    setIsLoading(true);

    signIn(action, { redirect: false })
      .then((callback) => {
        if (callback?.error) {
          toast.error("Invalid credentials!");
        }

        if (callback?.ok) {
          router.push("/conversations");
        }
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div
        className="
        bg-white
        dark:bg-zinc-700
          px-4
          py-8
          shadow
          sm:rounded-lg
          sm:px-10
        "
      >
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {variant === "REGISTER" && (
            <Input
              disabled={isLoading}
              register={register}
              errors={errors}
              required
              id="name"
              label="Name"
            />
          )}
          <Input
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            id="email"
            label="Email address"
            type="email"
          />
          <div className="relative container mx-auto mt-20">
            <Input
              disabled={isLoading}
              register={register}
              errors={errors}
              required
              id={"password"}
              label="Password"
              type={isPasswordVisible ? "text" : "password"}
              {...register(
                variant === "REGISTER" ? "new-password" : "password",
                {
                  onChange: (e: any) => {
                    const { score } = zxcvbn(e.target.value);
                    setPasswordStrength(score);
                    setIsTypingPassword(e.target.value.length > 0);
                  },
                }
              )}
            />
            <button
              className="absolute bottom-0 right-0 top-8 flex items-center px-4 text-gray-600 dark:text-gray-400"
              onClick={() => {
                setIsPasswordVisible(!isPasswordVisible);
              }}
              type="button"
            >
              {isPasswordVisible ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              )}
            </button>
          </div>
          {variant === "REGISTER" && isTypingPassword && (
            <div>
              <div className="flex justify-between gap-1">
                <div
                  className={clsx(`
                h-1
                ${
                  passwordStrength === 0
                    ? "bg-red-500"
                    : passwordStrength === 1
                    ? "bg-orange-500"
                    : passwordStrength === 2
                    ? "bg-yellow-500"
                    : "bg-green-500"
                }
                w-full
              `)}
                ></div>
                <div
                  className={clsx(`
                h-1
                ${
                  passwordStrength === 0
                    ? "bg-gray-500"
                    : passwordStrength === 1
                    ? "bg-orange-500"
                    : passwordStrength === 2
                    ? "bg-yellow-500"
                    : "bg-green-500"
                }
                w-full
              `)}
                ></div>
                <div
                  className={clsx(`
                h-1
                ${
                  passwordStrength === 0
                    ? "bg-gray-500"
                    : passwordStrength === 1
                    ? "bg-gray-500"
                    : passwordStrength === 2
                    ? "bg-yellow-500"
                    : "bg-green-500"
                }
                w-full
              `)}
                ></div>
                <div
                  className={clsx(`
                h-1
                ${
                  passwordStrength === 0
                    ? "bg-gray-500"
                    : passwordStrength === 1
                    ? "bg-gray-500"
                    : passwordStrength === 2
                    ? "bg-gray-500"
                    : "bg-green-500"
                }
                w-full
              `)}
                ></div>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {passwordStrength === 0
                  ? "Weak"
                  : passwordStrength === 1
                  ? "Medium"
                  : passwordStrength === 2
                  ? "Strong"
                  : "Super strong"}
              </div>
            </div>
          )}
          <div>
            <Button disabled={isLoading} fullWidth type="submit">
              {variant === "LOGIN" ? "Sign in" : "Register"}
            </Button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div
              className="
                absolute 
                inset-0 
                flex 
                items-center
              "
            >
              <div className="w-full border-t border-gray-300 dark:border-zinc-500" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white dark:bg-zinc-700 px-2 text-gray-500 dark:text-gray-400">
                Or continue with
              </span>
            </div>
          </div>

          <div className="mt-6 flex gap-2">
            <AuthSocialButton
              icon={BsGithub}
              onClick={() => socialAction("github")}
            />
            <AuthSocialButton
              icon={BsGoogle}
              onClick={() => socialAction("google")}
            />
          </div>
        </div>
        <div
          className="
            flex 
            gap-2 
            justify-center 
            text-sm 
            mt-6 
            px-2 
            text-gray-500
            dark:text-gray-400
          "
        >
          <div>
            {variant === "LOGIN"
              ? "New to Messenger?"
              : "Already have an account?"}
          </div>
          <div onClick={toggleVariant} className="underline cursor-pointer">
            {variant === "LOGIN" ? "Create an account" : "Login"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
