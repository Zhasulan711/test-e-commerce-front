import { BoxIcon } from "@/components/Icons/BoxIcon";

export const EmptyProductsState = () => {
  return (
    <section className="flex flex-col gap-5">
      <div className="flex justify-between">
        <h3 className="text-2xl uppercase">Sale Products</h3>
      </div>
      <div className="h-px self-stretch bg-[#EBEAEB]" />
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="flex flex-col items-center gap-4 max-w-md text-center">
          <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center">
            <BoxIcon className="w-12 h-12 text-gray-400" />
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="text-xl font-semibold text-gray-900">
              No products available
            </h4>
            <p className="text-base text-gray-600">
              We're currently updating our inventory. Please check back soon!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

