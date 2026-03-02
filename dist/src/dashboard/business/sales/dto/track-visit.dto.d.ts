import { SalesChannel } from '../enums/sales-channel.enum';
export declare class TrackVisitDto {
    channel: SalesChannel;
    eventId: string;
    ip?: string;
    userAgent?: string;
    deviceType?: string;
    assetCode?: string;
}
