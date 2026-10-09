export interface GuideStep {
  title: string;
  body: string;
  /** Terminal commands to copy. */
  code?: string;
  note?: string;
}

export interface GuideSection {
  id: string;
  title: string;
  steps: GuideStep[];
}
