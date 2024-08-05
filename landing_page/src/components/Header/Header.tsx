import { Button } from "../ui/button";
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
        < img src={phone} alt="phone_icon" className="h-10" />
        <Button variant="outline" className="rounded-xl border-blue-800 text-blue-800 bg-gray-50">Essayer</Button>
      </div>
    </div>
  );
}

export default Header;
