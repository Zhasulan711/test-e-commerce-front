import { useExampleData, useCreateExampleData } from "@/hooks/useExample";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function ExampleComponent() {
  // Используем hook для получения данных
  const { data, isLoading, isError, error } = useExampleData();

  // Используем hook для создания данных
  const createMutation = useCreateExampleData();

  const handleCreate = () => {
    createMutation.mutate({
      title: "Новый пост",
      description: "Описание нового поста",
    });
  };

  if (isLoading) {
    return <div className="p-4">Загрузка...</div>;
  }

  if (isError) {
    return (
      <div className="p-4 text-red-500">
        Ошибка: {error instanceof Error ? error.message : "Неизвестная ошибка"}
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Пример React Query</h1>
        <Button onClick={handleCreate} disabled={createMutation.isPending}>
          {createMutation.isPending ? "Создание..." : "Создать новый пост"}
        </Button>
      </div>

      {createMutation.isError && (
        <div className="p-4 bg-red-100 text-red-700 rounded">
          Ошибка при создании:{" "}
          {createMutation.error instanceof Error
            ? createMutation.error.message
            : "Неизвестная ошибка"}
        </div>
      )}

      {createMutation.isSuccess && (
        <div className="p-4 bg-green-100 text-green-700 rounded">
          Пост успешно создан!
        </div>
      )}

      <div className="grid gap-4">
        {data?.slice(0, 5).map((item) => (
          <Card key={item.id} className="p-4">
            <h2 className="text-lg font-semibold">{item.title}</h2>
            <p className="text-gray-600 mt-2">{item.description}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
