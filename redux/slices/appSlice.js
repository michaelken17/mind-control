import { createSlice } from "@reduxjs/toolkit";

const mentalIllnessData = [
  {
    img: "/image/Mental Illness Illustration/4.png",
    title: "Depression",
    author: "Gangguan Depresi",
    link: "/MentalIllness/Depression/Panduan",
  },
  {
    img: "/image/Mental Illness Illustration/1.png",
    title: "Anxiety",
    author: "Gangguan Kecemasan",
    link: "/MentalIllness/Anxiety/Panduan",
  },
  {
    img: "/image/Mental Illness Illustration/3.png",
    title: "OCD",
    author: "Obsessive-Compulsive Disorder",
    link: "/MentalIllness/OCD/Panduan",
  },
  {
    img: "/image/Mental Illness Illustration/5.png",
    title: "Sleep Disorder",
    author: "Gangguan Tidur",
    link: "/MentalIllness/SleepDisorder/Panduan",
  },
];

// MENTAL HEALTH CHECK
const MHCChoices = [
  { name: "Tidak ada", desc: "Sama sekali tidak ada ", score: 0 },
  { name: "Sedikit", desc: "Jarang, kurang dari satu atau dua hari", score: 1 },
  { name: "Ringan", desc: "Beberapa hari", score: 2 },
  { name: "Sedang", desc: "Lebih dari 7 hari", score: 3 },
  { name: "Berat", desc: "Hampir setiap hari", score: 4 },
];
const MHCQuestions = [
  {
    no: 1,
    question: "Kurang minat atau kesenangan dalam melakukan sesuatu",
    english: "Little interest or pleasure in doing things",
  },
  {
    no: 2,
    question: "Merasa sedih, depresi, atau putus asa",
    english: "Feeling down, depressed, or hopeless",
  },
  {
    no: 3,
    question: "Merasa gugup, cemas, takut, khawatir, atau gelisah",
    english: "Feeling nervous, anxious, frightened, worried, or on edge",
  },
  {
    no: 4,
    question: "Merasa panik atau ketakutan",
    english: "Feeling panic or being frightened",
  },
  {
    no: 5,
    question: "Menghindari situasi yang membuat Anda cemas",
    english: "Avoiding situations that make you anxious",
  },
  {
    no: 6,
    question:
      "Pikiran, desakan, atau gambaran yang tidak menyenangkan yang berulang kali memasuki pikiran Anda",
    english:
      "Unpleasant thoughts, urges, or images that repeatedly enter your mind",
  },
  {
    no: 7,
    question:
      "Merasa terdorong untuk melakukan perilaku atau tindakan mental tertentu berulang kali",
    english:
      "Feeling driven to perform certain behaviors or mental acts over and over again",
  },
  {
    no: 8,
    question:
      "Masalah dengan tidur yang memengaruhi kualitas tidur Anda secara keseluruhan?",
    english: "Problems with sleep that affected your sleep quality over all",
  },
];

// DEPRESSION
const depressionQuestions = [
  { question: "Saya merasa tidak berharga.", english: "I felt worthless." },
  {
    question:
      "Saya merasa bahwa saya tidak punya apa-apa untuk dinanti-nantikan.",
    english: "I felt that I had nothing to look forward to.",
  },
  { question: "Saya merasa khawatir.", english: "I felt helpless." },
  {
    question: "Saya merasa sedih.",
    english: "I felt sad.",
  },
  { question: "Saya merasa gagal.", english: "I felt like a failure." },
  { question: "Saya merasa tertekan.", english: "I felt depressed." },
  { question: "Saya merasa tidak bahagia.", english: "I felt unhappy." },
  { question: "Saya merasa putus asa.", english: "I felt hopeless." },
];
const depressionChoices = [
  { name: "Tidak pernah", score: 1 },
  { name: "Jarang", score: 2 },
  { name: "Kadang-kadang", score: 3 },
  { name: "Sering", score: 4 },
  { name: "Selalu", score: 5 },
];
const depressionSolutions = [
  {
    solution:
      "Tetaplah berhubungan dengan orang lain. Carilah dan ajak teman untuk berbicara",
    image: "/image/Mental Illness Illustration/berhubungan.jpg",
  },

  {
    solution:
      "Rencanakan dan lakukan hal-hal yang menyenangkan seperti melakukan hal baru atau sekedar berkegiatan",
    image: "/image/Mental Illness Illustration/activity.jpg",
  },
  {
    solution: "Biasakan untuk tetap makan dan tidur teratur",
    image: "/image/Mental Illness Illustration/eat.jpg",
  },
  {
    solution: "Berolahraga secara teratur, biarpun olahraga ringan",
    image: "/image/Mental Illness Illustration/workout.jpg",
  },
  {
    solution: "Hindari penggunaan alkohol dan narkoba",
    image: "/image/Mental Illness Illustration/noalcohol.jpg",
  },
  {
    solution: "Membentuk pikiran positif",
    image: "/image/Mental Illness Illustration/positive.jpg",
  },
  {
    solution: "Membuat buku harian atau diary",
    image: "/image/Mental Illness Illustration/diary.jpg",
  },
  {
    solution: "Hubungi tenaga profesional, seperti psikolog atau psikiater",
    image: "/image/Mental Illness Illustration/psychologist.jpg",
  },
];

