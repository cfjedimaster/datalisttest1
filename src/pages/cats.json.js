const CATS = "691b3bd2bb9b164290a66b91";

export const config = {
    runtime: "edge",
};

// I take an array of raw CMS items and attempt to correct options
// This is a work in progress and could be improved. For now, I use a hard coded
// set of mappings
const optionMappings = {
  "gender": [
    {
      "name": "Male",
      "id": "18e9905214ba268d86ae1222acd66ad8"
    },
    {
      "name": "Female",
      "id": "e0331b12f028facd7e22b5e4246a882c"
    }
  ]
}

const mapOptions = item => {
  for(let k in item) {
    if(optionMappings[k]) {
      for(let o of optionMappings[k]) {
        if(item[k] === o.id) {
          item[k] = o.name;
        }
      }
    }
  }
  return item;
}

export async function GET({ params, request, locals }) {
  let url = new URL(request.url);
  let qs = Object.fromEntries(url.searchParams);
  let name = qs.name || "";
  let KEY = locals.runtime.env.CMSKEY;

  let filter = '';
  if(name !== '') filter = '?name=' + encodeURIComponent(name);

  const catsReq = await fetch(`https://api-cdn.webflow.com/v2/collections/${CATS}/items/live${filter}`, {
    headers: {
      "Authorization": `Bearer ${KEY}`,
    }
  });
  const catsData = await catsReq.json();

  const cats = catsData.items.map(c => {
    return {
      ...mapOptions(c.fieldData),
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

