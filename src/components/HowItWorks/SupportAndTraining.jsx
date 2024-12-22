import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HeadphonesIcon, BookOpen, Video, Users } from "lucide-react";
import SectionHeader from "../ui/section-header";

const supportOptions = [
  {
    title: "24/7 Customer Support",
    description:
      "Our dedicated support team is available round the clock to assist you with any issues or questions.",
    icon: HeadphonesIcon,
  },
  {
    title: "Comprehensive Documentation",
    description:
      "Access detailed user guides and documentation to help you make the most of the system.",
    icon: BookOpen,
  },
  {
    title: "Video Tutorials",
    description:
      "Learn at your own pace with our library of video tutorials covering all aspects of the system.",
    icon: Video,
  },
  {
    title: "On-site Training",
    description:
      "We offer personalized on-site training sessions to ensure your staff is fully equipped to use the system.",
    icon: Users,
  },
];

export function SupportAndTraining() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">
          <SectionHeader
            logo="🎓"
            title="Continuous Assistance"
            heading="Comprehensive Support & Training"
            description="We provide extensive support and training options to ensure you get the most out of our school management system."
          />
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {supportOptions.map((option, index) => (
            <Card key={index} className="transition-all hover:shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <option.icon className="w-6 h-6 mr-2" aria-hidden="true" />
                  <span>{option.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>{option.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
