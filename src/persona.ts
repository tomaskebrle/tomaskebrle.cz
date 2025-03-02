interface SectionItem {
  title: string;
  desc: string;
  url: string;
}

interface Contact {
  title: string;
  url: string;
}

interface Persona {
  firstName: string;
  secondName: string;
  description: string;
  email: string;
  story: string;
  sections: {
    projects: SectionItem[];
    experience: SectionItem[];
  };
}

export const persona: Persona = {
  firstName: "Tomáš",
  secondName: "Kebrle",
  description: "Software & DevOps Engineer",
  email: "contact@tomaskebrle.cz",
  story:
    "I’m  focused on automating the boring stuff. I work with cloud tech, CI/CD, and automation, using tools like GitHub Actions, Ansible, Azure, Terraform, and Docker to get things done. I enjoy solving real problems and making tech work better. Let’s team up if you need the boring stuff automated.",
  sections: {
    projects: [
      {
        title: "Tour de App",
        desc: "Maintaing and improving deployment system for the Tour de App competition",
        url: "https://tourde.app",
      },
      {
        title: "Gluco miner",
        desc: "Automating data extraction from glucose meters for doctors",
        url: "https://www.hackhealth.eu/wp-content/uploads/2023/11/261123_TZ_European-Healthcare-Hackathon-2023_vysledky.pdf",
      },
    ],
    experience: [
      {
        title: "DevOps Engineer",
        desc: "Evrise",
        url: "https://www.evrise.cz/",
      },
      {
        title: "Full stack developer",
        desc: "Bindworks",
        url: "https://www.bindworks.eu/",
      },
    ],
  },
};