// ANXIETY
const anxietyQuestions = [
  { question: "Saya merasa takut.", english: "I felt fearful." },
  { question: "Saya merasa cemas.", english: "I felt anxious." },
  { question: "Saya merasa khawatir.", english: "I felt worried." },
  {
    question:
      "Saya merasa sulit untuk fokus pada apa pun selain kecemasan saya.",
    english: "I found it hard to focus on anything other than my anxiety.",
  },
  { question: "Saya merasa gugup.", english: "I felt nervous." },
  { question: "Saya merasa tidak nyaman.", english: "I felt uneasy." },
  { question: "Saya merasa tegang.", english: "I felt tense." },
];
const anxietyChoices = [
  { name: "Tidak pernah", score: 1 },
  { name: "Jarang", score: 2 },
  { name: "Kadang-kadang", score: 3 },
  { name: "Sering", score: 4 },
  { name: "Selalu", score: 5 },
];
const anxietySolutions = [
  {
    solution: "Membaca buku yang menarik bagi anda",
    image: "/image/Mental Illness Illustration/book.jpg",
  },

  {
    solution: "Bermeditasi, melatih teknik pernapasan dan mindfullness",
    image: "/image/Mental Illness Illustration/meditate.jpg",
  },
  {
    solution: "Memusatkan pikiran pada aktivitas yang dijalani",
    image: "/image/Mental Illness Illustration/activity.jpg",
  },
  {
    solution: "Menghindari minuman berkafein dan beralkohol",
    image: "/image/Mental Illness Illustration/noalcohol.jpg",
  },
  {
    solution: "Bercerita kepada orang terdekat",
    image: "/image/Mental Illness Illustration/conversation.jpg",
  },
  {
    solution: "Meluangkan waktu untuk diri sendiri (Me time)",
    image: "/image/Mental Illness Illustration/metime.jpg",
  },
  {
    solution: "Berolahraga secara teratur, biarpun olahraga ringan",
    image: "/image/Mental Illness Illustration/workout.jpg",
  },
  {
    solution: "Makan secara teratur dan minum cukup air",
    image: "/image/Mental Illness Illustration/eat.jpg",
  },
  {
    solution: "Melakukan positive self-talk atau afirmasi positif",
    image: "/image/Mental Illness Illustration/positive.jpg",
  },
  {
    solution:
      "Berkonsultasi dengan tenaga profesional, seperti psikolog atau psikiater",
    image: "/image/Mental Illness Illustration/psychologist.jpg",
  },
];

