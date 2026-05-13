import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";

interface ProjectCardProps {
  id: string;
  title: string;
  editedAt: string;
  thumbnail: string;
  imageBg?: string;
  imageFit?: "top" | "center";
  className?: string;
}

/**
 * Project card matching Figma node 43:2975:
 * - bg white, border #F0F0F0, rounded-2xl, drop-shadow 0 4 6 rgba(0,0,0,0.04)
 * - pt-1 px-1 only (no pb), text section has its own px-2 py-3
 * - Image container: h-164, rounded-xl, overflow-hidden
 *   • imageFit="top": image fills width, taller-than-container, top portion visible
 *   • imageFit="center": image fits with padding (used for BYDH mobile mockups)
 */
export function ProjectCard({
  id,
  title,
  editedAt,
  thumbnail,
  imageBg = "#F9F9F9",
  imageFit = "top",
  className,
}: ProjectCardProps) {
  return (
    <Link
      href={`/workspace/${id}`}
      className={cn(
        "group flex-1 min-w-0 block bg-white border border-[#F0F0F0] rounded-2xl pt-1 px-1 drop-shadow-[0px_4px_6px_rgba(0,0,0,0.04)] hover:drop-shadow-[0px_6px_10px_rgba(0,0,0,0.06)] transition",
        className
      )}
    >
      <div
        className="relative h-[164px] w-full rounded-xl overflow-hidden"
        style={{ backgroundColor: imageBg }}
      >
        {imageFit === "top" ? (
          // Image fills width, anchored at top; if image is taller-than-container the bottom is clipped
          <Image
            src={thumbnail}
            alt={title}
            fill
            quality={95}
            sizes="(min-width: 1280px) 640px, 50vw"
            className="object-cover object-top"
          />
        ) : (
          // Centered image with padding around (e.g. BYDH 3-phone mockup)
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-[200px] h-[150px]">
              <Image
                src={thumbnail}
                alt={title}
                fill
                quality={95}
                sizes="400px"
                className="object-contain"
              />
            </div>
          </div>
        )}
      </div>
      <div className="flex items-center px-2 py-3 w-full">
        <div className="flex-1 min-w-0 flex flex-col gap-1 items-start">
          <p className="text-md font-medium text-[#1A243A] truncate w-full leading-tight">{title}</p>
          <p className="text-sm text-[#757E91] leading-tight">Edited {editedAt}</p>
        </div>
      </div>
    </Link>
  );
}
