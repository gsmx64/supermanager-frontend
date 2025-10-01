type ProfileCardItemsProps = {
  field: string,
  item?: string | number | null
  isWhatsApp?: boolean
}

export const ProfileCardItems = ({ field, item, isWhatsApp }: ProfileCardItemsProps) => {
  return (
    (item) && (
      <div>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {field}
        </p>
        <p className="font-medium text-gray-900 dark:text-gray-100">
          {(isWhatsApp
            ? item
            : item)}
        </p>
      </div>
    )
  );
};
