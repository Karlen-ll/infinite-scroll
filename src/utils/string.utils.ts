/** Склонение слова
 * @example declination(5, ['яблоко', 'яблока', 'яблок']) */
export const declination = (number: number, words: string[]) => {
  const CASES = [2, 0, 1, 1, 1, 2] as const
  return words[
    number % 1 !== 0 ? 1 : number % 100 > 4 && number % 100 < 20 ? 2 : CASES[number % 10 < 5 ? number % 10 : 5]
  ]
}
