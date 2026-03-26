import Footer from "./_components/_footer";
import TopBar from "./_components/_topbar";
import Membership from "./_components/_membership";
import Dashboard from "./_components/_dashboard";
import About from "./_components/_about";
import Hero from "./_components/_hero";
import AlumniStories from "./_components/_alumni-stories";

export default function Home() {
    return (
        <div>
            <TopBar />
            <Hero />
            <About />
            <Membership />
            <Dashboard />
            <AlumniStories />
            <Footer />
        </div>
    );
}
