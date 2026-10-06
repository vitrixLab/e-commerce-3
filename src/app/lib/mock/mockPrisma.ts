// In-memory Prisma-compatible store, seeded from local fixtures.
// No database, no network: every query is answered from this process.

import { Prisma } from "@prisma/client";
import { buildSeedData } from "./fixtures";

type Row = Record<string, any>;

type Relation =
  | { kind: "one"; target: string; fk: string }
  | { kind: "many"; target: string; fk: string };

type ModelMeta = {
  pk: string;
  autoincrement?: boolean;
  decimals?: string[];
  required?: string[];
  uniques?: string[][];
  relations: Record<string, Relation>;
  defaults?: () => Row;
};

const cuid = (() => {
  let counter = 0;
  return (prefix: string) => `${prefix}${(++counter).toString(36).padStart(6, "0")}`;
})();

const MODELS: Record<string, ModelMeta> = {
  Product: {
    pk: "id",
    decimals: ["sellingPrice", "costPrice", "discount"],
    required: [
      "name",
      "description",
      "sellingPrice",
      "stockQty",
      "categoryId",
      "brand",
      "material",
      "originCountry",
    ],
    relations: {
      category: { kind: "one", target: "Category", fk: "categoryId" },
      tags: { kind: "many", target: "Tag", fk: "productId" },
      cartItems: { kind: "many", target: "Cart", fk: "productId" },
      orderItems: { kind: "many", target: "OrderItem", fk: "productId" },
      colors: { kind: "many", target: "ProductColor", fk: "productId" },
      features: { kind: "many", target: "ProductFeature", fk: "productId" },
      images: { kind: "many", target: "ProductImage", fk: "productId" },
      sizes: { kind: "many", target: "ProductSize", fk: "productId" },
      reviews: { kind: "many", target: "Review", fk: "productId" },
      wishlistItems: { kind: "many", target: "WishlistItem", fk: "productId" },
    } as Record<string, Relation>,
    defaults: () => ({
      id: cuid("prod_"),
      costPrice: 10,
      stockQty: 1,
      discount: null,
      mainImgUrl:
        "https://res.cloudinary.com/dcfrlqakq/image/upload/v1753473129/image_1_lapjpe.png",
      createdAt: new Date(),
      updatedAt: new Date(),
    }),
  },
  Tag: {
    pk: "id",
    required: ["name"],
    relations: {
      Product: { kind: "one", target: "Product", fk: "productId" },
    } as Record<string, Relation>,
    defaults: () => ({ id: cuid("tag_"), productId: null }),
  },
  ProductImage: {
    pk: "id",
    required: ["url", "productId"],
    relations: {
      ProductColor: { kind: "one", target: "ProductColor", fk: "productColorId" },
      product: { kind: "one", target: "Product", fk: "productId" },
    } as Record<string, Relation>,
    defaults: () => ({
      id: cuid("img_"),
      alt: null,
      productColorId: null,
    }),
  },
  ProductSize: {
    pk: "id",
    required: ["size", "stockQty", "productId"],
    relations: {
      product: { kind: "one", target: "Product", fk: "productId" },
      cartItems: { kind: "many", target: "Cart", fk: "sizeId" },
    } as Record<string, Relation>,
    defaults: () => ({ id: cuid("sz_") }),
  },
  ProductColor: {
    pk: "id",
    required: ["color", "productId"],
    relations: {
      product: { kind: "one", target: "Product", fk: "productId" },
      cartItems: { kind: "many", target: "Cart", fk: "colorId" },
      images: { kind: "many", target: "ProductImage", fk: "productColorId" },
    } as Record<string, Relation>,
    defaults: () => ({ id: cuid("col_"), hexCode: null, stockQty: 1 }),
  },
  ProductFeature: {
    pk: "id",
    required: ["key", "value", "productId"],
    relations: {
      product: { kind: "one", target: "Product", fk: "productId" },
    } as Record<string, Relation>,
    defaults: () => ({ id: cuid("ft_") }),
  },
  Review: {
    pk: "id",
    uniques: [["productId", "customerId"]],
    required: ["productId", "customerId", "rating", "comment"],
    relations: {
      customer: { kind: "one", target: "Customer", fk: "customerId" },
      product: { kind: "one", target: "Product", fk: "productId" },
    } as Record<string, Relation>,
    defaults: () => ({
      id: cuid("rev_"),
      images: [],
      videos: "",
      verified: false,
      title: "No title",
      createdAt: new Date(),
    }),
  },
  Category: {
    pk: "id",
    autoincrement: true,
    required: ["name", "description"],
    relations: {
      products: { kind: "many", target: "Product", fk: "categoryId" },
    } as Record<string, Relation>,
    defaults: () => ({}),
  },
  Customer: {
    pk: "id",
    uniques: [["email"]],
    required: [],
    relations: {
      carts: { kind: "many", target: "Cart", fk: "customerId" },
      orders: { kind: "many", target: "Order", fk: "customerId" },
      reviews: { kind: "many", target: "Review", fk: "customerId" },
      wishlistItems: { kind: "many", target: "WishlistItem", fk: "customerId" },
    } as Record<string, Relation>,
    defaults: () => ({
      id: cuid("cus_"),
      name: null,
      email: null,
      userAvatarUrl: null,
      provider: null,
      providerId: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    }),
  },
  Cart: {
    pk: "id",
    uniques: [["customerId", "productId", "colorId", "sizeId"]],
    required: ["customerId", "colorId", "itemQty", "productId", "sizeId"],
    relations: {
      color: { kind: "one", target: "ProductColor", fk: "colorId" },
      customer: { kind: "one", target: "Customer", fk: "customerId" },
      product: { kind: "one", target: "Product", fk: "productId" },
      size: { kind: "one", target: "ProductSize", fk: "sizeId" },
    } as Record<string, Relation>,
    defaults: () => ({
      id: cuid("cart_"),
      createdAt: new Date(),
      updatedAt: new Date(),
    }),
  },
  WishlistItem: {
    pk: "id",
    uniques: [["customerId", "productId"]],
    required: ["customerId", "productId"],
    relations: {
      customer: { kind: "one", target: "Customer", fk: "customerId" },
      product: { kind: "one", target: "Product", fk: "productId" },
    } as Record<string, Relation>,
    defaults: () => ({ id: cuid("wsh_"), createdAt: new Date() }),
  },
  Admin: {
    pk: "id",
    uniques: [["email"]],
    required: ["name", "email"],
    relations: {} as Record<string, Relation>,
    defaults: () => ({
      id: cuid("adm_"),
      userAvatarUrl: null,
      createdAt: new Date(),
    }),
  },
  Order: {
    pk: "id",
    decimals: ["totalAmount"],
    required: ["customerId", "totalAmount"],
    relations: {
      customer: { kind: "one", target: "Customer", fk: "customerId" },
      items: { kind: "many", target: "OrderItem", fk: "orderId" },
    } as Record<string, Relation>,
    defaults: () => ({
      id: cuid("ord_"),
      status: "PENDING",
      createdAt: new Date(),
    }),
  },
  OrderItem: {
    pk: "id",
    decimals: ["price", "couponDiscount", "shippingCost", "taxes"],
    required: ["orderId", "quantity", "price", "shippingCost", "taxes"],
    relations: {
      order: { kind: "one", target: "Order", fk: "orderId" },
      product: { kind: "one", target: "Product", fk: "productId" },
    } as Record<string, Relation>,
    defaults: () => ({
      id: cuid("oit_"),
      productId: null,
      couponDiscount: null,
    }),
  },
} satisfies Record<string, ModelMeta>;

