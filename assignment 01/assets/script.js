// Buttons  

const addButton = document.getElementById('add-btn');
const listButton = document.getElementById('list-view-btn');
const cardButton = document.getElementById('card-view-btn');
const cleanButton = document.getElementById('clean-btn');

// Elements

const trackInput = document.getElementById('track-input');
const trackList  = document.getElementById('track-list');
const fileInput  = document.getElementById('file-input');
const colorPicker = document.getElementById('color-picker');


// List view 

listButton.addEventListener('click', () => {
  trackList.classList.remove('card-view');
  trackList.classList.add('list-view');
  listButton.classList.add('active');
  cardButton.classList.remove('active');
});

// Card view  

cardButton.addEventListener('click', () => {
  trackList.classList.remove('list-view');
  trackList.classList.add('card-view');
  cardButton.classList.add('active');
  listButton.classList.remove('active');
});

// Add 

addButton.addEventListener('click', () => {
  const text = trackInput.value.trim();
  if (text === '') return;

  const color = colorPicker.value;

  const li = document.createElement('li');
  li.className = 'card';
  li.style.background = color;

  const title = document.createElement('span');
  title.className = 'title';
  title.textContent = text;

   // play/pause

  const playBtn = document.createElement('button');
  playBtn.className = 'play-btn';
  playBtn.textContent = '▶';
  playBtn.setAttribute('data-state', 'paused');
  playBtn.addEventListener('click', () => {
    const state = playBtn.getAttribute('data-state');
    if (state === 'playing') {
      playBtn.setAttribute('data-state', 'paused');
      playBtn.textContent = '▶';
      playBtn.setAttribute('aria-pressed', 'false');
    } else {
      playBtn.setAttribute('data-state', 'playing');
      playBtn.textContent = '⏸';
      playBtn.setAttribute('aria-pressed', 'true');
    }
  });

  // Bottone canc (X) delle tracce

  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'delete-btn';
  deleteBtn.textContent = '×';
  deleteBtn.addEventListener('click', () => {
    li.remove();
  });

  li.appendChild(title);
  li.appendChild(playBtn);  
  li.appendChild(deleteBtn);
  trackList.appendChild(li);

  trackInput.value = '';
});

document.querySelectorAll('#track-list .card').forEach((li) => {
  if (!li.querySelector('.play-btn')) {
    const playBtn = document.createElement('button');
    playBtn.className = 'play-btn';
    playBtn.textContent = '▶';
    playBtn.setAttribute('data-state', 'paused');
    playBtn.addEventListener('click', () => {
      const state = playBtn.getAttribute('data-state');
      if (state === 'playing') {
        playBtn.setAttribute('data-state', 'paused');
        playBtn.textContent = '▶';
        playBtn.setAttribute('aria-pressed', 'false');
      } else {
        playBtn.setAttribute('data-state', 'playing');
        playBtn.textContent = '⏸';
        playBtn.setAttribute('aria-pressed', 'true');
      }
    });
    li.appendChild(playBtn);
  }
  if (!li.querySelector('.delete-btn')) {
    const btn = document.createElement('button');
    btn.className = 'delete-btn';
    btn.textContent = '×';
    btn.addEventListener('click', () => li.remove());
    li.appendChild(btn);
  }
});

// Clean all  

cleanButton.addEventListener('click', () => {
  trackList.innerHTML = '';
});

// File input 

fileInput.addEventListener('change', () => {
  const file = fileInput.files[0];
  if (!file) return;
  const fileName = file.name.replace(/\.[^/.]+$/, "");
  trackInput.value = fileName;
});