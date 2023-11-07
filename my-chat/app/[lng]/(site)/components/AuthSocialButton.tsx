import { IconType } from "react-icons";

interface AuthSocialButtonProps {
  icon: IconType;
  onClick: () => void;
}

const AuthSocialButton: React.FC<AuthSocialButtonProps> = ({
  icon: Icon,
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        inline-flex
        w-full 
        justify-center 
        rounded-md 
        bg-white 
        dark:bg-zinc-600
        px-4 
        py-2 
        text-gray-500 
        dark:text-gray-100
        shadow-sm 
        ring-1 
        ring-inset 
        ring-gray-300 
        dark:ring-gray-400
        hover:bg-gray-50 
        dark:hover:bg-zinc-500
        focus:outline-offset-0
      "
    >
      <Icon />
    </button>
  );
};

export default AuthSocialButton;
