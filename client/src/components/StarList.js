import React, { useState } from 'react';
import Star from './Star';

const StarList = ({rating, setRating}) => {
	const maxValue = 5

	//console.log('rating = '+ rating);
	const [hover, setHover] = useState(null);

	return (
	  <div className="star-rating">
		{[...Array(maxValue)].map((star, index) => {
			const value = index + 1;

			return (
				<Star 
					key={index}
					value={value}
					hover={hover}
					setHover={setHover}
					rating={rating}
					setRating={setRating}
				/>
			);
		})}
	  </div>
	);
};

export default StarList;