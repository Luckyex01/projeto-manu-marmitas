import {
  useEffect,
  useMemo,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { products } from "./data/products";
import { readCart, readUser, saveCart, saveUser } from "./lib/storage";
import type { CartItem, Category, DemoUser, Product } from "./types";

const categories: Array<"Todas" | Category> = [
  "Todas",
  "Marmitas",
  "Kits",
  "Vegetarianas",
];

const initialCart = readCart();
const initialUser = readUser();

function formatPrice(price: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(price);
}

function App() {
  const [cart, setCart] = useState<CartItem[]>(initialCart.value);
  const [user, setUser] = useState<DemoUser | null>(initialUser.value);
  const [cartOpen, setCartOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [authMessage, setAuthMessage] = useState("");
  const [notice, setNotice] = useState("");
  const [storageIssue, setStorageIssue] = useState(
    initialCart.issue ?? initialUser.issue ?? "",
  );
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<(typeof categories)[number]>("Todas");

  useEffect(() => {
    if (!initialCart.canWrite) return;
    const issue = saveCart(cart);
    if (issue) setStorageIssue(issue);
  }, [cart]);

  useEffect(() => {
    if (!initialUser.canWrite) return;
    const issue = saveUser(user);
    if (issue) setStorageIssue(issue);
  }, [user]);

  useEffect(() => {
    if (!notice) return;
    const timeout = window.setTimeout(() => setNotice(""), 3200);
    return () => window.clearTimeout(timeout);
  }, [notice]);

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLocaleLowerCase("pt-BR");
    return products.filter((product) => {
      const matchesCategory =
        category === "Todas" || product.category === category;
      const matchesSearch =
        query.length === 0 ||
        `${product.name} ${product.description}`
          .toLocaleLowerCase("pt-BR")
          .includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [category, search]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => {
    const product = products.find((entry) => entry.id === item.productId);
    return sum + (product?.price ?? 0) * item.quantity;
  }, 0);

  function addToCart(product: Product) {
    setCart((current) => {
      const existing = current.find((item) => item.productId === product.id);
      if (existing) {
        return current.map((item) =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...current, { productId: product.id, quantity: 1 }];
    });
    setNotice(`${product.name} adicionado à sacola.`);
  }

  function changeQuantity(productId: string, change: number) {
    setCart((current) =>
      current
        .map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + change }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }

  function openAuth() {
    setAuthMessage("");
    setAuthOpen(true);
  }

  function handleAuth(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setAuthMessage("Digite um email em formato válido.");
      return;
    }
    if (password.length === 0) {
      setAuthMessage("Preencha a senha para continuar.");
      return;
    }

    setUser({ email });
    setAuthOpen(false);
    setNotice("Acesso demonstrativo iniciado. Nenhuma senha foi armazenada.");
  }

  function finishDemoOrder() {
    if (!user) {
      setAuthMessage("Entre ou faça seu cadastro demonstrativo para continuar.");
      setAuthOpen(true);
      return;
    }
    if (cart.length === 0) return;
    setCart([]);
    setCartOpen(false);
    setNotice("Pedido demonstrativo concluído. Nenhuma compra foi realizada.");
  }

  function signOut() {
    setUser(null);
    setNotice("Você saiu da sessão demonstrativa.");
  }

  return (
    <>
      <AnnouncementBar />
      <header className="site-header">
        <div className="header-main">
          <a className="brand" href="#inicio" aria-label="Manu Marmitas, início">
            <span className="brand-mark">m</span>
            <span className="brand-name">
              manu<span>.</span>
              <small>marmitas de verdade</small>
            </span>
          </a>
          <div className="header-actions">
            {user ? (
              <button
                className="account-button"
                type="button"
                onClick={signOut}
                aria-label={`Sair da conta de ${user.email}`}
                title="Sair da sessão demonstrativa"
              >
                <UserIcon />
                <span className="account-label">Olá, {user.email.split("@")[0]}</span>
              </button>
            ) : (
              <button
                className="account-button"
                type="button"
                onClick={openAuth}
                aria-label="Entrar ou cadastrar"
              >
                <UserIcon />
                <span className="account-label">Entrar</span>
              </button>
            )}
            <button
              className="bag-button"
              type="button"
              onClick={() => setCartOpen(true)}
              aria-label={`Abrir sacola, ${cartCount} ${cartCount === 1 ? "item" : "itens"}`}
            >
              <BagIcon />
              <span className="bag-label">Sacola</span>
              <span className="bag-count">{cartCount}</span>
            </button>
          </div>
        </div>
        <div className="header-search">
          <SearchIcon />
          <input
            type="search"
            aria-label="Buscar refeições"
            placeholder="O que combina com seu dia?"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          {search && (
            <button
              type="button"
              className="clear-search"
              onClick={() => setSearch("")}
              aria-label="Limpar busca"
            >
              ×
            </button>
          )}
        </div>
        <nav className="quick-nav" aria-label="Navegação principal">
          <a href="#cardapio">Cardápio</a>
          <a href="#kits">Kits da semana</a>
          <a href="#sobre">Nossa ideia</a>
        </nav>
      </header>

      <main id="inicio">
        <section className="hero" aria-labelledby="hero-title">
          <img
            className="hero-image"
            src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1800&q=90"
            alt=""
            fetchPriority="high"
          />
          <div className="hero-overlay" />
          <div className="hero-content">
            <p className="eyebrow hero-eyebrow">Comida de verdade, sem complicar</p>
            <h1 id="hero-title">
              Seu dia corre.
              <br />
              Sua comida, <em>não.</em>
            </h1>
            <p className="hero-description">
              Refeições gostosas e práticas para deixar mais leve a rotina que
              já vem cheia.
            </p>
            <a className="button button-light" href="#cardapio">
              Conheça o cardápio <ArrowIcon />
            </a>
          </div>
          <span className="hero-note">Sua pausa gostosa começa aqui.</span>
        </section>

        <section className="benefits" aria-label="Por que escolher a Manu">
          <Benefit icon={<LeafIcon />} title="Feito com cuidado">
            Ingredientes escolhidos com carinho.
          </Benefit>
          <Benefit icon={<SnowIcon />} title="Congelado, fácil">
            Praticidade pronta para a sua rotina.
          </Benefit>
          <Benefit icon={<HeartIcon />} title="Comida de verdade">
            Sabor caseiro em cada refeição.
          </Benefit>
        </section>

        <section className="catalog section-wrap" id="cardapio">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Escolha do seu jeito</p>
              <h2>Um carinho em forma de comida.</h2>
            </div>
            <p className="section-copy">
              Pratos gostosos para facilitar seus dias — sem abrir mão do
              prazer de comer bem.
            </p>
          </div>

          <div className="catalog-tools">
            <div className="category-list" aria-label="Filtrar por categoria">
              {categories.map((item) => (
                <button
                  className={`category-chip${category === item ? " is-active" : ""}`}
                  type="button"
                  key={item}
                  aria-pressed={category === item}
                  onClick={() => setCategory(item)}
                >
                  {item}
                </button>
              ))}
            </div>
            <span className="product-count">
              {filteredProducts.length} {filteredProducts.length === 1 ? "opção" : "opções"}
            </span>
          </div>

          <p className="demo-disclaimer">
            Vitrine demonstrativa: nomes, preços e imagens são ilustrativos.
            Fichas nutricionais aguardam os dados da planilha.
          </p>

          {filteredProducts.length > 0 ? (
            <div className="product-grid">
              {filteredProducts.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  priority={index < 2}
                  onAdd={addToCart}
                />
              ))}
            </div>
          ) : (
            <div className="empty-results">
              <span className="empty-icon"><SearchIcon /></span>
              <h3>Nenhum prato por aqui.</h3>
              <p>Tente outra busca ou escolha uma categoria diferente.</p>
              <button
                className="text-button"
                type="button"
                onClick={() => {
                  setSearch("");
                  setCategory("Todas");
                }}
              >
                Limpar filtros
              </button>
            </div>
          )}
        </section>

        <section className="kit-feature" id="kits">
          <div className="kit-image-wrap">
            <img
              src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1200&q=85"
              alt="Ingredientes frescos separados para preparar refeições"
              loading="lazy"
            />
            <span className="image-caption">Praticidade que cabe na rotina.</span>
          </div>
          <div className="kit-copy">
            <p className="eyebrow">Um plano a menos para pensar</p>
            <h2>Deixa a semana com a gente.</h2>
            <p>
              Os kits juntam refeições para você ter mais tranquilidade na
              hora em que a fome aparece.
            </p>
            <a className="button button-dark" href="#cardapio">
              Ver kits e pratos <ArrowIcon />
            </a>
          </div>
        </section>

        <section className="about section-wrap" id="sobre">
          <div className="about-mark" aria-hidden="true">
            <span>m</span>
            <i>feito com carinho</i>
          </div>
          <div className="about-copy">
            <p className="eyebrow">Um pouquinho sobre nós</p>
            <h2>Comida gostosa também pode ser simples.</h2>
            <p>
              A Manu nasceu para ajudar a rotina a ficar mais leve, com comida
              preparada com atenção e pensada para fazer parte do dia a dia.
            </p>
            <p className="about-note">
              As informações desta vitrine serão ajustadas com a identidade,
              ingredientes e dados nutricionais fornecidos pela nutricionista.
            </p>
          </div>
        </section>

        <section className="closing-cta">
          <p className="eyebrow">Seu próximo prato favorito está por aqui</p>
          <h2>Praticidade com gostinho de casa.</h2>
          <a className="button button-light" href="#cardapio">
            Explorar cardápio <ArrowIcon />
          </a>
        </section>
      </main>

      <footer className="site-footer">
        <a className="brand brand-footer" href="#inicio">
          <span className="brand-mark">m</span>
          <span className="brand-name">
            manu<span>.</span>
            <small>marmitas de verdade</small>
          </span>
        </a>
        <p>Comida de verdade, feita para a vida como ela é.</p>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Manu Marmitas</span>
          <span>Vitrine demonstrativa · sem venda ou pagamento real</span>
        </div>
      </footer>

      {storageIssue && (
        <div className="storage-warning" role="status">
          <span>{storageIssue}</span>
          <button
            type="button"
            onClick={() => setStorageIssue("")}
            aria-label="Fechar aviso de armazenamento"
          >
            ×
          </button>
        </div>
      )}
      <div className="live-region" aria-live="polite" aria-atomic="true">
        {notice}
      </div>

      {cartOpen && (
        <CartDrawer
          cart={cart}
          total={cartTotal}
          user={user}
          onClose={() => setCartOpen(false)}
          onChangeQuantity={changeQuantity}
          onAuth={openAuth}
          onCheckout={finishDemoOrder}
        />
      )}
      {authOpen && (
        <AuthDialog
          message={authMessage}
          onClose={() => setAuthOpen(false)}
          onSubmit={handleAuth}
        />
      )}
      {notice && <div className="toast" role="status">{notice}</div>}
    </>
  );
}

function AnnouncementBar() {
  const messages = [
    "Sua rotina merece uma pausa gostosa.",
    "Praticidade congelada, carinho em cada prato.",
    "Comida de verdade para os dias de verdade.",
  ];
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReducedMotion(preference.matches);
    updatePreference();
    preference.addEventListener("change", updatePreference);
    return () => preference.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    if (paused || reducedMotion) return;
    const interval = window.setInterval(
      () => setActive((current) => (current + 1) % messages.length),
      5200,
    );
    return () => window.clearInterval(interval);
  }, [messages.length, paused, reducedMotion]);

  return (
    <div className="announcement">
      <span className="announcement-dot" aria-hidden="true" />
      <p aria-live="polite">{messages[active]}</p>
      <div className="announcement-controls" aria-label="Controles dos anúncios">
        <button
          type="button"
          onClick={() =>
            setActive((current) => (current + messages.length - 1) % messages.length)
          }
          aria-label="Anúncio anterior"
        >
          ‹
        </button>
        {!reducedMotion && (
          <button
            type="button"
            onClick={() => setPaused((current) => !current)}
            aria-label={paused ? "Retomar anúncios automáticos" : "Pausar anúncios automáticos"}
          >
            {paused ? "▶" : "Ⅱ"}
          </button>
        )}
        <button
          type="button"
          onClick={() => setActive((current) => (current + 1) % messages.length)}
          aria-label="Próximo anúncio"
        >
          ›
        </button>
      </div>
      <span className="announcement-side">VITRINE MANU</span>
    </div>
  );
}

