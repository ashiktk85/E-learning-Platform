

const Mission = () => {
    return (
        <section>
            <div className="container mx-auto text-center"> 
                <h2 className="mb-8 text-3xl lg:text-4xl">Our Mission</h2>  
                <div className="relative flex items-center justify-center">
                    <video 
                    className="w-full rounded-3xl"
                    autoPlay
                    muted
                    loop
                    playsInline
                    >
                    <source src="https://videos.pexels.com/video-files/6985519/6985519-sd_640_360_25fps.mp4"
                        type="video/mp4" />
                    </video>

                </div>
            </div>

        </section>
    );
}

export default Mission;
