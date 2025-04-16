# 🧠 TypeScript Type Naming Conventions

This document outlines the naming conventions for types, interfaces, schemas, and related files in this codebase. It helps keep our project clean, scalable, and readable — like a true TypeScript ninja. 🥷✨

## 🔤 General Rules

- ✅ Use **PascalCase** for all type names
- ✅ Use **camelCase** for schema variables (e.g. `userSchema`)
- ✅ Group and organize types by **feature/domain**
- ✅ Always add suffixes to indicate type purpose

## 🧱 Naming Patterns

| Type Purpose          | Convention             | Example                      |
|-----------------------|------------------------|------------------------------|
| Entity / DB Model     | `Xxx`                  | `User`, `Product`            |
| API Input Payload     | `XxxInput`             | `LoginInput`, `CreatePostInput` |
| API Response          | `XxxResponse`          | `UserResponse`, `LoginResponse` |
| Form Values           | `XxxFormValues`        | `SignupFormValues`           |
| Component Props       | `XxxProps`             | `UserCardProps`, `ModalProps` |
| DTO (Transformed)     | `XxxDTO`               | `UserDTO`, `InvoiceDTO`      |
| Zod Schema            | `xxxSchema` (camelCase)| `userSchema`, `loginSchema`  |
| Zod Inferred Type     | `XxxType` or same as input type | `UserType`, `LoginInput` |
| Enum Types            | `Xxx` or `XxxEnum`     | `UserRole`, `StatusEnum`     |
| Errors                | `XxxError`             | `AuthError`, `ValidationError` |

## 🗂 Folder Structure: Colocated + Global Reusable Types

```bash

src/
  types/                        # 🌍 Global reusable types (shared across the app)
    index.ts                    # Barrel file (export everything)
    common.ts                   # Generic utils like Maybe<T>, Nullable<T>, ApiResponse<T>
    userRole.ts                 # Enums or shared roles/types
    form.ts                     # Common form helpers or validation types

  features/
    auth/
      types.ts                  # LoginInput, LoginResponse, AuthError (specific to auth)
      login.tsx
      auth.api.ts

    user/
      types.ts                  # User, UserDTO (specific to user feature)
      profile.tsx
      user.api.ts

    dashboard/
      types.ts                  # DashboardWidgetType, MetricsData
      dashboard.tsx
```

## 🧭 When to Use What

| Location          | Purpose                                               |
|-------------------|------------------------------------------------------|
| `src/types/`     | Reusable types across features: enums, utility types, shared DTOs |
| `feature/types.ts`| Specific to a single feature, like auth, user, dashboard, etc. |

## 🧠 Example

### types/common.ts

```ts

export type Maybe<T> = T | null;
export type Nullable<T> = T | null | undefined;

export type ApiResponse<T> = {
  data: T;
  message?: string;
  status: number;
};
```

### types/userRole.ts

```ts
export type UserRole = "admin" | "editor" | "viewer";
```

---

### features/user/types.ts

```ts
import { UserRole } from "@/types/userRole";

export type User = {
  id: string;
  name: string;
  role: UserRole;
};
```

## 🧪 Zod + TypeScript Best Practices

```ts
// Schema definition (camelCase)
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

// Type inference (PascalCase)
type LoginInput = z.infer<typeof loginSchema>;
🧠 Example Types

type User = {
  id: string;
  name: string;
  role: UserRole;
};

type UserRole = "admin" | "user" | "guest";

type LoginInput = {
  email: string;
  password: string;
};

type LoginResponse = {
  token: string;
  user: User;
};

type UserCardProps = {
  user: User;
  onClick?: () => void;
};

```

## Pro Tips 💡

- Don't reuse types in different contexts (e.g. don't use the same type for input + response)

- Prefer type over interface unless you need extension/merging

- Co-locate types close to usage for better DX

- Use `as const` and `z.infer<typeof schema>` to keep your types tight & safe

---

Happy Typing 💻✨

— Aymen Amara
