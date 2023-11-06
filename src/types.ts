import type { Ref } from "vue";

export interface HostList {
  name: string;
  version?: string | number;
  disabled?: boolean;
}

export interface Tool {
  hover: Ref<boolean>;
  animation: any;
}

export interface Tools {
  checkpoint: Tool;
  snatch: Tool;
  warlock: Tool;
  keylo: Tool;
  bombei: Tool;
}

export interface PseudoPackage {
  name: string;
  version: string;
  description: string;
  homepage: string;
}

export interface Config {
  hosts: HostList[];
}

export interface LottieApi {
  createAnimationApi: (options: LottieAnimationOptions) => LottieAnimation;
}
export interface LottieAnimationOptions {
  container: HTMLElement;
  animationData: any;
  loop?: boolean;
  autoplay?: boolean;
}
export interface LottieAnimation {
  play: () => void;
  stop: () => void;
  pause: () => void;
  setSpeed: (speed: number) => void;
  setDirection: (direction: number) => void;
  destroy: () => void;
}
export interface LottieBuilder {
  loadAnimation: (data: any) => any;
}
export interface LottieMarker {
  tm: number;
  cm?: string;
  dr: number;
}
