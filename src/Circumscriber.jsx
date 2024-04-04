import "./circumscriber.css";

const deg2rad = (deg) => (deg * Math.PI) / 180;

const calculateInnerRadius = ({ outerRadius, numCircles }) => {
  /* okay, to calculate the inner radius we need to do the following.
    Assume the radius of the inner circle is X. The outer radius is X + (distance from the corner point of the circle to the center radius)
    To get _that_ value, consider the following. The interior circles will have their central point at the corners of a polygon inside the
    outer circle. Each side of the polygon will have a length of 2 * X.

    So we can construct a right triangle. The length of the adjacent side is X / 2. The angle is half of the interior polygon angle. We can
    calculate that easily since it's a regular polygon and we know the number of sides.
  */
  //console.log("num circ : ", numCircles, typeof numCircles);
  if (numCircles === 0) {
    return { innerOffset: 0, innerRadius: outerRadius };
  } else if (numCircles === 1) {
    return { innerOffset: 0, innerRadius: outerRadius };
  } else if (numCircles === 2) {
    return { innerOffset: outerRadius / 2, innerRadius: outerRadius / 2 };
  }

  const interiorAngle = deg2rad(((numCircles - 2) * 180) / numCircles / 2);

  // now it's just math. We know the adjacent side length is X, so we calculate the hypotenuse as the cosine of the angle.
  // Math.cos(interiorAngle) = (x/2) / hypo
  // hypo * Math.cos(interiorAngle) = x / 2
  // const hypo = (X / 2) / Math.cos(interiorAngle)
  // and we know that the outerRadius = hypo + X. Substitute.
  //outerRadius = X + (X / 2) / Math.cos(interiorAngle)
  // outerRadius * Math.cos(interiorAngle) = Math.cos(interiorAngle) / 2 * X
  // outerRadius * 2 / Math.cos(interiorAngle) = X
  //outerRadius * Math.cos(interiorAngle) = X + X / 2 === 3 * X / 2
  //console.log("IA : ", numCircles, interiorAngle);
  //const X = (outerRadius * 2) / Math.cos(interiorAngle);
  const X =
    (Math.cos(interiorAngle) * outerRadius) / (1 + Math.cos(interiorAngle));
  // use that to actually calculate our hypotenuse.
  const hypo = outerRadius - X;
  //console.log("XH : ", X, hypo);
  return { innerOffset: hypo, innerRadius: X };
};

const calculateInnerCirclePositions = ({
  innerOffset,
  numCircles,
  outerCenterX,
  outerCenterY,
  angleOffset = 0,
}) => {
  // next, return a list of [x,y] coordinates for each circle. Again, this is easy.
  // with the number of circles, we can calculate the angle offset for each point.
  const angle = 360 / numCircles; //((numCircles - 2) * 180) / numCircles;
  //console.log("INNER ANGLE OFF : ", angle, numCircles);
  const retValue = [];
  for (let i = 0; i < numCircles; i++) {
    const circleAngle = deg2rad(i * angle + angleOffset);
    //console.log("CA : ", numCircles, angle, circleAngle, i);
    // coords are the sin and the cos of the angle, with innerRadius as the hypotenuse.
    retValue.push([
      outerCenterX + Math.cos(circleAngle) * innerOffset,
      outerCenterY + Math.sin(circleAngle) * innerOffset,
    ]);
  }
  return retValue;
};

export const Circle = ({
  cx,
  cy,
  r,
  level = 1,
  recursive = false,
  doubleRecursive = false,
  starting = true,
  angleOffset = -90,
  rotationalSpeed = 1,
}) => {
  let circlePos = [];
  const innerRadius = calculateInnerRadius({
    outerRadius: r,
    numCircles: level,
  });

  if ((starting || recursive) && level > 1) {
    //console.log("IR : ", innerRadius);
    circlePos = calculateInnerCirclePositions({
      innerOffset: innerRadius.innerOffset,
      numCircles: level,
      outerCenterX: cx,
      outerCenterY: cy,
      angleOffset,
    });
  }
  return (
    <>
      <circle cx={cx} cy={cy} r={r} />
      {circlePos.map((pos, i) => (
        <Circle
          key={i}
          cx={pos[0]}
          cy={pos[1]}
          r={innerRadius.innerRadius}
          level={level - 1}
          recursive={recursive}
          doubleRecursive={doubleRecursive}
          starting={false}
          angleOffset={(i * 360) / level + angleOffset * rotationalSpeed}
          rotationalSpeed={rotationalSpeed}
        />
      ))}
      {doubleRecursive &&
        !isNaN(innerRadius.innerOffset) &&
        !isNaN(innerRadius.innerRadius) &&
        innerRadius.innerOffset > innerRadius.innerRadius && (
          /*<circle
          cx={cx}
          cy={cy}
          r={innerRadius.innerOffset - innerRadius.innerRadius}
        />*/
          <Circle
            cx={cx}
            cy={cy}
            r={innerRadius.innerOffset - innerRadius.innerRadius}
            starting={false}
            level={level - 1}
            recursive={recursive}
            doubleRecursive={doubleRecursive}
            angleOffset={angleOffset * rotationalSpeed}
            rotationalSpeed={rotationalSpeed}
          />
        )}
    </>
  );
};

export const Circumscriber = ({
  circles,
  radius,
  width = 500,
  height = 500,
  backgroundColor = "yellow",
  recursive = false,
  doubleRecursive = false,
  angleOffset,
  rotationalSpeed,
}) => {
  return (
    <svg
      width={width}
      height={height}
      className="room"
      viewBox={`0 0 ${width} ${height}`}
      style={{ backgroundColor }}
    >
      <Circle
        cx={width / 2}
        cy={height / 2}
        r={radius}
        level={circles}
        recursive={recursive}
        doubleRecursive={doubleRecursive}
        angleOffset={angleOffset}
        rotationalSpeed={rotationalSpeed}
      />
      {/*<circle cx={width / 2} cy={height / 2} r={radius} />
      {circlePos.map((pos, i) => (
        <circle key={i} cx={pos[0]} cy={pos[1]} r={innerRadius.innerRadius} />
      ))}*/}
    </svg>
  );
};
