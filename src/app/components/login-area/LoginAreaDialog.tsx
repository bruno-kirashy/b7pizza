"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAuth } from "@/stores/auth";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { LoginAteaStepEmail } from "./LoginAreaStepEmail";

type Steps = "EMAIL" | "SIGNUP" | "SIGNIN";

export const LoginAreaDialog = () => {
  const auth = useAuth();

  const [step, setStep] = useState<Steps>("EMAIL");
  const [emailField, setEmailField] = useState<string>("");

  const handleStepEmail = (hasEmail: boolean, email: string) => {
    setEmailField(email);
    hasEmail ? setStep("SIGNIN") : setStep("SIGNUP");
  };

  return (
    <>
      <Dialog
        open={auth.open}
        onOpenChange={(open) => auth.setOpen(open)}
      >
        <DialogContent className="sm: max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {step !== "EMAIL" && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setStep("EMAIL")}
                >
                  <ArrowLeft className="size-4" />
                </Button>
              )}
              {step === "EMAIL" && "Login / Cadastro"}
              {step === "SIGNUP" && "Cadastro"}
              {step === "SIGNIN" && "Login"}
            </DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-4">
            {step === "EMAIL" && (
              <LoginAteaStepEmail onValidate={handleStepEmail} />
            )}
            {step === "SIGNIN" && <div>Login</div>}
            {step === "SIGNUP" && <div>Cadastro</div>}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
