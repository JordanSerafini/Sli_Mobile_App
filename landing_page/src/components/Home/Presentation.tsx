import mobilePic1 from "@/assets/mobilePic1.jpg";
import mobilePic2 from "../../assets/mobilePic2.jpg";

function Presentation() {
  return (
    <div className="w-5.5/10 gap-8 flex-col flex">
      <div className=" flex-col flex gap-8">
        <h2 className="text-6xl text-center font-bold">
          La puissance de votre logiciel, en toute mobilité.
        </h2>
        <p className="text-xl text-center">
          Transformez votre façon de travailler avec notre application mobile.
          Profitez de toutes les fonctionnalités de votre logiciel de bureau, où
          que vous soyez, et boostez votre productivité en toute simplicité.
        </p>
      </div>
      <div className="flex gap-8 w-full justify-evenly">
        <img src={mobilePic1} alt="" className="h-120"  />
        <img src={mobilePic2} alt="" className="h-120" />

      </div>
    </div>
  );
}

export default Presentation;
