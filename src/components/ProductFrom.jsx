import { useState, useEffect } from "react";
import { Upload } from "lucide-react";
import Select from "react-select";
import { motion } from "framer-motion";

// Componentes de UI (igual que antes)
const Input = ({ className, ...props }) => (
  <input className={`border rounded-lg p-2 w-full ${className}`} {...props} />
);

const Button = ({ className, children, ...props }) => (
  <button className={`bg-[#C191A1] hover:bg-[#AB7483] text-white font-bold py-2 rounded-xl ${className}`} {...props}>
    {children}
  </button>
);

const Textarea = ({ className, ...props }) => (
  <textarea className={`border rounded-lg p-2 w-full ${className}`} {...props}></textarea>
);

const Card = ({ className, children }) => (
  <div className={`bg-white p-4 shadow-lg rounded-lg ${className}`}>{children}</div>
);

const CardContent = ({ className, children }) => (
  <div className={`p-4 ${className}`}>{children}</div>
);

const Label = ({ className, children, ...props }) => (
  <label className={`text-gray-700 font-medium ${className}`} {...props}>
    {children}
  </label>
);

// Switch sin disparar submit
const Switch = ({ checked, onCheckedChange, className }) => {
  const [isChecked, setIsChecked] = useState(checked);
  const handleChange = () => {
    setIsChecked(!isChecked);
    onCheckedChange(!isChecked);
  };
  return (
    <button
      type="button"
      className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${isChecked ? "bg-[#C191A1]" : "bg-gray-300"} ${className}`}
      onClick={handleChange}
    >
      <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${isChecked ? "translate-x-6" : "translate-x-0"}`} />
    </button>
  );
};

