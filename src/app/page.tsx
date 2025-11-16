export const dynamic = "force-dynamic";
import { PizzaList } from "./components/home/PizzaList";
import { Header } from "./components/layout/Header";
import { api } from "@/lib/axios";

const App = async () => {
  const pizzaReq = await api.get("/pizzas");
  const pizzas = pizzaReq.data.pizzas ?? [];
  return (
    <>
      <Header />
      <main className="container mx-auto mb-10">
        <PizzaList pizzas={pizzas} />
      </main>
    </>
  );
};

export default App;