// OCD
const OCDQuestions = [
  {
    question:
      "Rata-rata, berapa banyak waktu yang dihabiskan oleh pikiran, gambaran, dorongan berulang, atau perilaku yang tidak diinginkan setiap hari?",
    english:
      "On average, how much time is occupied by these unwanted repeated thoughts, images, urges or behaviors each day?",
  },
  {
    question:
      "Seberapa banyak pikiran, gambaran, dorongan berulang, atau perilaku yang tidak diinginkan menyebabkan Anda tertekan?",
    english:
      "How much distress do these unwanted repeated thoughts, images, urges or behaviors cause you?",
  },
  {
    question:
      "Seberapa sulit bagi Anda untuk mengendalikan pikiran, gambaran, dorongan berulang, atau perilaku yang tidak diinginkan ini?",
    english:
      "How hard is it for you to control these unwanted repeated thoughts, images, urges or behaviors?",
  },
  {
    question:
      "Seberapa banyak pikiran, gambaran, dorongan berulang, atau perilaku yang tidak diinginkan ini menyebabkan Anda menghindari melakukan apa pun, pergi ke mana pun, atau bersama siapa pun?",
    english:
      "How much do these unwanted repeated thoughts, images, urges or behaviors cause you to avoid doing anything, going anyplace, or being with anyone?",
  },
  {
    question:
      "Seberapa besar pikiran, gambaran, dorongan berulang, atau perilaku yang tidak diinginkan ini mengganggu sekolah, pekerjaan, atau kehidupan sosial atau keluarga Anda?",
    english:
      "How much do these unwanted repeated thoughts, images, urges or behaviors interfere with school, work, or your social or family life?",
  },
];
const OCDChoices = [
  {
    name: [
      { indo: "Tidak ada", english: "None" },
      { indo: "Tidak ada", english: "None" },
      { indo: "Kontrol penuh", english: "Complete control" },
      { indo: "Tidak ada penghindaran", english: "No avoidance" },
      { indo: "Tidak ada", english: "None" },
    ],
    desc: [
      {
        indo: "",
        english: "",
      },
      { indo: "", english: "" },
      {
        indo: "",
        english: "",
      },
      { indo: "", english: "" },
      { indo: "", english: "" },
    ],
    score: 0,
  },
  {
    name: [
      { indo: "Ringan", english: "Mild" },
      { indo: "Ringan", english: "Mild" },
      { indo: "Banyak Kontrol", english: "Mild" },
      { indo: "Ringan", english: "Mild" },
      { indo: "Ringan", english: "Mild" },
    ],
    desc: [
      {
        indo: "Kurang dari satu jam sehari",
        english: "Less than an hour a day",
      },
      { indo: "Sedikit mengganggu", english: "Slightly disturbing" },
      {
        indo: "Biasanya mampu mengendalikan pikiran atau perilaku",
        english: "usually able to control thoughts or behaviors",
      },
      { indo: "Penghindaran sesekali", english: "Occasional avoidance" },
      { indo: "Sedikit gangguan", english: "Slight interference" },
    ],
    score: 1,
  },
  {
    name: [
      { indo: "Sedang", english: "Moderate" },
      { indo: "Sedang", english: "Moderate" },
      { indo: "Kontrol sedang", english: "Moderate control" },
      { indo: "Sedang", english: "Moderate" },
      { indo: "Sedang", english: "Moderate" },
    ],
    desc: [
      {
        indo: "1 sampai 3 jam sehari",
        english: "1 to 3 hours a day",
      },
      {
        indo: "Mengganggu tapi masih bisa dikendalikan",
        english: "Disturbing but still manageable",
      },
      {
        indo: "Terkadang mampu mengendalikan pikiran atau perilaku",
        english: "Sometimes able to control thoughts or behaviors",
      },
      {
        indo: "Secara teratur hindari melakukan hal-hal ini",
        english: "Regularly avoid doing these things",
      },
      {
        indo: "Gangguan fungsi yang pasti, tetapi masih dapat dikelola",
        english: "Definite interference with functioning, but still manageable",
      },
    ],
    score: 2,
  },
  {
    name: [
      { indo: "Parah", english: "Severe" },
      { indo: "Parah", english: "Severe" },
      { indo: "Sedikit kontrol", english: "Little control" },
      { indo: "Parah", english: "Severe" },
      { indo: "Parah", english: "Severe" },
    ],
    desc: [
      {
        indo: "3 sampai 8 jam sehari",
        english: "3 to 8 hours a day",
      },
      {
        indo: "Sangat mengganggu",
        english: "Very disturbing",
      },
      {
        indo: "Terkadang mampu mengendalikan pikiran atau perilaku",
        english: "Infrequently able to control thoughts or behaviors",
      },
      {
        indo: "Penghindaran yang sering dan ekstensif",
        english: "Frequent and extensive avoidance",
      },
      {
        indo: "Gangguan substansial",
        english: "Substantial interference",
      },
    ],
    score: 3,
  },
  {
    name: [
      { indo: "Ekstrim", english: "Extreme" },
      { indo: "Ekstrim", english: "Extreme" },
      { indo: "Tidak terkontrol", english: "No control" },
      { indo: "Ekstrim", english: "Extreme" },
      { indo: "Ekstrim", english: "Extreme" },
    ],
    desc: [
      {
        indo: "Lebih dari 8 jam sehari",
        english: "More than 8 hours a day",
      },
      {
        indo: "Kesusahan yang luar biasa",
        english: "Overwhelming distress",
      },
      {
        indo: "Tidak dapat mengendalikan pikiran atau perilaku",
        english: "Unable to control thoughts or behaviors",
      },
      {
        indo: "Penghindaran yang hampir menyeluruh; terikat rumah",
        english: "Nearly complete avoidance; house- bound",
      },
      {
        indo: "Gangguan hampir total; lumpuh",
        english: "Near-total interference; incapacitated",
      },
    ],
    score: 4,
  },
];
const OCDSolutions = [
  {
    solution:
      "Identifikasi pemicunya (dengan berkonsultasi ke psikiater atau psikolog)",
    image: "/image/Mental Illness Illustration/book.jpg",
  },

  {
    solution: "Lawan gejala yang muncul dengan menantang pikiran obsesif",
    image: "/image/Mental Illness Illustration/meditate.jpg",
  },
  {
    solution:
      "Latihlah kesadaran (mindfulness) dalam berbagai hal yang dilakukan untuk mengelola stres",
    image: "/image/Mental Illness Illustration/activity.jpg",
  },
  {
    solution: "Banyak berolahraga",
    image: "/image/Mental Illness Illustration/noalcohol.jpg",
  },
  {
    solution: "Tidur yang nyenyak dan cukup",
    image: "/image/Mental Illness Illustration/conversation.jpg",
  },
  {
    solution: "Hindari nikotin dan alkohol",
    image: "/image/Mental Illness Illustration/metime.jpg",
  },
  {
    solution: "Hubungi keluarga dan teman",
    image: "/image/Mental Illness Illustration/berhubungan.jpg",
  },
  {
    solution: "Hubungi terapis ERP",
    image: "/image/Mental Illness Illustration/eat.jpg",
  },
  {
    solution:
      "Beristirahatlah sejenak dalam menggunakan gadget. Lakukan kegiatan seperti membaca buku, menulis buku harian",
    image: "/image/Mental Illness Illustration/diary.jpg",
  },
  {
    solution: "Melakukan teknik relaksasi agar dapat menenangkan pikiran",
    image: "/image/Mental Illness Illustration/meditate.jpg",
  },
];

