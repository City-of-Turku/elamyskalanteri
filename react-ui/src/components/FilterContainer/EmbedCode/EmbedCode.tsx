import ShareIcon from '@mui/icons-material/Share';
import Button from '@mui/material/Button';
import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../../hooks/rtkHooks';
import EmbedSettings from '../../EmbedSettings/EmbedSettings';
import styles from './EmbedCode.module.css';

const EmbedCode = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(false);
  const copyBtnRef = useRef<HTMLButtonElement>(null);
  const codeElemRef = useRef<HTMLDivElement>(null);

  const { filters, embedSettings } = useAppSelector((state) => state);

  const copyToClipBoard = () => {
    setBtnDisabled(true);

    function getOriginalBtnText() {
      return setTimeout(() => {
        if (copyBtnRef.current) {
          copyBtnRef.current.innerText = t('copyButton');
          setBtnDisabled(false);
        }
      }, 2000);
    }

    // Copy code to clipboard
    navigator.clipboard
      .writeText(codeElemRef.current?.innerText || '')
      .then(() => {
        if (copyBtnRef.current) {
          copyBtnRef.current.innerText = t('copied');
        }
        getOriginalBtnText();
      })
      .catch(() => {
        if (copyBtnRef.current) {
          copyBtnRef.current.innerText = t('errorWhenCopying');
        }
        getOriginalBtnText();
      });
  };

  const embedDataAttribute = {
    audience: filters.audiences.length ? `    data-audiences="${filters.audiences.join()}"\n` : '',
    embedDescription: `    data-description="${embedSettings.embedDesc}"\n`,
    embedLinkText: embedSettings.linkText ? `    data-link-text="${embedSettings.linkText}"\n` : '',
    embedLinkUrl: embedSettings.linkContainer
      ? `    data-link-url="${embedSettings.linkContainer}"\n`
      : '',
    embedTitle: `    data-title="${embedSettings.embedTitle}"\n`,
    extraKeyword: filters.extraKeyword ? `    data-extra-keyword="${filters.extraKeyword}"\n` : '',
    features: filters.eventFeatures.length ? `    data-features="${filters.eventFeatures}"\n` : '',
    keywords: filters.eventTypes.length ? `    data-keywords="${filters.eventTypes.join()}"\n` : '',
    language: `    data-language="${embedSettings.languageSelection}"\n`,
    layout: `    data-layout="${embedSettings.listView}"\n`,
    locality: filters.localities.length
      ? `    data-localities="${filters.localities.join()}"\n`
      : '',
    numOfVisibleResults: embedSettings.viewNum
      ? `    data-num-of-visible-results="${embedSettings.viewNum}"\n`
      : '',
    openInNewWindow: `    data-open-in-new-window="${embedSettings.openInNewWindow}"\n`,
    organization: filters.organization ? `    data-organization="${filters.organization}"\n` : '',
    search: filters.search ? `    data-search="${filters.search}"\n` : '',
    showPastEvents: `    data-show-past-events="${embedSettings.showPastEvents}"\n`,
    showSearch: `    data-show-search="${embedSettings.searchCriteria}"\n`,
    theme: `    data-theme="${embedSettings.theme}"\n`,
    timeEnd: `    data-time-end="${filters.endTime ? filters.endTime : ''}"\n`,
    timeStart: `    data-time-start="${filters.startTime ? filters.startTime : ''}"\n`,
    typeId: filters.typeId ? `    data-type-id="${filters.typeId}"\n` : '',
  };

  return (
    <div className={styles.container}>
      <Button variant={'outlined'} onClick={() => setOpen(!open)} startIcon={<ShareIcon />}>
        {t('share')}
      </Button>
      {open && (
        <div className={styles.advancedSettings}>
          <div className={styles.innerContainer}>
            <div ref={codeElemRef}>
              <pre>
                {`<script src="${process.env.REACT_APP_EMBED_BASE_URL}${process.env.REACT_APP_EMBED_ENTRY_FILE}" type="text/javascript" defer></script>\n`}
                {`<div\n`}
                {`    class="event-calendar-embed"\n`}
                {embedDataAttribute.language}
                {embedDataAttribute.theme}
                {embedDataAttribute.layout}
                {embedDataAttribute.embedTitle}
                {embedDataAttribute.embedDescription}
                {embedDataAttribute.embedLinkText}
                {embedDataAttribute.embedLinkUrl}
                {embedDataAttribute.numOfVisibleResults}
                {embedDataAttribute.openInNewWindow}
                {embedDataAttribute.showSearch}
                {embedDataAttribute.audience}
                {embedDataAttribute.features}
                {embedDataAttribute.keywords}
                {embedDataAttribute.extraKeyword}
                {embedDataAttribute.organization}
                {embedDataAttribute.locality}
                {embedDataAttribute.search}
                {embedDataAttribute.showPastEvents}
                {embedDataAttribute.timeStart}
                {embedDataAttribute.timeEnd}
                {embedDataAttribute.typeId}
                {`></div>\n`}
              </pre>
            </div>
            <Button
              sx={{ m: 2 }}
              variant={'contained'}
              id={'copyBtn'}
              onClick={() => copyToClipBoard()}
              ref={copyBtnRef}
              disabled={btnDisabled}
              className={styles.copyBtn}
              color="secondary"
            >
              {t('copyButton')}
            </Button>
          </div>
          <div className={styles.advancedSettings}>
            <EmbedSettings />
          </div>
        </div>
      )}
    </div>
  );
};

export default EmbedCode;
