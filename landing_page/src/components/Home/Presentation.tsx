import mobilePic1 from "@/assets/mobilePic1.jpg";
import mobilePic2 from "../../assets/mobilePic2.jpg";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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

function Carrousel() {
  return (
    <Carousel className="w-full max-w-9/10" opts={{ loop: true }}>
      <CarouselContent className="">
        {items.map((item, index) => (
          <CarouselItem key={index} className="flex items-center justify-center">
            <div className="flex-col flex gap-8 w-5/10 items-center">
              <h2 className="text-6xl text-center font-bold">{item.title}</h2>
              <p className="text-xl text-center w-7/10">{item.text}</p>
              <div className="flex gap-8 w-full justify-evenly mt-8">
                <img src={item.images[0]} alt="" className="h-96" />
                <img src={item.images[1]} alt="" className="h-96" />
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

export default Carrousel;