const MODEL_NAMES = Object.keys(MODELS) as string[];

function createTables(): Record<string, Row[]> {
  const seed = buildSeedData() as Record<string, Row[]>;
  const tables: Record<string, Row[]> = {};
  for (const name of MODEL_NAMES) {
    const key = name.charAt(0).toLowerCase() + name.slice(1);
    tables[name] = (seed[key] ?? []).map((row) => ({ ...row }));
  }
  return tables;
}

let tables = createTables();

export function resetMockDatabase() {
  tables = createTables();
}

function meta(model: string): ModelMeta {
  const found = MODELS[model];
  if (!found) throw new Error(`Unknown model: ${model}`);
  return found as ModelMeta;
}

function validationError(message: string) {
  return new Prisma.PrismaClientValidationError(message, { clientVersion: "6.0.0-mock" });
}

function notFound(model: string) {
  return new Prisma.PrismaClientKnownRequestError(
    `An operation failed because it depends on one or more records that were required but not found.`,
    { code: "P2025", clientVersion: "6.0.0-mock" },
  );
}

function uniqueError(model: string, fields: string[]) {
  return new Prisma.PrismaClientKnownRequestError(
    `Unique constraint failed on the fields: (\`${fields.join("`, \`")}\`) on model \`${model}\``,
    { code: "P2002", clientVersion: "6.0.0-mock" },
  );
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value) && !(value instanceof Date);
}

