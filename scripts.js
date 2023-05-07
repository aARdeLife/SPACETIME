const dialContainer = document.getElementById('dial-container');
const dial = document.getElementById('dial');
const dialMiddle = document.getElementById('dial-middle');
const dialBackground = document.querySelector('.dial-background');

let dragging = false;
let angle = 0;

dial.onmousedown = (event) => {
  event.preventDefault();
  dragging = true;
};

document.onmouseup = () => {
  if (dragging) {
    setTimeout(() => {
      dragging = false;
      angle = 0;
      dial.style.transform = `rotate(${angle}deg)`;
      if (dialMiddle.style.display !== 'none') {
        dialMiddle.style.transform = `rotate(${angle}deg)`;
      }
      if (dialBackground.style.display !== 'none') {
        dialBackground.style.transform = `rotate(${angle}deg)`;
      }
    }, 100);
  }
};

document.onmousemove = (event) => {
  if (dragging) {
    const rect = dial.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    angle = Math.atan2(mouseY - centerY, mouseX - centerX) * (180 / Math.PI);
    dial.style.transform = `rotate(${angle}deg)`;
    if (dialMiddle.style.display !== 'none') {
      dialMiddle.style.transform = `rotate(${angle}deg)`;
    }
    if (dialBackground.style.display !== 'none') {
      dialBackground.style.transform = `rotate(${angle}deg)`;
    }
  }
};

let doubleClickTimeout;

dial.ondblclick = () => {
  if (doubleClickTimeout) {
    clearTimeout(doubleClickTimeout);
  }
  doubleClickTimeout = setTimeout(() => {
    dialMiddle.style.display = dialMiddle.style.display === 'none' ? 'block' : 'none';
  }, 300);
};

dialMiddle.ondblclick = () => {
  if (doubleClickTimeout) {
    clearTimeout(doubleClickTimeout);
  }
  doubleClickTimeout = setTimeout(() => {
    dialBackground.style.display = dialBackground.style.display === 'none' ? 'block' : 'none';
  }, 300);
};

document.addEventListener('click', (event) => {
  if (!dialContainer.contains(event.target)) {
    dialMiddle.style.display = 'none';
    dialBackground.style.display = 'none';
  }
});

