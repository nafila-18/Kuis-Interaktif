const soalContainer = document.getElementById("soal");
const jawabanContainer = document.getElementById("jawaban");
const timerContainer = document.getElementById("timer");
const hasilContainer = document.getElementById("hasil");
const nomorSoalContainer = document.getElementById("soal-status");
const progressBar = document.getElementById("progress-bar");
const resetButton = document.getElementById("reset");
const audioBenar = new Audio ("SoundBenar.mp3");
const audioSalah = new Audio ("SoundSalah.mp3");
const audioButton = new Audio("SoundClick.mp3");


const pertanyaan = [
    {
        soal: "Benda yang digunakan untuk menulis?",
        jawaban: ["Sendok", "Pensil", "Sepatu", "Kursi"],
        jawabanBenar: "Pensil",
    },
    {
        soal: "8+2-5=?",
        jawaban: ["9", "2", "5", "12"],
        jawabanBenar: "5",
    },
    {
        soal: "Apa yang biasa kita minum saat haus?",
        jawaban: ["Air", "Minyak", "Pasir", "Sunlight"],
        jawabanBenar: "Air",
    },
    {
        soal: "Bahasa inggris Meja?",
        jawaban: ["Car", "Chair", "Pen", "Table"],
        jawabanBenar: "Table",
    },
    {
        soal: "Kendaraaan yang berjalan diatas rel?",
        jawaban: ["Kereta api", "Sepeda", "Mobil", "Becak"],
        jawabanBenar: "Kereta api",
    },
];

let skor = 0;
let soalSaatIni = 0;
let timer;
let waktu = 10;

function mulaiTimer() {
    clearInterval(timer);
    waktu = 10;
    timerContainer.textContent = `Waktu: ${waktu}s`;

    timer = setInterval(() => {
        waktu--;
        timerContainer.textContent = `Waktu: ${waktu}s`;
        if (waktu <= 0) {
            clearInterval(timer);
            soalSaatIni++;
            if (soalSaatIni < pertanyaan.length) {
                tampilkanSoal();
            } else {
                tampilkanHasil();
            }
        }
    }, 1000);
}

function tampilkanSoal() {
    const soal = pertanyaan[soalSaatIni];
    soalContainer.textContent = soal.soal;
    nomorSoalContainer.textContent = `${soalSaatIni + 1}/${pertanyaan.length}`;

    // Progress bar dimulai dari 20% (bukan 0%) dan naik sesuai soal
    const progress = ((soalSaatIni + 1) / pertanyaan.length) * 100;
    progressBar.style.width = `${progress}%`;

    jawabanContainer.innerHTML = "";
    soal.jawaban.forEach((jawaban) => {
        const tombol = document.createElement("button");
        tombol.textContent = jawaban;
        tombol.addEventListener("click", function() {
            cekJawaban(jawaban, tombol);  // Menambahkan parameter tombol yang dipilih
        });
        jawabanContainer.appendChild(tombol);
    });

    mulaiTimer();
}


function cekJawaban(jawaban, tombolDipilih) {
    const soal = pertanyaan[soalSaatIni];
    const semuaTombol = jawabanContainer.querySelectorAll("button");

    // Matikan semua tombol setelah satu dipilih
    semuaTombol.forEach((btn) => btn.disabled = true);

    if (jawaban === soal.jawabanBenar) {
        skor++;
        tombolDipilih.classList.add("jawaban-benar");
        audioBenar.play();
    } else {
        tombolDipilih.classList.add("jawaban-salah"); // hanya tombol yg diklik
        audioSalah.play();
    }

    soalSaatIni++;
    progressBar.style.width = `${(soalSaatIni / pertanyaan.length) * 100}%`;

    setTimeout(() => {
        if (soalSaatIni < pertanyaan.length) {
            tampilkanSoal();
        } else {
            tampilkanHasil();
        }
    }, 1000);
}

function tampilkanHasil() {
    hasilContainer.textContent = `Skor Anda: ${skor} dari ${pertanyaan.length}`;
    clearInterval(timer);
    timerContainer.textContent = "Waktu: 0s";
    resetButton.style.display = "inline-block";
}

function resetQuiz() {
    audioButton.play();
    skor = 0;
    soalSaatIni = 0;
    hasilContainer.textContent = "";
    resetButton.style.display = "none";
    progressBar.style.width = "0%";
    tampilkanSoal();
}

resetButton.addEventListener("click", resetQuiz);

tampilkanSoal();
