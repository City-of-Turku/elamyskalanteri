import Link from '@mui/material/Link';
import React from 'react';
import { useAppSelector } from '../../hooks/rtkHooks';
import { ReactComponent as Thumbnail } from '../../svg/thumbnail.svg';

const LinkContainer = () => {
  const options = useAppSelector((state) => state.options);

  if (!options.linkContainer || !options.linkText) return null;

  return (
    <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '4rem' }}>
      <Thumbnail width={88} height={33} />
      <div style={{ padding: '0.2rem' }}>
        <Link href={options.linkContainer} target="_blank">
          {options.linkText}
        </Link>
      </div>
    </div>
  );
};

export default LinkContainer;
