/// <reference types="node" />
import { SanityDocument } from "./types/sanity";
let SANITY_STUDIO_PROJECT_ID: any;
let SANITY_STUDIO_DATASET: any;
if (typeof process !== 'undefined' && process.env) {
  if (process.env.SANITY_STUDIO_PROJECT_ID) {
    SANITY_STUDIO_PROJECT_ID = process.env.SANITY_STUDIO_PROJECT_ID;
  }
  if (process.env.SANITY_STUDIO_DATASET) {
    SANITY_STUDIO_DATASET = process.env.SANITY_STUDIO_DATASET;
  }
}

export function getProductFromSlug(slug: string): Promise<SanityDocument> {
  const query = `*[_type == 'product' && store.slug.current == '${slug}'][0]`;
  const url = `https://${SANITY_STUDIO_PROJECT_ID}.api.sanity.io/v1/data/query/${SANITY_STUDIO_DATASET}`;
  const response = api<SanityDocument>(url, query);
  return response;
}

async function api<T>(url: string, query: string): Promise<T> {
  const res: any = await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      query: query,
    }),
    headers: {
      "content-type": "application/json",
    },
  });
  const res_1 = await res.json();
  const resJson = res_1.result;
  const res_2 = {
    ok: res.ok,
    status: res.status,
    body: resJson,
  };
  if (res_2.ok) {
    return res_2.body;
  }
  return Promise.reject({
    status: res_2.status,
    message: res_2.body,
  });
}
