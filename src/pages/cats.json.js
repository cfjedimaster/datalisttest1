
const SITE = import.meta.env.WEBFLOW_SITE_ID;
const KEY = import.meta.env.CMSKEY;
const CATS = "691b3bd2bb9b164290a66b91";

console.log("Fetching cats data 5");
console.log("ensuring key works", KEY);
console.log("trying to dump it all", SITE);
console.log(JSON.stringify(import.meta.env));

const catsReq = await fetch(`https://api.webflow.com/v2/collections/${CATS}/items/live`, {
  headers: {
    "Authorization": `Bearer ${KEY}`,
  }
});
const catsData = await catsReq.json();

const cats = catsData.items.map(c => {
  return {
    ...c.fieldData,
    id:c.id
  }
});

export const config = {
    runtime: "edge",
};

export function GET({ params, request }) {
  return new Response(JSON.stringify(cats))
}

