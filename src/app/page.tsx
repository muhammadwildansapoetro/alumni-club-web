import AlumniStory from "./(landing-page)/alumni-story";
import Footer from "./(landing-page)/footer";
import HeroSection from "./(landing-page)/hero-section";
import SearchAlumni from "./(landing-page)/search-alumni";
import Statistic from "./(landing-page)/statistic";
import TopBar from "./(landing-page)/top-bar";

export default function Home() {
    return (
        <div>
            <TopBar />
            <HeroSection />
            <SearchAlumni />
            <Statistic />
            <AlumniStory />
            <Footer />
        </div>
    );
}
