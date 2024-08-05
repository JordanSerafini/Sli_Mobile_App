import mobilePic1 from "@/assets/mobilePic1.jpg";
import mobilePic2 from "../../assets/mobilePic2.jpg";

function Presentation() {
  return (
    <div className="w-5.5/10 gap-8 flex-col flex">
      {/* -------------------------------------------------------------------------------------- 1er item ------------------------------------------------------------------------------- */ }
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
 {/* -------------------------------------------------------------------------------------- 2eme item ------------------------------------------------------------------------------- */}
 <div className="flex-col flex gap-8">
        <h2 className="text-6xl text-center font-bold">
          Gestion commerciale et de stock
        </h2>
        <p className="text-xl text-center">
          Gérez efficacement vos clients, vos articles, et vos stocks avec notre
          solution mobile. Accédez à toutes les fonctionnalités de gestion
          commerciale où que vous soyez et assurez un suivi précis et à jour de
          vos opérations.
        </p>
      </div>

      {/* -------------------------------------------------------------------------------------- 3eme item ------------------------------------------------------------------------------- */}
      <div className="flex-col flex gap-8">
        <h2 className="text-6xl text-center font-bold">
          Gestion de chantier et devis
        </h2>
        <p className="text-xl text-center">
          Simplifiez la gestion de vos chantiers et l'établissement de vos devis
          grâce à notre application mobile. Profitez d'outils dédiés pour
          organiser vos projets, suivre l'avancement des travaux, et générer
          des devis précis et détaillés.
        </p>
      </div>
    </div>
  );
}



export default Presentation;
