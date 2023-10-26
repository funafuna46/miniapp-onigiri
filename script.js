const onigiriData = [
  { src: 'images/onigiri.png', label: 'しゃけ' },
  { src: 'images/onigiri.png', label: 'うめ' },
  { src: 'images/onigiri.png', label: 'おかか' },
  { src: 'images/onigiri.png', label: 'ツナマヨ' },
  { src: 'images/onigiri.png', label: 'たらこ' },
  { src: 'images/onigiri.png', label: 'こんぶ' },
  { src: 'images/onigiri.png', label: 'わかめ' },
  { src: 'images/onigiri.png', label: '天むす' },
  { src: 'images/onigiri.png', label: 'ゆかり' },
  // 必要に応じて他のおにぎりのデータも追加
];

document.getElementById("start").addEventListener("click", startGame);

let currentOrderCount = 3;  // 初めの注文数

function generateOrder(count) {
  const orderCounts = {};

  for (let i = 0; i < count; i++) {
      const randomIndex = Math.floor(Math.random() * onigiriData.length);
      const label = onigiriData[randomIndex].label;

      if (!orderCounts[label]) {
          orderCounts[label] = 0;
      }
      orderCounts[label]++;
  }

  const orders = [];
  for (const [label, count] of Object.entries(orderCounts)) {
      orders.push(`${label}を${count}個`);
  }

  return orders;
}


function startGame() {
  document.getElementById("instructions").style.display = "none";
  document.getElementById("game").style.display = "block";

  // 注文を生成
  const orders = generateOrder(currentOrderCount);
  const orderDiv = document.getElementById("order");

  // 1秒後に「いらっしゃいませ！」メッセージを消し、注文を表示
  setTimeout(() => {
      document.getElementById("greeting").textContent = "";
      orderDiv.textContent = orders.join(", ") + "ください。";

      // さらに5秒後に注文内容を消す
      setTimeout(() => {
          orderDiv.textContent = "";
      }, 5000);
  }, 1000);  // 1秒後に実行

  currentOrderCount++;  // 次の注文のために注文数を増やす
}



// 他のゲームの機能やロジックをこの下に追加する
document.addEventListener('DOMContentLoaded', function() {

  const onigirisContainer = document.getElementById('onigiris');

  onigiriData.forEach(onigiri => {
      const container = document.createElement('div');
      container.className = 'onigiri-container';

      const img = document.createElement('img');
      img.src = onigiri.src;
      img.alt = 'おにぎり';
      img.className = 'onigiri';

      const label = document.createElement('span');
      label.className = 'label';
      label.textContent = onigiri.label;

      container.appendChild(img);
      container.appendChild(label);
      onigirisContainer.appendChild(container);
  });
});
