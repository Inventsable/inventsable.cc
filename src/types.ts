export interface HostList {
  name: string;
  version?: string | number;
  disabled?: boolean;
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
