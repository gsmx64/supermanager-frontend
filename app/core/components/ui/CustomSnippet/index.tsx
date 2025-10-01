import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { Snippet, Tooltip } from "@heroui/react";


type CustomChipProps = {
  isTitle?: boolean,
  code?: string,
  url?: string,
  description?: string,
  color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger",
  style?: React.CSSProperties,
  children: React.ReactNode
}

export const CustomSnippet = ({ isTitle, code, url, description, color, style, children }: CustomChipProps) => {
  const { t } = useTranslation();
  return (
    <div className="flex items-center flex-nowrap" style={{ ...style }}>
      {(children) ? (
        <div
          className={`
          inline-flex items-center px-3 py-1 rounded ${isTitle ? 'border-2' : 'border'}
          ${color === "primary" ? "border-blue-500 text-blue-700 dark:border-blue-400 dark:text-blue-300" : ""}
          ${color === "secondary" ? "border-gray-500 text-gray-700 dark:border-gray-400 dark:text-gray-300" : ""}
          ${color === "success" ? "border-green-500 text-green-700 dark:border-green-400 dark:text-green-300" : ""}
          ${color === "warning" ? "border-yellow-500 text-yellow-700 dark:border-yellow-400 dark:text-yellow-300" : ""}
          ${color === "danger" ? "border-red-500 text-red-700 dark:border-red-400 dark:text-red-300" : ""}
          ${!color || color === "default" ? "border-gray-300 text-gray-800 dark:border-gray-600 dark:text-gray-200" : ""}
          text-xs h-8 min-w-fit max-w-full whitespace-nowrap overflow-x-auto
          `}
          style={{ ...style }}
        >
          {(url) ? (
            <Link
              to={url}
            >
              {(description) ? (
                <Tooltip
                  color={color || "default"}
                  content={description}
                  showArrow={true}
                >
                  {children}
                </Tooltip>
              ) : (
                <>{children}</>
              )}
            </Link>
          ) : (
            (description) ? (
              <Tooltip
                color={color || "default"}
                content={description}
                showArrow={true}
              >
                {children}
              </Tooltip>
            ) : (
              <>{children}</>
            )
          )}
        </div>
      ) : ('-')}
      {(code && children) && (
        <Snippet
          tooltipProps={{
            showArrow: true,
            color: 'primary',
            content: t('common.copy-to-clipboard')
          }}
          size="sm"
          color="default"
          variant="flat"
          codeString={code}
          hideSymbol={true}
          style={{
            backgroundColor: 'transparent',
            marginLeft: '-14px'
          }}
        />
      )}
    </div>
  );
}

export default CustomSnippet;