// SLEEP DISORDER
const SDQuestions = [
  {
    question: "Tidur saya gelisah.",
    english: "My sleep was restless.",
  },
  {
    question: "Saya puas dengan tidur saya.",
    english: "I was satisfied with my sleep.",
  },
  {
    question: "Tidur saya menyegarkan.",
    english: "My sleep was refreshing.",
  },
  {
    question: "Saya mengalami kesulitan untuk tidur.",
    english: "I had difficulty falling asleep.",
  },
  {
    question: "Saya mengalami kesulitan untuk tetap tidur.",
    english: "I had trouble staying asleep.",
  },
  {
    question: "Saya mengalami kesulitan tidur.",
    english: "I had trouble sleeping.",
  },
  {
    question: "Saya cukup tidur.",
    english: "I got enough sleep.",
  },
  {
    question: "Kualitas tidur saya adalah...",
    english: "My sleep quality was...",
  },
];
const SDChoices = [
  {
    name: [
      { indo: "Tidak sama sekali", english: "Not at all" },
      { indo: "Tidak sama sekali", english: "Not at all" },
      { indo: "Tidak sama sekali", english: "Not at all" },
      { indo: "Tidak sama sekali", english: "Not at all" },
      { indo: "Tidak pernah", english: "Never" },
      { indo: "Tidak pernah", english: "Never" },
      { indo: "Tidak pernah", english: "Never" },
      { indo: "Sangat buruk", english: "Very Poor" },
    ],
    score: [1, 5, 5, 1, 1, 1, 5, 5],
  },
  {
    name: [
      { indo: "Sedikit", english: "A little bit" },
      { indo: "Sedikit", english: "A little bit" },
      { indo: "Sedikit", english: "A little bit" },
      { indo: "Sedikit", english: "A little bit" },
      { indo: "Jarang", english: "Rarely" },
      { indo: "Jarang", english: "Rarely" },
      { indo: "Jarang", english: "Rarely" },
      { indo: "Buruk", english: "Poor" },
    ],
    score: [2, 4, 4, 2, 2, 2, 4, 4],
  },
  {
    name: [
      { indo: "Agak", english: "Somewhat" },
      { indo: "Agak", english: "Somewhat" },
      { indo: "Agak", english: "Somewhat" },
      { indo: "Agak", english: "Somewhat" },
      { indo: "Terkadang", english: "Sometimes" },
      { indo: "Terkadang", english: "Sometimes" },
      { indo: "Terkadang", english: "Sometimes" },
      { indo: "Cukup", english: "Fair" },
    ],
    score: [3, 3, 3, 3, 3, 3, 3, 3],
  },
  {
    name: [
      { indo: "Cukup", english: "Quite a bit" },
      { indo: "Cukup", english: "Quite a bit" },
      { indo: "Cukup", english: "Quite a bit" },
      { indo: "Cukup", english: "Quite a bit" },
      { indo: "Sering", english: "Often" },
      { indo: "Sering", english: "Often" },
      { indo: "Sering", english: "Often" },
      { indo: "Baik", english: "Good" },
    ],
    score: [4, 2, 2, 4, 4, 4, 2, 2],
  },
  {
    name: [
      { indo: "Sangat", english: "Very much" },
      { indo: "Sangat", english: "Very much" },
      { indo: "Sangat", english: "Very much" },
      { indo: "Sangat", english: "Very much" },
      { indo: "Selalu", english: "Always" },
      { indo: "Selalu", english: "Always" },
      { indo: "Selalu", english: "Always" },
      { indo: "Sangat Baik", english: "Very Good" },
    ],
    score: [5, 1, 1, 5, 5, 5, 1, 1],
  },
];

