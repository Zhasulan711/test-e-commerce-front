import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// Пример типа данных
interface ExampleData {
  id: number;
  title: string;
  description: string;
}

// Пример функции для получения данных
async function fetchExampleData(): Promise<ExampleData[]> {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}

// Пример функции для создания данных
async function createExampleData(
  data: Omit<ExampleData, "id">
): Promise<ExampleData> {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}

// Hook для получения данных
export function useExampleData() {
  return useQuery({
    queryKey: ["exampleData"],
    queryFn: fetchExampleData,
  });
}

// Hook для создания данных
export function useCreateExampleData() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createExampleData,
    onSuccess: () => {
      // Инвалидируем кеш после успешного создания
      queryClient.invalidateQueries({ queryKey: ["exampleData"] });
    },
  });
}