function Benefit({
  icon,
  title,
  children,
}: {
  icon: ReactNode;
  title: string;
  children: string;
}) {
  return (
    <div className="benefit">
      <span className="benefit-icon" aria-hidden="true">{icon}</span>
      <div>
        <h3>{title}</h3>
        <p>{children}</p>
      </div>
    </div>
  );
}

function ProductCard({
  product,
  priority,
  onAdd,
}: {
  product: Product;
  priority: boolean;
  onAdd: (product: Product) => void;
}) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <article className="product-card">
      <div className={`product-image${imageFailed ? " image-failed" : ""}`}>
        {!imageFailed && (
          <img
            src={product.image}
            alt={product.imageAlt}
            loading={priority ? "eager" : "lazy"}
            onError={() => setImageFailed(true)}
          />
        )}
        {product.tag && <span className="product-tag">{product.tag}</span>}
        <span className="category-label">{product.category}</span>
      </div>
      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <div className="nutrition-line">
          {product.nutrition ? (
            <>
              <span>{product.nutrition.calories} kcal</span>
              <span>{product.nutrition.protein}g proteína</span>
            </>
          ) : (
            <span>Ficha nutricional em atualização</span>
          )}
        </div>
        <div className="product-footer">
          <div>
            <span className="price-label">
              {product.category === "Kits" ? "Kit" : "A partir de"}
            </span>
            <strong>{formatPrice(product.price)}</strong>
          </div>
          <button
            className="add-button"
            type="button"
            onClick={() => onAdd(product)}
            aria-label={`Adicionar ${product.name} à sacola`}
          >
            <span>Adicionar</span>
            <PlusIcon />
          </button>
        </div>
      </div>
    </article>
  );
}

