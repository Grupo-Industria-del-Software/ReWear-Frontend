import { motion } from "framer-motion";
import { FiHeart, FiStar, FiAlertCircle } from "react-icons/fi";

const ProductCard = ({ product }) => {
  return (
    <motion.div
      className="bg-beige rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="relative h-48 bg-coffee/10">
        <img 
          src={product.images[0]} 
          alt={product.name}
          className="w-full h-full object-cover mix-blend-multiply"
        />
        <div className="absolute top-2 right-2 flex gap-2">
          <div className="p-2 bg-beige/90 rounded-full backdrop-blur-sm">
            <FiHeart className="text-coffee w-5 h-5" />
          </div>
          {!product.available && (
            <div className="px-3 py-1 bg-baby-blue/90 text-beige rounded-full text-sm font-poppins">
              Agotado
            </div>
          )}
        </div>
      </div>

      <div className="p-4 space-y-2">
        <div className="flex items-center gap-2">
          <span className={`text-sm font-poppins ${
            product.condition === 'Nuevo' ? 'text-baby-green' : 'text-baby-blue'
          }`}>
            {product.condition === 'Nuevo' ? <FiStar className="inline mr-1" /> : <FiAlertCircle className="inline mr-1" />}
            {product.condition}
          </span>
          <span className="text-sm text-coffee/80 font-poppins">• Talla {product.size}</span>
        </div>

        <h3 className="font-playfair text-coffee text-xl font-semibold truncate">{product.name}</h3>
        <p className="text-baby-blue font-poppins text-sm">{product.brand}</p>

        <div className="flex flex-wrap gap-2 pt-2">
          {product.forSale && (
            <div className="bg-baby-green/20 px-2 py-1 rounded-md">
              <span className="text-baby-green font-poppins text-sm">Venta: ${product.salePrice}</span>
            </div>
          )}
          {product.forRent && (
            <div className="bg-baby-blue/20 px-2 py-1 rounded-md">
              <span className="text-baby-blue font-poppins text-sm">Alquiler: ${product.dailyPrice}/día</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;