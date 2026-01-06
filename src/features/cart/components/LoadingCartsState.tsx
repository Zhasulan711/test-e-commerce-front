import { Card, CardContent, CardHeader } from "@/components/ui/card";

export const LoadingCartsState = () => {
  return (
    <>
      <h3 className="text-2xl uppercase mb-1">My Shopping Carts</h3>
      <div className="bg-gray-200 rounded h-4 w-64 mb-6 animate-pulse" />

      <div className="h-px self-stretch bg-[#EBEAEB] mb-6" />

      <div className="gap-6 grid lg:grid-cols-2 xl:grid-cols-3 grid-cols-1">
        {Array.from({ length: 3 }).map((_, index) => (
          <Card key={index} className="p-6 border-2 border-gray-100">
            <CardHeader className="pb-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="bg-gray-200 rounded h-6 w-24 animate-pulse mb-2" />
                  <div className="bg-gray-200 rounded h-4 w-32 animate-pulse" />
                </div>
                <div className="text-right">
                  <div className="bg-gray-200 rounded h-3 w-12 animate-pulse mb-2" />
                  <div className="bg-gray-200 rounded h-7 w-20 animate-pulse" />
                </div>
              </div>
            </CardHeader>

            <CardContent className="pt-4">
              <div className="space-y-3">
                {Array.from({ length: 2 }).map((_, productIndex) => (
                  <div
                    key={productIndex}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="w-16 h-16 bg-gray-200 rounded animate-pulse" />
                    <div className="flex-1">
                      <div className="bg-gray-200 rounded h-4 w-3/4 mb-2 animate-pulse" />
                      <div className="bg-gray-200 rounded h-3 w-1/2 animate-pulse" />
                    </div>
                    <div className="bg-gray-200 rounded h-4 w-16 animate-pulse" />
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between">
                <div className="bg-gray-200 rounded h-4 w-16 animate-pulse" />
                <div className="bg-gray-200 rounded h-4 w-20 animate-pulse" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
};

