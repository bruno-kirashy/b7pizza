import { getAllProducts } from "@/services/product";
import { NextResponse } from "next/server";

export async function GET() {
  let pizzas = await getAllProducts();

  pizzas = pizzas.map((pizza) => ({
    ...pizza,
    image: `${process.env.NEXT_PUBLIC_IMAGE_URL}/pizzas/${pizza.image}`,
  }));

  return NextResponse.json({ pizzas });
}