export default function ProductForm() {
  const [formData, setFormData] = useState({
    userId: "",
    categoryId: "",
    conditionId: "",
    sizeId: "",
    brandId: "",
    productStatusId: "",
    name: "",
    description: "",
    isForSale: false,
    isForRental: false,
    price: "",
    pricePerDay: "",
  });

  const [categories, setCategories] = useState([]);
  const [conditions, setConditions] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [brands, setBrands] = useState([]);
  const [productStatuses, setProductStatuses] = useState([]);
  const [images, setImages] = useState([]);

  // Cargar datos de la API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const endpoints = [
          {
            url: "https://localhost:44367/api/Category",
            setter: setCategories,
            mapper: (item) => ({ value: item.id, label: item.name }),
          },
          {
            url: "https://localhost:44367/api/condition",
            setter: setConditions,
            mapper: (item) => ({ value: item.id, label: item.name }),
          },
          {
            url: "https://localhost:44367/api/Size",
            setter: setSizes,
            mapper: (item) => ({ value: item.id, label: item.label }),
          },
          {
            url: "https://localhost:44367/api/Brand",
            setter: setBrands,
            mapper: (item) => ({ value: item.id, label: item.label }),
          },
          {
            url: "https://localhost:44367/api/ProductStatus",
            setter: setProductStatuses,
            mapper: (item) => ({ value: item.id, label: item.label }),
          },
        ];

        await Promise.all(
          endpoints.map(async (endpoint) => {
            const response = await fetch(endpoint.url);
            if (!response.ok) {
              throw new Error(`Error al obtener datos de ${endpoint.url}`);
            }
            const data = await response.json();
            endpoint.setter(data.map(endpoint.mapper));
          })
        );
      } catch (error) {
        console.error("Error al cargar datos:", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const newFiles = Array.from(e.target.files);
    setImages((prev) => [...prev, ...newFiles]);
  };

  const handleRemoveImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("UserId", formData.userId);
      formDataToSend.append("CategoryId", formData.categoryId);
      formDataToSend.append("ConditionId", formData.conditionId);
      formDataToSend.append("SizeId", formData.sizeId);
      formDataToSend.append("BrandId", formData.brandId);
      formDataToSend.append("ProductStatusId", formData.productStatusId);
      formDataToSend.append("Name", formData.name);
      formDataToSend.append("Description", formData.description);
      formDataToSend.append("IsForSale", formData.isForSale);
      formDataToSend.append("IsForRental", formData.isForRental);
      formDataToSend.append("Price", formData.price);
      formDataToSend.append("PricePerDay", formData.pricePerDay);

      images.forEach((image) => {
        formDataToSend.append("images", image);
      });

      const response = await fetch("https://localhost:44367/api/Product", {
        method: "POST",
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error("Error al subir el producto");
      }

      const data = await response.json();
      console.log("Producto creado exitosamente:", data);
      alert("Producto creado exitosamente");
    } catch (error) {
      console.error("Error al enviar formulario:", error);
      alert("Hubo un error al subir el producto");
    }
  };

  return (
    <div className="min-h-screen bg-[#FDF9F7] flex items-center justify-center font-poppins">
      <form onSubmit={handleSubmit} className="w-full max-w-lg">
        <Card className="max-w-lg w-full mx-auto p-6 bg-[#FFF8F5] shadow-lg rounded-2xl">
          <CardContent>
            <h2 className="text-2xl font-bold text-[#9F646D] mb-4">Subir Producto</h2>

            {/* Input para ID de Usuario */}
            <Input
              type="number"
              name="userId"
              value={formData.userId}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              placeholder="ID de Usuario"
              className="mb-4"
            />

            {/* Selects para Categoría, Condición, Tamaño, Marca, Estado */}
            <div className="grid grid-cols-2 gap-4">
              <Select
                options={categories}
                placeholder="Categoría"
                onChange={(option) => handleChange("categoryId", option.value)}
              />
              <Select
                options={conditions}
                placeholder="Condición"
                onChange={(option) => handleChange("conditionId", option.value)}
              />
              <Select
                options={sizes}
                placeholder="Tamaño"
                onChange={(option) => handleChange("sizeId", option.value)}
              />
              <Select
                options={brands}
                placeholder="Marca"
                onChange={(option) => handleChange("brandId", option.value)}
              />
              <Select
                options={productStatuses}
                placeholder="Estado"
                onChange={(option) => handleChange("productStatusId", option.value)}
              />
            </div>

            <Input
              name="name"
              value={formData.name}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              placeholder="Nombre del producto"
              className="mt-4"
            />

            <Textarea
              name="description"
              value={formData.description}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              placeholder="Descripción"
              className="mt-4"
            />

            <h3 className="text-lg font-semibold text-[#9F646D] mt-4">Selecciona el servicio</h3>
            <div className="flex justify-center gap-6 mt-2">
              <Label className="flex items-center gap-2 text-[#9F646D]">
                <Switch
                  checked={formData.isForSale}
                  onCheckedChange={(checked) => handleChange("isForSale", checked)}
                />
                Venta
              </Label>
              <Label className="flex items-center gap-2 text-[#9F646D]">
                <Switch
                  checked={formData.isForRental}
                  onCheckedChange={(checked) => handleChange("isForRental", checked)}
                />
                Alquiler
              </Label>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <Input
                type="number"
                name="price"
                value={formData.price}
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                placeholder="Precio Venta"
              />
              <Input
                type="number"
                name="pricePerDay"
                value={formData.pricePerDay}
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                placeholder="Precio por Día"
              />
            </div>

            {/* Botón de cargar imágenes (igual que antes) */}
            <Label className="flex flex-col items-center border-2 border-dashed border-[#EACDD0] p-4 rounded-lg cursor-pointer mt-4 text-[#9F646D]">
              <Upload className="w-8 h-8 text-[#CBA3AC]" />
              <span className="text-sm">Subir Imágenes</span>
              <input type="file" name="images" className="hidden" multiple onChange={handleImageChange} />
            </Label>

            {/* Previsualización de imágenes */}
            <div className="mt-4 flex flex-wrap gap-4">
              {images.map((image, index) => {
                const previewUrl = URL.createObjectURL(image);
                return (
                  <div key={index} className="relative">
                    <img src={previewUrl} alt="Preview" className="w-24 h-24 object-cover rounded-md" />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                    >
                      X
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Botón de Subir Producto modificado con animación */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="bg-[#A26964] hover:bg-[#AB7483] text-white font-bold py-2 rounded-xl w-full mt-6 transition-all duration-300"
            >
              Subir Producto
            </motion.button>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
