'use client'
import { AsideKeyOfValues } from '@/model/constants/routes/asideOptions';
import '@/styles/_global.scss';
import './asideTitle.scss';
import asideArrow from '@/public/assets/aside-arrow.gif';
import Image from 'next/image';
import { usePathname } from 'next/navigation';


export default function AsideTitle(){
    const pathname = usePathname();
    const pathSlice = pathname.split('/')
    const asideTitle = AsideKeyOfValues[pathSlice[3]];

    return(
        <>
            {asideTitle &&
                <h3 className='header-title'>
                    <Image src={asideArrow} alt='>'width={15}></Image>
                    {asideTitle}
                </h3>
            }
        </>
    )
}