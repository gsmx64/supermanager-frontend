import i18n from "i18next";


export function statusBooleanToName(
  check: boolean
) {
  switch (check) {
    case false:
      return i18n.t('common.disabled');
    case true:
      return i18n.t('common.active');
  }
}
