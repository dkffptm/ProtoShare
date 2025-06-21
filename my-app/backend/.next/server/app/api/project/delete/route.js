"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/project/delete/route";
exports.ids = ["app/api/project/delete/route"];
exports.modules = {

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("stream");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fproject%2Fdelete%2Froute&page=%2Fapi%2Fproject%2Fdelete%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fproject%2Fdelete%2Froute.ts&appDir=C%3A%5CUsers%5Cjungw%5COneDrive%5CDesktop%5CProtoShare-main%5Cmy-app%5Cbackend%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cjungw%5COneDrive%5CDesktop%5CProtoShare-main%5Cmy-app%5Cbackend&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fproject%2Fdelete%2Froute&page=%2Fapi%2Fproject%2Fdelete%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fproject%2Fdelete%2Froute.ts&appDir=C%3A%5CUsers%5Cjungw%5COneDrive%5CDesktop%5CProtoShare-main%5Cmy-app%5Cbackend%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cjungw%5COneDrive%5CDesktop%5CProtoShare-main%5Cmy-app%5Cbackend&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   headerHooks: () => (/* binding */ headerHooks),\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage),\n/* harmony export */   staticGenerationBailout: () => (/* binding */ staticGenerationBailout)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_node_polyfill_headers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/node-polyfill-headers */ \"(rsc)/./node_modules/next/dist/server/node-polyfill-headers.js\");\n/* harmony import */ var next_dist_server_node_polyfill_headers__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_node_polyfill_headers__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var C_Users_jungw_OneDrive_Desktop_ProtoShare_main_my_app_backend_app_api_project_delete_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/project/delete/route.ts */ \"(rsc)/./app/api/project/delete/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_1__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_2__.RouteKind.APP_ROUTE,\n        page: \"/api/project/delete/route\",\n        pathname: \"/api/project/delete\",\n        filename: \"route\",\n        bundlePath: \"app/api/project/delete/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\jungw\\\\OneDrive\\\\Desktop\\\\ProtoShare-main\\\\my-app\\\\backend\\\\app\\\\api\\\\project\\\\delete\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_jungw_OneDrive_Desktop_ProtoShare_main_my_app_backend_app_api_project_delete_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks, headerHooks, staticGenerationBailout } = routeModule;\nconst originalPathname = \"/api/project/delete/route\";\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZwcm9qZWN0JTJGZGVsZXRlJTJGcm91dGUmcGFnZT0lMkZhcGklMkZwcm9qZWN0JTJGZGVsZXRlJTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGcHJvamVjdCUyRmRlbGV0ZSUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNqdW5ndyU1Q09uZURyaXZlJTVDRGVza3RvcCU1Q1Byb3RvU2hhcmUtbWFpbiU1Q215LWFwcCU1Q2JhY2tlbmQlNUNhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPUMlM0ElNUNVc2VycyU1Q2p1bmd3JTVDT25lRHJpdmUlNUNEZXNrdG9wJTVDUHJvdG9TaGFyZS1tYWluJTVDbXktYXBwJTVDYmFja2VuZCZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFnRDtBQUNzRDtBQUN2QztBQUN3RTtBQUN2STtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsZ0hBQW1CO0FBQzNDO0FBQ0EsY0FBYyx5RUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLHVHQUF1RztBQUMvRztBQUNpSjs7QUFFakoiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYWNrZW5kLz9hOWQ0Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBcIm5leHQvZGlzdC9zZXJ2ZXIvbm9kZS1wb2x5ZmlsbC1oZWFkZXJzXCI7XG5pbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvZnV0dXJlL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvZnV0dXJlL3JvdXRlLWtpbmRcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCJDOlxcXFxVc2Vyc1xcXFxqdW5nd1xcXFxPbmVEcml2ZVxcXFxEZXNrdG9wXFxcXFByb3RvU2hhcmUtbWFpblxcXFxteS1hcHBcXFxcYmFja2VuZFxcXFxhcHBcXFxcYXBpXFxcXHByb2plY3RcXFxcZGVsZXRlXFxcXHJvdXRlLnRzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS9wcm9qZWN0L2RlbGV0ZS9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL3Byb2plY3QvZGVsZXRlXCIsXG4gICAgICAgIGZpbGVuYW1lOiBcInJvdXRlXCIsXG4gICAgICAgIGJ1bmRsZVBhdGg6IFwiYXBwL2FwaS9wcm9qZWN0L2RlbGV0ZS9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIkM6XFxcXFVzZXJzXFxcXGp1bmd3XFxcXE9uZURyaXZlXFxcXERlc2t0b3BcXFxcUHJvdG9TaGFyZS1tYWluXFxcXG15LWFwcFxcXFxiYWNrZW5kXFxcXGFwcFxcXFxhcGlcXFxccHJvamVjdFxcXFxkZWxldGVcXFxccm91dGUudHNcIixcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxuICAgIHVzZXJsYW5kXG59KTtcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxuY29uc3QgeyByZXF1ZXN0QXN5bmNTdG9yYWdlLCBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgaGVhZGVySG9va3MsIHN0YXRpY0dlbmVyYXRpb25CYWlsb3V0IH0gPSByb3V0ZU1vZHVsZTtcbmNvbnN0IG9yaWdpbmFsUGF0aG5hbWUgPSBcIi9hcGkvcHJvamVjdC9kZWxldGUvcm91dGVcIjtcbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCByZXF1ZXN0QXN5bmNTdG9yYWdlLCBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgaGVhZGVySG9va3MsIHN0YXRpY0dlbmVyYXRpb25CYWlsb3V0LCBvcmlnaW5hbFBhdGhuYW1lLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fproject%2Fdelete%2Froute&page=%2Fapi%2Fproject%2Fdelete%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fproject%2Fdelete%2Froute.ts&appDir=C%3A%5CUsers%5Cjungw%5COneDrive%5CDesktop%5CProtoShare-main%5Cmy-app%5Cbackend%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cjungw%5COneDrive%5CDesktop%5CProtoShare-main%5Cmy-app%5Cbackend&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./app/api/project/delete/route.ts":
/*!*****************************************!*\
  !*** ./app/api/project/delete/route.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   DELETE: () => (/* binding */ DELETE)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/web/exports/next-response */ \"(rsc)/./node_modules/next/dist/server/web/exports/next-response.js\");\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../lib/prisma */ \"(rsc)/./lib/prisma.ts\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! jsonwebtoken */ \"(rsc)/./node_modules/jsonwebtoken/index.js\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nasync function DELETE(req) {\n    try {\n        const authHeader = req.headers.get(\"authorization\");\n        const token = authHeader?.split(\" \")[1];\n        if (!token) return next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_0__[\"default\"].json({\n            error: \"인증 실패\"\n        }, {\n            status: 401\n        });\n        const decoded = jsonwebtoken__WEBPACK_IMPORTED_MODULE_2___default().verify(token, process.env.JWT_SECRET);\n        const { id } = await req.json();\n        const project = await _lib_prisma__WEBPACK_IMPORTED_MODULE_1__[\"default\"].project.findUnique({\n            where: {\n                id\n            }\n        });\n        if (!project || project.userId !== decoded.userId) {\n            return next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_0__[\"default\"].json({\n                error: \"삭제 권한 없음\"\n            }, {\n                status: 403\n            });\n        }\n        // 1. 관련된 members 먼저 삭제\n        await _lib_prisma__WEBPACK_IMPORTED_MODULE_1__[\"default\"].projectMember.deleteMany({\n            where: {\n                projectId: id\n            }\n        });\n        // 2. 그 다음 프로젝트 삭제\n        await _lib_prisma__WEBPACK_IMPORTED_MODULE_1__[\"default\"].project.delete({\n            where: {\n                id\n            }\n        });\n        return next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_0__[\"default\"].json({\n            message: \"삭제 완료\"\n        });\n    } catch (err) {\n        console.error(\"삭제 실패:\", err);\n        return next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_0__[\"default\"].json({\n            error: \"서버 오류\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL3Byb2plY3QvZGVsZXRlL3JvdXRlLnRzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQTJDO0FBQ0M7QUFDYjtBQUV4QixlQUFlRyxPQUFPQyxHQUFZO0lBQ3ZDLElBQUk7UUFDRixNQUFNQyxhQUFhRCxJQUFJRSxPQUFPLENBQUNDLEdBQUcsQ0FBQztRQUNuQyxNQUFNQyxRQUFRSCxZQUFZSSxNQUFNLElBQUksQ0FBQyxFQUFFO1FBQ3ZDLElBQUksQ0FBQ0QsT0FDSCxPQUFPUixrRkFBWUEsQ0FBQ1UsSUFBSSxDQUFDO1lBQUVDLE9BQU87UUFBUSxHQUFHO1lBQUVDLFFBQVE7UUFBSTtRQUU3RCxNQUFNQyxVQUFVWCwwREFBVSxDQUFDTSxPQUFPTyxRQUFRQyxHQUFHLENBQUNDLFVBQVU7UUFHeEQsTUFBTSxFQUFFQyxFQUFFLEVBQUUsR0FBRyxNQUFNZCxJQUFJTSxJQUFJO1FBRTdCLE1BQU1TLFVBQVUsTUFBTWxCLG1EQUFNQSxDQUFDa0IsT0FBTyxDQUFDQyxVQUFVLENBQUM7WUFDOUNDLE9BQU87Z0JBQUVIO1lBQUc7UUFDZDtRQUVBLElBQUksQ0FBQ0MsV0FBV0EsUUFBUUcsTUFBTSxLQUFLVCxRQUFRUyxNQUFNLEVBQUU7WUFDakQsT0FBT3RCLGtGQUFZQSxDQUFDVSxJQUFJLENBQUM7Z0JBQUVDLE9BQU87WUFBVyxHQUFHO2dCQUFFQyxRQUFRO1lBQUk7UUFDaEU7UUFFQSx1QkFBdUI7UUFDdkIsTUFBTVgsbURBQU1BLENBQUNzQixhQUFhLENBQUNDLFVBQVUsQ0FBQztZQUNwQ0gsT0FBTztnQkFBRUksV0FBV1A7WUFBRztRQUN6QjtRQUVBLGtCQUFrQjtRQUNsQixNQUFNakIsbURBQU1BLENBQUNrQixPQUFPLENBQUNPLE1BQU0sQ0FBQztZQUMxQkwsT0FBTztnQkFBRUg7WUFBRztRQUNkO1FBRUEsT0FBT2xCLGtGQUFZQSxDQUFDVSxJQUFJLENBQUM7WUFBRWlCLFNBQVM7UUFBUTtJQUM5QyxFQUFFLE9BQU9DLEtBQUs7UUFDWkMsUUFBUWxCLEtBQUssQ0FBQyxVQUFVaUI7UUFDeEIsT0FBTzVCLGtGQUFZQSxDQUFDVSxJQUFJLENBQUM7WUFBRUMsT0FBTztRQUFRLEdBQUc7WUFBRUMsUUFBUTtRQUFJO0lBQzdEO0FBQ0YiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYWNrZW5kLy4vYXBwL2FwaS9wcm9qZWN0L2RlbGV0ZS9yb3V0ZS50cz9lODhiIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRSZXNwb25zZSB9IGZyb20gXCJuZXh0L3NlcnZlclwiO1xuaW1wb3J0IHByaXNtYSBmcm9tIFwiLi4vLi4vLi4vLi4vbGliL3ByaXNtYVwiO1xuaW1wb3J0IGp3dCBmcm9tIFwianNvbndlYnRva2VuXCI7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBERUxFVEUocmVxOiBSZXF1ZXN0KSB7XG4gIHRyeSB7XG4gICAgY29uc3QgYXV0aEhlYWRlciA9IHJlcS5oZWFkZXJzLmdldChcImF1dGhvcml6YXRpb25cIik7XG4gICAgY29uc3QgdG9rZW4gPSBhdXRoSGVhZGVyPy5zcGxpdChcIiBcIilbMV07XG4gICAgaWYgKCF0b2tlbilcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiBcIuyduOymnSDsi6TtjKhcIiB9LCB7IHN0YXR1czogNDAxIH0pO1xuXG4gICAgY29uc3QgZGVjb2RlZCA9IGp3dC52ZXJpZnkodG9rZW4sIHByb2Nlc3MuZW52LkpXVF9TRUNSRVQhKSBhcyB7XG4gICAgICB1c2VySWQ6IG51bWJlcjtcbiAgICB9O1xuICAgIGNvbnN0IHsgaWQgfSA9IGF3YWl0IHJlcS5qc29uKCk7XG5cbiAgICBjb25zdCBwcm9qZWN0ID0gYXdhaXQgcHJpc21hLnByb2plY3QuZmluZFVuaXF1ZSh7XG4gICAgICB3aGVyZTogeyBpZCB9LFxuICAgIH0pO1xuXG4gICAgaWYgKCFwcm9qZWN0IHx8IHByb2plY3QudXNlcklkICE9PSBkZWNvZGVkLnVzZXJJZCkge1xuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6IFwi7IKt7KCcIOq2jO2VnCDsl4bsnYxcIiB9LCB7IHN0YXR1czogNDAzIH0pO1xuICAgIH1cblxuICAgIC8vIDEuIOq0gOugqOuQnCBtZW1iZXJzIOuovOyggCDsgq3soJxcbiAgICBhd2FpdCBwcmlzbWEucHJvamVjdE1lbWJlci5kZWxldGVNYW55KHtcbiAgICAgIHdoZXJlOiB7IHByb2plY3RJZDogaWQgfSxcbiAgICB9KTtcblxuICAgIC8vIDIuIOq3uCDri6TsnYwg7ZSE66Gc7KCd7Yq4IOyCreygnFxuICAgIGF3YWl0IHByaXNtYS5wcm9qZWN0LmRlbGV0ZSh7XG4gICAgICB3aGVyZTogeyBpZCB9LFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgbWVzc2FnZTogXCLsgq3soJwg7JmE66OMXCIgfSk7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGNvbnNvbGUuZXJyb3IoXCLsgq3soJwg7Iuk7YyoOlwiLCBlcnIpO1xuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiBcIuyEnOuyhCDsmKTrpZhcIiB9LCB7IHN0YXR1czogNTAwIH0pO1xuICB9XG59XG4iXSwibmFtZXMiOlsiTmV4dFJlc3BvbnNlIiwicHJpc21hIiwiand0IiwiREVMRVRFIiwicmVxIiwiYXV0aEhlYWRlciIsImhlYWRlcnMiLCJnZXQiLCJ0b2tlbiIsInNwbGl0IiwianNvbiIsImVycm9yIiwic3RhdHVzIiwiZGVjb2RlZCIsInZlcmlmeSIsInByb2Nlc3MiLCJlbnYiLCJKV1RfU0VDUkVUIiwiaWQiLCJwcm9qZWN0IiwiZmluZFVuaXF1ZSIsIndoZXJlIiwidXNlcklkIiwicHJvamVjdE1lbWJlciIsImRlbGV0ZU1hbnkiLCJwcm9qZWN0SWQiLCJkZWxldGUiLCJtZXNzYWdlIiwiZXJyIiwiY29uc29sZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/project/delete/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/prisma.ts":
