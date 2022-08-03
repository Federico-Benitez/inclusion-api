export interface ApiHealth {
  success: boolean;
  message: string;
  hostname: string;
  time: number;
}

export interface ApiHealtResponse extends ApiHealth {
  name: string;
}
