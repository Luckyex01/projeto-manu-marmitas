import type { CartItem, DemoUser } from "../types";

const CART_KEY = "manu-demo-cart";
const USER_KEY = "manu-demo-user";

type ReadResult<T> = {
  value: T;
  canWrite: boolean;
  issue?: string;
};

function readValue<T>(
  key: string,
  isValid: (value: unknown) => value is T,
  fallback: T,
): ReadResult<T> {
  try {
    const stored = window.localStorage.getItem(key);
    if (stored === null) return { value: fallback, canWrite: true };

    let parsed: unknown;
    try {
      parsed = JSON.parse(stored);
    } catch {
      return {
        value: fallback,
        canWrite: false,
        issue: "Os dados locais da vitrine estão inválidos e não foram sobrescritos.",
      };
    }

    if (!isValid(parsed)) {
      return {
        value: fallback,
        canWrite: false,
        issue: "Os dados locais da vitrine têm formato inesperado e não foram sobrescritos.",
      };
    }

    return { value: parsed, canWrite: true };
  } catch {
    return {
      value: fallback,
      canWrite: false,
      issue: "O navegador não permitiu acessar o armazenamento local.",
    };
  }
}

function writeValue<T>(key: string, value: T): string | undefined {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    return "Não foi possível salvar este estado neste navegador.";
  }
  return undefined;
}

function isCartItem(value: unknown): value is CartItem {
  if (typeof value !== "object" || value === null) return false;
  return (
    "productId" in value &&
    typeof value.productId === "string" &&
    "quantity" in value &&
    Number.isInteger(value.quantity) &&
    Number(value.quantity) > 0
  );
}

function isCart(value: unknown): value is CartItem[] {
  return Array.isArray(value) && value.every(isCartItem);
}

function isDemoUser(value: unknown): value is DemoUser | null {
  if (value === null) return true;
  if (typeof value !== "object") return false;
  return "email" in value && typeof value.email === "string";
}

export function readCart(): ReadResult<CartItem[]> {
  return readValue(CART_KEY, isCart, []);
}

export function readUser(): ReadResult<DemoUser | null> {
  return readValue(USER_KEY, isDemoUser, null);
}

export function saveCart(cart: CartItem[]): string | undefined {
  return writeValue(CART_KEY, cart);
}

export function saveUser(user: DemoUser | null): string | undefined {
  return writeValue(USER_KEY, user);
}
