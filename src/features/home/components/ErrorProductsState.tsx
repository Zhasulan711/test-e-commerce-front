import { AlertCircleIcon } from "@/components/Icons/AlertCircleIcon";

interface ErrorProductsStateProps {
  onRetry?: () => void;
}

export const ErrorProductsState = ({ onRetry }: ErrorProductsStateProps) => {
  return (
    <section className="flex flex-col gap-5">
      <div className="flex justify-between">
        <h3 className="text-2xl uppercase">Sale Products</h3>
      </div>
      <div className="h-px self-stretch bg-[#EBEAEB]" />
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="flex flex-col items-center gap-4 max-w-md text-center">
          <div className="w-24 h-24 rounded-full bg-red-50 flex items-center justify-center">
            <AlertCircleIcon className="w-12 h-12 text-red-500" />
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="text-xl font-semibold text-gray-900">
              Failed to load products
            </h4>
            <p className="text-base text-gray-600">
              We're having trouble loading products. Please try again later.
            </p>
            {onRetry && (
              <button
                onClick={onRetry}
                className="mt-4 px-6 py-2 bg-[#FDD327] text-black font-bold rounded hover:bg-yellow-400 transition-colors"
              >
                Try Again
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

