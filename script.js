document.getElementById("start").addEventListener("click", startGame);

function startGame() {
    document.getElementById("instructions").style.display = "none";
    document.getElementById("game").style.display = "block";
    // ゲームの初期化処理をここに追加
}

// 他のゲームの機能やロジックをこの下に追加する
document.addEventListener('DOMContentLoaded', function() {
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
