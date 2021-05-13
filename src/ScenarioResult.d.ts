export interface ScenarioResult {
  code?: string;
  data: Data;
}
export interface Data {
  error?: Error;
  user?: User;
  video?: Video;
  viewportSize?: ViewportSize;
  autoRetryTriggered?: boolean;
  commentCount?: number;
  passing: boolean;
  screenshotCompareDifference?: number | null;
  screenshotComparePassing?: boolean | null;
  urls?: string[] | null;
  _id?: string;
  autoRetry?: boolean;
  browser?: string;
  comments?: null[] | null;
  console?: ConsoleEntity[] | null;
  dateCreated?: string;
  disableVisuals?: boolean;
  disallowInsecureCertificates?: boolean;
  endUrl?: string;
  executionHost?: string;
  executionTime?: number;
  failOnJavaScriptError?: boolean;
  filters?: null[] | null;
  finalDelay?: number;
  globalStepDelay?: number;
  language?: null;
  maxAjaxDelay?: number;
  maxWaitDelay?: number;
  name?: string;
  organization?: string;
  region?: string;
  screenshotCompareEnabled?: boolean;
  screenshotCompareThreshold?: number;
  startUrl?: string;
  steps: StepsEntity[] | null;
  suiteResult?: null;
  test?: Test;
  uuid?: string;
  variables?: Variables;
  dateExecutionStarted?: string;
  dateExecutionFinished?: string;
  screenshot?: Screenshot;
  screenshotCompare?: ScreenshotCompare;
  screenshotCompareBaselineResult?: string;
}
export interface Error {
  details?: string;
}
export interface User {
  _id?: string;
  name?: string;
}
export interface Video {
  dims?: Dims;
  path?: string;
  url?: string;
}
export interface Dims {
  w?: number;
  h?: number;
}
export interface ViewportSize {
  width?: number;
  height?: number;
}
export interface ConsoleEntity {
  _id?: string;
  dateExecuted?: string;
  error?: boolean;
  output?: string;
  url?: string;
}
export interface StepsEntity {
  sequence?: number;
  condition?: Condition | null;
  private?: boolean;
  optional?: boolean;
  passing?: boolean | null;
  _id?: string;
  target?: string | OriginalTargetEntityOrTargetEntity[] | null;
  command?: string;
  value?: string;
  variableName?: string;
  extra?: Extra;
  notes?: string;
  url?: string | null;
  dateExecuted?: string | null;
  error?: string | null;
}
export interface Condition {
  statement?: string;
  result?: boolean;
}
export interface OriginalTargetEntityOrTargetEntity {
  selector?: string;
}
export interface Extra {
  source?: Source;
  rootSequence?: number;
  originalTarget?: OriginalTargetEntityOrTargetEntity[] | null;
}
export interface Source {
  test?: string;
  sequence?: number;
}
export interface Test {
  name?: string;
  _id?: string;
  organization?: string;
  suite?: string;
}
export interface Variables {
  projectName?: string;
  campaign?: string;
}
export interface Screenshot {
  small?: SmallOrOriginalOrCompareSmallOrCompareOriginal;
  original?: SmallOrOriginalOrCompareSmallOrCompareOriginal;
}
export interface SmallOrOriginalOrCompareSmallOrCompareOriginal {
  path?: string;
  defaultUrl?: string;
  size?: number;
  dims?: Dims;
}
export interface ScreenshotCompare {
  compareSmall?: SmallOrOriginalOrCompareSmallOrCompareOriginal;
  compareOriginal?: SmallOrOriginalOrCompareSmallOrCompareOriginal;
}
