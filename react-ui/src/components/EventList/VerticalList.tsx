import Grid from "@mui/material/Grid";
import List
 from "../pages/events/List";

const VerticalList = ({events}: any) => {
    return (
        <div>
        {events?.map((event: any) => (
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