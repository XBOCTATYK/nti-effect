/**
 * Близки ли значения
 * @param {number} num1
 * @param {number} num2
 * @param {number} range
 * @return {boolean}
 */
export const inRange = (num1, num2, range) => {
  return (num1 <= num2 + range && num1 >= num2 - range);
};
