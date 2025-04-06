import GuestNavBar from "./GuestNavBar";
import HeroSection from "./HeroSection";
import Categories from "./Categories";
import Footer from "./Footer";
import HowItWorks from "./HowItWorks";

const LandingPage = () => {
  return (
    <div style={styles.container}>
      <GuestNavBar />

      <HeroSection />

      <Categories />

      <HowItWorks />

      <Footer></Footer>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#E1DAD3',
    minHeight: '100vh',
    fontFamily: "'Poppins', sans-serif",
    position: 'relative',
    overflow: 'hidden',
  },
};

export default LandingPage;