function scalarMatch(rowValue: unknown, condition: unknown): boolean {
  if (isPlainObject(condition) && !isDate(condition)) {
    return Object.entries(condition).every(([op, operand]) => {
      switch (op) {
        case "in":
          return (operand as unknown[]).some((candidate) => looseEqual(rowValue, candidate));
        case "notIn":
          return !(operand as unknown[]).some((candidate) => looseEqual(rowValue, candidate));
        case "startsWith":
          return (
            typeof rowValue === "string" && rowValue.startsWith(operand as string)
          );
        case "endsWith":
          return typeof rowValue === "string" && rowValue.endsWith(operand as string);
        case "contains":
          return typeof rowValue === "string" && rowValue.includes(operand as string);
        case "lt":
          return Number(rowValue) < Number(operand);
        case "lte":
          return Number(rowValue) <= Number(operand);
        case "gt":
          return Number(rowValue) > Number(operand);
        case "gte":
          return Number(rowValue) >= Number(operand);
        case "not":
          return !scalarMatch(rowValue, operand);
        case "equals":
          return looseEqual(rowValue, operand);
        case "mode":
          return true;
        default:
          return looseEqual(rowValue, operand);
      }
    });
  }
  if (condition === null) return rowValue === null || rowValue === undefined;
  return looseEqual(rowValue, condition);
}

function isDate(value: unknown): value is Date {
  return value instanceof Date;
}

function looseEqual(a: unknown, b: unknown): boolean {
  if (a instanceof Date || b instanceof Date) {
    return new Date(a as any).getTime() === new Date(b as any).getTime();
  }
  if (typeof a === "number" && typeof b === "string") return String(a) === b;
  if (typeof a === "string" && typeof b === "number") return a === String(b);
  if (typeof a === "string" && typeof b === "boolean") return a === String(b);
  return a === b;
}

function resolveRelation(model: string, row: Row, name: string) {
  const relation = meta(model).relations[name];
  if (!relation) throw new Error(`Unknown relation \`${name}\` on model \`${model}\``);

  if (relation.kind === "one") {
    const targetPk = meta(relation.target).pk;
    const key = row[relation.fk];
    if (key === null || key === undefined) return null;
    return (
      tables[relation.target].find((candidate) => candidate[targetPk] === key) ?? null
    );
  }

  const localPk = meta(model).pk;
  return tables[relation.target].filter(
    (candidate) => candidate[relation.fk] === row[localPk],
  );
}

function toOutput(model: string, field: string, value: unknown) {
  const decimals = meta(model).decimals ?? [];
  if (!decimals.includes(field)) return value;
  if (value === null || value === undefined) return value;
  if (value instanceof Prisma.Decimal) return value;
  return new Prisma.Decimal(value as any);
}

function project(
  model: string,
  row: Row,
  args: { select?: Row; include?: Row } = {},
): Row {
  const meta_ = meta(model);
  const { select, include } = args;

  if (select) {
    const out: Row = {};
    for (const [key, value] of Object.entries(select)) {
      if (!value) continue;
      if (key === "_count") {
        out._count = countOf(model, row, value as Row);
        continue;
      }
      const relation = meta_.relations[key];
      if (relation) {
        out[key] = projectRelation(model, row, key, value as Row | true);
      } else {
        out[key] = toOutput(model, key, row[key]);
      }
    }
    return out;
  }

  const out: Row = {};
  for (const [key, value] of Object.entries(row)) {
    if (meta_.relations[key]) continue;
    out[key] = toOutput(model, key, value);
  }

  if (include) {
    for (const [key, value] of Object.entries(include)) {
      if (!value) continue;
      if (key === "_count") {
        out._count = countOf(model, row, value as Row);
        continue;
      }
      if (!meta_.relations[key]) continue;
      out[key] = projectRelation(model, row, key, value as Row | true);
    }
  }
  return out;
}

function countOf(model: string, row: Row, select: Row): Row {
  const meta_ = meta(model);
  const out: Row = {};
  for (const [name, on] of Object.entries(select)) {
    if (!on) continue;
    const relation = meta_.relations[name];
    if (!relation) continue;
    const related = resolveRelation(model, row, name);
    out[name] =
      relation.kind === "one" ? (related ? 1 : 0) : (related as Row[]).length;
  }
  return out;
}

