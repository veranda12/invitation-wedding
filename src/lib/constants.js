// ====================================
// KONFIGURASI UNDANGAN PERNIKAHAN
// Edit data di bawah ini sesuai kebutuhan
// Lokasi & koordinat dibaca dari .env (tidak masuk ke GitHub)
// ====================================

// Baca lokasi dari environment variables
const EVENT1_LAT = parseFloat(import.meta.env.VITE_EVENT1_LAT || '-6.2446')
const EVENT1_LNG = parseFloat(import.meta.env.VITE_EVENT1_LNG || '106.8006')
const EVENT1_ADDR = import.meta.env.VITE_EVENT1_ADDRESS || 'Lokasi belum dikonfigurasi'

const EVENT2_LAT = parseFloat(import.meta.env.VITE_EVENT2_LAT || '-6.2253')
const EVENT2_LNG = parseFloat(import.meta.env.VITE_EVENT2_LNG || '106.8019')
const EVENT2_ADDR = import.meta.env.VITE_EVENT2_ADDRESS || 'Lokasi belum dikonfigurasi'

export const WEDDING_CONFIG = {
  // === PASANGAN ===
  groom: {
    name: 'Deni Maulana Shobri',
    fullName: 'Deni Maulana Shobri, S.Kom',
    father: 'Bapak Doddy Shobri (Alm.)',
    mother: 'Ibu Sri Pamulati',
    childOrder: 'Putra keempat',
    photo: '',
  },
  bride: {
    name: 'Reni Haryani',
    fullName: 'Reni Haryani, S.M',
    father: 'Bapak Dayat (Alm.)',
    mother: 'Ibu Enung',
    childOrder: 'Putri keempat',
    photo: '',
  },

  // === TANGGAL & WAKTU ===
  weddingDate: '2026-07-04T08:00:00+07:00',

  // === ACARA ===
  events: [
    {
      title: 'Akad Nikah',
      date: '04 Juli 2026',
      time: '09:00 - 10:00 WIB',
      venue: 'Kediaman Mempelai Wanita',
      address: EVENT1_ADDR,
      mapCenter: [EVENT1_LAT, EVENT1_LNG]
    },
    {
      title: 'Resepsi',
      date: '04 Juni 2026',
      time: '11:00 - 17:00 WIB',
      venue: 'Kediaman Mempelai Wanita',
      address: EVENT2_ADDR,
      mapCenter: [EVENT2_LAT, EVENT2_LNG]
    },
  ],

  // === CERITA CINTA ===
  loveStory: [
    {
      date: 'September 2025',
      title: 'Pertama Bertemu',
      description: 'Dari pertemuan sederhana di sela istirahat makan siang kantor, tak pernah terbayang bahwa langkah kecil itu akan membawa kami sejauh ini. Senyummu menjadi awal dari cerita yang perlahan tumbuh.',
      icon: '💫',
    },
    {
      date: 'Oktober 2025',
      title: 'Mulai Dekat',
      description: 'Berawal dari kebersamaan sebagai rekan kerja, waktu merangkai cerita kami dalam tawa dan canda. Dari meluncur di atas es saat ice skating hingga hangatnya kebersamaan bersama teman-teman, tanpa disadari rasa itu tumbuh semakin dalam.',
      icon: '☕',
    },
    {
      date: 'November 2025',
      title: 'Awal Sebuah Kisah',
      description: 'Percakapan demi percakapan menjadi lebih berarti, menghadirkan kenyamanan yang tak lagi biasa. Hingga pada satu momen, perasaan itu terungkap, dan dengan satu kata sederhana, "Ya", kisah ini pun dimulai.',
      icon: '♡',
    },
    {
      date: 'Desember 2025',
      title: 'Menyatakan Keseriusan',
      description: 'Dengan penuh keyakinan, aku melangkah datang ke rumah, menyampaikan niat tulusku di hadapan keluarganya. Sebuah langkah besar yang menjadi awal dari perjalanan menuju masa depan bersama.',
      icon: '🤍',
    },
    {
      date: 'April 2026',
      title: 'Lamaran',
      description: 'Seiring waktu yang semakin menguatkan, pada bulan April 2026 kami mengikat janji dalam sebuah lamaran, sebagai awal dari komitmen yang lebih besar.',
      icon: '💍',
    },
    {
      date: 'Juli 2026',
      title: 'Menikah',
      description: 'Waktu menguatkan setiap langkah yang telah kami pilih. Kini, kami menantikan hari bahagia di bulan Juni 2026, saat dua perjalanan hidup dipersatukan dalam ikatan suci menuju masa depan bersama.',
      icon: '🕌',
    },
  ],

  // === GALERI ===
  // Upload foto ke Supabase Storage → bucket "wedding-photos" 
  // Ganti nama file (foto1.jpg, dst) sesuai nama file yang diupload
  gallery: [
    `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/photos/ea823a3e-79cf-440f-84d6-d859c7279c3a.jfif`,
    `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/photos/Img 001.jpeg`,
    `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/photos/WhatsApp Image 2025-12-21 at 8.52.52 PM.jpeg`,
    `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/photos/fc569d1e-4f09-4580-8b43-b8a14c0db2cf.jfif`,
    `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/photos/foto5.jpg`,
    `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/photos/foto6.jpg`,
  ],

  // === REKENING (Gift) ===
  bankAccounts: [
    { bank: 'Bank BCA', number: '1234567890', name: 'Deni Maulana' },
    { bank: 'Bank BCA', number: '0987654321', name: 'Reni Haryani' },
  ],
}
