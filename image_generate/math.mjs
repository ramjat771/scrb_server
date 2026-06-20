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
  "♚"

];

const randomNum = () =>
  Math.floor(Math.random() * 10) + 1;

const randomOperator = () =>
  operators[
    Math.floor(Math.random() * operators.length)
  ];

export const getQuestion = () => {
  let expression = `${randomNum()}`;

  for (let i = 0; i < 4; i++) {
    expression += ` ${randomOperator()} ${randomNum()}`;
  }

  const answer = Math.round(
    Function(`return (${expression})`)()
  );

  const options = [answer];

  while (options.length < 4) {
    const wrong =
      answer +
      Math.floor(Math.random() * 11) -
      5;

    if (
      !options.includes(wrong) &&
      wrong >= 0
    ) {
      options.push(wrong);
    }
  }

  options.sort(() => Math.random() - 0.5);

  const emoji =
    emojis[
      Math.floor(Math.random() * emojis.length)
    ];

  return {
    question: `${expression} = ?`,
    optionA: options[0],
    optionB: options[1],
    optionC: options[2],
    optionD: options[3],
  };
};