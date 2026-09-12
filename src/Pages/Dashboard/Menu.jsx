import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useMenuDispatch, useMenuState } from "../../Contexts/AppContext";
import "./Menu.css";

export default function Menu() {
  // =====================================================
  // MENU STATE
  // =====================================================

  const {
    menu,
    loadingMenu,
    menuError,
    updatingMenu,
    updatingAvailability,
    addingMenu,
  } = useMenuState();

  const { getMenuData, addMenuData, updateMenuData, toggleMenuAvailability } =
    useMenuDispatch();

  // =====================================================
  // SEARCH
  // =====================================================

  const [searchTerm, setSearchTerm] = useState("");

  // =====================================================
  // CATEGORY FILTER
  // =====================================================

  const [selectedCategory, setSelectedCategory] = useState("ALL");

  // =====================================================
  // ADD STATE
  // =====================================================

  const [isAdding, setIsAdding] = useState(false);

  const [addForm, setAddForm] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    image: "",
    available: true,
  });

  // =====================================================
  // EDIT STATE
  // =====================================================

  const [editingId, setEditingId] = useState(null);

  const [editForm, setEditForm] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    image: "",
  });

  // =====================================================
  // GET MENU DATA
  // =====================================================

  useEffect(() => {
    getMenuData();
  }, [getMenuData]);

  // =====================================================
  // CATEGORIES
  // =====================================================

  const categories = [
    "ALL",
    ...new Set(menu?.map((item) => item.category).filter(Boolean)),
  ];

  // =====================================================
  // FILTER MENU
  // =====================================================

  const filteredMenu = menu?.filter((item) => {
    const search = searchTerm.toLowerCase().trim();

    const matchesSearch =
      item.name?.toLowerCase().includes(search) ||
      item.description?.toLowerCase().includes(search);

    const matchesCategory =
      selectedCategory === "ALL" || item.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // =====================================================
  // START ADD
  // =====================================================

  const handleStartAdd = () => {
    setIsAdding(true);

    setAddForm({
      name: "",
      category: "",
      price: "",
      description: "",
      image: "",
      available: true,
    });
  };

  // =====================================================
  // CANCEL ADD
  // =====================================================

  const handleCancelAdd = () => {
    setIsAdding(false);

    setAddForm({
      name: "",
      category: "",
      price: "",
      description: "",
      image: "",
      available: true,
    });
  };

  // =====================================================
  // HANDLE ADD INPUT
  // =====================================================

  const handleAddChange = (e) => {
    const { name, value, type, checked } = e.target;

    setAddForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // =====================================================
  // START EDIT
  // =====================================================

  const handleEdit = (product) => {
    setEditingId(product.id);

    setEditForm({
      name: product.name || "",
      category: product.category || "",
      price: product.price ?? "",
      description: product.description || "",
      image: product.image || "",
    });
  };

  // =====================================================
  // CANCEL EDIT
  // =====================================================

  const handleCancelEdit = () => {
    setEditingId(null);

    setEditForm({
      name: "",
      category: "",
      price: "",
      description: "",
      image: "",
    });
  };

  // =====================================================
  // HANDLE EDIT INPUT
  // =====================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =====================================================
  // SAVE EDIT
  // =====================================================

  const handleSave = async (product) => {
    // -------------------------
    // Validation
    // -------------------------

    if (!editForm.name.trim()) {
      Swal.fire({
        title: "Missing Name",
        text: "Product name is required.",
        icon: "warning",
        confirmButtonText: "OK",
        customClass: {
          popup: "restaurant-swal",
          title: "restaurant-swal-title",
          htmlContainer: "restaurant-swal-text",
          confirmButton: "restaurant-swal-confirm",
        },
      });

      return;
    }

    if (editForm.price === "" || Number(editForm.price) < 0) {
      Swal.fire({
        title: "Invalid Price",
        text: "Please enter a valid price.",
        icon: "warning",
        confirmButtonText: "OK",
        customClass: {
          popup: "restaurant-swal",
          title: "restaurant-swal-title",
          htmlContainer: "restaurant-swal-text",
          confirmButton: "restaurant-swal-confirm",
        },
      });

      return;
    }

    // -------------------------
    // Confirmation
    // -------------------------

    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Do you want to save changes to "${product.name}"?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, save changes",
      cancelButtonText: "Cancel",
      reverseButtons: true,

      customClass: {
        popup: "restaurant-swal",
        title: "restaurant-swal-title",
        htmlContainer: "restaurant-swal-text",
        confirmButton: "restaurant-swal-confirm",
        cancelButton: "restaurant-swal-cancel",
      },
    });

    if (!result.isConfirmed) {
      return;
    }

    // -------------------------
    // Data sent to backend
    // -------------------------

    const productData = {
      name: editForm.name.trim(),
      category: editForm.category.trim(),
      price: Number(editForm.price),
      description: editForm.description.trim(),
      image: editForm.image.trim(),

      // Keep current availability
      available: product.available,
    };

    // -------------------------
    // API UPDATE
    // -------------------------

    const response = await updateMenuData(product.id, productData);

    // -------------------------
    // SUCCESS
    // -------------------------

    if (response.success) {
      await Swal.fire({
        title: "Product Updated!",
        text: `"${productData.name}" has been updated successfully.`,
        icon: "success",
        confirmButtonText: "OK",
        customClass: {
          popup: "restaurant-swal",
          title: "restaurant-swal-title",
          htmlContainer: "restaurant-swal-text",
          confirmButton: "restaurant-swal-confirm",
        },
      });

      handleCancelEdit();
    }

    // -------------------------
    // ERROR
    // -------------------------
    else {
      Swal.fire({
        title: "Update Failed",
        text:
          response.message ||
          "Something went wrong while updating the product.",
        icon: "error",
        confirmButtonText: "OK",
        customClass: {
          popup: "restaurant-swal",
          title: "restaurant-swal-title",
          htmlContainer: "restaurant-swal-text",
          confirmButton: "restaurant-swal-confirm",
        },
      });
    }
  };

  // =====================================================
  // SAVE NEW PRODUCT
  // =====================================================

  const handleAdd = async () => {
    // -------------------------
    // Validation
    // -------------------------

    if (!addForm.name.trim()) {
      Swal.fire({
        title: "Missing Name",
        text: "Product name is required.",
        icon: "warning",
        confirmButtonText: "OK",
        customClass: {
          popup: "restaurant-swal",
          title: "restaurant-swal-title",
          htmlContainer: "restaurant-swal-text",
          confirmButton: "restaurant-swal-confirm",
        },
      });

      return;
    }

    if (addForm.price === "" || Number(addForm.price) < 0) {
      Swal.fire({
        title: "Invalid Price",
        text: "Please enter a valid price.",
        icon: "warning",
        confirmButtonText: "OK",
        customClass: {
          popup: "restaurant-swal",
          title: "restaurant-swal-title",
          htmlContainer: "restaurant-swal-text",
          confirmButton: "restaurant-swal-confirm",
        },
      });

      return;
    }

    // -------------------------
    // Confirmation
    // -------------------------

    const result = await Swal.fire({
      title: "Add New Product?",
      text: `Do you want to add "${addForm.name.trim()}" to the menu?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, add product",
      cancelButtonText: "Cancel",
      reverseButtons: true,

      customClass: {
        popup: "restaurant-swal",
        title: "restaurant-swal-title",
        htmlContainer: "restaurant-swal-text",
        confirmButton: "restaurant-swal-confirm",
        cancelButton: "restaurant-swal-cancel",
      },
    });

    if (!result.isConfirmed) {
      return;
    }

    // -------------------------
    // Data sent to backend
    // -------------------------

    const productData = {
      name: addForm.name.trim(),
      category: addForm.category.trim(),
      price: Number(addForm.price),
      description: addForm.description.trim(),
      image: addForm.image.trim(),
      available: addForm.available,
    };

    // -------------------------
    // API ADD
    // -------------------------

    const response = await addMenuData(productData);

    // -------------------------
    // SUCCESS
    // -------------------------

    if (response.success) {
      await Swal.fire({
        title: "Product Added!",
        text: `"${productData.name}" has been added successfully.`,
        icon: "success",
        confirmButtonText: "OK",

        customClass: {
          popup: "restaurant-swal",
          title: "restaurant-swal-title",
          htmlContainer: "restaurant-swal-text",
          confirmButton: "restaurant-swal-confirm",
        },
      });

      handleCancelAdd();
    }

    // -------------------------
    // ERROR
    // -------------------------
    else {
      Swal.fire({
        title: "Add Failed",
        text:
          response.message || "Something went wrong while adding the product.",
        icon: "error",
        confirmButtonText: "OK",

        customClass: {
          popup: "restaurant-swal",
          title: "restaurant-swal-title",
          htmlContainer: "restaurant-swal-text",
          confirmButton: "restaurant-swal-confirm",
        },
      });
    }
  };

  // =====================================================
  // TOGGLE AVAILABILITY
  // =====================================================

  const handleToggleAvailability = async (product) => {
    const newAvailable = !product.available;

    const response = await toggleMenuAvailability(product.id, newAvailable);

    if (!response.success) {
      Swal.fire({
        title: "Update Failed",
        text: response.message || "Failed to update product availability.",
        icon: "error",
        confirmButtonText: "OK",
        customClass: {
          popup: "restaurant-swal",
          title: "restaurant-swal-title",
          htmlContainer: "restaurant-swal-text",
          confirmButton: "restaurant-swal-confirm",
        },
      });
    }
  };

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <div className="menu-page min-h-screen w-full bg-surface p-6 text-on-surface lg:p-8">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <section className="menu-header mb-5 flex flex-col gap-5 border border-surface-container-high bg-surface-container-low px-7 py-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <span className="mb-1 block text-[10px] font-bold tracking-[1px] text-primary">
            MASTER REGULATION INVENTORY
          </span>

          <h1 className="menu-header-title font-serif text-4xl font-medium tracking-tight lg:text-[42px]">
            Manage Products
          </h1>

          <p className="mt-1 text-xs text-on-surface-variant">
            Real-time culinary repertoire synchronized with RESTful endpoints{" "}
            <span className="text-primary">(/api/menu)</span>
          </p>
        </div>

        <button
          type="button"
          onClick={handleStartAdd}
          className="menu-add-btn flex items-center justify-center gap-2 bg-primary-container px-6 py-4 text-[10px] font-bold tracking-[1.2px] text-on-primary-container shadow-candlelight transition hover:brightness-110"
        >
          <span className="text-lg leading-none">+</span>
          ADD NEW PRODUCT
        </button>
      </section>

      {/* =====================================================
          FILTERS
      ===================================================== */}

      <section className="menu-filters mb-5 flex flex-col border border-surface-container-high bg-surface-container-low lg:flex-row">
        {/* SEARCH */}

        <div className="menu-search flex h-14 flex-1 items-center gap-3 border-b border-surface-container-high px-5 lg:border-b-0 lg:border-r">
          <span className="text-lg text-outline">⌕</span>

          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search dishes by name or description..."
            className="w-full bg-transparent text-xs text-on-surface outline-none placeholder:text-outline"
          />
        </div>

        {/* CATEGORY */}

        <div className="menu-category-filter relative flex h-14 w-full items-center px-5 lg:w-[270px]">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full cursor-pointer appearance-none bg-transparent pr-6 text-xs text-on-surface outline-none"
          >
            {categories.map((category) => (
              <option
                key={category}
                value={category}
                className="bg-surface-container-low text-on-surface"
              >
                {category === "ALL" ? "All Categories" : category}
              </option>
            ))}
          </select>

          <span className="pointer-events-none absolute right-5 text-lg text-outline">
            ⌄
          </span>
        </div>
      </section>
      {/* =====================================================
    ADD PRODUCT PANEL
===================================================== */}

      {isAdding && (
        <section className="menu-edit-panel mb-5 border border-primary/30 bg-surface-container p-5">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <span className="text-[9px] font-bold tracking-[1px] text-primary">
                NEW PRODUCT
              </span>

              <h2 className="mt-1 font-serif text-2xl">Add Product</h2>
            </div>

            <button
              type="button"
              onClick={handleCancelAdd}
              className="text-xl text-outline transition hover:text-primary"
            >
              ×
            </button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {/* NAME */}

            <div>
              <label className="mb-2 block text-[9px] font-bold tracking-wide text-outline">
                PRODUCT NAME
              </label>

              <input
                type="text"
                name="name"
                value={addForm.name}
                onChange={handleAddChange}
                placeholder="Enter product name"
                className="w-full border border-surface-container-highest bg-surface-container-low px-3 py-3 text-xs text-on-surface outline-none focus:border-primary"
              />
            </div>

            {/* CATEGORY */}

            <div>
              <label className="mb-2 block text-[9px] font-bold tracking-wide text-outline">
                CATEGORY
              </label>

              <select
                name="category"
                value={addForm.category}
                onChange={handleAddChange}
                className="w-full border border-surface-container-highest bg-surface-container-low px-3 py-3 text-xs text-on-surface outline-none focus:border-primary"
              >
                <option value="" className="bg-surface-container-low">
                  Select category
                </option>

                {categories
                  .filter((category) => category !== "ALL")
                  .map((category) => (
                    <option
                      key={category}
                      value={category}
                      className="bg-surface-container-low"
                    >
                      {category}
                    </option>
                  ))}
              </select>
            </div>

            {/* PRICE */}

            <div>
              <label className="mb-2 block text-[9px] font-bold tracking-wide text-outline">
                PRICE
              </label>

              <input
                type="number"
                name="price"
                min="0"
                value={addForm.price}
                onChange={handleAddChange}
                placeholder="Enter price"
                className="w-full border border-surface-container-highest bg-surface-container-low px-3 py-3 text-xs text-on-surface outline-none focus:border-primary"
              />
            </div>

            {/* IMAGE */}

            <div>
              <label className="mb-2 block text-[9px] font-bold tracking-wide text-outline">
                IMAGE URL
              </label>

              <input
                type="text"
                name="image"
                value={addForm.image}
                onChange={handleAddChange}
                placeholder="https://..."
                className="w-full border border-surface-container-highest bg-surface-container-low px-3 py-3 text-xs text-on-surface outline-none focus:border-primary"
              />
            </div>

            {/* DESCRIPTION */}

            <div className="md:col-span-2">
              <label className="mb-2 block text-[9px] font-bold tracking-wide text-outline">
                DESCRIPTION
              </label>

              <textarea
                name="description"
                value={addForm.description}
                onChange={handleAddChange}
                rows="3"
                placeholder="Enter product description"
                className="w-full resize-none border border-surface-container-highest bg-surface-container-low px-3 py-3 text-xs text-on-surface outline-none focus:border-primary"
              />
            </div>

            {/* AVAILABILITY */}

            <div className="md:col-span-2">
              <label className="flex cursor-pointer items-center gap-3 text-xs text-on-surface">
                <input
                  type="checkbox"
                  name="available"
                  checked={addForm.available}
                  onChange={handleAddChange}
                  className="h-4 w-4 accent-primary"
                />

                <span className="text-[9px] font-bold tracking-wide text-outline">
                  AVAILABLE
                </span>
              </label>
            </div>
          </div>

          {/* BUTTONS */}

          <div className="mt-5 flex flex-col justify-end gap-3 sm:flex-row">
            <button
              type="button"
              onClick={handleCancelAdd}
              disabled={addingMenu}
              className="border border-surface-container-highest px-6 py-3 text-[9px] font-bold tracking-wide text-on-surface-variant transition hover:bg-surface-container-highest disabled:cursor-not-allowed disabled:opacity-50"
            >
              CANCEL
            </button>

            <button
              type="button"
              onClick={handleAdd}
              disabled={addingMenu}
              className="bg-primary px-6 py-3 text-[9px] font-bold tracking-wide text-on-primary transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {addingMenu ? "ADDING..." : "ADD PRODUCT"}
            </button>
          </div>
        </section>
      )}

      {/* =====================================================
          LOADING
      ===================================================== */}

      {loadingMenu && (
        <div className="flex min-h-[300px] items-center justify-center border border-surface-container-high bg-surface-container-low">
          <div className="flex flex-col items-center gap-4">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-surface-container-highest border-t-primary" />

            <p className="text-xs tracking-wide text-on-surface-variant">
              Loading menu...
            </p>
          </div>
        </div>
      )}

      {/* =====================================================
          ERROR
      ===================================================== */}

      {!loadingMenu && menuError?.isError && (
        <div className="flex min-h-[300px] items-center justify-center border border-red-900/50 bg-red-950/10">
          <div className="flex max-w-md flex-col items-center gap-3 text-center">
            <div className="text-3xl">⚠</div>

            <h2 className="font-serif text-xl text-red-400">
              Failed to load menu
            </h2>

            <p className="text-xs text-on-surface-variant">
              {menuError.message ||
                "Something went wrong while loading the menu."}
            </p>

            <button
              type="button"
              onClick={getMenuData}
              className="mt-2 bg-primary px-5 py-2.5 text-[9px] font-bold text-on-primary transition hover:brightness-110"
            >
              TRY AGAIN
            </button>
          </div>
        </div>
      )}

      {/* =====================================================
          EMPTY STATE
      ===================================================== */}

      {!loadingMenu && !menuError?.isError && filteredMenu?.length === 0 && (
        <div className="flex min-h-[300px] items-center justify-center border border-surface-container-high bg-surface-container-low">
          <div className="text-center">
            <div className="mb-3 text-3xl">◌</div>

            <h2 className="font-serif text-xl">No products found</h2>

            <p className="mt-1 text-xs text-on-surface-variant">
              Try changing your search or category filter.
            </p>
          </div>
        </div>
      )}

      {/* =====================================================
          PRODUCTS TABLE
      ===================================================== */}

      {!loadingMenu && !menuError?.isError && filteredMenu?.length > 0 && (
        <section className="menu-table overflow-x-auto border border-surface-container-high bg-surface-container-low">
          {/* TABLE HEADER */}

          <div className="menu-table-header grid min-h-10 min-w-[900px] grid-cols-[65px_minmax(300px,1fr)_110px_85px_100px_50px] items-center bg-surface-container-high px-3 text-[8px] font-bold tracking-wide text-outline">
            <div>
              PRODUCT
              <br />
              ID
            </div>

            <div>DISH / TITLE</div>

            <div>CATEGORY</div>

            <div>PRICE</div>

            <div>STATUS</div>

            <div />
          </div>

          {/* PRODUCTS */}

          {filteredMenu.map((product, index) => {
            const isAvailable = product.available === true;
            const isEditing = editingId === product.id;

            return (
              <div key={product.id}>
                {/* =================================================
                      EDIT PANEL
                  ================================================= */}

                {isEditing && (
                  <div className="menu-edit-panel border-t border-primary/30 bg-surface-container p-5">
                    <div className="mb-5 flex items-center justify-between">
                      <div>
                        <span className="text-[9px] font-bold tracking-[1px] text-primary">
                          EDIT PRODUCT
                        </span>

                        <h2 className="mt-1 font-serif text-2xl">
                          {product.name}
                        </h2>
                      </div>

                      <button
                        type="button"
                        onClick={handleCancelEdit}
                        className="text-xl text-outline transition hover:text-primary"
                      >
                        ×
                      </button>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      {/* NAME */}

                      <div>
                        <label className="mb-2 block text-[9px] font-bold tracking-wide text-outline">
                          PRODUCT NAME
                        </label>

                        <input
                          type="text"
                          name="name"
                          value={editForm.name}
                          onChange={handleChange}
                          className="w-full border border-surface-container-highest bg-surface-container-low px-3 py-3 text-xs text-on-surface outline-none focus:border-primary"
                        />
                      </div>

                      {/* CATEGORY */}

                      <div>
                        <label className="mb-2 block text-[9px] font-bold tracking-wide text-outline">
                          CATEGORY
                        </label>

                        <select
                          name="category"
                          value={editForm.category}
                          onChange={handleChange}
                          className="w-full border border-surface-container-highest bg-surface-container-low px-3 py-3 text-xs text-on-surface outline-none focus:border-primary"
                        >
                          {categories
                            .filter((category) => category !== "ALL")
                            .map((category) => (
                              <option
                                key={category}
                                value={category}
                                className="bg-surface-container-low"
                              >
                                {category}
                              </option>
                            ))}
                        </select>
                      </div>

                      {/* PRICE */}

                      <div>
                        <label className="mb-2 block text-[9px] font-bold tracking-wide text-outline">
                          PRICE
                        </label>

                        <input
                          type="number"
                          name="price"
                          min="0"
                          value={editForm.price}
                          onChange={handleChange}
                          className="w-full border border-surface-container-highest bg-surface-container-low px-3 py-3 text-xs text-on-surface outline-none focus:border-primary"
                        />
                      </div>

                      {/* IMAGE */}

                      <div>
                        <label className="mb-2 block text-[9px] font-bold tracking-wide text-outline">
                          IMAGE URL
                        </label>

                        <input
                          type="text"
                          name="image"
                          value={editForm.image}
                          onChange={handleChange}
                          className="w-full border border-surface-container-highest bg-surface-container-low px-3 py-3 text-xs text-on-surface outline-none focus:border-primary"
                        />
                      </div>

                      {/* DESCRIPTION */}

                      <div className="md:col-span-2">
                        <label className="mb-2 block text-[9px] font-bold tracking-wide text-outline">
                          DESCRIPTION
                        </label>

                        <textarea
                          name="description"
                          value={editForm.description}
                          onChange={handleChange}
                          rows="3"
                          className="w-full resize-none border border-surface-container-highest bg-surface-container-low px-3 py-3 text-xs text-on-surface outline-none focus:border-primary"
                        />
                      </div>
                    </div>

                    {/* BUTTONS */}

                    <div className="mt-5 flex flex-col justify-end gap-3 sm:flex-row">
                      <button
                        type="button"
                        onClick={handleCancelEdit}
                        disabled={updatingMenu}
                        className="border border-surface-container-highest px-6 py-3 text-[9px] font-bold tracking-wide text-on-surface-variant transition hover:bg-surface-container-highest disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        CANCEL
                      </button>

                      <button
                        type="button"
                        onClick={() => handleSave(product)}
                        disabled={updatingMenu}
                        className="bg-primary px-6 py-3 text-[9px] font-bold tracking-wide text-on-primary transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {updatingMenu ? "SAVING..." : "SAVE CHANGES"}
                      </button>
                    </div>
                  </div>
                )}

                {/* =================================================
                      ORIGINAL PRODUCT ROW
                  ================================================= */}

                <div className="menu-table-row grid min-h-[73px] min-w-[900px] grid-cols-[65px_minmax(300px,1fr)_110px_85px_100px_50px] items-center border-t border-surface-container-high px-3 transition hover:bg-surface-container">
                  {/* PRODUCT ID */}

                  <div className="menu-product-id font-mono text-[9px] font-bold text-primary">
                    {index + 1}
                  </div>

                  {/* PRODUCT */}

                  <div className="menu-product flex min-w-0 items-center gap-3">
                    <div className="menu-product-image h-10 w-10 shrink-0 overflow-hidden border border-surface-container-highest bg-surface-container-high">
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.name || "Product"}
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-lg">
                          🍽️
                        </div>
                      )}
                    </div>

                    <div className="menu-product-info min-w-0 flex-1">
                      <h3 className="truncate font-serif text-base font-medium text-on-surface">
                        {product.name}
                      </h3>

                      <p className="truncate text-[9px] text-on-surface-variant">
                        {product.description}
                      </p>
                    </div>
                  </div>

                  {/* CATEGORY */}

                  <div className="menu-category">
                    <span
                      className={`
                          inline-block px-2 py-1.5
                          text-[9px] leading-3
                          ${
                            product.category === "Chef Specials"
                              ? "bg-[#45301b] text-secondary"
                              : "bg-surface-container-high text-on-surface"
                          }
                        `}
                    >
                      {product.category || "—"}
                    </span>
                  </div>

                  {/* PRICE */}

                  <div className="menu-price">
                    <span className="font-serif text-base font-semibold text-on-surface">
                      {product.price}
                    </span>
                  </div>

                  {/* STATUS */}

                  <div className="menu-status">
                    <button
                      type="button"
                      onClick={() => handleToggleAvailability(product)}
                      disabled={updatingAvailability}
                      className={`
                          inline-flex
                          cursor-pointer
                          items-center
                          gap-1.5
                          px-2
                          py-1.5
                          text-[8px]
                          font-bold
                          tracking-wide
                          transition
                          disabled:cursor-not-allowed
                          disabled:opacity-50
                          ${
                            isAvailable
                              ? "bg-[#1e2b26] text-green-400 hover:bg-[#263a31]"
                              : "bg-red-950/30 text-red-400 hover:bg-red-950/50"
                          }
                        `}
                    >
                      <span
                        className={`
                            h-1.5
                            w-1.5
                            rounded-full
                            ${isAvailable ? "bg-green-400" : "bg-red-400"}
                          `}
                      />

                      {isAvailable ? "ACTIVE" : "INACTIVE"}
                    </button>
                  </div>

                  {/* EDIT */}

                  <div className="menu-edit">
                    <button
                      type="button"
                      title="Edit product"
                      onClick={() => handleEdit(product)}
                      className="flex h-7 w-7 items-center justify-center bg-surface-container-high text-on-surface-variant transition hover:bg-surface-container-highest hover:text-primary"
                    >
                      ✎
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </section>
      )}
    </div>
  );
}
