import Card from '../../../components/ui/Card';

export const CategoryCard = ({ category }) => {
  return (
    <Card className="relative group h-[400px] cursor-pointer overflow-hidden rounded-xl border-0 shadow-lg">
      <img
        src={category.image}
        alt={category.name}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
      
      {/* Badge */}
      <div className="absolute top-4 left-4">
        <span className="bg-white/20 backdrop-blur-md text-white text-[10px] uppercase tracking-wider font-bold px-3 py-1.5 rounded-md">
          {category.listings} LISTINGS
        </span>
      </div>
      
      {/* Content */}
      <div className="absolute bottom-6 left-6 right-6">
        <h3 className="text-white text-2xl font-bold mb-2">
          {category.name}
        </h3>
        <p className="text-white/70 text-sm line-clamp-2 leading-relaxed">
          {category.description}
        </p>
      </div>
    </Card>
  );
};
