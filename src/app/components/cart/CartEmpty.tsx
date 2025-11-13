"use client";
import { Button } from "@/components/ui/button";
import { useCart } from "@/stores/cart";

export const CartEmpty = () => {
  const { setOpen } = useCart();
  return (
    <div className="my-10 text-center">
      <p className="mb-4">Carrinho Vazio.</p>
      <Button
        className="cursor-pointer"
        onClick={() => setOpen(false)}
      >
        Fechar
      </Button>
    </div>
  );
};
