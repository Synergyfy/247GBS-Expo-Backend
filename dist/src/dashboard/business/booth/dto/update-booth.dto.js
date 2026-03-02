"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateBoothDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_booth_dto_1 = require("./create-booth.dto");
class UpdateBoothDto extends (0, mapped_types_1.PartialType)(create_booth_dto_1.CreateBoothDto) {
}
exports.UpdateBoothDto = UpdateBoothDto;
//# sourceMappingURL=update-booth.dto.js.map