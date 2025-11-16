"use client";

import { useAuth } from "@/stores/auth";
import { use, useState } from "react";
import * as z from "zod";
import { CustomInput } from "../layout/CustomInput";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/axios";

const schema = z
  .object({
    name: z.string().min(2, "Campo obrigatório"),
    email: z.email("E-mail inválido"),
    password: z.string().min(2, "Campo obrigatório"),
    passwordConfirm: z.string().min(2, "Campo obrigatório"),
  })
  .refine((data: any) => data.password === data.passwordConfirm, {
    message: "Senhas não batem.",
    path: ["passwordConfirm"],
  });

type Props = {
  email: string;
};

export const LoginAreaStepSignup = ({ email }: Props) => {
  const auth = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<any>(null);

  const [nameField, setNameField] = useState<string>("");
  const [emailField, setEmailField] = useState<string>(email);
  const [passwordField, setPasswordField] = useState<string>("");
  const [passwordConfirmField, setPasswordConfirmField] = useState<string>("");

  const handleButton = async () => {
    setErrors(null);
    const validData = schema.safeParse({
      name: nameField,
      email: emailField,
      password: passwordField,
      passwordConfirm: passwordConfirmField,
    });
    if (!validData.success) {
      setErrors(validData.error.flatten((issue) => issue.message).fieldErrors);
      return false;
    }

    try {
      setLoading(true);
      const signupReq = await api.post("/auth/signup", {
        name: validData.data.name,
        email: validData.data.email,
        password: validData.data.password,
      });
      setLoading(false);
      if (!signupReq.data.token) {
        alert(signupReq.data.error);
      } else {
        auth.setToken(signupReq.data.token);
        auth.setOpen(false);
      }
    } catch {
      setLoading(false);
    }
  };

  return (
    <>
      <div>
        <p className="mb-2">Digite seu nome</p>
        <CustomInput
          name="name"
          error={errors}
          disabled={loading}
          type="text"
          value={nameField}
          onChange={(e) => setNameField(e.target.value)}
          autoFocus
        />
      </div>
      <div>
        <p className="mb-2">Digite seu e-mail</p>
        <CustomInput
          name="e-mail"
          error={errors}
          disabled={loading}
          type="text"
          value={emailField}
          onChange={(e) => setEmailField(e.target.value)}
        />
      </div>
      <div>
        <p className="mb-2">Digite sua senha</p>
        <CustomInput
          name="password"
          error={errors}
          disabled={loading}
          type="password"
          value={passwordField}
          onChange={(e) => setPasswordField(e.target.value)}
        />
      </div>
      <div>
        <p className="mb-2">Digite novamente sua senha</p>
        <CustomInput
          name="passwordConfirm"
          error={errors}
          disabled={loading}
          type="password"
          value={passwordConfirmField}
          onChange={(e) => setPasswordConfirmField(e.target.value)}
        />
      </div>
      <Button
        disabled={loading}
        onClick={handleButton}
      >
        Continuar
      </Button>
    </>
  );
};
