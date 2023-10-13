"use client";

import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { User } from "@prisma/client";
import { CldUploadButton } from "next-cloudinary";

import Input from "../inputs/Input";
import Modal from "../modals/Modal";
import Button from "../Button";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { ThemeSelect } from "../ThemeSelect";

interface SettingsModalProps {
  isOpen?: boolean;
  onClose: () => void;
  currentUser: User;
}

const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  currentUser = null,
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
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
    },
  });

  const profileImage = watch("profileImage");

  const handleUpload = (result: any) => {
    setValue("profileImage", result.info.secure_url, {
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
      .catch(() => toast.error("Something went wrong!"))
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
              Profile
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-400">
              Edit your public information.
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
                Choose theme
              </label>
              <ThemeSelect />
            </div>

            <div className="mt-10 flex flex-col gap-y-8">
              <Input
                disabled={isLoading}
                label="Name"
                id="name"
                errors={errors}
                required
                register={register}
              />
              <Input
                disabled={isLoading}
                label="Quote"
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
                  Photo
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
                  <CldUploadButton
                    options={{ maxFiles: 1 }}
                    onUpload={handleUpload}
                    uploadPreset="zsnsmvgz"
                  >
                    <Button disabled={isLoading} secondary type="button">
                      Change
                    </Button>
                  </CldUploadButton>
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
            Cancel
          </Button>
          <Button disabled={isLoading} type="submit">
            Save
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default SettingsModal;
