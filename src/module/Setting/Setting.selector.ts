import { createSelector } from 'reselect';
import { IRootState } from 'src/redux/interface';
import { isDev as isDevelop } from 'src/configs';
import { translateByLanguage } from 'src/i18n';
import result from 'lodash/result';

export const settingSelector = createSelector(
    (state: IRootState) => state.setting,
    (setting) => setting,
);

export const devSettingSelector = createSelector(settingSelector, (setting) => setting.dev);

export const isDevSelector = createSelector(settingSelector, (setting) => !!setting.isDev || !!isDevelop);

export const themeSelector = createSelector(settingSelector, (setting) => setting.theme);

export const darkModeSelector = createSelector(settingSelector, (setting) => setting.darkMode);

export const languageSelector = createSelector(settingSelector, (setting) => setting.language);

export const translateByFieldSelector = createSelector(languageSelector, (language) => (field: string) => {
    const translate = translateByLanguage(language);
    const ts: any = result(translate, field);
    return ts;
});

export const serverSelector = createSelector(settingSelector, (preload) => preload.server || {});
