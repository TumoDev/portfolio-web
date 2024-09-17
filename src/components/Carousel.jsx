import React, { useEffect, useState } from 'react';

const Carousel = ({ featuredPosts }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [visibleSlides, setVisibleSlides] = useState(3); // Número de elementos visibles a la vez

    // Ajustar el número de elementos visibles basado en el tamaño de la pantalla
    useEffect(() => {
        const updateVisibleSlides = () => {
            if (window.innerWidth < 640) { // Pantallas pequeñas (por ejemplo, menos de 640px)
                setVisibleSlides(1);
            } else {
                setVisibleSlides(3);
            }
        };

        // Llamar a la función al cargar y cuando la ventana cambie de tamaño
        updateVisibleSlides();
        window.addEventListener('resize', updateVisibleSlides);
        
        // Limpiar el evento cuando el componente se desmonte
        return () => window.removeEventListener('resize', updateVisibleSlides);
    }, []);

    // Función para avanzar al siguiente conjunto de elementos
    const nextSlide = () => {
        setCurrentSlide((prevSlide) =>
            (prevSlide - visibleSlides + featuredPosts.length) % featuredPosts.length
        );
    };

    // Función para retroceder al conjunto anterior de elementos
    const prevSlide = () => {
        setCurrentSlide((prevSlide) =>
            (prevSlide + visibleSlides) % featuredPosts.length
        );
    };

    useEffect(() => {
        const interval = setInterval(nextSlide, 3000); // Cambia de slide cada 3 segundos
        return () => clearInterval(interval);
    }, [featuredPosts.length, visibleSlides]);

    return (
        <div className="overflow-hidden relative w-full max-w-4xl mx-auto">
            {/* Flecha para retroceder */}
            <button
                className="absolute top-1/2 left-0 z-10 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700"
                onClick={prevSlide}
            >
                &#9664;
            </button>

            {/* Carrusel de elementos */}
            <div
                id="carousel-slide"
                className="flex transition-transform duration-500"
                style={{ transform: `translateX(-${(currentSlide * 100) / visibleSlides}%)` }}
            >
                {/* Mostrar los elementos según el número de slides visibles */}
                {featuredPosts.map((post, index) => (
                    <div
                        key={index}
                        className="flex-shrink-0"
                        style={{ width: `${100 / visibleSlides}%` }}
                    >
                        <div className="bg-gray-700 p-4 rounded-lg text-center mx-2">
                            <h3 className="text-xl font-semibold text-teal-400 mb-2">{post.title}</h3>
                            <p className="text-sm text-gray-400 mb-2">{post.date}</p>
                            <a
                                href={post.link}
                                className="inline-block mt-2 bg-teal-500 text-white px-3 py-1 rounded hover:bg-teal-600 transition"
                            >
                                Leer más
                            </a>
                        </div>
                    </div>
                ))}
            </div>

            {/* Flecha para avanzar */}
            <button
                className="absolute top-1/2 right-0 z-10 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700"
                onClick={nextSlide}
            >
                &#9654;
            </button>
        </div>
    );
};

export default Carousel;
