import Navbar from "./Navbar";

import sli from "../../assets/sli.png";
import phone from "../../assets/phoneIcon.png";

function Header() {
  return (
    <div className="w-full h-1/10 flex justify-evenly items-center">
      <div className="w-1/10">
        <img src={sli} alt="sli_image" className="h-14 rounded-full" />
      </div>
      <div className="w-6/10">
        <Navbar />
      </div>
      <div className="flex gap-4">
        < img src={phone} alt="phone_icon" className="h-10 hover:scale-110 cursor-pointer" />
        <div className="rounded-xl text-white bg-blue-800 flex items-center justify-center px-4 py-2 cursor-pointer hover:scale-105 ">Essaie</div>
      </div>
    </div>
  );
}

export default Header;
