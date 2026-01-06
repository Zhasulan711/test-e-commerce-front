import { ProductCard } from "@/features/home/types";
import { CartProduct } from "../types";
import { TrashIcon } from "@/components/Icons/TrashIcon";

interface CartProductItemProps {
  cartProduct: CartProduct;
  product?: ProductCard;
  onRemove?: () => void;
  isRemoving?: boolean;
}

export const CartProductItem = ({
  cartProduct,
  product,
  onRemove,
  isRemoving = false,
}: CartProductItemProps) => {
  const { quantity } = cartProduct;

  if (!product) {
    return (
      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
        <div className="w-16 h-16 bg-gray-200 rounded animate-pulse" />
        <div className="flex-1">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2 animate-pulse" />
          <div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse" />
        </div>
        <div className="text-right">
          <div className="h-4 bg-gray-200 rounded w-12 mb-1 animate-pulse" />
          <div className="text-sm text-gray-500">Qty: {quantity}</div>
        </div>
      </div>
    );
  }

  const { name, price, image } = product;
  const totalPrice = price * quantity;

  return (
    <div
      className={`flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors ${
        isRemoving ? "opacity-50 pointer-events-none" : ""
      }`}
    >
      <div className="shrink-0">
        <img
          src={image}
          alt={name}
          className="w-16 h-16 object-contain rounded bg-white p-1 border border-gray-200"
        />
      </div>
      <div className="flex-1 min-w-0">
        <h5 className="font-medium text-sm text-gray-900 line-clamp-1 mb-1">
          {name}
        </h5>
        <p className="text-xs text-gray-500">${price.toFixed(2)} each</p>
      </div>
      <div className="shrink-0 flex items-center gap-3">
        <div className="text-right">
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">x{quantity}</span>
            <span className="font-semibold text-gray-900">
              ${totalPrice.toFixed(2)}
            </span>
          </div>
        </div>
        {onRemove && (
          <button
            onClick={onRemove}
            disabled={isRemoving}
            className="p-1.5 hover:bg-red-50 rounded transition-colors group"
            aria-label={`Remove ${name} from cart`}
          >
            <TrashIcon className="w-4 h-4 text-gray-400 group-hover:text-red-500 transition-colors" />
          </button>
        )}
      </div>
    </div>
  );
};
