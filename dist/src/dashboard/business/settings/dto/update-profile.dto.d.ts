declare class UserProfileDto {
    name?: string;
    email?: string;
}
declare class BoothProfileDto {
    name?: string;
    description?: string;
    location?: string;
    phoneNumber?: string;
    website?: string;
}
export declare class UpdateProfileDto {
    user?: UserProfileDto;
    booth?: BoothProfileDto;
}
export {};
