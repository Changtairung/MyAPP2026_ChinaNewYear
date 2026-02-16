const board = document.getElementById('board');
//const prizes = ["🎁 大獎", "🍬 糖果", "🧧 紅包", "🏮 燈籠", "🍊 橘子", "⭐ 幸運", "🍫 巧克力", "💰 金幣", "🎟️ 禮券"];

// 1. 定義獎項內容
const initialPrizes = [
    "🧧 紅包 100 元", // 確保一定有一個大獎
    "🧧 紅包 10 元",
    "🍬 巧克力",
    "🍬 糖果",
    "🍬 軟糖",
    "💀 銘謝惠顧",
    "💀 銘謝惠顧",
    "💀 銘謝惠顧",
    "💀 銘謝惠顧"
];

// 2. 隨機打亂陣列的函式 (Fisher-Yates Shuffle)
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// 3. 產生這一局專屬的獎池
let gamePool = shuffle([...initialPrizes]);

// 生成 9 個格子
for (let i = 0; i < 9; i++) {
    const hole = document.createElement('div');
    hole.className = 'hole';
    hole.innerText = i + 1;
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

    // 從獎池中根據格子的索引直接取出獎項
    // 假設 index 是 0~8
    const prize = gamePool[index];
    
    // 4. 更新畫面並加入動畫類別
    el.innerHTML = `<span class="animate__animated animate__jackInTheBox">${prize}</span>`; // 替換文字
    el.classList.add('poked'); // 改變外觀
    el.style.background = "#e9ecef"; // 強制變色確認邏輯有跑到這
    
    console.log(`第 ${index + 1} 格開出了: ${prize}`); // 除錯訊息 3
}