function CartDrawer({
  cart,
  total,
  user,
  onClose,
  onChangeQuantity,
  onAuth,
  onCheckout,
}: {
  cart: CartItem[];
  total: number;
  user: DemoUser | null;
  onClose: () => void;
  onChangeQuantity: (productId: string, change: number) => void;
  onAuth: () => void;
  onCheckout: () => void;
}) {
  return (
    <div className="dialog-backdrop" onMouseDown={onClose}>
      <section
        className="cart-drawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="drawer-heading">
          <div>
            <p className="eyebrow">Seu cantinho gostoso</p>
            <h2 id="cart-title">Sua sacola</h2>
          </div>
          <button className="icon-close" type="button" onClick={onClose} aria-label="Fechar sacola">
            <CloseIcon />
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="cart-empty">
            <span className="cart-empty-icon"><BagIcon /></span>
            <h3>Sua sacola está esperando.</h3>
            <p>Escolha um prato gostoso para começar.</p>
            <button className="button button-dark" type="button" onClick={onClose}>
              Ver cardápio <ArrowIcon />
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cart.map((item) => {
                const product = products.find((entry) => entry.id === item.productId);
                if (!product) return null;
                return (
                  <div className="cart-item" key={item.productId}>
                    <img src={product.image} alt="" />
                    <div className="cart-item-info">
                      <h3>{product.name}</h3>
                      <span>{formatPrice(product.price)}</span>
                      <div className="quantity-control" aria-label={`Quantidade de ${product.name}`}>
                        <button
                          type="button"
                          onClick={() => onChangeQuantity(product.id, -1)}
                          aria-label={`Remover uma unidade de ${product.name}`}
                        >
                          −
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => onChangeQuantity(product.id, 1)}
                          aria-label={`Adicionar uma unidade de ${product.name}`}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <strong className="cart-item-total">
                      {formatPrice(product.price * item.quantity)}
                    </strong>
                  </div>
                );
              })}
            </div>
            <div className="cart-summary">
              <div className="cart-total-row">
                <span>Total ilustrativo</span>
                <strong>{formatPrice(total)}</strong>
              </div>
              <p>Frete não calculado nesta demonstração.</p>
              {!user && (
                <p className="login-hint">
                  A sacola é aberta para todos. Entre para concluir o fluxo demonstrativo.
                </p>
              )}
              <button className="button button-dark checkout-button" type="button" onClick={onCheckout}>
                {user ? "Finalizar demonstração" : "Entrar para continuar"}
                <ArrowIcon />
              </button>
              {user && (
                <button className="text-button signout-link" type="button" onClick={onAuth}>
                  Trocar conta demonstrativa
                </button>
              )}
              <span className="checkout-disclaimer">
                Sem pagamento, processamento de pedido ou venda real.
              </span>
            </div>
          </>
        )}
      </section>
    </div>
  );
}

