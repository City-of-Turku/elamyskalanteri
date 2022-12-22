import { useAppSelector } from "../../hooks/rtkHooks"
import Link from '@mui/material/Link';

const LinkContainer = () => {
    const options = useAppSelector((state) => state.options)

    return (
        <>
        <div style={{textAlign: "center"}}>
        {options.linkContainer && <Link href={options.linkContainer} target="_blank">Powered by VINK, löydä kaikkea kivaa!</Link>}
        </div>
        </>
    )

}

export default LinkContainer