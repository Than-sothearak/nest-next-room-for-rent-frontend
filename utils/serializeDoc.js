// lib/serializeDoc.ts
export function serializeDoc (doc){
  return JSON.parse(JSON.stringify(doc));
}
