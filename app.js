const board = document.getElementById('board');
//const prizes = ["🎁 大獎", "🍬 糖果", "🧧 紅包", "🏮 燈籠", "🍊 橘子", "⭐ 幸運", "🍫 巧克力", "💰 金幣", "🎟️ 禮券"];

// 定義獎項與其出現權重 (總和建議為 100)
const prizeSettings = [
    { name: "🎁 超級大獎 (iPhone)", weight: 5 },   // 5% 機率
    { name: "🧧 紅包 100 元", weight: 15 },         // 15% 機率
    { name: "🍬 巧克力", weight: 30 },            // 30% 機率
    { name: "💀 銘謝惠顧", weight: 50 }             // 50% 機率
];

function getWeightedPrize() {
    const randomNum = Math.random() * 100; // 產生 0-100 隨機數
    let cumulativeWeight = 0;

    for (const item of prizeSettings) {
        cumulativeWeight += item.weight;
        if (randomNum < cumulativeWeight) {
            return item.name;
        }
    }
    return prizeSettings[prizeSettings.length - 1].name; // 保險回傳最後一項
}
// 生成 12 個格子
for (let i = 1; i <= 12; i++) {
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

    // 3. 獲取具備機率權重的獎項
    const prize = getWeightedPrize();

    // 4. 更新畫面
    el.innerHTML = `<span class="prize-text">${prize}</span>`; // 替換文字
    el.classList.add('poked'); // 改變外觀
    el.style.background = "#e9ecef"; // 強制變色確認邏輯有跑到這
    
    console.log(`抽中獎項: ${prize} (隨機值: ${Math.round(Math.random()*100)})`); // 除錯訊息 3
}