function projectRelation(model: string, row: Row, name: string, args: Row | true) {
  const relation = meta(model).relations[name];
  if (!relation) return null;
  const target = relation.target;
  const nestedArgs = args === true ? {} : args;

  if (relation.kind === "one") {
    const related = resolveRelation(model, row, name);
    if (!related) return null;
    return project(target, related, nestedArgs);
  }

  const related = resolveRelation(model, row, name) as Row[];
  let projected = related.map((entry) => project(target, entry, nestedArgs));
  if (typeof nestedArgs.skip === "number") {
    projected = projected.slice(nestedArgs.skip);
  }
  if (typeof nestedArgs.take === "number") {
    projected = projected.slice(0, nestedArgs.take);
  }
  return projected;
}

function matches(model: string, row: Row, where: Row | undefined): boolean {
  if (!where) return true;

  for (const [key, condition] of Object.entries(where)) {
    if (condition === undefined) continue;

    if (key === "OR") {
      if (!(condition as Row[]).some((sub) => matches(model, row, sub))) return false;
      continue;
    }
    if (key === "AND") {
      const list = Array.isArray(condition) ? condition : [condition];
      if (!list.every((sub) => matches(model, row, sub as Row))) return false;
      continue;
    }
    if (key === "NOT") {
      const list = Array.isArray(condition) ? condition : [condition];
      if (list.some((sub) => matches(model, row, sub as Row))) return false;
      continue;
    }

    const relation = meta(model).relations[key];
    if (relation && isPlainObject(condition)) {
      const related = resolveRelation(model, row, key);
      if (relation.kind === "one") {
        if (!related || !matches(relation.target, related, condition as Row)) return false;
      } else {
        if (!(related as Row[]).some((entry) => matches(relation.target, entry, condition as Row)))
          return false;
      }
      continue;
    }

    if (!scalarMatch(row[key], condition)) return false;
  }
  return true;
}

function sorted(rows: Row[], orderBy: Row | Row[] | undefined): Row[] {
  if (!orderBy) return rows;
  const clauses = Array.isArray(orderBy) ? orderBy : [orderBy];
  return [...rows].sort((a, b) => {
    for (const clause of clauses) {
      const [field, direction] = Object.entries(clause)[0] as [string, string];
      const left = a[field];
      const right = b[field];
      if (left === right) continue;
      const factor = direction === "desc" ? -1 : 1;
      if (left === null || left === undefined) return 1;
      if (right === null || right === undefined) return -1;
      if (left < right) return -1 * factor;
      if (left > right) return 1 * factor;
    }
    return 0;
  });
}

function assertRequired(model: string, data: Row, forCreate: boolean) {
  if (!forCreate) return;
  const { pk, required = [], defaults } = meta(model);
  const provided = defaults ? { ...defaults(), ...data } : data;
  const missing = required.filter(
    (field) => provided[field] === undefined || provided[field] === null,
  );
  if (missing.length) {
    throw validationError(
      `Argument missing for model \`${model}\`: ${missing.map((f) => `\`${f}\``).join(", ")}.`,
    );
  }
  if (
    !meta(model).autoincrement &&
    (provided[pk] === undefined || provided[pk] === null)
  ) {
    throw validationError(`Argument \`${pk}\` is missing for model \`${model}\`.`);
  }
}

function assertUnique(model: string, data: Row, excludeRow?: Row) {
  const { pk, uniques = [] } = meta(model);
  const rows = tables[model];

  if (data[pk] !== undefined && data[pk] !== null) {
    const clash = rows.find(
      (row) => row[pk] === data[pk] && row !== excludeRow,
    );
    if (clash) throw uniqueError(model, [pk]);
  }

  for (const fields of uniques) {
    if (fields.some((field) => data[field] === undefined || data[field] === null)) continue;
    const clash = rows.find(
      (row) => row !== excludeRow && fields.every((field) => looseEqual(row[field], data[field])),
    );
    if (clash) throw uniqueError(model, fields);
  }
}

function nextId(model: string, data: Row): unknown {
  const { pk, autoincrement } = meta(model);
  if (data[pk] !== undefined && data[pk] !== null) return data[pk];
  if (autoincrement) {
    const max = tables[model].reduce(
      (acc, row) => Math.max(acc, Number(row[pk]) || 0),
      0,
    );
    return max + 1;
  }
  return cuid(`${model.toLowerCase()}_`);
}

