import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const carouselItems = [
  {
    image: "/slide1.jpg",
    title: "Seamless Student Management,",
    subtitle: "Track Progress with Ease",
  },
  {
    image: "/slide2.jpg",
    title: "Empower Teachers,",
    subtitle: "Streamline Daily Tasks",
  },
  {
    image: "/slide3.jpg",
    title: "Engage Parents,",
    subtitle: "Foster Collaboration",
  },
];

export default function CustomCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + carouselItems.length) % carouselItems.length
    );
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div className="p-0 h-full">
        <div className="absolute inset-0">
          {carouselItems.map((item, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                src={item.image}
                alt={`Slide ${index + 1}`}
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-primary/50" />
            </div>
          ))}
        </div>
        <div className="absolute inset-x-0 bottom-0 top-0 flex flex-col items-center justify-end p-6 text-primary-foreground">
          <h2 className="text-3xl font-bold mb-2">
            {carouselItems[currentSlide].title}
          </h2>
          <p className="text-xl mb-8">{carouselItems[currentSlide].subtitle}</p>
          <div className="flex space-x-2 mb-4">
            {carouselItems.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentSlide
                    ? "bg-primary-foreground w-4"
                    : "bg-primary-foreground/50"
                }`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-4 top-1/2 transform -translate-y-1/2"
          onClick={prevSlide}
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-1/2 transform -translate-y-1/2"
          onClick={nextSlide}
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6" />
        </Button>
      </div>
    </div>
  );
}
