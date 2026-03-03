import fs from "fs";
import path from "path";
import { OurStoryImage } from "./OurStoryImage";

const STORY_IMAGES_DIR = path.join(process.cwd(), "public", "images", "story");
const IMAGE_EXT = /\.(png|jpg|jpeg|webp)$/i;

export const OurStory = async () => {
  let filenames: string[] = [];
  try {
    const files = fs.readdirSync(STORY_IMAGES_DIR);
    filenames = files
      .filter((f) => IMAGE_EXT.test(f))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
  } catch {
    // directory missing or unreadable
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-8 md:mb-20">Our Story</h2>
        {filenames.length > 0 ? (
          <div className="flex flex-col justify-center items-center gap-20">
            {filenames.map((filename, index) => (
              <OurStoryImage
                key={filename}
                filename={filename}
                index={index}
                width={filename === "5.png" ? 850 : 680}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No story images available.</p>
        )}
      </div>
    </section>
  );
};
