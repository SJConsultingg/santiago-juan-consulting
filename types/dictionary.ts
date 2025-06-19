export interface Dictionary {
  common: {
    language: string;
    loading: string;
    error: string;
    success: string;
    submit: string;
    cancel: string;
    accept: string;
    reject: string;
    more_info: string;
    back: string;
    next: string;
    previous: string;
    close: string;
  };
  nav: {
    home: string;
    services: string;
    process: string;
    contact: string;
    whyMe?: string;
  };
  footer: {
    quick_links: string;
    legal: string;
    privacy_policy: string;
    terms: string;
    cookies: string;
    copyright: string;
    contact?: string;
    readyToScale?: string;
    scheduleCall?: string;
    allRightsReserved?: string;
    founder?: string;
  };
  cookies: {
    title: string;
    message: string;
    accept: string;
    reject: string;
    more_info: string;
  };
  legal: {
    privacy: {
      title: string;
      last_updated: string;
    };
    terms: {
      title: string;
      last_updated: string;
    };
    cookies: {
      title: string;
      last_updated: string;
    };
  };
  hero?: {
    title?: string;
    subtitle?: string;
    part1?: string;
    part2?: string;
    part3?: string;
    caption?: string;
    cta?: string;
  };
  services?: {
    title?: string;
    subtitle?: string;
    items?: {
      title: string;
      description: string;
    }[];
  };
  process?: {
    title?: string;
    subtitle?: string;
    steps?: {
      title: string;
      description: string;
    }[];
  };
  whyMe?: {
    title?: string;
    subtitle?: string;
    reasons?: {
      title: string;
      description: string;
    }[];
  };
  cta?: {
    title?: string;
    subtitle?: string;
    buttonText?: string;
  };
  diagnosis?: {
    title?: string;
    subtitle?: string;
    description?: string;
    startButton?: string;
    restartButton?: string;
    backButton?: string;
    nextButton?: string;
    submitButton?: string;
    loadingText?: string;
    errorText?: string;
    successText?: string;
  };
} 