import  { useState, useEffect } from "react";
import mobilePic1 from "@/assets/mobilePic1.jpg";
import mobilePic2 from "../../assets/mobilePic2.jpg";

const items = [
  {
    title: "La puissance de votre logiciel, en toute mobilité.",
    text: "Transformez votre façon de travailler avec notre application mobile. Profitez de toutes les fonctionnalités de votre logiciel de bureau, où que vous soyez, et boostez votre productivité en toute simplicité.",
    images: [mobilePic1, mobilePic2],
  },
  {
    title: "Gestion commerciale et de stock",
    text: "Gérez efficacement vos clients, vos articles, et vos stocks avec notre solution mobile. Accédez à toutes les fonctionnalités de gestion commerciale où que vous soyez et assurez un suivi précis et à jour de vos opérations.",
    images: [mobilePic1, mobilePic2],
  },
  {
    title: "Gestion de chantier et devis",
    text: "Simplifiez la gestion de vos chantiers et l'établissement de vos devis grâce à notre application mobile. Profitez d'outils dédiés pour organiser vos projets, suivre l'avancement des travaux, et générer des devis précis et détaillés.",
    images: [mobilePic1, mobilePic2],
  },
];

function Presentation() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [entering, setEntering] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setEntering(false);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
        setEntering(true);
      }, 3000); // Transition time
    }, 8000); // Display time + transition time

    return () => clearInterval(interval);
  }, []);

  return (
      <div className="w-5.5/10 flex flex-col items-center relative overflow-hidden h-240 ">
        {items.map((item, index) => (
          <div
            key={index}
            className={`absolute transition-transform duration-3000 ease-in-out ${
              index === currentIndex
                ? entering
                  ? "translate-x-0"
                  : "-translate-x-full"
                : entering
                ? "translate-x-full"
                : "-translate-x-full"
            }`}
          >
            <div className="flex-col flex gap-8">
              <h2 className="text-6xl text-center font-bold">{item.title}</h2>
              <p className="text-xl text-center">{item.text}</p>
            </div>
            <div className="flex gap-8 w-full justify-evenly mt-8">
              <img src={item.images[0]} alt="" className="h-120" />
              <img src={item.images[1]} alt="" className="h-120" />
            </div>
          </div>
        ))}
      </div>
  );
}

export default Presentation;
