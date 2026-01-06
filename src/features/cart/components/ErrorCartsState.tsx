import { AlertCircleIcon } from "@/components/Icons/AlertCircleIcon";

interface ErrorCartsStateProps {
  onRetry?: () => void;
}

export const ErrorCartsState = ({ onRetry }: ErrorCartsStateProps) => {
  return (
    <>
      <h3 className="text-2xl uppercase mb-1">My Shopping Carts</h3>
      <p className="text-sm text-gray-600 mb-6">
        View and manage your shopping carts
      </p>

      <div className="h-px self-stretch bg-[#EBEAEB] mb-6" />

      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="flex flex-col items-center gap-4 max-w-md text-center">
          <div className="w-24 h-24 rounded-full bg-red-50 flex items-center justify-center">
            <AlertCircleIcon className="w-12 h-12 text-red-500" />
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="text-xl font-semibold text-gray-900">
              Failed to load carts
            </h4>
            <p className="text-base text-gray-600">
              We're having trouble loading your carts. Please try again later.
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
    </>
  );
};

