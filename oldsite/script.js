document.addEventListener('DOMContentLoaded', () => {
    const startOverlay = document.getElementById('start-overlay');
    const startBtn = document.getElementById('start-btn');
    const bgMusic = document.getElementById('bg-music');
    const slides = document.querySelectorAll('.slide');

    // Redaksi narasi
    const narrationPart1 = "Halo sobat SUKE! Jangan lupa untuk datang di acara nonton bareng Pertandingan di Suke Highland! Kita akan menyaksikan laga puncak baku hantam yang paling ditunggu, Byon Combat Showbiz 5, di mana Kkajhe akan berhadapan dengan Aziz Calim! Pertarungan dimulai tepat pukul dua puluh tiga lewat lima belas, mempertaruhkan segalanya untuk gelar juara Kickstriking Nasional!";
    const narrationPart2 = "Bukan hanya itu! Byon Combat Showbiz Vol. 5 juga menyajikan duel-duel panas lainnya yang dijamin akan membuat keseruan di laga ini! Disiarkan secara eksklusif, menggunakan layar tancap hanya untuk Anda!";
    const narrationPart3 = "Dan bagi Anda yang ingin merasakan atmosfernya langsung, catat lokasinya! Suke Highland di jalan poros bolu rantepao samping mister DIY! Jangan sampai salah alamat!";
    const narrationPart4 = "Jadi, jangan sampai ketinggalan! Ajak semua teman, kerabat, dan keluarga! Tempat terbatas, jadi pastikan Anda datang lebih awal dan amankan spot terbaik Anda untuk menyaksikan pertandingan ini!";

    // Fungsi TTS dengan ducking
    function speak(text, onEndCallback) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        
        utterance.lang = 'id-ID';
        utterance.rate = 1.4; // Lebih cepat (1.3 → 1.4)
        utterance.pitch = 1.2; // Intonasi lebih dramatis (1.1 → 1.2)
        utterance.volume = 1; // Volume maksimal

        // Turunkan volume musik saat TTS aktif
        bgMusic.volume = 0.3; // Ducking ke 30%

        utterance.onend = () => {
            bgMusic.volume = 0.8; // Kembalikan volume musik
            if (onEndCallback) onEndCallback();
        };

        const voices = window.speechSynthesis.getVoices();
        const indonesianVoice = voices.find(voice => voice.lang === 'id-ID');
        if (indonesianVoice) utterance.voice = indonesianVoice;

        window.speechSynthesis.speak(utterance);
    }

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
    }

    // ALUR UTAMA
    async function startShow() {
        startOverlay.style.display = 'none';
        bgMusic.volume = 0.8; // Volume musik awal (80%)
        bgMusic.play();

        // Delay 2 detik sebelum narasi dimulai (musik intro)
        await new Promise(resolve => setTimeout(resolve, 2000));

        showSlide(0);
        speak(narrationPart1, async () => {
            showSlide(1);
            await new Promise(resolve => setTimeout(resolve, 500));
            speak(narrationPart2, async () => {
                showSlide(2);
                await new Promise(resolve => setTimeout(resolve, 500));
                speak(narrationPart3, async () => {
                    showSlide(3);
                    await new Promise(resolve => setTimeout(resolve, 500));
                    speak(narrationPart4, async () => {
                        showSlide(4);
                        await new Promise(resolve => setTimeout(resolve, 700));
                        document.querySelector('.logo-neon')?.classList.add('glowing');
                    });
                });
            });
        });
    }

    startBtn.addEventListener('click', startShow);
});