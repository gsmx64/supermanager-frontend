import { Chip } from "@heroui/react";

import type { SectionTitleProps } from "@/core/components/ui/SectionTitle/types/SectionTitle.type";


const SectionTitle = ({ title, description }: SectionTitleProps) => {
  return (
    <>
      <h2
        className="flex flex-row justify-between items-start gap-4 pb-3 border-gray-100 dark:border-gray-600"
      >
        <Chip
          color="default"
          variant="shadow"
          size="lg"
          style={{
            color: "#0078d4",
            height: "3rem",
            fontSize: "1.8rem",
            border: "2px solid #0078d4",
            padding: "0.5rem 1rem 0.8rem 1rem"
          }}
        >
          {title}
        </Chip>
      </h2>
      {
        (description) && (
          <div className="border-b-2 border-gray-200 dark:border-gray-700 mb-4">
            {description}
          </div>
        )
      }
    </>
  )
};

export default SectionTitle;