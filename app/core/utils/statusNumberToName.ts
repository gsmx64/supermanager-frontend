import i18n from "i18next";


export function statusNumberToName(
  status: number
) {
  switch (status) {
    case 0:
      return i18n.t('common.disabled');
    case 1:
      return i18n.t('common.active');
    case 2:
      return i18n.t('common.archived');
    default:
      return i18n.t('common.unknown');
  }
}
