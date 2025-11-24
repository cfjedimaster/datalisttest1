const CATS = "691b3bd2bb9b164290a66b91";

export const config = {
    runtime: "edge",
};


export async function GET({ params, request, locals }) {

  let KEY = locals.runtime.env.CMSKEY;

  const catsReq = await fetch(`https://api.webflow.com/v2/collections/${CATS}/items/live`, {
    headers: {
      "Authorization": `Bearer ${KEY}`,
    }
  });
  const catsData = await catsReq.json();

  const cats = catsData.items.map(c => {
    return {
      ...c.fieldData,
      id:c.id,
      "doineedtopublish":false
    }
  });

  return new Response(JSON.stringify(cats))
}

