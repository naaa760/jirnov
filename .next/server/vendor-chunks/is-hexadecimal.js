"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/is-hexadecimal";
exports.ids = ["vendor-chunks/is-hexadecimal"];
exports.modules = {

/***/ "(ssr)/./node_modules/is-hexadecimal/index.js":
/*!**********************************************!*\
  !*** ./node_modules/is-hexadecimal/index.js ***!
  \**********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   isHexadecimal: () => (/* binding */ isHexadecimal)\n/* harmony export */ });\n/**\n * Check if the given character code, or the character code at the first\n * character, is hexadecimal.\n *\n * @param {string|number} character\n * @returns {boolean} Whether `character` is hexadecimal\n */\nfunction isHexadecimal(character) {\n  const code =\n    typeof character === 'string' ? character.charCodeAt(0) : character\n\n  return (\n    (code >= 97 /* a */ && code <= 102) /* z */ ||\n    (code >= 65 /* A */ && code <= 70) /* Z */ ||\n    (code >= 48 /* A */ && code <= 57) /* Z */\n  )\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvaXMtaGV4YWRlY2ltYWwvaW5kZXguanMiLCJtYXBwaW5ncyI6Ijs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxlQUFlO0FBQzFCLGFBQWEsU0FBUztBQUN0QjtBQUNPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9qaXJhLWNsb25lLy4vbm9kZV9tb2R1bGVzL2lzLWhleGFkZWNpbWFsL2luZGV4LmpzPzk0MmYiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDaGVjayBpZiB0aGUgZ2l2ZW4gY2hhcmFjdGVyIGNvZGUsIG9yIHRoZSBjaGFyYWN0ZXIgY29kZSBhdCB0aGUgZmlyc3RcbiAqIGNoYXJhY3RlciwgaXMgaGV4YWRlY2ltYWwuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd8bnVtYmVyfSBjaGFyYWN0ZXJcbiAqIEByZXR1cm5zIHtib29sZWFufSBXaGV0aGVyIGBjaGFyYWN0ZXJgIGlzIGhleGFkZWNpbWFsXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0hleGFkZWNpbWFsKGNoYXJhY3Rlcikge1xuICBjb25zdCBjb2RlID1cbiAgICB0eXBlb2YgY2hhcmFjdGVyID09PSAnc3RyaW5nJyA/IGNoYXJhY3Rlci5jaGFyQ29kZUF0KDApIDogY2hhcmFjdGVyXG5cbiAgcmV0dXJuIChcbiAgICAoY29kZSA+PSA5NyAvKiBhICovICYmIGNvZGUgPD0gMTAyKSAvKiB6ICovIHx8XG4gICAgKGNvZGUgPj0gNjUgLyogQSAqLyAmJiBjb2RlIDw9IDcwKSAvKiBaICovIHx8XG4gICAgKGNvZGUgPj0gNDggLyogQSAqLyAmJiBjb2RlIDw9IDU3KSAvKiBaICovXG4gIClcbn1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/is-hexadecimal/index.js\n");

/***/ })

};
;