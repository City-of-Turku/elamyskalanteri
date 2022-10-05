import {useRef} from 'react';
import styles from './SearchBar.module.css';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = () => {

    const ref = useRef<any>(null);

    const handleClick = () => {
        ref.current?.scrollIntoView({behavior: 'smooth'})
    }

    return(
      
       <div className={styles.searchBar} onClick={handleClick}>
        <input className={styles.searchInput} type="search" placeholder="Aloita etsiminen tästä" />
        <SearchIcon className={styles.searchIcon}/>
       </div> 

    
    
    )
}

export default SearchBar;
