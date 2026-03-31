import BecasaCampBanner from "@/components/becasa/BecasaCampBanner";
import BecasaHeroSlider from "@/components/becasa/BecasaHeroSlider";
import BecasaCard from "@/components/becasa/BecasaCard";
import PreguntasFrecuentesMasVideo from "@/components/becasa/PreguntasFrecuentesMasVideo";

export default function Becasa() {
    
    return(
        <div>
           <BecasaHeroSlider />
           <BecasaCampBanner />
           <BecasaCard />
           <PreguntasFrecuentesMasVideo />
        </div>
    )
}