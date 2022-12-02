import Grid from "@mui/material/Grid";
import List from "../pages/events/List";
import { useAppSelector } from "../../hooks/rtkHooks"

const VerticalList = ({events}: any) => {
  const options = useAppSelector((state) => state.options)
  let slice = events?.slice(0, options.numOfView)
  if(slice.length === 0) {
    slice = events
  }
    return (
        <div>
        {slice.map((event: any) => (
        <div key={event.id}>
          <div>
            <Grid key={event.id} item>
               <List {...event} />
            </Grid>
          </div>
          
        </div>
      ))
      }
  </div>
    )
} 

export default VerticalList