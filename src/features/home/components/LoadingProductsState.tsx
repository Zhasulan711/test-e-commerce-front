import { Card, CardContent, CardHeader } from "@/components/ui/card";

export const LoadingProductsState = () => {
  return (
    <section className="flex flex-col gap-5">
      <div className="flex justify-between">
        <h3 className="text-2xl uppercase">Sale Products</h3>
        <div className="flex gap-2.5 text-black items-center">
          <div className="md:w-7 md:h-7 w-5.5 h-5.5 bg-gray-200 rounded animate-pulse" />
          <div className="xl:text-[1.375rem] text-[1.188rem] bg-gray-200 rounded w-12 h-6 animate-pulse" />
          <div className="md:w-7 md:h-7 w-5.5 h-5.5 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
      <div className="h-px self-stretch bg-[#EBEAEB]" />

      <div className="gap-5 flex-1 grid xl:grid-cols-4 md:grid-cols-3 grid-cols-2 items-stretch">
        {Array.from({ length: 8 }).map((_, index) => (
          <Card key={index} className="py-2.5 h-full p-2.5 flex flex-col">
            <CardHeader className="flex justify-center">
              <div className="block mt-2 bg-gray-200 rounded animate-pulse 2xl:w-34 xl:w-30 md:w-37 sm:w-32 w-24 sm:h-38.5 h-28" />
            </CardHeader>

            <CardContent className="flex flex-col items-center flex-1 justify-end gap-1.5">
              <div className="self-start bg-gray-200 rounded h-6 w-3/4 animate-pulse" />
              <div className="self-start bg-gray-200 rounded h-4 w-full animate-pulse" />
              <div className="self-start bg-gray-200 rounded h-4 w-1/2 animate-pulse" />
              <div className="self-start bg-gray-200 rounded h-6 w-1/3 animate-pulse" />
              <div className="self-start bg-gray-200 rounded h-8 w-full mt-2 animate-pulse" />
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

