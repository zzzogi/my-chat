"use client";

import axios from "axios";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useState, useEffect } from "react";

import useDisplayUser from "@/app/hooks/useDisplayUser";
import SearchInput from "./SearchInput";
import Spinning from "./Spinning";
import UserBox from "./UserBox";
import { useTranslation } from "@/app/i18n";

interface UserListProps {
  lng: string;
}

const UserList: React.FC<UserListProps> = ({ lng }) => {
  const { members, add, gettingUser, gettingUserDone, isLoading } =
    useDisplayUser();
  const [translation, setTranslation] = useState<any>();

  useEffect(() => {
    useTranslation(lng, "user-sidebar").then((t) => {
      setTranslation(t);
    });
  }, [lng]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    gettingUser();
    setValue("name", "", { shouldValidate: true });
    axios
      .get(`/api/users/search`, {
        params: {
          name: data.name,
        },
      })
      .then((res) => {
        gettingUserDone();
        add(res.data);
      });
  };

  return (
    <aside
      className="
        fixed 
        inset-y-0 
        pb-20
        lg:pb-0
        lg:left-20 
        lg:w-80 
        lg:block
        overflow-y-auto 
        border-r 
        border-gray-200
        dark:border-gray-700
        dark:bg-zinc-800
        block w-full left-0
      "
    >
      <div className="px-5">
        <div className="flex-col">
          <div
            className="
              text-2xl 
              font-bold 
              text-neutral-800 
              py-4
              dark:text-neutral-100
            "
          >
            {translation?.t("people") || "Loading..."}
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="mb-2">
          <SearchInput
            placeholder={translation?.t("search") || "Loading..."}
            id="name"
            errors={errors}
            required={false}
            register={register}
          />
        </form>
        {members.length && !isLoading ? (
          members.map((item) => <UserBox key={item.id} data={item} lng={lng} />)
        ) : isLoading ? (
          <Spinning />
        ) : (
          <div
            className="
              text-sm
              text-center
              font-bold 
              italic
              text-gray-500 
              py-4
              dark:text-gray-400
            "
          >
            {translation?.t("try-to-search") || "Loading..."}
          </div>
        )}
      </div>
    </aside>
  );
};

export default UserList;
