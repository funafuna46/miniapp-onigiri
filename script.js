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
      orderDiv.textContent = orders.join("、 ") + "ください。";

      // さらに5秒後に注文内容を消す
      setTimeout(() => {
          orderDiv.textContent = "";
      }, 5000);
  }, 1000);  // 1秒後に実行

  currentOrderCount++;  // 次の注文のために注文数を増やす
}



// 他のゲームの機能やロジックをこの下に追加する
// ...（上部のコードは変更なし）

const onigiriCounts = {};

document.addEventListener('DOMContentLoaded', function() {

  const onigirisContainer = document.getElementById('onigiris');

  onigiriData.forEach(onigiri => {
      const container = document.createElement('div');
      container.className = 'onigiri-container';

      const img = document.createElement('img');
      img.src = onigiri.src;
      img.alt = 'おにぎり';
      img.className = 'onigiri';

      // 追加：おにぎりをクリックした時のイベント
      img.addEventListener('click', function() {
          if (!onigiriCounts[onigiri.label]) {
              onigiriCounts[onigiri.label] = 0;
          }
          onigiriCounts[onigiri.label]++;
          countSpan.textContent = onigiriCounts[onigiri.label];

          // カウントとマイナスボタンを表示にする
          countSpan.style.display = 'inline';
          minusButton.style.display = 'inline';
      });

      const label = document.createElement('span');
      label.className = 'label';
      label.textContent = onigiri.label;

      // 追加：カウントを表示するエレメント（初めは非表示）
      const countSpan = document.createElement('span');
      countSpan.className = 'count';
      countSpan.textContent = onigiriCounts[onigiri.label] || 0;
      countSpan.style.display = 'none';  // 非表示に設定

      // 追加：マイナスボタンのエレメント（初めは非表示）
      const minusButton = document.createElement('button');
      minusButton.textContent = '-';
      minusButton.style.display = 'none';  // 非表示に設定
      minusButton.addEventListener('click', function() {
          if (onigiriCounts[onigiri.label] > 0) {
              onigiriCounts[onigiri.label]--;
              countSpan.textContent = onigiriCounts[onigiri.label];
              // カウントが0になったら再び非表示にする
              if (onigiriCounts[onigiri.label] === 0) {
                  countSpan.style.display = 'none';
                  minusButton.style.display = 'none';
              }
          }
      });

      container.appendChild(img);
      container.appendChild(label);
      container.appendChild(countSpan);
      container.appendChild(minusButton);
      onigirisContainer.appendChild(container);
  });
});

