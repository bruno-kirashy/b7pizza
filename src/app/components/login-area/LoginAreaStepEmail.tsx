"use client";

import { CustomInput } from "../layout/CustomInput";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import z from "zod";
import { api } from "@/lib/axios";

const schema = z.object({
  email: z.email({ message: "E-mail inválido" }),
});

type Props = {
  onValidate: (hasEmail: boolean, email: string) => void;
};

export const LoginAreaStepEmail = ({ onValidate }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<any>(null);
  const [emailField, setEmailField] = useState<string>("");

  const handleButton = async () => {
    setErrors(null);
    const validData = schema.safeParse({ email: emailField });
    if (!validData.success) {
      setErrors(validData.error.flatten((issue) => issue.message).fieldErrors);
      return false;
    }

    try {
      setLoading(true);

      const emailReq = await api.post("/auth/validate_email", {
        email: validData.data.email,
      });

      setLoading(false);

      onValidate(emailReq.data.exists ? true : false, validData.data.email);
    } catch (err) {
      setLoading(false);
    }
  };

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
