import { Input } from "@/components/ui/input";
import { checkFieldError } from "@/lib/utils";
import { ComponentProps } from "react";

type Props = ComponentProps<"input"> & {
  name: string;
  error: any;
};

export const CustomInput = (props: Props) => {
  const error = checkFieldError(props.name, props.error);
  return (
    <>
      <Input
        {...props}
        className={`${error ? "border border-red-800" : ""}`}
      />

      {error && <div className="m-1 text-sm text-red-800">{error}</div>}
    </>
  );
};
