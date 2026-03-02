-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'BUSINESS', 'CUSTOMER');

-- CreateEnum
CREATE TYPE "EventStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'COMPLETED');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PENDING', 'READY', 'PICKED_UP', 'SHIPPED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "FulfilmentType" AS ENUM ('PICKUP', 'DELIVERY');

-- CreateEnum
CREATE TYPE "ExceptionType" AS ENUM ('DELAY', 'OUT_OF_STOCK');

-- CreateEnum
CREATE TYPE "ProductCategory" AS ENUM ('ELECTRONICS', 'FASHION', 'HOME_GARDEN', 'SOFTWARE', 'SERVICES', 'OTHER');

-- CreateEnum
CREATE TYPE "ProductStatus" AS ENUM ('ACTIVE', 'DRAFT', 'OUT_OF_STOCK', 'HIDDEN');

-- CreateEnum
CREATE TYPE "SalesChannel" AS ENUM ('MARKETPLACE', 'POS', 'AGENT', 'REFERRAL', 'CAMPAIGN');

-- CreateEnum
CREATE TYPE "SalesAssetType" AS ENUM ('LINK', 'QR', 'AGENT', 'CAMPAIGN');

-- CreateEnum
CREATE TYPE "CampaignType" AS ENUM ('PROMO', 'FLASH', 'BUNDLE', 'GEO', 'REWARD', 'REFERRAL');

-- CreateEnum
CREATE TYPE "DiscountType" AS ENUM ('PERCENTAGE', 'FIXED', 'BOGO');

