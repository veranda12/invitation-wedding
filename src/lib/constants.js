// ====================================
// KONFIGURASI UNDANGAN PERNIKAHAN
// Edit data di bawah ini sesuai kebutuhan
// ====================================

export const WEDDING_CONFIG = {
  // === PASANGAN ===
  groom: {
    name: 'Deni Maulana Shobri',
    fullName: 'Deni Maulana Shobri, S.Kom',
    father: 'Bapak Doddy Shobri',
    mother: 'Ibu Sri Pamulati',
    childOrder: 'Putra keempat',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
  },
  bride: {
    name: 'Reni Haryani',
    fullName: 'Reni Haryani',
    father: 'Bapak Dayat',
    mother: 'Ibu Enung',
    childOrder: 'Putri keempat',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face',
  },

  // === TANGGAL & WAKTU ===
  weddingDate: '2026-07-04T08:00:00+07:00',

  // === ACARA ===
  events: [
    {
      title: 'Akad Nikah',
      date: '04 Juli 2026',
      time: '08:00 - 10:00 WIB',
      venue: 'Dirumah Mempelai Wanita',
      address: 'Jl. Sisingamangaraja, Kebayoran Baru, Jakarta Selatan',
      mapCenter: [-6.2446, 106.8006],
      dresscode: 'Putih & Cream',
    },
    {
      title: 'Resepsi',
      date: '04 Juni 2026',
      time: '11:00 - 17:00 WIB',
      venue: 'Dirumah Mempelai Wanita',
      address: 'Jl. Asia Afrika, Senayan, Jakarta Selatan',
      mapCenter: [-6.2253, 106.8019],
      dresscode: 'Earth Tone / Pastel',
    },
  ],

  // === CERITA CINTA ===
  loveStory: [
    {
      date: 'Januari 2020',
      title: 'Pertama Bertemu',
      description: 'Kami bertemu pertama kali di sebuah acara kampus. Senyummu adalah hal pertama yang membuat hatiku bergetar.',
      icon: '💫',
    },
    {
      date: 'Maret 2020',
      title: 'Mulai Dekat',
      description: 'Dari teman menjadi sahabat, lalu menjadi seseorang yang selalu ada di pikiran. Kita mulai sering berjumpa.',
      icon: '☕',
    },
    {
      date: 'Agustus 2020',
      title: 'Jadian',
      description: 'Di bawah langit senja yang indah, aku memberanikan diri untuk mengungkapkan perasaan. Dan jawabanmu adalah "Ya".',
      icon: '💕',
    },
    {
      date: 'Desember 2025',
      title: 'Lamaran',
      description: 'Setelah 5 tahun bersama, akhirnya aku berlutut dan bertanya "Maukah kamu menikah denganku?" dengan cincin di tangan.',
      icon: '💍',
    },
    {
      date: 'Juni 2026',
      title: 'Menikah',
      description: 'Hari yang kami tunggu-tunggu akhirnya tiba. Kami siap memulai babak baru kehidupan bersama.',
      icon: '🕌',
    },
  ],

  // === GALERI ===
  gallery: [
    'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1529636798458-92182e662485?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?w=600&h=400&fit=crop',
  ],

  // === REKENING (Gift) ===
  bankAccounts: [
    { bank: 'Bank BCA', number: '1234567890', name: 'Deni Maulana' },
    { bank: 'Bank BCA', number: '0987654321', name: 'Reni Haryani' },
  ],
}
