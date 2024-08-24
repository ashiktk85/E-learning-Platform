

const CourseCard = () => {
    return (
        <div>
            <img src="https://nextui.org/images/hero-card-complete.jpeg"
             alt="course img" 
             className="rounded-3xl p-2"
             />
             <div className="p-4">
                    <h3 className="mb-2 text-2xl font-bold tracking-tighter">
                        Photography
                    </h3>
                    <p className="text-sm">
                        In this you will learn about photography.
                    </p>
             </div>
        </div>
    );
}

export default CourseCard;
