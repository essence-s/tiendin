/**
 * Utilidades para manejar videos de YouTube
 */

// Extraer ID de video de YouTube de diferentes formatos de URL
export function extractYouTubeVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/watch\?.*v=([^&\n?#]+)/,
    /youtube\.com\/v\/([^&\n?#]+)/,
    /youtube\.com\/embed\/([^&\n?#]+)/,
    /youtu\.be\/([^&\n?#]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  return null;
}

// Generar URL de thumbnail de YouTube
export function getYouTubeThumbnail(
  videoId: string,
  quality: 'default' | 'medium' | 'high' | 'standard' | 'maxres' = 'high'
): string {
  const qualityMap = {
    default: 'default.jpg',
    medium: 'mqdefault.jpg',
    high: 'hqdefault.jpg',
    standard: 'sddefault.jpg',
    maxres: 'maxresdefault.jpg',
  };

  return `https://img.youtube.com/vi/${videoId}/${qualityMap[quality]}`;
}

// Generar URL de embed de YouTube con parámetros personalizados
export function getYouTubeEmbedUrl(
  videoId: string,
  options: {
    autoplay?: boolean;
    controls?: boolean;
    modestbranding?: boolean;
    rel?: boolean;
    showinfo?: boolean;
    start?: number;
    end?: number;
  } = {}
): string {
  const params = new URLSearchParams();

  // Configuración por defecto para un reproductor simple
  const defaultOptions = {
    autoplay: false,
    controls: true,
    modestbranding: true,
    rel: false,
    showinfo: false,
    ...options,
  };

  // Convertir opciones a parámetros de YouTube
  if (defaultOptions.autoplay) params.set('autoplay', '1');
  if (!defaultOptions.controls) params.set('controls', '0');
  if (defaultOptions.modestbranding) params.set('modestbranding', '1');
  if (!defaultOptions.rel) params.set('rel', '0');
  if (!defaultOptions.showinfo) params.set('showinfo', '0');
  if (defaultOptions.start) params.set('start', defaultOptions.start.toString());
  if (defaultOptions.end) params.set('end', defaultOptions.end.toString());

  // Parámetros adicionales para un reproductor más limpio
  params.set('enablejsapi', '1');
  params.set('origin', window.location.origin);
  params.set('widget_referrer', window.location.origin);

  return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
}

// Validar si una URL es de YouTube
export function isYouTubeUrl(url: string): boolean {
  return /(?:youtube\.com|youtu\.be)/.test(url);
}

// Formatear duración de video (si está disponible)
export function formatYouTubeDuration(duration?: number): string {
  if (!duration) return '';

  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}
