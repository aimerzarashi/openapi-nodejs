import { describe, it } from "node:test";
import assert from "node:assert";
import { paths, components } from "@/codegen/openapi/stockItem";
import { PrismaClient } from "@prisma/client";

type StockItem = paths["/stock/items"]["post"];
type RequestBody = StockItem["requestBody"]["content"]["application/json"];
type ResponseBodyCreated = components["responses"]["Created"]["content"]["application/json"];
type ResponseBodyBadRequest = components["responses"]["BadRequest"]["content"]["application/json"];

describe("/stock/items", () => {
  it("POST Success", async () => {
    const response = await fetch(`http://localhost:3000/stock/items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: "test" }),
    });

    assert.strictEqual(
      response.status,
      201
    );

    const responseBody: ResponseBodyCreated = await response.json();
    if (!responseBody.id) {
      assert.fail();
    }

    const prisma = new PrismaClient();
    if (!prisma) {
      assert.fail();
    }

    const stockItem = await prisma.stockItem.findUnique({
      where: {
        id: responseBody.id
      },
    })
    if (!stockItem) {
      assert.fail();
    }

    assert.ok(stockItem.createdAt);

    assert.ok(stockItem.updatedAt);

    assert.strictEqual(
      stockItem.name,
      "test"
    );
  });

  it("POST Failure name is required", async () => {
    const response = await fetch(`http://localhost:3000/stock/items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });

    assert.strictEqual(
      response.status,
      400
    );

    const responseBody: ResponseBodyBadRequest = await response.json();
    assert.strictEqual(
      responseBody[0].message,
      "name is required"
    );
  });

});
