
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Game
 * 
 */
export type Game = $Result.DefaultSelection<Prisma.$GamePayload>
/**
 * Model Team
 * 
 */
export type Team = $Result.DefaultSelection<Prisma.$TeamPayload>
/**
 * Model Player
 * 
 */
export type Player = $Result.DefaultSelection<Prisma.$PlayerPayload>
/**
 * Model Timeslot
 * 
 */
export type Timeslot = $Result.DefaultSelection<Prisma.$TimeslotPayload>
/**
 * Model AgeGroup
 * 
 */
export type AgeGroup = $Result.DefaultSelection<Prisma.$AgeGroupPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Location: {
  ST_IVES: 'ST_IVES',
  BELROSE: 'BELROSE'
};

export type Location = (typeof Location)[keyof typeof Location]

}

export type Location = $Enums.Location

export const Location: typeof $Enums.Location

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Games
 * const games = await prisma.game.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Games
   * const games = await prisma.game.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs, $Utils.Call<Prisma.TypeMapCb, {
    extArgs: ExtArgs
  }>, ClientOptions>

      /**
   * `prisma.game`: Exposes CRUD operations for the **Game** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Games
    * const games = await prisma.game.findMany()
    * ```
    */
  get game(): Prisma.GameDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.team`: Exposes CRUD operations for the **Team** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Teams
    * const teams = await prisma.team.findMany()
    * ```
    */
  get team(): Prisma.TeamDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.player`: Exposes CRUD operations for the **Player** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Players
    * const players = await prisma.player.findMany()
    * ```
    */
  get player(): Prisma.PlayerDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.timeslot`: Exposes CRUD operations for the **Timeslot** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Timeslots
    * const timeslots = await prisma.timeslot.findMany()
    * ```
    */
  get timeslot(): Prisma.TimeslotDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.ageGroup`: Exposes CRUD operations for the **AgeGroup** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AgeGroups
    * const ageGroups = await prisma.ageGroup.findMany()
    * ```
    */
  get ageGroup(): Prisma.AgeGroupDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.3.1
   * Query Engine version: acc0b9dd43eb689cbd20c9470515d719db10d0b0
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Game: 'Game',
    Team: 'Team',
    Player: 'Player',
    Timeslot: 'Timeslot',
    AgeGroup: 'AgeGroup'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "game" | "team" | "player" | "timeslot" | "ageGroup"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Game: {
        payload: Prisma.$GamePayload<ExtArgs>
        fields: Prisma.GameFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GameFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GameFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload>
          }
          findFirst: {
            args: Prisma.GameFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GameFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload>
          }
          findMany: {
            args: Prisma.GameFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload>[]
          }
          create: {
            args: Prisma.GameCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload>
          }
          createMany: {
            args: Prisma.GameCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GameCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload>[]
          }
          delete: {
            args: Prisma.GameDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload>
          }
          update: {
            args: Prisma.GameUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload>
          }
          deleteMany: {
            args: Prisma.GameDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GameUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.GameUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload>[]
          }
          upsert: {
            args: Prisma.GameUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload>
          }
          aggregate: {
            args: Prisma.GameAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGame>
          }
          groupBy: {
            args: Prisma.GameGroupByArgs<ExtArgs>
            result: $Utils.Optional<GameGroupByOutputType>[]
          }
          count: {
            args: Prisma.GameCountArgs<ExtArgs>
            result: $Utils.Optional<GameCountAggregateOutputType> | number
          }
        }
      }
      Team: {
        payload: Prisma.$TeamPayload<ExtArgs>
        fields: Prisma.TeamFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TeamFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TeamFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload>
          }
          findFirst: {
            args: Prisma.TeamFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TeamFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload>
          }
          findMany: {
            args: Prisma.TeamFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload>[]
          }
          create: {
            args: Prisma.TeamCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload>
          }
          createMany: {
            args: Prisma.TeamCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TeamCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload>[]
          }
          delete: {
            args: Prisma.TeamDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload>
          }
          update: {
            args: Prisma.TeamUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload>
          }
          deleteMany: {
            args: Prisma.TeamDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TeamUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TeamUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload>[]
          }
          upsert: {
            args: Prisma.TeamUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload>
          }
          aggregate: {
            args: Prisma.TeamAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTeam>
          }
          groupBy: {
            args: Prisma.TeamGroupByArgs<ExtArgs>
            result: $Utils.Optional<TeamGroupByOutputType>[]
          }
          count: {
            args: Prisma.TeamCountArgs<ExtArgs>
            result: $Utils.Optional<TeamCountAggregateOutputType> | number
          }
        }
      }
      Player: {
        payload: Prisma.$PlayerPayload<ExtArgs>
        fields: Prisma.PlayerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PlayerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PlayerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload>
          }
          findFirst: {
            args: Prisma.PlayerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PlayerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload>
          }
          findMany: {
            args: Prisma.PlayerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload>[]
          }
          create: {
            args: Prisma.PlayerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload>
          }
          createMany: {
            args: Prisma.PlayerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PlayerCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload>[]
          }
          delete: {
            args: Prisma.PlayerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload>
          }
          update: {
            args: Prisma.PlayerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload>
          }
          deleteMany: {
            args: Prisma.PlayerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PlayerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PlayerUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload>[]
          }
          upsert: {
            args: Prisma.PlayerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload>
          }
          aggregate: {
            args: Prisma.PlayerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePlayer>
          }
          groupBy: {
            args: Prisma.PlayerGroupByArgs<ExtArgs>
            result: $Utils.Optional<PlayerGroupByOutputType>[]
          }
          count: {
            args: Prisma.PlayerCountArgs<ExtArgs>
            result: $Utils.Optional<PlayerCountAggregateOutputType> | number
          }
        }
      }
      Timeslot: {
        payload: Prisma.$TimeslotPayload<ExtArgs>
        fields: Prisma.TimeslotFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TimeslotFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimeslotPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TimeslotFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimeslotPayload>
          }
          findFirst: {
            args: Prisma.TimeslotFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimeslotPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TimeslotFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimeslotPayload>
          }
          findMany: {
            args: Prisma.TimeslotFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimeslotPayload>[]
          }
          create: {
            args: Prisma.TimeslotCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimeslotPayload>
          }
          createMany: {
            args: Prisma.TimeslotCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TimeslotCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimeslotPayload>[]
          }
          delete: {
            args: Prisma.TimeslotDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimeslotPayload>
          }
          update: {
            args: Prisma.TimeslotUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimeslotPayload>
          }
          deleteMany: {
            args: Prisma.TimeslotDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TimeslotUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TimeslotUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimeslotPayload>[]
          }
          upsert: {
            args: Prisma.TimeslotUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimeslotPayload>
          }
          aggregate: {
            args: Prisma.TimeslotAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTimeslot>
          }
          groupBy: {
            args: Prisma.TimeslotGroupByArgs<ExtArgs>
            result: $Utils.Optional<TimeslotGroupByOutputType>[]
          }
          count: {
            args: Prisma.TimeslotCountArgs<ExtArgs>
            result: $Utils.Optional<TimeslotCountAggregateOutputType> | number
          }
        }
      }
      AgeGroup: {
        payload: Prisma.$AgeGroupPayload<ExtArgs>
        fields: Prisma.AgeGroupFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AgeGroupFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgeGroupPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AgeGroupFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgeGroupPayload>
          }
          findFirst: {
            args: Prisma.AgeGroupFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgeGroupPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AgeGroupFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgeGroupPayload>
          }
          findMany: {
            args: Prisma.AgeGroupFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgeGroupPayload>[]
          }
          create: {
            args: Prisma.AgeGroupCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgeGroupPayload>
          }
          createMany: {
            args: Prisma.AgeGroupCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AgeGroupCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgeGroupPayload>[]
          }
          delete: {
            args: Prisma.AgeGroupDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgeGroupPayload>
          }
          update: {
            args: Prisma.AgeGroupUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgeGroupPayload>
          }
          deleteMany: {
            args: Prisma.AgeGroupDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AgeGroupUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AgeGroupUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgeGroupPayload>[]
          }
          upsert: {
            args: Prisma.AgeGroupUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgeGroupPayload>
          }
          aggregate: {
            args: Prisma.AgeGroupAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAgeGroup>
          }
          groupBy: {
            args: Prisma.AgeGroupGroupByArgs<ExtArgs>
            result: $Utils.Optional<AgeGroupGroupByOutputType>[]
          }
          count: {
            args: Prisma.AgeGroupCountArgs<ExtArgs>
            result: $Utils.Optional<AgeGroupCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    game?: GameOmit
    team?: TeamOmit
    player?: PlayerOmit
    timeslot?: TimeslotOmit
    ageGroup?: AgeGroupOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type TeamCountOutputType
   */

  export type TeamCountOutputType = {
    lightGames: number
    darkGames: number
    players: number
  }

  export type TeamCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lightGames?: boolean | TeamCountOutputTypeCountLightGamesArgs
    darkGames?: boolean | TeamCountOutputTypeCountDarkGamesArgs
    players?: boolean | TeamCountOutputTypeCountPlayersArgs
  }

  // Custom InputTypes
  /**
   * TeamCountOutputType without action
   */
  export type TeamCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamCountOutputType
     */
    select?: TeamCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TeamCountOutputType without action
   */
  export type TeamCountOutputTypeCountLightGamesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GameWhereInput
  }

  /**
   * TeamCountOutputType without action
   */
  export type TeamCountOutputTypeCountDarkGamesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GameWhereInput
  }

  /**
   * TeamCountOutputType without action
   */
  export type TeamCountOutputTypeCountPlayersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PlayerWhereInput
  }


  /**
   * Count Type AgeGroupCountOutputType
   */

  export type AgeGroupCountOutputType = {
    timeslots: number
    players: number
    teams: number
  }

  export type AgeGroupCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    timeslots?: boolean | AgeGroupCountOutputTypeCountTimeslotsArgs
    players?: boolean | AgeGroupCountOutputTypeCountPlayersArgs
    teams?: boolean | AgeGroupCountOutputTypeCountTeamsArgs
  }

  // Custom InputTypes
  /**
   * AgeGroupCountOutputType without action
   */
  export type AgeGroupCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgeGroupCountOutputType
     */
    select?: AgeGroupCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AgeGroupCountOutputType without action
   */
  export type AgeGroupCountOutputTypeCountTimeslotsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TimeslotWhereInput
  }

  /**
   * AgeGroupCountOutputType without action
   */
  export type AgeGroupCountOutputTypeCountPlayersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PlayerWhereInput
  }

  /**
   * AgeGroupCountOutputType without action
   */
  export type AgeGroupCountOutputTypeCountTeamsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TeamWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Game
   */

  export type AggregateGame = {
    _count: GameCountAggregateOutputType | null
    _avg: GameAvgAggregateOutputType | null
    _sum: GameSumAggregateOutputType | null
    _min: GameMinAggregateOutputType | null
    _max: GameMaxAggregateOutputType | null
  }

  export type GameAvgAggregateOutputType = {
    lightScore: number | null
    darkScore: number | null
  }

  export type GameSumAggregateOutputType = {
    lightScore: number | null
    darkScore: number | null
  }

  export type GameMinAggregateOutputType = {
    id: string | null
    lightTeamId: string | null
    darkTeamId: string | null
    lightScore: number | null
    darkScore: number | null
    timeslotId: string | null
  }

  export type GameMaxAggregateOutputType = {
    id: string | null
    lightTeamId: string | null
    darkTeamId: string | null
    lightScore: number | null
    darkScore: number | null
    timeslotId: string | null
  }

  export type GameCountAggregateOutputType = {
    id: number
    lightTeamId: number
    darkTeamId: number
    lightScore: number
    darkScore: number
    timeslotId: number
    _all: number
  }


  export type GameAvgAggregateInputType = {
    lightScore?: true
    darkScore?: true
  }

  export type GameSumAggregateInputType = {
    lightScore?: true
    darkScore?: true
  }

  export type GameMinAggregateInputType = {
    id?: true
    lightTeamId?: true
    darkTeamId?: true
    lightScore?: true
    darkScore?: true
    timeslotId?: true
  }

  export type GameMaxAggregateInputType = {
    id?: true
    lightTeamId?: true
    darkTeamId?: true
    lightScore?: true
    darkScore?: true
    timeslotId?: true
  }

  export type GameCountAggregateInputType = {
    id?: true
    lightTeamId?: true
    darkTeamId?: true
    lightScore?: true
    darkScore?: true
    timeslotId?: true
    _all?: true
  }

  export type GameAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Game to aggregate.
     */
    where?: GameWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Games to fetch.
     */
    orderBy?: GameOrderByWithRelationInput | GameOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GameWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Games from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Games.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Games
    **/
    _count?: true | GameCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: GameAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: GameSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GameMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GameMaxAggregateInputType
  }

  export type GetGameAggregateType<T extends GameAggregateArgs> = {
        [P in keyof T & keyof AggregateGame]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGame[P]>
      : GetScalarType<T[P], AggregateGame[P]>
  }




  export type GameGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GameWhereInput
    orderBy?: GameOrderByWithAggregationInput | GameOrderByWithAggregationInput[]
    by: GameScalarFieldEnum[] | GameScalarFieldEnum
    having?: GameScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GameCountAggregateInputType | true
    _avg?: GameAvgAggregateInputType
    _sum?: GameSumAggregateInputType
    _min?: GameMinAggregateInputType
    _max?: GameMaxAggregateInputType
  }

  export type GameGroupByOutputType = {
    id: string
    lightTeamId: string
    darkTeamId: string
    lightScore: number
    darkScore: number
    timeslotId: string
    _count: GameCountAggregateOutputType | null
    _avg: GameAvgAggregateOutputType | null
    _sum: GameSumAggregateOutputType | null
    _min: GameMinAggregateOutputType | null
    _max: GameMaxAggregateOutputType | null
  }

  type GetGameGroupByPayload<T extends GameGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GameGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GameGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GameGroupByOutputType[P]>
            : GetScalarType<T[P], GameGroupByOutputType[P]>
        }
      >
    >


  export type GameSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    lightTeamId?: boolean
    darkTeamId?: boolean
    lightScore?: boolean
    darkScore?: boolean
    timeslotId?: boolean
    lightTeam?: boolean | TeamDefaultArgs<ExtArgs>
    darkTeam?: boolean | TeamDefaultArgs<ExtArgs>
    timeslot?: boolean | TimeslotDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["game"]>

  export type GameSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    lightTeamId?: boolean
    darkTeamId?: boolean
    lightScore?: boolean
    darkScore?: boolean
    timeslotId?: boolean
    lightTeam?: boolean | TeamDefaultArgs<ExtArgs>
    darkTeam?: boolean | TeamDefaultArgs<ExtArgs>
    timeslot?: boolean | TimeslotDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["game"]>

  export type GameSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    lightTeamId?: boolean
    darkTeamId?: boolean
    lightScore?: boolean
    darkScore?: boolean
    timeslotId?: boolean
    lightTeam?: boolean | TeamDefaultArgs<ExtArgs>
    darkTeam?: boolean | TeamDefaultArgs<ExtArgs>
    timeslot?: boolean | TimeslotDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["game"]>

  export type GameSelectScalar = {
    id?: boolean
    lightTeamId?: boolean
    darkTeamId?: boolean
    lightScore?: boolean
    darkScore?: boolean
    timeslotId?: boolean
  }

  export type GameOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "lightTeamId" | "darkTeamId" | "lightScore" | "darkScore" | "timeslotId", ExtArgs["result"]["game"]>
  export type GameInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lightTeam?: boolean | TeamDefaultArgs<ExtArgs>
    darkTeam?: boolean | TeamDefaultArgs<ExtArgs>
    timeslot?: boolean | TimeslotDefaultArgs<ExtArgs>
  }
  export type GameIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lightTeam?: boolean | TeamDefaultArgs<ExtArgs>
    darkTeam?: boolean | TeamDefaultArgs<ExtArgs>
    timeslot?: boolean | TimeslotDefaultArgs<ExtArgs>
  }
  export type GameIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lightTeam?: boolean | TeamDefaultArgs<ExtArgs>
    darkTeam?: boolean | TeamDefaultArgs<ExtArgs>
    timeslot?: boolean | TimeslotDefaultArgs<ExtArgs>
  }

  export type $GamePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Game"
    objects: {
      lightTeam: Prisma.$TeamPayload<ExtArgs>
      darkTeam: Prisma.$TeamPayload<ExtArgs>
      timeslot: Prisma.$TimeslotPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      lightTeamId: string
      darkTeamId: string
      lightScore: number
      darkScore: number
      timeslotId: string
    }, ExtArgs["result"]["game"]>
    composites: {}
  }

  type GameGetPayload<S extends boolean | null | undefined | GameDefaultArgs> = $Result.GetResult<Prisma.$GamePayload, S>

  type GameCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<GameFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: GameCountAggregateInputType | true
    }

  export interface GameDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Game'], meta: { name: 'Game' } }
    /**
     * Find zero or one Game that matches the filter.
     * @param {GameFindUniqueArgs} args - Arguments to find a Game
     * @example
     * // Get one Game
     * const game = await prisma.game.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GameFindUniqueArgs>(args: SelectSubset<T, GameFindUniqueArgs<ExtArgs>>): Prisma__GameClient<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one Game that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {GameFindUniqueOrThrowArgs} args - Arguments to find a Game
     * @example
     * // Get one Game
     * const game = await prisma.game.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GameFindUniqueOrThrowArgs>(args: SelectSubset<T, GameFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GameClient<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first Game that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameFindFirstArgs} args - Arguments to find a Game
     * @example
     * // Get one Game
     * const game = await prisma.game.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GameFindFirstArgs>(args?: SelectSubset<T, GameFindFirstArgs<ExtArgs>>): Prisma__GameClient<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first Game that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameFindFirstOrThrowArgs} args - Arguments to find a Game
     * @example
     * // Get one Game
     * const game = await prisma.game.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GameFindFirstOrThrowArgs>(args?: SelectSubset<T, GameFindFirstOrThrowArgs<ExtArgs>>): Prisma__GameClient<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more Games that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Games
     * const games = await prisma.game.findMany()
     * 
     * // Get first 10 Games
     * const games = await prisma.game.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const gameWithIdOnly = await prisma.game.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GameFindManyArgs>(args?: SelectSubset<T, GameFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a Game.
     * @param {GameCreateArgs} args - Arguments to create a Game.
     * @example
     * // Create one Game
     * const Game = await prisma.game.create({
     *   data: {
     *     // ... data to create a Game
     *   }
     * })
     * 
     */
    create<T extends GameCreateArgs>(args: SelectSubset<T, GameCreateArgs<ExtArgs>>): Prisma__GameClient<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many Games.
     * @param {GameCreateManyArgs} args - Arguments to create many Games.
     * @example
     * // Create many Games
     * const game = await prisma.game.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GameCreateManyArgs>(args?: SelectSubset<T, GameCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Games and returns the data saved in the database.
     * @param {GameCreateManyAndReturnArgs} args - Arguments to create many Games.
     * @example
     * // Create many Games
     * const game = await prisma.game.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Games and only return the `id`
     * const gameWithIdOnly = await prisma.game.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GameCreateManyAndReturnArgs>(args?: SelectSubset<T, GameCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a Game.
     * @param {GameDeleteArgs} args - Arguments to delete one Game.
     * @example
     * // Delete one Game
     * const Game = await prisma.game.delete({
     *   where: {
     *     // ... filter to delete one Game
     *   }
     * })
     * 
     */
    delete<T extends GameDeleteArgs>(args: SelectSubset<T, GameDeleteArgs<ExtArgs>>): Prisma__GameClient<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one Game.
     * @param {GameUpdateArgs} args - Arguments to update one Game.
     * @example
     * // Update one Game
     * const game = await prisma.game.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GameUpdateArgs>(args: SelectSubset<T, GameUpdateArgs<ExtArgs>>): Prisma__GameClient<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more Games.
     * @param {GameDeleteManyArgs} args - Arguments to filter Games to delete.
     * @example
     * // Delete a few Games
     * const { count } = await prisma.game.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GameDeleteManyArgs>(args?: SelectSubset<T, GameDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Games.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Games
     * const game = await prisma.game.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GameUpdateManyArgs>(args: SelectSubset<T, GameUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Games and returns the data updated in the database.
     * @param {GameUpdateManyAndReturnArgs} args - Arguments to update many Games.
     * @example
     * // Update many Games
     * const game = await prisma.game.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Games and only return the `id`
     * const gameWithIdOnly = await prisma.game.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends GameUpdateManyAndReturnArgs>(args: SelectSubset<T, GameUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one Game.
     * @param {GameUpsertArgs} args - Arguments to update or create a Game.
     * @example
     * // Update or create a Game
     * const game = await prisma.game.upsert({
     *   create: {
     *     // ... data to create a Game
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Game we want to update
     *   }
     * })
     */
    upsert<T extends GameUpsertArgs>(args: SelectSubset<T, GameUpsertArgs<ExtArgs>>): Prisma__GameClient<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of Games.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameCountArgs} args - Arguments to filter Games to count.
     * @example
     * // Count the number of Games
     * const count = await prisma.game.count({
     *   where: {
     *     // ... the filter for the Games we want to count
     *   }
     * })
    **/
    count<T extends GameCountArgs>(
      args?: Subset<T, GameCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GameCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Game.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GameAggregateArgs>(args: Subset<T, GameAggregateArgs>): Prisma.PrismaPromise<GetGameAggregateType<T>>

    /**
     * Group by Game.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends GameGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GameGroupByArgs['orderBy'] }
        : { orderBy?: GameGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, GameGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGameGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Game model
   */
  readonly fields: GameFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Game.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GameClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    lightTeam<T extends TeamDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TeamDefaultArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
    darkTeam<T extends TeamDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TeamDefaultArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
    timeslot<T extends TimeslotDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TimeslotDefaultArgs<ExtArgs>>): Prisma__TimeslotClient<$Result.GetResult<Prisma.$TimeslotPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Game model
   */ 
  interface GameFieldRefs {
    readonly id: FieldRef<"Game", 'String'>
    readonly lightTeamId: FieldRef<"Game", 'String'>
    readonly darkTeamId: FieldRef<"Game", 'String'>
    readonly lightScore: FieldRef<"Game", 'Int'>
    readonly darkScore: FieldRef<"Game", 'Int'>
    readonly timeslotId: FieldRef<"Game", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Game findUnique
   */
  export type GameFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    /**
     * Filter, which Game to fetch.
     */
    where: GameWhereUniqueInput
  }

  /**
   * Game findUniqueOrThrow
   */
  export type GameFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    /**
     * Filter, which Game to fetch.
     */
    where: GameWhereUniqueInput
  }

  /**
   * Game findFirst
   */
  export type GameFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    /**
     * Filter, which Game to fetch.
     */
    where?: GameWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Games to fetch.
     */
    orderBy?: GameOrderByWithRelationInput | GameOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Games.
     */
    cursor?: GameWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Games from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Games.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Games.
     */
    distinct?: GameScalarFieldEnum | GameScalarFieldEnum[]
  }

  /**
   * Game findFirstOrThrow
   */
  export type GameFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    /**
     * Filter, which Game to fetch.
     */
    where?: GameWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Games to fetch.
     */
    orderBy?: GameOrderByWithRelationInput | GameOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Games.
     */
    cursor?: GameWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Games from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Games.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Games.
     */
    distinct?: GameScalarFieldEnum | GameScalarFieldEnum[]
  }

  /**
   * Game findMany
   */
  export type GameFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    /**
     * Filter, which Games to fetch.
     */
    where?: GameWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Games to fetch.
     */
    orderBy?: GameOrderByWithRelationInput | GameOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Games.
     */
    cursor?: GameWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Games from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Games.
     */
    skip?: number
    distinct?: GameScalarFieldEnum | GameScalarFieldEnum[]
  }

  /**
   * Game create
   */
  export type GameCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    /**
     * The data needed to create a Game.
     */
    data: XOR<GameCreateInput, GameUncheckedCreateInput>
  }

  /**
   * Game createMany
   */
  export type GameCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Games.
     */
    data: GameCreateManyInput | GameCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Game createManyAndReturn
   */
  export type GameCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * The data used to create many Games.
     */
    data: GameCreateManyInput | GameCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Game update
   */
  export type GameUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    /**
     * The data needed to update a Game.
     */
    data: XOR<GameUpdateInput, GameUncheckedUpdateInput>
    /**
     * Choose, which Game to update.
     */
    where: GameWhereUniqueInput
  }

  /**
   * Game updateMany
   */
  export type GameUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Games.
     */
    data: XOR<GameUpdateManyMutationInput, GameUncheckedUpdateManyInput>
    /**
     * Filter which Games to update
     */
    where?: GameWhereInput
    /**
     * Limit how many Games to update.
     */
    limit?: number
  }

  /**
   * Game updateManyAndReturn
   */
  export type GameUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * The data used to update Games.
     */
    data: XOR<GameUpdateManyMutationInput, GameUncheckedUpdateManyInput>
    /**
     * Filter which Games to update
     */
    where?: GameWhereInput
    /**
     * Limit how many Games to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Game upsert
   */
  export type GameUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    /**
     * The filter to search for the Game to update in case it exists.
     */
    where: GameWhereUniqueInput
    /**
     * In case the Game found by the `where` argument doesn't exist, create a new Game with this data.
     */
    create: XOR<GameCreateInput, GameUncheckedCreateInput>
    /**
     * In case the Game was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GameUpdateInput, GameUncheckedUpdateInput>
  }

  /**
   * Game delete
   */
  export type GameDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    /**
     * Filter which Game to delete.
     */
    where: GameWhereUniqueInput
  }

  /**
   * Game deleteMany
   */
  export type GameDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Games to delete
     */
    where?: GameWhereInput
    /**
     * Limit how many Games to delete.
     */
    limit?: number
  }

  /**
   * Game without action
   */
  export type GameDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
  }


  /**
   * Model Team
   */

  export type AggregateTeam = {
    _count: TeamCountAggregateOutputType | null
    _avg: TeamAvgAggregateOutputType | null
    _sum: TeamSumAggregateOutputType | null
    _min: TeamMinAggregateOutputType | null
    _max: TeamMaxAggregateOutputType | null
  }

  export type TeamAvgAggregateOutputType = {
    division: number | null
  }

  export type TeamSumAggregateOutputType = {
    division: number | null
  }

  export type TeamMinAggregateOutputType = {
    id: string | null
    name: string | null
    ageGroupId: string | null
    division: number | null
  }

  export type TeamMaxAggregateOutputType = {
    id: string | null
    name: string | null
    ageGroupId: string | null
    division: number | null
  }

  export type TeamCountAggregateOutputType = {
    id: number
    name: number
    ageGroupId: number
    division: number
    _all: number
  }


  export type TeamAvgAggregateInputType = {
    division?: true
  }

  export type TeamSumAggregateInputType = {
    division?: true
  }

  export type TeamMinAggregateInputType = {
    id?: true
    name?: true
    ageGroupId?: true
    division?: true
  }

  export type TeamMaxAggregateInputType = {
    id?: true
    name?: true
    ageGroupId?: true
    division?: true
  }

  export type TeamCountAggregateInputType = {
    id?: true
    name?: true
    ageGroupId?: true
    division?: true
    _all?: true
  }

  export type TeamAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Team to aggregate.
     */
    where?: TeamWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Teams to fetch.
     */
    orderBy?: TeamOrderByWithRelationInput | TeamOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TeamWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Teams from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Teams.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Teams
    **/
    _count?: true | TeamCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TeamAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TeamSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TeamMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TeamMaxAggregateInputType
  }

  export type GetTeamAggregateType<T extends TeamAggregateArgs> = {
        [P in keyof T & keyof AggregateTeam]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTeam[P]>
      : GetScalarType<T[P], AggregateTeam[P]>
  }




  export type TeamGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TeamWhereInput
    orderBy?: TeamOrderByWithAggregationInput | TeamOrderByWithAggregationInput[]
    by: TeamScalarFieldEnum[] | TeamScalarFieldEnum
    having?: TeamScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TeamCountAggregateInputType | true
    _avg?: TeamAvgAggregateInputType
    _sum?: TeamSumAggregateInputType
    _min?: TeamMinAggregateInputType
    _max?: TeamMaxAggregateInputType
  }

  export type TeamGroupByOutputType = {
    id: string
    name: string
    ageGroupId: string
    division: number | null
    _count: TeamCountAggregateOutputType | null
    _avg: TeamAvgAggregateOutputType | null
    _sum: TeamSumAggregateOutputType | null
    _min: TeamMinAggregateOutputType | null
    _max: TeamMaxAggregateOutputType | null
  }

  type GetTeamGroupByPayload<T extends TeamGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TeamGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TeamGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TeamGroupByOutputType[P]>
            : GetScalarType<T[P], TeamGroupByOutputType[P]>
        }
      >
    >


  export type TeamSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    ageGroupId?: boolean
    division?: boolean
    ageGroup?: boolean | AgeGroupDefaultArgs<ExtArgs>
    lightGames?: boolean | Team$lightGamesArgs<ExtArgs>
    darkGames?: boolean | Team$darkGamesArgs<ExtArgs>
    players?: boolean | Team$playersArgs<ExtArgs>
    _count?: boolean | TeamCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["team"]>

  export type TeamSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    ageGroupId?: boolean
    division?: boolean
    ageGroup?: boolean | AgeGroupDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["team"]>

  export type TeamSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    ageGroupId?: boolean
    division?: boolean
    ageGroup?: boolean | AgeGroupDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["team"]>

  export type TeamSelectScalar = {
    id?: boolean
    name?: boolean
    ageGroupId?: boolean
    division?: boolean
  }

  export type TeamOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "ageGroupId" | "division", ExtArgs["result"]["team"]>
  export type TeamInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ageGroup?: boolean | AgeGroupDefaultArgs<ExtArgs>
    lightGames?: boolean | Team$lightGamesArgs<ExtArgs>
    darkGames?: boolean | Team$darkGamesArgs<ExtArgs>
    players?: boolean | Team$playersArgs<ExtArgs>
    _count?: boolean | TeamCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TeamIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ageGroup?: boolean | AgeGroupDefaultArgs<ExtArgs>
  }
  export type TeamIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ageGroup?: boolean | AgeGroupDefaultArgs<ExtArgs>
  }

  export type $TeamPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Team"
    objects: {
      ageGroup: Prisma.$AgeGroupPayload<ExtArgs>
      lightGames: Prisma.$GamePayload<ExtArgs>[]
      darkGames: Prisma.$GamePayload<ExtArgs>[]
      players: Prisma.$PlayerPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      ageGroupId: string
      division: number | null
    }, ExtArgs["result"]["team"]>
    composites: {}
  }

  type TeamGetPayload<S extends boolean | null | undefined | TeamDefaultArgs> = $Result.GetResult<Prisma.$TeamPayload, S>

  type TeamCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TeamFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TeamCountAggregateInputType | true
    }

  export interface TeamDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Team'], meta: { name: 'Team' } }
    /**
     * Find zero or one Team that matches the filter.
     * @param {TeamFindUniqueArgs} args - Arguments to find a Team
     * @example
     * // Get one Team
     * const team = await prisma.team.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TeamFindUniqueArgs>(args: SelectSubset<T, TeamFindUniqueArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one Team that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TeamFindUniqueOrThrowArgs} args - Arguments to find a Team
     * @example
     * // Get one Team
     * const team = await prisma.team.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TeamFindUniqueOrThrowArgs>(args: SelectSubset<T, TeamFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first Team that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamFindFirstArgs} args - Arguments to find a Team
     * @example
     * // Get one Team
     * const team = await prisma.team.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TeamFindFirstArgs>(args?: SelectSubset<T, TeamFindFirstArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first Team that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamFindFirstOrThrowArgs} args - Arguments to find a Team
     * @example
     * // Get one Team
     * const team = await prisma.team.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TeamFindFirstOrThrowArgs>(args?: SelectSubset<T, TeamFindFirstOrThrowArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more Teams that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Teams
     * const teams = await prisma.team.findMany()
     * 
     * // Get first 10 Teams
     * const teams = await prisma.team.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const teamWithIdOnly = await prisma.team.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TeamFindManyArgs>(args?: SelectSubset<T, TeamFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a Team.
     * @param {TeamCreateArgs} args - Arguments to create a Team.
     * @example
     * // Create one Team
     * const Team = await prisma.team.create({
     *   data: {
     *     // ... data to create a Team
     *   }
     * })
     * 
     */
    create<T extends TeamCreateArgs>(args: SelectSubset<T, TeamCreateArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many Teams.
     * @param {TeamCreateManyArgs} args - Arguments to create many Teams.
     * @example
     * // Create many Teams
     * const team = await prisma.team.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TeamCreateManyArgs>(args?: SelectSubset<T, TeamCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Teams and returns the data saved in the database.
     * @param {TeamCreateManyAndReturnArgs} args - Arguments to create many Teams.
     * @example
     * // Create many Teams
     * const team = await prisma.team.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Teams and only return the `id`
     * const teamWithIdOnly = await prisma.team.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TeamCreateManyAndReturnArgs>(args?: SelectSubset<T, TeamCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a Team.
     * @param {TeamDeleteArgs} args - Arguments to delete one Team.
     * @example
     * // Delete one Team
     * const Team = await prisma.team.delete({
     *   where: {
     *     // ... filter to delete one Team
     *   }
     * })
     * 
     */
    delete<T extends TeamDeleteArgs>(args: SelectSubset<T, TeamDeleteArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one Team.
     * @param {TeamUpdateArgs} args - Arguments to update one Team.
     * @example
     * // Update one Team
     * const team = await prisma.team.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TeamUpdateArgs>(args: SelectSubset<T, TeamUpdateArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more Teams.
     * @param {TeamDeleteManyArgs} args - Arguments to filter Teams to delete.
     * @example
     * // Delete a few Teams
     * const { count } = await prisma.team.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TeamDeleteManyArgs>(args?: SelectSubset<T, TeamDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Teams.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Teams
     * const team = await prisma.team.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TeamUpdateManyArgs>(args: SelectSubset<T, TeamUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Teams and returns the data updated in the database.
     * @param {TeamUpdateManyAndReturnArgs} args - Arguments to update many Teams.
     * @example
     * // Update many Teams
     * const team = await prisma.team.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Teams and only return the `id`
     * const teamWithIdOnly = await prisma.team.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TeamUpdateManyAndReturnArgs>(args: SelectSubset<T, TeamUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one Team.
     * @param {TeamUpsertArgs} args - Arguments to update or create a Team.
     * @example
     * // Update or create a Team
     * const team = await prisma.team.upsert({
     *   create: {
     *     // ... data to create a Team
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Team we want to update
     *   }
     * })
     */
    upsert<T extends TeamUpsertArgs>(args: SelectSubset<T, TeamUpsertArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of Teams.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamCountArgs} args - Arguments to filter Teams to count.
     * @example
     * // Count the number of Teams
     * const count = await prisma.team.count({
     *   where: {
     *     // ... the filter for the Teams we want to count
     *   }
     * })
    **/
    count<T extends TeamCountArgs>(
      args?: Subset<T, TeamCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TeamCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Team.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TeamAggregateArgs>(args: Subset<T, TeamAggregateArgs>): Prisma.PrismaPromise<GetTeamAggregateType<T>>

    /**
     * Group by Team.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TeamGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TeamGroupByArgs['orderBy'] }
        : { orderBy?: TeamGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TeamGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTeamGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Team model
   */
  readonly fields: TeamFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Team.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TeamClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    ageGroup<T extends AgeGroupDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AgeGroupDefaultArgs<ExtArgs>>): Prisma__AgeGroupClient<$Result.GetResult<Prisma.$AgeGroupPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
    lightGames<T extends Team$lightGamesArgs<ExtArgs> = {}>(args?: Subset<T, Team$lightGamesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    darkGames<T extends Team$darkGamesArgs<ExtArgs> = {}>(args?: Subset<T, Team$darkGamesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    players<T extends Team$playersArgs<ExtArgs> = {}>(args?: Subset<T, Team$playersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Team model
   */ 
  interface TeamFieldRefs {
    readonly id: FieldRef<"Team", 'String'>
    readonly name: FieldRef<"Team", 'String'>
    readonly ageGroupId: FieldRef<"Team", 'String'>
    readonly division: FieldRef<"Team", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Team findUnique
   */
  export type TeamFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    /**
     * Filter, which Team to fetch.
     */
    where: TeamWhereUniqueInput
  }

  /**
   * Team findUniqueOrThrow
   */
  export type TeamFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    /**
     * Filter, which Team to fetch.
     */
    where: TeamWhereUniqueInput
  }

  /**
   * Team findFirst
   */
  export type TeamFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    /**
     * Filter, which Team to fetch.
     */
    where?: TeamWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Teams to fetch.
     */
    orderBy?: TeamOrderByWithRelationInput | TeamOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Teams.
     */
    cursor?: TeamWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Teams from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Teams.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Teams.
     */
    distinct?: TeamScalarFieldEnum | TeamScalarFieldEnum[]
  }

  /**
   * Team findFirstOrThrow
   */
  export type TeamFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    /**
     * Filter, which Team to fetch.
     */
    where?: TeamWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Teams to fetch.
     */
    orderBy?: TeamOrderByWithRelationInput | TeamOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Teams.
     */
    cursor?: TeamWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Teams from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Teams.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Teams.
     */
    distinct?: TeamScalarFieldEnum | TeamScalarFieldEnum[]
  }

  /**
   * Team findMany
   */
  export type TeamFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    /**
     * Filter, which Teams to fetch.
     */
    where?: TeamWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Teams to fetch.
     */
    orderBy?: TeamOrderByWithRelationInput | TeamOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Teams.
     */
    cursor?: TeamWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Teams from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Teams.
     */
    skip?: number
    distinct?: TeamScalarFieldEnum | TeamScalarFieldEnum[]
  }

  /**
   * Team create
   */
  export type TeamCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    /**
     * The data needed to create a Team.
     */
    data: XOR<TeamCreateInput, TeamUncheckedCreateInput>
  }

  /**
   * Team createMany
   */
  export type TeamCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Teams.
     */
    data: TeamCreateManyInput | TeamCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Team createManyAndReturn
   */
  export type TeamCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * The data used to create many Teams.
     */
    data: TeamCreateManyInput | TeamCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Team update
   */
  export type TeamUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    /**
     * The data needed to update a Team.
     */
    data: XOR<TeamUpdateInput, TeamUncheckedUpdateInput>
    /**
     * Choose, which Team to update.
     */
    where: TeamWhereUniqueInput
  }

  /**
   * Team updateMany
   */
  export type TeamUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Teams.
     */
    data: XOR<TeamUpdateManyMutationInput, TeamUncheckedUpdateManyInput>
    /**
     * Filter which Teams to update
     */
    where?: TeamWhereInput
    /**
     * Limit how many Teams to update.
     */
    limit?: number
  }

  /**
   * Team updateManyAndReturn
   */
  export type TeamUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * The data used to update Teams.
     */
    data: XOR<TeamUpdateManyMutationInput, TeamUncheckedUpdateManyInput>
    /**
     * Filter which Teams to update
     */
    where?: TeamWhereInput
    /**
     * Limit how many Teams to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Team upsert
   */
  export type TeamUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    /**
     * The filter to search for the Team to update in case it exists.
     */
    where: TeamWhereUniqueInput
    /**
     * In case the Team found by the `where` argument doesn't exist, create a new Team with this data.
     */
    create: XOR<TeamCreateInput, TeamUncheckedCreateInput>
    /**
     * In case the Team was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TeamUpdateInput, TeamUncheckedUpdateInput>
  }

  /**
   * Team delete
   */
  export type TeamDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    /**
     * Filter which Team to delete.
     */
    where: TeamWhereUniqueInput
  }

  /**
   * Team deleteMany
   */
  export type TeamDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Teams to delete
     */
    where?: TeamWhereInput
    /**
     * Limit how many Teams to delete.
     */
    limit?: number
  }

  /**
   * Team.lightGames
   */
  export type Team$lightGamesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    where?: GameWhereInput
    orderBy?: GameOrderByWithRelationInput | GameOrderByWithRelationInput[]
    cursor?: GameWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GameScalarFieldEnum | GameScalarFieldEnum[]
  }

  /**
   * Team.darkGames
   */
  export type Team$darkGamesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    where?: GameWhereInput
    orderBy?: GameOrderByWithRelationInput | GameOrderByWithRelationInput[]
    cursor?: GameWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GameScalarFieldEnum | GameScalarFieldEnum[]
  }

  /**
   * Team.players
   */
  export type Team$playersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Player
     */
    omit?: PlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerInclude<ExtArgs> | null
    where?: PlayerWhereInput
    orderBy?: PlayerOrderByWithRelationInput | PlayerOrderByWithRelationInput[]
    cursor?: PlayerWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PlayerScalarFieldEnum | PlayerScalarFieldEnum[]
  }

  /**
   * Team without action
   */
  export type TeamDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
  }


  /**
   * Model Player
   */

  export type AggregatePlayer = {
    _count: PlayerCountAggregateOutputType | null
    _avg: PlayerAvgAggregateOutputType | null
    _sum: PlayerSumAggregateOutputType | null
    _min: PlayerMinAggregateOutputType | null
    _max: PlayerMaxAggregateOutputType | null
  }

  export type PlayerAvgAggregateOutputType = {
    number: number | null
  }

  export type PlayerSumAggregateOutputType = {
    number: number | null
  }

  export type PlayerMinAggregateOutputType = {
    id: string | null
    firstName: string | null
    lastName: string | null
    number: number | null
    teamId: string | null
    ageGroupId: string | null
  }

  export type PlayerMaxAggregateOutputType = {
    id: string | null
    firstName: string | null
    lastName: string | null
    number: number | null
    teamId: string | null
    ageGroupId: string | null
  }

  export type PlayerCountAggregateOutputType = {
    id: number
    firstName: number
    lastName: number
    number: number
    teamId: number
    ageGroupId: number
    _all: number
  }


  export type PlayerAvgAggregateInputType = {
    number?: true
  }

  export type PlayerSumAggregateInputType = {
    number?: true
  }

  export type PlayerMinAggregateInputType = {
    id?: true
    firstName?: true
    lastName?: true
    number?: true
    teamId?: true
    ageGroupId?: true
  }

  export type PlayerMaxAggregateInputType = {
    id?: true
    firstName?: true
    lastName?: true
    number?: true
    teamId?: true
    ageGroupId?: true
  }

  export type PlayerCountAggregateInputType = {
    id?: true
    firstName?: true
    lastName?: true
    number?: true
    teamId?: true
    ageGroupId?: true
    _all?: true
  }

  export type PlayerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Player to aggregate.
     */
    where?: PlayerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Players to fetch.
     */
    orderBy?: PlayerOrderByWithRelationInput | PlayerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PlayerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Players from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Players.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Players
    **/
    _count?: true | PlayerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PlayerAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PlayerSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PlayerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PlayerMaxAggregateInputType
  }

  export type GetPlayerAggregateType<T extends PlayerAggregateArgs> = {
        [P in keyof T & keyof AggregatePlayer]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePlayer[P]>
      : GetScalarType<T[P], AggregatePlayer[P]>
  }




  export type PlayerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PlayerWhereInput
    orderBy?: PlayerOrderByWithAggregationInput | PlayerOrderByWithAggregationInput[]
    by: PlayerScalarFieldEnum[] | PlayerScalarFieldEnum
    having?: PlayerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PlayerCountAggregateInputType | true
    _avg?: PlayerAvgAggregateInputType
    _sum?: PlayerSumAggregateInputType
    _min?: PlayerMinAggregateInputType
    _max?: PlayerMaxAggregateInputType
  }

  export type PlayerGroupByOutputType = {
    id: string
    firstName: string
    lastName: string
    number: number | null
    teamId: string
    ageGroupId: string
    _count: PlayerCountAggregateOutputType | null
    _avg: PlayerAvgAggregateOutputType | null
    _sum: PlayerSumAggregateOutputType | null
    _min: PlayerMinAggregateOutputType | null
    _max: PlayerMaxAggregateOutputType | null
  }

  type GetPlayerGroupByPayload<T extends PlayerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PlayerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PlayerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PlayerGroupByOutputType[P]>
            : GetScalarType<T[P], PlayerGroupByOutputType[P]>
        }
      >
    >


  export type PlayerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    firstName?: boolean
    lastName?: boolean
    number?: boolean
    teamId?: boolean
    ageGroupId?: boolean
    team?: boolean | TeamDefaultArgs<ExtArgs>
    ageGroup?: boolean | AgeGroupDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["player"]>

  export type PlayerSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    firstName?: boolean
    lastName?: boolean
    number?: boolean
    teamId?: boolean
    ageGroupId?: boolean
    team?: boolean | TeamDefaultArgs<ExtArgs>
    ageGroup?: boolean | AgeGroupDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["player"]>

  export type PlayerSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    firstName?: boolean
    lastName?: boolean
    number?: boolean
    teamId?: boolean
    ageGroupId?: boolean
    team?: boolean | TeamDefaultArgs<ExtArgs>
    ageGroup?: boolean | AgeGroupDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["player"]>

  export type PlayerSelectScalar = {
    id?: boolean
    firstName?: boolean
    lastName?: boolean
    number?: boolean
    teamId?: boolean
    ageGroupId?: boolean
  }

  export type PlayerOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "firstName" | "lastName" | "number" | "teamId" | "ageGroupId", ExtArgs["result"]["player"]>
  export type PlayerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    team?: boolean | TeamDefaultArgs<ExtArgs>
    ageGroup?: boolean | AgeGroupDefaultArgs<ExtArgs>
  }
  export type PlayerIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    team?: boolean | TeamDefaultArgs<ExtArgs>
    ageGroup?: boolean | AgeGroupDefaultArgs<ExtArgs>
  }
  export type PlayerIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    team?: boolean | TeamDefaultArgs<ExtArgs>
    ageGroup?: boolean | AgeGroupDefaultArgs<ExtArgs>
  }

  export type $PlayerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Player"
    objects: {
      team: Prisma.$TeamPayload<ExtArgs>
      ageGroup: Prisma.$AgeGroupPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      firstName: string
      lastName: string
      number: number | null
      teamId: string
      ageGroupId: string
    }, ExtArgs["result"]["player"]>
    composites: {}
  }

  type PlayerGetPayload<S extends boolean | null | undefined | PlayerDefaultArgs> = $Result.GetResult<Prisma.$PlayerPayload, S>

  type PlayerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PlayerFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PlayerCountAggregateInputType | true
    }

  export interface PlayerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Player'], meta: { name: 'Player' } }
    /**
     * Find zero or one Player that matches the filter.
     * @param {PlayerFindUniqueArgs} args - Arguments to find a Player
     * @example
     * // Get one Player
     * const player = await prisma.player.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PlayerFindUniqueArgs>(args: SelectSubset<T, PlayerFindUniqueArgs<ExtArgs>>): Prisma__PlayerClient<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one Player that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PlayerFindUniqueOrThrowArgs} args - Arguments to find a Player
     * @example
     * // Get one Player
     * const player = await prisma.player.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PlayerFindUniqueOrThrowArgs>(args: SelectSubset<T, PlayerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PlayerClient<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first Player that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlayerFindFirstArgs} args - Arguments to find a Player
     * @example
     * // Get one Player
     * const player = await prisma.player.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PlayerFindFirstArgs>(args?: SelectSubset<T, PlayerFindFirstArgs<ExtArgs>>): Prisma__PlayerClient<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first Player that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlayerFindFirstOrThrowArgs} args - Arguments to find a Player
     * @example
     * // Get one Player
     * const player = await prisma.player.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PlayerFindFirstOrThrowArgs>(args?: SelectSubset<T, PlayerFindFirstOrThrowArgs<ExtArgs>>): Prisma__PlayerClient<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more Players that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlayerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Players
     * const players = await prisma.player.findMany()
     * 
     * // Get first 10 Players
     * const players = await prisma.player.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const playerWithIdOnly = await prisma.player.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PlayerFindManyArgs>(args?: SelectSubset<T, PlayerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a Player.
     * @param {PlayerCreateArgs} args - Arguments to create a Player.
     * @example
     * // Create one Player
     * const Player = await prisma.player.create({
     *   data: {
     *     // ... data to create a Player
     *   }
     * })
     * 
     */
    create<T extends PlayerCreateArgs>(args: SelectSubset<T, PlayerCreateArgs<ExtArgs>>): Prisma__PlayerClient<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many Players.
     * @param {PlayerCreateManyArgs} args - Arguments to create many Players.
     * @example
     * // Create many Players
     * const player = await prisma.player.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PlayerCreateManyArgs>(args?: SelectSubset<T, PlayerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Players and returns the data saved in the database.
     * @param {PlayerCreateManyAndReturnArgs} args - Arguments to create many Players.
     * @example
     * // Create many Players
     * const player = await prisma.player.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Players and only return the `id`
     * const playerWithIdOnly = await prisma.player.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PlayerCreateManyAndReturnArgs>(args?: SelectSubset<T, PlayerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a Player.
     * @param {PlayerDeleteArgs} args - Arguments to delete one Player.
     * @example
     * // Delete one Player
     * const Player = await prisma.player.delete({
     *   where: {
     *     // ... filter to delete one Player
     *   }
     * })
     * 
     */
    delete<T extends PlayerDeleteArgs>(args: SelectSubset<T, PlayerDeleteArgs<ExtArgs>>): Prisma__PlayerClient<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one Player.
     * @param {PlayerUpdateArgs} args - Arguments to update one Player.
     * @example
     * // Update one Player
     * const player = await prisma.player.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PlayerUpdateArgs>(args: SelectSubset<T, PlayerUpdateArgs<ExtArgs>>): Prisma__PlayerClient<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more Players.
     * @param {PlayerDeleteManyArgs} args - Arguments to filter Players to delete.
     * @example
     * // Delete a few Players
     * const { count } = await prisma.player.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PlayerDeleteManyArgs>(args?: SelectSubset<T, PlayerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Players.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlayerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Players
     * const player = await prisma.player.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PlayerUpdateManyArgs>(args: SelectSubset<T, PlayerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Players and returns the data updated in the database.
     * @param {PlayerUpdateManyAndReturnArgs} args - Arguments to update many Players.
     * @example
     * // Update many Players
     * const player = await prisma.player.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Players and only return the `id`
     * const playerWithIdOnly = await prisma.player.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PlayerUpdateManyAndReturnArgs>(args: SelectSubset<T, PlayerUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one Player.
     * @param {PlayerUpsertArgs} args - Arguments to update or create a Player.
     * @example
     * // Update or create a Player
     * const player = await prisma.player.upsert({
     *   create: {
     *     // ... data to create a Player
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Player we want to update
     *   }
     * })
     */
    upsert<T extends PlayerUpsertArgs>(args: SelectSubset<T, PlayerUpsertArgs<ExtArgs>>): Prisma__PlayerClient<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of Players.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlayerCountArgs} args - Arguments to filter Players to count.
     * @example
     * // Count the number of Players
     * const count = await prisma.player.count({
     *   where: {
     *     // ... the filter for the Players we want to count
     *   }
     * })
    **/
    count<T extends PlayerCountArgs>(
      args?: Subset<T, PlayerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PlayerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Player.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlayerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PlayerAggregateArgs>(args: Subset<T, PlayerAggregateArgs>): Prisma.PrismaPromise<GetPlayerAggregateType<T>>

    /**
     * Group by Player.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlayerGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PlayerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PlayerGroupByArgs['orderBy'] }
        : { orderBy?: PlayerGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PlayerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPlayerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Player model
   */
  readonly fields: PlayerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Player.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PlayerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    team<T extends TeamDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TeamDefaultArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
    ageGroup<T extends AgeGroupDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AgeGroupDefaultArgs<ExtArgs>>): Prisma__AgeGroupClient<$Result.GetResult<Prisma.$AgeGroupPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Player model
   */ 
  interface PlayerFieldRefs {
    readonly id: FieldRef<"Player", 'String'>
    readonly firstName: FieldRef<"Player", 'String'>
    readonly lastName: FieldRef<"Player", 'String'>
    readonly number: FieldRef<"Player", 'Int'>
    readonly teamId: FieldRef<"Player", 'String'>
    readonly ageGroupId: FieldRef<"Player", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Player findUnique
   */
  export type PlayerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Player
     */
    omit?: PlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerInclude<ExtArgs> | null
    /**
     * Filter, which Player to fetch.
     */
    where: PlayerWhereUniqueInput
  }

  /**
   * Player findUniqueOrThrow
   */
  export type PlayerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Player
     */
    omit?: PlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerInclude<ExtArgs> | null
    /**
     * Filter, which Player to fetch.
     */
    where: PlayerWhereUniqueInput
  }

  /**
   * Player findFirst
   */
  export type PlayerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Player
     */
    omit?: PlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerInclude<ExtArgs> | null
    /**
     * Filter, which Player to fetch.
     */
    where?: PlayerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Players to fetch.
     */
    orderBy?: PlayerOrderByWithRelationInput | PlayerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Players.
     */
    cursor?: PlayerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Players from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Players.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Players.
     */
    distinct?: PlayerScalarFieldEnum | PlayerScalarFieldEnum[]
  }

  /**
   * Player findFirstOrThrow
   */
  export type PlayerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Player
     */
    omit?: PlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerInclude<ExtArgs> | null
    /**
     * Filter, which Player to fetch.
     */
    where?: PlayerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Players to fetch.
     */
    orderBy?: PlayerOrderByWithRelationInput | PlayerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Players.
     */
    cursor?: PlayerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Players from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Players.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Players.
     */
    distinct?: PlayerScalarFieldEnum | PlayerScalarFieldEnum[]
  }

  /**
   * Player findMany
   */
  export type PlayerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Player
     */
    omit?: PlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerInclude<ExtArgs> | null
    /**
     * Filter, which Players to fetch.
     */
    where?: PlayerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Players to fetch.
     */
    orderBy?: PlayerOrderByWithRelationInput | PlayerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Players.
     */
    cursor?: PlayerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Players from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Players.
     */
    skip?: number
    distinct?: PlayerScalarFieldEnum | PlayerScalarFieldEnum[]
  }

  /**
   * Player create
   */
  export type PlayerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Player
     */
    omit?: PlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerInclude<ExtArgs> | null
    /**
     * The data needed to create a Player.
     */
    data: XOR<PlayerCreateInput, PlayerUncheckedCreateInput>
  }

  /**
   * Player createMany
   */
  export type PlayerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Players.
     */
    data: PlayerCreateManyInput | PlayerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Player createManyAndReturn
   */
  export type PlayerCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Player
     */
    omit?: PlayerOmit<ExtArgs> | null
    /**
     * The data used to create many Players.
     */
    data: PlayerCreateManyInput | PlayerCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Player update
   */
  export type PlayerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Player
     */
    omit?: PlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerInclude<ExtArgs> | null
    /**
     * The data needed to update a Player.
     */
    data: XOR<PlayerUpdateInput, PlayerUncheckedUpdateInput>
    /**
     * Choose, which Player to update.
     */
    where: PlayerWhereUniqueInput
  }

  /**
   * Player updateMany
   */
  export type PlayerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Players.
     */
    data: XOR<PlayerUpdateManyMutationInput, PlayerUncheckedUpdateManyInput>
    /**
     * Filter which Players to update
     */
    where?: PlayerWhereInput
    /**
     * Limit how many Players to update.
     */
    limit?: number
  }

  /**
   * Player updateManyAndReturn
   */
  export type PlayerUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Player
     */
    omit?: PlayerOmit<ExtArgs> | null
    /**
     * The data used to update Players.
     */
    data: XOR<PlayerUpdateManyMutationInput, PlayerUncheckedUpdateManyInput>
    /**
     * Filter which Players to update
     */
    where?: PlayerWhereInput
    /**
     * Limit how many Players to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Player upsert
   */
  export type PlayerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Player
     */
    omit?: PlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerInclude<ExtArgs> | null
    /**
     * The filter to search for the Player to update in case it exists.
     */
    where: PlayerWhereUniqueInput
    /**
     * In case the Player found by the `where` argument doesn't exist, create a new Player with this data.
     */
    create: XOR<PlayerCreateInput, PlayerUncheckedCreateInput>
    /**
     * In case the Player was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PlayerUpdateInput, PlayerUncheckedUpdateInput>
  }

  /**
   * Player delete
   */
  export type PlayerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Player
     */
    omit?: PlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerInclude<ExtArgs> | null
    /**
     * Filter which Player to delete.
     */
    where: PlayerWhereUniqueInput
  }

  /**
   * Player deleteMany
   */
  export type PlayerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Players to delete
     */
    where?: PlayerWhereInput
    /**
     * Limit how many Players to delete.
     */
    limit?: number
  }

  /**
   * Player without action
   */
  export type PlayerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Player
     */
    omit?: PlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerInclude<ExtArgs> | null
  }


  /**
   * Model Timeslot
   */

  export type AggregateTimeslot = {
    _count: TimeslotCountAggregateOutputType | null
    _avg: TimeslotAvgAggregateOutputType | null
    _sum: TimeslotSumAggregateOutputType | null
    _min: TimeslotMinAggregateOutputType | null
    _max: TimeslotMaxAggregateOutputType | null
  }

  export type TimeslotAvgAggregateOutputType = {
    court: number | null
  }

  export type TimeslotSumAggregateOutputType = {
    court: number | null
  }

  export type TimeslotMinAggregateOutputType = {
    id: string | null
    location: $Enums.Location | null
    court: number | null
    ageGroupId: string | null
    date: Date | null
  }

  export type TimeslotMaxAggregateOutputType = {
    id: string | null
    location: $Enums.Location | null
    court: number | null
    ageGroupId: string | null
    date: Date | null
  }

  export type TimeslotCountAggregateOutputType = {
    id: number
    location: number
    court: number
    ageGroupId: number
    date: number
    _all: number
  }


  export type TimeslotAvgAggregateInputType = {
    court?: true
  }

  export type TimeslotSumAggregateInputType = {
    court?: true
  }

  export type TimeslotMinAggregateInputType = {
    id?: true
    location?: true
    court?: true
    ageGroupId?: true
    date?: true
  }

  export type TimeslotMaxAggregateInputType = {
    id?: true
    location?: true
    court?: true
    ageGroupId?: true
    date?: true
  }

  export type TimeslotCountAggregateInputType = {
    id?: true
    location?: true
    court?: true
    ageGroupId?: true
    date?: true
    _all?: true
  }

  export type TimeslotAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Timeslot to aggregate.
     */
    where?: TimeslotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Timeslots to fetch.
     */
    orderBy?: TimeslotOrderByWithRelationInput | TimeslotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TimeslotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Timeslots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Timeslots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Timeslots
    **/
    _count?: true | TimeslotCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TimeslotAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TimeslotSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TimeslotMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TimeslotMaxAggregateInputType
  }

  export type GetTimeslotAggregateType<T extends TimeslotAggregateArgs> = {
        [P in keyof T & keyof AggregateTimeslot]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTimeslot[P]>
      : GetScalarType<T[P], AggregateTimeslot[P]>
  }




  export type TimeslotGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TimeslotWhereInput
    orderBy?: TimeslotOrderByWithAggregationInput | TimeslotOrderByWithAggregationInput[]
    by: TimeslotScalarFieldEnum[] | TimeslotScalarFieldEnum
    having?: TimeslotScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TimeslotCountAggregateInputType | true
    _avg?: TimeslotAvgAggregateInputType
    _sum?: TimeslotSumAggregateInputType
    _min?: TimeslotMinAggregateInputType
    _max?: TimeslotMaxAggregateInputType
  }

  export type TimeslotGroupByOutputType = {
    id: string
    location: $Enums.Location
    court: number
    ageGroupId: string | null
    date: Date
    _count: TimeslotCountAggregateOutputType | null
    _avg: TimeslotAvgAggregateOutputType | null
    _sum: TimeslotSumAggregateOutputType | null
    _min: TimeslotMinAggregateOutputType | null
    _max: TimeslotMaxAggregateOutputType | null
  }

  type GetTimeslotGroupByPayload<T extends TimeslotGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TimeslotGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TimeslotGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TimeslotGroupByOutputType[P]>
            : GetScalarType<T[P], TimeslotGroupByOutputType[P]>
        }
      >
    >


  export type TimeslotSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    location?: boolean
    court?: boolean
    ageGroupId?: boolean
    date?: boolean
    ageGroup?: boolean | Timeslot$ageGroupArgs<ExtArgs>
    game?: boolean | Timeslot$gameArgs<ExtArgs>
  }, ExtArgs["result"]["timeslot"]>

  export type TimeslotSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    location?: boolean
    court?: boolean
    ageGroupId?: boolean
    date?: boolean
    ageGroup?: boolean | Timeslot$ageGroupArgs<ExtArgs>
  }, ExtArgs["result"]["timeslot"]>

  export type TimeslotSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    location?: boolean
    court?: boolean
    ageGroupId?: boolean
    date?: boolean
    ageGroup?: boolean | Timeslot$ageGroupArgs<ExtArgs>
  }, ExtArgs["result"]["timeslot"]>

  export type TimeslotSelectScalar = {
    id?: boolean
    location?: boolean
    court?: boolean
    ageGroupId?: boolean
    date?: boolean
  }

  export type TimeslotOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "location" | "court" | "ageGroupId" | "date", ExtArgs["result"]["timeslot"]>
  export type TimeslotInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ageGroup?: boolean | Timeslot$ageGroupArgs<ExtArgs>
    game?: boolean | Timeslot$gameArgs<ExtArgs>
  }
  export type TimeslotIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ageGroup?: boolean | Timeslot$ageGroupArgs<ExtArgs>
  }
  export type TimeslotIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ageGroup?: boolean | Timeslot$ageGroupArgs<ExtArgs>
  }

  export type $TimeslotPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Timeslot"
    objects: {
      ageGroup: Prisma.$AgeGroupPayload<ExtArgs> | null
      game: Prisma.$GamePayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      location: $Enums.Location
      court: number
      ageGroupId: string | null
      date: Date
    }, ExtArgs["result"]["timeslot"]>
    composites: {}
  }

  type TimeslotGetPayload<S extends boolean | null | undefined | TimeslotDefaultArgs> = $Result.GetResult<Prisma.$TimeslotPayload, S>

  type TimeslotCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TimeslotFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TimeslotCountAggregateInputType | true
    }

  export interface TimeslotDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Timeslot'], meta: { name: 'Timeslot' } }
    /**
     * Find zero or one Timeslot that matches the filter.
     * @param {TimeslotFindUniqueArgs} args - Arguments to find a Timeslot
     * @example
     * // Get one Timeslot
     * const timeslot = await prisma.timeslot.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TimeslotFindUniqueArgs>(args: SelectSubset<T, TimeslotFindUniqueArgs<ExtArgs>>): Prisma__TimeslotClient<$Result.GetResult<Prisma.$TimeslotPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one Timeslot that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TimeslotFindUniqueOrThrowArgs} args - Arguments to find a Timeslot
     * @example
     * // Get one Timeslot
     * const timeslot = await prisma.timeslot.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TimeslotFindUniqueOrThrowArgs>(args: SelectSubset<T, TimeslotFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TimeslotClient<$Result.GetResult<Prisma.$TimeslotPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first Timeslot that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimeslotFindFirstArgs} args - Arguments to find a Timeslot
     * @example
     * // Get one Timeslot
     * const timeslot = await prisma.timeslot.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TimeslotFindFirstArgs>(args?: SelectSubset<T, TimeslotFindFirstArgs<ExtArgs>>): Prisma__TimeslotClient<$Result.GetResult<Prisma.$TimeslotPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first Timeslot that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimeslotFindFirstOrThrowArgs} args - Arguments to find a Timeslot
     * @example
     * // Get one Timeslot
     * const timeslot = await prisma.timeslot.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TimeslotFindFirstOrThrowArgs>(args?: SelectSubset<T, TimeslotFindFirstOrThrowArgs<ExtArgs>>): Prisma__TimeslotClient<$Result.GetResult<Prisma.$TimeslotPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more Timeslots that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimeslotFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Timeslots
     * const timeslots = await prisma.timeslot.findMany()
     * 
     * // Get first 10 Timeslots
     * const timeslots = await prisma.timeslot.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const timeslotWithIdOnly = await prisma.timeslot.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TimeslotFindManyArgs>(args?: SelectSubset<T, TimeslotFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TimeslotPayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a Timeslot.
     * @param {TimeslotCreateArgs} args - Arguments to create a Timeslot.
     * @example
     * // Create one Timeslot
     * const Timeslot = await prisma.timeslot.create({
     *   data: {
     *     // ... data to create a Timeslot
     *   }
     * })
     * 
     */
    create<T extends TimeslotCreateArgs>(args: SelectSubset<T, TimeslotCreateArgs<ExtArgs>>): Prisma__TimeslotClient<$Result.GetResult<Prisma.$TimeslotPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many Timeslots.
     * @param {TimeslotCreateManyArgs} args - Arguments to create many Timeslots.
     * @example
     * // Create many Timeslots
     * const timeslot = await prisma.timeslot.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TimeslotCreateManyArgs>(args?: SelectSubset<T, TimeslotCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Timeslots and returns the data saved in the database.
     * @param {TimeslotCreateManyAndReturnArgs} args - Arguments to create many Timeslots.
     * @example
     * // Create many Timeslots
     * const timeslot = await prisma.timeslot.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Timeslots and only return the `id`
     * const timeslotWithIdOnly = await prisma.timeslot.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TimeslotCreateManyAndReturnArgs>(args?: SelectSubset<T, TimeslotCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TimeslotPayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a Timeslot.
     * @param {TimeslotDeleteArgs} args - Arguments to delete one Timeslot.
     * @example
     * // Delete one Timeslot
     * const Timeslot = await prisma.timeslot.delete({
     *   where: {
     *     // ... filter to delete one Timeslot
     *   }
     * })
     * 
     */
    delete<T extends TimeslotDeleteArgs>(args: SelectSubset<T, TimeslotDeleteArgs<ExtArgs>>): Prisma__TimeslotClient<$Result.GetResult<Prisma.$TimeslotPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one Timeslot.
     * @param {TimeslotUpdateArgs} args - Arguments to update one Timeslot.
     * @example
     * // Update one Timeslot
     * const timeslot = await prisma.timeslot.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TimeslotUpdateArgs>(args: SelectSubset<T, TimeslotUpdateArgs<ExtArgs>>): Prisma__TimeslotClient<$Result.GetResult<Prisma.$TimeslotPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more Timeslots.
     * @param {TimeslotDeleteManyArgs} args - Arguments to filter Timeslots to delete.
     * @example
     * // Delete a few Timeslots
     * const { count } = await prisma.timeslot.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TimeslotDeleteManyArgs>(args?: SelectSubset<T, TimeslotDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Timeslots.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimeslotUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Timeslots
     * const timeslot = await prisma.timeslot.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TimeslotUpdateManyArgs>(args: SelectSubset<T, TimeslotUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Timeslots and returns the data updated in the database.
     * @param {TimeslotUpdateManyAndReturnArgs} args - Arguments to update many Timeslots.
     * @example
     * // Update many Timeslots
     * const timeslot = await prisma.timeslot.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Timeslots and only return the `id`
     * const timeslotWithIdOnly = await prisma.timeslot.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TimeslotUpdateManyAndReturnArgs>(args: SelectSubset<T, TimeslotUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TimeslotPayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one Timeslot.
     * @param {TimeslotUpsertArgs} args - Arguments to update or create a Timeslot.
     * @example
     * // Update or create a Timeslot
     * const timeslot = await prisma.timeslot.upsert({
     *   create: {
     *     // ... data to create a Timeslot
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Timeslot we want to update
     *   }
     * })
     */
    upsert<T extends TimeslotUpsertArgs>(args: SelectSubset<T, TimeslotUpsertArgs<ExtArgs>>): Prisma__TimeslotClient<$Result.GetResult<Prisma.$TimeslotPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of Timeslots.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimeslotCountArgs} args - Arguments to filter Timeslots to count.
     * @example
     * // Count the number of Timeslots
     * const count = await prisma.timeslot.count({
     *   where: {
     *     // ... the filter for the Timeslots we want to count
     *   }
     * })
    **/
    count<T extends TimeslotCountArgs>(
      args?: Subset<T, TimeslotCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TimeslotCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Timeslot.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimeslotAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TimeslotAggregateArgs>(args: Subset<T, TimeslotAggregateArgs>): Prisma.PrismaPromise<GetTimeslotAggregateType<T>>

    /**
     * Group by Timeslot.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimeslotGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TimeslotGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TimeslotGroupByArgs['orderBy'] }
        : { orderBy?: TimeslotGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TimeslotGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTimeslotGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Timeslot model
   */
  readonly fields: TimeslotFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Timeslot.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TimeslotClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    ageGroup<T extends Timeslot$ageGroupArgs<ExtArgs> = {}>(args?: Subset<T, Timeslot$ageGroupArgs<ExtArgs>>): Prisma__AgeGroupClient<$Result.GetResult<Prisma.$AgeGroupPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | null, null, ExtArgs, ClientOptions>
    game<T extends Timeslot$gameArgs<ExtArgs> = {}>(args?: Subset<T, Timeslot$gameArgs<ExtArgs>>): Prisma__GameClient<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | null, null, ExtArgs, ClientOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Timeslot model
   */ 
  interface TimeslotFieldRefs {
    readonly id: FieldRef<"Timeslot", 'String'>
    readonly location: FieldRef<"Timeslot", 'Location'>
    readonly court: FieldRef<"Timeslot", 'Int'>
    readonly ageGroupId: FieldRef<"Timeslot", 'String'>
    readonly date: FieldRef<"Timeslot", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Timeslot findUnique
   */
  export type TimeslotFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Timeslot
     */
    select?: TimeslotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Timeslot
     */
    omit?: TimeslotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeslotInclude<ExtArgs> | null
    /**
     * Filter, which Timeslot to fetch.
     */
    where: TimeslotWhereUniqueInput
  }

  /**
   * Timeslot findUniqueOrThrow
   */
  export type TimeslotFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Timeslot
     */
    select?: TimeslotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Timeslot
     */
    omit?: TimeslotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeslotInclude<ExtArgs> | null
    /**
     * Filter, which Timeslot to fetch.
     */
    where: TimeslotWhereUniqueInput
  }

  /**
   * Timeslot findFirst
   */
  export type TimeslotFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Timeslot
     */
    select?: TimeslotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Timeslot
     */
    omit?: TimeslotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeslotInclude<ExtArgs> | null
    /**
     * Filter, which Timeslot to fetch.
     */
    where?: TimeslotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Timeslots to fetch.
     */
    orderBy?: TimeslotOrderByWithRelationInput | TimeslotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Timeslots.
     */
    cursor?: TimeslotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Timeslots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Timeslots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Timeslots.
     */
    distinct?: TimeslotScalarFieldEnum | TimeslotScalarFieldEnum[]
  }

  /**
   * Timeslot findFirstOrThrow
   */
  export type TimeslotFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Timeslot
     */
    select?: TimeslotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Timeslot
     */
    omit?: TimeslotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeslotInclude<ExtArgs> | null
    /**
     * Filter, which Timeslot to fetch.
     */
    where?: TimeslotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Timeslots to fetch.
     */
    orderBy?: TimeslotOrderByWithRelationInput | TimeslotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Timeslots.
     */
    cursor?: TimeslotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Timeslots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Timeslots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Timeslots.
     */
    distinct?: TimeslotScalarFieldEnum | TimeslotScalarFieldEnum[]
  }

  /**
   * Timeslot findMany
   */
  export type TimeslotFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Timeslot
     */
    select?: TimeslotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Timeslot
     */
    omit?: TimeslotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeslotInclude<ExtArgs> | null
    /**
     * Filter, which Timeslots to fetch.
     */
    where?: TimeslotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Timeslots to fetch.
     */
    orderBy?: TimeslotOrderByWithRelationInput | TimeslotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Timeslots.
     */
    cursor?: TimeslotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Timeslots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Timeslots.
     */
    skip?: number
    distinct?: TimeslotScalarFieldEnum | TimeslotScalarFieldEnum[]
  }

  /**
   * Timeslot create
   */
  export type TimeslotCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Timeslot
     */
    select?: TimeslotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Timeslot
     */
    omit?: TimeslotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeslotInclude<ExtArgs> | null
    /**
     * The data needed to create a Timeslot.
     */
    data: XOR<TimeslotCreateInput, TimeslotUncheckedCreateInput>
  }

  /**
   * Timeslot createMany
   */
  export type TimeslotCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Timeslots.
     */
    data: TimeslotCreateManyInput | TimeslotCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Timeslot createManyAndReturn
   */
  export type TimeslotCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Timeslot
     */
    select?: TimeslotSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Timeslot
     */
    omit?: TimeslotOmit<ExtArgs> | null
    /**
     * The data used to create many Timeslots.
     */
    data: TimeslotCreateManyInput | TimeslotCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeslotIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Timeslot update
   */
  export type TimeslotUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Timeslot
     */
    select?: TimeslotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Timeslot
     */
    omit?: TimeslotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeslotInclude<ExtArgs> | null
    /**
     * The data needed to update a Timeslot.
     */
    data: XOR<TimeslotUpdateInput, TimeslotUncheckedUpdateInput>
    /**
     * Choose, which Timeslot to update.
     */
    where: TimeslotWhereUniqueInput
  }

  /**
   * Timeslot updateMany
   */
  export type TimeslotUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Timeslots.
     */
    data: XOR<TimeslotUpdateManyMutationInput, TimeslotUncheckedUpdateManyInput>
    /**
     * Filter which Timeslots to update
     */
    where?: TimeslotWhereInput
    /**
     * Limit how many Timeslots to update.
     */
    limit?: number
  }

  /**
   * Timeslot updateManyAndReturn
   */
  export type TimeslotUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Timeslot
     */
    select?: TimeslotSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Timeslot
     */
    omit?: TimeslotOmit<ExtArgs> | null
    /**
     * The data used to update Timeslots.
     */
    data: XOR<TimeslotUpdateManyMutationInput, TimeslotUncheckedUpdateManyInput>
    /**
     * Filter which Timeslots to update
     */
    where?: TimeslotWhereInput
    /**
     * Limit how many Timeslots to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeslotIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Timeslot upsert
   */
  export type TimeslotUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Timeslot
     */
    select?: TimeslotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Timeslot
     */
    omit?: TimeslotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeslotInclude<ExtArgs> | null
    /**
     * The filter to search for the Timeslot to update in case it exists.
     */
    where: TimeslotWhereUniqueInput
    /**
     * In case the Timeslot found by the `where` argument doesn't exist, create a new Timeslot with this data.
     */
    create: XOR<TimeslotCreateInput, TimeslotUncheckedCreateInput>
    /**
     * In case the Timeslot was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TimeslotUpdateInput, TimeslotUncheckedUpdateInput>
  }

  /**
   * Timeslot delete
   */
  export type TimeslotDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Timeslot
     */
    select?: TimeslotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Timeslot
     */
    omit?: TimeslotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeslotInclude<ExtArgs> | null
    /**
     * Filter which Timeslot to delete.
     */
    where: TimeslotWhereUniqueInput
  }

  /**
   * Timeslot deleteMany
   */
  export type TimeslotDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Timeslots to delete
     */
    where?: TimeslotWhereInput
    /**
     * Limit how many Timeslots to delete.
     */
    limit?: number
  }

  /**
   * Timeslot.ageGroup
   */
  export type Timeslot$ageGroupArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgeGroup
     */
    select?: AgeGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgeGroup
     */
    omit?: AgeGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgeGroupInclude<ExtArgs> | null
    where?: AgeGroupWhereInput
  }

  /**
   * Timeslot.game
   */
  export type Timeslot$gameArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    where?: GameWhereInput
  }

  /**
   * Timeslot without action
   */
  export type TimeslotDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Timeslot
     */
    select?: TimeslotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Timeslot
     */
    omit?: TimeslotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeslotInclude<ExtArgs> | null
  }


  /**
   * Model AgeGroup
   */

  export type AggregateAgeGroup = {
    _count: AgeGroupCountAggregateOutputType | null
    _min: AgeGroupMinAggregateOutputType | null
    _max: AgeGroupMaxAggregateOutputType | null
  }

  export type AgeGroupMinAggregateOutputType = {
    id: string | null
    displayName: string | null
  }

  export type AgeGroupMaxAggregateOutputType = {
    id: string | null
    displayName: string | null
  }

  export type AgeGroupCountAggregateOutputType = {
    id: number
    displayName: number
    _all: number
  }


  export type AgeGroupMinAggregateInputType = {
    id?: true
    displayName?: true
  }

  export type AgeGroupMaxAggregateInputType = {
    id?: true
    displayName?: true
  }

  export type AgeGroupCountAggregateInputType = {
    id?: true
    displayName?: true
    _all?: true
  }

  export type AgeGroupAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AgeGroup to aggregate.
     */
    where?: AgeGroupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AgeGroups to fetch.
     */
    orderBy?: AgeGroupOrderByWithRelationInput | AgeGroupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AgeGroupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AgeGroups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AgeGroups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AgeGroups
    **/
    _count?: true | AgeGroupCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AgeGroupMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AgeGroupMaxAggregateInputType
  }

  export type GetAgeGroupAggregateType<T extends AgeGroupAggregateArgs> = {
        [P in keyof T & keyof AggregateAgeGroup]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAgeGroup[P]>
      : GetScalarType<T[P], AggregateAgeGroup[P]>
  }




  export type AgeGroupGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AgeGroupWhereInput
    orderBy?: AgeGroupOrderByWithAggregationInput | AgeGroupOrderByWithAggregationInput[]
    by: AgeGroupScalarFieldEnum[] | AgeGroupScalarFieldEnum
    having?: AgeGroupScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AgeGroupCountAggregateInputType | true
    _min?: AgeGroupMinAggregateInputType
    _max?: AgeGroupMaxAggregateInputType
  }

  export type AgeGroupGroupByOutputType = {
    id: string
    displayName: string
    _count: AgeGroupCountAggregateOutputType | null
    _min: AgeGroupMinAggregateOutputType | null
    _max: AgeGroupMaxAggregateOutputType | null
  }

  type GetAgeGroupGroupByPayload<T extends AgeGroupGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AgeGroupGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AgeGroupGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AgeGroupGroupByOutputType[P]>
            : GetScalarType<T[P], AgeGroupGroupByOutputType[P]>
        }
      >
    >


  export type AgeGroupSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    displayName?: boolean
    timeslots?: boolean | AgeGroup$timeslotsArgs<ExtArgs>
    players?: boolean | AgeGroup$playersArgs<ExtArgs>
    teams?: boolean | AgeGroup$teamsArgs<ExtArgs>
    _count?: boolean | AgeGroupCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["ageGroup"]>

  export type AgeGroupSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    displayName?: boolean
  }, ExtArgs["result"]["ageGroup"]>

  export type AgeGroupSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    displayName?: boolean
  }, ExtArgs["result"]["ageGroup"]>

  export type AgeGroupSelectScalar = {
    id?: boolean
    displayName?: boolean
  }

  export type AgeGroupOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "displayName", ExtArgs["result"]["ageGroup"]>
  export type AgeGroupInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    timeslots?: boolean | AgeGroup$timeslotsArgs<ExtArgs>
    players?: boolean | AgeGroup$playersArgs<ExtArgs>
    teams?: boolean | AgeGroup$teamsArgs<ExtArgs>
    _count?: boolean | AgeGroupCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type AgeGroupIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type AgeGroupIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $AgeGroupPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AgeGroup"
    objects: {
      timeslots: Prisma.$TimeslotPayload<ExtArgs>[]
      players: Prisma.$PlayerPayload<ExtArgs>[]
      teams: Prisma.$TeamPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      displayName: string
    }, ExtArgs["result"]["ageGroup"]>
    composites: {}
  }

  type AgeGroupGetPayload<S extends boolean | null | undefined | AgeGroupDefaultArgs> = $Result.GetResult<Prisma.$AgeGroupPayload, S>

  type AgeGroupCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AgeGroupFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AgeGroupCountAggregateInputType | true
    }

  export interface AgeGroupDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AgeGroup'], meta: { name: 'AgeGroup' } }
    /**
     * Find zero or one AgeGroup that matches the filter.
     * @param {AgeGroupFindUniqueArgs} args - Arguments to find a AgeGroup
     * @example
     * // Get one AgeGroup
     * const ageGroup = await prisma.ageGroup.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AgeGroupFindUniqueArgs>(args: SelectSubset<T, AgeGroupFindUniqueArgs<ExtArgs>>): Prisma__AgeGroupClient<$Result.GetResult<Prisma.$AgeGroupPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one AgeGroup that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AgeGroupFindUniqueOrThrowArgs} args - Arguments to find a AgeGroup
     * @example
     * // Get one AgeGroup
     * const ageGroup = await prisma.ageGroup.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AgeGroupFindUniqueOrThrowArgs>(args: SelectSubset<T, AgeGroupFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AgeGroupClient<$Result.GetResult<Prisma.$AgeGroupPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first AgeGroup that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgeGroupFindFirstArgs} args - Arguments to find a AgeGroup
     * @example
     * // Get one AgeGroup
     * const ageGroup = await prisma.ageGroup.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AgeGroupFindFirstArgs>(args?: SelectSubset<T, AgeGroupFindFirstArgs<ExtArgs>>): Prisma__AgeGroupClient<$Result.GetResult<Prisma.$AgeGroupPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first AgeGroup that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgeGroupFindFirstOrThrowArgs} args - Arguments to find a AgeGroup
     * @example
     * // Get one AgeGroup
     * const ageGroup = await prisma.ageGroup.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AgeGroupFindFirstOrThrowArgs>(args?: SelectSubset<T, AgeGroupFindFirstOrThrowArgs<ExtArgs>>): Prisma__AgeGroupClient<$Result.GetResult<Prisma.$AgeGroupPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more AgeGroups that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgeGroupFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AgeGroups
     * const ageGroups = await prisma.ageGroup.findMany()
     * 
     * // Get first 10 AgeGroups
     * const ageGroups = await prisma.ageGroup.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const ageGroupWithIdOnly = await prisma.ageGroup.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AgeGroupFindManyArgs>(args?: SelectSubset<T, AgeGroupFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AgeGroupPayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a AgeGroup.
     * @param {AgeGroupCreateArgs} args - Arguments to create a AgeGroup.
     * @example
     * // Create one AgeGroup
     * const AgeGroup = await prisma.ageGroup.create({
     *   data: {
     *     // ... data to create a AgeGroup
     *   }
     * })
     * 
     */
    create<T extends AgeGroupCreateArgs>(args: SelectSubset<T, AgeGroupCreateArgs<ExtArgs>>): Prisma__AgeGroupClient<$Result.GetResult<Prisma.$AgeGroupPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many AgeGroups.
     * @param {AgeGroupCreateManyArgs} args - Arguments to create many AgeGroups.
     * @example
     * // Create many AgeGroups
     * const ageGroup = await prisma.ageGroup.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AgeGroupCreateManyArgs>(args?: SelectSubset<T, AgeGroupCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AgeGroups and returns the data saved in the database.
     * @param {AgeGroupCreateManyAndReturnArgs} args - Arguments to create many AgeGroups.
     * @example
     * // Create many AgeGroups
     * const ageGroup = await prisma.ageGroup.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AgeGroups and only return the `id`
     * const ageGroupWithIdOnly = await prisma.ageGroup.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AgeGroupCreateManyAndReturnArgs>(args?: SelectSubset<T, AgeGroupCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AgeGroupPayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a AgeGroup.
     * @param {AgeGroupDeleteArgs} args - Arguments to delete one AgeGroup.
     * @example
     * // Delete one AgeGroup
     * const AgeGroup = await prisma.ageGroup.delete({
     *   where: {
     *     // ... filter to delete one AgeGroup
     *   }
     * })
     * 
     */
    delete<T extends AgeGroupDeleteArgs>(args: SelectSubset<T, AgeGroupDeleteArgs<ExtArgs>>): Prisma__AgeGroupClient<$Result.GetResult<Prisma.$AgeGroupPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one AgeGroup.
     * @param {AgeGroupUpdateArgs} args - Arguments to update one AgeGroup.
     * @example
     * // Update one AgeGroup
     * const ageGroup = await prisma.ageGroup.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AgeGroupUpdateArgs>(args: SelectSubset<T, AgeGroupUpdateArgs<ExtArgs>>): Prisma__AgeGroupClient<$Result.GetResult<Prisma.$AgeGroupPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more AgeGroups.
     * @param {AgeGroupDeleteManyArgs} args - Arguments to filter AgeGroups to delete.
     * @example
     * // Delete a few AgeGroups
     * const { count } = await prisma.ageGroup.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AgeGroupDeleteManyArgs>(args?: SelectSubset<T, AgeGroupDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AgeGroups.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgeGroupUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AgeGroups
     * const ageGroup = await prisma.ageGroup.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AgeGroupUpdateManyArgs>(args: SelectSubset<T, AgeGroupUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AgeGroups and returns the data updated in the database.
     * @param {AgeGroupUpdateManyAndReturnArgs} args - Arguments to update many AgeGroups.
     * @example
     * // Update many AgeGroups
     * const ageGroup = await prisma.ageGroup.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AgeGroups and only return the `id`
     * const ageGroupWithIdOnly = await prisma.ageGroup.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AgeGroupUpdateManyAndReturnArgs>(args: SelectSubset<T, AgeGroupUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AgeGroupPayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one AgeGroup.
     * @param {AgeGroupUpsertArgs} args - Arguments to update or create a AgeGroup.
     * @example
     * // Update or create a AgeGroup
     * const ageGroup = await prisma.ageGroup.upsert({
     *   create: {
     *     // ... data to create a AgeGroup
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AgeGroup we want to update
     *   }
     * })
     */
    upsert<T extends AgeGroupUpsertArgs>(args: SelectSubset<T, AgeGroupUpsertArgs<ExtArgs>>): Prisma__AgeGroupClient<$Result.GetResult<Prisma.$AgeGroupPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of AgeGroups.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgeGroupCountArgs} args - Arguments to filter AgeGroups to count.
     * @example
     * // Count the number of AgeGroups
     * const count = await prisma.ageGroup.count({
     *   where: {
     *     // ... the filter for the AgeGroups we want to count
     *   }
     * })
    **/
    count<T extends AgeGroupCountArgs>(
      args?: Subset<T, AgeGroupCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AgeGroupCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AgeGroup.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgeGroupAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AgeGroupAggregateArgs>(args: Subset<T, AgeGroupAggregateArgs>): Prisma.PrismaPromise<GetAgeGroupAggregateType<T>>

    /**
     * Group by AgeGroup.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgeGroupGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AgeGroupGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AgeGroupGroupByArgs['orderBy'] }
        : { orderBy?: AgeGroupGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AgeGroupGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAgeGroupGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AgeGroup model
   */
  readonly fields: AgeGroupFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AgeGroup.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AgeGroupClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    timeslots<T extends AgeGroup$timeslotsArgs<ExtArgs> = {}>(args?: Subset<T, AgeGroup$timeslotsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TimeslotPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    players<T extends AgeGroup$playersArgs<ExtArgs> = {}>(args?: Subset<T, AgeGroup$playersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    teams<T extends AgeGroup$teamsArgs<ExtArgs> = {}>(args?: Subset<T, AgeGroup$teamsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AgeGroup model
   */ 
  interface AgeGroupFieldRefs {
    readonly id: FieldRef<"AgeGroup", 'String'>
    readonly displayName: FieldRef<"AgeGroup", 'String'>
  }
    

  // Custom InputTypes
  /**
   * AgeGroup findUnique
   */
  export type AgeGroupFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgeGroup
     */
    select?: AgeGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgeGroup
     */
    omit?: AgeGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgeGroupInclude<ExtArgs> | null
    /**
     * Filter, which AgeGroup to fetch.
     */
    where: AgeGroupWhereUniqueInput
  }

  /**
   * AgeGroup findUniqueOrThrow
   */
  export type AgeGroupFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgeGroup
     */
    select?: AgeGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgeGroup
     */
    omit?: AgeGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgeGroupInclude<ExtArgs> | null
    /**
     * Filter, which AgeGroup to fetch.
     */
    where: AgeGroupWhereUniqueInput
  }

  /**
   * AgeGroup findFirst
   */
  export type AgeGroupFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgeGroup
     */
    select?: AgeGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgeGroup
     */
    omit?: AgeGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgeGroupInclude<ExtArgs> | null
    /**
     * Filter, which AgeGroup to fetch.
     */
    where?: AgeGroupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AgeGroups to fetch.
     */
    orderBy?: AgeGroupOrderByWithRelationInput | AgeGroupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AgeGroups.
     */
    cursor?: AgeGroupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AgeGroups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AgeGroups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AgeGroups.
     */
    distinct?: AgeGroupScalarFieldEnum | AgeGroupScalarFieldEnum[]
  }

  /**
   * AgeGroup findFirstOrThrow
   */
  export type AgeGroupFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgeGroup
     */
    select?: AgeGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgeGroup
     */
    omit?: AgeGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgeGroupInclude<ExtArgs> | null
    /**
     * Filter, which AgeGroup to fetch.
     */
    where?: AgeGroupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AgeGroups to fetch.
     */
    orderBy?: AgeGroupOrderByWithRelationInput | AgeGroupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AgeGroups.
     */
    cursor?: AgeGroupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AgeGroups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AgeGroups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AgeGroups.
     */
    distinct?: AgeGroupScalarFieldEnum | AgeGroupScalarFieldEnum[]
  }

  /**
   * AgeGroup findMany
   */
  export type AgeGroupFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgeGroup
     */
    select?: AgeGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgeGroup
     */
    omit?: AgeGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgeGroupInclude<ExtArgs> | null
    /**
     * Filter, which AgeGroups to fetch.
     */
    where?: AgeGroupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AgeGroups to fetch.
     */
    orderBy?: AgeGroupOrderByWithRelationInput | AgeGroupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AgeGroups.
     */
    cursor?: AgeGroupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AgeGroups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AgeGroups.
     */
    skip?: number
    distinct?: AgeGroupScalarFieldEnum | AgeGroupScalarFieldEnum[]
  }

  /**
   * AgeGroup create
   */
  export type AgeGroupCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgeGroup
     */
    select?: AgeGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgeGroup
     */
    omit?: AgeGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgeGroupInclude<ExtArgs> | null
    /**
     * The data needed to create a AgeGroup.
     */
    data: XOR<AgeGroupCreateInput, AgeGroupUncheckedCreateInput>
  }

  /**
   * AgeGroup createMany
   */
  export type AgeGroupCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AgeGroups.
     */
    data: AgeGroupCreateManyInput | AgeGroupCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AgeGroup createManyAndReturn
   */
  export type AgeGroupCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgeGroup
     */
    select?: AgeGroupSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AgeGroup
     */
    omit?: AgeGroupOmit<ExtArgs> | null
    /**
     * The data used to create many AgeGroups.
     */
    data: AgeGroupCreateManyInput | AgeGroupCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AgeGroup update
   */
  export type AgeGroupUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgeGroup
     */
    select?: AgeGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgeGroup
     */
    omit?: AgeGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgeGroupInclude<ExtArgs> | null
    /**
     * The data needed to update a AgeGroup.
     */
    data: XOR<AgeGroupUpdateInput, AgeGroupUncheckedUpdateInput>
    /**
     * Choose, which AgeGroup to update.
     */
    where: AgeGroupWhereUniqueInput
  }

  /**
   * AgeGroup updateMany
   */
  export type AgeGroupUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AgeGroups.
     */
    data: XOR<AgeGroupUpdateManyMutationInput, AgeGroupUncheckedUpdateManyInput>
    /**
     * Filter which AgeGroups to update
     */
    where?: AgeGroupWhereInput
    /**
     * Limit how many AgeGroups to update.
     */
    limit?: number
  }

  /**
   * AgeGroup updateManyAndReturn
   */
  export type AgeGroupUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgeGroup
     */
    select?: AgeGroupSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AgeGroup
     */
    omit?: AgeGroupOmit<ExtArgs> | null
    /**
     * The data used to update AgeGroups.
     */
    data: XOR<AgeGroupUpdateManyMutationInput, AgeGroupUncheckedUpdateManyInput>
    /**
     * Filter which AgeGroups to update
     */
    where?: AgeGroupWhereInput
    /**
     * Limit how many AgeGroups to update.
     */
    limit?: number
  }

  /**
   * AgeGroup upsert
   */
  export type AgeGroupUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgeGroup
     */
    select?: AgeGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgeGroup
     */
    omit?: AgeGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgeGroupInclude<ExtArgs> | null
    /**
     * The filter to search for the AgeGroup to update in case it exists.
     */
    where: AgeGroupWhereUniqueInput
    /**
     * In case the AgeGroup found by the `where` argument doesn't exist, create a new AgeGroup with this data.
     */
    create: XOR<AgeGroupCreateInput, AgeGroupUncheckedCreateInput>
    /**
     * In case the AgeGroup was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AgeGroupUpdateInput, AgeGroupUncheckedUpdateInput>
  }

  /**
   * AgeGroup delete
   */
  export type AgeGroupDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgeGroup
     */
    select?: AgeGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgeGroup
     */
    omit?: AgeGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgeGroupInclude<ExtArgs> | null
    /**
     * Filter which AgeGroup to delete.
     */
    where: AgeGroupWhereUniqueInput
  }

  /**
   * AgeGroup deleteMany
   */
  export type AgeGroupDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AgeGroups to delete
     */
    where?: AgeGroupWhereInput
    /**
     * Limit how many AgeGroups to delete.
     */
    limit?: number
  }

  /**
   * AgeGroup.timeslots
   */
  export type AgeGroup$timeslotsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Timeslot
     */
    select?: TimeslotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Timeslot
     */
    omit?: TimeslotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeslotInclude<ExtArgs> | null
    where?: TimeslotWhereInput
    orderBy?: TimeslotOrderByWithRelationInput | TimeslotOrderByWithRelationInput[]
    cursor?: TimeslotWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TimeslotScalarFieldEnum | TimeslotScalarFieldEnum[]
  }

  /**
   * AgeGroup.players
   */
  export type AgeGroup$playersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Player
     */
    omit?: PlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerInclude<ExtArgs> | null
    where?: PlayerWhereInput
    orderBy?: PlayerOrderByWithRelationInput | PlayerOrderByWithRelationInput[]
    cursor?: PlayerWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PlayerScalarFieldEnum | PlayerScalarFieldEnum[]
  }

  /**
   * AgeGroup.teams
   */
  export type AgeGroup$teamsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    where?: TeamWhereInput
    orderBy?: TeamOrderByWithRelationInput | TeamOrderByWithRelationInput[]
    cursor?: TeamWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TeamScalarFieldEnum | TeamScalarFieldEnum[]
  }

  /**
   * AgeGroup without action
   */
  export type AgeGroupDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgeGroup
     */
    select?: AgeGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgeGroup
     */
    omit?: AgeGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgeGroupInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const GameScalarFieldEnum: {
    id: 'id',
    lightTeamId: 'lightTeamId',
    darkTeamId: 'darkTeamId',
    lightScore: 'lightScore',
    darkScore: 'darkScore',
    timeslotId: 'timeslotId'
  };

  export type GameScalarFieldEnum = (typeof GameScalarFieldEnum)[keyof typeof GameScalarFieldEnum]


  export const TeamScalarFieldEnum: {
    id: 'id',
    name: 'name',
    ageGroupId: 'ageGroupId',
    division: 'division'
  };

  export type TeamScalarFieldEnum = (typeof TeamScalarFieldEnum)[keyof typeof TeamScalarFieldEnum]


  export const PlayerScalarFieldEnum: {
    id: 'id',
    firstName: 'firstName',
    lastName: 'lastName',
    number: 'number',
    teamId: 'teamId',
    ageGroupId: 'ageGroupId'
  };

  export type PlayerScalarFieldEnum = (typeof PlayerScalarFieldEnum)[keyof typeof PlayerScalarFieldEnum]


  export const TimeslotScalarFieldEnum: {
    id: 'id',
    location: 'location',
    court: 'court',
    ageGroupId: 'ageGroupId',
    date: 'date'
  };

  export type TimeslotScalarFieldEnum = (typeof TimeslotScalarFieldEnum)[keyof typeof TimeslotScalarFieldEnum]


  export const AgeGroupScalarFieldEnum: {
    id: 'id',
    displayName: 'displayName'
  };

  export type AgeGroupScalarFieldEnum = (typeof AgeGroupScalarFieldEnum)[keyof typeof AgeGroupScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Location'
   */
  export type EnumLocationFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Location'>
    


  /**
   * Reference to a field of type 'Location[]'
   */
  export type ListEnumLocationFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Location[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type GameWhereInput = {
    AND?: GameWhereInput | GameWhereInput[]
    OR?: GameWhereInput[]
    NOT?: GameWhereInput | GameWhereInput[]
    id?: StringFilter<"Game"> | string
    lightTeamId?: StringFilter<"Game"> | string
    darkTeamId?: StringFilter<"Game"> | string
    lightScore?: IntFilter<"Game"> | number
    darkScore?: IntFilter<"Game"> | number
    timeslotId?: StringFilter<"Game"> | string
    lightTeam?: XOR<TeamScalarRelationFilter, TeamWhereInput>
    darkTeam?: XOR<TeamScalarRelationFilter, TeamWhereInput>
    timeslot?: XOR<TimeslotScalarRelationFilter, TimeslotWhereInput>
  }

  export type GameOrderByWithRelationInput = {
    id?: SortOrder
    lightTeamId?: SortOrder
    darkTeamId?: SortOrder
    lightScore?: SortOrder
    darkScore?: SortOrder
    timeslotId?: SortOrder
    lightTeam?: TeamOrderByWithRelationInput
    darkTeam?: TeamOrderByWithRelationInput
    timeslot?: TimeslotOrderByWithRelationInput
  }

  export type GameWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    timeslotId?: string
    AND?: GameWhereInput | GameWhereInput[]
    OR?: GameWhereInput[]
    NOT?: GameWhereInput | GameWhereInput[]
    lightTeamId?: StringFilter<"Game"> | string
    darkTeamId?: StringFilter<"Game"> | string
    lightScore?: IntFilter<"Game"> | number
    darkScore?: IntFilter<"Game"> | number
    lightTeam?: XOR<TeamScalarRelationFilter, TeamWhereInput>
    darkTeam?: XOR<TeamScalarRelationFilter, TeamWhereInput>
    timeslot?: XOR<TimeslotScalarRelationFilter, TimeslotWhereInput>
  }, "id" | "timeslotId">

  export type GameOrderByWithAggregationInput = {
    id?: SortOrder
    lightTeamId?: SortOrder
    darkTeamId?: SortOrder
    lightScore?: SortOrder
    darkScore?: SortOrder
    timeslotId?: SortOrder
    _count?: GameCountOrderByAggregateInput
    _avg?: GameAvgOrderByAggregateInput
    _max?: GameMaxOrderByAggregateInput
    _min?: GameMinOrderByAggregateInput
    _sum?: GameSumOrderByAggregateInput
  }

  export type GameScalarWhereWithAggregatesInput = {
    AND?: GameScalarWhereWithAggregatesInput | GameScalarWhereWithAggregatesInput[]
    OR?: GameScalarWhereWithAggregatesInput[]
    NOT?: GameScalarWhereWithAggregatesInput | GameScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Game"> | string
    lightTeamId?: StringWithAggregatesFilter<"Game"> | string
    darkTeamId?: StringWithAggregatesFilter<"Game"> | string
    lightScore?: IntWithAggregatesFilter<"Game"> | number
    darkScore?: IntWithAggregatesFilter<"Game"> | number
    timeslotId?: StringWithAggregatesFilter<"Game"> | string
  }

  export type TeamWhereInput = {
    AND?: TeamWhereInput | TeamWhereInput[]
    OR?: TeamWhereInput[]
    NOT?: TeamWhereInput | TeamWhereInput[]
    id?: StringFilter<"Team"> | string
    name?: StringFilter<"Team"> | string
    ageGroupId?: StringFilter<"Team"> | string
    division?: IntNullableFilter<"Team"> | number | null
    ageGroup?: XOR<AgeGroupScalarRelationFilter, AgeGroupWhereInput>
    lightGames?: GameListRelationFilter
    darkGames?: GameListRelationFilter
    players?: PlayerListRelationFilter
  }

  export type TeamOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    ageGroupId?: SortOrder
    division?: SortOrderInput | SortOrder
    ageGroup?: AgeGroupOrderByWithRelationInput
    lightGames?: GameOrderByRelationAggregateInput
    darkGames?: GameOrderByRelationAggregateInput
    players?: PlayerOrderByRelationAggregateInput
  }

  export type TeamWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TeamWhereInput | TeamWhereInput[]
    OR?: TeamWhereInput[]
    NOT?: TeamWhereInput | TeamWhereInput[]
    name?: StringFilter<"Team"> | string
    ageGroupId?: StringFilter<"Team"> | string
    division?: IntNullableFilter<"Team"> | number | null
    ageGroup?: XOR<AgeGroupScalarRelationFilter, AgeGroupWhereInput>
    lightGames?: GameListRelationFilter
    darkGames?: GameListRelationFilter
    players?: PlayerListRelationFilter
  }, "id">

  export type TeamOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    ageGroupId?: SortOrder
    division?: SortOrderInput | SortOrder
    _count?: TeamCountOrderByAggregateInput
    _avg?: TeamAvgOrderByAggregateInput
    _max?: TeamMaxOrderByAggregateInput
    _min?: TeamMinOrderByAggregateInput
    _sum?: TeamSumOrderByAggregateInput
  }

  export type TeamScalarWhereWithAggregatesInput = {
    AND?: TeamScalarWhereWithAggregatesInput | TeamScalarWhereWithAggregatesInput[]
    OR?: TeamScalarWhereWithAggregatesInput[]
    NOT?: TeamScalarWhereWithAggregatesInput | TeamScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Team"> | string
    name?: StringWithAggregatesFilter<"Team"> | string
    ageGroupId?: StringWithAggregatesFilter<"Team"> | string
    division?: IntNullableWithAggregatesFilter<"Team"> | number | null
  }

  export type PlayerWhereInput = {
    AND?: PlayerWhereInput | PlayerWhereInput[]
    OR?: PlayerWhereInput[]
    NOT?: PlayerWhereInput | PlayerWhereInput[]
    id?: StringFilter<"Player"> | string
    firstName?: StringFilter<"Player"> | string
    lastName?: StringFilter<"Player"> | string
    number?: IntNullableFilter<"Player"> | number | null
    teamId?: StringFilter<"Player"> | string
    ageGroupId?: StringFilter<"Player"> | string
    team?: XOR<TeamScalarRelationFilter, TeamWhereInput>
    ageGroup?: XOR<AgeGroupScalarRelationFilter, AgeGroupWhereInput>
  }

  export type PlayerOrderByWithRelationInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    number?: SortOrderInput | SortOrder
    teamId?: SortOrder
    ageGroupId?: SortOrder
    team?: TeamOrderByWithRelationInput
    ageGroup?: AgeGroupOrderByWithRelationInput
  }

  export type PlayerWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PlayerWhereInput | PlayerWhereInput[]
    OR?: PlayerWhereInput[]
    NOT?: PlayerWhereInput | PlayerWhereInput[]
    firstName?: StringFilter<"Player"> | string
    lastName?: StringFilter<"Player"> | string
    number?: IntNullableFilter<"Player"> | number | null
    teamId?: StringFilter<"Player"> | string
    ageGroupId?: StringFilter<"Player"> | string
    team?: XOR<TeamScalarRelationFilter, TeamWhereInput>
    ageGroup?: XOR<AgeGroupScalarRelationFilter, AgeGroupWhereInput>
  }, "id">

  export type PlayerOrderByWithAggregationInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    number?: SortOrderInput | SortOrder
    teamId?: SortOrder
    ageGroupId?: SortOrder
    _count?: PlayerCountOrderByAggregateInput
    _avg?: PlayerAvgOrderByAggregateInput
    _max?: PlayerMaxOrderByAggregateInput
    _min?: PlayerMinOrderByAggregateInput
    _sum?: PlayerSumOrderByAggregateInput
  }

  export type PlayerScalarWhereWithAggregatesInput = {
    AND?: PlayerScalarWhereWithAggregatesInput | PlayerScalarWhereWithAggregatesInput[]
    OR?: PlayerScalarWhereWithAggregatesInput[]
    NOT?: PlayerScalarWhereWithAggregatesInput | PlayerScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Player"> | string
    firstName?: StringWithAggregatesFilter<"Player"> | string
    lastName?: StringWithAggregatesFilter<"Player"> | string
    number?: IntNullableWithAggregatesFilter<"Player"> | number | null
    teamId?: StringWithAggregatesFilter<"Player"> | string
    ageGroupId?: StringWithAggregatesFilter<"Player"> | string
  }

  export type TimeslotWhereInput = {
    AND?: TimeslotWhereInput | TimeslotWhereInput[]
    OR?: TimeslotWhereInput[]
    NOT?: TimeslotWhereInput | TimeslotWhereInput[]
    id?: StringFilter<"Timeslot"> | string
    location?: EnumLocationFilter<"Timeslot"> | $Enums.Location
    court?: IntFilter<"Timeslot"> | number
    ageGroupId?: StringNullableFilter<"Timeslot"> | string | null
    date?: DateTimeFilter<"Timeslot"> | Date | string
    ageGroup?: XOR<AgeGroupNullableScalarRelationFilter, AgeGroupWhereInput> | null
    game?: XOR<GameNullableScalarRelationFilter, GameWhereInput> | null
  }

  export type TimeslotOrderByWithRelationInput = {
    id?: SortOrder
    location?: SortOrder
    court?: SortOrder
    ageGroupId?: SortOrderInput | SortOrder
    date?: SortOrder
    ageGroup?: AgeGroupOrderByWithRelationInput
    game?: GameOrderByWithRelationInput
  }

  export type TimeslotWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    location_date_court?: TimeslotLocationDateCourtCompoundUniqueInput
    AND?: TimeslotWhereInput | TimeslotWhereInput[]
    OR?: TimeslotWhereInput[]
    NOT?: TimeslotWhereInput | TimeslotWhereInput[]
    location?: EnumLocationFilter<"Timeslot"> | $Enums.Location
    court?: IntFilter<"Timeslot"> | number
    ageGroupId?: StringNullableFilter<"Timeslot"> | string | null
    date?: DateTimeFilter<"Timeslot"> | Date | string
    ageGroup?: XOR<AgeGroupNullableScalarRelationFilter, AgeGroupWhereInput> | null
    game?: XOR<GameNullableScalarRelationFilter, GameWhereInput> | null
  }, "id" | "location_date_court">

  export type TimeslotOrderByWithAggregationInput = {
    id?: SortOrder
    location?: SortOrder
    court?: SortOrder
    ageGroupId?: SortOrderInput | SortOrder
    date?: SortOrder
    _count?: TimeslotCountOrderByAggregateInput
    _avg?: TimeslotAvgOrderByAggregateInput
    _max?: TimeslotMaxOrderByAggregateInput
    _min?: TimeslotMinOrderByAggregateInput
    _sum?: TimeslotSumOrderByAggregateInput
  }

  export type TimeslotScalarWhereWithAggregatesInput = {
    AND?: TimeslotScalarWhereWithAggregatesInput | TimeslotScalarWhereWithAggregatesInput[]
    OR?: TimeslotScalarWhereWithAggregatesInput[]
    NOT?: TimeslotScalarWhereWithAggregatesInput | TimeslotScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Timeslot"> | string
    location?: EnumLocationWithAggregatesFilter<"Timeslot"> | $Enums.Location
    court?: IntWithAggregatesFilter<"Timeslot"> | number
    ageGroupId?: StringNullableWithAggregatesFilter<"Timeslot"> | string | null
    date?: DateTimeWithAggregatesFilter<"Timeslot"> | Date | string
  }

  export type AgeGroupWhereInput = {
    AND?: AgeGroupWhereInput | AgeGroupWhereInput[]
    OR?: AgeGroupWhereInput[]
    NOT?: AgeGroupWhereInput | AgeGroupWhereInput[]
    id?: StringFilter<"AgeGroup"> | string
    displayName?: StringFilter<"AgeGroup"> | string
    timeslots?: TimeslotListRelationFilter
    players?: PlayerListRelationFilter
    teams?: TeamListRelationFilter
  }

  export type AgeGroupOrderByWithRelationInput = {
    id?: SortOrder
    displayName?: SortOrder
    timeslots?: TimeslotOrderByRelationAggregateInput
    players?: PlayerOrderByRelationAggregateInput
    teams?: TeamOrderByRelationAggregateInput
  }

  export type AgeGroupWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    displayName?: string
    AND?: AgeGroupWhereInput | AgeGroupWhereInput[]
    OR?: AgeGroupWhereInput[]
    NOT?: AgeGroupWhereInput | AgeGroupWhereInput[]
    timeslots?: TimeslotListRelationFilter
    players?: PlayerListRelationFilter
    teams?: TeamListRelationFilter
  }, "id" | "displayName">

  export type AgeGroupOrderByWithAggregationInput = {
    id?: SortOrder
    displayName?: SortOrder
    _count?: AgeGroupCountOrderByAggregateInput
    _max?: AgeGroupMaxOrderByAggregateInput
    _min?: AgeGroupMinOrderByAggregateInput
  }

  export type AgeGroupScalarWhereWithAggregatesInput = {
    AND?: AgeGroupScalarWhereWithAggregatesInput | AgeGroupScalarWhereWithAggregatesInput[]
    OR?: AgeGroupScalarWhereWithAggregatesInput[]
    NOT?: AgeGroupScalarWhereWithAggregatesInput | AgeGroupScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AgeGroup"> | string
    displayName?: StringWithAggregatesFilter<"AgeGroup"> | string
  }

  export type GameCreateInput = {
    id?: string
    lightScore: number
    darkScore: number
    lightTeam: TeamCreateNestedOneWithoutDarkGamesInput
    darkTeam: TeamCreateNestedOneWithoutLightGamesInput
    timeslot: TimeslotCreateNestedOneWithoutGameInput
  }

  export type GameUncheckedCreateInput = {
    id?: string
    lightTeamId: string
    darkTeamId: string
    lightScore: number
    darkScore: number
    timeslotId: string
  }

  export type GameUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    lightScore?: IntFieldUpdateOperationsInput | number
    darkScore?: IntFieldUpdateOperationsInput | number
    lightTeam?: TeamUpdateOneRequiredWithoutDarkGamesNestedInput
    darkTeam?: TeamUpdateOneRequiredWithoutLightGamesNestedInput
    timeslot?: TimeslotUpdateOneRequiredWithoutGameNestedInput
  }

  export type GameUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    lightTeamId?: StringFieldUpdateOperationsInput | string
    darkTeamId?: StringFieldUpdateOperationsInput | string
    lightScore?: IntFieldUpdateOperationsInput | number
    darkScore?: IntFieldUpdateOperationsInput | number
    timeslotId?: StringFieldUpdateOperationsInput | string
  }

  export type GameCreateManyInput = {
    id?: string
    lightTeamId: string
    darkTeamId: string
    lightScore: number
    darkScore: number
    timeslotId: string
  }

  export type GameUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    lightScore?: IntFieldUpdateOperationsInput | number
    darkScore?: IntFieldUpdateOperationsInput | number
  }

  export type GameUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    lightTeamId?: StringFieldUpdateOperationsInput | string
    darkTeamId?: StringFieldUpdateOperationsInput | string
    lightScore?: IntFieldUpdateOperationsInput | number
    darkScore?: IntFieldUpdateOperationsInput | number
    timeslotId?: StringFieldUpdateOperationsInput | string
  }

  export type TeamCreateInput = {
    id?: string
    name: string
    division?: number | null
    ageGroup: AgeGroupCreateNestedOneWithoutTeamsInput
    lightGames?: GameCreateNestedManyWithoutDarkTeamInput
    darkGames?: GameCreateNestedManyWithoutLightTeamInput
    players?: PlayerCreateNestedManyWithoutTeamInput
  }

  export type TeamUncheckedCreateInput = {
    id?: string
    name: string
    ageGroupId: string
    division?: number | null
    lightGames?: GameUncheckedCreateNestedManyWithoutDarkTeamInput
    darkGames?: GameUncheckedCreateNestedManyWithoutLightTeamInput
    players?: PlayerUncheckedCreateNestedManyWithoutTeamInput
  }

  export type TeamUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    division?: NullableIntFieldUpdateOperationsInput | number | null
    ageGroup?: AgeGroupUpdateOneRequiredWithoutTeamsNestedInput
    lightGames?: GameUpdateManyWithoutDarkTeamNestedInput
    darkGames?: GameUpdateManyWithoutLightTeamNestedInput
    players?: PlayerUpdateManyWithoutTeamNestedInput
  }

  export type TeamUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    ageGroupId?: StringFieldUpdateOperationsInput | string
    division?: NullableIntFieldUpdateOperationsInput | number | null
    lightGames?: GameUncheckedUpdateManyWithoutDarkTeamNestedInput
    darkGames?: GameUncheckedUpdateManyWithoutLightTeamNestedInput
    players?: PlayerUncheckedUpdateManyWithoutTeamNestedInput
  }

  export type TeamCreateManyInput = {
    id?: string
    name: string
    ageGroupId: string
    division?: number | null
  }

  export type TeamUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    division?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type TeamUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    ageGroupId?: StringFieldUpdateOperationsInput | string
    division?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type PlayerCreateInput = {
    id?: string
    firstName: string
    lastName: string
    number?: number | null
    team: TeamCreateNestedOneWithoutPlayersInput
    ageGroup: AgeGroupCreateNestedOneWithoutPlayersInput
  }

  export type PlayerUncheckedCreateInput = {
    id?: string
    firstName: string
    lastName: string
    number?: number | null
    teamId: string
    ageGroupId: string
  }

  export type PlayerUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    number?: NullableIntFieldUpdateOperationsInput | number | null
    team?: TeamUpdateOneRequiredWithoutPlayersNestedInput
    ageGroup?: AgeGroupUpdateOneRequiredWithoutPlayersNestedInput
  }

  export type PlayerUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    number?: NullableIntFieldUpdateOperationsInput | number | null
    teamId?: StringFieldUpdateOperationsInput | string
    ageGroupId?: StringFieldUpdateOperationsInput | string
  }

  export type PlayerCreateManyInput = {
    id?: string
    firstName: string
    lastName: string
    number?: number | null
    teamId: string
    ageGroupId: string
  }

  export type PlayerUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    number?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type PlayerUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    number?: NullableIntFieldUpdateOperationsInput | number | null
    teamId?: StringFieldUpdateOperationsInput | string
    ageGroupId?: StringFieldUpdateOperationsInput | string
  }

  export type TimeslotCreateInput = {
    id?: string
    location: $Enums.Location
    court: number
    date: Date | string
    ageGroup?: AgeGroupCreateNestedOneWithoutTimeslotsInput
    game?: GameCreateNestedOneWithoutTimeslotInput
  }

  export type TimeslotUncheckedCreateInput = {
    id?: string
    location: $Enums.Location
    court: number
    ageGroupId?: string | null
    date: Date | string
    game?: GameUncheckedCreateNestedOneWithoutTimeslotInput
  }

  export type TimeslotUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    location?: EnumLocationFieldUpdateOperationsInput | $Enums.Location
    court?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    ageGroup?: AgeGroupUpdateOneWithoutTimeslotsNestedInput
    game?: GameUpdateOneWithoutTimeslotNestedInput
  }

  export type TimeslotUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    location?: EnumLocationFieldUpdateOperationsInput | $Enums.Location
    court?: IntFieldUpdateOperationsInput | number
    ageGroupId?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    game?: GameUncheckedUpdateOneWithoutTimeslotNestedInput
  }

  export type TimeslotCreateManyInput = {
    id?: string
    location: $Enums.Location
    court: number
    ageGroupId?: string | null
    date: Date | string
  }

  export type TimeslotUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    location?: EnumLocationFieldUpdateOperationsInput | $Enums.Location
    court?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TimeslotUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    location?: EnumLocationFieldUpdateOperationsInput | $Enums.Location
    court?: IntFieldUpdateOperationsInput | number
    ageGroupId?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AgeGroupCreateInput = {
    id?: string
    displayName: string
    timeslots?: TimeslotCreateNestedManyWithoutAgeGroupInput
    players?: PlayerCreateNestedManyWithoutAgeGroupInput
    teams?: TeamCreateNestedManyWithoutAgeGroupInput
  }

  export type AgeGroupUncheckedCreateInput = {
    id?: string
    displayName: string
    timeslots?: TimeslotUncheckedCreateNestedManyWithoutAgeGroupInput
    players?: PlayerUncheckedCreateNestedManyWithoutAgeGroupInput
    teams?: TeamUncheckedCreateNestedManyWithoutAgeGroupInput
  }

  export type AgeGroupUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    timeslots?: TimeslotUpdateManyWithoutAgeGroupNestedInput
    players?: PlayerUpdateManyWithoutAgeGroupNestedInput
    teams?: TeamUpdateManyWithoutAgeGroupNestedInput
  }

  export type AgeGroupUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    timeslots?: TimeslotUncheckedUpdateManyWithoutAgeGroupNestedInput
    players?: PlayerUncheckedUpdateManyWithoutAgeGroupNestedInput
    teams?: TeamUncheckedUpdateManyWithoutAgeGroupNestedInput
  }

  export type AgeGroupCreateManyInput = {
    id?: string
    displayName: string
  }

  export type AgeGroupUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
  }

  export type AgeGroupUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type TeamScalarRelationFilter = {
    is?: TeamWhereInput
    isNot?: TeamWhereInput
  }

  export type TimeslotScalarRelationFilter = {
    is?: TimeslotWhereInput
    isNot?: TimeslotWhereInput
  }

  export type GameCountOrderByAggregateInput = {
    id?: SortOrder
    lightTeamId?: SortOrder
    darkTeamId?: SortOrder
    lightScore?: SortOrder
    darkScore?: SortOrder
    timeslotId?: SortOrder
  }

  export type GameAvgOrderByAggregateInput = {
    lightScore?: SortOrder
    darkScore?: SortOrder
  }

  export type GameMaxOrderByAggregateInput = {
    id?: SortOrder
    lightTeamId?: SortOrder
    darkTeamId?: SortOrder
    lightScore?: SortOrder
    darkScore?: SortOrder
    timeslotId?: SortOrder
  }

  export type GameMinOrderByAggregateInput = {
    id?: SortOrder
    lightTeamId?: SortOrder
    darkTeamId?: SortOrder
    lightScore?: SortOrder
    darkScore?: SortOrder
    timeslotId?: SortOrder
  }

  export type GameSumOrderByAggregateInput = {
    lightScore?: SortOrder
    darkScore?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type AgeGroupScalarRelationFilter = {
    is?: AgeGroupWhereInput
    isNot?: AgeGroupWhereInput
  }

  export type GameListRelationFilter = {
    every?: GameWhereInput
    some?: GameWhereInput
    none?: GameWhereInput
  }

  export type PlayerListRelationFilter = {
    every?: PlayerWhereInput
    some?: PlayerWhereInput
    none?: PlayerWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type GameOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PlayerOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TeamCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    ageGroupId?: SortOrder
    division?: SortOrder
  }

  export type TeamAvgOrderByAggregateInput = {
    division?: SortOrder
  }

  export type TeamMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    ageGroupId?: SortOrder
    division?: SortOrder
  }

  export type TeamMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    ageGroupId?: SortOrder
    division?: SortOrder
  }

  export type TeamSumOrderByAggregateInput = {
    division?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type PlayerCountOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    number?: SortOrder
    teamId?: SortOrder
    ageGroupId?: SortOrder
  }

  export type PlayerAvgOrderByAggregateInput = {
    number?: SortOrder
  }

  export type PlayerMaxOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    number?: SortOrder
    teamId?: SortOrder
    ageGroupId?: SortOrder
  }

  export type PlayerMinOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    number?: SortOrder
    teamId?: SortOrder
    ageGroupId?: SortOrder
  }

  export type PlayerSumOrderByAggregateInput = {
    number?: SortOrder
  }

  export type EnumLocationFilter<$PrismaModel = never> = {
    equals?: $Enums.Location | EnumLocationFieldRefInput<$PrismaModel>
    in?: $Enums.Location[] | ListEnumLocationFieldRefInput<$PrismaModel>
    notIn?: $Enums.Location[] | ListEnumLocationFieldRefInput<$PrismaModel>
    not?: NestedEnumLocationFilter<$PrismaModel> | $Enums.Location
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type AgeGroupNullableScalarRelationFilter = {
    is?: AgeGroupWhereInput | null
    isNot?: AgeGroupWhereInput | null
  }

  export type GameNullableScalarRelationFilter = {
    is?: GameWhereInput | null
    isNot?: GameWhereInput | null
  }

  export type TimeslotLocationDateCourtCompoundUniqueInput = {
    location: $Enums.Location
    date: Date | string
    court: number
  }

  export type TimeslotCountOrderByAggregateInput = {
    id?: SortOrder
    location?: SortOrder
    court?: SortOrder
    ageGroupId?: SortOrder
    date?: SortOrder
  }

  export type TimeslotAvgOrderByAggregateInput = {
    court?: SortOrder
  }

  export type TimeslotMaxOrderByAggregateInput = {
    id?: SortOrder
    location?: SortOrder
    court?: SortOrder
    ageGroupId?: SortOrder
    date?: SortOrder
  }

  export type TimeslotMinOrderByAggregateInput = {
    id?: SortOrder
    location?: SortOrder
    court?: SortOrder
    ageGroupId?: SortOrder
    date?: SortOrder
  }

  export type TimeslotSumOrderByAggregateInput = {
    court?: SortOrder
  }

  export type EnumLocationWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Location | EnumLocationFieldRefInput<$PrismaModel>
    in?: $Enums.Location[] | ListEnumLocationFieldRefInput<$PrismaModel>
    notIn?: $Enums.Location[] | ListEnumLocationFieldRefInput<$PrismaModel>
    not?: NestedEnumLocationWithAggregatesFilter<$PrismaModel> | $Enums.Location
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumLocationFilter<$PrismaModel>
    _max?: NestedEnumLocationFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type TimeslotListRelationFilter = {
    every?: TimeslotWhereInput
    some?: TimeslotWhereInput
    none?: TimeslotWhereInput
  }

  export type TeamListRelationFilter = {
    every?: TeamWhereInput
    some?: TeamWhereInput
    none?: TeamWhereInput
  }

  export type TimeslotOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TeamOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AgeGroupCountOrderByAggregateInput = {
    id?: SortOrder
    displayName?: SortOrder
  }

  export type AgeGroupMaxOrderByAggregateInput = {
    id?: SortOrder
    displayName?: SortOrder
  }

  export type AgeGroupMinOrderByAggregateInput = {
    id?: SortOrder
    displayName?: SortOrder
  }

  export type TeamCreateNestedOneWithoutDarkGamesInput = {
    create?: XOR<TeamCreateWithoutDarkGamesInput, TeamUncheckedCreateWithoutDarkGamesInput>
    connectOrCreate?: TeamCreateOrConnectWithoutDarkGamesInput
    connect?: TeamWhereUniqueInput
  }

  export type TeamCreateNestedOneWithoutLightGamesInput = {
    create?: XOR<TeamCreateWithoutLightGamesInput, TeamUncheckedCreateWithoutLightGamesInput>
    connectOrCreate?: TeamCreateOrConnectWithoutLightGamesInput
    connect?: TeamWhereUniqueInput
  }

  export type TimeslotCreateNestedOneWithoutGameInput = {
    create?: XOR<TimeslotCreateWithoutGameInput, TimeslotUncheckedCreateWithoutGameInput>
    connectOrCreate?: TimeslotCreateOrConnectWithoutGameInput
    connect?: TimeslotWhereUniqueInput
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type TeamUpdateOneRequiredWithoutDarkGamesNestedInput = {
    create?: XOR<TeamCreateWithoutDarkGamesInput, TeamUncheckedCreateWithoutDarkGamesInput>
    connectOrCreate?: TeamCreateOrConnectWithoutDarkGamesInput
    upsert?: TeamUpsertWithoutDarkGamesInput
    connect?: TeamWhereUniqueInput
    update?: XOR<XOR<TeamUpdateToOneWithWhereWithoutDarkGamesInput, TeamUpdateWithoutDarkGamesInput>, TeamUncheckedUpdateWithoutDarkGamesInput>
  }

  export type TeamUpdateOneRequiredWithoutLightGamesNestedInput = {
    create?: XOR<TeamCreateWithoutLightGamesInput, TeamUncheckedCreateWithoutLightGamesInput>
    connectOrCreate?: TeamCreateOrConnectWithoutLightGamesInput
    upsert?: TeamUpsertWithoutLightGamesInput
    connect?: TeamWhereUniqueInput
    update?: XOR<XOR<TeamUpdateToOneWithWhereWithoutLightGamesInput, TeamUpdateWithoutLightGamesInput>, TeamUncheckedUpdateWithoutLightGamesInput>
  }

  export type TimeslotUpdateOneRequiredWithoutGameNestedInput = {
    create?: XOR<TimeslotCreateWithoutGameInput, TimeslotUncheckedCreateWithoutGameInput>
    connectOrCreate?: TimeslotCreateOrConnectWithoutGameInput
    upsert?: TimeslotUpsertWithoutGameInput
    connect?: TimeslotWhereUniqueInput
    update?: XOR<XOR<TimeslotUpdateToOneWithWhereWithoutGameInput, TimeslotUpdateWithoutGameInput>, TimeslotUncheckedUpdateWithoutGameInput>
  }

  export type AgeGroupCreateNestedOneWithoutTeamsInput = {
    create?: XOR<AgeGroupCreateWithoutTeamsInput, AgeGroupUncheckedCreateWithoutTeamsInput>
    connectOrCreate?: AgeGroupCreateOrConnectWithoutTeamsInput
    connect?: AgeGroupWhereUniqueInput
  }

  export type GameCreateNestedManyWithoutDarkTeamInput = {
    create?: XOR<GameCreateWithoutDarkTeamInput, GameUncheckedCreateWithoutDarkTeamInput> | GameCreateWithoutDarkTeamInput[] | GameUncheckedCreateWithoutDarkTeamInput[]
    connectOrCreate?: GameCreateOrConnectWithoutDarkTeamInput | GameCreateOrConnectWithoutDarkTeamInput[]
    createMany?: GameCreateManyDarkTeamInputEnvelope
    connect?: GameWhereUniqueInput | GameWhereUniqueInput[]
  }

  export type GameCreateNestedManyWithoutLightTeamInput = {
    create?: XOR<GameCreateWithoutLightTeamInput, GameUncheckedCreateWithoutLightTeamInput> | GameCreateWithoutLightTeamInput[] | GameUncheckedCreateWithoutLightTeamInput[]
    connectOrCreate?: GameCreateOrConnectWithoutLightTeamInput | GameCreateOrConnectWithoutLightTeamInput[]
    createMany?: GameCreateManyLightTeamInputEnvelope
    connect?: GameWhereUniqueInput | GameWhereUniqueInput[]
  }

  export type PlayerCreateNestedManyWithoutTeamInput = {
    create?: XOR<PlayerCreateWithoutTeamInput, PlayerUncheckedCreateWithoutTeamInput> | PlayerCreateWithoutTeamInput[] | PlayerUncheckedCreateWithoutTeamInput[]
    connectOrCreate?: PlayerCreateOrConnectWithoutTeamInput | PlayerCreateOrConnectWithoutTeamInput[]
    createMany?: PlayerCreateManyTeamInputEnvelope
    connect?: PlayerWhereUniqueInput | PlayerWhereUniqueInput[]
  }

  export type GameUncheckedCreateNestedManyWithoutDarkTeamInput = {
    create?: XOR<GameCreateWithoutDarkTeamInput, GameUncheckedCreateWithoutDarkTeamInput> | GameCreateWithoutDarkTeamInput[] | GameUncheckedCreateWithoutDarkTeamInput[]
    connectOrCreate?: GameCreateOrConnectWithoutDarkTeamInput | GameCreateOrConnectWithoutDarkTeamInput[]
    createMany?: GameCreateManyDarkTeamInputEnvelope
    connect?: GameWhereUniqueInput | GameWhereUniqueInput[]
  }

  export type GameUncheckedCreateNestedManyWithoutLightTeamInput = {
    create?: XOR<GameCreateWithoutLightTeamInput, GameUncheckedCreateWithoutLightTeamInput> | GameCreateWithoutLightTeamInput[] | GameUncheckedCreateWithoutLightTeamInput[]
    connectOrCreate?: GameCreateOrConnectWithoutLightTeamInput | GameCreateOrConnectWithoutLightTeamInput[]
    createMany?: GameCreateManyLightTeamInputEnvelope
    connect?: GameWhereUniqueInput | GameWhereUniqueInput[]
  }

  export type PlayerUncheckedCreateNestedManyWithoutTeamInput = {
    create?: XOR<PlayerCreateWithoutTeamInput, PlayerUncheckedCreateWithoutTeamInput> | PlayerCreateWithoutTeamInput[] | PlayerUncheckedCreateWithoutTeamInput[]
    connectOrCreate?: PlayerCreateOrConnectWithoutTeamInput | PlayerCreateOrConnectWithoutTeamInput[]
    createMany?: PlayerCreateManyTeamInputEnvelope
    connect?: PlayerWhereUniqueInput | PlayerWhereUniqueInput[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type AgeGroupUpdateOneRequiredWithoutTeamsNestedInput = {
    create?: XOR<AgeGroupCreateWithoutTeamsInput, AgeGroupUncheckedCreateWithoutTeamsInput>
    connectOrCreate?: AgeGroupCreateOrConnectWithoutTeamsInput
    upsert?: AgeGroupUpsertWithoutTeamsInput
    connect?: AgeGroupWhereUniqueInput
    update?: XOR<XOR<AgeGroupUpdateToOneWithWhereWithoutTeamsInput, AgeGroupUpdateWithoutTeamsInput>, AgeGroupUncheckedUpdateWithoutTeamsInput>
  }

  export type GameUpdateManyWithoutDarkTeamNestedInput = {
    create?: XOR<GameCreateWithoutDarkTeamInput, GameUncheckedCreateWithoutDarkTeamInput> | GameCreateWithoutDarkTeamInput[] | GameUncheckedCreateWithoutDarkTeamInput[]
    connectOrCreate?: GameCreateOrConnectWithoutDarkTeamInput | GameCreateOrConnectWithoutDarkTeamInput[]
    upsert?: GameUpsertWithWhereUniqueWithoutDarkTeamInput | GameUpsertWithWhereUniqueWithoutDarkTeamInput[]
    createMany?: GameCreateManyDarkTeamInputEnvelope
    set?: GameWhereUniqueInput | GameWhereUniqueInput[]
    disconnect?: GameWhereUniqueInput | GameWhereUniqueInput[]
    delete?: GameWhereUniqueInput | GameWhereUniqueInput[]
    connect?: GameWhereUniqueInput | GameWhereUniqueInput[]
    update?: GameUpdateWithWhereUniqueWithoutDarkTeamInput | GameUpdateWithWhereUniqueWithoutDarkTeamInput[]
    updateMany?: GameUpdateManyWithWhereWithoutDarkTeamInput | GameUpdateManyWithWhereWithoutDarkTeamInput[]
    deleteMany?: GameScalarWhereInput | GameScalarWhereInput[]
  }

  export type GameUpdateManyWithoutLightTeamNestedInput = {
    create?: XOR<GameCreateWithoutLightTeamInput, GameUncheckedCreateWithoutLightTeamInput> | GameCreateWithoutLightTeamInput[] | GameUncheckedCreateWithoutLightTeamInput[]
    connectOrCreate?: GameCreateOrConnectWithoutLightTeamInput | GameCreateOrConnectWithoutLightTeamInput[]
    upsert?: GameUpsertWithWhereUniqueWithoutLightTeamInput | GameUpsertWithWhereUniqueWithoutLightTeamInput[]
    createMany?: GameCreateManyLightTeamInputEnvelope
    set?: GameWhereUniqueInput | GameWhereUniqueInput[]
    disconnect?: GameWhereUniqueInput | GameWhereUniqueInput[]
    delete?: GameWhereUniqueInput | GameWhereUniqueInput[]
    connect?: GameWhereUniqueInput | GameWhereUniqueInput[]
    update?: GameUpdateWithWhereUniqueWithoutLightTeamInput | GameUpdateWithWhereUniqueWithoutLightTeamInput[]
    updateMany?: GameUpdateManyWithWhereWithoutLightTeamInput | GameUpdateManyWithWhereWithoutLightTeamInput[]
    deleteMany?: GameScalarWhereInput | GameScalarWhereInput[]
  }

  export type PlayerUpdateManyWithoutTeamNestedInput = {
    create?: XOR<PlayerCreateWithoutTeamInput, PlayerUncheckedCreateWithoutTeamInput> | PlayerCreateWithoutTeamInput[] | PlayerUncheckedCreateWithoutTeamInput[]
    connectOrCreate?: PlayerCreateOrConnectWithoutTeamInput | PlayerCreateOrConnectWithoutTeamInput[]
    upsert?: PlayerUpsertWithWhereUniqueWithoutTeamInput | PlayerUpsertWithWhereUniqueWithoutTeamInput[]
    createMany?: PlayerCreateManyTeamInputEnvelope
    set?: PlayerWhereUniqueInput | PlayerWhereUniqueInput[]
    disconnect?: PlayerWhereUniqueInput | PlayerWhereUniqueInput[]
    delete?: PlayerWhereUniqueInput | PlayerWhereUniqueInput[]
    connect?: PlayerWhereUniqueInput | PlayerWhereUniqueInput[]
    update?: PlayerUpdateWithWhereUniqueWithoutTeamInput | PlayerUpdateWithWhereUniqueWithoutTeamInput[]
    updateMany?: PlayerUpdateManyWithWhereWithoutTeamInput | PlayerUpdateManyWithWhereWithoutTeamInput[]
    deleteMany?: PlayerScalarWhereInput | PlayerScalarWhereInput[]
  }

  export type GameUncheckedUpdateManyWithoutDarkTeamNestedInput = {
    create?: XOR<GameCreateWithoutDarkTeamInput, GameUncheckedCreateWithoutDarkTeamInput> | GameCreateWithoutDarkTeamInput[] | GameUncheckedCreateWithoutDarkTeamInput[]
    connectOrCreate?: GameCreateOrConnectWithoutDarkTeamInput | GameCreateOrConnectWithoutDarkTeamInput[]
    upsert?: GameUpsertWithWhereUniqueWithoutDarkTeamInput | GameUpsertWithWhereUniqueWithoutDarkTeamInput[]
    createMany?: GameCreateManyDarkTeamInputEnvelope
    set?: GameWhereUniqueInput | GameWhereUniqueInput[]
    disconnect?: GameWhereUniqueInput | GameWhereUniqueInput[]
    delete?: GameWhereUniqueInput | GameWhereUniqueInput[]
    connect?: GameWhereUniqueInput | GameWhereUniqueInput[]
    update?: GameUpdateWithWhereUniqueWithoutDarkTeamInput | GameUpdateWithWhereUniqueWithoutDarkTeamInput[]
    updateMany?: GameUpdateManyWithWhereWithoutDarkTeamInput | GameUpdateManyWithWhereWithoutDarkTeamInput[]
    deleteMany?: GameScalarWhereInput | GameScalarWhereInput[]
  }

  export type GameUncheckedUpdateManyWithoutLightTeamNestedInput = {
    create?: XOR<GameCreateWithoutLightTeamInput, GameUncheckedCreateWithoutLightTeamInput> | GameCreateWithoutLightTeamInput[] | GameUncheckedCreateWithoutLightTeamInput[]
    connectOrCreate?: GameCreateOrConnectWithoutLightTeamInput | GameCreateOrConnectWithoutLightTeamInput[]
    upsert?: GameUpsertWithWhereUniqueWithoutLightTeamInput | GameUpsertWithWhereUniqueWithoutLightTeamInput[]
    createMany?: GameCreateManyLightTeamInputEnvelope
    set?: GameWhereUniqueInput | GameWhereUniqueInput[]
    disconnect?: GameWhereUniqueInput | GameWhereUniqueInput[]
    delete?: GameWhereUniqueInput | GameWhereUniqueInput[]
    connect?: GameWhereUniqueInput | GameWhereUniqueInput[]
    update?: GameUpdateWithWhereUniqueWithoutLightTeamInput | GameUpdateWithWhereUniqueWithoutLightTeamInput[]
    updateMany?: GameUpdateManyWithWhereWithoutLightTeamInput | GameUpdateManyWithWhereWithoutLightTeamInput[]
    deleteMany?: GameScalarWhereInput | GameScalarWhereInput[]
  }

  export type PlayerUncheckedUpdateManyWithoutTeamNestedInput = {
    create?: XOR<PlayerCreateWithoutTeamInput, PlayerUncheckedCreateWithoutTeamInput> | PlayerCreateWithoutTeamInput[] | PlayerUncheckedCreateWithoutTeamInput[]
    connectOrCreate?: PlayerCreateOrConnectWithoutTeamInput | PlayerCreateOrConnectWithoutTeamInput[]
    upsert?: PlayerUpsertWithWhereUniqueWithoutTeamInput | PlayerUpsertWithWhereUniqueWithoutTeamInput[]
    createMany?: PlayerCreateManyTeamInputEnvelope
    set?: PlayerWhereUniqueInput | PlayerWhereUniqueInput[]
    disconnect?: PlayerWhereUniqueInput | PlayerWhereUniqueInput[]
    delete?: PlayerWhereUniqueInput | PlayerWhereUniqueInput[]
    connect?: PlayerWhereUniqueInput | PlayerWhereUniqueInput[]
    update?: PlayerUpdateWithWhereUniqueWithoutTeamInput | PlayerUpdateWithWhereUniqueWithoutTeamInput[]
    updateMany?: PlayerUpdateManyWithWhereWithoutTeamInput | PlayerUpdateManyWithWhereWithoutTeamInput[]
    deleteMany?: PlayerScalarWhereInput | PlayerScalarWhereInput[]
  }

  export type TeamCreateNestedOneWithoutPlayersInput = {
    create?: XOR<TeamCreateWithoutPlayersInput, TeamUncheckedCreateWithoutPlayersInput>
    connectOrCreate?: TeamCreateOrConnectWithoutPlayersInput
    connect?: TeamWhereUniqueInput
  }

  export type AgeGroupCreateNestedOneWithoutPlayersInput = {
    create?: XOR<AgeGroupCreateWithoutPlayersInput, AgeGroupUncheckedCreateWithoutPlayersInput>
    connectOrCreate?: AgeGroupCreateOrConnectWithoutPlayersInput
    connect?: AgeGroupWhereUniqueInput
  }

  export type TeamUpdateOneRequiredWithoutPlayersNestedInput = {
    create?: XOR<TeamCreateWithoutPlayersInput, TeamUncheckedCreateWithoutPlayersInput>
    connectOrCreate?: TeamCreateOrConnectWithoutPlayersInput
    upsert?: TeamUpsertWithoutPlayersInput
    connect?: TeamWhereUniqueInput
    update?: XOR<XOR<TeamUpdateToOneWithWhereWithoutPlayersInput, TeamUpdateWithoutPlayersInput>, TeamUncheckedUpdateWithoutPlayersInput>
  }

  export type AgeGroupUpdateOneRequiredWithoutPlayersNestedInput = {
    create?: XOR<AgeGroupCreateWithoutPlayersInput, AgeGroupUncheckedCreateWithoutPlayersInput>
    connectOrCreate?: AgeGroupCreateOrConnectWithoutPlayersInput
    upsert?: AgeGroupUpsertWithoutPlayersInput
    connect?: AgeGroupWhereUniqueInput
    update?: XOR<XOR<AgeGroupUpdateToOneWithWhereWithoutPlayersInput, AgeGroupUpdateWithoutPlayersInput>, AgeGroupUncheckedUpdateWithoutPlayersInput>
  }

  export type AgeGroupCreateNestedOneWithoutTimeslotsInput = {
    create?: XOR<AgeGroupCreateWithoutTimeslotsInput, AgeGroupUncheckedCreateWithoutTimeslotsInput>
    connectOrCreate?: AgeGroupCreateOrConnectWithoutTimeslotsInput
    connect?: AgeGroupWhereUniqueInput
  }

  export type GameCreateNestedOneWithoutTimeslotInput = {
    create?: XOR<GameCreateWithoutTimeslotInput, GameUncheckedCreateWithoutTimeslotInput>
    connectOrCreate?: GameCreateOrConnectWithoutTimeslotInput
    connect?: GameWhereUniqueInput
  }

  export type GameUncheckedCreateNestedOneWithoutTimeslotInput = {
    create?: XOR<GameCreateWithoutTimeslotInput, GameUncheckedCreateWithoutTimeslotInput>
    connectOrCreate?: GameCreateOrConnectWithoutTimeslotInput
    connect?: GameWhereUniqueInput
  }

  export type EnumLocationFieldUpdateOperationsInput = {
    set?: $Enums.Location
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type AgeGroupUpdateOneWithoutTimeslotsNestedInput = {
    create?: XOR<AgeGroupCreateWithoutTimeslotsInput, AgeGroupUncheckedCreateWithoutTimeslotsInput>
    connectOrCreate?: AgeGroupCreateOrConnectWithoutTimeslotsInput
    upsert?: AgeGroupUpsertWithoutTimeslotsInput
    disconnect?: AgeGroupWhereInput | boolean
    delete?: AgeGroupWhereInput | boolean
    connect?: AgeGroupWhereUniqueInput
    update?: XOR<XOR<AgeGroupUpdateToOneWithWhereWithoutTimeslotsInput, AgeGroupUpdateWithoutTimeslotsInput>, AgeGroupUncheckedUpdateWithoutTimeslotsInput>
  }

  export type GameUpdateOneWithoutTimeslotNestedInput = {
    create?: XOR<GameCreateWithoutTimeslotInput, GameUncheckedCreateWithoutTimeslotInput>
    connectOrCreate?: GameCreateOrConnectWithoutTimeslotInput
    upsert?: GameUpsertWithoutTimeslotInput
    disconnect?: GameWhereInput | boolean
    delete?: GameWhereInput | boolean
    connect?: GameWhereUniqueInput
    update?: XOR<XOR<GameUpdateToOneWithWhereWithoutTimeslotInput, GameUpdateWithoutTimeslotInput>, GameUncheckedUpdateWithoutTimeslotInput>
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type GameUncheckedUpdateOneWithoutTimeslotNestedInput = {
    create?: XOR<GameCreateWithoutTimeslotInput, GameUncheckedCreateWithoutTimeslotInput>
    connectOrCreate?: GameCreateOrConnectWithoutTimeslotInput
    upsert?: GameUpsertWithoutTimeslotInput
    disconnect?: GameWhereInput | boolean
    delete?: GameWhereInput | boolean
    connect?: GameWhereUniqueInput
    update?: XOR<XOR<GameUpdateToOneWithWhereWithoutTimeslotInput, GameUpdateWithoutTimeslotInput>, GameUncheckedUpdateWithoutTimeslotInput>
  }

  export type TimeslotCreateNestedManyWithoutAgeGroupInput = {
    create?: XOR<TimeslotCreateWithoutAgeGroupInput, TimeslotUncheckedCreateWithoutAgeGroupInput> | TimeslotCreateWithoutAgeGroupInput[] | TimeslotUncheckedCreateWithoutAgeGroupInput[]
    connectOrCreate?: TimeslotCreateOrConnectWithoutAgeGroupInput | TimeslotCreateOrConnectWithoutAgeGroupInput[]
    createMany?: TimeslotCreateManyAgeGroupInputEnvelope
    connect?: TimeslotWhereUniqueInput | TimeslotWhereUniqueInput[]
  }

  export type PlayerCreateNestedManyWithoutAgeGroupInput = {
    create?: XOR<PlayerCreateWithoutAgeGroupInput, PlayerUncheckedCreateWithoutAgeGroupInput> | PlayerCreateWithoutAgeGroupInput[] | PlayerUncheckedCreateWithoutAgeGroupInput[]
    connectOrCreate?: PlayerCreateOrConnectWithoutAgeGroupInput | PlayerCreateOrConnectWithoutAgeGroupInput[]
    createMany?: PlayerCreateManyAgeGroupInputEnvelope
    connect?: PlayerWhereUniqueInput | PlayerWhereUniqueInput[]
  }

  export type TeamCreateNestedManyWithoutAgeGroupInput = {
    create?: XOR<TeamCreateWithoutAgeGroupInput, TeamUncheckedCreateWithoutAgeGroupInput> | TeamCreateWithoutAgeGroupInput[] | TeamUncheckedCreateWithoutAgeGroupInput[]
    connectOrCreate?: TeamCreateOrConnectWithoutAgeGroupInput | TeamCreateOrConnectWithoutAgeGroupInput[]
    createMany?: TeamCreateManyAgeGroupInputEnvelope
    connect?: TeamWhereUniqueInput | TeamWhereUniqueInput[]
  }

  export type TimeslotUncheckedCreateNestedManyWithoutAgeGroupInput = {
    create?: XOR<TimeslotCreateWithoutAgeGroupInput, TimeslotUncheckedCreateWithoutAgeGroupInput> | TimeslotCreateWithoutAgeGroupInput[] | TimeslotUncheckedCreateWithoutAgeGroupInput[]
    connectOrCreate?: TimeslotCreateOrConnectWithoutAgeGroupInput | TimeslotCreateOrConnectWithoutAgeGroupInput[]
    createMany?: TimeslotCreateManyAgeGroupInputEnvelope
    connect?: TimeslotWhereUniqueInput | TimeslotWhereUniqueInput[]
  }

  export type PlayerUncheckedCreateNestedManyWithoutAgeGroupInput = {
    create?: XOR<PlayerCreateWithoutAgeGroupInput, PlayerUncheckedCreateWithoutAgeGroupInput> | PlayerCreateWithoutAgeGroupInput[] | PlayerUncheckedCreateWithoutAgeGroupInput[]
    connectOrCreate?: PlayerCreateOrConnectWithoutAgeGroupInput | PlayerCreateOrConnectWithoutAgeGroupInput[]
    createMany?: PlayerCreateManyAgeGroupInputEnvelope
    connect?: PlayerWhereUniqueInput | PlayerWhereUniqueInput[]
  }

  export type TeamUncheckedCreateNestedManyWithoutAgeGroupInput = {
    create?: XOR<TeamCreateWithoutAgeGroupInput, TeamUncheckedCreateWithoutAgeGroupInput> | TeamCreateWithoutAgeGroupInput[] | TeamUncheckedCreateWithoutAgeGroupInput[]
    connectOrCreate?: TeamCreateOrConnectWithoutAgeGroupInput | TeamCreateOrConnectWithoutAgeGroupInput[]
    createMany?: TeamCreateManyAgeGroupInputEnvelope
    connect?: TeamWhereUniqueInput | TeamWhereUniqueInput[]
  }

  export type TimeslotUpdateManyWithoutAgeGroupNestedInput = {
    create?: XOR<TimeslotCreateWithoutAgeGroupInput, TimeslotUncheckedCreateWithoutAgeGroupInput> | TimeslotCreateWithoutAgeGroupInput[] | TimeslotUncheckedCreateWithoutAgeGroupInput[]
    connectOrCreate?: TimeslotCreateOrConnectWithoutAgeGroupInput | TimeslotCreateOrConnectWithoutAgeGroupInput[]
    upsert?: TimeslotUpsertWithWhereUniqueWithoutAgeGroupInput | TimeslotUpsertWithWhereUniqueWithoutAgeGroupInput[]
    createMany?: TimeslotCreateManyAgeGroupInputEnvelope
    set?: TimeslotWhereUniqueInput | TimeslotWhereUniqueInput[]
    disconnect?: TimeslotWhereUniqueInput | TimeslotWhereUniqueInput[]
    delete?: TimeslotWhereUniqueInput | TimeslotWhereUniqueInput[]
    connect?: TimeslotWhereUniqueInput | TimeslotWhereUniqueInput[]
    update?: TimeslotUpdateWithWhereUniqueWithoutAgeGroupInput | TimeslotUpdateWithWhereUniqueWithoutAgeGroupInput[]
    updateMany?: TimeslotUpdateManyWithWhereWithoutAgeGroupInput | TimeslotUpdateManyWithWhereWithoutAgeGroupInput[]
    deleteMany?: TimeslotScalarWhereInput | TimeslotScalarWhereInput[]
  }

  export type PlayerUpdateManyWithoutAgeGroupNestedInput = {
    create?: XOR<PlayerCreateWithoutAgeGroupInput, PlayerUncheckedCreateWithoutAgeGroupInput> | PlayerCreateWithoutAgeGroupInput[] | PlayerUncheckedCreateWithoutAgeGroupInput[]
    connectOrCreate?: PlayerCreateOrConnectWithoutAgeGroupInput | PlayerCreateOrConnectWithoutAgeGroupInput[]
    upsert?: PlayerUpsertWithWhereUniqueWithoutAgeGroupInput | PlayerUpsertWithWhereUniqueWithoutAgeGroupInput[]
    createMany?: PlayerCreateManyAgeGroupInputEnvelope
    set?: PlayerWhereUniqueInput | PlayerWhereUniqueInput[]
    disconnect?: PlayerWhereUniqueInput | PlayerWhereUniqueInput[]
    delete?: PlayerWhereUniqueInput | PlayerWhereUniqueInput[]
    connect?: PlayerWhereUniqueInput | PlayerWhereUniqueInput[]
    update?: PlayerUpdateWithWhereUniqueWithoutAgeGroupInput | PlayerUpdateWithWhereUniqueWithoutAgeGroupInput[]
    updateMany?: PlayerUpdateManyWithWhereWithoutAgeGroupInput | PlayerUpdateManyWithWhereWithoutAgeGroupInput[]
    deleteMany?: PlayerScalarWhereInput | PlayerScalarWhereInput[]
  }

  export type TeamUpdateManyWithoutAgeGroupNestedInput = {
    create?: XOR<TeamCreateWithoutAgeGroupInput, TeamUncheckedCreateWithoutAgeGroupInput> | TeamCreateWithoutAgeGroupInput[] | TeamUncheckedCreateWithoutAgeGroupInput[]
    connectOrCreate?: TeamCreateOrConnectWithoutAgeGroupInput | TeamCreateOrConnectWithoutAgeGroupInput[]
    upsert?: TeamUpsertWithWhereUniqueWithoutAgeGroupInput | TeamUpsertWithWhereUniqueWithoutAgeGroupInput[]
    createMany?: TeamCreateManyAgeGroupInputEnvelope
    set?: TeamWhereUniqueInput | TeamWhereUniqueInput[]
    disconnect?: TeamWhereUniqueInput | TeamWhereUniqueInput[]
    delete?: TeamWhereUniqueInput | TeamWhereUniqueInput[]
    connect?: TeamWhereUniqueInput | TeamWhereUniqueInput[]
    update?: TeamUpdateWithWhereUniqueWithoutAgeGroupInput | TeamUpdateWithWhereUniqueWithoutAgeGroupInput[]
    updateMany?: TeamUpdateManyWithWhereWithoutAgeGroupInput | TeamUpdateManyWithWhereWithoutAgeGroupInput[]
    deleteMany?: TeamScalarWhereInput | TeamScalarWhereInput[]
  }

  export type TimeslotUncheckedUpdateManyWithoutAgeGroupNestedInput = {
    create?: XOR<TimeslotCreateWithoutAgeGroupInput, TimeslotUncheckedCreateWithoutAgeGroupInput> | TimeslotCreateWithoutAgeGroupInput[] | TimeslotUncheckedCreateWithoutAgeGroupInput[]
    connectOrCreate?: TimeslotCreateOrConnectWithoutAgeGroupInput | TimeslotCreateOrConnectWithoutAgeGroupInput[]
    upsert?: TimeslotUpsertWithWhereUniqueWithoutAgeGroupInput | TimeslotUpsertWithWhereUniqueWithoutAgeGroupInput[]
    createMany?: TimeslotCreateManyAgeGroupInputEnvelope
    set?: TimeslotWhereUniqueInput | TimeslotWhereUniqueInput[]
    disconnect?: TimeslotWhereUniqueInput | TimeslotWhereUniqueInput[]
    delete?: TimeslotWhereUniqueInput | TimeslotWhereUniqueInput[]
    connect?: TimeslotWhereUniqueInput | TimeslotWhereUniqueInput[]
    update?: TimeslotUpdateWithWhereUniqueWithoutAgeGroupInput | TimeslotUpdateWithWhereUniqueWithoutAgeGroupInput[]
    updateMany?: TimeslotUpdateManyWithWhereWithoutAgeGroupInput | TimeslotUpdateManyWithWhereWithoutAgeGroupInput[]
    deleteMany?: TimeslotScalarWhereInput | TimeslotScalarWhereInput[]
  }

  export type PlayerUncheckedUpdateManyWithoutAgeGroupNestedInput = {
    create?: XOR<PlayerCreateWithoutAgeGroupInput, PlayerUncheckedCreateWithoutAgeGroupInput> | PlayerCreateWithoutAgeGroupInput[] | PlayerUncheckedCreateWithoutAgeGroupInput[]
    connectOrCreate?: PlayerCreateOrConnectWithoutAgeGroupInput | PlayerCreateOrConnectWithoutAgeGroupInput[]
    upsert?: PlayerUpsertWithWhereUniqueWithoutAgeGroupInput | PlayerUpsertWithWhereUniqueWithoutAgeGroupInput[]
    createMany?: PlayerCreateManyAgeGroupInputEnvelope
    set?: PlayerWhereUniqueInput | PlayerWhereUniqueInput[]
    disconnect?: PlayerWhereUniqueInput | PlayerWhereUniqueInput[]
    delete?: PlayerWhereUniqueInput | PlayerWhereUniqueInput[]
    connect?: PlayerWhereUniqueInput | PlayerWhereUniqueInput[]
    update?: PlayerUpdateWithWhereUniqueWithoutAgeGroupInput | PlayerUpdateWithWhereUniqueWithoutAgeGroupInput[]
    updateMany?: PlayerUpdateManyWithWhereWithoutAgeGroupInput | PlayerUpdateManyWithWhereWithoutAgeGroupInput[]
    deleteMany?: PlayerScalarWhereInput | PlayerScalarWhereInput[]
  }

  export type TeamUncheckedUpdateManyWithoutAgeGroupNestedInput = {
    create?: XOR<TeamCreateWithoutAgeGroupInput, TeamUncheckedCreateWithoutAgeGroupInput> | TeamCreateWithoutAgeGroupInput[] | TeamUncheckedCreateWithoutAgeGroupInput[]
    connectOrCreate?: TeamCreateOrConnectWithoutAgeGroupInput | TeamCreateOrConnectWithoutAgeGroupInput[]
    upsert?: TeamUpsertWithWhereUniqueWithoutAgeGroupInput | TeamUpsertWithWhereUniqueWithoutAgeGroupInput[]
    createMany?: TeamCreateManyAgeGroupInputEnvelope
    set?: TeamWhereUniqueInput | TeamWhereUniqueInput[]
    disconnect?: TeamWhereUniqueInput | TeamWhereUniqueInput[]
    delete?: TeamWhereUniqueInput | TeamWhereUniqueInput[]
    connect?: TeamWhereUniqueInput | TeamWhereUniqueInput[]
    update?: TeamUpdateWithWhereUniqueWithoutAgeGroupInput | TeamUpdateWithWhereUniqueWithoutAgeGroupInput[]
    updateMany?: TeamUpdateManyWithWhereWithoutAgeGroupInput | TeamUpdateManyWithWhereWithoutAgeGroupInput[]
    deleteMany?: TeamScalarWhereInput | TeamScalarWhereInput[]
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumLocationFilter<$PrismaModel = never> = {
    equals?: $Enums.Location | EnumLocationFieldRefInput<$PrismaModel>
    in?: $Enums.Location[] | ListEnumLocationFieldRefInput<$PrismaModel>
    notIn?: $Enums.Location[] | ListEnumLocationFieldRefInput<$PrismaModel>
    not?: NestedEnumLocationFilter<$PrismaModel> | $Enums.Location
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedEnumLocationWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Location | EnumLocationFieldRefInput<$PrismaModel>
    in?: $Enums.Location[] | ListEnumLocationFieldRefInput<$PrismaModel>
    notIn?: $Enums.Location[] | ListEnumLocationFieldRefInput<$PrismaModel>
    not?: NestedEnumLocationWithAggregatesFilter<$PrismaModel> | $Enums.Location
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumLocationFilter<$PrismaModel>
    _max?: NestedEnumLocationFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type TeamCreateWithoutDarkGamesInput = {
    id?: string
    name: string
    division?: number | null
    ageGroup: AgeGroupCreateNestedOneWithoutTeamsInput
    lightGames?: GameCreateNestedManyWithoutDarkTeamInput
    players?: PlayerCreateNestedManyWithoutTeamInput
  }

  export type TeamUncheckedCreateWithoutDarkGamesInput = {
    id?: string
    name: string
    ageGroupId: string
    division?: number | null
    lightGames?: GameUncheckedCreateNestedManyWithoutDarkTeamInput
    players?: PlayerUncheckedCreateNestedManyWithoutTeamInput
  }

  export type TeamCreateOrConnectWithoutDarkGamesInput = {
    where: TeamWhereUniqueInput
    create: XOR<TeamCreateWithoutDarkGamesInput, TeamUncheckedCreateWithoutDarkGamesInput>
  }

  export type TeamCreateWithoutLightGamesInput = {
    id?: string
    name: string
    division?: number | null
    ageGroup: AgeGroupCreateNestedOneWithoutTeamsInput
    darkGames?: GameCreateNestedManyWithoutLightTeamInput
    players?: PlayerCreateNestedManyWithoutTeamInput
  }

  export type TeamUncheckedCreateWithoutLightGamesInput = {
    id?: string
    name: string
    ageGroupId: string
    division?: number | null
    darkGames?: GameUncheckedCreateNestedManyWithoutLightTeamInput
    players?: PlayerUncheckedCreateNestedManyWithoutTeamInput
  }

  export type TeamCreateOrConnectWithoutLightGamesInput = {
    where: TeamWhereUniqueInput
    create: XOR<TeamCreateWithoutLightGamesInput, TeamUncheckedCreateWithoutLightGamesInput>
  }

  export type TimeslotCreateWithoutGameInput = {
    id?: string
    location: $Enums.Location
    court: number
    date: Date | string
    ageGroup?: AgeGroupCreateNestedOneWithoutTimeslotsInput
  }

  export type TimeslotUncheckedCreateWithoutGameInput = {
    id?: string
    location: $Enums.Location
    court: number
    ageGroupId?: string | null
    date: Date | string
  }

  export type TimeslotCreateOrConnectWithoutGameInput = {
    where: TimeslotWhereUniqueInput
    create: XOR<TimeslotCreateWithoutGameInput, TimeslotUncheckedCreateWithoutGameInput>
  }

  export type TeamUpsertWithoutDarkGamesInput = {
    update: XOR<TeamUpdateWithoutDarkGamesInput, TeamUncheckedUpdateWithoutDarkGamesInput>
    create: XOR<TeamCreateWithoutDarkGamesInput, TeamUncheckedCreateWithoutDarkGamesInput>
    where?: TeamWhereInput
  }

  export type TeamUpdateToOneWithWhereWithoutDarkGamesInput = {
    where?: TeamWhereInput
    data: XOR<TeamUpdateWithoutDarkGamesInput, TeamUncheckedUpdateWithoutDarkGamesInput>
  }

  export type TeamUpdateWithoutDarkGamesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    division?: NullableIntFieldUpdateOperationsInput | number | null
    ageGroup?: AgeGroupUpdateOneRequiredWithoutTeamsNestedInput
    lightGames?: GameUpdateManyWithoutDarkTeamNestedInput
    players?: PlayerUpdateManyWithoutTeamNestedInput
  }

  export type TeamUncheckedUpdateWithoutDarkGamesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    ageGroupId?: StringFieldUpdateOperationsInput | string
    division?: NullableIntFieldUpdateOperationsInput | number | null
    lightGames?: GameUncheckedUpdateManyWithoutDarkTeamNestedInput
    players?: PlayerUncheckedUpdateManyWithoutTeamNestedInput
  }

  export type TeamUpsertWithoutLightGamesInput = {
    update: XOR<TeamUpdateWithoutLightGamesInput, TeamUncheckedUpdateWithoutLightGamesInput>
    create: XOR<TeamCreateWithoutLightGamesInput, TeamUncheckedCreateWithoutLightGamesInput>
    where?: TeamWhereInput
  }

  export type TeamUpdateToOneWithWhereWithoutLightGamesInput = {
    where?: TeamWhereInput
    data: XOR<TeamUpdateWithoutLightGamesInput, TeamUncheckedUpdateWithoutLightGamesInput>
  }

  export type TeamUpdateWithoutLightGamesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    division?: NullableIntFieldUpdateOperationsInput | number | null
    ageGroup?: AgeGroupUpdateOneRequiredWithoutTeamsNestedInput
    darkGames?: GameUpdateManyWithoutLightTeamNestedInput
    players?: PlayerUpdateManyWithoutTeamNestedInput
  }

  export type TeamUncheckedUpdateWithoutLightGamesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    ageGroupId?: StringFieldUpdateOperationsInput | string
    division?: NullableIntFieldUpdateOperationsInput | number | null
    darkGames?: GameUncheckedUpdateManyWithoutLightTeamNestedInput
    players?: PlayerUncheckedUpdateManyWithoutTeamNestedInput
  }

  export type TimeslotUpsertWithoutGameInput = {
    update: XOR<TimeslotUpdateWithoutGameInput, TimeslotUncheckedUpdateWithoutGameInput>
    create: XOR<TimeslotCreateWithoutGameInput, TimeslotUncheckedCreateWithoutGameInput>
    where?: TimeslotWhereInput
  }

  export type TimeslotUpdateToOneWithWhereWithoutGameInput = {
    where?: TimeslotWhereInput
    data: XOR<TimeslotUpdateWithoutGameInput, TimeslotUncheckedUpdateWithoutGameInput>
  }

  export type TimeslotUpdateWithoutGameInput = {
    id?: StringFieldUpdateOperationsInput | string
    location?: EnumLocationFieldUpdateOperationsInput | $Enums.Location
    court?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    ageGroup?: AgeGroupUpdateOneWithoutTimeslotsNestedInput
  }

  export type TimeslotUncheckedUpdateWithoutGameInput = {
    id?: StringFieldUpdateOperationsInput | string
    location?: EnumLocationFieldUpdateOperationsInput | $Enums.Location
    court?: IntFieldUpdateOperationsInput | number
    ageGroupId?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AgeGroupCreateWithoutTeamsInput = {
    id?: string
    displayName: string
    timeslots?: TimeslotCreateNestedManyWithoutAgeGroupInput
    players?: PlayerCreateNestedManyWithoutAgeGroupInput
  }

  export type AgeGroupUncheckedCreateWithoutTeamsInput = {
    id?: string
    displayName: string
    timeslots?: TimeslotUncheckedCreateNestedManyWithoutAgeGroupInput
    players?: PlayerUncheckedCreateNestedManyWithoutAgeGroupInput
  }

  export type AgeGroupCreateOrConnectWithoutTeamsInput = {
    where: AgeGroupWhereUniqueInput
    create: XOR<AgeGroupCreateWithoutTeamsInput, AgeGroupUncheckedCreateWithoutTeamsInput>
  }

  export type GameCreateWithoutDarkTeamInput = {
    id?: string
    lightScore: number
    darkScore: number
    lightTeam: TeamCreateNestedOneWithoutDarkGamesInput
    timeslot: TimeslotCreateNestedOneWithoutGameInput
  }

  export type GameUncheckedCreateWithoutDarkTeamInput = {
    id?: string
    lightTeamId: string
    lightScore: number
    darkScore: number
    timeslotId: string
  }

  export type GameCreateOrConnectWithoutDarkTeamInput = {
    where: GameWhereUniqueInput
    create: XOR<GameCreateWithoutDarkTeamInput, GameUncheckedCreateWithoutDarkTeamInput>
  }

  export type GameCreateManyDarkTeamInputEnvelope = {
    data: GameCreateManyDarkTeamInput | GameCreateManyDarkTeamInput[]
    skipDuplicates?: boolean
  }

  export type GameCreateWithoutLightTeamInput = {
    id?: string
    lightScore: number
    darkScore: number
    darkTeam: TeamCreateNestedOneWithoutLightGamesInput
    timeslot: TimeslotCreateNestedOneWithoutGameInput
  }

  export type GameUncheckedCreateWithoutLightTeamInput = {
    id?: string
    darkTeamId: string
    lightScore: number
    darkScore: number
    timeslotId: string
  }

  export type GameCreateOrConnectWithoutLightTeamInput = {
    where: GameWhereUniqueInput
    create: XOR<GameCreateWithoutLightTeamInput, GameUncheckedCreateWithoutLightTeamInput>
  }

  export type GameCreateManyLightTeamInputEnvelope = {
    data: GameCreateManyLightTeamInput | GameCreateManyLightTeamInput[]
    skipDuplicates?: boolean
  }

  export type PlayerCreateWithoutTeamInput = {
    id?: string
    firstName: string
    lastName: string
    number?: number | null
    ageGroup: AgeGroupCreateNestedOneWithoutPlayersInput
  }

  export type PlayerUncheckedCreateWithoutTeamInput = {
    id?: string
    firstName: string
    lastName: string
    number?: number | null
    ageGroupId: string
  }

  export type PlayerCreateOrConnectWithoutTeamInput = {
    where: PlayerWhereUniqueInput
    create: XOR<PlayerCreateWithoutTeamInput, PlayerUncheckedCreateWithoutTeamInput>
  }

  export type PlayerCreateManyTeamInputEnvelope = {
    data: PlayerCreateManyTeamInput | PlayerCreateManyTeamInput[]
    skipDuplicates?: boolean
  }

  export type AgeGroupUpsertWithoutTeamsInput = {
    update: XOR<AgeGroupUpdateWithoutTeamsInput, AgeGroupUncheckedUpdateWithoutTeamsInput>
    create: XOR<AgeGroupCreateWithoutTeamsInput, AgeGroupUncheckedCreateWithoutTeamsInput>
    where?: AgeGroupWhereInput
  }

  export type AgeGroupUpdateToOneWithWhereWithoutTeamsInput = {
    where?: AgeGroupWhereInput
    data: XOR<AgeGroupUpdateWithoutTeamsInput, AgeGroupUncheckedUpdateWithoutTeamsInput>
  }

  export type AgeGroupUpdateWithoutTeamsInput = {
    id?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    timeslots?: TimeslotUpdateManyWithoutAgeGroupNestedInput
    players?: PlayerUpdateManyWithoutAgeGroupNestedInput
  }

  export type AgeGroupUncheckedUpdateWithoutTeamsInput = {
    id?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    timeslots?: TimeslotUncheckedUpdateManyWithoutAgeGroupNestedInput
    players?: PlayerUncheckedUpdateManyWithoutAgeGroupNestedInput
  }

  export type GameUpsertWithWhereUniqueWithoutDarkTeamInput = {
    where: GameWhereUniqueInput
    update: XOR<GameUpdateWithoutDarkTeamInput, GameUncheckedUpdateWithoutDarkTeamInput>
    create: XOR<GameCreateWithoutDarkTeamInput, GameUncheckedCreateWithoutDarkTeamInput>
  }

  export type GameUpdateWithWhereUniqueWithoutDarkTeamInput = {
    where: GameWhereUniqueInput
    data: XOR<GameUpdateWithoutDarkTeamInput, GameUncheckedUpdateWithoutDarkTeamInput>
  }

  export type GameUpdateManyWithWhereWithoutDarkTeamInput = {
    where: GameScalarWhereInput
    data: XOR<GameUpdateManyMutationInput, GameUncheckedUpdateManyWithoutDarkTeamInput>
  }

  export type GameScalarWhereInput = {
    AND?: GameScalarWhereInput | GameScalarWhereInput[]
    OR?: GameScalarWhereInput[]
    NOT?: GameScalarWhereInput | GameScalarWhereInput[]
    id?: StringFilter<"Game"> | string
    lightTeamId?: StringFilter<"Game"> | string
    darkTeamId?: StringFilter<"Game"> | string
    lightScore?: IntFilter<"Game"> | number
    darkScore?: IntFilter<"Game"> | number
    timeslotId?: StringFilter<"Game"> | string
  }

  export type GameUpsertWithWhereUniqueWithoutLightTeamInput = {
    where: GameWhereUniqueInput
    update: XOR<GameUpdateWithoutLightTeamInput, GameUncheckedUpdateWithoutLightTeamInput>
    create: XOR<GameCreateWithoutLightTeamInput, GameUncheckedCreateWithoutLightTeamInput>
  }

  export type GameUpdateWithWhereUniqueWithoutLightTeamInput = {
    where: GameWhereUniqueInput
    data: XOR<GameUpdateWithoutLightTeamInput, GameUncheckedUpdateWithoutLightTeamInput>
  }

  export type GameUpdateManyWithWhereWithoutLightTeamInput = {
    where: GameScalarWhereInput
    data: XOR<GameUpdateManyMutationInput, GameUncheckedUpdateManyWithoutLightTeamInput>
  }

  export type PlayerUpsertWithWhereUniqueWithoutTeamInput = {
    where: PlayerWhereUniqueInput
    update: XOR<PlayerUpdateWithoutTeamInput, PlayerUncheckedUpdateWithoutTeamInput>
    create: XOR<PlayerCreateWithoutTeamInput, PlayerUncheckedCreateWithoutTeamInput>
  }

  export type PlayerUpdateWithWhereUniqueWithoutTeamInput = {
    where: PlayerWhereUniqueInput
    data: XOR<PlayerUpdateWithoutTeamInput, PlayerUncheckedUpdateWithoutTeamInput>
  }

  export type PlayerUpdateManyWithWhereWithoutTeamInput = {
    where: PlayerScalarWhereInput
    data: XOR<PlayerUpdateManyMutationInput, PlayerUncheckedUpdateManyWithoutTeamInput>
  }

  export type PlayerScalarWhereInput = {
    AND?: PlayerScalarWhereInput | PlayerScalarWhereInput[]
    OR?: PlayerScalarWhereInput[]
    NOT?: PlayerScalarWhereInput | PlayerScalarWhereInput[]
    id?: StringFilter<"Player"> | string
    firstName?: StringFilter<"Player"> | string
    lastName?: StringFilter<"Player"> | string
    number?: IntNullableFilter<"Player"> | number | null
    teamId?: StringFilter<"Player"> | string
    ageGroupId?: StringFilter<"Player"> | string
  }

  export type TeamCreateWithoutPlayersInput = {
    id?: string
    name: string
    division?: number | null
    ageGroup: AgeGroupCreateNestedOneWithoutTeamsInput
    lightGames?: GameCreateNestedManyWithoutDarkTeamInput
    darkGames?: GameCreateNestedManyWithoutLightTeamInput
  }

  export type TeamUncheckedCreateWithoutPlayersInput = {
    id?: string
    name: string
    ageGroupId: string
    division?: number | null
    lightGames?: GameUncheckedCreateNestedManyWithoutDarkTeamInput
    darkGames?: GameUncheckedCreateNestedManyWithoutLightTeamInput
  }

  export type TeamCreateOrConnectWithoutPlayersInput = {
    where: TeamWhereUniqueInput
    create: XOR<TeamCreateWithoutPlayersInput, TeamUncheckedCreateWithoutPlayersInput>
  }

  export type AgeGroupCreateWithoutPlayersInput = {
    id?: string
    displayName: string
    timeslots?: TimeslotCreateNestedManyWithoutAgeGroupInput
    teams?: TeamCreateNestedManyWithoutAgeGroupInput
  }

  export type AgeGroupUncheckedCreateWithoutPlayersInput = {
    id?: string
    displayName: string
    timeslots?: TimeslotUncheckedCreateNestedManyWithoutAgeGroupInput
    teams?: TeamUncheckedCreateNestedManyWithoutAgeGroupInput
  }

  export type AgeGroupCreateOrConnectWithoutPlayersInput = {
    where: AgeGroupWhereUniqueInput
    create: XOR<AgeGroupCreateWithoutPlayersInput, AgeGroupUncheckedCreateWithoutPlayersInput>
  }

  export type TeamUpsertWithoutPlayersInput = {
    update: XOR<TeamUpdateWithoutPlayersInput, TeamUncheckedUpdateWithoutPlayersInput>
    create: XOR<TeamCreateWithoutPlayersInput, TeamUncheckedCreateWithoutPlayersInput>
    where?: TeamWhereInput
  }

  export type TeamUpdateToOneWithWhereWithoutPlayersInput = {
    where?: TeamWhereInput
    data: XOR<TeamUpdateWithoutPlayersInput, TeamUncheckedUpdateWithoutPlayersInput>
  }

  export type TeamUpdateWithoutPlayersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    division?: NullableIntFieldUpdateOperationsInput | number | null
    ageGroup?: AgeGroupUpdateOneRequiredWithoutTeamsNestedInput
    lightGames?: GameUpdateManyWithoutDarkTeamNestedInput
    darkGames?: GameUpdateManyWithoutLightTeamNestedInput
  }

  export type TeamUncheckedUpdateWithoutPlayersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    ageGroupId?: StringFieldUpdateOperationsInput | string
    division?: NullableIntFieldUpdateOperationsInput | number | null
    lightGames?: GameUncheckedUpdateManyWithoutDarkTeamNestedInput
    darkGames?: GameUncheckedUpdateManyWithoutLightTeamNestedInput
  }

  export type AgeGroupUpsertWithoutPlayersInput = {
    update: XOR<AgeGroupUpdateWithoutPlayersInput, AgeGroupUncheckedUpdateWithoutPlayersInput>
    create: XOR<AgeGroupCreateWithoutPlayersInput, AgeGroupUncheckedCreateWithoutPlayersInput>
    where?: AgeGroupWhereInput
  }

  export type AgeGroupUpdateToOneWithWhereWithoutPlayersInput = {
    where?: AgeGroupWhereInput
    data: XOR<AgeGroupUpdateWithoutPlayersInput, AgeGroupUncheckedUpdateWithoutPlayersInput>
  }

  export type AgeGroupUpdateWithoutPlayersInput = {
    id?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    timeslots?: TimeslotUpdateManyWithoutAgeGroupNestedInput
    teams?: TeamUpdateManyWithoutAgeGroupNestedInput
  }

  export type AgeGroupUncheckedUpdateWithoutPlayersInput = {
    id?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    timeslots?: TimeslotUncheckedUpdateManyWithoutAgeGroupNestedInput
    teams?: TeamUncheckedUpdateManyWithoutAgeGroupNestedInput
  }

  export type AgeGroupCreateWithoutTimeslotsInput = {
    id?: string
    displayName: string
    players?: PlayerCreateNestedManyWithoutAgeGroupInput
    teams?: TeamCreateNestedManyWithoutAgeGroupInput
  }

  export type AgeGroupUncheckedCreateWithoutTimeslotsInput = {
    id?: string
    displayName: string
    players?: PlayerUncheckedCreateNestedManyWithoutAgeGroupInput
    teams?: TeamUncheckedCreateNestedManyWithoutAgeGroupInput
  }

  export type AgeGroupCreateOrConnectWithoutTimeslotsInput = {
    where: AgeGroupWhereUniqueInput
    create: XOR<AgeGroupCreateWithoutTimeslotsInput, AgeGroupUncheckedCreateWithoutTimeslotsInput>
  }

  export type GameCreateWithoutTimeslotInput = {
    id?: string
    lightScore: number
    darkScore: number
    lightTeam: TeamCreateNestedOneWithoutDarkGamesInput
    darkTeam: TeamCreateNestedOneWithoutLightGamesInput
  }

  export type GameUncheckedCreateWithoutTimeslotInput = {
    id?: string
    lightTeamId: string
    darkTeamId: string
    lightScore: number
    darkScore: number
  }

  export type GameCreateOrConnectWithoutTimeslotInput = {
    where: GameWhereUniqueInput
    create: XOR<GameCreateWithoutTimeslotInput, GameUncheckedCreateWithoutTimeslotInput>
  }

  export type AgeGroupUpsertWithoutTimeslotsInput = {
    update: XOR<AgeGroupUpdateWithoutTimeslotsInput, AgeGroupUncheckedUpdateWithoutTimeslotsInput>
    create: XOR<AgeGroupCreateWithoutTimeslotsInput, AgeGroupUncheckedCreateWithoutTimeslotsInput>
    where?: AgeGroupWhereInput
  }

  export type AgeGroupUpdateToOneWithWhereWithoutTimeslotsInput = {
    where?: AgeGroupWhereInput
    data: XOR<AgeGroupUpdateWithoutTimeslotsInput, AgeGroupUncheckedUpdateWithoutTimeslotsInput>
  }

  export type AgeGroupUpdateWithoutTimeslotsInput = {
    id?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    players?: PlayerUpdateManyWithoutAgeGroupNestedInput
    teams?: TeamUpdateManyWithoutAgeGroupNestedInput
  }

  export type AgeGroupUncheckedUpdateWithoutTimeslotsInput = {
    id?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    players?: PlayerUncheckedUpdateManyWithoutAgeGroupNestedInput
    teams?: TeamUncheckedUpdateManyWithoutAgeGroupNestedInput
  }

  export type GameUpsertWithoutTimeslotInput = {
    update: XOR<GameUpdateWithoutTimeslotInput, GameUncheckedUpdateWithoutTimeslotInput>
    create: XOR<GameCreateWithoutTimeslotInput, GameUncheckedCreateWithoutTimeslotInput>
    where?: GameWhereInput
  }

  export type GameUpdateToOneWithWhereWithoutTimeslotInput = {
    where?: GameWhereInput
    data: XOR<GameUpdateWithoutTimeslotInput, GameUncheckedUpdateWithoutTimeslotInput>
  }

  export type GameUpdateWithoutTimeslotInput = {
    id?: StringFieldUpdateOperationsInput | string
    lightScore?: IntFieldUpdateOperationsInput | number
    darkScore?: IntFieldUpdateOperationsInput | number
    lightTeam?: TeamUpdateOneRequiredWithoutDarkGamesNestedInput
    darkTeam?: TeamUpdateOneRequiredWithoutLightGamesNestedInput
  }

  export type GameUncheckedUpdateWithoutTimeslotInput = {
    id?: StringFieldUpdateOperationsInput | string
    lightTeamId?: StringFieldUpdateOperationsInput | string
    darkTeamId?: StringFieldUpdateOperationsInput | string
    lightScore?: IntFieldUpdateOperationsInput | number
    darkScore?: IntFieldUpdateOperationsInput | number
  }

  export type TimeslotCreateWithoutAgeGroupInput = {
    id?: string
    location: $Enums.Location
    court: number
    date: Date | string
    game?: GameCreateNestedOneWithoutTimeslotInput
  }

  export type TimeslotUncheckedCreateWithoutAgeGroupInput = {
    id?: string
    location: $Enums.Location
    court: number
    date: Date | string
    game?: GameUncheckedCreateNestedOneWithoutTimeslotInput
  }

  export type TimeslotCreateOrConnectWithoutAgeGroupInput = {
    where: TimeslotWhereUniqueInput
    create: XOR<TimeslotCreateWithoutAgeGroupInput, TimeslotUncheckedCreateWithoutAgeGroupInput>
  }

  export type TimeslotCreateManyAgeGroupInputEnvelope = {
    data: TimeslotCreateManyAgeGroupInput | TimeslotCreateManyAgeGroupInput[]
    skipDuplicates?: boolean
  }

  export type PlayerCreateWithoutAgeGroupInput = {
    id?: string
    firstName: string
    lastName: string
    number?: number | null
    team: TeamCreateNestedOneWithoutPlayersInput
  }

  export type PlayerUncheckedCreateWithoutAgeGroupInput = {
    id?: string
    firstName: string
    lastName: string
    number?: number | null
    teamId: string
  }

  export type PlayerCreateOrConnectWithoutAgeGroupInput = {
    where: PlayerWhereUniqueInput
    create: XOR<PlayerCreateWithoutAgeGroupInput, PlayerUncheckedCreateWithoutAgeGroupInput>
  }

  export type PlayerCreateManyAgeGroupInputEnvelope = {
    data: PlayerCreateManyAgeGroupInput | PlayerCreateManyAgeGroupInput[]
    skipDuplicates?: boolean
  }

  export type TeamCreateWithoutAgeGroupInput = {
    id?: string
    name: string
    division?: number | null
    lightGames?: GameCreateNestedManyWithoutDarkTeamInput
    darkGames?: GameCreateNestedManyWithoutLightTeamInput
    players?: PlayerCreateNestedManyWithoutTeamInput
  }

  export type TeamUncheckedCreateWithoutAgeGroupInput = {
    id?: string
    name: string
    division?: number | null
    lightGames?: GameUncheckedCreateNestedManyWithoutDarkTeamInput
    darkGames?: GameUncheckedCreateNestedManyWithoutLightTeamInput
    players?: PlayerUncheckedCreateNestedManyWithoutTeamInput
  }

  export type TeamCreateOrConnectWithoutAgeGroupInput = {
    where: TeamWhereUniqueInput
    create: XOR<TeamCreateWithoutAgeGroupInput, TeamUncheckedCreateWithoutAgeGroupInput>
  }

  export type TeamCreateManyAgeGroupInputEnvelope = {
    data: TeamCreateManyAgeGroupInput | TeamCreateManyAgeGroupInput[]
    skipDuplicates?: boolean
  }

  export type TimeslotUpsertWithWhereUniqueWithoutAgeGroupInput = {
    where: TimeslotWhereUniqueInput
    update: XOR<TimeslotUpdateWithoutAgeGroupInput, TimeslotUncheckedUpdateWithoutAgeGroupInput>
    create: XOR<TimeslotCreateWithoutAgeGroupInput, TimeslotUncheckedCreateWithoutAgeGroupInput>
  }

  export type TimeslotUpdateWithWhereUniqueWithoutAgeGroupInput = {
    where: TimeslotWhereUniqueInput
    data: XOR<TimeslotUpdateWithoutAgeGroupInput, TimeslotUncheckedUpdateWithoutAgeGroupInput>
  }

  export type TimeslotUpdateManyWithWhereWithoutAgeGroupInput = {
    where: TimeslotScalarWhereInput
    data: XOR<TimeslotUpdateManyMutationInput, TimeslotUncheckedUpdateManyWithoutAgeGroupInput>
  }

  export type TimeslotScalarWhereInput = {
    AND?: TimeslotScalarWhereInput | TimeslotScalarWhereInput[]
    OR?: TimeslotScalarWhereInput[]
    NOT?: TimeslotScalarWhereInput | TimeslotScalarWhereInput[]
    id?: StringFilter<"Timeslot"> | string
    location?: EnumLocationFilter<"Timeslot"> | $Enums.Location
    court?: IntFilter<"Timeslot"> | number
    ageGroupId?: StringNullableFilter<"Timeslot"> | string | null
    date?: DateTimeFilter<"Timeslot"> | Date | string
  }

  export type PlayerUpsertWithWhereUniqueWithoutAgeGroupInput = {
    where: PlayerWhereUniqueInput
    update: XOR<PlayerUpdateWithoutAgeGroupInput, PlayerUncheckedUpdateWithoutAgeGroupInput>
    create: XOR<PlayerCreateWithoutAgeGroupInput, PlayerUncheckedCreateWithoutAgeGroupInput>
  }

  export type PlayerUpdateWithWhereUniqueWithoutAgeGroupInput = {
    where: PlayerWhereUniqueInput
    data: XOR<PlayerUpdateWithoutAgeGroupInput, PlayerUncheckedUpdateWithoutAgeGroupInput>
  }

  export type PlayerUpdateManyWithWhereWithoutAgeGroupInput = {
    where: PlayerScalarWhereInput
    data: XOR<PlayerUpdateManyMutationInput, PlayerUncheckedUpdateManyWithoutAgeGroupInput>
  }

  export type TeamUpsertWithWhereUniqueWithoutAgeGroupInput = {
    where: TeamWhereUniqueInput
    update: XOR<TeamUpdateWithoutAgeGroupInput, TeamUncheckedUpdateWithoutAgeGroupInput>
    create: XOR<TeamCreateWithoutAgeGroupInput, TeamUncheckedCreateWithoutAgeGroupInput>
  }

  export type TeamUpdateWithWhereUniqueWithoutAgeGroupInput = {
    where: TeamWhereUniqueInput
    data: XOR<TeamUpdateWithoutAgeGroupInput, TeamUncheckedUpdateWithoutAgeGroupInput>
  }

  export type TeamUpdateManyWithWhereWithoutAgeGroupInput = {
    where: TeamScalarWhereInput
    data: XOR<TeamUpdateManyMutationInput, TeamUncheckedUpdateManyWithoutAgeGroupInput>
  }

  export type TeamScalarWhereInput = {
    AND?: TeamScalarWhereInput | TeamScalarWhereInput[]
    OR?: TeamScalarWhereInput[]
    NOT?: TeamScalarWhereInput | TeamScalarWhereInput[]
    id?: StringFilter<"Team"> | string
    name?: StringFilter<"Team"> | string
    ageGroupId?: StringFilter<"Team"> | string
    division?: IntNullableFilter<"Team"> | number | null
  }

  export type GameCreateManyDarkTeamInput = {
    id?: string
    lightTeamId: string
    lightScore: number
    darkScore: number
    timeslotId: string
  }

  export type GameCreateManyLightTeamInput = {
    id?: string
    darkTeamId: string
    lightScore: number
    darkScore: number
    timeslotId: string
  }

  export type PlayerCreateManyTeamInput = {
    id?: string
    firstName: string
    lastName: string
    number?: number | null
    ageGroupId: string
  }

  export type GameUpdateWithoutDarkTeamInput = {
    id?: StringFieldUpdateOperationsInput | string
    lightScore?: IntFieldUpdateOperationsInput | number
    darkScore?: IntFieldUpdateOperationsInput | number
    lightTeam?: TeamUpdateOneRequiredWithoutDarkGamesNestedInput
    timeslot?: TimeslotUpdateOneRequiredWithoutGameNestedInput
  }

  export type GameUncheckedUpdateWithoutDarkTeamInput = {
    id?: StringFieldUpdateOperationsInput | string
    lightTeamId?: StringFieldUpdateOperationsInput | string
    lightScore?: IntFieldUpdateOperationsInput | number
    darkScore?: IntFieldUpdateOperationsInput | number
    timeslotId?: StringFieldUpdateOperationsInput | string
  }

  export type GameUncheckedUpdateManyWithoutDarkTeamInput = {
    id?: StringFieldUpdateOperationsInput | string
    lightTeamId?: StringFieldUpdateOperationsInput | string
    lightScore?: IntFieldUpdateOperationsInput | number
    darkScore?: IntFieldUpdateOperationsInput | number
    timeslotId?: StringFieldUpdateOperationsInput | string
  }

  export type GameUpdateWithoutLightTeamInput = {
    id?: StringFieldUpdateOperationsInput | string
    lightScore?: IntFieldUpdateOperationsInput | number
    darkScore?: IntFieldUpdateOperationsInput | number
    darkTeam?: TeamUpdateOneRequiredWithoutLightGamesNestedInput
    timeslot?: TimeslotUpdateOneRequiredWithoutGameNestedInput
  }

  export type GameUncheckedUpdateWithoutLightTeamInput = {
    id?: StringFieldUpdateOperationsInput | string
    darkTeamId?: StringFieldUpdateOperationsInput | string
    lightScore?: IntFieldUpdateOperationsInput | number
    darkScore?: IntFieldUpdateOperationsInput | number
    timeslotId?: StringFieldUpdateOperationsInput | string
  }

  export type GameUncheckedUpdateManyWithoutLightTeamInput = {
    id?: StringFieldUpdateOperationsInput | string
    darkTeamId?: StringFieldUpdateOperationsInput | string
    lightScore?: IntFieldUpdateOperationsInput | number
    darkScore?: IntFieldUpdateOperationsInput | number
    timeslotId?: StringFieldUpdateOperationsInput | string
  }

  export type PlayerUpdateWithoutTeamInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    number?: NullableIntFieldUpdateOperationsInput | number | null
    ageGroup?: AgeGroupUpdateOneRequiredWithoutPlayersNestedInput
  }

  export type PlayerUncheckedUpdateWithoutTeamInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    number?: NullableIntFieldUpdateOperationsInput | number | null
    ageGroupId?: StringFieldUpdateOperationsInput | string
  }

  export type PlayerUncheckedUpdateManyWithoutTeamInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    number?: NullableIntFieldUpdateOperationsInput | number | null
    ageGroupId?: StringFieldUpdateOperationsInput | string
  }

  export type TimeslotCreateManyAgeGroupInput = {
    id?: string
    location: $Enums.Location
    court: number
    date: Date | string
  }

  export type PlayerCreateManyAgeGroupInput = {
    id?: string
    firstName: string
    lastName: string
    number?: number | null
    teamId: string
  }

  export type TeamCreateManyAgeGroupInput = {
    id?: string
    name: string
    division?: number | null
  }

  export type TimeslotUpdateWithoutAgeGroupInput = {
    id?: StringFieldUpdateOperationsInput | string
    location?: EnumLocationFieldUpdateOperationsInput | $Enums.Location
    court?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    game?: GameUpdateOneWithoutTimeslotNestedInput
  }

  export type TimeslotUncheckedUpdateWithoutAgeGroupInput = {
    id?: StringFieldUpdateOperationsInput | string
    location?: EnumLocationFieldUpdateOperationsInput | $Enums.Location
    court?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    game?: GameUncheckedUpdateOneWithoutTimeslotNestedInput
  }

  export type TimeslotUncheckedUpdateManyWithoutAgeGroupInput = {
    id?: StringFieldUpdateOperationsInput | string
    location?: EnumLocationFieldUpdateOperationsInput | $Enums.Location
    court?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlayerUpdateWithoutAgeGroupInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    number?: NullableIntFieldUpdateOperationsInput | number | null
    team?: TeamUpdateOneRequiredWithoutPlayersNestedInput
  }

  export type PlayerUncheckedUpdateWithoutAgeGroupInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    number?: NullableIntFieldUpdateOperationsInput | number | null
    teamId?: StringFieldUpdateOperationsInput | string
  }

  export type PlayerUncheckedUpdateManyWithoutAgeGroupInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    number?: NullableIntFieldUpdateOperationsInput | number | null
    teamId?: StringFieldUpdateOperationsInput | string
  }

  export type TeamUpdateWithoutAgeGroupInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    division?: NullableIntFieldUpdateOperationsInput | number | null
    lightGames?: GameUpdateManyWithoutDarkTeamNestedInput
    darkGames?: GameUpdateManyWithoutLightTeamNestedInput
    players?: PlayerUpdateManyWithoutTeamNestedInput
  }

  export type TeamUncheckedUpdateWithoutAgeGroupInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    division?: NullableIntFieldUpdateOperationsInput | number | null
    lightGames?: GameUncheckedUpdateManyWithoutDarkTeamNestedInput
    darkGames?: GameUncheckedUpdateManyWithoutLightTeamNestedInput
    players?: PlayerUncheckedUpdateManyWithoutTeamNestedInput
  }

  export type TeamUncheckedUpdateManyWithoutAgeGroupInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    division?: NullableIntFieldUpdateOperationsInput | number | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}