import { ImgHTMLAttributes } from 'react';
import styles from './Avatar.module.css'

interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement>{ // generic (tem src, alt, title, etc dentro dessa extensão)
  hasBorder?: boolean;
}

export function Avatar({ hasBorder = true, ...props }: AvatarProps) { /* default = true */
  return (
    <img 
      className={hasBorder ? styles.avatarWithBorder : styles.avatar} 
      {...props} //rest operator
    />
  )
}