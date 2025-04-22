console.log("Script dosyası yüklendi!");

document.querySelectorAll('.open-case').forEach(btn => {
    btn.addEventListener('click', () => {
        console.log("Butona tıklandı!");
        document.getElementById('caseModal').style.display = 'block';
    });
});
document.addEventListener('DOMContentLoaded', function() {
    // Kasa açma butonlarını seç
    const openButtons = document.querySelectorAll('.open-case');
    const caseModal = document.getElementById('caseModal');
    const closeModal = document.querySelector('.close');
    
    // Her buton için tıklama eventi ekle
    openButtons.forEach(button => {
        button.addEventListener('click', function() {
            const caseType = this.parentElement.getAttribute('data-case');
            openCase(caseType);
            caseModal.style.display = 'block';
        });
    });
    
    // Modalı kapat
    closeModal.addEventListener('click', function() {
        caseModal.style.display = 'none';
    });
    
    // Kasa açma fonksiyonu
    function openCase(caseType) {
        const itemsContainer = document.querySelector('.items-container');
        const wonAmount = document.getElementById('wonAmount');
        
        // Ödül aralıklarını belirle
        let minVP, maxVP;
        switch(caseType) {
            case '1': minVP = 50; maxVP = 1000; break;
            case '2': minVP = 200; maxVP = 5000; break;
            case '3': minVP = 500; maxVP = 10000; break;
            default: minVP = 0; maxVP = 0;
        }
        
        // Rastgele VP kazan
        const wonVP = Math.floor(Math.random() * (maxVP - minVP + 1)) + minVP;
        
        // Animasyon için öğeler oluştur
        itemsContainer.innerHTML = '';
        for(let i = 0; i < 20; i++) {
            const randomVP = Math.floor(Math.random() * (maxVP - minVP + 1)) + minVP;
            const item = document.createElement('div');
            item.className = 'item';
            item.textContent = randomVP + ' VP';
            itemsContainer.appendChild(item);
        }
        
        // 5 saniye sonra kazandığı VP'yi göster
        setTimeout(() => {
            wonAmount.textContent = wonVP + ' VP';
            document.getElementById('claimBtn').style.display = 'block';
        }, 5000);
    }
    
    // Ödülü al butonu
    document.getElementById('claimBtn').addEventListener('click', function() {
        alert('Tebrikler! ' + document.getElementById('wonAmount').textContent + ' kazandınız!');
        caseModal.style.display = 'none';
    });
});