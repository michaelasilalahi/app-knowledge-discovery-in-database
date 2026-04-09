export interface NotificationPayload {
  app: string;
  title: string;
  text: string;
  titleBig?: string;
  subText?: string;
  summaryText?: string;
  bigText?: string;
  audioContentsURI?: string;
  imageBackgroundURI?: string;
  extraInfoText?: string;
  icon?: string;
  image?: string;
  time?: string;
}
