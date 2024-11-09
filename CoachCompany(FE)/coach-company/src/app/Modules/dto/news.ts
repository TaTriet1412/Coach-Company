export interface News{
    id: number,
    stt: number,
    title: string,
    img: string,
    meta: string,
    hide: boolean,
    dateBegin: Date
}

export const NEWS = [
    {
      id: 1,
      stt: 1,
      title: 'Xe khách 2TL mở chi nhánh tại thành phố Mumbai, Ấn Độ',
      img: 'assets/admin/img/anh1.jpg',
      meta: 'chi-nhanh-moi',
      hide: false,
      dateBegin: new Date('2024-10-10T10:30:00')
    },
    {
      id: 2,
      stt: 2,
      title: 'Xe khách 2TL mở chi nhánh tại thành phố Dubai, UAE',
      img: 'assets/admin/img/anh2.jpg',
      meta: 'chi-nhanh-moi',
      hide: false,
      dateBegin: new Date('2024-11-01T09:00:00')
    },
    {
      id: 3,
      stt: 3,
      title: 'Xe khách 2TL mở chi nhánh tại thành phố Paris, Pháp',
      img: 'assets/admin/img/anh3.jpg',
      meta: 'chi-nhanh-moi',
      hide: true,
      dateBegin: new Date('2024-09-15T15:45:00')
    },
    {
        id: 4,
        stt: 4,
        title: 'Xe khách 2TL mở chi nhánh tại thành phố California, USA',
        img: 'assets/admin/img/anh4.jpg',
        meta: 'chi-nhanh-moi',
        hide: true,
        dateBegin: new Date('2024-09-15T15:45:00')
      }
  ];