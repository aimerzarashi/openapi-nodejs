/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */


export interface paths {
  "/stock/items": {
    /**
     * Create Stock Item
     * @description Create Stock Item
     */
    post: operations["PostStockItem"];
  };
}

export type webhooks = Record<string, never>;

export interface components {
  schemas: {
    CreatedResponse: {
      /** Format: uuid */
      id: string;
    };
    BadRequestResponse: {
        message?: string;
      }[];
    StockItem: {
      name: string;
    };
  };
  responses: {
    /** @description Created */
    Created: {
      content: {
        "application/json": components["schemas"]["CreatedResponse"];
      };
    };
    /** @description Bad Request */
    BadRequest: {
      content: {
        "application/json": components["schemas"]["BadRequestResponse"];
      };
    };
    /** @description Internal Server Error */
    InternalServerError: {
      content: never;
    };
  };
  parameters: never;
  requestBodies: never;
  headers: never;
  pathItems: never;
}

export type $defs = Record<string, never>;

export type external = Record<string, never>;

export interface operations {

  /**
   * Create Stock Item
   * @description Create Stock Item
   */
  PostStockItem: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["StockItem"];
      };
    };
    responses: {
      201: components["responses"]["Created"];
      400: components["responses"]["BadRequest"];
      500: components["responses"]["InternalServerError"];
    };
  };
}
