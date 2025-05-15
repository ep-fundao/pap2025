import Link from 'next/link';
import { BsFillSendFill, BsTelephoneOutbound } from "react-icons/bs";
import { BiMessageDetail } from "react-icons/bi";

const Footer = () => {
    return(<footer className="mt-16">
        <div className="container mx-auto px-4">
            <Link href="/" className="font-black text-tertiary-dark">MyAssociation</Link>

            <h4 className="font-semibold text-[40px] py-6">Contactos</h4>
            <div className="flex flex-warp gap-16 items-center justify-betwwen">
                <div className="flex-1">
                    <p>EPF</p>
                    <div className="flex items-center py4">
                        <BsFillSendFill/>
                        <p className="ml-2">MyAssociation</p>
                    </div>
                    <div className="flex items-center py4">
                        <BsTelephoneOutbound/>
                        <p className="ml-2">935288280</p>
                    </div>
                    <div className="flex items-center pt-4">
                        <BiMessageDetail/>
                        <p className="ml-2">MyAssociation</p>
                    </div>
                </div>
                
                <div className="flex-1 md:text-right">
                    <p className="pb-4">Nossa historia</p>
                    <p className="pb-4">Entra em contacto</p>    
                    <p className="pb-4">termos de serviço</p>
                    <p>Apoio ao cliente</p>
                </div>
            </div>
            <p>Feito por : @Guttojss</p>
        </div>

        <div className="bg-tertiary-light h-10 md:h-[70px] mt-16 w-full bottom-0 left-0"></div>
    </footer>
    );
};

export default Footer;