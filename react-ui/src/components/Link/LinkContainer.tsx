import { useAppSelector } from "../../hooks/rtkHooks"
import Link from '@mui/material/Link';
import {ReactComponent as Thumbnail} from "../../svg/thumbnail.svg";

const LinkContainer = () => {
    const options = useAppSelector((state) => state.options)

    return (
        <>
    <div style={{ display: "flex", justifyContent: "center"}}>
        {options.linkContainer &&  <Thumbnail width={88} height={33}/>}
        <div style={{padding: "0.2rem"}}>
        {options.linkContainer && <Link href={options.linkContainer} target="_blank">{options.linkText && options.linkText}</Link>}
        </div>
    </div>
    </>
    )

}

export default LinkContainer