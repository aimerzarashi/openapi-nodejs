import { describe, it } from "node:test";
import assert from "node:assert";

describe("/", () => {
  it("GET", async () => {
    const response = await fetch(`http://localhost:3000/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    assert.strictEqual(
      response.status,
      200,
      "ステータスコードが期待通りではありません");
    assert.deepStrictEqual(
      JSON.parse(await response.text()),
      { message: "Hello, World!" },
      "メッセージが期待通りではありません");
  });
});
