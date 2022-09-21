import styles from './SearchBar.module.css';
import SearchIcon from '@mui/icons-material/Search';
  
const SearchBar = () => {
    return(
       <div className={styles.container}>
        <input className={styles.searchInput} type="search" placeholder="Aloita etsiminen tästä" />
        <SearchIcon className={styles.searchIcon}/>
       </div> 
    )
}

export default SearchBar