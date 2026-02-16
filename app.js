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

// 註冊 Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js')
    .then(() => console.log("PWA 註冊成功！"));
}

function poke(el) {
    if (el.classList.contains('poked')) return;
    
    console.log("開始戳戳樂..."); // 除錯訊息 1

    // 1. 播放音效 (你目前成功的部分)
    if (typeof popSound !== 'undefined') popSound.play();

    // 震動回饋 (僅限 Android Chrome)
    if (navigator.vibrate) navigator.vibrate(50);

    // 2. 噴發特效 (加入 try-catch 防止沒抓到套件導致後續當機)
    try {
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.8 }
        });
        console.log("特效噴發成功"); // 除錯訊息 2
    } catch (e) {
        console.error("特效庫載入失敗:", e);
    }

    // 檢查這行：如果上面沒讀到套件，這行會報錯並停止執行後面的程式
    //if (typeof confetti === 'function') {
    //    confetti({ particleCount: 150, spread: 70, origin: { y: 0.8 } });
    //}

    // 隨機獎項
    const prize = prizes[Math.floor(Math.random() * prizes.length)];
    el.innerHTML = `<div class="prize-text">${prize}</div>`; // 替換文字
    el.classList.add('poked'); // 改變外觀
    el.style.background = "#e9ecef"; // 強制變色確認邏輯有跑到這
    
    console.log("獎項顯示成功:", prize); // 除錯訊息 3
}
