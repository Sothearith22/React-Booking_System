
const FALLBACK_CATEGORY_IMAGES = [
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=900',
  'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=900',
  'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=900',
];

const getCategoryList = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.categories)) return payload.categories;
  if (Array.isArray(payload?.service_categories)) return payload.service_categories;
  if (Array.isArray(payload?.room_categories)) return payload.room_categories;
  if (Array.isArray(payload?.data?.data)) return payload.data.data;
  if (Array.isArray(payload?.data?.categories)) return payload.data.categories;
  if (Array.isArray(payload?.data?.service_categories)) return payload.data.service_categories;
  if (Array.isArray(payload?.data?.room_categories)) return payload.data.room_categories;
  return [];
};

const getRoomImage = (room, index) => {
  const coverImage = room?.room_images?.find((item) => item?.is_cover);
  const firstImage = coverImage || room?.room_images?.[0];

  return (
    firstImage?.image_url ||
    firstImage?.url ||
    firstImage?.path ||
    room?.image ||
    room?.image_url ||
    room?.thumbnail ||
    FALLBACK_CATEGORY_IMAGES[index % FALLBACK_CATEGORY_IMAGES.length]
  );
};

const hasRoomImage = (room) => {
  const coverImage = room?.room_images?.find((item) => item?.is_cover);
  const firstImage = coverImage || room?.room_images?.[0];

  return Boolean(
    firstImage?.image_url ||
      firstImage?.url ||
      firstImage?.path ||
      room?.image ||
      room?.image_url ||
      room?.thumbnail
  );
};

const isRoomPayload = (item) => item?.service && item?.price_per_night !== undefined;

export const extractData = (payload) => {
  const list = getCategoryList(payload);

  if (list.some(isRoomPayload)) {
    const categoriesByService = new Map();

    list.forEach((room, index) => {
      const service = room.service || {};
      const id = service.id ?? room.service_id ?? room.id ?? index;
      const existing = categoriesByService.get(id);

      if (existing) {
        categoriesByService.set(id, {
          ...existing,
          listings: existing.listings + 1,
          rooms: [...existing.rooms, room],
          image: hasRoomImage(room) ? getRoomImage(room, index) : existing.image,
        });
        return;
      }

      categoriesByService.set(id, {
        ...service,
        roomId: room.id,
        id,
        name: service.name || room.name || `Category ${id}`,
        listings: 1,
        description: service.description || room.description || 'Explore comfortable spaces designed for memorable stays.',
        image: getRoomImage(room, index),
        rooms: [room],
      });
    });

    return Array.from(categoriesByService.values());
  }

  return list.map((item, index) => {
    if (isRoomPayload(item)) {
      return item;
    }

    const id = item?.id ?? item?.category_id ?? item?.uuid ?? index;
    const rooms = item?.rooms_count ?? item?.room_count ?? item?.rooms ?? item?.listings ?? 0;
    const image =
      item?.image ||
      item?.image_url ||
      item?.thumbnail ||
      item?.photo ||
      item?.cover_image ||
      FALLBACK_CATEGORY_IMAGES[index % FALLBACK_CATEGORY_IMAGES.length];

    return {
      ...item,
      id,
      name: item?.name || item?.category_name || item?.title || `Category ${id}`,
      listings: Array.isArray(rooms) ? rooms.length : rooms,
      description:
        item?.description ||
        item?.desc ||
        item?.details ||
        'Explore comfortable spaces designed for memorable stays.',
      image,
    };
  });
};

export const mergeCategoryRooms = (categoriesPayload, roomsPayload) => {
  const categories = extractData(categoriesPayload);
  const rooms = getCategoryList(roomsPayload);

  if (!rooms.length) return categories;

  const roomsByService = new Map();

  rooms.forEach((room) => {
    const serviceId = room?.service?.id ?? room?.service_id;
    if (!serviceId) return;

    const key = String(serviceId);
    const currentRooms = roomsByService.get(key) || [];
    roomsByService.set(key, [...currentRooms, room]);
  });

  if (!categories.length) {
    return extractData(rooms);
  }

  return categories.map((category, index) => {
    const categoryRooms = roomsByService.get(String(category.id)) || [];
    const imageRoom = categoryRooms.find(hasRoomImage);

    return {
      ...category,
      rooms: categoryRooms.length ? categoryRooms : category.rooms,
      listings: categoryRooms.length ? categoryRooms.length : category.listings,
      image: imageRoom ? getRoomImage(imageRoom, index) : category.image,
    };
  });
};

export const mapCategoryOptions = (categories = []) => {
  return categories.map((item) => ({
    value: item.id,
    label: item.name,
  }));
};

export const sortCategories = (categories = []) => {
  return [...categories].sort((a, b) =>
    a.name.localeCompare(b.name)
  );
};
