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
const repeatSong = document.querySelector('.btn-repeat')
const playlist = document.querySelector('.playlist')

const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    config: {},
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

    setConfig: function(key, value) {
        this.config[key] = value;
    },

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
            // _this.songNext();
            // audio.play();
            if(_this.isRandom) {
                _this.playRandomSong();
            } else {
                _this.songNext();
            };
            audio.play();
            _this.scrollToActiveSong();
        }

        //xử lý khi nhấn prev
        btnPrev.onclick = function() {
            // _this.songPrev();
            // audio.play();
            if(_this.isRandom) {
                _this.playRandomSong();
            } else {
                _this.songNext();
            };
            audio.play();
            _this.scrollToActiveSong();

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
        audio.addEventListener('ended', function() {
            if(_this.isRandom) {
                _this.playRandomSong();
                //audio.play();
            } if(_this.isRepeat) {
                _this.playRepeatSong();
            // } if(_this.isRandom && _this.isRepeat) {
            //     _this.playRepeatSong();
            } else {
                _this.songNext();
            };
            audio.play();
        })

        // xử lý khi ấn random
        randomSong.onclick = function(e) {
            // console.log(123);
            _this.isRandom = !_this.isRandom;
            _this.setConfig("isRandom", _this.isRandom);
            randomSong.classList.toggle('active', _this.isRandom)
        }

        // xử lý khi ấn random
        repeatSong.onclick = function(e) {
            _this.isRepeat = !_this.isRepeat;
            _this.setConfig("isRepeat", _this.isRepeat);
            repeatSong.classList.toggle('active', _this.isRepeat);
        }
        
        // click vào bài hát
        playlist.onclick = function(e) {
            const songNode = e.target.closest(".song:not(.active)");

            if (songNode || e.target.closest(".option")) {
            // Xử lý khi click vào song
            // Handle when clicking on the song
                if (songNode) {
                    _this.currentIndex = Number(songNode.dataset.index);
                    _this.loadCurrentSong();
                    _this.render();
                    audio.play();
                }

                // Xử lý khi click vào song option
                // Handle when clicking on the song option
                if (e.target.closest(".option")) {
                }
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

    // random bài hát
    playRandomSong: function() {
        // const randomIndex = Math.floor(Math.random() * this.songs.length);
        // this.currentIndex = randomIndex;
        // this.loadCurrentSong();
        let randomIndex;
        do{
            randomIndex = Math.floor(Math.random() * this.songs.length); 
        } while (randomIndex == this.currentIndex)
        this.currentIndex = randomIndex;
        this.loadCurrentSong();
    },

    // lặp lại bài hát
    playRepeatSong: function() {
        const repeatIndex = this.currentIndex;
        this.loadCurrentSong();
    },

    loadConfig: function () {
        this.isRandom = this.config.isRandom;
        this.isRepeat = this.config.isRepeat;
    },

    scrollToActiveSong: function () {
        setTimeout(() => {
          $(".song.active").scrollIntoView({
            behavior: "smooth",
            block: "nearest"
          });
        }, 300);
    },

    //chạy các hàm đã khởi tạo
    start: function() {
        this.defineProperties();

        this.loadCurrentSong();

        this.render();

        this.handleEvents();

        this.loadConfig();

        this.scrollToActiveSong();

    }
}

app.start()