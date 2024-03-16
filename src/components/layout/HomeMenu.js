import Image from "next/image";
import MenuItem from "../menu/menuItem";
import SectionHeaders from "./SectionHeader";
export default function HomeMenu() {
    return (
        <section>
            <div className=" absolute left-0 right-0 ">
                <div className="h-48 w-48 absolute -left-12 -top-20 -z-10" >
                    <Image src={'/sallad1.png'} layout= {"fill"} objectFit="contain" alt={'sallad'} />
                </div>
                <div className="h-48 w-48 absolute -top-36 -right-12 -z-10" >
                    <Image src={'/sallad2.png'} layout= {"fill"} objectFit="contain" alt={'sallad'} />
                </div>
            </div>
                
            <div className="text-center mb-4">
                <SectionHeaders 
                    subHeader = {'check out'}
                    mainHeader = {'Menu'} />
            </div>
            <div className=" grid grid-cols-3 gap-4">
                <MenuItem />
                <MenuItem />
                <MenuItem />
                <MenuItem />
                <MenuItem />
                <MenuItem />
            </div>
            

        </section>
    );
}