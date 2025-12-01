import { useState, useEffect } from "react";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FeaturedGameProps {
  title: string;
  description: string;
  image: string;
  category: string;
  reviews: string;
  scrollY: number;
}

export const FeaturedGame = ({
  title,
  description,
  image,
  category,
  reviews,
  scrollY,
}: FeaturedGameProps) => {
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    setIsAnimated(true);
  }, []);

  return (
    <section
      className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-primary/80 to-primary/40 p-8 group cursor-pointer hover-lift"
      style={{
        transform: `translateY(${scrollY * 0.05}px)`,
      }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute top-0 right-0 w-96 h-96 bg-primary/30 rounded-full blur-3xl animate-pulse"
          style={{
            animation: "float 6s ease-in-out infinite",
          }}
        />
      </div>

      <div className="relative flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8">
        {/* Content */}
        <div className={`flex-1 ${isAnimated ? "animate-slide-in-left" : ""}`}>
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-primary-foreground/20 rounded-full text-xs font-semibold animate-fade-in-down">
              {category}
            </span>
            <span className="flex items-center gap-1 text-sm animate-fade-in-down stagger-1">
              ✓ Verificado
            </span>
          </div>

          <h2 className="text-4xl font-bold mb-3 animate-fade-in-up stagger-1">{title}</h2>

          <p className="text-primary-foreground/90 mb-4 max-w-md animate-fade-in-up stagger-2">
            {description}
          </p>

          <div className="flex items-center gap-4 animate-fade-in-up stagger-3">
            <Button className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 hover-scale">
              <Play size={16} className="mr-2" />
              Jogar Agora
            </Button>
            <span className="text-sm font-semibold">+{reviews} Avaliações</span>
          </div>
        </div>

        {/* Image with parallax */}
        <div
          className={`w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 relative flex-shrink-0 ${isAnimated ? "animate-slide-in-right" : ""}`}
          style={{
            transform: `translateX(${scrollY * 0.03}px) scale(${1 + scrollY * 0.0001})`,
          }}
        >
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover rounded-lg group-hover:scale-110 transition-transform duration-500 shadow-2xl"
          />

          {/* Glow effect */}
          <div className="absolute inset-0 rounded-lg bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </div>
    </section>
  );
};
