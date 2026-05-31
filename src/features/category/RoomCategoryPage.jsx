import { useCallback, useEffect, useMemo, useState } from 'react';
import { useServiceCategory } from '../rooms/hooks/UseServiceCategory';
import CategoryFilterBar from './components/CategoryFilterBar';
import CategoryHeader from './components/CategoryHeader';
import CategoryModal from './components/CategoryModal';
import CategoryPagination from './components/CategoryPagination';
import CategoryTable from './components/CategoryTable';
import { useCategoryForm } from './hooks/useCategoryForm';
import { useCategorySelection } from './hooks/useCategorySelection';
import { roomService } from '../rooms/services/room.service';
import { getServiceList, normalizeServiceOption } from '../rooms/utils/service.utils';
import { EMPTY_CATEGORY_FORM, mapCategoryToForm } from './utils/category.utils';

// Main Page

const RoomCategoryPage = () => {
  const { categories, loading, error, setError, refetch } = useServiceCategory();
  const [statusFilter, setStatusFilter] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [editCategory, setEditCategory] = useState(null);
  const [form, setForm] = useState({ ...EMPTY_CATEGORY_FORM });
  const [services, setServices] = useState([]);
  const [servicesLoading, setServicesLoading] = useState(false);
  const [servicesError, setServicesError] = useState('');

  const filteredCategories = useMemo(() => {
    if (statusFilter === 'all') {
      return categories;
    }

    return categories.filter((category) => category.status === statusFilter);
  }, [categories, statusFilter]);

  const visibleCategoryIds = useMemo(
    () => filteredCategories.map((category) => category.id),
    [filteredCategories]
  );

  const {
    selected,
    toggleSelect,
    toggleSelectAll,
    allVisibleSelected,
  } = useCategorySelection(visibleCategoryIds);

  useEffect(() => {
    let cancelled = false;

    const fetchServices = async () => {
      setServicesLoading(true);
      setServicesError('');

      try {
        const response = await roomService.getServices();

        if (!cancelled) {
          setServices(getServiceList(response));
        }
      } catch (err) {
        if (!cancelled) {
          setServices([]);
          setServicesError(err?.response?.data?.message || 'Unable to load services.');
        }
      } finally {
        if (!cancelled) {
          setServicesLoading(false);
        }
      }
    };

    fetchServices();

    return () => {
      cancelled = true;
    };
  }, []);

  const serviceOptions = useMemo(
    () => services.map(normalizeServiceOption).filter((service) => service.value),
    [services]
  );

  const handleFieldChange = useCallback((field, value) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }, []);

  const openAdd = () => {
    setError('');
    setEditCategory(null);
    setForm({ ...EMPTY_CATEGORY_FORM });
    setModalOpen(true);
  };

  const openEdit = (category) => {
    setError('');
    setEditCategory(category);
    setForm(mapCategoryToForm(category));
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditCategory(null);
    setForm({ ...EMPTY_CATEGORY_FORM });
  };

  const { saveCategory, isSaving } = useCategoryForm({
    refetch,
    setError,
    onSaved: closeModal,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    await saveCategory(form, editCategory);
  };

  return (
    <div className="space-y-6">
      <CategoryHeader onAdd={openAdd} />
      <CategoryModal
        isOpen={modalOpen}
        onClose={closeModal}
        onSubmit={handleSubmit}
        categoryForm={form}
        editCategory={editCategory}
        formError={error}
        isSaving={isSaving}
        serviceOptions={serviceOptions}
        servicesLoading={servicesLoading}
        servicesError={servicesError}
        onFieldChange={handleFieldChange}
      />

      <CategoryFilterBar
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        selectedCount={selected.length}
      />

      {error ? (
        <div className="rounded-2xl border border-rose-100 bg-rose-50 px-5 py-4 text-sm font-semibold text-rose-700">
          {error}
        </div>
      ) : null}

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <CategoryTable
          categories={filteredCategories}
          loading={loading}
          selected={selected}
          onSelect={toggleSelect}
          onSelectAll={toggleSelectAll}
          allVisibleSelected={allVisibleSelected}
          onEdit={openEdit}
        />
        <CategoryPagination visibleCount={filteredCategories.length} totalCount={categories.length} />
      </div>
    </div>
  );
};

export default RoomCategoryPage;
