export const getServiceList = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.services)) return payload.services;
  if (Array.isArray(payload?.data?.services)) return payload.data.services;
  return [];
};

export const normalizeServiceOption = (service) => {
  const id = service?.id;
  const label =
    service?.name ||
    service?.title ||
    service?.service_name ||
    service?.label ||
    (id ? `Service #${id}` : 'Unnamed Service');

  return {
    value: id ? String(id) : '',
    label,
  };
};
