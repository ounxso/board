const clock = document.querySelector('h2#clock');

function getClock() {
  const date = new Date();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  clock.innerHTML = `<span class="current-time">Current Time</span><br><span class="number">
  ${hours}:${minutes}:${seconds}</span>`;

  clock.style.textAlign = 'center';
  clock.style.margin = '65px';
}

// 처음에 한 번 호출하고 이후 1초마다 호출
getClock();
setInterval(getClock, 1000);
