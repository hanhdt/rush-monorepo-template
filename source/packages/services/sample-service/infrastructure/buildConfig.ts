export interface BuildConfig {
  readonly AWSAccountID: string;
  readonly AWSProfileName: string;
  readonly AWSProfileRegion: string;

  readonly App: string;
  readonly Environment: string;
  readonly Solution: string;
  readonly Version: string;
  readonly Build: string;

  readonly Parameters: BuildParameters;
}

export interface BuildParameters {
  readonly LogLevel: string;
  readonly LambdaInsightsLayer: string;
  readonly ExternalApiUrl: string;

  readonly CanframesTableName: string;
}