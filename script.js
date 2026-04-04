document.addEventListener('DOMContentLoaded', () => {
    // Nav Scroll Effect
    const nav = document.querySelector('.nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if(navToggle) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Language Toggle Logic
    const langRoBtn = document.getElementById('lang-ro-btn');
    const langEnBtn = document.getElementById('lang-en-btn');
    let currentLang = 'ro';

    function setLanguage(lang) {
        currentLang = lang;
        if(lang === 'ro') {
            langRoBtn.classList.add('active');
            langEnBtn.classList.remove('active');
            document.documentElement.lang = 'ro';
            document.querySelectorAll('.lang-ro').forEach(el => el.style.display = '');
            document.querySelectorAll('.lang-en').forEach(el => el.style.display = 'none');
            document.getElementById('chat-input').placeholder = 'Scrie un mesaj...';
        } else {
            langEnBtn.classList.add('active');
            langRoBtn.classList.remove('active');
            document.documentElement.lang = 'en';
            document.querySelectorAll('.lang-en').forEach(el => el.style.display = '');
            document.querySelectorAll('.lang-ro').forEach(el => el.style.display = 'none');
            document.getElementById('chat-input').placeholder = 'Type a message...';
        }
    }

    if(langRoBtn && langEnBtn) {
        langRoBtn.addEventListener('click', () => setLanguage('ro'));
        langEnBtn.addEventListener('click', () => setLanguage('en'));
    }

    // AI Chatbot Logic
    const chatbotBtn = document.getElementById('ai-chatbot-btn');
    const chatbotWindow = document.getElementById('ai-chatbot-window');
    const chatClose = document.getElementById('chat-close');
    const chatBody = document.getElementById('chat-body');
    const chatInput = document.getElementById('chat-input');
    const chatSubmit = document.getElementById('chat-submit');
    const typingIndicator = document.getElementById('typing-indicator');

    // Predefined AI responses based on language
    const responses = {
        ro: [
            "Te așteptăm cu drag la Berăria HM Garden!",
            "Servim cei mai buni burgeri și bere craft din Slobozia.",
            "Ne găsești pe Bulevardul Matei Basarab nr. 58, bl. F2, parter.",
            "Poți face o rezervare la numărul 0732 331 702.",
            "Da, suntem deschiși astăzi! Vino să ne vizitezi."
        ],
        en: [
            "Welcome to Berăria HM Garden! How can I help you today?",
            "We serve the best gourmet burgers and craft beers in Slobozia.",
            "Our address is Bulevardul Matei Basarab nr. 58, bl. F2, parter.",
            "You can reach us at 0732 331 702 to make a reservation.",
            "Yes, we are open today. Come join us!"
        ]
    };

    function toggleChatbot() {
        chatbotWindow.classList.toggle('active');
        if(chatbotWindow.classList.contains('active')) {
            chatInput.focus();
        }
    }

    if(chatbotBtn && chatClose) {
        chatbotBtn.addEventListener('click', toggleChatbot);
        chatClose.addEventListener('click', toggleChatbot);
    }

    function addMessage(text, sender) {
        const msgDiv = document.createElement('div');
        msgDiv.classList.add('chat-message', sender);
        msgDiv.textContent = text;
        
        chatBody.insertBefore(msgDiv, typingIndicator);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    function handleUserInput() {
        const text = chatInput.value.trim();
        if (text === '') return;

        addMessage(text, 'user');
        chatInput.value = '';

        typingIndicator.classList.add('active');
        chatBody.scrollTop = chatBody.scrollHeight;

        setTimeout(() => {
            typingIndicator.classList.remove('active');
            const arr = responses[currentLang];
            const randomResponse = arr[Math.floor(Math.random() * arr.length)];
            addMessage(randomResponse, 'bot');
        }, 1500);
    }

    if(chatSubmit) {
        chatSubmit.addEventListener('click', handleUserInput);
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleUserInput();
        });
    }
});
