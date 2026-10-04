import {
  BottomBanner,
  ExperienceBox,
  Gallery,
  HobbiesBox,
  MailBox,
  ProfileCard,
  ProjectsCard,
  SkillsBox,
} from "../_components";

export default function Home() {
  return (
    <main className="portfolio-container">
      <div className="bento-grid">
        <div className="card-profile bento-card">
          <ProfileCard />
        </div>

        <div className="middle-column">
          <div className="card-experience bento-card max-[600px]:hidden">
            <ExperienceBox />
          </div>

          <div className="middle-row">
            <div className="bento-card">
              <SkillsBox />
            </div>
            <div className="bento-card ">
              <Gallery />
            </div>
          </div>
          <div className="bottom-row">
            <div className="bento-card ">
              <MailBox />
            </div>
            <div className="bento-card">
              <HobbiesBox />
            </div>
          </div>
        </div>
        <div className="projects-card bento-card max-md:min-h-160">
          <ProjectsCard />
        </div>

        <div className="pixel-banner bento-card max-[600px]:min-h-36">
          <BottomBanner />
        </div>
      </div>
    </main>
  );
}
