import ky from 'ky';

export const apiClient = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  hooks: {
    beforeRequest: [
      () => {
        /** TODO:헤더에 토큰 추가 작업 필요 **/
      },
    ],
  },
});
