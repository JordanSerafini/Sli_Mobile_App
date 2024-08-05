import Header from "@/components/Header/Header"
import Presentation from "@/components/Home/Presentation"


function Home() {
  return (
    <div className="h-screen w-screen bg-gray-200 items-center justify-start flex-col flex">
        <Header />
        <Presentation />
    </div>
  )
}

export default Home