function insert(model: string, input: Row): Row {
  assertRequired(model, input, true);
  const meta_ = meta(model);
  const { defaults, pk } = meta_;
  const row: Row = { ...(defaults ? defaults() : {}) };
  const nested: Array<{ field: string; value: Row }> = [];
  for (const [key, value] of Object.entries(input)) {
    if (value === undefined) continue;
    if (isPlainObject(value) && !(value instanceof Prisma.Decimal) && isNestedWrite(value)) {
      nested.push({ field: key, value: value as Row });
      continue;
    }
    row[key] = value;
  }
  row[pk] = nextId(model, row);
  if ("createdAt" in row) row.createdAt = row.createdAt ?? new Date();
  if ("updatedAt" in row) row.updatedAt = new Date();
  assertUnique(model, row);
  tables[model].push(row);
  for (const { field, value } of nested) applyNestedWrite(model, row, field, value);
  return row;
}

function findConnected(target: string, where: Row): Row | undefined {
  const pk = meta(target).pk;
  if (where[pk] !== undefined && where[pk] !== null) {
    return tables[target].find((row) => looseEqual(row[pk], where[pk]));
  }
  return findRows(target, where)[0];
}

function applyNestedWrite(model: string, row: Row, field: string, value: Row) {
  const relation = meta(model).relations[field];
  if (!relation) return;
  const parentPk = row[meta(model).pk];

  if (relation.kind === "many") {
    if (value.create !== undefined) {
      const list = Array.isArray(value.create) ? value.create : [value.create];
      for (const data of list) insert(relation.target, { ...data, [relation.fk]: parentPk });
    }
    if (value.connect !== undefined) {
      const list = Array.isArray(value.connect) ? value.connect : [value.connect];
      for (const spec of list) {
        const child = findConnected(relation.target, spec);
        if (!child) throw notFound(relation.target);
        child[relation.fk] = parentPk;
      }
    }
    return;
  }

  if (value.connect !== undefined) {
    const child = findConnected(relation.target, value.connect);
    if (!child) throw notFound(relation.target);
    row[relation.fk] = child[meta(relation.target).pk];
  }
  if (value.create !== undefined) {
    const child = insert(relation.target, value.create);
    row[relation.fk] = child[meta(relation.target).pk];
  }
}

function isNestedWrite(value: Record<string, unknown>): boolean {
  return ["create", "connect", "connectOrCreate", "set", "increment", "decrement", "disconnect", "delete", "updateMany"].some(
    (op) => op in value,
  );
}

function applyUpdate(model: string, row: Row, data: Row) {
  const nested: Array<{ field: string; value: Row }> = [];
  for (const [key, value] of Object.entries(data)) {
    if (value === undefined) continue;
    if (isPlainObject(value) && !(value instanceof Prisma.Decimal) && isNestedWrite(value)) {
      if ("increment" in value) row[key] = Number(row[key] ?? 0) + Number((value as any).increment);
      if ("decrement" in value) row[key] = Number(row[key] ?? 0) - Number((value as any).decrement);
      if ("set" in value) row[key] = (value as any).set;
      if ("create" in value || "connect" in value) nested.push({ field: key, value: value as Row });
      continue;
    }
    row[key] = value;
  }
  for (const { field, value } of nested) applyNestedWrite(model, row, field, value);
  if ("updatedAt" in row) row.updatedAt = new Date();
  assertUnique(model, row, row);
}

function findRows(model: string, where?: Row): Row[] {
  return tables[model].filter((row) => matches(model, row, where));
}

