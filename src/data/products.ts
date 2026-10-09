import type { Product } from "../types";

export const products: Product[] = [
  {
    id: "frango-colorido",
    name: "Frango colorido",
    description: "Frango grelhado, arroz soltinho e legumes da estação.",
    category: "Marmitas",
    price: 24.9,
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=85",
    imageAlt: "Bowl colorido com folhas, legumes e grãos",
    tag: "Queridinha",
  },
  {
    id: "carne-caseira",
    name: "Carne de casa",
    description: "Carne desfiada com purê cremoso e vegetais.",
    category: "Marmitas",
    price: 27.9,
    image:
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=900&q=85",
    imageAlt: "Prato preparado com vegetais frescos e grãos",
  },
  {
    id: "bowl-vegetariano",
    name: "Bowl da horta",
    description: "Uma combinação colorida de vegetais e grãos.",
    category: "Vegetarianas",
    price: 23.9,
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=85",
    imageAlt: "Salada fresca com folhas, legumes e sementes",
    tag: "Vegetariana",
  },
  {
    id: "frango-mediterraneo",
    name: "Frango mediterrâneo",
    description: "Frango dourado, vegetais assados e ervas aromáticas.",
    category: "Marmitas",
    price: 25.9,
    image:
      "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=85",
    imageAlt: "Refeição colorida com vegetais e ervas",
  },
  {
    id: "kit-semana",
    name: "Kit semana leve",
    description: "Cinco refeições para deixar a semana mais prática.",
    category: "Kits",
    price: 109.9,
    image:
      "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=900&q=85",
    imageAlt: "Ingredientes frescos organizados para preparar refeições",
    tag: "5 refeições",
  },
  {
    id: "kit-experimentar",
    name: "Kit para experimentar",
    description: "Três sabores para encontrar seus novos favoritos.",
    category: "Kits",
    price: 69.9,
    image:
      "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=85",
    imageAlt: "Prato pronto com vegetais e acompanhamentos",
    tag: "3 refeições",
  },
];
