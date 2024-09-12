const music = new Audio("mus/s1.mp3");
// music.play();

const songs = [
    
    {
        id:'1',
        songName:`Moonrise <br> <div class="subtitle">Guru Randhawa</div>`,
        poster:"im/img1.png",

    },
    {
        id:'2',
        songName:`Afterhours <br> <div class="subtitle">Bir</div>`,
        poster:"im/img2.png"
    },
    {
        id:'3',
        songName:`Gaani <br> <div class="subtitle">Jerry</div>`,
        poster:"im/img3.png"
    },
    {
        id:'4',
        songName:`All Night <br> <div class="subtitle">AP Dhillon</div>`,
        poster:"im/img4.png"
    },
    {
        id:'5',
        songName:`Schedule <br> <div class="subtitle">Teji Pannu</div>`,
        poster:"im/img5.png"
    },
    {
        id:'6',
        songName:`Judaa<br><div class="subtitle">Amrinder Gill</div>`,
        poster:"im/img6.png"
    },
    {
        id:'7',
        songName:`Gol Chowk<br><div class="subtitle">Hustinder</div>`,
        poster:"im/img7.png"
    },
    {
        id:'8',
        songName:`Insane<br><div class="subtitle">AP Dhillon</div>`,
        poster:"im/img8.png"
    },
    {
        id:'9',
        songName:`Players<br><div class="subtitle">Badshah & Karan Aujla</div>`,
        poster:"im/img9.png"
    },
    {
        id:'10',
        songName:`Broken<br><div class="subtitle">Starboy</div>`,
        poster:"im/img10.png"
    },
    {
        id:'11',
        songName:`Cause of You<br><div class="subtitle">Zehr Vibe</div>`,
        poster:"im/img11.png"
    },
    {
        id:'12',
        songName:`Tareefan<br><div class="subtitle">Harnoor</div>`,
        poster:"im/img12.png"
    },
    {
        id:'13',
        songName:`Spain<br><div class="subtitle">Jassa Dhillon</div>`,
        poster:"im/img13.png"
    },
    {
        id:'14',
        songName:`Daku<br><div class="subtitle">Chani Nattan</div>`,
        poster:"im/img14.png"
    },
    {
        id:'15',
        songName:`Snowfall<br><div class="subtitle">Jordan Sandhu</div>`,
        poster:"im/img15.png"
    },
    {
        id:'16',
        songName:`No Reason<br><div class="subtitle">Parmish Verma & GD47</div>`,
        poster:"im/img16.png"
    }
]

Array.from(document.getElementsByClassName('songitem')).forEach((element, i)=>{
    element.getElementsByTagName('img')[0].src = songs[i].poster;
    element.getElementsByTagName('h5')[0].innerHTML = songs[i].songName;
})

let masterplay = document.getElementById('masterplay');    // masterplay: main play pause button
let wave = document.getElementsByClassName('wave')[0];        //waves

masterplay.addEventListener('click',()=>{
    if(music.paused || music.currentTime<=0){
        music.play();
        masterplay.classList.remove('fa-play');
        masterplay.classList.add('fa-pause');
        wave.classList.add('active2');
    }
    else{
        music.pause();
        masterplay.classList.add('fa-play');
        masterplay.classList.remove('fa-pause');
        wave.classList.remove('active2');
    }
});

// saare butns play nhi hone...................
const makeAllPlays =()=>{
    Array.from(document.getElementsByClassName('fa-regular')).forEach((element)=>{
            element.classList.add('fa-circle-play');
            element.classList.remove('fa-circle-pause');
    })
}
const makeAllBackgrounds =()=>{
    Array.from(document.getElementsByClassName('songitem')).forEach((element)=>{
            element.style.background = "rgb(105,105,170,0)";

    })
}
// play buttons small ki functioning
let index = 0;
let image_player = document.getElementById('image_player');
let title = document.getElementById('title');

Array.from(document.getElementsByClassName('fa-regular')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        index=e.target.id;
        makeAllPlays();
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        music.src = `mus/s${index}.mp3`;
        image_player.src= `im/img${index}.png`;
        music.play();
        masterplay.classList.remove('fa-play');
        masterplay.classList.add('fa-pause');
        let song_title = songs.filter((ele)=>{
            return ele.id == index;
        })
        song_title.forEach(ele =>{
            let {songName} = ele;
            title.innerHTML = songName;
        })
        masterplay.classList.remove('fa-play');
        masterplay.classList.add('fa-pause');
        wave.classList.add('active2');
        music.addEventListener('ended',()=>{
            masterplay.classList.add('fa-play');
            masterplay.classList.remove('fa-pause');
            wave.classList.remove('active2');

        })
        makeAllBackgrounds();
        Array.from(document.getElementsByClassName('songitem'))[`${index-1}`].style.background = "rgb(105,105,170, .1)";
    })
})

let currentStart = document.getElementById('currentStart');
let currentEnd = document.getElementById('currentEnd');
let seek = document.getElementById('seek');
let bar2 = document.getElementById('bar2');
let dot = document.getElementsByClassName('dot')[0];

