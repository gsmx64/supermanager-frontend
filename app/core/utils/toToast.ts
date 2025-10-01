import { addToast } from "@heroui/react";
import type { ReactNode } from "react";

import { CORE_TOAST_DEFAULT_TIMEOUT } from "@/core/consts/consts";


type toToastProps = {
  description: ReactNode;
  color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger";
  icon?: ReactNode;
  title?: ReactNode;
  variant?: "solid" | "bordered" | "flat";
  radius?: "none" | "sm" | "md" | "lg" | "full";
  shorter?: boolean;
};

const toToast = ({
  description,
  color="default",
  title='',
  icon,
  variant="bordered",
  radius="sm",
  shorter=false
}: toToastProps) => {
  const timeOut = (shorter) ? CORE_TOAST_DEFAULT_TIMEOUT / 2 : CORE_TOAST_DEFAULT_TIMEOUT;

  return addToast({
    title: title,
    description: description,
    color: color || "default",
    icon: icon || null,
    variant: variant || "bordered",
    radius: radius || "sm",
    timeout: timeOut,
    shouldShowTimeoutProgress: true,
  });
};

export default toToast;