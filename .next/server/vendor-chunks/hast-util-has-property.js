"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/hast-util-has-property";
exports.ids = ["vendor-chunks/hast-util-has-property"];
exports.modules = {

/***/ "(ssr)/./node_modules/hast-util-has-property/lib/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/hast-util-has-property/lib/index.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   hasProperty: () => (/* binding */ hasProperty)\n/* harmony export */ });\n/**\n * @typedef {import('hast').Element} Element\n * @typedef {import('hast').Nodes} Nodes\n */\n\nconst own = {}.hasOwnProperty\n\n/**\n * Check if `node` is an element and has a `name` property.\n *\n * @template {string} Key\n *   Type of key.\n * @param {Nodes} node\n *   Node to check (typically `Element`).\n * @param {Key} name\n *   Property name to check.\n * @returns {node is Element & {properties: Record<Key, Array<number | string> | number | string | true>}}}\n *   Whether `node` is an element that has a `name` property.\n *\n *   Note: see <https://github.com/DefinitelyTyped/DefinitelyTyped/blob/27c9274/types/hast/index.d.ts#L37C29-L37C98>.\n */\nfunction hasProperty(node, name) {\n  const value =\n    node.type === 'element' &&\n    own.call(node.properties, name) &&\n    node.properties[name]\n\n  return value !== null && value !== undefined && value !== false\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvaGFzdC11dGlsLWhhcy1wcm9wZXJ0eS9saWIvaW5kZXguanMiLCJtYXBwaW5ncyI6Ijs7OztBQUFBO0FBQ0EsYUFBYSx3QkFBd0I7QUFDckMsYUFBYSxzQkFBc0I7QUFDbkM7O0FBRUEsY0FBYzs7QUFFZDtBQUNBO0FBQ0E7QUFDQSxjQUFjLFFBQVE7QUFDdEI7QUFDQSxXQUFXLE9BQU87QUFDbEI7QUFDQSxXQUFXLEtBQUs7QUFDaEI7QUFDQSxhQUFhLG1CQUFtQjtBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2ppcmEtY2xvbmUvLi9ub2RlX21vZHVsZXMvaGFzdC11dGlsLWhhcy1wcm9wZXJ0eS9saWIvaW5kZXguanM/N2FkMSJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEB0eXBlZGVmIHtpbXBvcnQoJ2hhc3QnKS5FbGVtZW50fSBFbGVtZW50XG4gKiBAdHlwZWRlZiB7aW1wb3J0KCdoYXN0JykuTm9kZXN9IE5vZGVzXG4gKi9cblxuY29uc3Qgb3duID0ge30uaGFzT3duUHJvcGVydHlcblxuLyoqXG4gKiBDaGVjayBpZiBgbm9kZWAgaXMgYW4gZWxlbWVudCBhbmQgaGFzIGEgYG5hbWVgIHByb3BlcnR5LlxuICpcbiAqIEB0ZW1wbGF0ZSB7c3RyaW5nfSBLZXlcbiAqICAgVHlwZSBvZiBrZXkuXG4gKiBAcGFyYW0ge05vZGVzfSBub2RlXG4gKiAgIE5vZGUgdG8gY2hlY2sgKHR5cGljYWxseSBgRWxlbWVudGApLlxuICogQHBhcmFtIHtLZXl9IG5hbWVcbiAqICAgUHJvcGVydHkgbmFtZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtub2RlIGlzIEVsZW1lbnQgJiB7cHJvcGVydGllczogUmVjb3JkPEtleSwgQXJyYXk8bnVtYmVyIHwgc3RyaW5nPiB8IG51bWJlciB8IHN0cmluZyB8IHRydWU+fX19XG4gKiAgIFdoZXRoZXIgYG5vZGVgIGlzIGFuIGVsZW1lbnQgdGhhdCBoYXMgYSBgbmFtZWAgcHJvcGVydHkuXG4gKlxuICogICBOb3RlOiBzZWUgPGh0dHBzOi8vZ2l0aHViLmNvbS9EZWZpbml0ZWx5VHlwZWQvRGVmaW5pdGVseVR5cGVkL2Jsb2IvMjdjOTI3NC90eXBlcy9oYXN0L2luZGV4LmQudHMjTDM3QzI5LUwzN0M5OD4uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBoYXNQcm9wZXJ0eShub2RlLCBuYW1lKSB7XG4gIGNvbnN0IHZhbHVlID1cbiAgICBub2RlLnR5cGUgPT09ICdlbGVtZW50JyAmJlxuICAgIG93bi5jYWxsKG5vZGUucHJvcGVydGllcywgbmFtZSkgJiZcbiAgICBub2RlLnByb3BlcnRpZXNbbmFtZV1cblxuICByZXR1cm4gdmFsdWUgIT09IG51bGwgJiYgdmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gZmFsc2Vcbn1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/hast-util-has-property/lib/index.js\n");

/***/ })

};
;