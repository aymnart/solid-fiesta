// Generic types that are used in the project

/**
 * 🔄 Utility: ValueOf<T>
 *
 * Extracts the union of values from an object type `T`.
 *
 * Useful when working with `as const` object literals to derive their value types.
 *
 * @template T - The object type (e.g. enum-like literals)
 * @example
 * const Direction = {
 *   ASC: "asc",
 *   DESC: "desc",
 * } as const;
 *
 * type DirectionValues = ValueOf<typeof Direction>; // "asc" | "desc"
 */
export type ValueOf<T> = T[keyof T]

/**
 * ❓ Utility: Maybe<T>
 *
 * Represents a value that can be of type T or `undefined` or `null`.
 *
 * Common for optional or incomplete data, especially in forms, GraphQL, or APIs.
 *
 * @example
 * type MaybeEmail = Maybe<string>; // string | undefined | null
 */
export type Maybe<T> = T | undefined | null

/**
 * ❓ Utility: Nullable<T>
 *
 * Like Maybe<T> but meant more for database-style optionality (nullable fields).
 *
 * @example
 * type NullableName = Nullable<string>; // string | null | undefined
 */
export type Nullable<T> = T | null | undefined

/**
 * 📦 Standard API Response Wrapper
 *
 * Generic structure for consistent API responses across your app.
 *
 * @template T - The data payload type
 * @example
 * type UserResponse = ApiResponse<User>;
 */
export type ApiResponse<T> = {
  data: T
  error: string | null
  success: boolean
}

/**
 * 📂 Dictionary Type
 *
 * Represents a flexible key-value map.
 * By default, it uses `string` keys and `any` values — but both can be customized.
 *
 * @template K - The key type (defaults to `string`)
 * @template V - The value type (defaults to `unknown`)
 *
 * @example
 * const settings: Dictionary<string, boolean> = {
 *   darkMode: true,
 *   betaFeatures: false,
 * };
 *
 * @example
 * const statusCodes: Dictionary<number, string> = {
 *   200: "OK",
 *   404: "Not Found",
 * };
 */
export type Dictionary<K extends keyof any = string, V = unknown> = Record<K, V>

/**
 * 🔁 WithId
 *
 * Adds an `id` property to any object.
 * Useful for list rendering, DB entries, or mapping indexed data.
 */
export type WithId<T> = T & { id: string }

/**
 * 🧪 Async State
 *
 * Represents loading, error, and success states in frontend async logic.
 */
export type AsyncState<T> = {
  loading: boolean
  data: T | null
  error: string | null
}

/**
 * 🧪 Exact<T, Shape>
 *
 * Utility type to enforce that an object strictly matches the shape of another type.
 * It prevents additional properties from being passed unintentionally — perfect for
 * validating payloads or enforcing DTO structures.
 *
 * ✅ Use Case:
 * - To make sure your type doesn’t accidentally allow extra fields.
 * - Useful in form validation, API contracts, or strict interfaces.
 *
 * @template T - The type being validated
 * @template Shape - The exact shape to enforce
 *
 * @example
 * type Base = { name: string };
 * type Valid = Exact<{ name: string }, Base>;     // ✅ Allowed
 * type Invalid = Exact<{ name: string; age: number }, Base>; // ❌ Error (extra property "age")
 *
 * // Use it with function arguments:
 * function createUser<T extends Exact<T, Base>>(data: T) { ... }
 *
 * @remarks
 * This type works by ensuring all keys in `T` exist in `Shape`,
 * and that no additional keys beyond `Shape` exist in `T`.
 */
export type Exact<T, Shape> = T extends Shape
  ? Exclude<keyof T, keyof Shape> extends never
    ? T
    : never
  : never
