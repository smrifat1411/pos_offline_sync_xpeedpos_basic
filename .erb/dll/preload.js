(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(global, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "electron":
/*!***************************!*\
  !*** external "electron" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("electron");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*****************************!*\
  !*** ./src/main/preload.ts ***!
  \*****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! electron */ "electron");
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_0__);
// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */

const electronHandler = {
    ipcRenderer: {
        sendMessage(channel, ...args) {
            electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.send(channel, ...args);
        },
        on(channel, func) {
            const subscription = (_event, ...args) => func(...args);
            electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.on(channel, subscription);
            return () => {
                electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.removeListener(channel, subscription);
            };
        },
        once(channel, func) {
            electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.once(channel, (_event, ...args) => func(...args));
        },
    },
    printOrPreviewComponent: async (url, isPreview) => {
        return electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.invoke('printOrPreviewComponent', { url, isPreview });
    },
    insertProduct: (product) => electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.invoke('product:insert', product),
    getProductByName: (name) => electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.invoke('product:getByName', name),
    getProductById: (id) => electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.invoke('product:getByName', id),
    updateProductById: (productId, updatedproduct) => electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.invoke('product:updateById', productId, updatedproduct),
    getAllProducts: () => electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.invoke('product:getAll'),
    getAllCategories: () => electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.invoke('category:getAll'),
    createCategory: (category) => electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.invoke('category:create', category),
    createOrder: (order) => electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.invoke('order:create', order),
    updateOrder: (orderId, updatedOrder) => electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.invoke('order:update', orderId, updatedOrder),
    deleteOrder: (orderId) => electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.invoke('order:delete', orderId),
    getAllOrder: (page, pageSize, sortBy, sortOrder) => electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.invoke('order:getAll', page, pageSize, sortBy, sortOrder),
    getOrderById: (id) => electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.invoke('order:getById', id),
    login: (user) => electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.invoke('auth:login', user),
    register: (user) => electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.invoke('auth:register', user),
    getUser: (username) => electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.invoke('auth:getUser', username),
    getOrderByPeriod: (period) => electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.invoke('order:getByPeriod', period),
    createExpense: (data) => electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.invoke('expense:createExpense', data),
    getAllUsers: () => electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.invoke('auth:getAllUsers'),
    getAllExpensesByPeriod: async (period, page, pageSize, filterField, filterValue, sortOrder) => {
        return electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.invoke('expense:getExpensesByPeriod', period, page, pageSize, filterField, filterValue, sortOrder);
    },
    generateReciept: (data) => electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.invoke('generateHtmlContent', data),
    createCustomer: (customer) => electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.invoke('customer:create', customer),
    getCustomerById: (id) => electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.invoke('customer:getById', id),
    getTotalItemsCount: (tableName) => electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.invoke('getTotalItemsCount', tableName),
    updateCustomerById: (customerId, updatedData) => electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.invoke('customer:updateById', customerId, updatedData),
    searchProductByname: (searchString) => electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.invoke('searchProductByName', searchString),
    // Add new IPC handlers for cash services
    getDailyCashEntryByDate: async (date) => {
        return electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.invoke('cash:getDailyCashEntryByDate', date);
    },
    getClosingBalanceFromPreviousDay: async (currentDate) => {
        return electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.invoke('cash:getClosingBalanceFromPreviousDay', currentDate);
    },
    createDailyCashEntry: async (entry) => {
        return electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.invoke('cash:createDailyCashEntry', entry);
    },
    updateDailyCashEntry: async (date, updatedEntryData) => {
        return electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.invoke('cash:updateDailyCashEntry', date, updatedEntryData);
    },
    createOrUpdateDailyCashEntry: async (entry) => {
        return electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.invoke('cash:createOrUpdateDailyCashEntry', entry);
    },
    deleteProductById: async (productId) => {
        return electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.invoke('product:deleteById', productId);
    },
};
electron__WEBPACK_IMPORTED_MODULE_0__.contextBridge.exposeInMainWorld('electron', electronHandler);

})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDbEUsQ0FBQztJQUNELGdDQUFnQyxFQUFFLEtBQUssRUFBRSxXQUFtQixFQUFFLEVBQUU7UUFDOUQsT0FBTyxpREFBVyxDQUFDLE1BQU0sQ0FDdkIsdUNBQXVDLEVBQ3ZDLFdBQVcsQ0FDWixDQUFDO0lBQ0osQ0FBQztJQUNELG9CQUFvQixFQUFFLEtBQUssRUFBRSxLQUFVLEVBQUUsRUFBRTtRQUN6QyxPQUFPLGlEQUFXLENBQUMsTUFBTSxDQUFDLDJCQUEyQixFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ2hFLENBQUM7SUFDRCxvQkFBb0IsRUFBRSxLQUFLLEVBQUUsSUFBWSxFQUFFLGdCQUFxQixFQUFFLEVBQUU7UUFDbEUsT0FBTyxpREFBVyxDQUFDLE1BQU0sQ0FDdkIsMkJBQTJCLEVBQzNCLElBQUksRUFDSixnQkFBZ0IsQ0FDakIsQ0FBQztJQUNKLENBQUM7SUFDRCw0QkFBNEIsRUFBRSxLQUFLLEVBQUUsS0FBVSxFQUFFLEVBQUU7UUFDakQsT0FBTyxpREFBVyxDQUFDLE1BQU0sQ0FBQyxtQ0FBbUMsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUN4RSxDQUFDO0lBRUQsaUJBQWlCLEVBQUUsS0FBSyxFQUFFLFNBQWlCLEVBQUUsRUFBRTtRQUM3QyxPQUFPLGlEQUFXLENBQUMsTUFBTSxDQUFDLG9CQUFvQixFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQzdELENBQUM7Q0FDRixDQUFDO0FBQ0YsbURBQWEsQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLEVBQUUsZUFBZSxDQUFDLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwiZWxlY3Ryb25cIiIsIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vLy4vc3JjL21haW4vcHJlbG9hZC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2Uge1xuXHRcdHZhciBhID0gZmFjdG9yeSgpO1xuXHRcdGZvcih2YXIgaSBpbiBhKSAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnID8gZXhwb3J0cyA6IHJvb3QpW2ldID0gYVtpXTtcblx0fVxufSkoZ2xvYmFsLCAoKSA9PiB7XG5yZXR1cm4gIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZWxlY3Ryb25cIik7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vIERpc2FibGUgbm8tdW51c2VkLXZhcnMsIGJyb2tlbiBmb3Igc3ByZWFkIGFyZ3Ncbi8qIGVzbGludCBuby11bnVzZWQtdmFyczogb2ZmICovXG5pbXBvcnQgeyBjb250ZXh0QnJpZGdlLCBpcGNSZW5kZXJlciwgSXBjUmVuZGVyZXJFdmVudCB9IGZyb20gJ2VsZWN0cm9uJztcbmltcG9ydCB7IFRPRE8gfSBmcm9tICcuL3NlcnZpY2VzL0RhdGFiYXNlLnNlcnZpY2UnO1xuaW1wb3J0IHsgUHJvZHVjdCB9IGZyb20gJ3JlbmRlcmVyL3R5cGVzL3Byb2R1Y3QnO1xuaW1wb3J0IHsgQ2F0ZWdvcnlEb2N1bWVudFR5cGUgfSBmcm9tICdyZW5kZXJlci90eXBlcy9jYXRlZ29yeS50eXBlJztcbmltcG9ydCB7IE9yZGVyIH0gZnJvbSAncmVuZGVyZXIvdHlwZXMvb3JkZXIudHlwZSc7XG5pbXBvcnQgeyBFeHBlbnNlIH0gZnJvbSAncmVuZGVyZXIvdHlwZXMvZXhwZW5zZS50eXBlJztcbmltcG9ydCB7IEN1c3RvbWVyIH0gZnJvbSAncmVuZGVyZXIvdHlwZXMvY3VzdG9tZXIudHlwZSc7XG5cbmV4cG9ydCB0eXBlIENoYW5uZWxzID0gJ2lwYy1leGFtcGxlJztcblxuY29uc3QgZWxlY3Ryb25IYW5kbGVyID0ge1xuICBpcGNSZW5kZXJlcjoge1xuICAgIHNlbmRNZXNzYWdlKGNoYW5uZWw6IENoYW5uZWxzLCAuLi5hcmdzOiB1bmtub3duW10pIHtcbiAgICAgIGlwY1JlbmRlcmVyLnNlbmQoY2hhbm5lbCwgLi4uYXJncyk7XG4gICAgfSxcbiAgICBvbihjaGFubmVsOiBDaGFubmVscywgZnVuYzogKC4uLmFyZ3M6IHVua25vd25bXSkgPT4gdm9pZCkge1xuICAgICAgY29uc3Qgc3Vic2NyaXB0aW9uID0gKF9ldmVudDogSXBjUmVuZGVyZXJFdmVudCwgLi4uYXJnczogdW5rbm93bltdKSA9PlxuICAgICAgICBmdW5jKC4uLmFyZ3MpO1xuICAgICAgaXBjUmVuZGVyZXIub24oY2hhbm5lbCwgc3Vic2NyaXB0aW9uKTtcblxuICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgaXBjUmVuZGVyZXIucmVtb3ZlTGlzdGVuZXIoY2hhbm5lbCwgc3Vic2NyaXB0aW9uKTtcbiAgICAgIH07XG4gICAgfSxcbiAgICBvbmNlKGNoYW5uZWw6IENoYW5uZWxzLCBmdW5jOiAoLi4uYXJnczogdW5rbm93bltdKSA9PiB2b2lkKSB7XG4gICAgICBpcGNSZW5kZXJlci5vbmNlKGNoYW5uZWwsIChfZXZlbnQsIC4uLmFyZ3MpID0+IGZ1bmMoLi4uYXJncykpO1xuICAgIH0sXG4gIH0sXG5cbiAgcHJpbnRPclByZXZpZXdDb21wb25lbnQ6IGFzeW5jICh1cmw6IHN0cmluZywgaXNQcmV2aWV3OiBib29sZWFuKSA9PiB7XG4gICAgcmV0dXJuIGlwY1JlbmRlcmVyLmludm9rZSgncHJpbnRPclByZXZpZXdDb21wb25lbnQnLCB7IHVybCwgaXNQcmV2aWV3IH0pO1xuICB9LFxuXG4gIGluc2VydFByb2R1Y3Q6IChwcm9kdWN0OiBQcm9kdWN0KSA9PlxuICAgIGlwY1JlbmRlcmVyLmludm9rZSgncHJvZHVjdDppbnNlcnQnLCBwcm9kdWN0KSxcbiAgZ2V0UHJvZHVjdEJ5TmFtZTogKG5hbWU6IHN0cmluZykgPT5cbiAgICBpcGNSZW5kZXJlci5pbnZva2UoJ3Byb2R1Y3Q6Z2V0QnlOYW1lJywgbmFtZSksXG4gIGdldFByb2R1Y3RCeUlkOiAoaWQ6IG51bWJlcikgPT4gaXBjUmVuZGVyZXIuaW52b2tlKCdwcm9kdWN0OmdldEJ5TmFtZScsIGlkKSxcbiAgdXBkYXRlUHJvZHVjdEJ5SWQ6IChwcm9kdWN0SWQ6IG51bWJlciwgdXBkYXRlZHByb2R1Y3Q6IGFueSkgPT5cbiAgICBpcGNSZW5kZXJlci5pbnZva2UoJ3Byb2R1Y3Q6dXBkYXRlQnlJZCcsIHByb2R1Y3RJZCwgdXBkYXRlZHByb2R1Y3QpLFxuICBnZXRBbGxQcm9kdWN0czogKCkgPT4gaXBjUmVuZGVyZXIuaW52b2tlKCdwcm9kdWN0OmdldEFsbCcpLFxuICBnZXRBbGxDYXRlZ29yaWVzOiAoKSA9PiBpcGNSZW5kZXJlci5pbnZva2UoJ2NhdGVnb3J5OmdldEFsbCcpLFxuICBjcmVhdGVDYXRlZ29yeTogKGNhdGVnb3J5OiBDYXRlZ29yeURvY3VtZW50VHlwZSkgPT5cbiAgICBpcGNSZW5kZXJlci5pbnZva2UoJ2NhdGVnb3J5OmNyZWF0ZScsIGNhdGVnb3J5KSxcblxuICBjcmVhdGVPcmRlcjogKG9yZGVyOiBPcmRlcikgPT4gaXBjUmVuZGVyZXIuaW52b2tlKCdvcmRlcjpjcmVhdGUnLCBvcmRlciksXG4gIHVwZGF0ZU9yZGVyOiAob3JkZXJJZDogc3RyaW5nLCB1cGRhdGVkT3JkZXI6IGFueSkgPT5cbiAgICBpcGNSZW5kZXJlci5pbnZva2UoJ29yZGVyOnVwZGF0ZScsIG9yZGVySWQsIHVwZGF0ZWRPcmRlciksXG4gIGRlbGV0ZU9yZGVyOiAob3JkZXJJZDogc3RyaW5nKSA9PiBpcGNSZW5kZXJlci5pbnZva2UoJ29yZGVyOmRlbGV0ZScsIG9yZGVySWQpLFxuICBnZXRBbGxPcmRlcjogKFxuICAgIHBhZ2U/OiBudW1iZXIsXG4gICAgcGFnZVNpemU/OiBudW1iZXIsXG4gICAgc29ydEJ5Pzogc3RyaW5nLFxuICAgIHNvcnRPcmRlcj86ICdhc2MnIHwgJ2Rlc2MnLFxuICApID0+IGlwY1JlbmRlcmVyLmludm9rZSgnb3JkZXI6Z2V0QWxsJywgcGFnZSwgcGFnZVNpemUsIHNvcnRCeSwgc29ydE9yZGVyKSxcblxuICBnZXRPcmRlckJ5SWQ6IChpZDogbnVtYmVyKSA9PiBpcGNSZW5kZXJlci5pbnZva2UoJ29yZGVyOmdldEJ5SWQnLCBpZCksXG4gIGxvZ2luOiAodXNlcjogQXV0aCkgPT4gaXBjUmVuZGVyZXIuaW52b2tlKCdhdXRoOmxvZ2luJywgdXNlciksXG4gIHJlZ2lzdGVyOiAodXNlcjogQXV0aCkgPT4gaXBjUmVuZGVyZXIuaW52b2tlKCdhdXRoOnJlZ2lzdGVyJywgdXNlciksXG4gIGdldFVzZXI6ICh1c2VybmFtZTogc3RyaW5nKSA9PiBpcGNSZW5kZXJlci5pbnZva2UoJ2F1dGg6Z2V0VXNlcicsIHVzZXJuYW1lKSxcbiAgZ2V0T3JkZXJCeVBlcmlvZDogKHBlcmlvZDogc3RyaW5nKSA9PlxuICAgIGlwY1JlbmRlcmVyLmludm9rZSgnb3JkZXI6Z2V0QnlQZXJpb2QnLCBwZXJpb2QpLFxuICBjcmVhdGVFeHBlbnNlOiAoZGF0YTogRXhwZW5zZSkgPT5cbiAgICBpcGNSZW5kZXJlci5pbnZva2UoJ2V4cGVuc2U6Y3JlYXRlRXhwZW5zZScsIGRhdGEpLFxuXG4gIGdldEFsbFVzZXJzOiAoKSA9PiBpcGNSZW5kZXJlci5pbnZva2UoJ2F1dGg6Z2V0QWxsVXNlcnMnKSxcbiAgZ2V0QWxsRXhwZW5zZXNCeVBlcmlvZDogYXN5bmMgKFxuICAgIHBlcmlvZD86IHN0cmluZyxcbiAgICBwYWdlPzogbnVtYmVyLFxuICAgIHBhZ2VTaXplPzogbnVtYmVyLFxuICAgIGZpbHRlckZpZWxkPzogc3RyaW5nLFxuICAgIGZpbHRlclZhbHVlPzogc3RyaW5nLFxuICAgIHNvcnRPcmRlcj86ICdhc2MnIHwgJ2Rlc2MnLFxuICApID0+IHtcbiAgICByZXR1cm4gaXBjUmVuZGVyZXIuaW52b2tlKFxuICAgICAgJ2V4cGVuc2U6Z2V0RXhwZW5zZXNCeVBlcmlvZCcsXG4gICAgICBwZXJpb2QsXG4gICAgICBwYWdlLFxuICAgICAgcGFnZVNpemUsXG4gICAgICBmaWx0ZXJGaWVsZCxcbiAgICAgIGZpbHRlclZhbHVlLFxuICAgICAgc29ydE9yZGVyLFxuICAgICk7XG4gIH0sXG5cbiAgZ2VuZXJhdGVSZWNpZXB0OiAoZGF0YTogYW55KSA9PlxuICAgIGlwY1JlbmRlcmVyLmludm9rZSgnZ2VuZXJhdGVIdG1sQ29udGVudCcsIGRhdGEpLFxuXG4gIGNyZWF0ZUN1c3RvbWVyOiAoY3VzdG9tZXI6IEN1c3RvbWVyKSA9PlxuICAgIGlwY1JlbmRlcmVyLmludm9rZSgnY3VzdG9tZXI6Y3JlYXRlJywgY3VzdG9tZXIpLFxuICBnZXRDdXN0b21lckJ5SWQ6IChpZDogbnVtYmVyKSA9PiBpcGNSZW5kZXJlci5pbnZva2UoJ2N1c3RvbWVyOmdldEJ5SWQnLCBpZCksXG5cbiAgZ2V0VG90YWxJdGVtc0NvdW50OiAodGFibGVOYW1lOiBzdHJpbmcpID0+XG4gICAgaXBjUmVuZGVyZXIuaW52b2tlKCdnZXRUb3RhbEl0ZW1zQ291bnQnLCB0YWJsZU5hbWUpLFxuXG4gIHVwZGF0ZUN1c3RvbWVyQnlJZDogKGN1c3RvbWVySWQ6IG51bWJlciwgdXBkYXRlZERhdGE6IEN1c3RvbWVyKSA9PlxuICAgIGlwY1JlbmRlcmVyLmludm9rZSgnY3VzdG9tZXI6dXBkYXRlQnlJZCcsIGN1c3RvbWVySWQsIHVwZGF0ZWREYXRhKSxcbiAgc2VhcmNoUHJvZHVjdEJ5bmFtZTogKHNlYXJjaFN0cmluZzogc3RyaW5nKSA9PlxuICAgIGlwY1JlbmRlcmVyLmludm9rZSgnc2VhcmNoUHJvZHVjdEJ5TmFtZScsIHNlYXJjaFN0cmluZyksXG5cbiAgLy8gQWRkIG5ldyBJUEMgaGFuZGxlcnMgZm9yIGNhc2ggc2VydmljZXNcbiAgZ2V0RGFpbHlDYXNoRW50cnlCeURhdGU6IGFzeW5jIChkYXRlOiBudW1iZXIpID0+IHtcbiAgICByZXR1cm4gaXBjUmVuZGVyZXIuaW52b2tlKCdjYXNoOmdldERhaWx5Q2FzaEVudHJ5QnlEYXRlJywgZGF0ZSk7XG4gIH0sXG4gIGdldENsb3NpbmdCYWxhbmNlRnJvbVByZXZpb3VzRGF5OiBhc3luYyAoY3VycmVudERhdGU6IG51bWJlcikgPT4ge1xuICAgIHJldHVybiBpcGNSZW5kZXJlci5pbnZva2UoXG4gICAgICAnY2FzaDpnZXRDbG9zaW5nQmFsYW5jZUZyb21QcmV2aW91c0RheScsXG4gICAgICBjdXJyZW50RGF0ZSxcbiAgICApO1xuICB9LFxuICBjcmVhdGVEYWlseUNhc2hFbnRyeTogYXN5bmMgKGVudHJ5OiBhbnkpID0+IHtcbiAgICByZXR1cm4gaXBjUmVuZGVyZXIuaW52b2tlKCdjYXNoOmNyZWF0ZURhaWx5Q2FzaEVudHJ5JywgZW50cnkpO1xuICB9LFxuICB1cGRhdGVEYWlseUNhc2hFbnRyeTogYXN5bmMgKGRhdGU6IG51bWJlciwgdXBkYXRlZEVudHJ5RGF0YTogYW55KSA9PiB7XG4gICAgcmV0dXJuIGlwY1JlbmRlcmVyLmludm9rZShcbiAgICAgICdjYXNoOnVwZGF0ZURhaWx5Q2FzaEVudHJ5JyxcbiAgICAgIGRhdGUsXG4gICAgICB1cGRhdGVkRW50cnlEYXRhLFxuICAgICk7XG4gIH0sXG4gIGNyZWF0ZU9yVXBkYXRlRGFpbHlDYXNoRW50cnk6IGFzeW5jIChlbnRyeTogYW55KSA9PiB7XG4gICAgcmV0dXJuIGlwY1JlbmRlcmVyLmludm9rZSgnY2FzaDpjcmVhdGVPclVwZGF0ZURhaWx5Q2FzaEVudHJ5JywgZW50cnkpO1xuICB9LFxuXG4gIGRlbGV0ZVByb2R1Y3RCeUlkOiBhc3luYyAocHJvZHVjdElkOiBudW1iZXIpID0+IHtcbiAgICByZXR1cm4gaXBjUmVuZGVyZXIuaW52b2tlKCdwcm9kdWN0OmRlbGV0ZUJ5SWQnLCBwcm9kdWN0SWQpO1xuICB9LFxufTtcbmNvbnRleHRCcmlkZ2UuZXhwb3NlSW5NYWluV29ybGQoJ2VsZWN0cm9uJywgZWxlY3Ryb25IYW5kbGVyKTtcblxuZXhwb3J0IHR5cGUgRWxlY3Ryb25IYW5kbGVyID0gdHlwZW9mIGVsZWN0cm9uSGFuZGxlcjtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==