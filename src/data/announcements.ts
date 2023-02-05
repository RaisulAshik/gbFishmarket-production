export interface IAnnouncementsData {
  id: number;
  title: string;
  short_description: string;
  image: string;
}

export interface IAnnouncementsCategoryData {
  id: number;
  title: string;
  short_description: string;
  image_link: string | undefined;
}