function AuthDialog({
  message,
  onClose,
  onSubmit,
}: {
  message: string;
  onClose: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}) {
  const [mode, setMode] = useState<"login" | "register">("login");

  return (
    <div className="dialog-backdrop auth-backdrop" onMouseDown={onClose}>
      <section
        className="auth-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button className="icon-close auth-close" type="button" onClick={onClose} aria-label="Fechar">
          <CloseIcon />
        </button>
        <span className="auth-mark">m</span>
        <p className="eyebrow">Bem-vinda(o) à Manu</p>
        <h2 id="auth-title">{mode === "login" ? "Que bom ter você." : "Vamos começar?"}</h2>
        <p className="auth-description">
          Este acesso é só uma demonstração. Use um email em formato válido; a
          senha não é verificada nem armazenada.
        </p>
        <div className="auth-tabs" role="tablist" aria-label="Acesso">
          <button
            type="button"
            role="tab"
            aria-selected={mode === "login"}
            className={mode === "login" ? "is-active" : ""}
            onClick={() => setMode("login")}
          >
            Entrar
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={mode === "register"}
            className={mode === "register" ? "is-active" : ""}
            onClick={() => setMode("register")}
          >
            Criar cadastro
          </button>
        </div>
        <form className="auth-form" onSubmit={onSubmit}>
          <label htmlFor="auth-email">Seu email</label>
          <input
            id="auth-email"
            name="email"
            type="email"
            placeholder="voce@email.com"
            autoComplete="email"
            required
          />
          <label htmlFor="auth-password">Senha</label>
          <input
            id="auth-password"
            name="password"
            type="password"
            placeholder="Digite qualquer senha"
            autoComplete={mode === "login" ? "current-password" : "new-password"}
            required
          />
          {message && <p className="form-message" role="alert">{message}</p>}
          <button className="button button-dark auth-submit" type="submit">
            {mode === "login" ? "Entrar na demonstração" : "Criar cadastro demonstrativo"}
            <ArrowIcon />
          </button>
        </form>
        <p className="auth-footnote">Nenhuma conta real é criada.</p>
      </section>
    </div>
  );
}

