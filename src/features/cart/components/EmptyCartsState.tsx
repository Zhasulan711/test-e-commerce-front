import { BoxIcon } from "@/components/Icons/BoxIcon";

export const EmptyCartsState = () => {
  return (
    <>
      <h3 className="text-2xl uppercase mb-1">My Shopping Carts</h3>
      <p className="text-sm text-gray-600 mb-6">
        View and manage your shopping carts
      </p>

      <div className="h-px self-stretch bg-[#EBEAEB] mb-6" />

      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="flex flex-col items-center gap-4 max-w-md text-center">
          <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center">
            <BoxIcon className="w-12 h-12 text-gray-400" />
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="text-xl font-semibold text-gray-900">
              No carts available
            </h4>
            <p className="text-base text-gray-600">
              You don't have any shopping carts yet. Start adding products to
              your cart!
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

