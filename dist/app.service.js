"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
let AppService = class AppService {
    getRaidData() {
        console.log("start");
        var xhr = new XMLHttpRequest();
        var target = "https://dmpilf5svl7rv.cloudfront.net/assignment/backend/bossRaidData.json";
        xhr.open("GET", target);
        xhr.send();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status == 200) {
                    let loadedJSON = JSON.parse(xhr.responseText);
                    console.log(loadedJSON);
                }
                else {
                    console.log("fail to load");
                }
            }
        };
        const temp = null;
        return temp;
    }
};
AppService = __decorate([
    (0, common_1.Injectable)()
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map