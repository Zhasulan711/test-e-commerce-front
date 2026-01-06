import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Cart, CartProduct } from "../types";
import { ProductCard } from "@/features/home/types";
import { CartProductItem } from "./CartProductItem";

interface CartCardProps {
  cart: Cart;
  products: Map<number, ProductCard>;
  onRemoveProduct?: (cartId: number, productId: number) => void;
  removingProductId?: number;
}

export const CartCard = ({
  cart,
  products,
  onRemoveProduct,
  removingProductId,
}: CartCardProps) => {
  const { id, date, products: cartProducts } = cart;

  const total = cartProducts.reduce((sum, cartProduct) => {
    const product = products.get(cartProduct.productId);
    if (product) {
      return sum + product.price * cartProduct.quantity;
    }
    return sum;
  }, 0);

  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleRemoveProduct = (productId: number) => {
    if (onRemoveProduct) {
      onRemoveProduct(id, productId);
    }
  };

  return (
    <Card className="p-6 hover:shadow-lg transition-shadow border-2 border-gray-100">
      <CardHeader className="pb-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-xl font-bold text-gray-900 mb-1">Cart #{id}</h4>
            <p className="text-sm text-gray-500">{formattedDate}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500 uppercase tracking-wide">
              Total
            </p>
            <p className="text-2xl font-bold text-gray-900">
              ${total.toFixed(2)}
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-4">
        <div className="space-y-3">
          {cartProducts.map((cartProduct, index) => (
            <CartProductItem
              key={`${cartProduct.productId}-${index}`}
              cartProduct={cartProduct}
              product={products.get(cartProduct.productId)}
              onRemove={() => handleRemoveProduct(cartProduct.productId)}
              isRemoving={removingProductId === cartProduct.productId}
            />
          ))}
        </div>
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">
              {cartProducts.length} item{cartProducts.length !== 1 ? "s" : ""}
            </span>
            <span className="font-semibold text-gray-900">
              Total: ${total.toFixed(2)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
