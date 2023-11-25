"use client";

import { HiPaperAirplane, HiPhoto } from "react-icons/hi2";
import MessageInput from "./MessageInput";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { CldUploadWidget } from "next-cloudinary";
import useConversation from "@/app/hooks/useConversation";
import Button from "@/app/components/Button";

const Form = () => {
  const { conversationId } = useConversation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      message: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setValue("message", "", { shouldValidate: true });
    axios.post("/api/messages", {
      ...data,
      conversationId: conversationId,
    });
  };

  const handleUpload = (result: any) => {
    axios.post("/api/messages", {
      image: result.info.secure_url,
      conversationId: conversationId,
    });
  };

  return (
    <div
      className="
        py-4 
        px-4 
        bg-white 
        dark:bg-zinc-900
        border-t 
        dark:border-zinc-500
        flex 
        items-center 
        gap-2 
        lg:gap-4 
        w-full
      "
    >
      <CldUploadWidget
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!}
        onUpload={handleUpload}
        options={{
          cropping: true,
          sources: ["local"],
          maxFiles: 10,
          maxFileSize: 25000000,
          clientAllowedFormats: [
            "images",
            "png",
            "jpeg",
            "jpg",
            "video",
            "gif",
          ],
        }}
      >
        {({ open }) => {
          function handleOnClick() {
            open();
          }
          return (
            <Button
              // disabled={isLoading}
              secondary
              type="button"
              onClick={handleOnClick}
            >
              <HiPhoto size={30} className="text-sky-500 dark:text-sky-400" />
            </Button>
          );
        }}
      </CldUploadWidget>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center gap-2 lg:gap-4 w-full"
      >
        <MessageInput
          id="message"
          type="text"
          register={register}
          errors={errors}
          required
          placeholder="Aa"
        />
        <button
          type="submit"
          className="
            rounded-full 
            p-2 
            bg-sky-500 
            dark:bg-sky-400
            cursor-pointer 
            hover:bg-sky-600 
            dark:hover:bg-sky-500
            transition
          "
        >
          <HiPaperAirplane
            size={18}
            className="text-white dark:text-gray-900"
          />
        </button>
      </form>
    </div>
  );
};

export default Form;
