import { AlertCircleIcon } from "@/components/Icons/AlertCircleIcon";

export const UnauthenticatedCartsState = () => {
  return (
    <>
      <h3 className="text-2xl uppercase">Shopping Carts</h3>

      <div className="h-px self-stretch bg-[#EBEAEB]" />

      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="flex flex-col items-center gap-4 max-w-md text-center">
          <div className="w-24 h-24 rounded-full bg-yellow-50 flex items-center justify-center">
            <AlertCircleIcon className="w-12 h-12 text-yellow-600" />
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="text-xl font-semibold text-gray-900">
              Please log in
            </h4>
            <p className="text-base text-gray-600">
              You need to be logged in to view your shopping carts.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

