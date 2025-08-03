export interface LoyaltyProgram {
    id: number;
    name: string;
    description: string;
    benefits: string[];
}

export interface Hotel {
    id: number;
    name: string;
    rating: number;
    image: string;
    originalPrice: number;
    discountedPrice: number;
    discount: number;
    validity: string;
    conditions: string;
    location: string;
}

export interface Offer {
    id: number;
    title: string;
    description: string;
    image: string;
}

export interface Idea {
    id: number;
    name: string;
    country: string;
    image: string;
    rating: number;
    price: string;
    description: string;
}

export const loyaltyProgram: LoyaltyProgram[] = [
    {
        id: 1,
        name: "Loyalty Program A",
        description: "Earn points with every booking.",
        benefits: ["Free breakfast", "Late checkout", "Room upgrades"],
    },
    {
        id: 2,
        name: "Loyalty Program B",
        description: "Exclusive discounts for members.",
        benefits: ["10% off bookings", "Priority support"],
    },
    {
        id: 3,
        name: "Loyalty Program C",
        description: "Special offers and rewards.",
        benefits: ["Free nights", "Gift vouchers"],
    },
    {
        id: 4,
        name: "Loyalty Program D",
        description: "Personalized travel experiences.",
        benefits: ["Custom itineraries", "Exclusive events"],
    },
    {
        id: 5,
        name: "Loyalty Program E",
        description: "Access to premium services.",
        benefits: ["Concierge service", "Airport transfers"],
    },
];

export const weekendHotels: Hotel[] = [
    {
        id: 1,
        name: "Grand Plaza Hotel",
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400",
        originalPrice: 1200,
        discountedPrice: 850,
        discount: 29,
        validity: "8-10 August",
        conditions: "Free cancellation • Breakfast included",
        location: "Downtown Istanbul",
    },
    {
        id: 2,
        name: "Seaside Resort & Spa",
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400",
        originalPrice: 1800,
        discountedPrice: 1200,
        discount: 33,
        validity: "8-10 August",
        conditions: "Non-refundable • All inclusive",
        location: "Antalya Coast",
    },
    {
        id: 3,
        name: "Mountain View Lodge",
        rating: 4.4,
        image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400",
        originalPrice: 950,
        discountedPrice: 650,
        discount: 32,
        validity: "8-10 August",
        conditions: "Free cancellation • Parking included",
        location: "Bolu Mountains",
    },
    {
        id: 4,
        name: "Urban Boutique Hotel",
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400",
        originalPrice: 1100,
        discountedPrice: 750,
        discount: 32,
        validity: "8-10 August",
        conditions: "Free cancellation • WiFi included",
        location: "Kadıköy, Istanbul",
    },
];

export const offers: Offer[] = [
    {
        id: 1,
        title: "Summer Sale",
        description: "Up to 50% off on summer bookings.",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400",
    },
];

export const ideas: Idea[] = [
    {
        id: 1,
        name: "Santorini",
        country: "Greece",
        image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=400",
        rating: 4.9,
        price: "₺2,500",
        description: "Stunning sunsets and white architecture"
    },
    {
        id: 2,
        name: "Bali",
        country: "Indonesia",
        image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=400",
        rating: 4.8,
        price: "₺3,200",
        description: "Tropical paradise with rich culture"
    },
    {
        id: 3,
        name: "Tokyo",
        country: "Japan",
        image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400",
        rating: 4.7,
        price: "₺4,500",
        description: "Modern city with traditional charm"
    },
    {
        id: 4,
        name: "New York",
        country: "USA",
        image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400",
        rating: 4.6,
        price: "₺5,800",
        description: "The city that never sleeps"
    },
    {
        id: 5,
        name: "Paris",
        country: "France",
        image: "https://images.unsplash.com/photo-1502602898534-861c1a3c1b4b?w=400",
        rating: 4.9,
        price: "₺3,900",
        description: "City of love and lights"
    },
    {
        id: 6,
        name: "Dubai",
        country: "UAE",
        image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400",
        rating: 4.5,
        price: "₺4,200",
        description: "Luxury shopping and modern architecture"
    }
]; 