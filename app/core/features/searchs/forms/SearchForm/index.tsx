import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Button, Form, Input } from "@heroui/react";

import { useFormManager } from "@/core/hooks/useFormManager";
import SearchIcon from "@/core/components/icons/SearchIcon";
import {
  maxLengthValidator,
  minLengthValidator,
  requiredValidator
} from "@/core/utils/FormsValidators";
import {
  CORE_SEARCH_MAX_INPUT_LENGTH,
  CORE_SEARCH_MIN_INPUT_LENGTH
} from "@/core/consts/consts";
import { SearchContext } from "@/core/features/searchs/contexts/searchs.context";


type SearchFormProps = {
  onClose: () => void;
};

const SearchForm = ({ onClose }: SearchFormProps) => {
  const { t } = useTranslation();
  const { setSearchText } = useContext(SearchContext);

  const { setFieldValue, validate, getFieldErrors, form } = useFormManager(
    {
      searchInput: '',
    },
    {
      searchInput: [
        (val: string | number | boolean) => requiredValidator(
          t('common.form-validation-required')
        )(String(val)),
        (val: string | number | boolean) => minLengthValidator(
          CORE_SEARCH_MIN_INPUT_LENGTH,
          t('common.form-validation-search-min-length', {
            min: CORE_SEARCH_MIN_INPUT_LENGTH,
          })
        )(String(val)),
        (val: string | number | boolean) => maxLengthValidator(
          CORE_SEARCH_MAX_INPUT_LENGTH,
          t('common.form-validation-search-max-length', {
            max: CORE_SEARCH_MAX_INPUT_LENGTH,
          })
        )(String(val)),
      ],
    }
  );

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isFormValid = validate();
    if (!isFormValid) return;
    await Promise.resolve();

    setSearchText(form.searchInput);
    console.log("onSubmit:", form.searchInput);
  };

  return (
    <Form
      className="w-full items-center text-center"
      validationBehavior="aria"
      onSubmit={onSubmit}
    >
      <Input
        isClearable
        name="searchInput"
        label={t('search.title')}
        placeholder={t('search.placeholder')}
        type="text"
        classNames={{
          label: "text-black/50 dark:text-white/90",
          input: [
            "bg-transparent",
            "text-black/90 dark:text-white/90",
            "placeholder:text-default-700/50 dark:placeholder:text-white/60",
          ],
          innerWrapper: "bg-transparent",
          inputWrapper: [
            "shadow-sm",
            "bg-default-200/50",
            "dark:bg-default/60",
            "backdrop-blur-xl",
            "backdrop-saturate-200",
            "hover:bg-default-200/70",
            "dark:hover:bg-default/70",
            "group-data-[focus=true]:bg-default-200/50",
            "dark:group-data-[focus=true]:bg-default/60",
            "cursor-text!",
          ],
        }}
        radius="lg"
        startContent={<SearchIcon />}
        onChange={(e) => setFieldValue('searchInput', e.target.value)}
        onError={() => {
          return getFieldErrors('searchInput');
        }}
      />

      <div className="flex justify-end mt-4">
        <Button color="secondary" variant="ghost" onPress={onClose}>
          {t('search.close')}
        </Button>
        <div className="inline-block mx-2" />
        <Button type="submit" color="primary" variant="ghost">
          {t('search.search')}
        </Button>
      </div>
    </Form>
  );
};

export default SearchForm;