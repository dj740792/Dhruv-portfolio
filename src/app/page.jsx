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
          <div className="card-experience bento-card bg-green-400">
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
        <div className="projects-card bento-card bg-orange-400">
          <ProjectsCard />
        </div>

        <div className="pixel-banner bento-card bg-purple-700">
          <BottomBanner />
        </div>
      </div>
    </main>
  );
}
