document.addEventListener('DOMContentLoaded', function() {
    const openButtons = document.querySelectorAll('.open-case');
    const caseModal = document.getElementById('caseModal');
    const closeModal = document.querySelector('.close');
    
    openButtons.forEach(button => {
        button.addEventListener('click', function() {
            const caseType = this.parentElement.getAttribute('data-case');
            openCase(caseType);
            caseModal.style.display = 'block';
        });
    });
    
    closeModal.addEventListener('click', function() {
        caseModal.style.display = 'none';
    });
    
    function openCase(caseType) {
        const itemsContainer = document.querySelector('.items-container');
        const wonAmount = document.getElementById('wonAmount');
        
        let minVP, maxVP;
        switch(caseType) {
            case '1': minVP = 50; maxVP = 1000; break;
            case '2': minVP = 200; maxVP = 5000; break;
            case '3': minVP = 500; maxVP = 10000; break;
        }
        
        const wonVP = Math.floor(Math.random() * (maxVP - minVP + 1)) + minVP;
        
        // Animasyon için öğeler
        itemsContainer.innerHTML = '';
        for(let i = 0; i < 20; i++) {
            const item = document.createElement('div');
            item.className = 'item';
            item.textContent = Math.floor(Math.random() * (maxVP - minVP + 1)) + minVP + ' VP';
            itemsContainer.appendChild(item);
        }
        
        setTimeout(() => {
            wonAmount.textContent = wonVP + ' VP';
        }, 3000);
    }
    
    document.getElementById('claimBtn').addEventListener('click', function() {
        alert('Kazandığınız ' + document.getElementById('wonAmount').textContent + ' hesabınıza eklendi!');
        caseModal.style.display = 'none';
    });
});

