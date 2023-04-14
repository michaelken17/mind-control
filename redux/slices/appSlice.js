import { createSlice } from "@reduxjs/toolkit";

const mentalIllnessData = [
  {
    img: "/image/Mental Illness Illustration/1.png",
    title: "Anxiety",
    author: "Gangguan Kecemasan",
    link: "/MentalIllness/Anxiety/Panduan",
  },
  {
    img: "/image/Mental Illness Illustration/4.png",
    title: "Depression",
    author: "Gangguan Depresi",
    link: "/MentalIllness/Depression/Panduan",
  },
  {
    img: "/image/Mental Illness Illustration/3.png",
    title: "OCD",
    author: "Obsessive-Compulsive Disorder",
    link: "/MentalIllness/OCD/Panduan",
  },
  {
    img: "/image/Mental Illness Illustration/2.png",
    title: "Mood Swing",
    author: "Gangguan Suasana Hati",
    link: "/MentalIllness/MoodSwing/Panduan",
  },
];

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
    question: "Sedikit minat atau kesenangan dalam melakukan sesuatu",
  },
  {
    no: 2,
    question: "Merasa sedih, depresi, atau putus asa",
  },
  {
    no: 3,
    question: "Merasa gugup, cemas, takut, khawatir, atau gelisah",
  },
  {
    no: 4,
    question: "Merasa panik atau ketakutan",
  },
  {
    no: 5,
    question: "Menghindari situasi yang membuat Anda cemas",
  },
  {
    no: 6,
    question:
      "Pikiran, desakan, atau gambaran yang tidak menyenangkan yang berulang kali memasuki pikiran Anda",
  },
  {
    no: 7,
    question:
      "Merasa terdorong untuk melakukan perilaku atau tindakan mental tertentu berulang kali",
  },
  {
    no: 8,
    question: "Tidak tahu siapa Anda sebenarnya atau apa yang Anda inginkan dari hidup",
  },
  {
    no: 9,
    question:
      "Tidak merasa dekat dengan orang lain atau menikmati hubungan Anda dengan mereka",
  },
];

const anxietyQuestions = [
  "Saya merasa takut.",
  "Saya merasa cemas.",
  "Saya merasa khawatir.",
  "Saya merasa sulit untuk fokus pada apa pun selain kecemasan saya.",
  "Saya merasa gugup.",
  "Saya merasa tidak nyaman.",
  "Saya merasa tegang.",
];

const anxietyChoices = [
  { name: "Tidak pernah", score: 0 },
  { name: "Jarang", score: 1 },
  { name: "Kadang-kadang", score: 2 },
  { name: "Sering", score: 3 },
  { name: "Selalu", score: 4 },
];

const appSlice = createSlice({
  name: "app",
  initialState: {
    mentalIllnessData,
    MHCQuestions,
    MHCChoices,
    anxietyQuestions,
    anxietyChoices,
  },
  reducers: {},
});

export const appActions = appSlice.actions;
export default appSlice.reducer;
