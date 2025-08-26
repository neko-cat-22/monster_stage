let conditionToggle = false; // 条件切り替え状態
let activeGimmicks = new Set(); // 押されているギミック群

// DOM取得
const searchBox = document.getElementById("searchBox");
const conditionBtn = document.getElementById("conditionToggle");
const gimmickContainer = document.getElementById("gimmickButtons");
const questList = document.getElementById("questList");

// ギミックボタン生成
function createGimmickButtons() {
  gimmicks.forEach(g => {
    const btn = document.createElement("button");
    btn.textContent = g;
    btn.className = "gimmick-btn";
    btn.addEventListener("click", () => {
      if (activeGimmicks.has(g)) {
        activeGimmicks.delete(g);
        btn.classList.remove("active");
      } else {
        activeGimmicks.add(g);
        btn.classList.add("active");
      }
      renderQuests();
    });
    gimmickContainer.appendChild(btn);
  });
}

// 条件切り替えボタン
conditionBtn.addEventListener("click", () => {
  conditionToggle = !conditionToggle;
  conditionBtn.textContent = `条件切り替え: ${conditionToggle ? "ON" : "OFF"}`;
  renderQuests();
});

// クエスト表示
function renderQuests() {
  const keyword = searchBox.value.trim();
  questList.innerHTML = "";

  quests.forEach(q => {
    // 検索フィルタ（名前）
    if (keyword && !q.name.includes(keyword)) return;

    // 必須ギミック判定
    let requiredTags = [...q.required];
    if (conditionToggle) {
      requiredTags = Array.from(new Set([...q.required, ...q.appearance]));
    }

    const hasAll = requiredTags.every(tag => activeGimmicks.has(tag));
    if (!hasAll) return;

    // カード生成
    const card = document.createElement("div");
    card.className = "quest-card " + getAttributeClass(q.attribute);

    card.innerHTML = `
      <div>${q.category} : ${q.name}</div>
      <div>必須: ${q.required.join(", ") || "なし"}</div>
      <div>出現: ${q.appearance.join(", ") || "なし"}</div>
      <div>${q.stage.join(", ")}</div>
    `;
    questList.appendChild(card);
  });
}

// 属性クラス変換
function getAttributeClass(attr) {
  switch (attr) {
    case "火": return "quest-fire";
    case "水": return "quest-water";
    case "木": return "quest-wood";
    case "光": return "quest-light";
    case "闇": return "quest-dark";
    default: return "";
  }
}

// イベント設定
searchBox.addEventListener("input", renderQuests);

// 初期化
createGimmickButtons();
renderQuests();
