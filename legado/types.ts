export type Category = "Marmitas" | "Kits" | "Vegetarianas";

export type Nutrition = {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  category: Category;
  price: number;
  image: string;
  imageAlt: string;
  tag?: string;
  nutrition?: Nutrition;
};

export type CartItem = {
  productId: string;
  quantity: number;
};

export type DemoUser = {
  email: string;
};
