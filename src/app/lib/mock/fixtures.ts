// Mock catalog used when the app runs with no database (MVP / demo mode).
// Everything here is local: no API keys, no network calls.

type Rel = Record<string, unknown>;

const now = new Date("2025-01-15T10:00:00.000Z");

const SIZES = ["S", "M", "L", "XL"] as const;
const SIZE_STOCK = [8, 14, 11, 6];

type ProductSeed = {
  id: string;
  name: string;
  description: string;
  categoryId: number;
  sellingPrice: number;
  discount: number | null;
  costPrice: number;
  stockQty: number;
  brand: string;
  material: string;
  originCountry: string;
  mainImgUrl: string;
  colors: { id: string; color: string; hexCode: string; stockQty: number }[];
  gallery: string[];
  features: { key: string; value: string }[];
  tags: string[];
  reviews: {
    id: string;
    rating: number;
    title: string;
    comment: string;
    images: string[];
    verified: boolean;
  }[];
};

const seeds: ProductSeed[] = [
  {
    id: "prod_men_01",
    name: "Classic Oxford Shirt",
    description:
      "A timeless Oxford shirt cut from brushed cotton. Pairs with denim or chinos and holds its shape wash after wash.",
    categoryId: 1,
    sellingPrice: 2499,
    discount: 10,
    costPrice: 1100,
    stockQty: 39,
    brand: "Samir Essentials",
    material: "100% Cotton",
    originCountry: "Nepal",
    mainImgUrl: "/freemen.png",
    colors: [
      { id: "col_men_01_a", color: "Sky Blue", hexCode: "#8EC5FC", stockQty: 14 },
      { id: "col_men_01_b", color: "White", hexCode: "#F5F5F5", stockQty: 15 },
      { id: "col_men_01_c", color: "Charcoal", hexCode: "#36454F", stockQty: 10 },
    ],
    gallery: ["/freemen.png", "/freemen2.png", "/insta1.jpg"],
    features: [
      { key: "Fit", value: "Regular fit" },
      { key: "Care", value: "Machine wash cold" },
    ],
    tags: ["shirt", "formal", "cotton"],
    reviews: [
      {
        id: "rev_01",
        rating: 5,
        title: "Best shirt I own",
        comment: "Fabric feels premium and the fit is exactly as described.",
        images: ["/insta1.jpg"],
        verified: true,
      },
      {
        id: "rev_02",
        rating: 4,
        title: "Great value",
        comment: "Holds up well after multiple washes. Slightly long in the sleeves.",
        images: [],
        verified: true,
      },
    ],
  },
  {
    id: "prod_men_02",
    name: "Heritage Wool Coat",
    description:
      "Double-breasted overcoat in melton wool with a quilted lining — built for cold mornings and long commutes.",
    categoryId: 1,
    sellingPrice: 8999,
    discount: 15,
    costPrice: 4200,
    stockQty: 18,
    brand: "Northline",
    material: "Wool blend",
    originCountry: "India",
    mainImgUrl: "/coat.png",
    colors: [
      { id: "col_men_02_a", color: "Camel", hexCode: "#C19A6B", stockQty: 8 },
      { id: "col_men_02_b", color: "Black", hexCode: "#111111", stockQty: 10 },
    ],
    gallery: ["/coat.png", "/metaImg.jpg"],
    features: [
      { key: "Lining", value: "Quilted satin" },
      { key: "Pockets", value: "4 external, 2 internal" },
    ],
    tags: ["coat", "winter", "outerwear"],
    reviews: [
      {
        id: "rev_03",
        rating: 5,
        title: "Warm and sharp",
        comment: "Gets compliments every time. True to size.",
        images: ["/insta2.jpg"],
        verified: true,
      },
    ],
  },
  {
    id: "prod_men_03",
    name: "Everyday Cotton Tee",
    description:
      "Mid-weight crew neck tee with a pre-shrunk body. The one you reach for on busy days.",
    categoryId: 1,
    sellingPrice: 999,
    discount: null,
    costPrice: 380,
    stockQty: 64,
    brand: "Samir Essentials",
    material: "Combed cotton",
    originCountry: "Nepal",
    mainImgUrl: "/freemen2.png",
    colors: [
      { id: "col_men_03_a", color: "Olive", hexCode: "#708238", stockQty: 22 },
      { id: "col_men_03_b", color: "Navy", hexCode: "#1B2A4A", stockQty: 24 },
      { id: "col_men_03_c", color: "Stone", hexCode: "#9C9B98", stockQty: 18 },
    ],
    gallery: ["/freemen2.png", "/freemen.png"],
    features: [
      { key: "GSM", value: "180 GSM" },
      { key: "Neck", value: "Ribbed crew" },
    ],
    tags: ["t-shirt", "casual"],
    reviews: [
      {
        id: "rev_04",
        rating: 4,
        title: "Soft and sturdy",
        comment: "Colour has not faded after a month of wear.",
        images: [],
        verified: false,
      },
    ],
  },
  {
    id: "prod_men_04",
    name: "Slim Tapered Denim",
    description:
      "Stretch denim with a tapered leg and mid rise. Comfortable through a full day of movement.",
    categoryId: 1,
    sellingPrice: 3499,
    discount: 20,
    costPrice: 1500,
    stockQty: 27,
    brand: "Rivet Co.",
    material: "98% Cotton, 2% Elastane",
    originCountry: "Bangladesh",
    mainImgUrl: "/dito.png",
    colors: [
      { id: "col_men_04_a", color: "Indigo", hexCode: "#1F3A5F", stockQty: 15 },
      { id: "col_men_04_b", color: "Black", hexCode: "#111111", stockQty: 12 },
    ],
    gallery: ["/dito.png", "/dito2.png"],
    features: [
      { key: "Rise", value: "Mid rise" },
      { key: "Stretch", value: "2-way stretch" },
    ],
    tags: ["denim", "jeans"],
    reviews: [
      {
        id: "rev_05",
        rating: 5,
        title: "Perfect taper",
        comment: "Fits like it was tailored. Order your usual size.",
        images: ["/insta3.jpg"],
        verified: true,
      },
      {
        id: "rev_06",
        rating: 3,
        title: "Runs a bit long",
        comment: "Great fabric, but size down if you are between sizes.",
        images: [],
        verified: false,
      },
    ],
  },
  {
    id: "prod_men_05",
    name: "Performance Polo",
    description:
      "Breathable knit polo with a structured collar — office to weekend without missing a beat.",
    categoryId: 1,
    sellingPrice: 1899,
    discount: 5,
    costPrice: 760,
    stockQty: 31,
    brand: "Northline",
    material: "Pique cotton",
    originCountry: "India",
    mainImgUrl: "/insta4.jpg",
    colors: [
      { id: "col_men_05_a", color: "Forest Green", hexCode: "#228B22", stockQty: 16 },
      { id: "col_men_05_b", color: "Ivory", hexCode: "#FFFFF0", stockQty: 15 },
    ],
    gallery: ["/insta4.jpg", "/insta5.jpg"],
    features: [
      { key: "Collar", value: "Ribbed, holds shape" },
      { key: "Breathability", value: "Moisture wicking" },
    ],
    tags: ["polo", "smart-casual"],
    reviews: [
      {
        id: "rev_07",
        rating: 4,
        title: "Very breathable",
        comment: "Wore it through a hot day and stayed comfortable.",
        images: [],
        verified: true,
      },
    ],
  },
  {
    id: "prod_men_06",
    name: "Utility Chino Shorts",
    description:
      "Knee-length chinos in a garment-dyed finish with side pockets and a clean hem.",
    categoryId: 1,
    sellingPrice: 1799,
    discount: null,
    costPrice: 700,
    stockQty: 22,
    brand: "Rivet Co.",
    material: "Cotton twill",
    originCountry: "Nepal",
    mainImgUrl: "/freepick.png",
    colors: [
      { id: "col_men_06_a", color: "Khaki", hexCode: "#C3B091", stockQty: 12 },
      { id: "col_men_06_b", color: "Slate", hexCode: "#708090", stockQty: 10 },
    ],
    gallery: ["/freepick.png"],
    features: [{ key: "Inseam", value: "9 inch" }],
    tags: ["shorts", "summer"],
    reviews: [],
  },
  {
    id: "prod_wom_01",
    name: "Flow Midi Dress",
    description:
      "A floaty midi dress with a smocked waist and side pockets — dress it up or down in seconds.",
    categoryId: 2,
    sellingPrice: 4299,
    discount: 12,
    costPrice: 1900,
    stockQty: 26,
    brand: "Aster",
    material: "Viscose blend",
    originCountry: "Nepal",
    mainImgUrl: "/women.png",
    colors: [
      { id: "col_wom_01_a", color: "Terracotta", hexCode: "#E2725B", stockQty: 11 },
      { id: "col_wom_01_b", color: "Midnight", hexCode: "#191970", stockQty: 9 },
      { id: "col_wom_01_c", color: "Sage", hexCode: "#B2AC98", stockQty: 6 },
    ],
    gallery: ["/women.png", "/heroine.png", "/insta.jpg"],
    features: [
      { key: "Length", value: "Midi" },
      { key: "Pockets", value: "Side seam pockets" },
    ],
    tags: ["dress", "summer", "occasion"],
    reviews: [
      {
        id: "rev_08",
        rating: 5,
        title: "Flattering fit",
        comment: "The smocked waist is forgiving and the fabric does not crease.",
        images: ["/insta.jpg"],
        verified: true,
      },
      {
        id: "rev_09",
        rating: 4,
        title: "Beautiful colour",
        comment: "Terracotta looks even better in person.",
        images: [],
        verified: true,
      },
    ],
  },
  {
    id: "prod_wom_02",
    name: "Structured Blazer",
    description:
      "Single-button blazer with light shoulder padding and a fully lined interior.",
    categoryId: 2,
    sellingPrice: 6499,
    discount: 18,
    costPrice: 3100,
    stockQty: 14,
    brand: "Aster",
    material: "Poly wool",
    originCountry: "India",
    mainImgUrl: "/heroine.png",
    colors: [
      { id: "col_wom_02_a", color: "Black", hexCode: "#111111", stockQty: 8 },
      { id: "col_wom_02_b", color: "Cream", hexCode: "#F3E5C0", stockQty: 6 },
    ],
    gallery: ["/heroine.png", "/women.png"],
    features: [
      { key: "Lining", value: "Full lining" },
      { key: "Closure", value: "Single button" },
    ],
    tags: ["blazer", "workwear"],
    reviews: [
      {
        id: "rev_10",
        rating: 5,
        title: "Office staple",
        comment: "Sharp shoulders without looking costume-y.",
        images: ["/insta4.jpg"],
        verified: true,
      },
    ],
  },
  {
    id: "prod_wom_03",
    name: "High-Rise Straight Jeans",
    description:
      "Rigid-look stretch denim with a high rise and a straight leg that clears the ankle.",
    categoryId: 2,
    sellingPrice: 3799,
    discount: null,
    costPrice: 1600,
    stockQty: 33,
    brand: "Rivet Co.",
    material: "99% Cotton, 1% Elastane",
    originCountry: "Bangladesh",
    mainImgUrl: "/fourbyfive.png",
    colors: [
      { id: "col_wom_03_a", color: "Medium Wash", hexCode: "#7B9BD1", stockQty: 18 },
      { id: "col_wom_03_b", color: "Ecru", hexCode: "#EDE6D6", stockQty: 15 },
    ],
    gallery: ["/fourbyfive.png", "/metaImg.jpg"],
    features: [
      { key: "Rise", value: "High rise" },
      { key: "Length", value: "Full length" },
    ],
    tags: ["denim", "jeans"],
    reviews: [
      {
        id: "rev_11",
        rating: 4,
        title: "Holds shape",
        comment: "No sagging at the knees after a full day.",
        images: [],
        verified: false,
      },
    ],
  },
  {
    id: "prod_wom_04",
    name: "Ribbed Knit Sweater",
    description:
      "Relaxed crew-neck knit with dropped shoulders and a soft, chunky hand feel.",
    categoryId: 2,
    sellingPrice: 2999,
    discount: 8,
    costPrice: 1250,
    stockQty: 29,
    brand: "Northline",
    material: "Merino blend",
    originCountry: "India",
    mainImgUrl: "/insta5.jpg",
    colors: [
      { id: "col_wom_04_a", color: "Burgundy", hexCode: "#800020", stockQty: 14 },
      { id: "col_wom_04_b", color: "Camel", hexCode: "#C19A6B", stockQty: 15 },
    ],
    gallery: ["/insta5.jpg", "/insta3.jpg"],
    features: [{ key: "Knit", value: "7 gauge rib" }],
    tags: ["knitwear", "winter"],
    reviews: [
      {
        id: "rev_12",
        rating: 5,
        title: "So soft",
        comment: "Not itchy at all, and the colour is rich.",
        images: ["/insta5.jpg"],
        verified: true,
      },
    ],
  },
  {
    id: "prod_wom_05",
    name: "Pleated Tennis Skirt",
    description:
      "Pleated mini with built-in shorts and a side pocket — court to coffee runs.",
    categoryId: 2,
    sellingPrice: 2199,
    discount: null,
    costPrice: 850,
    stockQty: 24,
    brand: "Aster",
    material: "Polyester twill",
    originCountry: "Nepal",
    mainImgUrl: "/naive.jpg",
    colors: [
      { id: "col_wom_05_a", color: "White", hexCode: "#F5F5F5", stockQty: 13 },
      { id: "col_wom_05_b", color: "Black", hexCode: "#111111", stockQty: 11 },
    ],
    gallery: ["/naive.jpg"],
    features: [{ key: "Lining", value: "Built-in shorts" }],
    tags: ["skirt", "sporty"],
    reviews: [],
  },
  {
    id: "prod_wom_06",
    name: "Linen Blend Shirt",
    description:
      "Airy camp-collar shirt in a linen blend with a boxy cut and mother-of-pearl buttons.",
    categoryId: 2,
    sellingPrice: 2599,
    discount: 10,
    costPrice: 1050,
    stockQty: 20,
    brand: "Samir Essentials",
    material: "Linen cotton blend",
    originCountry: "Nepal",
    mainImgUrl: "/fashion.png",
    colors: [
      { id: "col_wom_06_a", color: "Sand", hexCode: "#E6D7B8", stockQty: 9 },
      { id: "col_wom_06_b", color: "Seafoam", hexCode: "#93E9BE", stockQty: 11 },
    ],
    gallery: ["/fashion.png", "/insta2.jpg"],
    features: [{ key: "Collar", value: "Camp collar" }],
    tags: ["shirt", "linen", "summer"],
    reviews: [
      {
        id: "rev_13",
        rating: 4,
        title: "Perfect for hot days",
        comment: "Light, airy and does not cling.",
        images: [],
        verified: true,
      },
    ],
  },
];

