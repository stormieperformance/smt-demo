const SUPABASE_URL = "PASTE_HERE";
const SUPABASE_KEY = "PASTE_HERE";

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

async function loadNews() {
  const { data, error } = await supabase
    .from('news')
    .select('*')
    .eq('active', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error(error);
    return;
  }

  const container = document.getElementById("news");
  container.innerHTML = "";

  data.forEach(item => {
    const div = document.createElement("div");

    div.innerHTML = `
      <h3>${item.title}</h3>
      <p>${item.content}</p>
      ${item.image_url ? `<img src="${item.image_url}" style="width:100%; margin-top:10px;">` : ""}
    `;

    container.appendChild(div);
  });
}

loadNews();
