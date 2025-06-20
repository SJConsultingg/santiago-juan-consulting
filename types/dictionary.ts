export interface Dictionary {
  [key: string]: any;
  meta: {
    title: string;
    description: string;
    keywords: string;
  };
  navbar: {
    services: string;
    process: string;
    whyMe: string;
    contact: string;
    diagnosis?: string;
  };
  language: {
    switchTo: string;
  };
  footer: {
    founder: string;
    quickLinks: string;
    contact: string;
    readyToScale: string;
    scheduleCall: string;
    allRightsReserved: string;
  };
} 