export const DEMO_USER_ID = "demo-customer";
export const DEMO_USER_EMAIL = "demo@clothingstore.dev";

function buildProducts() {
  const products: Rel[] = [];
  const colors: Rel[] = [];
  const sizes: Rel[] = [];
  const features: Rel[] = [];
  const tags: Rel[] = [];
  const images: Rel[] = [];
  const reviews: Rel[] = [];

  for (const seed of seeds) {
    products.push({
      id: seed.id,
      name: seed.name,
      description: seed.description,
      sellingPrice: seed.sellingPrice,
      costPrice: seed.costPrice,
      discount: seed.discount,
      stockQty: seed.stockQty,
      categoryId: seed.categoryId,
      brand: seed.brand,
      material: seed.material,
      originCountry: seed.originCountry,
      mainImgUrl: seed.mainImgUrl,
      createdAt: now,
      updatedAt: now,
    });

    for (const color of seed.colors) {
      colors.push({
        id: color.id,
        productId: seed.id,
        color: color.color,
        hexCode: color.hexCode,
        stockQty: color.stockQty,
      });
    }

    SIZES.forEach((size, index) => {
      sizes.push({
        id: `sz_${seed.id}_${size}`,
        productId: seed.id,
        size,
        stockQty: SIZE_STOCK[index],
      });
    });

    seed.features.forEach((feature, index) => {
      features.push({
        id: `ft_${seed.id}_${index}`,
        productId: seed.id,
        key: feature.key,
        value: feature.value,
      });
    });

    seed.tags.forEach((name, index) => {
      tags.push({ id: `tg_${seed.id}_${index}`, productId: seed.id, name });
    });

    seed.gallery.forEach((url, index) => {
      images.push({
        id: `img_${seed.id}_${index}`,
        productId: seed.id,
        url,
        alt: `${seed.name} view ${index + 1}`,
        productColorId: index === 0 ? seed.colors[0].id : null,
      });
    });

    seed.reviews.forEach((review) => {
      reviews.push({
        id: review.id,
        productId: seed.id,
        customerId: DEMO_USER_ID,
        rating: review.rating,
        comment: review.comment,
        title: review.title,
        images: review.images,
        verified: review.verified,
        videos: "",
        createdAt: now,
      });
    });
  }

  return { products, colors, sizes, features, tags, images, reviews };
}

