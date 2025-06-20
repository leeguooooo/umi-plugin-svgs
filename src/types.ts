export interface SVGGeneratorOptions {
  entry: string;
  output: string;
}

export interface PluginConfig {
  entry: string;
  output?: string;
  alias?: string;
}

export interface SVGComponentMap {
  [key: string]: (props: any) => JSX.Element;
}