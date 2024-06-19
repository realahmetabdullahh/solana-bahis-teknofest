document.addEventListener('DOMContentLoaded', function() {
    const amountInput = document.getElementById('amount');
    const newGameButton = document.getElementById('newGame');
    const returnButton = document.getElementById('returnButton');
    const cardsContainer = document.getElementById('cardsContainer');
    const prizeMessage = document.getElementById('prizeMessage');
    const solanaPriceDisplay = document.getElementById('solanaPrice');
    const connectWalletButton = document.getElementById('connectWallet');
    const disconnectWalletButton = document.getElementById('disconnectWallet');

    let liveSolanaPrice = 0; // Canlı Solana fiyatı için yer tutucu

    // Canlı Solana fiyatı görüntüsünü güncelleme işlevi
    function updateSolanaPrice(price) {
        solanaPriceDisplay.textContent = `Canlı Solana Fiyatı: $${price.toFixed(2)}`;
    }

    // CoinGecko API'si kullanarak canlı Solana fiyatını fetch et
    async function fetchSolanaPrice() {
        try {
            const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd');
            liveSolanaPrice = response.data.solana.usd;
            updateSolanaPrice(liveSolanaPrice);
        } catch (error) {
            console.error('Solana fiyatı fetch edilirken hata oluştu:', error);
        }
    }

    // Rastgele ödül miktarını oluşturma işlevi
    function getRandomPrizeAmount(amount) {
        const factor = (Math.random() * 2); // 0 ile 2 arasında rastgele bir faktör
        const prizeAmount = amount * factor;
        return prizeAmount.toFixed(2); // Ödül miktarını 2 ondalık basamağa yuvarlayarak döndür
    }

    // Kartları oluşturma ve görüntüleme işlevi
    function createCards() {
        cardsContainer.innerHTML = '';
        for (let i = 0; i < 10; i++) {
            const card = document.createElement('div');
            card.classList.add('card');
            card.innerHTML = `<div class="card-content">
                <img src="https://cryptologos.cc/logos/solana-sol-logo.png" alt="Solana Logo">
            </div>`;
            card.addEventListener('click', function() {
                const amount = parseFloat(amountInput.value);
                const prizeAmount = getRandomPrizeAmount(amount);
                prizeMessage.textContent = `${prizeAmount} SOL kazandınız!`;
                cardsContainer.querySelectorAll('.card').forEach(card => {
                    card.style.pointerEvents = 'none'; // Daha fazla tıklamayı devre dışı bırak
                });
                returnButton.style.display = 'block'; // Kart seçildikten sonra geri dön düğmesini göster
            });
            cardsContainer.appendChild(card);
        }
    }

    // Yeni oyun düğmesi için olay dinleyici
    newGameButton.addEventListener('click', function() {
        const amount = parseFloat(amountInput.value);
        if (!isNaN(amount) && amount > 0) {
            createCards();
            document.querySelector('.input-container').style.display = 'none';
            cardsContainer.style.display = 'flex';
        } else {
            alert('Lütfen geçerli bir miktar girin.');
        }
    });

    // Geri dön düğmesi için olay dinleyici
    returnButton.addEventListener('click', function() {
        // Oyunu sıfırla
        document.querySelector('.input-container').style.display = 'block';
        cardsContainer.style.display = 'none';
        returnButton.style.display = 'none';
        prizeMessage.textContent = '';
        amountInput.value = '';

        // Kart tıklamalarını yeniden etkinleştir
        cardsContainer.querySelectorAll('.card').forEach(card => {
            card.style.pointerEvents = 'auto';
        });
    });

    // Cüzdanı bağla düğmesi için olay dinleyici
    connectWalletButton.addEventListener('click', function() {
        alert('Cüzdan bağlama işlemi henüz uygulanmadı.');
    });

    // Cüzdanı çıkış yap düğmesi için olay dinleyici
    disconnectWalletButton.addEventListener('click', function() {
        alert('Cüzdan çıkış işlemi henüz uygulanmadı.');
    });

    // İlk Solana fiyatını fetch et
    fetchSolanaPrice();
    setInterval(fetchSolanaPrice, 30000); // Fiyatı her 30 saniyede bir güncelle
});
