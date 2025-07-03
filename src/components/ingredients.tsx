type Ingredient = {
  id: string;
  component: string;
};

type IngredientesProps = {
  ingredientes: Ingredient[];
};

export default function Ingredientes({ ingredientes }: IngredientesProps) {
  return (
    <ul>
      {ingredientes.map(ing => (
        <li key={ing.id}>{ing.component}</li>
      ))}
    </ul>
  );
}