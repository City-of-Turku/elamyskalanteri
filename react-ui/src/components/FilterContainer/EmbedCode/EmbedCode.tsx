import ShareIcon from '@mui/icons-material/Share';
import Button from '@mui/material/Button';
import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../../hooks/rtkHooks';
import AdvancedSettings from '../../AdvancedSettings/AdvancedSettings';
import styles from './EmbedCode.module.css';

const EmbedCode = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(false);
  const copyBtnRef = useRef<HTMLButtonElement>(null);
  const codeElemRef = useRef<HTMLDivElement>(null);

  const { filters } = useAppSelector((state) => state);

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
                {filters.typeId && `    data-type-id="${filters.typeId}"\n`}
                {filters.search && `    data-search="${filters.search}"\n`}
                {!!filters.eventTypes.length &&
                  `    data-keywords="${filters.eventTypes.join()}"\n`}
                {!!filters.audiences.length && `    data-audiences="${filters.audiences.join()}"\n`}
                {filters.startTime &&
                  filters.endTime &&
                  `    data-time-start="${filters.startTime}\n`.concat(
                    `    data-time-end="${filters.endTime}"\n`,
                  )}
                {filters.eventFeatures && `    data-features="${filters.eventFeatures}"\n`}
                {`    data-title="${filters.embedTitle}"\n`}
                {`    data-description="${filters.embedDesc}"\n`}
                {`    data-theme="${filters.theme}"\n`}
                {`    data-layout="${filters.listView}"\n`}
                {`    data-num-of-visible-results="${filters.viewNum}"\n`}
                {`    data-show-search="${filters.searchCriteria}"\n`}
                {`    data-language="${filters.languageSelection}"\n`}
                {`    data-link-url="${filters.linkContainer}"\n`}
                {`    data-link-text="${filters.linkText}"\n`}
                {`    data-open-in-new-window=""\n`}
                {`    data-show-embed-tool=""\n`}
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
            <AdvancedSettings />
          </div>
        </div>
      )}
    </div>
  );
};

export default EmbedCode;
