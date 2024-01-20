import { NextResponse } from "next/server";
import { paths } from "@/codegen/openapi/hello";

type Paths = paths["/"]["get"];
type Responses = Paths["responses"]["200"]["content"]["application/json"];

export async function GET() {
  const hello: Responses = { message: "Hello, World!" };
  return NextResponse.json(
    hello,
    { status: 200 }
  );
}