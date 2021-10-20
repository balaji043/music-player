const Loader = () => {
	return (
		<div className='min-h-full flex justify-center items-center bg-black'>
			<div className='loader bg-white p-5 rounded-full flex space-x-3'>
				<div className='w-5 h-5 bg-gray-800 rounded-full animate-bounce'></div>
				<div className='w-5 h-5 bg-gray-800 rounded-full animate-bounce'></div>
				<div className='w-5 h-5 bg-gray-800 rounded-full animate-bounce'></div>
			</div>
		</div>
	);
};

export { Loader };
