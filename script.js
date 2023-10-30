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

let totalSales = 0; // 合計売り上げ金額
const pricePerOnigiri = 200; // 1つのおにぎりの価格
let currentOrderCount = 3;  // 初めの注文数
let currentOrder = {};  // 注文を格納する変数

document.getElementById("start").addEventListener("click", startGame);

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

  currentOrder = orderCounts;  // 注文内容を currentOrder に保存

  const orders = [];
  for (const [label, count] of Object.entries(orderCounts)) {
      orders.push(`${label}を${count}個`);
  }

  return orders;
}

function hideInstructions() {
  document.getElementById("instructions").style.display = "none";
}

function showGame() {
  document.getElementById("game").style.display = "block";
}

function resetOnigiriCounts() {
  for (const onigiri of onigiriData) {
    onigiriCounts[onigiri.label] = 0;
    const containers = document.querySelectorAll('.onigiri-container');
    containers.forEach(container => {
        if (container.querySelector('.label').textContent === onigiri.label) {
            const countSpan = container.querySelector('.count');
            const minusButton = container.querySelector('button');
            countSpan.textContent = 0;
            countSpan.style.visibility = 'hidden';  // カウントを非表示に
            minusButton.style.visibility = 'hidden'; // マイナスボタンを非表示に
        }
    });
}
}

function showGreeting() {
  const greetingElement = document.getElementById("greeting");
  greetingElement.style.visibility = "visible";
}

function hideGreeting() {
  const greetingElement = document.getElementById("greeting");
  greetingElement.style.visibility = "hidden";
}

function showOrder(orders) {
  const orderContentDiv = document.getElementById("order-content");
  orderContentDiv.textContent = orders.join("、 ") + "ください。";
}

function startGame() {
  hideInstructions();
  showGame();
  resetOnigiriCounts();
  showGreeting();

  setTimeout(() => {
      hideGreeting();

      const orders = generateOrder(currentOrderCount);
      showOrder(orders);
  }, 1000);
}

function checkOrder() {
  document.getElementById("order-content").textContent = "";  // 注文内容をクリア
  for (const [label, count] of Object.entries(currentOrder)) {
      if (!onigiriCounts[label] || onigiriCounts[label] !== count) {
          gameOver();
          return;
      }
  }
  thankYou();
}

function thankYou() {
  totalSales += currentOrderCount * pricePerOnigiri;

  const messageDiv = document.getElementById("message");
  messageDiv.style.visibility = "visible";  // メッセージを表示

  // 2秒後にメッセージを非表示にしてゲームを再開する
  setTimeout(() => {
      messageDiv.style.visibility = "hidden";  // メッセージを非表示にする
      currentOrderCount++;  // 正しい注文が提供された後に注文数を増加させる
      startGame();
  }, 2000);
}

function updateTwitterLink() {
  const twitterLink = document.getElementById("twitterLink");
  const tweetText = encodeURIComponent(`おにぎり屋さんゲーム\n本日の売り上げ: ${totalSales}円\nパソコンから遊んでね`);
  const tweetURL = `https://twitter.com/intent/tweet?&text=${tweetText}&url=https://warm-trifle-5266cb.netlify.app/`;
  twitterLink.href = tweetURL;
}

function gameOver() {
  currentOrderCount = 3;

  const gameOverPopup = document.getElementById("gameOverPopup");
  const gameOverMessage = document.getElementById("gameOverMessage");
  const playAgainButton = document.getElementById("playAgain");

  gameOverMessage.textContent = `閉店です\n本日の売り上げ: ${totalSales}円`;

  updateTwitterLink();  // ツイッターリンクを更新

  playAgainButton.addEventListener("click", function() {
      totalSales = 0;
      startGame();
      gameOverPopup.style.display = "none";
  });

  gameOverPopup.style.display = "block";
}


// おにぎりを渡すボタンのイベントを追加
document.getElementById("submitOnigiri").addEventListener("click", checkOrder);

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
          countSpan.style.visibility = 'visible';
          minusButton.style.visibility = 'visible';
      });

      const label = document.createElement('span');
      label.className = 'label';
      label.textContent = onigiri.label;

      // 追加：カウントを表示するエレメント（初めは非表示）
      const countSpan = document.createElement('span');
      countSpan.className = 'count';
      countSpan.textContent = onigiriCounts[onigiri.label] || 0;
      countSpan.style.visibility = 'hidden';  // 非表示に設定

      // 追加：マイナスボタンのエレメント（初めは非表示）
      const minusButton = document.createElement('button');
      minusButton.textContent = '-';
      minusButton.classList.add('rounded-button');

      minusButton.addEventListener('click', function() {
          if (onigiriCounts[onigiri.label] > 0) {
              onigiriCounts[onigiri.label]--;
              countSpan.textContent = onigiriCounts[onigiri.label];
              // カウントが0になったら再び非表示にする
              if (onigiriCounts[onigiri.label] === 0) {
                  countSpan.style.visibility = 'hidden';
                  minusButton.style.visibility = 'hidden';
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

