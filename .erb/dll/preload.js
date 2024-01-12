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
    deleteOrderById: async (orderId) => {
        return electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.invoke('order:deleteById', orderId);
    },
};
electron__WEBPACK_IMPORTED_MODULE_0__.contextBridge.exposeInMainWorld('electron', electronHandler);

})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDbEUsQ0FBQztJQUNELGdDQUFnQyxFQUFFLEtBQUssRUFBRSxXQUFtQixFQUFFLEVBQUU7UUFDOUQsT0FBTyxpREFBVyxDQUFDLE1BQU0sQ0FDdkIsdUNBQXVDLEVBQ3ZDLFdBQVcsQ0FDWixDQUFDO0lBQ0osQ0FBQztJQUNELG9CQUFvQixFQUFFLEtBQUssRUFBRSxLQUFVLEVBQUUsRUFBRTtRQUN6QyxPQUFPLGlEQUFXLENBQUMsTUFBTSxDQUFDLDJCQUEyQixFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ2hFLENBQUM7SUFDRCxvQkFBb0IsRUFBRSxLQUFLLEVBQUUsSUFBWSxFQUFFLGdCQUFxQixFQUFFLEVBQUU7UUFDbEUsT0FBTyxpREFBVyxDQUFDLE1BQU0sQ0FDdkIsMkJBQTJCLEVBQzNCLElBQUksRUFDSixnQkFBZ0IsQ0FDakIsQ0FBQztJQUNKLENBQUM7SUFDRCw0QkFBNEIsRUFBRSxLQUFLLEVBQUUsS0FBVSxFQUFFLEVBQUU7UUFDakQsT0FBTyxpREFBVyxDQUFDLE1BQU0sQ0FBQyxtQ0FBbUMsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUN4RSxDQUFDO0lBRUQsaUJBQWlCLEVBQUUsS0FBSyxFQUFFLFNBQWlCLEVBQUUsRUFBRTtRQUM3QyxPQUFPLGlEQUFXLENBQUMsTUFBTSxDQUFDLG9CQUFvQixFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQzdELENBQUM7SUFDRCxlQUFlLEVBQUUsS0FBSyxFQUFFLE9BQWUsRUFBRSxFQUFFO1FBQ3pDLE9BQU8saURBQVcsQ0FBQyxNQUFNLENBQUMsa0JBQWtCLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDekQsQ0FBQztDQUNGLENBQUM7QUFDRixtREFBYSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsRUFBRSxlQUFlLENBQUMsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovLy93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIG5vZGUtY29tbW9uanMgXCJlbGVjdHJvblwiIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly8vLi9zcmMvbWFpbi9wcmVsb2FkLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSB7XG5cdFx0dmFyIGEgPSBmYWN0b3J5KCk7XG5cdFx0Zm9yKHZhciBpIGluIGEpICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgPyBleHBvcnRzIDogcm9vdClbaV0gPSBhW2ldO1xuXHR9XG59KShnbG9iYWwsICgpID0+IHtcbnJldHVybiAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJlbGVjdHJvblwiKTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gRGlzYWJsZSBuby11bnVzZWQtdmFycywgYnJva2VuIGZvciBzcHJlYWQgYXJnc1xuLyogZXNsaW50IG5vLXVudXNlZC12YXJzOiBvZmYgKi9cbmltcG9ydCB7IGNvbnRleHRCcmlkZ2UsIGlwY1JlbmRlcmVyLCBJcGNSZW5kZXJlckV2ZW50IH0gZnJvbSAnZWxlY3Ryb24nO1xuaW1wb3J0IHsgVE9ETyB9IGZyb20gJy4vc2VydmljZXMvRGF0YWJhc2Uuc2VydmljZSc7XG5pbXBvcnQgeyBQcm9kdWN0IH0gZnJvbSAncmVuZGVyZXIvdHlwZXMvcHJvZHVjdCc7XG5pbXBvcnQgeyBDYXRlZ29yeURvY3VtZW50VHlwZSB9IGZyb20gJ3JlbmRlcmVyL3R5cGVzL2NhdGVnb3J5LnR5cGUnO1xuaW1wb3J0IHsgT3JkZXIgfSBmcm9tICdyZW5kZXJlci90eXBlcy9vcmRlci50eXBlJztcbmltcG9ydCB7IEV4cGVuc2UgfSBmcm9tICdyZW5kZXJlci90eXBlcy9leHBlbnNlLnR5cGUnO1xuaW1wb3J0IHsgQ3VzdG9tZXIgfSBmcm9tICdyZW5kZXJlci90eXBlcy9jdXN0b21lci50eXBlJztcblxuZXhwb3J0IHR5cGUgQ2hhbm5lbHMgPSAnaXBjLWV4YW1wbGUnO1xuXG5jb25zdCBlbGVjdHJvbkhhbmRsZXIgPSB7XG4gIGlwY1JlbmRlcmVyOiB7XG4gICAgc2VuZE1lc3NhZ2UoY2hhbm5lbDogQ2hhbm5lbHMsIC4uLmFyZ3M6IHVua25vd25bXSkge1xuICAgICAgaXBjUmVuZGVyZXIuc2VuZChjaGFubmVsLCAuLi5hcmdzKTtcbiAgICB9LFxuICAgIG9uKGNoYW5uZWw6IENoYW5uZWxzLCBmdW5jOiAoLi4uYXJnczogdW5rbm93bltdKSA9PiB2b2lkKSB7XG4gICAgICBjb25zdCBzdWJzY3JpcHRpb24gPSAoX2V2ZW50OiBJcGNSZW5kZXJlckV2ZW50LCAuLi5hcmdzOiB1bmtub3duW10pID0+XG4gICAgICAgIGZ1bmMoLi4uYXJncyk7XG4gICAgICBpcGNSZW5kZXJlci5vbihjaGFubmVsLCBzdWJzY3JpcHRpb24pO1xuXG4gICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICBpcGNSZW5kZXJlci5yZW1vdmVMaXN0ZW5lcihjaGFubmVsLCBzdWJzY3JpcHRpb24pO1xuICAgICAgfTtcbiAgICB9LFxuICAgIG9uY2UoY2hhbm5lbDogQ2hhbm5lbHMsIGZ1bmM6ICguLi5hcmdzOiB1bmtub3duW10pID0+IHZvaWQpIHtcbiAgICAgIGlwY1JlbmRlcmVyLm9uY2UoY2hhbm5lbCwgKF9ldmVudCwgLi4uYXJncykgPT4gZnVuYyguLi5hcmdzKSk7XG4gICAgfSxcbiAgfSxcblxuICBwcmludE9yUHJldmlld0NvbXBvbmVudDogYXN5bmMgKHVybDogc3RyaW5nLCBpc1ByZXZpZXc6IGJvb2xlYW4pID0+IHtcbiAgICByZXR1cm4gaXBjUmVuZGVyZXIuaW52b2tlKCdwcmludE9yUHJldmlld0NvbXBvbmVudCcsIHsgdXJsLCBpc1ByZXZpZXcgfSk7XG4gIH0sXG5cbiAgaW5zZXJ0UHJvZHVjdDogKHByb2R1Y3Q6IFByb2R1Y3QpID0+XG4gICAgaXBjUmVuZGVyZXIuaW52b2tlKCdwcm9kdWN0Omluc2VydCcsIHByb2R1Y3QpLFxuICBnZXRQcm9kdWN0QnlOYW1lOiAobmFtZTogc3RyaW5nKSA9PlxuICAgIGlwY1JlbmRlcmVyLmludm9rZSgncHJvZHVjdDpnZXRCeU5hbWUnLCBuYW1lKSxcbiAgZ2V0UHJvZHVjdEJ5SWQ6IChpZDogbnVtYmVyKSA9PiBpcGNSZW5kZXJlci5pbnZva2UoJ3Byb2R1Y3Q6Z2V0QnlOYW1lJywgaWQpLFxuICB1cGRhdGVQcm9kdWN0QnlJZDogKHByb2R1Y3RJZDogbnVtYmVyLCB1cGRhdGVkcHJvZHVjdDogYW55KSA9PlxuICAgIGlwY1JlbmRlcmVyLmludm9rZSgncHJvZHVjdDp1cGRhdGVCeUlkJywgcHJvZHVjdElkLCB1cGRhdGVkcHJvZHVjdCksXG4gIGdldEFsbFByb2R1Y3RzOiAoKSA9PiBpcGNSZW5kZXJlci5pbnZva2UoJ3Byb2R1Y3Q6Z2V0QWxsJyksXG4gIGdldEFsbENhdGVnb3JpZXM6ICgpID0+IGlwY1JlbmRlcmVyLmludm9rZSgnY2F0ZWdvcnk6Z2V0QWxsJyksXG4gIGNyZWF0ZUNhdGVnb3J5OiAoY2F0ZWdvcnk6IENhdGVnb3J5RG9jdW1lbnRUeXBlKSA9PlxuICAgIGlwY1JlbmRlcmVyLmludm9rZSgnY2F0ZWdvcnk6Y3JlYXRlJywgY2F0ZWdvcnkpLFxuXG4gIGNyZWF0ZU9yZGVyOiAob3JkZXI6IE9yZGVyKSA9PiBpcGNSZW5kZXJlci5pbnZva2UoJ29yZGVyOmNyZWF0ZScsIG9yZGVyKSxcbiAgdXBkYXRlT3JkZXI6IChvcmRlcklkOiBzdHJpbmcsIHVwZGF0ZWRPcmRlcjogYW55KSA9PlxuICAgIGlwY1JlbmRlcmVyLmludm9rZSgnb3JkZXI6dXBkYXRlJywgb3JkZXJJZCwgdXBkYXRlZE9yZGVyKSxcbiAgZGVsZXRlT3JkZXI6IChvcmRlcklkOiBzdHJpbmcpID0+IGlwY1JlbmRlcmVyLmludm9rZSgnb3JkZXI6ZGVsZXRlJywgb3JkZXJJZCksXG4gIGdldEFsbE9yZGVyOiAoXG4gICAgcGFnZT86IG51bWJlcixcbiAgICBwYWdlU2l6ZT86IG51bWJlcixcbiAgICBzb3J0Qnk/OiBzdHJpbmcsXG4gICAgc29ydE9yZGVyPzogJ2FzYycgfCAnZGVzYycsXG4gICkgPT4gaXBjUmVuZGVyZXIuaW52b2tlKCdvcmRlcjpnZXRBbGwnLCBwYWdlLCBwYWdlU2l6ZSwgc29ydEJ5LCBzb3J0T3JkZXIpLFxuXG4gIGdldE9yZGVyQnlJZDogKGlkOiBudW1iZXIpID0+IGlwY1JlbmRlcmVyLmludm9rZSgnb3JkZXI6Z2V0QnlJZCcsIGlkKSxcbiAgbG9naW46ICh1c2VyOiBBdXRoKSA9PiBpcGNSZW5kZXJlci5pbnZva2UoJ2F1dGg6bG9naW4nLCB1c2VyKSxcbiAgcmVnaXN0ZXI6ICh1c2VyOiBBdXRoKSA9PiBpcGNSZW5kZXJlci5pbnZva2UoJ2F1dGg6cmVnaXN0ZXInLCB1c2VyKSxcbiAgZ2V0VXNlcjogKHVzZXJuYW1lOiBzdHJpbmcpID0+IGlwY1JlbmRlcmVyLmludm9rZSgnYXV0aDpnZXRVc2VyJywgdXNlcm5hbWUpLFxuICBnZXRPcmRlckJ5UGVyaW9kOiAocGVyaW9kOiBzdHJpbmcpID0+XG4gICAgaXBjUmVuZGVyZXIuaW52b2tlKCdvcmRlcjpnZXRCeVBlcmlvZCcsIHBlcmlvZCksXG4gIGNyZWF0ZUV4cGVuc2U6IChkYXRhOiBFeHBlbnNlKSA9PlxuICAgIGlwY1JlbmRlcmVyLmludm9rZSgnZXhwZW5zZTpjcmVhdGVFeHBlbnNlJywgZGF0YSksXG5cbiAgZ2V0QWxsVXNlcnM6ICgpID0+IGlwY1JlbmRlcmVyLmludm9rZSgnYXV0aDpnZXRBbGxVc2VycycpLFxuICBnZXRBbGxFeHBlbnNlc0J5UGVyaW9kOiBhc3luYyAoXG4gICAgcGVyaW9kPzogc3RyaW5nLFxuICAgIHBhZ2U/OiBudW1iZXIsXG4gICAgcGFnZVNpemU/OiBudW1iZXIsXG4gICAgZmlsdGVyRmllbGQ/OiBzdHJpbmcsXG4gICAgZmlsdGVyVmFsdWU/OiBzdHJpbmcsXG4gICAgc29ydE9yZGVyPzogJ2FzYycgfCAnZGVzYycsXG4gICkgPT4ge1xuICAgIHJldHVybiBpcGNSZW5kZXJlci5pbnZva2UoXG4gICAgICAnZXhwZW5zZTpnZXRFeHBlbnNlc0J5UGVyaW9kJyxcbiAgICAgIHBlcmlvZCxcbiAgICAgIHBhZ2UsXG4gICAgICBwYWdlU2l6ZSxcbiAgICAgIGZpbHRlckZpZWxkLFxuICAgICAgZmlsdGVyVmFsdWUsXG4gICAgICBzb3J0T3JkZXIsXG4gICAgKTtcbiAgfSxcblxuICBnZW5lcmF0ZVJlY2llcHQ6IChkYXRhOiBhbnkpID0+XG4gICAgaXBjUmVuZGVyZXIuaW52b2tlKCdnZW5lcmF0ZUh0bWxDb250ZW50JywgZGF0YSksXG5cbiAgY3JlYXRlQ3VzdG9tZXI6IChjdXN0b21lcjogQ3VzdG9tZXIpID0+XG4gICAgaXBjUmVuZGVyZXIuaW52b2tlKCdjdXN0b21lcjpjcmVhdGUnLCBjdXN0b21lciksXG4gIGdldEN1c3RvbWVyQnlJZDogKGlkOiBudW1iZXIpID0+IGlwY1JlbmRlcmVyLmludm9rZSgnY3VzdG9tZXI6Z2V0QnlJZCcsIGlkKSxcblxuICBnZXRUb3RhbEl0ZW1zQ291bnQ6ICh0YWJsZU5hbWU6IHN0cmluZykgPT5cbiAgICBpcGNSZW5kZXJlci5pbnZva2UoJ2dldFRvdGFsSXRlbXNDb3VudCcsIHRhYmxlTmFtZSksXG5cbiAgdXBkYXRlQ3VzdG9tZXJCeUlkOiAoY3VzdG9tZXJJZDogbnVtYmVyLCB1cGRhdGVkRGF0YTogQ3VzdG9tZXIpID0+XG4gICAgaXBjUmVuZGVyZXIuaW52b2tlKCdjdXN0b21lcjp1cGRhdGVCeUlkJywgY3VzdG9tZXJJZCwgdXBkYXRlZERhdGEpLFxuICBzZWFyY2hQcm9kdWN0QnluYW1lOiAoc2VhcmNoU3RyaW5nOiBzdHJpbmcpID0+XG4gICAgaXBjUmVuZGVyZXIuaW52b2tlKCdzZWFyY2hQcm9kdWN0QnlOYW1lJywgc2VhcmNoU3RyaW5nKSxcblxuICAvLyBBZGQgbmV3IElQQyBoYW5kbGVycyBmb3IgY2FzaCBzZXJ2aWNlc1xuICBnZXREYWlseUNhc2hFbnRyeUJ5RGF0ZTogYXN5bmMgKGRhdGU6IG51bWJlcikgPT4ge1xuICAgIHJldHVybiBpcGNSZW5kZXJlci5pbnZva2UoJ2Nhc2g6Z2V0RGFpbHlDYXNoRW50cnlCeURhdGUnLCBkYXRlKTtcbiAgfSxcbiAgZ2V0Q2xvc2luZ0JhbGFuY2VGcm9tUHJldmlvdXNEYXk6IGFzeW5jIChjdXJyZW50RGF0ZTogbnVtYmVyKSA9PiB7XG4gICAgcmV0dXJuIGlwY1JlbmRlcmVyLmludm9rZShcbiAgICAgICdjYXNoOmdldENsb3NpbmdCYWxhbmNlRnJvbVByZXZpb3VzRGF5JyxcbiAgICAgIGN1cnJlbnREYXRlLFxuICAgICk7XG4gIH0sXG4gIGNyZWF0ZURhaWx5Q2FzaEVudHJ5OiBhc3luYyAoZW50cnk6IGFueSkgPT4ge1xuICAgIHJldHVybiBpcGNSZW5kZXJlci5pbnZva2UoJ2Nhc2g6Y3JlYXRlRGFpbHlDYXNoRW50cnknLCBlbnRyeSk7XG4gIH0sXG4gIHVwZGF0ZURhaWx5Q2FzaEVudHJ5OiBhc3luYyAoZGF0ZTogbnVtYmVyLCB1cGRhdGVkRW50cnlEYXRhOiBhbnkpID0+IHtcbiAgICByZXR1cm4gaXBjUmVuZGVyZXIuaW52b2tlKFxuICAgICAgJ2Nhc2g6dXBkYXRlRGFpbHlDYXNoRW50cnknLFxuICAgICAgZGF0ZSxcbiAgICAgIHVwZGF0ZWRFbnRyeURhdGEsXG4gICAgKTtcbiAgfSxcbiAgY3JlYXRlT3JVcGRhdGVEYWlseUNhc2hFbnRyeTogYXN5bmMgKGVudHJ5OiBhbnkpID0+IHtcbiAgICByZXR1cm4gaXBjUmVuZGVyZXIuaW52b2tlKCdjYXNoOmNyZWF0ZU9yVXBkYXRlRGFpbHlDYXNoRW50cnknLCBlbnRyeSk7XG4gIH0sXG5cbiAgZGVsZXRlUHJvZHVjdEJ5SWQ6IGFzeW5jIChwcm9kdWN0SWQ6IG51bWJlcikgPT4ge1xuICAgIHJldHVybiBpcGNSZW5kZXJlci5pbnZva2UoJ3Byb2R1Y3Q6ZGVsZXRlQnlJZCcsIHByb2R1Y3RJZCk7XG4gIH0sXG4gIGRlbGV0ZU9yZGVyQnlJZDogYXN5bmMgKG9yZGVySWQ6IG51bWJlcikgPT4ge1xuICAgIHJldHVybiBpcGNSZW5kZXJlci5pbnZva2UoJ29yZGVyOmRlbGV0ZUJ5SWQnLCBvcmRlcklkKTtcbiAgfSxcbn07XG5jb250ZXh0QnJpZGdlLmV4cG9zZUluTWFpbldvcmxkKCdlbGVjdHJvbicsIGVsZWN0cm9uSGFuZGxlcik7XG5cbmV4cG9ydCB0eXBlIEVsZWN0cm9uSGFuZGxlciA9IHR5cGVvZiBlbGVjdHJvbkhhbmRsZXI7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=