export type ProjectType = "web" | "mobile";
export type Orientation = "landscape" | "portrait";

export interface ProjectStat {
  /** Big value, e.g. "36" or "POS" */
  n: string;
  /** Small uppercase label under the value */
  l: string;
}

export interface ProjectShot {
  /** Absolute path under /public, e.g. /assets/projects/samar/home.png */
  src: string;
  /** Caption shown in the device chrome, e.g. "HOME" */
  label: string;
  /** Secondary caption, e.g. "Lobby" */
  sub?: string;
}

export interface Project {
  title: string;
  /** proj-type pill, e.g. "Mobile · Multiplayer trivia game" */
  typeLabel: string;
  /** proj-tag line, e.g. "Flutter app · Yii2 backend" */
  tag: string;
  description: string;
  stack: string[];
  stats: ProjectStat[];
  projectType: ProjectType;
  orientation?: Orientation;
  projectUrl?: string;
  /** label shown in the device address/title bar */
  urlLabel?: string;
  shots: ProjectShot[];
}
