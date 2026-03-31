/**
 * CardContainer
 * --------------
 * This is a React functional component that renders an SVG shape intended to be used as a card background or decorative container.
 * Every section is explained below:
 */

export const CardContainer = () => {
  return (
    // The SVG element with size 500x500 pixels, using a viewBox of 300x180 (drawing area).
    <svg width="500" height="500" viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
      {/*
        The <path> element draws a complex closed shape.
        The 'd' attribute describes the points and curves:
          - M0 0       : Move the pen to (0,0) (top-left corner)
          - H110       : Draw a straight horizontal line rightwards to x=110, y=0
          - Q160 60 210 0 : Draw a quadratic Bézier curve with control point (160,60) 
                            ending at (210,0)
          - H300       : Draw a horizontal line rightwards to x=300, y=0 (top-right)
          - Q160 100 300 100 : Draw a quadratic Bézier curve with control point (160,100) 
                               ending at (300,100)
          - V180       : Draw a straight vertical line down to x=300, y=180 (bottom-right)
          - H0         : Draw a straight horizontal line left to x=0, y=180 (bottom-left)
          - Z          : Close the path (back to the starting point)
        The shape's fill color is indigo (#4f46e5).
      */}
      <rect x="0" y="0" width="320" height="180" rx="20" fill="transparent" />
      <path
        d="
          M0 0 H319 V48 Q318 55 315 60 Q280 90 319 120 V180 H0 V120 Q30 90 0 60 Z
        "
        fill="#4f46e5"
        stroke="red"
        strokeWidth={2}
      />
    </svg>
  );
};
