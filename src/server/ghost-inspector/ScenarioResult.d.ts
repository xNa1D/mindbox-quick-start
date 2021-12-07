export type ScenarioResult = {
  code?: string;
  data: Data;
}
export type Data = {
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
export type Error = {
  details?: string;
}
export type User = {
  _id?: string;
  name?: string;
}
export type Video = {
  dims?: Dims;
  path?: string;
  url?: string;
}
export type Dims = {
  w?: number;
  h?: number;
}
export type ViewportSize = {
  width?: number;
  height?: number;
}
export type ConsoleEntity = {
  _id?: string;
  dateExecuted?: string;
  error?: boolean;
  output?: string;
  url?: string;
}
export type StepsEntity = {
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
export type Condition = {
  statement?: string;
  result?: boolean;
}
export type OriginalTargetEntityOrTargetEntity = {
  selector?: string;
}
export type Extra = {
  source?: Source;
  rootSequence?: number;
  originalTarget?: OriginalTargetEntityOrTargetEntity[] | null;
}
export type Source = {
  test?: string;
  sequence?: number;
}
export type Test = {
  name?: string;
  _id?: string;
  organization?: string;
  suite?: string;
}
export type Variables = {
  projectName?: string;
  campaign?: string;
}
export type Screenshot = {
  small?: SmallOrOriginalOrCompareSmallOrCompareOriginal;
  original?: SmallOrOriginalOrCompareSmallOrCompareOriginal;
}
export type SmallOrOriginalOrCompareSmallOrCompareOriginal = {
  path?: string;
  defaultUrl?: string;
  size?: number;
  dims?: Dims;
}
export type ScreenshotCompare = {
  compareSmall?: SmallOrOriginalOrCompareSmallOrCompareOriginal;
  compareOriginal?: SmallOrOriginalOrCompareSmallOrCompareOriginal;
}
