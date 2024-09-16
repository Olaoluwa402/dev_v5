// import { PrismaClient, Prisma } from "@prisma/client";
// import { AnyModel, WhereInput, GenericRecord } from "../interface";

// export async function paginate<T extends AnyModel>(
//   prisma: PrismaClient,
//   model: T,
//   query: WhereInput<T>,
//   page: number = 1,
//   pageSize: number = 10,
//   otherQueryArgs?: GenericRecord<any>
// ) {
//   const skip = (page - 1) * pageSize;
//   const record = await prisma[model].findMany({
//     where: query.where,
//     ...otherQueryArgs,
//     orderBy: {
//       createdAt: "desc",
//     },
//     skip,
//     take: pageSize,
//   });

//   const totalCount = await prisma[model].count({ where: query.where });
//   const totalPages = Math.ceil(totalCount / pageSize);

//   const hasNextPage = page < totalPages;
//   const hasPrevPage = page > 1;

//   return {
//     currentPage: page,
//     totalPages,
//     hasNextPage,
//     hasPrevPage,
//     nextPage: hasNextPage ? page + 1 : null,
//     prevPage: hasPrevPage ? page - 1 : null,
//     record,
//   };
// }
