"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSpeakerDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_speaker_dto_1 = require("./create-speaker.dto");
class UpdateSpeakerDto extends (0, swagger_1.PartialType)(create_speaker_dto_1.CreateSpeakerDto) {
}
exports.UpdateSpeakerDto = UpdateSpeakerDto;
//# sourceMappingURL=update-speaker.dto.js.map