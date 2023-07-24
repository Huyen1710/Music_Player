const app = {
    currentIndex: 0,
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
        document.querySelector('.playlist').innerHTML = htmls.join('') 
    },

    //chạy các hàm đã khởi tạo
    start: function() {
        this.render();
    }
}
app.start()