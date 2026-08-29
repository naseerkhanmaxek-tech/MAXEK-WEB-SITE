/**
 * Image registry.
 *
 * Priority 1 — official MAXEK assets (never replaced or modified).
 * Priority 2 — premium realistic stock photography for gaps where no
 *              official asset exists (approved by the client).
 */
const U = "https://images.unsplash.com";
const P = process.env.PUBLIC_URL || "";
const q = (id, w = 1600) =>
  `${U}/${id}?crop=entropy&cs=srgb&fm=jpg&q=82&w=${w}`;

/* ---------------- Official MAXEK assets ---------------- */
export const OFFICIAL = {
  heroVideo: "/assets/video/maxek-hero.mp4",
  logoLight: "/assets/logos/maxek-logo-dark.webp",
  logoDark: "/assets/logos/maxek-logo-light.webp",
  careers: `${P}/images/Careers/maxek-careers.png`,
  aboutIntegrated: `${P}/images/about/maxek-about-integrated-hero.png`,
  industriesHero: "/assets/images/industries-hero-new.png",
  projects: {
    industrialPlant: "/assets/projects/industrial-plant-construction-maxek-sm.webp",
    factorySteel: "/assets/projects/factory-infrastructure-steel-fabrication-maxek-sm.webp",
    commercialTower: "/assets/projects/high-rise-commercial-tower-kerala-maxek-sm.webp",
    urbanInfra: "/assets/projects/urban-infrastructure-development-maxek-sm.webp",
    heroDiagram: "/assets/projects/projects-hero-diagram.png",
  },
};

/* ---------------- Premium stock photography ---------------- */
export const STOCK = {
  factoryHall: q("photo-1716191299945-4c5b89703971"),
  factoryMachines: q("photo-1717386255773-1e3037c81788"),
  industrialInterior: q("photo-1767294274634-613a3545e36d"),
  industrialRoof: q("photo-1781156215317-890d3092e7b1"),
  robotArm: q("photo-1716191299980-a6e8827ba10b"),
  robotLine: q("photo-1647427060118-4911c9821b82"),
  steelFrameSunset: q("uploads/14123892966835548e7bd/14369636"),
  steelFrameOrange: q("photo-1493476523860-a6de6ce1b0c3"),
  welder: q("photo-1698664683348-f9f35b809821"),
  grinding: q("photo-1598302936625-6075fbd98dd7"),
  blueprints: q("photo-1772442198624-4fc4d7281e89"),
  siteTablet: q("photo-1778074762022-c33cc42f79ae"),
  dataCenter: q("photo-1695668548342-c0c1ad479aee"),
  dataCenterRacks: q("photo-1639066648921-82d4500abf1a"),
  networkCables: q("photo-1558494949-ef010cbdcc31"),
  analytics: q("photo-1763038311036-6d18805537e5"),
  dashboard: q("photo-1599658880436-c61792e70672"),
  teamLaptops: q("photo-1579389083046-e3df9c2b3325"),
  boardroom: q("photo-1758518730083-4c12527b6742"),
  boardroomTeam: q("photo-1758518731706-be5d5230e5a5"),
  meetingTable: q("photo-1758518730037-a16581a040e8"),
  presenting: q("photo-1758691736424-4b4273948341"),
  glassCurve: q("photo-1621831337128-35676ca30868"),
  glassTowerUp: q("photo-1690944851207-3f288c8fcd0b"),
  glassEdge: q("photo-1707823942892-3316eeb091a0"),
  glassOffice: q("photo-1686676104932-3d7b6bbaef52"),
  windSunset: q("photo-1466611653911-95081537e5b7"),
  solarWind: q("photo-1595437193398-f24279553f4f"),
  windFarm: q("photo-1587168173357-99c7e95fb5cd"),
  containers: q("photo-1678182451047-196f22a4143e"),
  port: q("photo-1578575437130-527eed3abbec"),
  highwayNight: q("photo-1771905602928-686083193af8"),
  cityBridge: q("photo-1771289120449-8615556dd92c"),
  campus: q("photo-1765294064316-6c72add9e9e6"),
  institution: q("photo-1765294064618-87568cad00a3"),
};

/* Industry → image map (Industries page) */
export const INDUSTRY_IMAGES = {
  Manufacturing: STOCK.factoryMachines,
  Infrastructure: STOCK.highwayNight,
  Industrial: OFFICIAL.projects.factorySteel,
  Commercial: OFFICIAL.projects.commercialTower,
  Energy: STOCK.solarWind,
  Technology: STOCK.dataCenter,
  Healthcare: STOCK.institution,
  Education: STOCK.campus,
  Government: STOCK.glassEdge,
  Logistics: STOCK.containers,
  "Real Estate": STOCK.glassTowerUp,
  Automotive: STOCK.robotLine,
};
