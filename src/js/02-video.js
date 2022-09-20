import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const CURRENT_TIME_KEY = 'videoplayer-current-time';

const refs = {
  player: document.querySelector('#vimeo-player'),
};

const player = new Player(refs.player);

player.setCurrentTime(localStorage.getItem(CURRENT_TIME_KEY) || 0);
player.on('timeupdate', throttle(onTimeUpdate, 1000));

function onTimeUpdate({ seconds }) {
  localStorage.setItem(CURRENT_TIME_KEY, seconds);
}