music.addEventListener('timeupdate',()=>{
    let music_curr=music.currentTime;
    let music_dur = music.duration;

    let min = Math.floor(music_dur/60);
    let sec = Math.floor(music_dur%60);
    if (sec<10){
        sec = `0${sec}`
    }
    currentEnd.innerText=`${min}:${sec}`;

    let min1 = Math.floor(music_curr/60);
    let sec1= Math.floor(music_curr%60);
    if (sec1<10){
        sec1 = `0${sec1}`
    }
    currentStart.innerText=`${min1}:${sec1}`;

    let progressbar = parseInt((music.currentTime/music.duration)*100);
    seek.value = progressbar;
    let seekbar = seek.value;
    bar2.style.width = `${seekbar}%`;
    dot.style.left = `${seekbar}%`;
})

seek.addEventListener('change',()=>{
    music.currentTime = seek.value*music.duration/100;
})

music.addEventListener('ended',()=>{
    masterplay.classList.add('fa-play');
    masterplay.classList.remove('fa-pause');
    wave.classList.remove('active2');
})

let vol_icon = document.getElementById('vol_icon');
let vol = document.getElementById('vol');
let vol_dot = document.getElementById('vol_dot');
let vol_bar = document.getElementsByClassName('vol_bar')[0];

vol.addEventListener('change', ()=>{
    if(vol.value == 0){
        vol_icon.classList.remove('fa-volume-low');
        vol_icon.classList.add('fa-volume-xmark');
        vol_icon.classList.remove('fa-volume-high');
        
    }
    if(vol.value > 0){
        vol_icon.classList.add('fa-volume-low');
        vol_icon.classList.remove('fa-volume-xmark');
        vol_icon.classList.remove('fa-volume-high');
        
    }
    if(vol.value > 50){
        vol_icon.classList.remove('fa-volume-low');
        vol_icon.classList.remove('fa-volume-xmark');
        vol_icon.classList.add('fa-volume-high');
    }

    let vol_a = vol.value;
    vol_bar.style.width = `${vol_a}%`;
    vol_dot.style.left = `${vol_a}%`;
    music.volume = vol_a/100;

})

let back = document.getElementById('back');
let next = document.getElementById('next');
back.addEventListener('click', ()=>{
    index --;
    if(index <1){
        index = Array.from(document.getElementsByClassName('songitem')).length;
    }
    music.src = `mus/s${index}.mp3`;
        image_player.src= `im/img${index}.png`;
        music.play();
        masterplay.classList.remove('fa-play');
        masterplay.classList.add('fa-pause');
        let song_title = songs.filter((ele)=>{
            return ele.id == index;
        })
        song_title.forEach(ele =>{
            let {songName} = ele;
            title.innerHTML = songName;
        })
        makeAllPlays();
        document.getElementById(`${index}`).classList.remove('fa-play');
        document.getElementById(`${index}`).classList.add('fa-pause');
        makeAllBackgrounds();
        Array.from(document.getElementsByClassName('songitem'))[`${index-1}`].style.background = "rgb(105,105,170, .1)";
        
})

next.addEventListener('click', ()=>{
    // index -= 0;
    index++;
    if(index > Array.from(document.getElementsByClassName('songitem')).length){
        index =1;
    }
    music.src = `mus/s${index}.mp3`;
        image_player.src= `im/img${index}.png`;
        music.play();
        masterplay.classList.remove('fa-play');
        masterplay.classList.add('fa-pause');
        let song_title = songs.filter((ele)=>{
            return ele.id == index;
        })
        song_title.forEach(ele =>{
            let {songName} = ele;
            title.innerHTML = songName;
        })
        makeAllPlays();
        document.getElementById(`${index}`).classList.remove('fa-play');
        document.getElementById(`${index}`).classList.add('fa-pause');
        makeAllBackgrounds();
        Array.from(document.getElementsByClassName('songitem'))[`${index-1}`].style.background = "rgb(105,105,170, .1)";
        
})
















// Popular songs scrolll..........................................................................
let top_left_scroll = document.getElementById('top_left_scroll');
let top_right_scroll = document.getElementById('top_right_scroll');
let top_song = document.getElementsByClassName('top_song')[0];
top_right_scroll.addEventListener('click', ()=>{
    top_song.scrollLeft +=330;
});
top_left_scroll.addEventListener('click', ()=>{
    top_song.scrollLeft -=330;
});


// Popular artists scrolll........................................................................
let left_scroll = document.getElementById('left_scroll');
let right_scroll = document.getElementById('right_scroll');
let item = document.getElementsByClassName('item')[0];
right_scroll.addEventListener('click', ()=>{
    item.scrollLeft +=330;
});
left_scroll.addEventListener('click', ()=>{
    item.scrollLeft -=330;
});

/*  /////////////////////////////////////////////////////////////////////////////////////////         search*/
/* ///////////////////////////////////////////////////////////////////////// validate username */
function validate(){
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    if(username =="admin" && password=="user"){
        alert("login successful");
        return false;
    }
    else{
        alert("login falied");
    }
} 