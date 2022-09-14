export interface IEmailRequest {
  to: string;
  subject: string;
  text: any;
  template?: string | undefined;
  context?: any;
}
