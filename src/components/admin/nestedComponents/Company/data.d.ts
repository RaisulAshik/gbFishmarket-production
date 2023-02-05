export interface ICompany {
  id: number;
  title?: string;
  address?: string;
  short_description?: string;
  description?: string;
  email?: string;
  phone?: string;
  image_name: string;
  image_link: string;
  history_image_name: string;
  history_image_link: string;
  history_description: string;
  history_title: string;
  history_short_description: string;
  ceo_message_image_name: string;
  ceo_message_image_link: string;
  ceo_message_image_cloudinary_public_id: string;
  ceo_message_title: string;
  ceo_message_description: string;
  mission_title: string;
  mission_description: string;
  created_at?: Date;
  updated_at?: Date;
}
