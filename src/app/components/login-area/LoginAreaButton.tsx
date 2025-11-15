"use client";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/stores/auth";
import Link from "next/link";
import { useEffect, useState } from "react";

type Props = {
  initialState: boolean;
};
export const LoginAreaButton = ({ initialState }: Props) => {
  const auth = useAuth();
  const [authState, setAuthState] = useState<boolean>(initialState);

  useEffect(() => {
    setAuthState(auth.token ? true : false);
  }, [authState]);

  const handleLogout = () => {
    auth.setToken(null);
  };

  if (authState) {
    return (
      <>
        <Link href="/pedidos">
          <Button>Meus Pedidos</Button>
        </Link>
        <Button onClick={handleLogout}>Sair</Button>
      </>
    );
  }

  if (!authState) {
    return <Button onClick={() => auth.setOpen(true)}>Login / Cadastro</Button>;
  }
};
