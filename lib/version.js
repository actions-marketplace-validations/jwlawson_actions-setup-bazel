"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var rest = __importStar(require("typed-rest-client/RestClient"));
var semver = __importStar(require("semver"));
var VERSION_URL = 'https://api.github.com/repos/bazelbuild/bazel/releases';
var USER_AGENT = 'jwlawson-actions-setup-bazel';
function getAllVersionInfo() {
    return __awaiter(this, void 0, void 0, function () {
        var client, version_response, versions;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    client = new rest.RestClient(USER_AGENT);
                    return [4 /*yield*/, client.get(VERSION_URL)];
                case 1:
                    version_response = _a.sent();
                    versions = version_response.result || [];
                    return [2 /*return*/, versions];
            }
        });
    });
}
exports.getAllVersionInfo = getAllVersionInfo;
function getLatest(version_list) {
    return __awaiter(this, void 0, void 0, function () {
        var sorted_versions;
        return __generator(this, function (_a) {
            sorted_versions = version_list
                .sort(function (a, b) { return semver.rcompare(a.name, b.name); });
            return [2 /*return*/, sorted_versions[0]];
        });
    });
}
function findExactVersion(version, version_list) {
    return __awaiter(this, void 0, void 0, function () {
        var matching_version;
        return __generator(this, function (_a) {
            matching_version = version_list.find(function (v) { return v.name === version; });
            if (matching_version) {
                return [2 /*return*/, matching_version];
            }
            else {
                throw new Error('Unable to find version matching ' + version);
            }
            return [2 /*return*/];
        });
    });
}
function getLatestMatching(version, version_list) {
    return __awaiter(this, void 0, void 0, function () {
        var matching_versions;
        return __generator(this, function (_a) {
            matching_versions = version_list.filter(function (v) { return !v.draft && !v.prerelease; })
                .filter(function (v) { return semver.satisfies(v.name, version); });
            if (matching_versions.length == 0) {
                throw new Error('Unable to find version matching ' + version);
            }
            return [2 /*return*/, getLatest(matching_versions)];
        });
    });
}
exports.getLatestMatching = getLatestMatching;