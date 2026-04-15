import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getAssetPath(path: string) {
  if (!path) return path;
  if (path.startsWith('http')) return path;
  
  // Intercept and rewrite image extensions to .webp to match the optimized files on disk
  let finalPath = path;
  if (finalPath.match(/\.(png|jpe?g)$/i)) {
    finalPath = finalPath.replace(/\.(png|jpe?g)$/i, '.webp');
  }
  
  const basePath = process.env.NODE_ENV === 'production' ? '/character-clash' : '';
  const cleanPath = finalPath.startsWith('/') ? finalPath : `/${finalPath}`;
  
  return `${basePath}${cleanPath}`;
}
