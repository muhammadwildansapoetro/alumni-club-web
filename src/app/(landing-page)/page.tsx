import Footer from "./_components/_footer";
import HeroSection from "./_components/_hero-section";
import MembershipTiers from "./_components/_membership-tiers";
import FeaturesSection from "./_components/_features-section";
import OrgStructure from "./_components/_org-structure";
import TopBar from "./_components/_topbar";

export default function Home() {
    return (
        <div>
            <TopBar />
            <HeroSection />
            <MembershipTiers />
            <FeaturesSection />
            <OrgStructure />
            <Footer />
        </div>
    );
}
