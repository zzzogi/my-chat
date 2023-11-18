"use client";

import Button from "@/app/components/Button";
import Modal from "@/app/components/modals/Modal";
import { useTranslation } from "@/app/i18n";
import { Dialog } from "@headlessui/react";
import React, { useEffect, useState } from "react";
import { FiAlertTriangle } from "react-icons/fi";

interface ConfirmChangeLanguageProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  isLoading?: boolean;
  lng: string;
}

const ConfirmChangeLanguageModal: React.FC<ConfirmChangeLanguageProps> = ({
  isOpen,
  onClose,
  onSubmit,
  isLoading,
  lng,
}) => {
  const [translation, setTranslation] = useState<any>();

  useEffect(() => {
    useTranslation(lng, "confirm-modal").then((t) => {
      setTranslation(t);
    });
  }, [lng]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="sm:flex sm:items-start">
        <div
          className="
            mx-auto 
            flex 
            h-12 
            w-12 
            flex-shrink-0 
            items-center 
            justify-center 
            rounded-full 
            bg-red-100 
            dark:bg-red-900
            sm:mx-0 
            sm:h-10 
            sm:w-10
          "
        >
          <FiAlertTriangle
            className="h-6 w-6 text-red-600 dark:text-red-400"
            aria-hidden="true"
          />
        </div>
        <div
          className="
            mt-3 
            text-center 
            sm:ml-4 
            sm:mt-0 
            sm:text-left
          "
        >
          <Dialog.Title
            as="h3"
            className="text-base font-semibold leading-6 text-gray-900 dark:text-gray-100"
          >
            {translation?.t("change-language") || "Loading..."}
          </Dialog.Title>
          <div className="mt-2">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {translation?.t("are-you-sure-language") || "Loading..."}
            </p>
          </div>
        </div>
      </div>
      <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse flex justify-center">
        <Button disabled={isLoading} danger onClick={onSubmit}>
          {translation?.t("yes") || "Loading..."}
        </Button>
        <Button disabled={isLoading} secondary onClick={onClose}>
          {translation?.t("cancel") || "Loading..."}
        </Button>
      </div>
    </Modal>
  );
};

export default ConfirmChangeLanguageModal;