function delegate(model: string) {
  return {
    async findMany(args: Row = {}) {
      let rows = findRows(model, args.where);
      rows = sorted(rows, args.orderBy);
      if (typeof args.skip === "number") rows = rows.slice(args.skip);
      if (typeof args.take === "number") rows = rows.slice(0, args.take);
      return rows.map((row) => project(model, row, args));
    },

    async findUnique(args: Row) {
      const row = findRows(model, args.where)[0];
      return row ? project(model, row, args) : null;
    },

    async findFirst(args: Row = {}) {
      const ordered = sorted(findRows(model, args.where), args.orderBy);
      return ordered[0] ? project(model, ordered[0], args) : null;
    },

    async create(args: Row) {
      const row = insert(model, { ...args.data });
      return project(model, row, args);
    },

    async createMany(args: Row) {
      const rows = Array.isArray(args.data) ? args.data : [args.data];
      let count = 0;
      for (const entry of rows) {
        try {
          insert(model, entry);
          count++;
        } catch (error) {
          if (!args.skipDuplicates) throw error;
        }
      }
      return { count };
    },

    async update(args: Row) {
      const row = findRows(model, args.where)[0];
      if (!row) throw notFound(model);
      applyUpdate(model, row, args.data ?? {});
      return project(model, row, args);
    },

    async updateMany(args: Row) {
      const rows = findRows(model, args.where);
      for (const row of rows) applyUpdate(model, row, args.data ?? {});
      return { count: rows.length };
    },

    async upsert(args: Row) {
      const row = findRows(model, args.where)[0];
      if (row) {
        applyUpdate(model, row, args.update ?? {});
        return project(model, row, args);
      }
      const created = insert(model, { ...args.create });
      return project(model, created, args);
    },

    async delete(args: Row) {
      const index = tables[model].findIndex((row) => matches(model, row, args.where));
      if (index === -1) throw notFound(model);
      const [row] = tables[model].splice(index, 1);
      return project(model, row, args);
    },

    async deleteMany(args: Row = {}) {
      const remaining: Row[] = [];
      let count = 0;
      for (const row of tables[model]) {
        if (matches(model, row, args.where)) count++;
        else remaining.push(row);
      }
      tables[model] = remaining;
      return { count };
    },

    async count(args: Row = {}) {
      return findRows(model, args.where).length;
    },

    async aggregate(args: Row = {}) {
      const rows = findRows(model, args.where);
      const result: Row = {};
      for (const [field, ops] of Object.entries(args as Row)) {
        if (!isPlainObject(ops)) continue;
        const target = field.replace("_sum", "").replace("_avg", "").replace("_min", "").replace("_max", "");
        const values = rows.map((row) => Number(row[target])).filter((value) => !Number.isNaN(value));
        if (field.endsWith("_sum")) result[field] = values.reduce((a, b) => a + b, 0);
        if (field.endsWith("_avg"))
          result[field] = values.length ? values.reduce((a, b) => a + b, 0) / values.length : null;
        if (field.endsWith("_min")) result[field] = values.length ? Math.min(...values) : null;
        if (field.endsWith("_max")) result[field] = values.length ? Math.max(...values) : null;
      }
      return result;
    },

    async groupBy(args: Row) {
      const by = (Array.isArray(args.by) ? args.by : [args.by]) as string[];
      const rows = findRows(model, args.where);
      const groups = new Map<string, Row[]>();
      for (const row of rows) {
        const key = by.map((field) => String(row[field])).join("|");
        if (!groups.has(key)) groups.set(key, []);
        groups.get(key)!.push(row);
      }
      const output: Row[] = [];
      for (const group of groups.values()) {
        const head = group[0];
        const entry: Row = {};
        for (const field of by) entry[field] = head[field];
        for (const [field, ops] of Object.entries(args as Row)) {
          if (!isPlainObject(ops)) continue;
          const values = group
            .map((row) => Number(row[field]))
            .filter((value) => !Number.isNaN(value));
          if (field.endsWith("_sum")) entry[field] = values.reduce((a, b) => a + b, 0);
          if (field.endsWith("_count")) entry[field] = group.length;
        }
        output.push(entry);
      }
      return output;
    },
  };
}

async function runTransaction(input: unknown) {
  if (typeof input === "function") {
    return (input as (tx: unknown) => Promise<unknown>)(mockPrisma);
  }
  const operations = await Promise.all(input as Promise<unknown>[]);
  return operations;
}

export const mockPrisma = {
  ...Object.fromEntries(
    MODEL_NAMES.map((name) => [name.charAt(0).toLowerCase() + name.slice(1), delegate(name)]),
  ),
  $transaction: runTransaction,
  async $connect() {},
  async $disconnect() {},
  async $queryRaw() {
    throw new Error(
      "Raw SQL is not available in mock mode: the app runs on local fixture data only.",
    );
  },
  async $queryRawUnsafe() {
    return mockPrisma.$queryRaw();
  },
  async $executeRaw() {
    return mockPrisma.$queryRaw();
  },
  async $executeRawUnsafe() {
    return mockPrisma.$queryRaw();
  },
  $on() {},
  $extends: (extension: unknown) => extension,
};
