import { useTranslation } from "react-i18next";
import { ExternalLink, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import vesuvianoImg from "@/assets/portfolio-vesuviano.png";
import zapperImg from "@/assets/portfolio-zapper.png";

export const SocialProofSection = () => {
  const { t } = useTranslation();

  const portfolioItems = [
    {
      name: "Vesuviano Forni",
      url: "https://www.vesuvianoforni.com/en",
      image: vesuvianoImg,
      rating: 5,
      testimonial: t("websiteInOneDay.socialProof.testimonial1"),
      author: t("websiteInOneDay.socialProof.author1"),
      role: t("websiteInOneDay.socialProof.role1")
    },
    {
      name: "Zapper Pro",
      url: "https://pro.abbattitorizapper.it/",
      image: zapperImg,
      rating: 5,
      testimonial: t("websiteInOneDay.socialProof.testimonial2"),
      author: t("websiteInOneDay.socialProof.author2"),
      role: t("websiteInOneDay.socialProof.role2")
    }
  ];

  return (
    <section className="py-20 px-4 bg-card/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="font-title text-4xl md:text-5xl mb-6">
            {t("websiteInOneDay.socialProof.title1")}{" "}
            <span className="gradient-text">{t("websiteInOneDay.socialProof.title2")}</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t("websiteInOneDay.socialProof.subtitle")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {portfolioItems.map((item, index) => (
            <div 
              key={index}
              className="glass-card rounded-2xl overflow-hidden hover:shadow-tech transition-all duration-300 group"
            >
              {/* Website Preview */}
              <div className="relative overflow-hidden aspect-video">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                  <Button 
                    variant="secondary" 
                    size="sm"
                    className="gap-2"
                    onClick={() => window.open(item.url, '_blank')}
                  >
                    <ExternalLink className="w-4 h-4" />
                    {t("websiteInOneDay.socialProof.visitSite")}
                  </Button>
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-subtitle text-2xl">{item.name}</h3>
                  <div className="flex gap-1">
                    {Array.from({ length: item.rating }).map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                    ))}
                  </div>
                </div>

                {/* Testimonial */}
                <blockquote className="mb-6">
                  <p className="text-muted-foreground italic mb-4">
                    "{item.testimonial}"
                  </p>
                  <footer className="text-sm">
                    <div className="font-subtitle text-foreground">{item.author}</div>
                    <div className="text-muted-foreground">{item.role}</div>
                  </footer>
                </blockquote>

                <Button 
                  variant="outline" 
                  className="w-full gap-2"
                  onClick={() => window.open(item.url, '_blank')}
                >
                  <ExternalLink className="w-4 h-4" />
                  {t("websiteInOneDay.socialProof.viewProject")}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
