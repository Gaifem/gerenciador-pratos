import { useEffect, useState } from "react";
import Ingredientes from "../src/components/ingredients";

type Ingredient = { id: string; component: string };
type Dish = {
  id: string;
  name: string;
  value: string;
  cost: string;
  ingredients: Ingredient[];
};

export default function Cardapio() {
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch("https://calculachef.vercel.app/api/dishes/basic-info")
      .then(res => res.json())
      .then(setDishes)
      .catch(() => setError("Erro ao carregar cardápio."))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  if (selectedDish) {
    return (
      <div style={{ fontFamily: "Arial, sans-serif", margin: "2rem" }}>
        <button onClick={() => setSelectedDish(null)}>← Voltar ao Cardápio</button>
        <h1>{selectedDish.name}</h1>
        <p>
          <strong>Preço de venda:</strong> R$ {selectedDish.value}
        </p>
        <p>
          <strong>Custo:</strong> R$ {selectedDish.cost}
        </p>
        <h3>Ingredientes:</h3>
        <Ingredientes ingredientes={selectedDish.ingredients} />
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "Arial, sans-serif", margin: "2rem" }}>
      <h1>Cardápio</h1>
      {dishes.map(dish => (
        <button
          key={dish.id}
          style={{ margin: "0.5rem", padding: "0.5rem 1rem" }}
          onClick={() => setSelectedDish(dish)}
        >
          {dish.name}
        </button>
      ))}
    </div>
  );
}