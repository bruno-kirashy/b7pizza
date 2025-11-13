"use client";
import { Button } from "@/components/ui/button";
import { useCart } from "@/stores/cart";

export const CartButton = () => {
  const cart = useCart();

  return (
    <Button
      onClick={() => {
        cart.setOpen(true);
      }}
    >
      Carrinho
    </Button>
  );
};
