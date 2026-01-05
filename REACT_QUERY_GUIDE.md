# Руководство по использованию React Query (TanStack Query)

## ✅ Установка завершена

React Query успешно установлен и настроен в вашем проекте!

## 📦 Установленные пакеты

- `@tanstack/react-query` - основная библиотека
- `@tanstack/react-query-devtools` - инструменты разработчика

## 🔧 Настройка

### 1. QueryClientProvider настроен в `_app.tsx`

```typescript
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
```

### 2. Конфигурация QueryClient

- `refetchOnWindowFocus: false` - отключен автоматический рефетч при фокусе
- `staleTime: 60000` - данные считаются свежими 1 минуту

## 📚 Основные возможности

### useQuery - Получение данных

```typescript
import { useQuery } from "@tanstack/react-query";

function MyComponent() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["myData"],
    queryFn: async () => {
      const response = await fetch("/api/data");
      return response.json();
    },
  });

  if (isLoading) return <div>Загрузка...</div>;
  if (isError) return <div>Ошибка: {error.message}</div>;

  return <div>{JSON.stringify(data)}</div>;
}
```

### useMutation - Изменение данных

```typescript
import { useMutation, useQueryClient } from "@tanstack/react-query";

function MyComponent() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (newData) => {
      const response = await fetch("/api/data", {
        method: "POST",
        body: JSON.stringify(newData),
      });
      return response.json();
    },
    onSuccess: () => {
      // Обновляем кеш после успешной мутации
      queryClient.invalidateQueries({ queryKey: ["myData"] });
    },
  });

  return (
    <button onClick={() => mutation.mutate({ name: "Test" })}>
      {mutation.isPending ? "Сохранение..." : "Сохранить"}
    </button>
  );
}
```

### useQueryClient - Работа с кешем

```typescript
import { useQueryClient } from "@tanstack/react-query";

function MyComponent() {
  const queryClient = useQueryClient();

  // Инвалидация кеша (перезагрузка данных)
  const refetch = () => {
    queryClient.invalidateQueries({ queryKey: ["myData"] });
  };

  // Ручное обновление кеша
  const updateCache = () => {
    queryClient.setQueryData(["myData"], (oldData) => {
      return { ...oldData, updated: true };
    });
  };

  // Получение данных из кеша
  const cachedData = queryClient.getQueryData(["myData"]);

  return <div>...</div>;
}
```

## 🎯 Примеры использования

### Пример 1: Простой GET-запрос

```typescript
// hooks/useUsers.ts
import { useQuery } from "@tanstack/react-query";

export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await fetch("/api/users");
      if (!response.ok) throw new Error("Failed to fetch users");
      return response.json();
    },
  });
}

// components/UserList.tsx
import { useUsers } from "@/hooks/useUsers";

export function UserList() {
  const { data: users, isLoading } = useUsers();

  if (isLoading) return <div>Загрузка...</div>;

  return (
    <ul>
      {users?.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

### Пример 2: POST-запрос с мутацией

```typescript
// hooks/useCreateUser.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userData) => {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      if (!response.ok) throw new Error("Failed to create user");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}

// components/CreateUserForm.tsx
import { useCreateUser } from "@/hooks/useCreateUser";

export function CreateUserForm() {
  const createUser = useCreateUser();

  const handleSubmit = (e) => {
    e.preventDefault();
    createUser.mutate({ name: "New User" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit" disabled={createUser.isPending}>
        {createUser.isPending ? "Создание..." : "Создать"}
      </button>
      {createUser.isError && <p>Ошибка: {createUser.error.message}</p>}
      {createUser.isSuccess && <p>Пользователь создан!</p>}
    </form>
  );
}
```

### Пример 3: Запрос с параметрами

```typescript
// hooks/useUser.ts
import { useQuery } from "@tanstack/react-query";

export function useUser(userId: string) {
  return useQuery({
    queryKey: ["user", userId],
    queryFn: async () => {
      const response = await fetch(`/api/users/${userId}`);
      if (!response.ok) throw new Error("Failed to fetch user");
      return response.json();
    },
    enabled: !!userId, // Запрос выполнится только если userId существует
  });
}

// components/UserProfile.tsx
import { useUser } from "@/hooks/useUser";

export function UserProfile({ userId }: { userId: string }) {
  const { data: user, isLoading } = useUser(userId);

  if (isLoading) return <div>Загрузка...</div>;

  return <div>{user?.name}</div>;
}
```

## 🛠️ Опции конфигурации

### Основные опции useQuery

```typescript
useQuery({
  queryKey: ["key"],
  queryFn: fetchFunction,
  staleTime: 5 * 60 * 1000, // 5 минут
  cacheTime: 10 * 60 * 1000, // 10 минут
  refetchOnWindowFocus: true,
  refetchOnMount: true,
  refetchInterval: false, // или время в ms для автоматического рефетча
  retry: 3, // количество повторных попыток при ошибке
  enabled: true, // выполнять ли запрос
  onSuccess: (data) => {}, // коллбэк при успехе
  onError: (error) => {}, // коллбэк при ошибке
});
```

### Основные опции useMutation

```typescript
useMutation({
  mutationFn: mutateFunction,
  onSuccess: (data) => {},
  onError: (error) => {},
  onMutate: async (variables) => {}, // вызывается перед мутацией (optimistic updates)
  onSettled: (data, error) => {}, // вызывается после завершения (успех или ошибка)
});
```

## 🎨 React Query DevTools

DevTools автоматически подключены и доступны в режиме разработки.

- Нажмите на иконку React Query в нижнем углу экрана
- Просматривайте все активные запросы
- Проверяйте кеш
- Вручную инвалидируйте запросы
- Отслеживайте состояние мутаций

## 📖 Дополнительные ресурсы

- [Официальная документация](https://tanstack.com/query/latest)
- [Примеры](https://tanstack.com/query/latest/docs/react/examples/react/simple)
- [TypeScript руководство](https://tanstack.com/query/latest/docs/react/typescript)

## 🚀 Запуск примера

Я создал пример компонента в `src/components/ExampleComponent.tsx`.

Чтобы использовать его, импортируйте в любую страницу:

```typescript
import ExampleComponent from "@/components/ExampleComponent";

export default function Home() {
  return <ExampleComponent />;
}
```

## 💡 Полезные советы

1. **Query Keys** - используйте массивы для группировки связанных запросов
   ```typescript
   ["users"] // все пользователи
   ["users", userId] // конкретный пользователь
   ["users", userId, "posts"] // посты пользователя
   ```

2. **Optimistic Updates** - обновляйте UI до получения ответа от сервера
   ```typescript
   onMutate: async (newData) => {
     await queryClient.cancelQueries({ queryKey: ['data'] })
     const previousData = queryClient.getQueryData(['data'])
     queryClient.setQueryData(['data'], (old) => [...old, newData])
     return { previousData }
   },
   onError: (err, newData, context) => {
     queryClient.setQueryData(['data'], context.previousData)
   },
   ```

3. **Prefetching** - предзагрузка данных для улучшения UX
   ```typescript
   const queryClient = useQueryClient()
   
   queryClient.prefetchQuery({
     queryKey: ['userData', userId],
     queryFn: () => fetchUser(userId),
   })
   ```

4. **Dependent Queries** - цепочка зависимых запросов
   ```typescript
   const { data: user } = useUser(userId)
   const { data: posts } = usePosts(user?.id, {
     enabled: !!user?.id
   })
   ```

Удачи в работе с React Query! 🎉
