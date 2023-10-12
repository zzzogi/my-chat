"use client";

import { User } from "@prisma/client";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";

import UserBox from "./UserBox";
import SearchInput from "./SearchInput";
import useDisplayUser from "@/app/hooks/useDisplayUser";

const UserList: React.FC = () => {
  const { members, add } = useDisplayUser();
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
    setValue("name", "", { shouldValidate: true });
    axios
      .get(`/api/users/search`, {
        params: {
          name: data.name,
        },
      })
      .then((res) => {
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
        dark:border-zinc-800
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
            People
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="mb-2">
          <SearchInput
            placeholder="Search"
            id="name"
            errors={errors}
            required={false}
            register={register}
          />
        </form>
        {members.length ? (
          members.map((item) => <UserBox key={item.id} data={item} />)
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
            Try searching for someone
          </div>
        )}
      </div>
    </aside>
  );
};

export default UserList;