-- CreateEnum
CREATE TYPE "TicketType" AS ENUM ('GENERAL', 'VIP', 'BUNDLE', 'SUBSCRIPTION', 'REWARD');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT,
    "role" "Role" NOT NULL DEFAULT 'CUSTOMER',
    "qrCode" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "referrerId" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Booth" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "logo" TEXT,
    "banner" TEXT,
    "description" TEXT,
    "ownerId" TEXT NOT NULL,
    "phoneNumber" TEXT,
    "email" TEXT,
    "website" TEXT,
    "location" TEXT,
    "category" TEXT,
    "contactName" TEXT,
    "contactTitle" TEXT,
    "publicEmail" TEXT,
    "phoneDisplay" TEXT,
    "tagline" TEXT,
    "settlementRule" TEXT NOT NULL DEFAULT 'T+3',
    "autoPayout" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Booth_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" DECIMAL(65,30) NOT NULL,
    "image" TEXT,
    "category" "ProductCategory" NOT NULL DEFAULT 'OTHER',
    "sku" TEXT,
    "stock" INTEGER NOT NULL DEFAULT 0,
    "status" "ProductStatus" NOT NULL DEFAULT 'DRAFT',
    "substituteId" TEXT,
    "boothId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Wallet" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "points" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "cash" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "vouchers" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "credits" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Wallet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" TEXT NOT NULL,
    "walletId" TEXT NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "type" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'COMPLETED',
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "location" TEXT,
    "category" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "organizer" TEXT NOT NULL,
    "fullImage" TEXT,
    "videoUrl" TEXT,
    "benefits" TEXT[],
    "rating" DECIMAL(65,30) DEFAULT 0,
    "reviews" INTEGER DEFAULT 0,
    "status" "EventStatus" NOT NULL DEFAULT 'DRAFT',
    "price" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "capacity" INTEGER NOT NULL DEFAULT 100,
    "format" TEXT,
    "boothLayout" JSONB,
    "ownerId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "hall" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "speakerId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Speaker" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "topic" TEXT,
    "eventId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Speaker_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventProduct" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EventProduct_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TicketTier" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" DECIMAL(65,30) NOT NULL,
    "quantity" INTEGER NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'general',
    "saleStart" TIMESTAMP(3),
    "saleEnd" TIMESTAMP(3),
    "transferable" BOOLEAN NOT NULL DEFAULT true,
    "refundable" BOOLEAN NOT NULL DEFAULT true,
    "rules" TEXT,
    "accessZones" TEXT[],
    "status" TEXT NOT NULL DEFAULT 'Active',
    "stockTracking" BOOLEAN NOT NULL DEFAULT true,
    "autoLock" BOOLEAN NOT NULL DEFAULT true,
    "waitlist" BOOLEAN NOT NULL DEFAULT false,
    "eventId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TicketTier_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TicketTierProduct" (
    "id" TEXT NOT NULL,
    "ticketTierId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TicketTierProduct_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ticket" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "tierId" TEXT,
    "type" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "scanned" BOOLEAN NOT NULL DEFAULT false,
    "scannedAt" TIMESTAMP(3),
    "channel" "SalesChannel" NOT NULL DEFAULT 'MARKETPLACE',
    "campaignId" TEXT,
    "salesAssetId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Appointment" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "boothId" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Appointment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "boothId" TEXT NOT NULL,
    "status" "OrderStatus" NOT NULL DEFAULT 'PENDING',
    "type" "FulfilmentType" NOT NULL DEFAULT 'PICKUP',
    "fulfilmentSlotId" TEXT,
    "fulfilmentPointId" TEXT,
    "totalAmount" DECIMAL(65,30) NOT NULL,
    "eventId" TEXT NOT NULL,
    "channel" "SalesChannel" NOT NULL DEFAULT 'MARKETPLACE',
    "campaignId" TEXT,
    "salesAssetId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderItem" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "price" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FulfilmentPoint" (
    "id" TEXT NOT NULL,
    "boothId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FulfilmentPoint_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FulfilmentSlot" (
    "id" TEXT NOT NULL,
    "boothId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "capacity" INTEGER NOT NULL DEFAULT 20,
    "booked" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FulfilmentSlot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LogisticsException" (
    "id" TEXT NOT NULL,
    "boothId" TEXT NOT NULL,
    "type" "ExceptionType" NOT NULL,
    "message" TEXT NOT NULL,
    "resolved" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LogisticsException_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MarketingCampaign" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "type" "CampaignType" NOT NULL DEFAULT 'PROMO',
    "discountType" "DiscountType" NOT NULL DEFAULT 'PERCENTAGE',
    "discountValue" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "code" TEXT,
    "location" TEXT,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "eventId" TEXT NOT NULL,
    "targetTierId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MarketingCampaign_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SalesAsset" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "type" "SalesAssetType" NOT NULL DEFAULT 'LINK',
    "code" TEXT NOT NULL,
    "description" TEXT,
    "hits" INTEGER NOT NULL DEFAULT 0,
    "eventId" TEXT NOT NULL,
    "tierId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SalesAsset_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChannelVisit" (
    "id" TEXT NOT NULL,
    "channel" "SalesChannel" NOT NULL,
    "eventId" TEXT NOT NULL,
    "ip" TEXT,
    "userAgent" TEXT,
    "deviceType" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ChannelVisit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SalesChannelConfig" (
    "id" TEXT NOT NULL,
    "channel" "SalesChannel" NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Setup Required',
    "config" JSONB,
    "eventId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SalesChannelConfig_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RewardBalance" (
    "id" TEXT NOT NULL,
    "boothId" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "balance" INTEGER NOT NULL DEFAULT 0,
    "totalPurchased" INTEGER NOT NULL DEFAULT 0,
    "totalAllocated" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RewardBalance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RewardAllocation" (
    "id" TEXT NOT NULL,
    "campaignId" TEXT,
    "email" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "ipAddress" TEXT,
    "ticketId" TEXT,
    "boothId" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RewardAllocation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LoyaltyIntegration" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Disconnected',
    "config" JSONB,
    "boothId" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LoyaltyIntegration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LoyaltySyncLog" (
    "id" TEXT NOT NULL,
    "integrationId" TEXT NOT NULL,
    "syncedProfiles" INTEGER NOT NULL DEFAULT 0,
    "apiStatus" TEXT NOT NULL DEFAULT 'Healthy',
    "lastSync" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LoyaltySyncLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BlockedIP" (
    "id" TEXT NOT NULL,
    "ip" TEXT NOT NULL,
    "reason" TEXT,
    "boothId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BlockedIP_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Scanner" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "deviceId" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'HANDHELD',
    "status" TEXT NOT NULL DEFAULT 'OFFLINE',
    "battery" TEXT,
    "lastSeen" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "boothId" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "assignedStaff" TEXT,
    "staffId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Scanner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventStaff" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "zone" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "boothId" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EventStaff_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FinanceTicket" (
    "id" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'OPEN',
    "type" TEXT NOT NULL DEFAULT 'GENERAL',
    "boothId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FinanceTicket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MessageThread" (
    "id" TEXT NOT NULL,
    "boothId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MessageThread_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" TEXT NOT NULL,
    "threadId" TEXT NOT NULL,
    "senderId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SupportChatSession" (
    "id" TEXT NOT NULL,
    "boothId" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'OPEN',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SupportChatSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SupportChatMessage" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "senderType" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SupportChatMessage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Booth_ownerId_key" ON "Booth"("ownerId");

-- CreateIndex
CREATE UNIQUE INDEX "Wallet_userId_key" ON "Wallet"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "EventProduct_eventId_productId_key" ON "EventProduct"("eventId", "productId");

-- CreateIndex
CREATE UNIQUE INDEX "TicketTierProduct_ticketTierId_productId_key" ON "TicketTierProduct"("ticketTierId", "productId");

-- CreateIndex
CREATE UNIQUE INDEX "MarketingCampaign_code_key" ON "MarketingCampaign"("code");

-- CreateIndex
CREATE UNIQUE INDEX "SalesAsset_code_key" ON "SalesAsset"("code");

-- CreateIndex
CREATE UNIQUE INDEX "SalesChannelConfig_eventId_channel_key" ON "SalesChannelConfig"("eventId", "channel");

-- CreateIndex
CREATE UNIQUE INDEX "RewardBalance_boothId_eventId_key" ON "RewardBalance"("boothId", "eventId");

-- CreateIndex
CREATE UNIQUE INDEX "RewardAllocation_ticketId_key" ON "RewardAllocation"("ticketId");

-- CreateIndex
CREATE UNIQUE INDEX "LoyaltyIntegration_boothId_eventId_name_key" ON "LoyaltyIntegration"("boothId", "eventId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "BlockedIP_ip_boothId_key" ON "BlockedIP"("ip", "boothId");

-- CreateIndex
CREATE UNIQUE INDEX "Scanner_deviceId_key" ON "Scanner"("deviceId");

-- CreateIndex
CREATE UNIQUE INDEX "MessageThread_boothId_userId_key" ON "MessageThread"("boothId", "userId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_referrerId_fkey" FOREIGN KEY ("referrerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booth" ADD CONSTRAINT "Booth_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_substituteId_fkey" FOREIGN KEY ("substituteId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_boothId_fkey" FOREIGN KEY ("boothId") REFERENCES "Booth"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Wallet" ADD CONSTRAINT "Wallet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_walletId_fkey" FOREIGN KEY ("walletId") REFERENCES "Wallet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_speakerId_fkey" FOREIGN KEY ("speakerId") REFERENCES "Speaker"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Speaker" ADD CONSTRAINT "Speaker_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventProduct" ADD CONSTRAINT "EventProduct_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventProduct" ADD CONSTRAINT "EventProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TicketTier" ADD CONSTRAINT "TicketTier_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TicketTierProduct" ADD CONSTRAINT "TicketTierProduct_ticketTierId_fkey" FOREIGN KEY ("ticketTierId") REFERENCES "TicketTier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TicketTierProduct" ADD CONSTRAINT "TicketTierProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_tierId_fkey" FOREIGN KEY ("tierId") REFERENCES "TicketTier"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "MarketingCampaign"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_salesAssetId_fkey" FOREIGN KEY ("salesAssetId") REFERENCES "SalesAsset"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_boothId_fkey" FOREIGN KEY ("boothId") REFERENCES "Booth"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_boothId_fkey" FOREIGN KEY ("boothId") REFERENCES "Booth"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "MarketingCampaign"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_salesAssetId_fkey" FOREIGN KEY ("salesAssetId") REFERENCES "SalesAsset"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FulfilmentPoint" ADD CONSTRAINT "FulfilmentPoint_boothId_fkey" FOREIGN KEY ("boothId") REFERENCES "Booth"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FulfilmentSlot" ADD CONSTRAINT "FulfilmentSlot_boothId_fkey" FOREIGN KEY ("boothId") REFERENCES "Booth"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LogisticsException" ADD CONSTRAINT "LogisticsException_boothId_fkey" FOREIGN KEY ("boothId") REFERENCES "Booth"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MarketingCampaign" ADD CONSTRAINT "MarketingCampaign_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MarketingCampaign" ADD CONSTRAINT "MarketingCampaign_targetTierId_fkey" FOREIGN KEY ("targetTierId") REFERENCES "TicketTier"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SalesAsset" ADD CONSTRAINT "SalesAsset_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SalesAsset" ADD CONSTRAINT "SalesAsset_tierId_fkey" FOREIGN KEY ("tierId") REFERENCES "TicketTier"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChannelVisit" ADD CONSTRAINT "ChannelVisit_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SalesChannelConfig" ADD CONSTRAINT "SalesChannelConfig_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RewardBalance" ADD CONSTRAINT "RewardBalance_boothId_fkey" FOREIGN KEY ("boothId") REFERENCES "Booth"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RewardBalance" ADD CONSTRAINT "RewardBalance_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RewardAllocation" ADD CONSTRAINT "RewardAllocation_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "MarketingCampaign"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RewardAllocation" ADD CONSTRAINT "RewardAllocation_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "Ticket"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RewardAllocation" ADD CONSTRAINT "RewardAllocation_boothId_fkey" FOREIGN KEY ("boothId") REFERENCES "Booth"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RewardAllocation" ADD CONSTRAINT "RewardAllocation_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoyaltyIntegration" ADD CONSTRAINT "LoyaltyIntegration_boothId_fkey" FOREIGN KEY ("boothId") REFERENCES "Booth"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoyaltyIntegration" ADD CONSTRAINT "LoyaltyIntegration_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoyaltySyncLog" ADD CONSTRAINT "LoyaltySyncLog_integrationId_fkey" FOREIGN KEY ("integrationId") REFERENCES "LoyaltyIntegration"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlockedIP" ADD CONSTRAINT "BlockedIP_boothId_fkey" FOREIGN KEY ("boothId") REFERENCES "Booth"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Scanner" ADD CONSTRAINT "Scanner_boothId_fkey" FOREIGN KEY ("boothId") REFERENCES "Booth"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Scanner" ADD CONSTRAINT "Scanner_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Scanner" ADD CONSTRAINT "Scanner_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "EventStaff"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventStaff" ADD CONSTRAINT "EventStaff_boothId_fkey" FOREIGN KEY ("boothId") REFERENCES "Booth"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventStaff" ADD CONSTRAINT "EventStaff_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FinanceTicket" ADD CONSTRAINT "FinanceTicket_boothId_fkey" FOREIGN KEY ("boothId") REFERENCES "Booth"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MessageThread" ADD CONSTRAINT "MessageThread_boothId_fkey" FOREIGN KEY ("boothId") REFERENCES "Booth"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MessageThread" ADD CONSTRAINT "MessageThread_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_threadId_fkey" FOREIGN KEY ("threadId") REFERENCES "MessageThread"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SupportChatSession" ADD CONSTRAINT "SupportChatSession_boothId_fkey" FOREIGN KEY ("boothId") REFERENCES "Booth"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SupportChatMessage" ADD CONSTRAINT "SupportChatMessage_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "SupportChatSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
