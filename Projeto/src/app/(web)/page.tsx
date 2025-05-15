import FeaturedRoom from '@/components/FeaturedAssociacao/FeaturedAssociacao';
import Gallery from '@/components/Gallery/Gallery';
import HeroSection from '@/components/HeroSection/HeroSection';
import NewsLetter from '@/components/NewsLetter/NewsLetter';
import PageSearch from '@/components/PageSearch/PageSearch';
import { getFeaturedAssociacao } from '@/libs/apis';

const Home = async () => {
  const featuredAssociacao = await getFeaturedAssociacao();

  return (
    <>
      <HeroSection />
      <PageSearch />
      <FeaturedRoom featuredAssociacao={featuredAssociacao} />
       <Gallery />
      <NewsLetter />
    </>
  );
};

export default Home;
