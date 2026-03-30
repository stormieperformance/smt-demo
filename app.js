alert("app.js körs");
const SUPABASE_URL = "https://lhxbzhjymxseucmmodmi.supabase.co";
const SUPABASE_KEY = "sb_publishable__Bs8LsdEtlwHzzAxXkfVYQ_hHptrnE1";

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

async function loadNews() {
  const container = document.getElementById("news");

  container.innerHTML = "<p>Laddar nyheter...</p>";

  const { data, error } = await supabase
    .from("news")
    .select("*")
    .eq("active", true)
    .order("created_at", { ascending: false });

  if (error) {
    container.innerHTML = `<p>Fel från Supabase: ${error.message}</p>`;
    return;
  }

  if (!data || data.length === 0) {
    container.innerHTML = "<p>Inga nyheter hittades.</p>";
    return;
  }

  container.innerHTML = data.map(item => `
    <article>
      <h3>${item.title || ""}</h3>
      <p>${item.content || ""}</p>
      ${item.image_url ? `<img src="${item.image_url}" alt="${item.title || "Nyhet"}">` : ""}
    </article>
  `).join("");
}

loadNews();
