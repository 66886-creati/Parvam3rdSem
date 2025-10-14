
const movies = [
  { id: 1, title: 'Demon Slayer' },
  { id: 2, title: 'Avatar 3' },
  { id: 3, title: 'Marvel Avengers Assemble' },
  { id: 4, title: 'Kantara Chapter-1' },
  { id: 5, title: 'Salaar' },
];

const showtimes = {
  1: ['10:00 AM', '1:00 PM', '6:00 PM'],
  2: ['9:30 AM', '3:00 PM', '9:00 PM'],
  3: ['11:00 AM', '2:30 PM', '8:30 PM'],
  4: ['7:00 AM', '1:30 PM', '11:30 PM'],
  5: ['6:00 AM', '7:30 PM', '11:30 PM'],  
};


const PRICE = 300;

let selectedMovie = null;
let selectedShowtime = null;
let selectedSeats = new Set();

const movieListDiv = document.querySelector('.movie-list');
const showtimeListDiv = document.querySelector('.showtime-list');
const sectionMovies = document.getElementById('movies');
const sectionShowtimes = document.getElementById('showtimes');
const sectionSeats = document.getElementById('seatSelection');
const sectionConfirm = document.getElementById('confirmation');

const backToMoviesBtn = document.getElementById('backToMovies');
const backToShowtimesBtn = document.getElementById('backToShowtimes');
const goHomeBtn = document.getElementById('goHome');

const seatGrid = document.querySelector('.seat-grid');
const selectedCountEl = document.getElementById('selectedCount');
const totalPriceEl = document.getElementById('totalPrice');
const confirmBookingBtn = document.getElementById('confirmBooking');


function loadMovies() {
  movieListDiv.innerHTML = '';
  movies.forEach(m => {
    const div = document.createElement('div');
    div.classList.add('movie-card');
    div.innerText = m.title;
    div.onclick = () => {
      selectedMovie = m;
      showShowtimes();
    };
    movieListDiv.appendChild(div);
  });
}


function showShowtimes() {
  sectionMovies.classList.add('hidden');
  sectionShowtimes.classList.remove('hidden');
  showtimeListDiv.innerHTML = '';

  const times = showtimes[selectedMovie.id];
  times.forEach(t => {
    const div = document.createElement('div');
    div.classList.add('showtime-card');
    div.innerText = t;
    div.onclick = () => {
      selectedShowtime = t;
      showSeatSelection();
    };
    showtimeListDiv.appendChild(div);
  });
}

backToMoviesBtn.onclick = () => {
  sectionShowtimes.classList.add('hidden');
  sectionMovies.classList.remove('hidden');
};

backToShowtimesBtn.onclick = () => {
  sectionSeats.classList.add('hidden');
  sectionShowtimes.classList.remove('hidden');
};

goHomeBtn.onclick = () => {
  sectionConfirm.classList.add('hidden');
  sectionMovies.classList.remove('hidden');
  selectedMovie = null;
  selectedShowtime = null;
  selectedSeats.clear();
  loadMovies();
};

function showSeatSelection() {
  sectionShowtimes.classList.add('hidden');
  sectionSeats.classList.remove('hidden');

  seatGrid.innerHTML = '';
  selectedSeats.clear();
  updateSeatInfo();

  const rows = 10, cols = 10;

  const occupiedSeats = new Set();
  for (let i = 0; i < 15; i++) {
    const r = Math.floor(Math.random() * rows);
    const c = Math.floor(Math.random() * cols);
    occupiedSeats.add(r * cols + c);
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const idx = r * cols + c;
      const seatDiv = document.createElement('div');
      seatDiv.classList.add('seat');
      if (occupiedSeats.has(idx)) {
        seatDiv.classList.add('occupied');
      }
      seatDiv.dataset.seatIndex = idx;
      seatDiv.onclick = () => {
        if (seatDiv.classList.contains('occupied')) return;
        if (seatDiv.classList.contains('selected')) {
          seatDiv.classList.remove('selected');
          selectedSeats.delete(idx);
        } else {
          seatDiv.classList.add('selected');
          selectedSeats.add(idx);
        }
        updateSeatInfo();
      };
      seatGrid.appendChild(seatDiv);
    }
  }
}

function updateSeatInfo() {
  const cnt = selectedSeats.size;
  selectedCountEl.innerText = cnt;
  totalPriceEl.innerText = cnt * PRICE;
}

confirmBookingBtn.onclick = () => {
  if (selectedSeats.size === 0) {
    alert('Select at least one seat');
    return;
  }
  sectionSeats.classList.add('hidden');
  sectionConfirm.classList.remove('hidden');
};

loadMovies();
