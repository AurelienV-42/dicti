const getErrors = (
  userWord: string,
  correctWord: string,
  fullSentence: string,
) => {
  return [
    "Il y a une erreur, on est bien d'accord, mais là, vraiment aucune idée de ce que c'est.",
    "Même une deuxième, mais c'est peut-être juste pour test.",
  ];
};

export type CorrectionItem = {
  text: string;
  errors?: string[];
};

const checkIfSameWord = (str1: string, str2: string) => {
  const normalizedStr1 = str1.replace(/’/g, "'");
  const normalizedStr2 = str2.replace(/’/g, "'");

  return normalizedStr1 === normalizedStr2;
};

const splitButKeepPunctuation = (text: string) => {
  return text
    .split(/(\s+|,|\.|\?|%|!])/)
    .filter((word) => word !== "" && word !== " ");
};

const checkErrors = (userTxt: string, correctTxt: string): CorrectionItem[] => {
  const userWords = splitButKeepPunctuation(userTxt);
  const correctWords = splitButKeepPunctuation(correctTxt);

  const corrections: CorrectionItem[] = [];
  correctWords.forEach((correctWord, index) => {
    const result: CorrectionItem = {
      text: correctWord,
    };

    if (index > userWords.length - 1) result.errors = ["Ce mot est manquant"];
    else if (!checkIfSameWord(correctWord, userWords[index]))
      result.errors = getErrors(userWords[index], correctWord, correctTxt);
    corrections.push(result);
  });

  return corrections;
};

export default checkErrors;
