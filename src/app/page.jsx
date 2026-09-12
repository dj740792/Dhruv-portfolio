

import {
  BottomBanner,
  ExperienceBox,
  Gallery,
  ProfileCard,
  ProjectsCard,
  SkillsBox,
  SocialsBar,
} from "./components";

export default function Home() {
  return (
    <main className="portfolio-container">
      <div className="bento-grid">
        {/* Left Column */}
        <div className="card-profile bento-card">
          <ProfileCard />
        </div>
        <div className="card-experience bento-card">
          <ExperienceBox />
        </div>

        {/* Middle Column */}
        <div className="middle-top-row">
          <div className="bento-card">
            <SkillsBox />
          </div>
          <div className="bento-card">
            <Gallery />
          </div>
        </div>
        <div className="card-center-featured bento-card">
          <p style={{ color: "#888" }}></p>
        </div>

        {/* Right Column */}
        <div className="socials-bar bento-card">
          <SocialsBar />
        </div>
        <div className="projects-card bento-card">
          <ProjectsCard />
        </div>

        {/* Bottom Spanning Banner */}
        <div className="pixel-banner bento-card">
          <BottomBanner />
        </div>
      </div>
    </main>
  );
}