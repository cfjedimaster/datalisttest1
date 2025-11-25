const CATS = "691b3bd2bb9b164290a66b91";

export const config = {
    runtime: "edge",
};


export async function GET({ params, request, locals }) {
  let url = new URL(request.url);
  let qs = Object.fromEntries(url.searchParams);
  let name = qs.name || "";
  let KEY = locals.runtime.env.CMSKEY;

  let filter = '';
  if(name !== '') filter = '?name=' + encodeURIComponent(name);

  const catsReq = await fetch(`https://api.webflow.com/v2/collections/${CATS}/items/live${filter}`, {
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

  return new Response(JSON.stringify(cats), {
    status: 200,
    headers: {
        'Content-Type': 'application/json'
    }
  });
}

