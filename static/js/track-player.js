function formatTime(seconds) {
	if (isNaN(seconds)) return "0:00";
	const m = Math.floor(seconds / 60);
	const s = Math.floor(seconds % 60).toString().padStart(2, '0');
	return `${m}:${s}`;
}

function createAudioPlayer(container) {
	const audio = container.querySelector("audio");
	const ctx = new (window.AudioContext || window.webkitAudioContext)();
	const source = ctx.createMediaElementSource(audio);
	source.connect(ctx.destination);

	const coverImg = container.querySelector('.tp-cover-img')
	const playPauseBtn = container.querySelector('.tp-play-pause-btn');
	const playPauseBtnIcon = playPauseBtn.querySelector('div');
	const seekBar = container.querySelector('.tp-seek-bar');
	const time = container.querySelector('.tp-time');
	const duration = container.querySelector('.tp-duration');

	function updateTime() {
		time.textContent = `${formatTime(audio.currentTime)}`;
		if (seekBar.max != audio.duration) updateDuration();
	}

	function updateDuration() {
		duration.textContent = `${formatTime(audio.duration)}`;
		seekBar.max = audio.duration;
	}

	function stop() {
		audio.pause();
		audio.currentTime = 0;
		seekBar.value = 0;
		updateTime();
		playPauseBtnIcon.classList.remove('tp-pause-icon');
	}

	function togglePlayBtnState() {
		playPauseBtnIcon.classList.toggle('tp-pause-icon');
	}

	function togglePlay() {
		if (audio.paused) {
			ctx.resume();	
			audio.play();
			togglePlayBtnState();
		} else {
			audio.pause();
			togglePlayBtnState();
		}
	}

	coverImg.addEventListener('click', togglePlay);
	playPauseBtn.addEventListener('click', togglePlay);
	seekBar.addEventListener('input', () => {
		audio.currentTime = seekBar.value;
		updateTime();
	});

	audio.addEventListener('timeupdate', () => {
		seekBar.value = audio.currentTime;
		updateTime();
	});

	audio.addEventListener('loadedmetadata', () => {
		seekBar.max = audio.duration;
		updateDuration();
	});

	audio.addEventListener('ended', stop)
}

document.querySelectorAll('.track-player').forEach(createAudioPlayer);