function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20c.7-3.4 3.1-5.2 7-5.2s6.3 1.8 7 5.2" />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 8h14l1 12H4L5 8Z" />
      <path d="M9 9V6a3 3 0 0 1 6 0v3" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="10.8" cy="10.8" r="6.2" />
      <path d="m15.5 15.5 4.2 4.2" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M3.5 10h12M10 4.5l5.5 5.5-5.5 5.5" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M10 4v12M4 10h12" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  );
}

function LeafIcon() {
  return (
    <svg viewBox="0 0 28 28" aria-hidden="true">
      <path d="M23 5C12 4 6 8 6 16c0 4 2.5 6.5 6 6.5C20 22.5 24 14 23 5Z" />
      <path d="M4 24c4-7 8-10 15-14" />
    </svg>
  );
}

function SnowIcon() {
  return (
    <svg viewBox="0 0 28 28" aria-hidden="true">
      <path d="M14 3v22M4.5 8.5l19 11M4.5 19.5l19-11M14 3l-2.5 3M14 3l2.5 3M14 25l-2.5-3M14 25l2.5-3M4.5 8.5l4-.2-1.5 3.7M23.5 19.5l-4 .2 1.5-3.7M4.5 19.5l4 .2L7 16M23.5 8.5l-4-.2 1.5 3.7" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg viewBox="0 0 28 28" aria-hidden="true">
      <path d="M14 23S4 17 4 10.5A5.5 5.5 0 0 1 14 7a5.5 5.5 0 0 1 10 3.5C24 17 14 23 14 23Z" />
    </svg>
  );
}

export default App;
