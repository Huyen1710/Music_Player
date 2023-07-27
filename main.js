const cd = document.querySelector('.cd');
const heading = document.querySelector('header h2');
const cdThumb = document.querySelector('.cd-thumb');
const audio = document.querySelector('#audio');
const btnPlay = document.querySelector('.btn-toggle-play');
const player = document.querySelector('.player')
const btnNext = document.querySelector('.btn-next')
const btnPrev = document.querySelector('.btn-prev')
const progressTrack = document.querySelector('#progress')
const randomSong = document.querySelector('.btn-random')

const app = {
    currentIndex: 0,
    isPlaying: false,
    //lưu trữ bài hát
    songs: [
        {
            name: 'Rồi ta sẽ ngắm pháo hoa cùng nhau',
            singer: 'Olew',
            image: './assets/img/song_1.jpeg',
            path: './assets/music/song_1.mp3'
        },
        {
            name: 'Yêu người có ước mơ',
            singer: 'buitruonglinh',
            image: './assets/img/song_2.jpeg',
            path: './assets/music/song_2.mp3'
        },
        {
            name: 'Đưa em về nhà',
            singer: 'GRAY D, Chillies',
            image: './assets/img/song_3.jpeg',
            path: './assets/music/song_3.mp3'
        },{
            name: 'Em đồng ý (Yes, I do)',
            singer: 'Đức Phúc x 911',
            image: './assets/img/song_6.jpeg',
            path: './assets/music/song_6.mp3'
        },
        {
            name: 'Nàng Thơ',
            singer: 'Hoàng Dũng',
            image: './assets/img/song_5.jpeg',
            path: './assets/music/song_5.mp3'
        },
        {
            name: 'Sau tất cả',
            singer: 'Erik',
            image: './assets/img/song_4.jpeg',
            path: './assets/music/song_4.mp3'
        },
        {
            name: 'Đã lỡ yêu em nhiều',
            singer: 'Justatee',
            image: './assets/img/song_7.jpeg',
            path: './assets/music/song_7.mp3'
        },
        {
            name: 'Có hẹn với thanh xuân',
            singer: 'Monstar',
            image: './assets/img/song_8.jpeg',
            path: './assets/music/song_8.mp3'
        },
        {
            name: 'Bật tình yêu lên',
            singer: 'Tăng Duy Tân x Hoà Minzy',
            image: './assets/img/song_9.jpeg',
            path: './assets/music/song_9.mp3'
        },
        {
            name: 'Để tôi ôm em bằng giai điệu này',
            singer: 'KAI ĐINH x MIN x GREY D',
            image: './assets/img/song_10.jpeg',
            path: './assets/music/song_10.mp3'
        }
        
    ],


    //render bài hát vào html để hiển thị lên
    render: function() {
        
        const htmls = this.songs.map((song, index) => {
            return `
            <div class="song" ${index === this.currentIndex ? "active" : ""}" data-index="${index}">
                <div class="thumb" style="background-image: url('${song.image}')"></div>
                    <div class="body">
                        <h3 class="title">${song.name}</h3>
                        <p class="author">${song.singer}</p>
                    </div>
                    <div class="option">
                        <i class="fas fa-ellipsis-h"></i>
                </div>
            </div>
            `
        });
        document.querySelector('.playlist').innerHTML = htmls.join('');
    },

    // defineProperty: function() {
    //     Object.defineProperty(this, "currentSong", {
    //         get: function() {
    //             return this.songs[this.currentIndex];
    //         }
    //     });
    // },

    handleEvents: function() {
        const _this = this;
        const cdWidth = cd.offsetWidth;

        //phóng to, thu nhỏ cd
        document.onscroll = function() {
            const scrollScreen = document.documentElement.scrollTop;
            const newcdWidth = cdWidth - scrollScreen;
            cd.style.width = newcdWidth > 0 ? newcdWidth + "px" : 0;
            cd.style.opacity = newcdWidth / cdWidth;
        }


        // xử lý cho cd thumd quay
        const cdThumbAnimate = cdThumb.animate([{ transform: "rotate(360deg)" }], {
            duration: 20000, // 10 seconds
            iterations: Infinity
        });
        cdThumbAnimate.pause();

        // xử lý khi click play
        btnPlay.onclick = function() {       
            if (_this.isPlaying) {  
                audio.pause();
            } else {
                audio.play();
            }
        };

        // xử lý khi ấn nút play
        audio.onplay = function() {
            _this.isPlaying = true;
            player.classList.add("playing");
            cdThumbAnimate.play();
        };

    
        // xử lý khi ấn nút pause
        audio.onpause = function() {
            _this.isPlaying = false;
            player.classList.remove("playing");
            cdThumbAnimate.pause();
        };

        // xử lý khi ấn next
        btnNext.onclick = function() {
            _this.songNext();
            audio.play();
            
        }

        //xử lý khi nhấn prev
        btnPrev.onclick = function() {
            _this.songPrev();
            audio.play();
        }

        //xử lý thanh progress
        audio.ontimeupdate = function() {
            if (audio.duration) {
                const progressPercent = Math.floor( (audio.currentTime / audio.duration) * 100);
                progressTrack.value = progressPercent;
                //console.log(progressPercent)
            };
        }
        
        //xử lý khi tua bài hát
        progressTrack.onchange = function(e) {
            const seektime = (audio.duration /100) * e.target.value;
            audio.currentTime = seektime;
        }

        //xử lý khi hết bài hát
        audio.onended = function() {
            if (audio.ended) {
                songNext();
            }
            
        }
    },

    defineProperties: function () {
        Object.defineProperty(this, "currentSong", {
            get: function () {
                return this.songs[this.currentIndex];
            }
        });
    },

    loadCurrentSong: function(){
        heading.textContent = this.currentSong.name;
        // cdThumb.style.backgroungImage = `url(${this.currentSong.image})`;
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
        audio.src = this.currentSong.path;
    },

    // next bài hát
    songNext: function() {
        
        if (this.currentIndex == this.songs.length-1) {
            this.currentIndex = 0;
        } else{
            this.currentIndex++;
        }
        this.loadCurrentSong();
    },

    // prev bài hát
    songPrev: function() {
        if (this.currentIndex == 0) {
            this.currentIndex = 0
        }
        this.currentIndex--;
        this.loadCurrentSong();
    },

    //chạy các hàm đã khởi tạo
    start: function() {
        this.defineProperties();

        this.loadCurrentSong();

        this.render();

        this.handleEvents();
    }
}
app.start()