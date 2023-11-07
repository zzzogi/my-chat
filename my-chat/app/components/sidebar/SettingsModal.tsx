"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { User } from "@prisma/client";
import { CldUploadButton, CldUploadWidget } from "next-cloudinary";

import Input from "../inputs/Input";
import Modal from "../modals/Modal";
import Button from "../Button";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { ThemeSelect } from "../ThemeSelect";
import { useTranslation } from "@/app/i18n";

interface SettingsModalProps {
  isOpen?: boolean;
  onClose: () => void;
  currentUser: User;
  lng: string;
}

const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  currentUser = null,
  lng,
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [translation, setTranslation] = useState<any>();

  useEffect(() => {
    useTranslation(lng, "setting-modal").then((t) => {
      setTranslation(t);
    });
  }, [lng]);

  const {
    getValues,
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: currentUser?.name,
      profileImage: currentUser?.profileImage,
      quote: currentUser?.quote,
      images: currentUser?.images,
    },
  });

  const profileImage = watch("profileImage");
  const highlightPhotos = watch("images");

  const handleUploadProfileImage = (result: any) => {
    setValue("profileImage", result.info.secure_url, {
      shouldValidate: true,
    });
  };

  const handleUploadHighlightPhotos = (result: any) => {
    const currentImages = getValues("images") || [];
    const newImageUrl = result.info.secure_url;

    const updatedImages = [...currentImages, newImageUrl];

    setValue("images", updatedImages, {
      shouldValidate: true,
    });
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post("/api/settings", data)
      .then(() => {
        router.refresh();
        onClose();
      })
      .catch(() => toast.error(translation?.t("something-wrong") || ""))
      .finally(() => setIsLoading(false));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12 dark:border-gray-100/10">
            <h2
              className="
                text-base 
                font-semibold 
                leading-7 
                text-gray-900
                dark:text-gray-100
              "
            >
              {translation?.t("profile") || ""}
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-400">
              {translation?.t("edit-your-info") || ""}
            </p>

            <div className="mt-10 flex flex-col gap-y-2">
              <label
                htmlFor="theme"
                className="
                    block 
                    text-sm 
                    font-medium 
                    leading-6 
                    text-gray-900
                    dark:text-gray-100
                  "
              >
                {translation?.t("choose-theme") || ""}
              </label>
              <ThemeSelect lng={lng} />
            </div>

            <div className="mt-10 flex flex-col gap-y-8">
              <Input
                disabled={isLoading}
                label={translation?.t("name") || ""}
                id="name"
                errors={errors}
                required
                register={register}
              />
              <Input
                disabled={isLoading}
                label={translation?.t("quote") || ""}
                id="quote"
                errors={errors}
                register={register}
              />
              <div>
                <label
                  htmlFor="photo"
                  className="
                    block 
                    text-sm 
                    font-medium 
                    leading-6 
                    text-gray-900
                    dark:text-gray-100
                  "
                >
                  {translation?.t("photo") || ""}
                </label>
                <div className="mt-2 flex items-center gap-x-3">
                  <Image
                    width="48"
                    height="48"
                    className={profileImage ? "object-cover" : "rounded-full"}
                    src={
                      profileImage ||
                      currentUser?.profileImage ||
                      "/images/placeholder.jpg"
                    }
                    alt="Avatar"
                  />
                  <CldUploadWidget
                    uploadPreset="zsnsmvgz"
                    onUpload={handleUploadProfileImage}
                    options={{
                      cropping: true,
                      sources: ["local"],
                      maxFiles: 1,
                      maxFileSize: 2000000,
                      clientAllowedFormats: ["images", "png", "jpeg", "jpg"],
                    }}
                  >
                    {({ open }) => {
                      function handleOnClick() {
                        open();
                      }
                      return (
                        <Button
                          disabled={isLoading}
                          secondary
                          type="button"
                          onClick={handleOnClick}
                        >
                          {translation?.t("change-photo") || ""}
                        </Button>
                      );
                    }}
                  </CldUploadWidget>
                </div>
              </div>
              <div>
                <label
                  htmlFor="photo"
                  className="
                    block 
                    text-sm 
                    font-medium 
                    leading-6 
                    text-gray-900
                    dark:text-gray-100
                  "
                >
                  {translation?.t("highlight-photos") || ""}
                </label>
                <div className="mt-2 flex items-center gap-x-3">
                  {highlightPhotos?.map((photo: string, index: number) => (
                    <Image
                      key={index}
                      width="48"
                      height="48"
                      className="object-cover"
                      src={photo}
                      alt={`Highlight photo ${index}`}
                    />
                  ))}
                  <CldUploadWidget
                    uploadPreset="zsnsmvgz"
                    onUpload={handleUploadHighlightPhotos}
                    options={{
                      multiple: true,
                      sources: ["local"],
                      maxFiles: 6,
                      maxFileSize: 2000000,
                      clientAllowedFormats: ["images", "png", "jpeg", "jpg"],
                    }}
                  >
                    {({ open }) => {
                      function handleOnClick() {
                        open();
                      }
                      return (
                        <Button
                          disabled={isLoading}
                          secondary
                          type="button"
                          onClick={handleOnClick}
                        >
                          <div className="w-6 h-6 flex items-center justify-center">
                            <svg
                              className="w-4 h-4 text-gray-400"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                              />
                            </svg>
                          </div>
                        </Button>
                      );
                    }}
                  </CldUploadWidget>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="
            mt-6 
            flex 
            items-center 
            justify-end 
            gap-x-6
          "
        >
          <Button disabled={isLoading} secondary onClick={onClose}>
            {translation?.t("cancel") || ""}
          </Button>
          <Button disabled={isLoading} type="submit">
            {translation?.t("save") || ""}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default SettingsModal;
