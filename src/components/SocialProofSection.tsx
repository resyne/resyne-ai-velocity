import { Star, ExternalLink } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Card } from "@/components/ui/card";
import portfolioVesuviano from "@/assets/portfolio-vesuviano.png";
import portfolioZapper from "@/assets/portfolio-zapper.png";

export const SocialProofSection = () => {
  const { t } = useTranslation();

  const portfolioItems = [
    {
      name: "Vesuviano Forni",
      url: "https://www.vesuvinaoforni.com",
      image: portfolioVesuviano,
      testimonial: t("websiteInOneDay.socialProof.testimonials.vesuviano"),
      author: t("websiteInOneDay.socialProof.authors.vesuviano"),
      role: t("websiteInOneDay.socialProof.roles.vesuviano"),
    },
    {
      name: "Zapper Pro",
      url: "https://pro.abbattitorizapper.it/",
      image: portfolioZapper,
      testimonial: t("websiteInOneDay.socialProof.testimonials.zapper"),
      author: t("websiteInOneDay.socialProof.authors.zapper"),
      role: t("websiteInOneDay.socialProof.roles.zapper"),
    },
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-background to-card/50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="font-title text-4xl md:text-5xl mb-4">
            {t("websiteInOneDay.socialProof.title1")}{" "}
            <span className="gradient-text">{t("websiteInOneDay.socialProof.title2")}</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            {t("websiteInOneDay.socialProof.subtitle")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {portfolioItems.map((item, index) => (
            <Card key={index} className="overflow-hidden glass-card hover:shadow-tech transition-all duration-300">
              <a 
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block relative group"
              >
                <div className="relative overflow-hidden aspect-video">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                    <div className="flex items-center gap-2 text-primary font-subtitle">
                      <span>{t("websiteInOneDay.socialProof.visitSite")}</span>
                      <ExternalLink className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </a>

              <div className="p-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                  ))}
                </div>

                <p className="text-foreground mb-4 italic">
                  "{item.testimonial}"
                </p>

                <div className="border-t border-border pt-4">
                  <p className="font-subtitle text-sm">{item.author}</p>
                  <p className="text-sm text-muted-foreground">{item.role}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
