import Footer from "./_components/_footer";
import HeroSection from "./_components/_hero-section";
import TopBar from "./_components/_topbar";

export default async function Home() {
    await new Promise((r) => setTimeout(r, 2000));

    return (
        <div>
            <TopBar />
            <HeroSection />
            {/* <SearchAlumni /> */}
            {/* <Statistic /> */}
            {/* <AlumniStory /> */}
            <Footer />
        </div>
    );
}
