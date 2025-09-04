// script.js
// 属性ごとの色
const attributeColors = {
  "火": "#f44336",
  "水": "#2196f3",
  "木": "#4caf50",
  "光": "#ffeb3b",
  "闇": "#9c27b0"
};

// ページ読み込み時に実行
window.onload = () => {
  generateGimmickButtons();
  renderQuests(quests);

  document.getElementById("searchBox").addEventListener("input", filterQuests);
};

// ギミックボタン生成
function generateGimmickButtons() {
  const container = document.getElementById("gimmickButtons");

  gimmickCategories.forEach(category => {
    // カテゴリタイトル
    const titleEl = document.createElement("h3");
    titleEl.textContent = category.title;
    titleEl.classList.add("gimmick-title");
    container.appendChild(titleEl);

    // ボタングループ
    const group = document.createElement("div");
    group.classList.add("gimmick-group");

    category.gimmicks.forEach(gimmick => {
      const button = document.createElement("button");
      button.textContent = gimmick;
      button.classList.add("gimmick-button");
      button.dataset.gimmick = gimmick;

      button.addEventListener("click", () => {
        button.classList.toggle("active");
        filterQuests();
      });

      group.appendChild(button);
    });

    container.appendChild(group);
  });
}

// クエスト一覧を描画
function renderQuests(list) {
  const questList = document.getElementById("questList");
  questList.innerHTML = "";

  list.forEach(quest => {
    const questItem = document.createElement("div");
    questItem.classList.add("quest-item");

    // 属性カラー
    const attrColor = attributeColors[quest.attribute] || "#ccc";
    questItem.style.borderLeft = `8px solid ${attrColor}`;

    questItem.innerHTML = `
      <div><strong>${quest.category}</strong> - ${quest.name}</div>
      <div>出現ギミック: ${quest.gimmicks.join(" / ")}</div>
    `;

    questList.appendChild(questItem);
  });
}

// フィルタ処理
function filterQuests() {
  const searchValue = document.getElementById("searchBox").value.trim();

  if (searchValue) {
    // 🔎 検索入力がある場合 → 名前検索のみ
    const filtered = quests.filter(q => q.name.includes(searchValue));
    renderQuests(filtered);
    return;
  }

  // 🔎 検索窓が空欄の場合 → ギミック絞り込み
  const activeButtons = document.querySelectorAll(".gimmick-button.active");
  const selectedGimmicks = Array.from(activeButtons).map(btn => btn.dataset.gimmick);

  const filtered = quests.filter(quest =>
    selectedGimmicks.every(gimmick => quest.gimmicks.includes(gimmick))
  );

  renderQuests(filtered);
}