/*!***********************!*\
  !*** ./lib/prisma.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n// backend/lib/prisma.ts\n\nconst globalForPrisma = globalThis;\nconst prisma = globalForPrisma.prisma || new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient();\nif (true) globalForPrisma.prisma = prisma;\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (prisma);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvcHJpc21hLnRzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLHdCQUF3QjtBQUNzQjtBQUU5QyxNQUFNQyxrQkFBa0JDO0FBRXhCLE1BQU1DLFNBQVNGLGdCQUFnQkUsTUFBTSxJQUFJLElBQUlILHdEQUFZQTtBQUV6RCxJQUFJSSxJQUFxQyxFQUFFSCxnQkFBZ0JFLE1BQU0sR0FBR0E7QUFFcEUsaUVBQWVBLE1BQU1BLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYWNrZW5kLy4vbGliL3ByaXNtYS50cz85ODIyIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGJhY2tlbmQvbGliL3ByaXNtYS50c1xuaW1wb3J0IHsgUHJpc21hQ2xpZW50IH0gZnJvbSBcIkBwcmlzbWEvY2xpZW50XCI7XG5cbmNvbnN0IGdsb2JhbEZvclByaXNtYSA9IGdsb2JhbFRoaXMgYXMgdW5rbm93biBhcyB7IHByaXNtYTogUHJpc21hQ2xpZW50IH07XG5cbmNvbnN0IHByaXNtYSA9IGdsb2JhbEZvclByaXNtYS5wcmlzbWEgfHwgbmV3IFByaXNtYUNsaWVudCgpO1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSBnbG9iYWxGb3JQcmlzbWEucHJpc21hID0gcHJpc21hO1xuXG5leHBvcnQgZGVmYXVsdCBwcmlzbWE7XG4iXSwibmFtZXMiOlsiUHJpc21hQ2xpZW50IiwiZ2xvYmFsRm9yUHJpc21hIiwiZ2xvYmFsVGhpcyIsInByaXNtYSIsInByb2Nlc3MiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./lib/prisma.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/semver","vendor-chunks/next","vendor-chunks/jsonwebtoken","vendor-chunks/lodash.includes","vendor-chunks/jws","vendor-chunks/jwa","vendor-chunks/lodash.once","vendor-chunks/lodash.isinteger","vendor-chunks/ecdsa-sig-formatter","vendor-chunks/lodash.isplainobject","vendor-chunks/ms","vendor-chunks/lodash.isstring","vendor-chunks/lodash.isnumber","vendor-chunks/lodash.isboolean","vendor-chunks/safe-buffer","vendor-chunks/buffer-equal-constant-time"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fproject%2Fdelete%2Froute&page=%2Fapi%2Fproject%2Fdelete%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fproject%2Fdelete%2Froute.ts&appDir=C%3A%5CUsers%5Cjungw%5COneDrive%5CDesktop%5CProtoShare-main%5Cmy-app%5Cbackend%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cjungw%5COneDrive%5CDesktop%5CProtoShare-main%5Cmy-app%5Cbackend&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();