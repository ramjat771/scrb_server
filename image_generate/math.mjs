const operators = ["+", "-", "*"];

const emojis = [
  "★",
  "◆",
  "●",
  "■",
  "▲",
  "►",
  "◉",
  "✦",
  "✪",
  "✧",
  "✓",
  "☀",
  "☑",
  "♛",
  "♚",
];

const randomNum = () =>
  Math.floor(Math.random() * 10) + 1;

const randomOperator = () =>
  operators[
  Math.floor(Math.random() * operators.length)
  ];

export const getQuestion = () => {
  try {
    let expression = `${randomNum()}`;

for (let i = 0; i < 4; i++) {
  expression += ` ${ randomOperator() } ${ randomNum() } `;
}

const answer = Number(
  Math.round(
    Function(`return (${ expression })`)()
  )
);

const uniqueOptions = new Set([
  answer,
  answer + 2,
  answer - 2,
  answer + 5,
  answer - 5,
  answer + 8,
]);

const options = [...uniqueOptions]
  .filter((e) => e >= 0)
  .slice(0, 4);

while (options.length < 4) {
  options.push(
    answer + options.length + 10
  );
}

for (let i = options.length - 1; i > 0; i--) {
  const j = Math.floor(
    Math.random() * (i + 1)
  );
  [options[i], options[j]] = [
    options[j],
    options[i],
  ];
}

return {
  question: `${ expression } = ?`,
  optionA: options[0],
  optionB: options[1],
  optionC: options[2],
  optionD: options[3],
};


  } catch (error) {
    console.error(
      "Question Generation Error:",
      error
    );

return {
  question: "5 + 3 * 2 = ?",
  optionA: 11,
  optionB: 16,
  optionC: 9,
  optionD: 13,
};


  }
};
