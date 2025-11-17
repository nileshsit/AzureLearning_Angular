import { EventEmitter } from "@angular/core";

export interface ApiResponse {
  success: boolean;
  message: string;
  data: any;
  TAID?: number;
}