const catalog = buildProducts();

const orderOne = "ord_demo_01";
const orderTwo = "ord_demo_02";

export function buildSeedData(): Record<string, Rel[]> {
  return {
    category: [
      { id: 1, name: "male", description: "Men's clothing" },
      { id: 2, name: "female", description: "Women's clothing" },
    ],
    product: catalog.products,
    productColor: catalog.colors,
    productSize: catalog.sizes,
    productFeature: catalog.features,
    tag: catalog.tags,
    productImage: catalog.images,
    review: catalog.reviews,
    customer: [
      {
        id: DEMO_USER_ID,
        name: "Demo User",
        email: DEMO_USER_EMAIL,
        userAvatarUrl: "/user.svg",
        provider: "mock",
        providerId: DEMO_USER_ID,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: "cust_demo_02",
        name: "Aarav Sharma",
        email: "aarav@example.com",
        userAvatarUrl: "/user.svg",
        provider: "mock",
        providerId: "cust_demo_02",
        createdAt: now,
        updatedAt: now,
      },
    ],
    admin: [
      {
        id: DEMO_USER_ID,
        name: "Demo User",
        email: DEMO_USER_EMAIL,
        userAvatarUrl: "/user.svg",
        createdAt: now,
      },
    ],
    cart: [],
    wishlistItem: [
      {
        id: "wsh_demo_01",
        customerId: DEMO_USER_ID,
        productId: "prod_wom_01",
        createdAt: now,
      },
    ],
    order: [
      {
        id: orderOne,
        customerId: DEMO_USER_ID,
        totalAmount: 5498,
        status: "DELIVERED",
        createdAt: new Date("2025-01-05T09:30:00.000Z"),
      },
      {
        id: orderTwo,
        customerId: "cust_demo_02",
        totalAmount: 8999,
        status: "PROCESSING",
        createdAt: new Date("2025-01-12T14:15:00.000Z"),
      },
    ],
    orderItem: [
      {
        id: "oit_demo_01",
        orderId: orderOne,
        productId: "prod_men_01",
        quantity: 2,
        price: 2499,
        couponDiscount: 0,
        shippingCost: 200,
        taxes: 300,
      },
      {
        id: "oit_demo_02",
        orderId: orderTwo,
        productId: "prod_men_02",
        quantity: 1,
        price: 8999,
        couponDiscount: 0,
        shippingCost: 250,
        taxes: 600,
      },
    ],
  };
}
