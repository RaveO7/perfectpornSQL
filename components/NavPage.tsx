import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface Props {
    page: any,
    numberPage: any,
}

export default function NavPage(props: Props) {
    const page = props.page
    const numberPage = props.numberPage
    const pathname = usePathname()

    if (numberPage == 1) { return; }
    const classBigButton = "relative flex items-center justify-center w-fit h-8 p-2 rounded-lg bg-gray-700 border-2 text-pink-100 border-pink-100 hover:bg-gray-800 hover:text-white hover:border-white"
    const classLittleButton = "relative flex items-center justify-center w-8 h-8 p-2 rounded-lg bg-gray-700 border-2 text-pink-100 border-pink-100 hover:bg-gray-800 hover:text-white hover:border-white"

    return (
        <div className='flex justify-between gap-8 m-auto'>
            {1 <= page - 3 && <Link href={`${pathname}`} className={classBigButton}>First</Link>}
            {1 <= page - 1 && <Link href={`${pathname}?page=${page - 1}`} className={classBigButton}>Less</Link>}
            {1 <= page - 2 && <Link href={`${pathname}?page=${page - 2}`} className={classLittleButton}>{page - 2}</Link>}
            {1 <= page - 1 && <Link href={`${pathname}?page=${page - 1}`} className={classLittleButton}>{page - 1}</Link>}

            <Link href="" className='
            relative flex items-center justify-center
            w-8 h-8 p-2 rounded-lg 
            bg-gray-500 border-2 text-pink-100 border-pink-100 cursor-default
            '>{page}</Link>

            {numberPage! >= page + 1 && <Link href={`${pathname}?page=${page + 1}`} className={classLittleButton}>{page + 1}</Link>}
            {numberPage! >= page + 2 && <Link href={`${pathname}?page=${page + 2}`} className={classLittleButton}>{page + 2}</Link>}
            {numberPage! >= page + 1 && <Link href={`${pathname}?page=${page + 1}`} className={classBigButton}>Next</Link>}
            {numberPage! >= page + 3 && <Link href={`${pathname}?page=${numberPage}`} className={classBigButton}>Last</Link>}
        </div>
    )
}