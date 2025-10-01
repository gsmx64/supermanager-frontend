import EyeFilledIcon from "@/core/components/icons/EyeFilledIcon";
import EyeSlashFilledIcon from "@/core/components/icons/EyeSlashFilledIcon";
import type { EyeButtonProps } from "@/core/components/buttons/EyeButton/types/EyeButton.type";


const EyeButton = ({isVisible, setIsVisible, style, className}: EyeButtonProps) => {
  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <button
      aria-label="toggle password visibility"
      type="button"
      style={style}
      className={className ? className : "focus:outline-solid outline-transparent"}
      onClick={toggleVisibility}
    >
      {isVisible ? (
        <EyeSlashFilledIcon />
      ) : (
        <EyeFilledIcon />
      )}
    </button>
  );
};

export default EyeButton;