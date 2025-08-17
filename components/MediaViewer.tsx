'use client';

import type React from 'react';

import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  ChevronLeft,
  ChevronRight,
  Loader2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
} from 'lucide-react';
import type { ProductMedia } from '@/lib/types';

interface MediaViewerProps {
  media: ProductMedia[];
  selectedIndex: number;
  onIndexChange: (index: number) => void;
  productName: string;
}

export default function MediaViewer({
  media,
  selectedIndex,
  onIndexChange,
  productName,
}: MediaViewerProps) {
  // Video states
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Image zoom states
  const [imageZoom, setImageZoom] = useState(1);
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [showImageControls, setShowImageControls] = useState(false);
  const [isHoveringContainer, setIsHoveringContainer] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const currentMedia = media[selectedIndex];
  const isVideo = currentMedia?.type === 'video';

  // Reset states when media changes
  useEffect(() => {
    if (isVideo) {
      setIsPlaying(false);
      setCurrentTime(0);
      setDuration(0);
      setVideoError(false);
      setIsLoading(true);
    } else {
      // Reset image zoom when switching to image
      setImageZoom(1);
      setImagePosition({ x: 0, y: 0 });
    }
  }, [selectedIndex, isVideo]);

  // Update image controls visibility based on hover state
  useEffect(() => {
    if (!isVideo) {
      setShowImageControls(isHoveringContainer);
    }
  }, [isHoveringContainer, isVideo]);

  // Video event listeners
  useEffect(() => {
    if (isVideo && videoRef.current) {
      const video = videoRef.current;

      const updateTime = () => {
        const current = video.currentTime;
        const total = video.duration;
        setCurrentTime(current);

        // Ensure progress bar reaches 100% when video ends
        if (current >= total - 0.1) {
          setCurrentTime(total);
        }
      };

      const updateDuration = () => {
        setDuration(video.duration);
        setIsLoading(false);
      };

      const handleLoadStart = () => setIsLoading(true);
      const handleCanPlay = () => setIsLoading(false);
      const handleError = () => {
        setVideoError(true);
        setIsLoading(false);
      };

      const handleEnded = () => {
        setIsPlaying(false);
        setCurrentTime(video.duration); // Ensure it shows 100%
      };

      video.addEventListener('timeupdate', updateTime);
      video.addEventListener('loadedmetadata', updateDuration);
      video.addEventListener('loadstart', handleLoadStart);
      video.addEventListener('canplay', handleCanPlay);
      video.addEventListener('error', handleError);
      video.addEventListener('ended', handleEnded);

      return () => {
        video.removeEventListener('timeupdate', updateTime);
        video.removeEventListener('loadedmetadata', updateDuration);
        video.removeEventListener('loadstart', handleLoadStart);
        video.removeEventListener('canplay', handleCanPlay);
        video.removeEventListener('error', handleError);
        video.removeEventListener('ended', handleEnded);
      };
    }
  }, [isVideo, selectedIndex]);

  // Fullscreen change listener
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const togglePlay = async () => {
    if (videoRef.current && !videoError) {
      try {
        if (isPlaying) {
          videoRef.current.pause();
          setIsPlaying(false);
        } else {
          await videoRef.current.play();
          setIsPlaying(true);
        }
      } catch (error) {
        console.error('Error playing video:', error);
        setVideoError(true);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (videoRef.current && duration > 0) {
      const time = Number.parseFloat(e.target.value);
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const toggleFullscreen = async () => {
    if (!document.fullscreenElement && containerRef.current) {
      try {
        await containerRef.current.requestFullscreen();
        setIsFullscreen(true);
      } catch (error) {
        console.error('Error entering fullscreen:', error);
      }
    } else if (document.exitFullscreen) {
      try {
        await document.exitFullscreen();
        setIsFullscreen(false);
      } catch (error) {
        console.error('Error exiting fullscreen:', error);
      }
    }
  };

  const nextMedia = () => {
    onIndexChange((selectedIndex + 1) % media.length);
  };

  const prevMedia = () => {
    onIndexChange((selectedIndex - 1 + media.length) % media.length);
  };

  const formatTime = (time: number) => {
    if (!time || isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Image zoom functions
  const handleZoomIn = () => {
    setImageZoom((prev) => Math.min(prev + 0.5, 3));
  };

  const handleZoomOut = () => {
    setImageZoom((prev) => Math.max(prev - 0.5, 1));
    if (imageZoom <= 1.5) {
      setImagePosition({ x: 0, y: 0 });
    }
  };

  const resetImageZoom = () => {
    setImageZoom(1);
    setImagePosition({ x: 0, y: 0 });
  };

  const handleImageClick = (e: React.MouseEvent) => {
    if (!isVideo && !isDragging) {
      e.stopPropagation();

      // Check if click is on control buttons
      const target = e.target as HTMLElement;
      if (target.closest('button')) {
        return;
      }

      // Zoom in on click
      handleZoomIn();
    }
  };

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (imageZoom > 1 && !isVideo) {
        setIsDragging(true);
        setDragStart({
          x: e.clientX - imagePosition.x,
          y: e.clientY - imagePosition.y,
        });
      }
    },
    [imageZoom, imagePosition, isVideo]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (isDragging && imageZoom > 1) {
        const newX = e.clientX - dragStart.x;
        const newY = e.clientY - dragStart.y;

        // Limit dragging to reasonable bounds
        const maxOffset = 100 * (imageZoom - 1);
        setImagePosition({
          x: Math.max(-maxOffset, Math.min(maxOffset, newX)),
          y: Math.max(-maxOffset, Math.min(maxOffset, newY)),
        });
      }
    },
    [isDragging, dragStart, imageZoom]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      if (!isVideo) {
        e.preventDefault();
        e.stopPropagation();

        // Solo hacer zoom si el mouse está dentro del área de la imagen
        const rect = containerRef.current?.getBoundingClientRect();
        if (rect) {
          const isInsideContainer =
            e.clientX >= rect.left &&
            e.clientX <= rect.right &&
            e.clientY >= rect.top &&
            e.clientY <= rect.bottom;

          if (isInsideContainer) {
            if (e.deltaY < 0) {
              handleZoomIn();
            } else {
              handleZoomOut();
            }
          }
        }
      }
    },
    [isVideo]
  );

  // Document wheel event listener
  useEffect(() => {
    const handleDocumentWheel = (e: WheelEvent) => {
      if (!isVideo && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const isInsideContainer =
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom;

        if (isInsideContainer) {
          e.preventDefault();
        }
      }
    };

    document.addEventListener('wheel', handleDocumentWheel, { passive: false });
    return () => document.removeEventListener('wheel', handleDocumentWheel);
  }, [isVideo]);

  // Container hover handlers
  const handleContainerMouseEnter = () => {
    setIsHoveringContainer(true);
    if (isVideo) {
      setShowControls(true);
    }
  };

  const handleContainerMouseLeave = () => {
    setIsHoveringContainer(false);
    if (isVideo) {
      setShowControls(false);
    }
  };

  if (!currentMedia) return null;

  return (
    <div
      ref={containerRef}
      className={`relative w-full max-w-lg ${
        isFullscreen
          ? 'fixed inset-0 z-50 max-w-none bg-black flex items-center justify-center'
          : ''
      }`}
      onMouseEnter={handleContainerMouseEnter}
      onMouseLeave={handleContainerMouseLeave}
    >
      <div
        className={`relative overflow-hidden bg-neutral-50 rounded-lg group cursor-pointer ${
          isFullscreen ? 'w-full h-full max-w-none max-h-none' : 'aspect-square'
        }`}
        onClick={isVideo ? togglePlay : handleImageClick}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onWheel={handleWheel}
      >
        {isVideo ? (
          <>
            <video
              ref={videoRef}
              className={`w-full h-full ${isFullscreen ? 'object-contain' : 'object-cover'}`}
              muted={isMuted}
              playsInline
              preload="metadata"
              crossOrigin="anonymous"
              onLoadStart={() => setIsLoading(true)}
              onCanPlay={() => setIsLoading(false)}
              onError={() => setVideoError(true)}
            >
              <source src={currentMedia.url} type="video/mp4" />
              Tu navegador no soporta el elemento video.
            </video>

            {/* Loading Spinner */}
            {isLoading && (
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-white animate-spin" />
              </div>
            )}

            {/* Video Error */}
            {videoError && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <div className="text-center text-white">
                  <p className="mb-2">Error al cargar el video</p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setVideoError(false);
                      setIsLoading(true);
                      if (videoRef.current) {
                        videoRef.current.load();
                      }
                    }}
                    className="px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
                  >
                    Reintentar
                  </button>
                </div>
              </div>
            )}

            {/* Video Controls Overlay */}
            {!videoError && (
              <div
                className={`absolute inset-0 bg-black/20 transition-opacity duration-300 ${
                  showControls || isLoading ? 'opacity-100' : 'opacity-0'
                }`}
              >
                {/* Play/Pause Button */}
                {!isLoading && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      togglePlay();
                    }}
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-colors"
                    aria-label={isPlaying ? 'Pausar video' : 'Reproducir video'}
                  >
                    {isPlaying ? (
                      <Pause className="w-8 h-8 text-white" />
                    ) : (
                      <Play className="w-8 h-8 text-white ml-1" />
                    )}
                  </button>
                )}

                {/* Bottom Controls */}
                {!isLoading && duration > 0 && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 pb-20">
                    {/* Progress Bar */}
                    <div className="mb-3">
                      <input
                        type="range"
                        min="0"
                        max={duration}
                        value={currentTime}
                        step="0.1"
                        onChange={handleSeek}
                        onClick={(e) => e.stopPropagation()}
                        className="w-full h-1 bg-white/30 rounded-lg appearance-none cursor-pointer slider"
                      />
                    </div>

                    {/* Control Buttons */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-white text-sm">
                          {formatTime(currentTime)} / {formatTime(duration)}
                        </span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleMute();
                          }}
                          className="text-white hover:text-gray-300 transition-colors"
                          aria-label={isMuted ? 'Activar sonido' : 'Silenciar'}
                        >
                          {isMuted ? (
                            <VolumeX className="w-5 h-5" />
                          ) : (
                            <Volume2 className="w-5 h-5" />
                          )}
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFullscreen();
                          }}
                          className="text-white hover:text-gray-300 transition-colors"
                          aria-label={
                            isFullscreen ? 'Salir de pantalla completa' : 'Pantalla completa'
                          }
                        >
                          {isFullscreen ? (
                            <Minimize2 className="w-5 h-5" />
                          ) : (
                            <Maximize2 className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        ) : (
          <>
            {/* Image with zoom */}
            <div
              ref={imageRef}
              className="w-full h-full relative overflow-hidden"
              style={{
                transform: `scale(${imageZoom}) translate(${imagePosition.x / imageZoom}px, ${
                  imagePosition.y / imageZoom
                }px)`,
                cursor: imageZoom > 1 ? (isDragging ? 'grabbing' : 'grab') : 'zoom-in',
                transition: isDragging ? 'none' : 'transform 0.2s ease-out',
              }}
            >
              <Image
                src={currentMedia.url || '/placeholder.svg'}
                alt={currentMedia.alt}
                fill
                className="object-cover select-none"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                draggable={false}
              />
            </div>

            {/* Image Controls */}
            <div
              className={`absolute top-4 right-4 flex flex-col space-y-2 transition-opacity duration-300 ${
                showImageControls ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleZoomIn();
                }}
                disabled={imageZoom >= 3}
                className="w-8 h-8 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Zoom in"
              >
                <ZoomIn className="w-4 h-4 text-white" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleZoomOut();
                }}
                disabled={imageZoom <= 1}
                className="w-8 h-8 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Zoom out"
              >
                <ZoomOut className="w-4 h-4 text-white" />
              </button>

              {imageZoom > 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    resetImageZoom();
                  }}
                  className="w-8 h-8 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-colors"
                  aria-label="Reset zoom"
                >
                  <RotateCcw className="w-4 h-4 text-white" />
                </button>
              )}
            </div>

            {/* Zoom indicator */}
            {imageZoom > 1 && (
              <div className="absolute bottom-4 left-4 bg-black/70 text-white px-2 py-1 rounded-full text-xs">
                {Math.round(imageZoom * 100)}%
              </div>
            )}
          </>
        )}

        {/* Navigation Arrows */}
        {media.length > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevMedia();
              }}
              className="w-8 h-8 sm:w-10 sm:h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-sm transition-colors"
              aria-label="Media anterior"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-600" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextMedia();
              }}
              className="w-8 h-8 sm:w-10 sm:h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-sm transition-colors"
              aria-label="Siguiente media"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-600" />
            </button>
          </div>
        )}

        {/* Media Type Indicator */}
        {isVideo && (
          <div className="absolute top-4 left-4">
            <div className="bg-black/70 text-white px-2 py-1 rounded-full text-xs flex items-center space-x-1">
              <Play className="w-3 h-3" />
              <span>Video</span>
              {duration > 0 && <span>({formatTime(duration)})</span>}
            </div>
          </div>
        )}
      </div>

      {/* Instructions for image zoom */}
      {!isVideo && showImageControls && imageZoom === 1 && (
        <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-3 py-1 rounded-full text-xs whitespace-nowrap">
          Click, rueda del mouse o botones para hacer zoom
        </div>
      )}
    </div>
  );
}
