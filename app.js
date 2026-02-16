const board = document.getElementById('board');
//const prizes = ["🎁 大獎", "🍬 糖果", "🧧 紅包", "🏮 燈籠", "🍊 橘子", "⭐ 幸運", "🍫 巧克力", "💰 金幣", "🎟️ 禮券"];

// 1. 定義獎項內容
// 修改後：確保陣列長度為 12
const initialPrizes = [
    "🧧 紅包 8000 元", // 確保一定有一個大獎
    "🧧 紅包 1688 元",
    "🧧 紅包 888 元",
    "🍬 田季發燒肉",
    "🍬 好食鍋",
    "🍬 軟糖", "💀 軟糖",
    "💀 恭喜發財", "💀 恭喜發財",
    "💀 馬到成功", "💀 馬到成功", "💀 馬到成功"
];

// 2. 隨機打亂陣列的函式 (Fisher-Yates Shuffle)
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// 3. 產生 12 個獎項的隨機獎池
let gamePool = shuffle([...initialPrizes]);

// 生成 12 個格子
for (let i = 0; i < 12; i++) {
    const hole = document.createElement('div');
    hole.className = 'hole';
    hole.innerText = i + 1; // 顯示數字 1~12
    // 這裡傳入 i 作為索引
    hole.onclick = () => poke(hole, i);
    board.appendChild(hole);
}

// 註冊 Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js')
    .then(() => console.log("PWA 註冊成功！"));
}

function poke(el, index) {
    if (el.classList.contains('poked')) return;
    
    console.log("開始戳戳樂..."); // 除錯訊息 1

    // 1. 播放音效 (你目前成功的部分)
    if (typeof popSound !== 'undefined') popSound.play();

    // 震動回饋 (僅限 Android Chrome)
    if (navigator.vibrate) navigator.vibrate(50);

    // 噴發特效
    if (typeof confetti === 'function') {
        confetti({ particleCount: 150, spread: 70, origin: { y: 0.8 } });
    }

    // 從獎池中根據格子的索引直接取出獎項
    // 假設 index 是 0~11
    const prize = gamePool[index];
    
    // 4. 更新畫面並加入動畫類別
    el.innerHTML = `<span class="animate__animated animate__jackInTheBox">${prize}</span>`; // 替換文字
    el.classList.add('poked'); // 改變外觀
    el.style.background = "#e9ecef"; // 強制變色確認邏輯有跑到這
    
    console.log(`第 ${index + 1} 格開出了: ${prize}`); // 除錯訊息 3
}
