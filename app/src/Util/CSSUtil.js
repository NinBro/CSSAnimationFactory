// cruncher.js
import _ from 'lodash';

export default class {
  static addUp(a, b) {
    return a + b
  }

  static addDown(a, b) {
    return a + b
  }

  /*
   * @param {string} className
   * @param {string} value
   * @returns {string}
   */
  static convertToCSS(className, value) {
    const linebreak = '\n';
    const indent = '  ';
    return `[name="${className}"] {${linebreak}${indent}${value}${linebreak}}`;
  }

  /*
   * Get CSS for elements
   * @param {array} elements
   * @returns {string}
   */
  static elementCSS(elements) {
    let style = '';

    if (elements) {
      _.each(elements, (element) => {
        const { css, elements, name } = element;
        if (css) {
          style += this.convertToCSS(name, css);
        }

        if (elements) {
          style += this.elementCSS(elements);
        }
      });
    }

    return style;
  }
}