const MHCanswer = [];
const MHCdata = [];
const DepressionAns = [];
const AnxietyAns = [];
const OCDAns = [];
const SleepAns = [];

const appSlice = createSlice({
  name: "app",
  initialState: {
    mentalIllnessData,
    MHCQuestions,
    MHCChoices,

    anxietyQuestions,
    anxietyChoices,
    anxietySolutions,

    depressionQuestions,
    depressionChoices,
    depressionSolutions,

    OCDQuestions,
    OCDChoices,

    SDQuestions,
    SDChoices,

    MHCanswer: [
      { no: 1, jawaban: 0 },
      { no: 2, jawaban: 0 },
      { no: 3, jawaban: 0 },
      { no: 4, jawaban: 0 },
      { no: 5, jawaban: 0 },
      { no: 6, jawaban: 0 },
      { no: 7, jawaban: 0 },
      { no: 8, jawaban: 0 },
      { no: 9, jawaban: 0 },
    ],
    MHCdata: [
      {
        img: "/image/Mental Illness Illustration/4.png",
        title: "Depression",
        author: "Gangguan Depresi",
        link: "/MentalIllness/Depression/Panduan",
        severity: 0,
      },
      {
        img: "/image/Mental Illness Illustration/1.png",
        title: "Anxiety",
        author: "Gangguan Kecemasan",
        link: "/MentalIllness/Anxiety/Panduan",
        severity: 0,
      },
      {
        img: "/image/Mental Illness Illustration/3.png",
        title: "OCD",
        author: "Obsessive-Compulsive Disorder",
        link: "/MentalIllness/OCD/Panduan",
        severity: 0,
      },
      {
        img: "/image/Mental Illness Illustration/5.png",
        title: "Sleep Disorder",
        author: "Gangguan Tidur",
        link: "/MentalIllness/SleepDisorder/Panduan",
        severity: 0,
      },
    ],
    DepressionAns: [
      { no: 1, jawaban: 0 },
      { no: 2, jawaban: 0 },
      { no: 3, jawaban: 0 },
      { no: 4, jawaban: 0 },
      { no: 5, jawaban: 0 },
      { no: 6, jawaban: 0 },
      { no: 7, jawaban: 0 },
      { no: 8, jawaban: 0 },
    ],
    OCDAns: [
      { no: 1, jawaban: 0 },
      { no: 2, jawaban: 0 },
      { no: 3, jawaban: 0 },
      { no: 4, jawaban: 0 },
      { no: 5, jawaban: 0 },
    ],
    SDAns: [
      { no: 1, jawaban: 0 },
      { no: 2, jawaban: 0 },
      { no: 3, jawaban: 0 },
      { no: 4, jawaban: 0 },
      { no: 5, jawaban: 0 },
      { no: 6, jawaban: 0 },
      { no: 7, jawaban: 0 },
      { no: 8, jawaban: 0 },
    ],
    AnxietyAns: [
      { no: 1, jawaban: 0 },
      { no: 2, jawaban: 0 },
      { no: 3, jawaban: 0 },
      { no: 4, jawaban: 0 },
      { no: 5, jawaban: 0 },
      { no: 6, jawaban: 0 },
      { no: 7, jawaban: 0 },
    ],
  },
  reducers: {
    submitMHC: (state, action) => {
      state.MHCanswer = action.payload;
    },
    submitDepression: (state, action) => {
      state.DepressionAns = action.payload;
    },
    submitOCD: (state, action) => {
      state.OCDAns = action.payload;
    },
    submitSD: (state, action) => {
      state.SDAns = action.payload;
    },
    submitAnxiety: (state, action) => {
      state.AnxietyAns = action.payload;
    },
    MHCData: (state, action) => {
      state.MHCdata = action.payload;
    },
  },
});

export const appActions = appSlice.actions;
export default appSlice.reducer;
