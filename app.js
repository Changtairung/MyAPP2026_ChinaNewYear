const board = document.getElementById('board');
const prizes = ["🎁 大獎", "🍬 糖果", "🧧 紅包", "🏮 燈籠", "🍊 橘子", "⭐ 幸運", "🍫 巧克力", "💰 金幣", "🎟️ 禮券"];

// 生成 9 個格子
for (let i = 1; i <= 9; i++) {
    const hole = document.createElement('div');
    hole.className = 'hole';
    hole.innerText = i;
    hole.onclick = () => poke(hole);
    board.appendChild(hole);
}

function poke(el) {
    if (el.classList.contains('poked')) return;
    
    // 震動回饋 (僅限 Android Chrome)
    if (navigator.vibrate) navigator.vibrate(50);

    // 噴發特效
    confetti({ particleCount: 150, spread: 70, origin: { y: 0.8 } });

    // 隨機獎項
    const prize = prizes[Math.floor(Math.random() * prizes.length)];
    el.innerHTML = `<div class="prize-text">${prize}</div>`;
    el.classList.add('poked');
}

// 註冊 Service Worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js');
}
