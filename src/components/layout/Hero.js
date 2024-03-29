
import Image from "next/image";
import Right from "../icons/Right";
export default function Hero() {
    return (
        <>
            <section className="hero mt-4">
                <div className="py-12">
                    <h1 className="text-4xl font-semibold ">
                        Everything <br /> 
                        is better <br/>
                        with a &nbsp;
                        <sapn className="text-primary"> 
                            Pizza
                        </sapn>
                    </h1>
                    <p className="my-6 text-gray-500 text-sm">
                        Pizza is the missing piece that makes every day complete, a simple
                        yet delicious joy in life
                    </p>
                    <div className="flex gap-4 text-sm ">
                        <button className="bg-primary uppercase flex gap-2 text-white rounded-full px-4 py- justify-center
                        ">
                            Order now
                            <Right />
                        </button>
                        <button className="flex items-center border-0 gap-2 py-2 text-gray-600 font-semibold ">
                            Learn more
                            <Right />
                        </button>
                    </div>
                </div>
                
                <div className="relative">
                    <Image src={'/pizza.png'} layout={'fill'}  objectFit={'contain'}  alt={'pizza'}/>

                </div>
            </section>
        </>
    );
}