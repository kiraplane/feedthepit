import { Routes } from '@/routes';
import { permanentRedirect } from 'next/navigation';

export default function PlayPage() {
  permanentRedirect(Routes.Play);
}
