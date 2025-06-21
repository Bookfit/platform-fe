'use client';

import { useUserInfo } from '@/state/queries/user/useUserInfo';

export default function UserInitializer() {
  useUserInfo();

  return null;
}
