import AlumniStory from "./(landing-page-section)/alumni-story";
import Footer from "./(landing-page-section)/footer";
import HeroSection from "./(landing-page-section)/hero-section";
import SearchAlumni from "./(landing-page-section)/search-alumni";
import Statistic from "./(landing-page-section)/statistic";
import TopBar from "./(landing-page-section)/topbar";

export default async function Home() {
    await new Promise((r) => setTimeout(r, 2000));

    return (
        <div>
            <TopBar />
            <HeroSection />
            {/* <SearchAlumni /> */}
            <Statistic />
            <AlumniStory />
            <Footer />
        </div>
    );
}
