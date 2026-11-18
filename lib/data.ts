import type { Product, ProductCategory, User, Order, NotificationItem } from "./types";

const img = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=75`;

export const categories: { name: ProductCategory; title: string; description: string; icon: string }[] = [
  {
    name: "Poultry & Live Birds",
    title: "Poultry & Live Birds",
    description: "Day-old chicks, broilers, layers, cockerels, point-of-lay birds and turkeys from healthy, well-managed flocks.",
    icon: "bird",
  },
  {
    name: "Fishery Products",
    title: "Fishery Products",
    description: "Live and smoked catfish, tilapia and other processed fish products raised under careful water-quality management.",
    icon: "fish",
  },
  {
    name: "Livestock",
    title: "Livestock",
    description: "Healthy rabbits, goats and cattle with breed, weight and health records available for every animal.",
    icon: "goat",
  },
  {
    name: "Feeds & Equipment",
    title: "Feeds & Equipment",
    description: "Quality poultry and catfish feeds, cages, brooding systems, drinkers, feeders and farm machinery.",
    icon: "wheat",
  },
  {
    name: "Processed Products",
    title: "Processed Products",
    description: "Processed chicken, smoked chicken, smoked fish and eggs handled to strict food-safety standards.",
    icon: "flame",
  },
  {
    name: "Consulting Services",
    title: "Farm Consulting",
    description: "Professional farm setup, production, operations and management advisory delivered by our experienced team.",
    icon: "lightbulb",
  },
];

export const products: Product[] = [
  {
    id: "p1", slug: "day-old-chicks", name: "Day-Old Chicks", category: "Poultry & Live Birds",
    shortDescription: "Vigorous, vaccinated day-old broiler and layer chicks from certified parent stock.",
    description: "Our day-old chicks are sourced from reputable hatcheries, carefully selected for vigour and uniformity. Every batch is accompanied by vaccination records and health documentation. We advise on brooding requirements and can supply matching feeds and brooding equipment.",
    price: 1250, unit: "per chick", minOrder: 50, stock: 4200, featured: true, badge: "Best seller",
    image: img("photo-1582722872445-44dc5f7e3c8f"), variants: [{ label: "Broiler" }, { label: "Layer" }, { label: "Cockerel" }],
    specifications: [{ label: "Breeds", value: "Ross 308, Cobb 500, ISA Brown" }, { label: "Vaccination", value: "Marek's, Newcastle, IBD" }, { label: "Minimum order", value: "50 chicks" }],
    storage: "Keep in a clean, warm brooding environment at 32–35°C for the first week.", rating: 4.9, reviewCount: 128, tags: ["chicks", "poultry", "hatchery"],
  },
  {
    id: "p2", slug: "live-broilers", name: "Live Broilers", category: "Poultry & Live Birds",
    shortDescription: "Market-ready broilers raised on quality feed with full batch traceability.",
    description: "Healthy, market-ready broilers available in batches. Birds are reared under a controlled feeding and health programme, and can be supplied live or sent for processing. Weight and final invoice are confirmed before dispatch.",
    price: 4200, unit: "per kg (estimated)", minOrder: 20, stock: 860, estimatedWeight: true, featured: true,
    image: img("photo-1590165482129-1b8b27698780"), variants: [{ label: "4–5 kg live weight" }, { label: "Processing ready" }],
    specifications: [{ label: "Average weight", value: "2.0 – 2.8 kg" }, { label: "Feed programme", value: "Broiler starter / finisher" }, { label: "Batch records", value: "Available on request" }],
    storage: "Transport in well-ventilated crates; process or slaughter promptly on arrival.", rating: 4.8, reviewCount: 96, tags: ["broiler", "chicken", "live"],
  },
  {
    id: "p3", slug: "point-of-lay-birds", name: "Point-of-Lay Birds", category: "Poultry & Live Birds",
    shortDescription: "Healthy pullets ready to begin laying, with vaccination and production records.",
    description: "Point-of-lay pullets raised to the onset of production. Each batch is monitored for weight uniformity, vaccination status and general health to give your layer operation the best possible start.",
    price: 4800, unit: "per bird", minOrder: 20, stock: 340,
    image: img("photo-1548550023-2bdb3c5beed7"), variants: [{ label: "ISA Brown" }, { label: "Novogen" }],
    specifications: [{ label: "Age", value: "17 – 20 weeks" }, { label: "Breed", value: "ISA Brown, Novogen" }, { label: "Vaccination", value: "Complete to point of lay" }], rating: 4.7, reviewCount: 54, tags: ["layers", "pullets", "eggs"],
  },
  {
    id: "p4", slug: "live-catfish", name: "Live Catfish", category: "Fishery Products",
    shortDescription: "Fresh, active catfish raised in monitored ponds and graded to your required size.",
    description: "Our catfish are raised under strict water-quality and feeding regimes. Fish are graded by size, weighed at dispatch and delivered in oxygenated containers. Final weight may differ from the estimated order weight and is confirmed before dispatch.",
    price: 1800, unit: "per kg (estimated)", minOrder: 10, stock: 1250, estimatedWeight: true, featured: true,
    image: img("photo-1519708227418-c8fd9a32b7a2"), variants: [{ label: "500g – 800g" }, { label: "800g – 1.2kg" }, { label: "1.2kg+" }],
    specifications: [{ label: "Species", value: "Clarias gariepinus" }, { label: "Pond system", value: "Earthen & concrete ponds" }, { label: "Delivery", value: "Oxygenated water tanks" }],
    storage: "Keep in clean, oxygenated water. Deliver and process on the same day where possible.", rating: 4.9, reviewCount: 212, tags: ["catfish", "live fish", "pond"],
  },
  {
    id: "p5", slug: "live-tilapia", name: "Live Tilapia", category: "Fishery Products",
    shortDescription: "Healthy tilapia graded to size and delivered fresh from our ponds.",
    description: "Farm-raised tilapia available in a range of sizes for households, restaurants and retailers. Each harvest is sampled for health and average weight before it is offered for sale.",
    price: 1450, unit: "per kg (estimated)", minOrder: 10, stock: 620, estimatedWeight: true,
    image: img("photo-1559827260-dc66d52bef19"), variants: [{ label: "200g – 400g" }, { label: "400g – 700g" }],
    specifications: [{ label: "Species", value: "Oreochromis niloticus" }, { label: "Harvest", value: "Selective seining" }, { label: "Water quality", value: "Monitored daily" }], rating: 4.7, reviewCount: 78, tags: ["tilapia", "fish", "live"],
  },
  {
    id: "p6", slug: "smoked-catfish", name: "Smoked Catfish", category: "Processed Products",
    shortDescription: "Firm, flavourful smoked catfish prepared under controlled smoking and hygiene procedures.",
    description: "Fresh catfish cleaned, brined and smoked under controlled conditions to produce a firm, well-flavoured product with an extended shelf life. Ideal for restaurants, retailers and household use.",
    price: 3200, unit: "per kg", minOrder: 2, stock: 148, featured: true, badge: "Quality assured",
    image: img("photo-1599084993091-1cb5c0721cc6"), variants: [{ label: "Medium" }, { label: "Large" }, { label: "Extra large" }],
    specifications: [{ label: "Process", value: "Cleaned, brined, kiln-smoked" }, { label: "Shelf life", value: "Up to 6 months when refrigerated" }, { label: "Batch tracking", value: "Production date and batch recorded" }],
    storage: "Keep refrigerated or in a cool, dry place. Reseal after opening.", rating: 4.8, reviewCount: 143, tags: ["smoked", "catfish", "processed"],
  },
  {
    id: "p7", slug: "processed-chicken", name: "Processed Chicken", category: "Processed Products",
    shortDescription: "Cleanly processed chicken portions, hygienically packed and ready for your kitchen.",
    description: "Whole birds and portions processed under strict hygiene controls and packed for retail or food-service use. Cold-chain handling is maintained from processing to dispatch.",
    price: 2900, unit: "per kg", minOrder: 3, stock: 210,
    image: img("photo-1626645738196-c2a7c87a8f58"), variants: [{ label: "Whole bird" }, { label: "Breast" }, { label: "Thigh" }, { label: "Wings" }],
    specifications: [{ label: "Processing", value: "Hygienic slaughter and dressing" }, { label: "Packing", value: "Vacuum or sealed trays" }, { label: "Cold chain", value: "Maintained to dispatch" }],
    storage: "Keep frozen below -18°C. Thaw under refrigeration before use.", rating: 4.8, reviewCount: 167, tags: ["chicken", "processed", "frozen"],
  },
  {
    id: "p8", slug: "smoked-chicken", name: "Smoked Chicken", category: "Processed Products",
    shortDescription: "Tender, smoked whole chicken with a rich, consistent flavour.",
    description: "Our smoked chicken is prepared from healthy birds and smoked with carefully selected wood for a distinctive flavour. Popular with restaurants, hotels and delicatessens.",
    price: 3500, unit: "per kg", minOrder: 2, stock: 64,
    image: img("photo-1598103442097-8b74394b95c6"), variants: [{ label: "Whole" }, { label: "Half" }],
    specifications: [{ label: "Preparation", value: "Brined and slow-smoked" }, { label: "Shelf life", value: "5 days refrigerated" }], rating: 4.9, reviewCount: 61, tags: ["smoked", "chicken"],
  },
  {
    id: "p9", slug: "rabbits", name: "Rabbits", category: "Livestock",
    shortDescription: "Healthy, well-fed rabbits available in a range of breeds and weights.",
    description: "Rabbits raised on balanced feed and clean housing. We supply breeding stock and meat rabbits with health and feeding records for each batch.",
    price: 6500, unit: "per rabbit", minOrder: 2, stock: 78, estimatedWeight: true,
    image: img("photo-1585110396000-c9ffd4e4b308"), variants: [{ label: "New Zealand White" }, { label: "California" }],
    specifications: [{ label: "Average weight", value: "1.8 – 2.5 kg" }, { label: "Health records", value: "Available" }], rating: 4.6, reviewCount: 34, tags: ["rabbit", "livestock"],
  },
  {
    id: "p10", slug: "goats", name: "Goats", category: "Livestock",
    shortDescription: "Hardy goats selected for health, breed and intended use.",
    description: "We supply healthy goats for breeding, meat and household farming. Breed, age, weight and health records are provided for every animal, with veterinary clearance where required.",
    price: 78000, unit: "per goat", minOrder: 1, stock: 24, estimatedWeight: true,
    image: img("photo-1534773728080-33d31da27ae5"), variants: [{ label: "West African Dwarf" }, { label: "Saanen" }, { label: "Boer" }],
    specifications: [{ label: "Health", value: "Vaccinated and dewormed" }, { label: "Documentation", value: "Health and weight record" }], rating: 4.7, reviewCount: 22, tags: ["goat", "livestock"],
  },
  {
    id: "p11", slug: "cattle", name: "Cattle", category: "Livestock",
    shortDescription: "Quality cattle for breeding and beef production with full animal records.",
    description: "Cattle supplied subject to availability, with breed, age, weight, feeding and health documentation. Our team can advise on suitable breeds for your production goals and location.",
    price: 850000, unit: "per head", minOrder: 1, stock: 8, estimatedWeight: true,
    image: img("photo-1516467508483-a7212febe31a"), variants: [{ label: "Brahman cross" }, { label: "Muturu" }],
    specifications: [{ label: "Documentation", value: "Breed, age, weight and health record" }, { label: "Delivery", value: "Arranged by farm or buyer" }], rating: 4.8, reviewCount: 11, tags: ["cattle", "beef", "livestock"],
  },
  {
    id: "p12", slug: "poultry-feed", name: "Poultry Feed", category: "Feeds & Equipment",
    shortDescription: "Balanced starter, grower, finisher and layer feeds for every production stage.",
    description: "Nutrient-balanced poultry feed manufactured to support healthy growth and strong egg production. Available in crumble, mash and pellet forms with batch and expiry tracking.",
    price: 15500, unit: "per 25kg bag", minOrder: 1, stock: 640, featured: true, badge: "Bulk pricing",
    image: img("photo-1500595046743-cd271d694d30"), variants: [{ label: "Starter crumbs" }, { label: "Grower mash" }, { label: "Finisher pellets" }, { label: "Layer mash" }],
    specifications: [{ label: "Pack size", value: "25 kg" }, { label: "Batch tracking", value: "Production and expiry dates" }],
    storage: "Store in a cool, dry, well-ventilated area off the floor.", rating: 4.9, reviewCount: 184, tags: ["feed", "poultry"],
  },
  {
    id: "p13", slug: "catfish-feed", name: "Catfish Feed", category: "Feeds & Equipment",
    shortDescription: "High-protein floating and sinking feeds for fingerlings to table-size fish.",
    description: "Formulated catfish feed that supports good growth rates and feed conversion. Available in a range of pellet sizes for different fish stages, with batch and expiry records.",
    price: 18200, unit: "per 25kg bag", minOrder: 1, stock: 410,
    image: img("photo-1484557985045-edf25e08da73"), variants: [{ label: "Fingerling 1mm" }, { label: "Juvenile 3mm" }, { label: "Grower 5mm" }],
    specifications: [{ label: "Protein", value: "32% – 42% depending on stage" }, { label: "Pack size", value: "25 kg" }],
    storage: "Keep dry and sealed. Use before the best-before date.", rating: 4.8, reviewCount: 103, tags: ["feed", "catfish"],
  },
  {
    id: "p14", slug: "battery-cages", name: "Battery Cages & Poultry Equipment", category: "Feeds & Equipment",
    shortDescription: "Durable cages, feeders, drinkers and brooding equipment for commercial poultry operations.",
    description: "A full range of poultry housing and equipment, from battery cages to feeders, drinkers, brooders and heating systems. We supply, deliver and can assist with installation and layout planning.",
    price: 145000, unit: "per unit", minOrder: 1, stock: 42,
    image: img("photo-1589923188900-85dae523342b"), variants: [{ label: "Battery cage – 96 birds" }, { label: "Feeder" }, { label: "Drinker" }, { label: "Brooder" }],
    specifications: [{ label: "Warranty", value: "12 months on manufacturing defects" }, { label: "Installation", value: "Available on request" }],
    rating: 4.7, reviewCount: 47, tags: ["equipment", "cages", "poultry"],
  },
  {
    id: "p15", slug: "farm-consulting", name: "Farm Consulting & Setup", category: "Consulting Services",
    shortDescription: "End-to-end advisory for poultry, fish and livestock farmsetup and operations.",
    description: "Our consulting team supports feasibility studies, farm design, equipment selection, breed choice, production planning, staff training and ongoing operations advisory. Each engagement begins with a consultation request so we can understand your goals, location and budget.",
    price: 250000, unit: "per engagement (from)", minOrder: 1, stock: 999, service: true, featured: true,
    image: img("photo-1464226184884-fa280b87c399"), variants: [{ label: "Poultry setup" }, { label: "Catfish farming" }, { label: "Tilapia farming" }, { label: "Farm business plan" }, { label: "Management training" }],
    specifications: [{ label: "Format", value: "On-site and remote" }, { label: "Deliverables", value: "Written plan and implementation support" }],
    rating: 5.0, reviewCount: 29, tags: ["consulting", "training", "setup"],
  },
  {
    id: "p16", slug: "farm-eggs", name: "Table Eggs", category: "Processed Products",
    shortDescription: "Clean, graded table eggs from healthy layer flocks.",
    description: "Fresh table eggs collected daily, graded and packed carefully to reduce breakage. Available for households, restaurants and bulk institutional buyers.",
    price: 4800, unit: "per tray of 30", minOrder: 1, stock: 520,
    image: img("photo-1518569656558-1f25e69d93d7"), variants: [{ label: "Medium" }, { label: "Large" }],
    specifications: [{ label: "Grading", value: "Cleaned, candled and graded" }, { label: "Packing", value: "30-egg trays" }],
    storage: "Store in a cool, dry place or refrigerate.", rating: 4.8, reviewCount: 91, tags: ["eggs", "layers"],
  },
];

export const featuredProducts = () => products.filter((product) => product.featured);

export const demoUsers: User[] = [
  { id: "u_customer", name: "Adaeze Okafor", email: "adaeze@example.com", phone: "+234 803 123 4567", role: "individual", status: "Active" },
  { id: "u_corp", name: "Royal Foods Ltd", email: "procurement@royalfoods.ng", phone: "+234 802 987 6543", role: "corporate", company: "Royal Foods Limited", status: "Active", creditLimit: 5_000_000, creditUsed: 1_200_000 },
  { id: "u_staff", name: "Chinedu Balogun", email: "chinedu@optimalroyalfarms.com", phone: "+234 806 111 2233", role: "staff", status: "Active" },
  { id: "u_admin", name: "Dr. Solomon Adeyemi", email: "admin@optimalroyalfarms.com", phone: "+234 809 444 5566", role: "admin", status: "Active" },
  { id: "u_supplier", name: "GreenField Agro Supplies", email: "sales@greenfieldagro.ng", phone: "+234 805 777 8899", role: "supplier", company: "GreenField Agro Supplies", status: "Active" },
];

export const demoOrders: Order[] = [
  {
    id: "o_demo1", reference: "ORF-240918-AX41", customerName: "Adaeze Okafor", customerEmail: "adaeze@example.com",
    customerId: "u_customer", customerType: "individual",
    items: [{ productId: "p4", name: "Live Catfish", price: 1800, unit: "per kg (estimated)", quantity: 12, variant: "800g – 1.2kg" }],
    subtotal: 21600, deliveryFee: 2500, tax: 0, discount: 0, total: 24100,
    paymentMethod: "Paystack (Card)", paymentStatus: "Paid", status: "In Transit", deliveryMethod: "Farm-managed delivery",
    address: { id: "a1", label: "Home", recipient: "Adaeze Okafor", phone: "+234 803 123 4567", state: "Lagos", lga: "Ikeja", city: "Ikeja", street: "12 Adeola Odeku Street", isDefault: true },
    createdAt: "2026-11-16T09:20:00.000Z", trackingCode: "TRK-882910",
    timeline: [
      { status: "Order Placed", at: "2026-11-16T09:20:00.000Z" },
      { status: "Payment Confirmed", at: "2026-11-16T09:22:00.000Z" },
      { status: "Order Confirmed", at: "2026-11-16T10:05:00.000Z" },
      { status: "Order Processing", at: "2026-11-16T13:30:00.000Z" },
      { status: "Products Being Prepared", at: "2026-11-17T07:10:00.000Z" },
      { status: "Quality Inspection Completed", at: "2026-11-17T11:00:00.000Z" },
      { status: "Ready for Dispatch", at: "2026-11-17T14:00:00.000Z" },
      { status: "Driver Assigned", at: "2026-11-18T07:00:00.000Z", note: "Driver: Musa Ibrahim — +234 805 220 1188" },
      { status: "Dispatched", at: "2026-11-18T07:45:00.000Z" },
      { status: "In Transit", at: "2026-11-18T09:10:00.000Z" },
    ],
  },
  {
    id: "o_demo2", reference: "ORF-240912-BY08", customerName: "Royal Foods Ltd", customerEmail: "procurement@royalfoods.ng",
    customerId: "u_corp", customerType: "corporate",
    items: [{ productId: "p7", name: "Processed Chicken", price: 2900, unit: "per kg", quantity: 120 }, { productId: "p12", name: "Poultry Feed", price: 15500, unit: "per 25kg bag", quantity: 20 }],
    subtotal: 698000, deliveryFee: 15000, tax: 0, discount: 10000, total: 703000,
    paymentMethod: "Corporate credit", paymentStatus: "Credit Approved", status: "Ready for Dispatch", deliveryMethod: "Bulk corporate delivery",
    address: { id: "a2", label: "Central Warehouse", recipient: "Royal Foods Ltd", phone: "+234 802 987 6543", state: "Lagos", lga: "Alimosho", city: "Lagos", street: "KM 12, Ikorodu Road", isDefault: true },
    createdAt: "2026-11-12T11:00:00.000Z", trackingCode: "TRK-661240",
    timeline: [
      { status: "Order Placed", at: "2026-11-12T11:00:00.000Z" },
      { status: "Payment Confirmed", at: "2026-11-12T11:02:00.000Z", note: "Credit approved against corporate account" },
      { status: "Order Confirmed", at: "2026-11-12T12:30:00.000Z" },
      { status: "Order Processing", at: "2026-11-13T08:00:00.000Z" },
      { status: "Products Being Prepared", at: "2026-11-15T09:00:00.000Z" },
      { status: "Quality Inspection Completed", at: "2026-11-17T10:00:00.000Z" },
      { status: "Ready for Dispatch", at: "2026-11-18T08:30:00.000Z" },
    ],
  },
  {
    id: "o_demo3", reference: "ORF-240905-QR12", customerName: "Ngozi Eze", customerEmail: "ngozi@example.com",
    customerType: "guest",
    items: [{ productId: "p6", name: "Smoked Catfish", price: 3200, unit: "per kg", quantity: 4 }],
    subtotal: 12800, deliveryFee: 2000, tax: 0, discount: 0, total: 14800,
    paymentMethod: "Bank transfer", paymentStatus: "Paid", status: "Delivered", deliveryMethod: "Farm-managed delivery",
    address: { id: "a3", label: "Delivery", recipient: "Ngozi Eze", phone: "+234 812 334 5566", state: "Ogun", lga: "Abeokuta North", city: "Abeokuta", street: "8 Ijebu Road" },
    createdAt: "2026-11-05T14:00:00.000Z", trackingCode: "TRK-220187",
    timeline: [
      { status: "Order Placed", at: "2026-11-05T14:00:00.000Z" },
      { status: "Payment Confirmed", at: "2026-11-05T15:20:00.000Z" },
      { status: "Order Confirmed", at: "2026-11-06T08:00:00.000Z" },
      { status: "Order Processing", at: "2026-11-06T10:00:00.000Z" },
      { status: "Products Being Prepared", at: "2026-11-06T13:00:00.000Z" },
      { status: "Quality Inspection Completed", at: "2026-11-07T09:00:00.000Z" },
      { status: "Ready for Dispatch", at: "2026-11-07T11:00:00.000Z" },
      { status: "Driver Assigned", at: "2026-11-07T12:00:00.000Z" },
      { status: "Dispatched", at: "2026-11-07T13:00:00.000Z" },
      { status: "In Transit", at: "2026-11-07T14:30:00.000Z" },
      { status: "Out for Delivery", at: "2026-11-07T15:10:00.000Z" },
      { status: "Delivered", at: "2026-11-07T16:02:00.000Z", note: "Proof of delivery captured — recipient: Ngozi Eze" },
    ],
  },
];

export const initialNotifications: NotificationItem[] = [
  { id: "n1", title: "3 new orders awaiting confirmation", body: "Sales team action required.", at: "2026-11-18T08:00:00.000Z", read: false, type: "order" },
  { id: "n2", title: "Low stock: Smoked Chicken", body: "64 kg remaining — reorder level is 80 kg.", at: "2026-11-18T07:30:00.000Z", read: false, type: "stock" },
  { id: "n3", title: "Payment received", body: "₦148,000 from Royal Foods Ltd.", at: "2026-11-17T16:10:00.000Z", read: false, type: "finance" },
  { id: "n4", title: "Corporate registration pending", body: "2 applications awaiting verification.", at: "2026-11-17T11:00:00.000Z", read: true, type: "system" },
];

export const inventory = [
  { product: "Day-Old Chicks", sku: "INV-POU-001", location: "Hatchery House A", qty: 4200, unit: "birds", reorder: 1000, value: 5_250_000, status: "Healthy" },
  { product: "Live Broilers", sku: "INV-POU-004", location: "Broiler House 2", qty: 860, unit: "birds", reorder: 300, value: 3_612_000, status: "Healthy" },
  { product: "Point-of-Lay Birds", sku: "INV-POU-009", location: "Layer House 1", qty: 340, unit: "birds", reorder: 200, value: 1_632_000, status: "Healthy" },
  { product: "Live Catfish", sku: "INV-FIS-002", location: "Pond Cluster B", qty: 1250, unit: "kg", reorder: 400, value: 2_250_000, status: "Healthy" },
  { product: "Live Tilapia", sku: "INV-FIS-005", location: "Pond Cluster C", qty: 620, unit: "kg", reorder: 300, value: 899_000, status: "Healthy" },
  { product: "Smoked Catfish", sku: "INV-PRC-011", location: "Processing Store", qty: 148, unit: "kg", reorder: 150, value: 473_600, status: "Low stock" },
  { product: "Smoked Chicken", sku: "INV-PRC-014", location: "Processing Store", qty: 64, unit: "kg", reorder: 80, value: 224_000, status: "Low stock" },
  { product: "Processed Chicken", sku: "INV-PRC-012", location: "Cold Room 1", qty: 210, unit: "kg", reorder: 100, value: 609_000, status: "Healthy" },
  { product: "Table Eggs", sku: "INV-POU-018", location: "Egg Store", qty: 520, unit: "trays", reorder: 200, value: 2_496_000, status: "Healthy" },
  { product: "Poultry Feed", sku: "INV-FED-021", location: "Feed Warehouse", qty: 640, unit: "bags", reorder: 200, value: 9_920_000, status: "Healthy" },
  { product: "Catfish Feed", sku: "INV-FED-024", location: "Feed Warehouse", qty: 410, unit: "bags", reorder: 150, value: 7_462_000, status: "Healthy" },
  { product: "Battery Cages", sku: "INV-EQP-031", location: "Equipment Yard", qty: 42, unit: "units", reorder: 10, value: 6_090_000, status: "Healthy" },
  { product: "Packaging Materials", sku: "INV-CON-040", location: "Packaging Store", qty: 85, unit: "cartons", reorder: 100, value: 340_000, status: "Low stock" },
];

export const stockMovements = [
  { ref: "MOV-2418-001", date: "18 Nov 2026, 07:45", product: "Live Catfish", type: "Dispatch", qty: -12, from: "Pond Cluster B", to: "Delivery Van 2", employee: "Musa Ibrahim", status: "Approved" },
  { ref: "MOV-2418-002", date: "18 Nov 2026, 07:15", product: "Poultry Feed", type: "GRN Receipt", qty: 120, from: "GreenField Agro", to: "Feed Warehouse", employee: "Amina Yusuf", status: "Approved" },
  { ref: "MOV-2417-014", date: "17 Nov 2026, 16:40", product: "Table Eggs", type: "Production Receipt", qty: 38, from: "Layer House 1", to: "Egg Store", employee: "Peter Obi", status: "Approved" },
  { ref: "MOV-2417-012", date: "17 Nov 2026, 14:05", product: "Broilers", type: "Mortality", qty: -3, from: "Broiler House 2", to: "Disposal", employee: "Chinedu Balogun", status: "Approved" },
  { ref: "MOV-2417-009", date: "17 Nov 2026, 10:20", product: "Smoked Chicken", type: "Sales", qty: -8, from: "Processing Store", to: "Customer", employee: "Grace Adeleke", status: "Approved" },
  { ref: "MOV-2416-006", date: "16 Nov 2026, 09:00", product: "Day-Old Chicks", type: "Purchase Receipt", qty: 500, from: "Sahara Hatcheries", to: "Hatchery House A", employee: "Amina Yusuf", status: "Pending" },
];

export const suppliers = [
  { id: "s1", name: "GreenField Agro Supplies", contact: "Mrs. Lara Adeniran", phone: "+234 805 777 8899", category: "Feeds & Equipment", terms: "Net 30", outstanding: 2_450_000, status: "Approved" },
  { id: "s2", name: "Sahara Hatcheries Ltd", contact: "Dr. Kabiru Musa", phone: "+234 803 221 0098", category: "Day-Old Chicks", terms: "Net 14", outstanding: 1_180_000, status: "Approved" },
  { id: "s3", name: "PrimePack Solutions", contact: "Mr. Uche Nwosu", phone: "+234 806 552 1144", category: "Packaging Materials", terms: "Net 30", outstanding: 680_000, status: "Approved" },
  { id: "s4", name: "AquaVet Nigeria", contact: "Dr. Funmi Balogun", phone: "+234 807 334 9911", category: "Veterinary & Drugs", terms: "Net 21", outstanding: 0, status: "Pending" },
];

export const purchaseOrders = [
  { po: "PO-2026-0142", supplier: "GreenField Agro Supplies", date: "12 Nov 2026", items: "Poultry Feed × 120 bags", total: 1_860_000, status: "Received", grn: "GRN-0261" },
  { po: "PO-2026-0141", supplier: "Sahara Hatcheries Ltd", date: "10 Nov 2026", items: "Day-Old Chicks × 500", total: 625_000, status: "Partially Received", grn: "GRN-0259" },
  { po: "PO-2026-0140", supplier: "PrimePack Solutions", date: "08 Nov 2026", items: "Packaging cartons × 200", total: 780_000, status: "Awaiting Approval", grn: "—" },
  { po: "PO-2026-0139", supplier: "AquaVet Nigeria", date: "04 Nov 2026", items: "Vaccines & consumables", total: 340_000, status: "Approved", grn: "—" },
];

export const staffMembers = [
  { name: "Dr. Solomon Adeyemi", role: "Super Administrator", dept: "Management", status: "Active" },
  { name: "Chinedu Balogun", role: "Farm Manager", dept: "Production", status: "Active" },
  { name: "Amina Yusuf", role: "Store Manager", dept: "Inventory", status: "Active" },
  { name: "Grace Adeleke", role: "Sales Manager", dept: "Sales", status: "Active" },
  { name: "Peter Obi", role: "Poultry Supervisor", dept: "Production", status: "Active" },
  { name: "Musa Ibrahim", role: "Delivery Driver", dept: "Logistics", status: "Active" },
  { name: "Halima Sani", role: "Accountant", dept: "Finance", status: "Active" },
  { name: "Tunde Bakare", role: "Procurement Officer", dept: "Procurement", status: "Active" },
];

export const testimonials = [
  { quote: "The consistency of the processed chicken and the transparency of order tracking have made a real difference to our kitchen operations.", name: "Mrs. Bukola Eze", role: "Executive Chef, Savour Lagos", initials: "BE" },
  { quote: "We placed a bulk corporate order with credit terms and everything — from quotation to delivery — was handled professionally.", name: "Mr. Ibrahim Sani", role: "Operations Manager, Royal Foods Ltd", initials: "IS" },
  { quote: "The day-old chicks arrived healthy and well-documented. Their team also guided us through brooding setup.", name: "Dr. Ngozi Umeh", role: "Farmer, Abeokuta", initials: "NU" },
];

export const gallery = [
  { title: "Broiler house", caption: "Controlled housing and daily health checks", icon: "bird" },
  { title: "Fish ponds", caption: "Monitored pond cluster for catfish and tilapia", icon: "fish" },
  { title: "Processing unit", caption: "Hygienic processing and packing", icon: "flame" },
  { title: "Feed store", caption: "Batch-tracked feed inventory", icon: "wheat" },
  { title: "Layer farm", caption: "Daily egg collection and grading", icon: "egg" },
  { title: "Delivery fleet", caption: "Farm-managed delivery and logistics", icon: "truck" },
];

export const salesTrend = [
  { month: "Jun", value: 4.2 }, { month: "Jul", value: 5.1 }, { month: "Aug", value: 4.8 },
  { month: "Sep", value: 6.3 }, { month: "Oct", value: 7.1 }, { month: "Nov", value: 8.4 },
];

export const topProducts = [
  { name: "Live Catfish", revenue: 3_850_000, units: 2140, share: 28 },
  { name: "Poultry Feed", revenue: 3_120_000, units: 201, share: 23 },
  { name: "Processed Chicken", revenue: 2_460_000, units: 848, share: 18 },
  { name: "Day-Old Chicks", revenue: 1_980_000, units: 1584, share: 15 },
  { name: "Smoked Catfish", revenue: 1_210_000, units: 378, share: 9 },
];
