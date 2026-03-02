"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const prisma = new client_1.PrismaClient();
const events = [
    {
        id: "spring2026",
        name: "Global Innovation Fair (Spring 2026)",
        startDate: new Date("2026-04-10"),
        endDate: new Date("2026-04-19"),
        location: "Virtual Main Hall",
        category: "Technology",
        type: "national",
        fullImage: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1000",
        description: "The world's premier digital innovation showcase. Experience cutting-edge tech, AI demonstrations, and keynote speeches from industry leaders.",
        benefits: ["Access to 500+ Booths", "Live Keynotes", "Networking Lounge"],
        rating: 4.8,
        reviews: 124,
        videoUrl: "#",
        organizer: "TechGlobal Inc.",
        status: client_1.EventStatus.PUBLISHED,
        price: 0,
        capacity: 1000,
    },
    {
        id: "summer2026",
        name: "Summer Trade Carnival",
        startDate: new Date("2026-07-15"),
        endDate: new Date("2026-07-24"),
        location: "Expo Center Alpha",
        category: "Trade",
        type: "platform-led",
        fullImage: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=1000",
        description: "A vibrant marketplace for global traders. Source products, meet suppliers, and explore new market trends in a festive digital environment.",
        benefits: ["Direct Supplier Chat", "Wholesale Deals", "Export Workshops"],
        rating: 4.5,
        reviews: 89,
        videoUrl: "#",
        organizer: "World Trade Org",
        status: client_1.EventStatus.PUBLISHED,
        price: 0,
        capacity: 1000,
    },
    {
        id: "techsummit",
        name: "Future Tech Summit",
        startDate: new Date("2026-08-05"),
        endDate: new Date("2026-08-08"),
        location: "Innovation Hub",
        category: "Technology",
        type: "business-led",
        fullImage: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=1000",
        description: "Deep dive into the future of humanity and technology. Workshops on quantum computing, biotech, and space exploration.",
        benefits: ["Certified Workshops", "Expert Q&A", "Digital Courseware"],
        rating: 4.9,
        reviews: 210,
        videoUrl: "#",
        organizer: "Future Minds",
        status: client_1.EventStatus.PUBLISHED,
        price: 0,
        capacity: 1000,
    },
    {
        id: "creative",
        name: "Digital Arts Expo",
        startDate: new Date("2026-09-12"),
        endDate: new Date("2026-09-14"),
        location: "Creative Quarter",
        category: "Art",
        type: "platform-led",
        fullImage: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=1000",
        description: "Celebrating digital creativity. NFT galleries, 3D art showcases, and live digital painting sessions.",
        benefits: ["NFT Drops", "Artist Meetups", "Creative Tools Demo"],
        rating: 4.7,
        reviews: 56,
        videoUrl: "#",
        organizer: "ArtBlock",
        status: client_1.EventStatus.PUBLISHED,
        price: 0,
        capacity: 1000,
    },
    {
        id: "health",
        name: "Global Health Symposium",
        startDate: new Date("2026-10-20"),
        endDate: new Date("2026-10-22"),
        location: "Health Wing",
        category: "Health",
        type: "business-led",
        fullImage: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=1000",
        description: "Connecting global health professionals. Discussions on longevity, digital health records, and telemedicine.",
        benefits: ["CME Credits", "Expert Panels", "Health Tech Showcase"],
        rating: 4.6,
        reviews: 78,
        videoUrl: "#",
        organizer: "Global Health Alliance",
        status: client_1.EventStatus.PUBLISHED,
        price: 0,
        capacity: 1000,
    },
    {
        id: "green",
        name: "Sustainable Energy Conclave",
        startDate: new Date("2026-11-15"),
        endDate: new Date("2026-11-18"),
        location: "Eco Center",
        category: "Environment",
        type: "national",
        fullImage: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1000",
        description: "Driving the green transition. Focused on renewable energy, carbon capture, and sustainable urban design.",
        benefits: ["Investor Networking", "Policy Briefings", "Green Tech Demos"],
        rating: 4.8,
        reviews: 95,
        videoUrl: "#",
        organizer: "EcoVision",
        status: client_1.EventStatus.PUBLISHED,
        price: 0,
        capacity: 1000,
    },
    {
        id: "fintech",
        name: "Global Fintech Summit",
        startDate: new Date("2026-12-01"),
        endDate: new Date("2026-12-03"),
        location: "Financial District",
        category: "Finance",
        type: "business-led",
        fullImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000",
        description: "Exploring the future of money. Blockchain, decentralized finance, and the next generation of banking.",
        benefits: ["Investor Pitches", "Regulation Updates", "Fintech Demos"],
        rating: 4.7,
        reviews: 112,
        videoUrl: "#",
        organizer: "Finance Forward",
        status: client_1.EventStatus.PUBLISHED,
        price: 0,
        capacity: 1000,
    },
    {
        id: "retail",
        name: "Future of Retail Expo",
        startDate: new Date("2027-01-12"),
        endDate: new Date("2027-01-15"),
        location: "Commerce Hub",
        category: "Retail",
        type: "platform-led",
        fullImage: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1000",
        description: "Transforming the shopping experience. AR/VR in retail, omnichannel strategies, and consumer behavior analysis.",
        benefits: ["Retail Tech Demos", "Supply Chain Insights", "Brand Strategy"],
        rating: 4.6,
        reviews: 84,
        videoUrl: "#",
        organizer: "Retail Innovators",
        status: client_1.EventStatus.PUBLISHED,
        price: 0,
        capacity: 1000,
    },
    {
        id: "education",
        name: "EdTech World Congress",
        startDate: new Date("2027-02-20"),
        endDate: new Date("2027-02-22"),
        location: "Learning Lab",
        category: "Education",
        type: "national",
        fullImage: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=1000",
        description: "The future of learning. AI in education, virtual classrooms, and lifelong learning platforms.",
        benefits: ["Teacher Workshops", "Curriculum Design", "EdTech Startup Showcase"],
        rating: 4.8,
        reviews: 136,
        videoUrl: "#",
        organizer: "Learning Network",
        status: client_1.EventStatus.PUBLISHED,
        price: 0,
        capacity: 1000,
    },
];
async function main() {
    console.log('Seeding marketplace events...');
    try {
        for (const event of events) {
            const { rating, reviews, ...eventData } = event;
            await prisma.event.upsert({
                where: { id: eventData.id },
                update: { ...eventData, rating: Number(rating), reviews: Number(reviews) },
                create: { ...eventData, rating: Number(rating), reviews: Number(reviews) },
            });
        }
        console.log('Seeding completed successfully.');
    }
    catch (error) {
        console.error('Seeding failed:', error);
    }
    finally {
        await prisma.$disconnect();
    }
}
main();
//# sourceMappingURL=populate-marketplace.js.map