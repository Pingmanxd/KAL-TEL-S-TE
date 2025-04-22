// Kullanıcı durumu
const state = {
    isAuthenticated: localStorage.getItem('isAuthenticated') === 'true',
    currentUser: JSON.parse(localStorage.getItem('currentUser')) || null,
    balance: localStorage.getItem('balance') || 0
};

// Uygulama başlangıcı
document.addEventListener('DOMContentLoaded', function() {
    // Eğer spin.html'deysek ve giriş yapılmamışsa index'e yönlendir
    if(window.location.pathname.includes('kasaacma/spin.html') && !state.isAuthenticated) {
        window.location.href = 'index.html';
        return;
    }

    // Eğer index.html'deysek ve giriş yapılmışsa spin'e yönlendir
    if(!window.location.pathname.includes('spin.html') && state.isAuthenticated) {
        window.location.href = 'spin.html';
        return;
    }

    // Auth modal elementleri (sadece index.html'de)
    const authModal = document.getElementById('authModal');
    if(authModal) {
        const loginForm = document.getElementById('loginForm');
        const registerForm = document.getElementById('registerForm');
        const showRegister = document.getElementById('showRegister');
        const showLogin = document.getElementById('showLogin');
        const loginBtn = document.getElementById('loginBtn');
        const registerBtn = document.getElementById('registerBtn');

        // Kayıt/giriş formu geçişleri
        showRegister.addEventListener('click', function(e) {
            e.preventDefault();
            loginForm.classList.remove('active');
            registerForm.classList.add('active');
        });

        showLogin.addEventListener('click', function(e) {
            e.preventDefault();
            registerForm.classList.remove('active');
            loginForm.classList.add('active');
        });

        // Giriş yap butonu
        loginBtn.addEventListener('click', function() {
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            
            if(email && password) {
                loginUser(email, password);
            } else {
                alert('Lütfen tüm alanları doldurun!');
            }
        });

        // Kayıt ol butonu
        registerBtn.addEventListener('click', function() {
            const username = document.getElementById('regUsername').value;
            const email = document.getElementById('regEmail').value;
            const password = document.getElementById('regPassword').value;
            const confirm = document.getElementById('regConfirm').value;
            
            if(password !== confirm) {
                alert('Şifreler eşleşmiyor!');
                return;
            }
            
            if(username && email && password) {
                registerUser(username, email, password);
            } else {
                alert('Lütfen tüm alanları doldurun!');
            }
        });
    }

    // Çıkış butonu (sadece spin.html'de)
    const logoutBtn = document.getElementById('logoutBtn');
    if(logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            logoutUser();
        });
    }

    // Spin.html yüklendiyse uygulamayı başlat
    if(window.location.pathname.includes('spin.html')) {
        updateBalanceDisplay();
        loadPage('home');
        initModal();
        initNavigation();
    }
});

// Kullanıcı giriş fonksiyonu
function loginUser(email, password) {
    // Mock authentication - gerçek uygulamada API çağrısı yapılmalı
    state.isAuthenticated = true;
    state.currentUser = {
        email: email,
        username: email.split('@')[0]
    };
    state.balance = localStorage.getItem(`${email}_balance`) || 0;
    
    // LocalStorage'a kaydet
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('currentUser', JSON.stringify(state.currentUser));
    localStorage.setItem('balance', state.balance);
    
    // Spin.html'e yönlendir
    window.location.href = 'spin.html';
}

// Kullanıcı kayıt fonksiyonu
function registerUser(username, email, password) {
    // Mock registration
    state.isAuthenticated = true;
    state.currentUser = {
        email: email,
        username: username
    };
    state.balance = 0;
    
    // LocalStorage'a kaydet
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('currentUser', JSON.stringify(state.currentUser));
    localStorage.setItem('balance', state.balance);
    localStorage.setItem(`${email}_balance`, state.balance);
    
    // Spin.html'e yönlendir
    window.location.href = 'spin.html';
}

// Kullanıcı çıkış fonksiyonu
function logoutUser() {
    // Durumu temizle
    state.isAuthenticated = false;
    state.currentUser = null;
    
    // LocalStorage'dan temizle
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('currentUser');
    
    // Index.html'e yönlendir
    window.location.href = 'index.html';
}

// Diğer fonksiyonlar (loadPage, initCases, updateBalance vb.) önceki gibi kalacak
// Sadece spin.html için olan fonksiyonlar
function initNavigation() {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const pageId = this.getAttribute('data-page');
            loadPage(pageId);
        });
    });
    
    document.querySelector('.logo').addEventListener('click', function(e) {
        e.preventDefault();
        loadPage('home');
    });
}