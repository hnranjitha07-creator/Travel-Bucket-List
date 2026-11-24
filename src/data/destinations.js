export const featuredDestinations = [
  {
    id: 'plitvice-lakes',
    name: 'Plitvice Lakes',
    country: 'Croatia',
    category: 'Nature',
    image: 'photo-1500534623283-312aade485b7',
    description: 'Waterfalls and forest paths in a world of their own.',
  },
  {
    id: 'zhangjiajie',
    name: 'Zhangjiajie',
    country: 'China',
    category: 'Adventure',
    image: 'photo-1472396961693-142e6e269027',
    description: 'Cloud-brushed peaks that feel like another planet.',
  },
  {
    id: 'moraine-lake',
    name: 'Moraine Lake',
    country: 'Canada',
    category: 'Mountain',
    image: 'photo-1439853949127-fa647821eba0',
    description: 'Turquoise water, ten peaks, and nowhere else to be.',
  },
]

export const popularDestinations = [
  {
    id: 'bali',
    name: 'Bali',
    country: 'Indonesia',
    category: 'Beach',
    image: 'photo-1537996194471-e657df975ab4',
    description: 'Temple mornings, emerald rice terraces, and warm island air.',
  },
  {
    id: 'swiss-alps',
    name: 'Swiss Alps',
    country: 'Switzerland',
    category: 'Mountain',
    image: 'photo-1531366936337-7c912a4589a7',
    description: 'Alpine trails, quiet villages, and the long way around.',
  },
  {
    id: 'santorini',
    name: 'Santorini',
    country: 'Greece',
    category: 'Beach',
    image: 'photo-1533104816931-20fa691ff6ca',
    description: 'Salt air, blue domes, and evenings that take their time.',
  },
  {
    id: 'kyoto',
    name: 'Kyoto',
    country: 'Japan',
    category: 'Cultural',
    image: 'photo-1493976040374-85c8e12f0c0e',
    description: 'Lantern-lit lanes and gardens that change with every season.',
  },
  {
    id: 'paris',
    name: 'Paris',
    country: 'France',
    category: 'Cultural',
    image: 'photo-1502602898657-3e91760cbb34',
    description: 'A slow afternoon, a little café, and a city made for wandering.',
  },
  {
    id: 'cappadocia',
    name: 'Cappadocia',
    country: 'Turkey',
    category: 'Adventure',
    image: 'photo-1570939274717-7eda259b50ed',
    description: 'Ancient valleys and sunrise skies full of color.',
  },
  {
    id: 'maldives',
    name: 'Maldives',
    country: 'Maldives',
    category: 'Beach',
    image: 'photo-1514282401047-d79a71a590e8',
    description: 'Warm shallows, soft sand, and the art of doing less.',
  },
  {
    id: 'iceland',
    name: 'Iceland',
    country: 'Iceland',
    category: 'Adventure',
    image: 'photo-1476610182048-b716b8518aae',
    description: 'Waterfalls, wide-open roads, and weather worth remembering.',
  },
  {
    id: 'patagonia',
    name: 'Patagonia',
    country: 'Chile & Argentina',
    category: 'Mountain',
    image: 'photo-1464822759023-fed622ff2c3b',
    description: 'Wild trails, glacial lakes, and a little mountain silence.',
  },
]

export const destinations = [...featuredDestinations, ...popularDestinations]

export const destinationById = (id) => destinations.find((place) => place.id === id)

export const destinationImage = (image, width = 900) =>
  `https://images.unsplash.com/${image}?auto=format&fit=crop&w=${width}&q=85`
