import { useGame } from "@/contexts/GameContext";
import { ShoppingCart, Trash2, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";

const Cart = () => {
  const { cart, removeFromCart, cartTotal, addToCart } = useGame();

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-8">
      <div className="animate-fade-in-up">
        <div className="flex items-center gap-3 mb-2">
          <ShoppingCart size={32} className="text-primary" />
          <h1 className="text-4xl font-bold">Carrinho de Compras</h1>
        </div>
        <p className="text-muted-foreground">
          {cart.length} item{cart.length !== 1 ? "ns" : ""} no seu carrinho
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center bg-card rounded-xl">
              <ShoppingCart size={64} className="text-muted-foreground/30 mb-4" />
              <h2 className="text-2xl font-bold mb-2">Seu carrinho está vazio</h2>
              <p className="text-muted-foreground">
                Começe a adicionar jogos ao seu carrinho para começar
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {cart.map((item, idx) => (
                <div
                  key={item.id}
                  className="p-4 rounded-xl bg-card hover:bg-card/80 transition-all duration-300 hover-lift animate-fade-in-up"
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  <div className="flex gap-4">
                    <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                      <div className="text-3xl">🎮</div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold mb-1">{item.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{item.category}</p>
                      <p className="text-lg font-semibold text-primary">
                        R$ {(item.price * item.quantity * 5).toFixed(2)}
                      </p>
                    </div>
                    <div className="flex flex-col items-end justify-between">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-1 hover:bg-destructive/20 rounded transition-colors"
                      >
                        <Trash2 size={16} className="text-destructive" />
                      </button>
                      <div className="flex items-center gap-2 bg-sidebar-accent/10 rounded-lg px-2 py-1">
                        <button className="p-0.5 hover:bg-sidebar-accent/20 rounded">
                          <Minus size={14} />
                        </button>
                        <span className="w-6 text-center text-sm font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => addToCart(item)}
                          className="p-0.5 hover:bg-sidebar-accent/20 rounded"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-card rounded-xl p-6 sticky top-24 animate-fade-in-up">
            <h2 className="text-xl font-bold mb-4">Resumo do Pedido</h2>
            <div className="space-y-3 mb-6 pb-6 border-b border-sidebar-border">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-semibold">R$ {(cartTotal * 5).toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Imposto (10%)</span>
                <span className="font-semibold">R$ {(cartTotal * 0.1 * 5).toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Envio</span>
                <span className="font-semibold">Grátis</span>
              </div>
            </div>
            <div className="flex items-center justify-between mb-6">
              <span className="font-bold">Total</span>
              <span className="text-2xl font-bold text-primary">
                R$ {(cartTotal * 1.1 * 5).toFixed(2)}
              </span>
            </div>
            <Button className="w-full hover-scale mb-2">
              Ir para Checkout
            </Button>
            <Button variant="outline" className="w-full hover-scale">
              Continuar Comprando
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
