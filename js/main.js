const $ = document.querySelector.bind(document)
const $$ = document.querySelector.bind(document)

const extendBtn = $('.js_extend_btn')
const backBTn = $('.js_back_btn')
const player = $('.js_player')
const playerMini = $('.js_player_mini')
const playBtn = $('.play_btn')
const audio = $("#audio");
const progress = $("#progress");
const nextBtn = $(".next_btn");
const prevBtn = $(".prev_btn");
const repeatBtn =  $(".repeat_btn")
const randomBtn =  $(".random_btn")

const image_song = $('.music_img')
const name_song = $('.song_name_playing')
const singer = $('.singer_playing')

const slide1 = $('.js_slide_1')
const slide2 = $('.js_slide_2')
const slide3 = $('.js_slide_3')
const slide4 = $('.js_slide_4')
const slide5 = $('.js_slide_5')

// Đổi kiểu Player đáp ứng cho mobile và tablet

function showPlayer(){
    player.classList.add('open_player')
    playerMini.classList.add('close_player_mini')
}

extendBtn.addEventListener("click", showPlayer)

function hidePlayer(){
    player.classList.remove('open_player')
    playerMini.classList.remove('close_player_mini')
}

backBTn.addEventListener("click", hidePlayer)




// Danh sách bài hát
const songs = [
    {
        name: "Bài Này Chill Phết",
        singer: "Đen ft. MIN",
        path: "./assets/audio/bai_nay_chill_phet.mp3",
        image: "./assets/img/music_img/bai_nay_chill_phet.jpg"
    },
    // {
    //     name: "Cô Gái Bàn Bên",
    //     singer: "Đen Vâu",
    //     path: "./assets/audio/co_gai_ban_ben.mp3",
    //     image: "https://t2.genius.com/unsafe/313x313/https%3A%2F%2Fimages.genius.com%2F8c0348a3dcb433dea4944748a78178d3.500x500x1.jpg"
    // },
    {
        name: "Vẽ",
        singer: "Trúc nhân",
        path: "./assets/audio/ve.mp3",
        image: "./assets/img/slider/ve.jpg"
    },
    {
        name: "Cứ Chill Thôi",
        singer: "Đen Vâu",
        path: "./assets/audio/cu_chill_thoi.mp3",
        image: "./assets/img/slider/cu_chill_thoi.jpg"
    },
    {
        name: "Thương",
        singer: "Phạm Nguyên Ngọc",
        path: "./assets/audio/thuong.mp3",
        image: "./assets/img/slider/thuong.jpg"
    },
    {
        name: "Bước Qua Mùa Cô Đơn",
        singer: "Vũ",
        path: "./assets/audio/buoc_qua_mua_co_don.mp3",
        image: "./assets/img/slider/buoc_qua_mua_co_don.jpg"
    }
]

//
var currentIndex = 0
var isPlaying = false
var isRandom = false
var isRepeat = false


//Đặt bài hát mặc định
var currentSong = songs[currentIndex]

// 
// function songFromSlide1() {
//     currentSong = songs[0];
//     audio.play();
// }
// function songFromSlide2() {
//     currentSong = songs[1];
// }
// function songFromSlide3() {
//     currentSong = songs[2];
// }
// function songFromSlide4() {
//     currentSong = songs[3];
// }
// function songFromSlide5() {
//     currentSong = songs[4];
// }

// slide1.addEventListener("click", songFromSlide1)
// slide2.addEventListener("click", songFromSlide2)
// slide3.addEventListener("click", songFromSlide3)
// slide4.addEventListener("click", songFromSlide4)
// slide5.addEventListener("click", songFromSlide5)

function loadCurrentSong() {
    // heading.textContent = this.currentSong.name;
    // cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
    // audio.src = this.currentSong.path;

    name_song.textContent = currentSong.name
    singer.textContent = currentSong.singer
    image_song.style.backgroundImage = `url('${currentSong.image}')`
    audio.src = currentSong.path

    currentSong = songs[currentIndex]
}
loadCurrentSong()

// Đưa bài hát vào Player
function addSong(){  
    name_song.textContent = currentSong.name
    singer.textContent = currentSong.singer
    image_song.style.backgroundImage = `url('${currentSong.image}')`
    audio.src = currentSong.path
}

slide1.addEventListener("click", addSong)

//Phát nhạc

// Xử lý khi click play
playBtn.onclick = function () {
    if (isPlaying) {
        audio.pause();
    } else {
        audio.play();
    }
};

// Khi song được play
audio.onplay = function () {
    isPlaying = true;
    player.classList.add("playing");
};

// Khi song bị pause
audio.onpause = function () {
    isPlaying = false;
    player.classList.remove("playing");
};

// Khi tiến độ bài hát thay đổi
// When the song progress changes
audio.ontimeupdate = function () {
    if (audio.duration) {
        const progressPercent = Math.floor((audio.currentTime / audio.duration) * 100);
        progress.value = progressPercent;
    }
};

// Xử lý khi tua song
progress.onchange = function (e) {
    const seekTime = (audio.duration / 100) * e.target.value;
    audio.currentTime = seekTime;
};

//Hàm

 
function playRandomSong() {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * songs.length);
    } while (newIndex === currentIndex);

    currentIndex = newIndex;
    loadCurrentSong();
}

function nextSong() {
    currentIndex++;
    if (currentIndex >= songs.length) {
      currentIndex = 0;
    }
    loadCurrentSong();
}

// Khi next song
nextBtn.onclick = function () {
    if (isRandom) {
        playRandomSong();
    } else {
        nextSong();
    }
    audio.play();
};

function prevSong() {
    currentIndex--;
    if (currentIndex < 0) {
        currentIndex = songs.length - 1;
    }
    loadCurrentSong();
}
  
// Khi prev song
prevBtn.onclick = function () {
    if (isRandom) {
        playRandomSong();
    }
    else {
        prevSong();
    }
    audio.play();
};

// Xử lý bật / tắt random song
randomBtn.onclick = function () {
    if(isRandom){
        randomBtn.classList.remove("active");
    }
    else{
        randomBtn.classList.add("active");
    }
    isRandom = !isRandom;
};

// Xử lý lặp lại một song
// Single-parallel repeat processing
repeatBtn.onclick = function () {
    if(isRepeat){
        repeatBtn.classList.remove("active");
    }
    else{
        repeatBtn.classList.add("active");
    }
    isRepeat = !isRepeat;
};

// Xử lý next song khi audio ended
// Handle next song when audio ended
audio.onended = function () {
if (isRepeat) {
    audio.play();
} else {
    nextBtn.click();
}
};
