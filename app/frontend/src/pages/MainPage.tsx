import Navbar from "@/components/Navbar";
import Profile from "./Profile";
import Table from "@/components/Table";
import IncidentsPage from "@/components/IncidentsPage";
import Ymaps from "./map/index";
import Addresses from "./addresses/index";
export default function MainPage() {
    return(
        <main className="absolute w-screen h-screen">
            <Addresses />
        </main>
    )
}
