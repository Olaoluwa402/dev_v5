import { PrismaClient } from "@prisma/client";
export interface Person {
  name: string;
  age: number;
}

export interface LatLon {
  lat: number;
  lon: number;
}

export type AnyModel = keyof PrismaClient;

// export type WhereInput<T extends AnyModel> = {
//   where: PrismaClient[T]["where"];
// };

export type GenericRecord<T> = {
  [key: string]: T;
};
