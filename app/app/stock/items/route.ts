import { NextResponse } from "next/server";
import { paths, components } from "@/codegen/openapi/stockItem";
import { PrismaClient } from "@prisma/client";

type StockItem = paths["/stock/items"]["post"];
type RequestBody = StockItem["requestBody"]["content"]["application/json"];
type ResponseBodyCreated = components["responses"]["Created"]["content"]["application/json"];
type ResponseBodyBadRequest = components["responses"]["BadRequest"]["content"]["application/json"];

export async function POST(request: Request) {
  const body: RequestBody = await request.json();
  if (!body.name) {
    const Namerequired: ResponseBodyBadRequest = [{
      message: "name is required"
    }];
    return NextResponse.json(
      Namerequired,
      { status: 400 }
    );
  }

  const prisma = new PrismaClient();
  if (!prisma) {
    return NextResponse.json(
      { status: 500 }
    );
  }

  const stockItem = await prisma.stockItem.create({
    data: {
      name: body.name
    }
  });

  if (!stockItem) {
    return NextResponse.json(
      { status: 500 }
    );
  }

  const Created: ResponseBodyCreated = {
    id: stockItem.id
  }
  return NextResponse.json(
    Created,
    { status: 201 }
  );
}