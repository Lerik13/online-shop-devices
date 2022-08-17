import React from 'react';

const Star = ({ value, hover, setHover, rating, setRating }) => {
	const emptyColor = "grey"
	const fillColor = "#edaa10"
	
	return (
		<div
			className="star"
			onClick={() => setRating(value)}
			onMouseEnter={() => setHover(value)}
			onMouseLeave={() => setHover(null)}
		>
			<svg
				data-rating={value}
				fill={value <= (hover || rating) ? fillColor : emptyColor}
				height='43'
				width='43'
				viewBox="0 0 25 25"
			>
			<polygon
				strokeWidth="0"
				points="9.9, 1.1, 3.3, 21.78, 19.8, 8.58, 0, 8.58, 16.5, 21.78"
			/>
			</svg>
		</div>
	);
};

export default Star;