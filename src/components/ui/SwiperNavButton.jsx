'use client';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

/**
 * Reusable Swiper navigation button component
 * @param {Object} props
 * @param {'prev'|'next'} props.direction - Button direction ('prev' or 'next')
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.iconColor - Icon color class (default: 'text-white')
 * @param {number} props.iconSize - Icon size (default: 20)
 * @param {string} props.bgColor - Background color class (default: 'bg-primary')
 * @param {string} props.hoverColor - Hover background color class (default: 'hover:bg-primary/80')
 * @param {string} props.position - Position classes (default: 'absolute z-10 top-1/2 -translate-y-1/2')
 * @param {string} props.leftPosition - Left position classes (for prev button)
 * @param {string} props.rightPosition - Right position classes (for next button)
 * @param {Object} props.style - Inline styles
 * @param {string} props.swiperClass - Swiper class name for navigation config
 */
export const SwiperNavButton = ({
  direction = 'prev',
  className = '',
  iconColor = 'text-white',
  iconSize = 20,
  bgColor = 'bg-primary',
  hoverColor = 'hover:bg-primary/80',
  position = 'absolute z-10 top-1/2 -translate-y-1/2',
  leftPosition = 'left-0',
  rightPosition = 'right-0',
  style = {},
  swiperClass = '',
  ...rest
}) => {
  const isPrev = direction === 'prev';
  const Icon = isPrev ? FaArrowLeft : FaArrowRight;
  const positionClass = isPrev ? leftPosition : rightPosition;
  const defaultPadding = 'p-2 md:p-3';
  const defaultStyle = { padding: '10px', ...style };

  return (
    <button
      type="button"
      className={`${position} ${positionClass} ${bgColor} ${hoverColor} rounded-full shadow-lg ${defaultPadding} focus:outline-none transition-colors max-md:hidden ${swiperClass} ${className}`}
      style={defaultStyle}
      aria-label={isPrev ? 'Previous' : 'Next'}
      {...rest}
    >
      <Icon size={iconSize} className={iconColor} />
    </button>
  );
};
