"use client";

import { CustomInput } from "../layout/CustomInput";
import { useState } from "react";
import { Button } from "@/components/ui/button";

type Props = {
  onValidate: (hasEmail: boolean, email: string) => void;
};

export const LoginAteaStepEmail = ({ onValidate }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<any>(null);
  const [emailField, setEmailField] = useState<string>("");

  const handleButton = async () => {};

  return (
    <>
      <div>
        <p className="mb-2">Digite seu email</p>
        <CustomInput
          name="email"
          error={errors}
          disabled={loading}
          type="email"
          value={emailField}
          onChange={(e) => setEmailField(e.target.value)}
        />
      </div>

      <Button
        disabled={loading}
        onClick={handleButton}
        className="cursor-pointer"
      >
        Continuar
      </Button>
    </>
  );
};
